### redux 源码浅析

最近在把主力开发框架从 vue 转化到 react，对 redux 相关比较感兴趣，拉了 redux 的源码看了下，这里做下源码分析，方便有需要的同学去用。

什么是 redux，为什么用 redux，官方文档已经讲的非常清楚，这里就不再赘述。[redux 文档](https://redux.js.org/) 这里主要关注 redux 的 src 部分。核心内容会分以下部分展开。

- createStore 做了什么
- combineReducers 做了什么
- redux 中间件实现

#### 源码概览

以下是 redux 的核心源码，内容不多，结构也非常清晰。

```bash
src
├── applyMiddleware.ts
├── bindActionCreators.ts
├── combineReducers.ts
├── compose.ts
├── createStore.ts
├── index.ts														# 入口文件
├── types                               # 类型相关
│   ├── actions.ts
│   ├── middleware.ts
│   ├── reducers.ts
│   └── store.ts
└── utils																# 工具文件
    ├── actionTypes.ts
    ├── isPlainObject.ts
    ├── symbol-observable.ts
    └── warning.ts
```

其中 index.ts 主要暴露了以下 5 个 api 以及相关类型

- creatStore

- combineReducers

- bindActionCreators

- applyMiddleware

- compose

### 源码解读

#### createStore 做了什么

createStore 是一个工厂函数，生成管理状态树的 store, 接受三个参数，分别是

- reducer 根据 action 生成下一个状态
- preloadedState 初始化状态
- enhancer 使用 applyMiddleware 返回的中间件增强

  先看 createStore 的函数定义，这里用 ts 的函数重载，表示createStore函数第一个参数必须是`reducer`, 第二个参数可以是初始化的store状态，也可以是中间件增强器，第三个参数必须是中间件增强器(如果有的话)，函数输出是一个Store类型。

```typescript
export default function createStore<
  S,
  A extends Action,
  Ext = {},
  StateExt = never
>(
  reducer: Reducer<S, A>,
  enhancer?: StoreEnhancer<Ext, StateExt>
): Store<ExtendState<S, StateExt>, A, StateExt, Ext> & Ext;
export default function createStore<
  S,
  A extends Action,
  Ext = {},
  StateExt = never
>(
  reducer: Reducer<S, A>,
  preloadedState?: PreloadedState<S>,
  enhancer?: StoreEnhancer<Ext, StateExt>
): Store<ExtendState<S, StateExt>, A, StateExt, Ext> & Ext;
export default function createStore<
  S,
  A extends Action,
  Ext = {},
  StateExt = never
>(
  reducer: Reducer<S, A>,
  preloadedState?: PreloadedState<S> | StoreEnhancer<Ext, StateExt>,
  enhancer?: StoreEnhancer<Ext, StateExt>
): Store<ExtendState<S, StateExt>, A, StateExt, Ext> & Ext {
  // ...
}
```

以下是Store类型的声明

```ts
export interface Store<
  S = any,
  A extends Action = AnyAction,
  StateExt = never,
  Ext = {}
> {
  // 调度器，唯一可以更改redux状态的入口，为了维护状态的原子性
  dispatch: Dispatch<A>
  // 获取当前store的状态
  getState(): S
  // 订阅状态改变
  subscribe(listener: () => void): Unsubscribe
  // 更新reducers，可以用与做热更新或者分包
  replaceReducer<NewState, NewActions extends Action>(
    nextReducer: Reducer<NewState, NewActions>
  ): Store<ExtendState<NewState, StateExt>, NewActions, StateExt, Ext> & Ext

 
  [Symbol.observable](): Observable<S>
}

```

这里我画了一个简单的流程图看看Store是干什么的

![](/Users/feiwu/code/github/shan-hai-jing/docs/assets/redux store.png)

看了Store的定义知道Store是干什么的，现在可以进入到createStore内部看看Store是怎么实现的。

createStore内部定义了currentReducer, currentState, currentListeners 表示当前Store的reducer，状态以及监听函数，用isDispatching来加解锁保证状态的唯一性。其中的currentListener比较难理解，这里先略过。

```ts
let currentReducer = reducer
let currentState = preloadedState as S
let currentListeners: (() => void)[] | null = []
let nextListeners = currentListeners
let isDispatching = false

```



##### getState

getState没有什么好解读的，就是在Store被锁住的时候访问报错，否则返回currentState

```typescript
 /**
   * Reads the state tree managed by the store.
   *
   * @returns The current state tree of your application.
   */
  function getState(): S {
    if (isDispatching) {
      throw new Error(
        'You may not call store.getState() while the reducer is executing. ' +
          'The reducer has already received the state as an argument. ' +
          'Pass it down from the top reducer instead of reading it from the store.'
      )
    }

    return currentState as S
  }
```



##### dispatch

dispatch 函数接受一个action作为参数，校验action，校验成功后，将当前状态和action传入到reducer中生成下一个状态，并执行监听函数。其中action校验条件有

+ action必须是一个简单对象
+ action必须有一个叫做type的key，且值非空

```ts
function dispatch(action: A) {
  if (!isPlainObject(action)) {
    throw new Error(
      'Actions must be plain objects. ' +
      'Use custom middleware for async actions.'
    )
  }

  if (typeof action.type === 'undefined') {
    throw new Error(
      'Actions may not have an undefined "type" property. ' +
      'Have you misspelled a constant?'
    )
  }

  if (isDispatching) {
    throw new Error('Reducers may not dispatch actions.')
  }

  try {
    isDispatching = true
    currentState = currentReducer(currentState, action)
  } finally {
    isDispatching = false
  }

  const listeners = (currentListeners = nextListeners)
  for (let i = 0; i < listeners.length; i++) {
    const listener = listeners[i]
    listener()
  }

  return action
}
```

