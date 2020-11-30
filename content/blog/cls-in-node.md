---
title: node CLS 全链路追踪以及其实现原理
date: 2020-06-07
description: node 中如何追踪某个请求的全链路
---

考虑这样一个问题，在复杂系统中，每一个请求过来，我们会调用不同的异步服务(db, fs，微服务等等)，调用过程中如果某一环节出现问题，如何去做链路追踪，或者说如何获取到原始的请求上下文。

在 JAVA/C++ 等多线程服务中，可以通过 TLS(Thread-local storage，线程局部存储)获取请求上下文，但是在 node 这种单线程事件驱动的系统中，如何去请求获取请求上下文。
最简单的方法是用一个全局变量暂存请求上下文，在出现异常/需要打日志时从全局变量取，看下面的代码

```ts
const express = require('express')

const app = express()

let globalReq
let id = 1

app.use((req, res, next) => {
  req.id = id++
  next()
})

app.get('/', async (req, res) => {
  globalReq = req
  await sleep(1000)
  res.status(200).json({ id: globalReq.id })
})

app.listen(3000)

function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}
```

但是在 node 中，这样的全局变量会被下一个请求复写，导致出现异常时拿到的请求上下文并不是我们想要的那个请求。

另外一个方案是通过在不同服务中透传原始请求，这样的确可以解决问题，但是会引进很多冗余代码，当系统庞大之后，不好扩展

## 什么是 CLS

而 CLS 就是解决上述问题的一个社区方案，全称 `Continuation Local Storage`

> Continuation-local storage works like thread-local storage in threaded programming, but is based on chains of Node-style callbacks instead of threads. The standard Node convention of functions calling functions is very similar to something called “continuation-passing style” in functional programming, and the name comes from the way this module allows you to set and get values that are scoped to the lifetime of these chains of function calls.

CLS 的工作方式类似于 TLS，其基于 node 的回调链而不是线程。换句话说，CLS 可以在 node 这个异步调用链中获取到同一个上下文信息。

## CLS 的具体实现

### cls

CLS 的源码并不复杂，总共就 200 行, [源码传送门](https://github.com/othiym23/node-continuation-local-storage/blob/master/context.js)

![CLS实现](https://cdn.jsdelivr.net/gh/feikerwu/figure-bed@master/assets/20201010150228.png)

CLS 中有两个结构概念分别为

1. namespace 命名空间，理论上一个应用分配一个 namespace
2. context 上下文，namespace 通过一个数组存储多个 context

每次执行 `namespace.run` 都会生成一个上下文，CLS 通过 `process.addAsyncListener` 监听异步事件。在创建异步事件的时候将当前上下文传入，执行异步事件时，检出传入的上下文，异步事件执行结束销毁上下文。
`process.addAsyncListener` 是 [node v0.11 版本的 API](https://nodejs.org/docs/v0.11.11/api/process.html#process_process_addasynclistener_callbacksobj_userdata)，当前已废弃，可以使用社区实现的 polyfill [async-listener](https://github.com/othiym23/async-listener)。具体 api 可以参考[createAsyncListener](https://github.com/othiym23/async-listener#createasynclistenercallbacks-initialstorage). 这里简单翻译下

> `process.addAsyncListener`, `process.removeAsyncListener`, `process.createAsyncListener` 接口两个参数，分别为 `callbacks` `initialstorage`

1. `callbacks` 是一个对象，接受 4 个可选字段:
   - `create`: 一个函数，签名为 `function(storage){}`，storage 默认是传入的 initialstorage，如果 create 函数存在返回值，storage 会被返回值 value 覆盖
   - `before`: 一个函数，签名为 `function(context, storage){}`, create 函数会在异步回调执行前被调用，参数 context 是当前执行上下文(this), storage 是 create 返回的 storage
   - `after`: 一个函数，签名为`function(context, storage)`, after 函数参数含义与上述 before 类似，在异步回调执行后的被调用，如果异步函数抛出异常，则该函数不会被调用
   - `error`: 一个函数，签名为`function(context, storage)`, 异步事件抛出错误时执行
2. `initialstorage`: 挂载到异步事件实例的默认值，会被 create 的返回值复写

### cls-hooked

cls-hooked 这个包从 cls fork 而来，之前提到 `process.addAsyncListener` 在 node v0.11.11 版本后被废弃，cls-hooked 采用新的 api [async_hooks](https://nodejs.org/api/async_hooks.html)对核心逻辑进行了重写。

async hooks 是 node v8 引入的新特性，通过 async_hooks.createHook(callbacks)创建每个异步事件 `init`, `before`, `after`, `destory` 的生命周期

```js
const asyncHooks = require('async-hooks')
asyncHooks.createHook({
  /**
   * asyncId: 分配给每个异步资源的唯一Id
   * type: 异步资源类型
   * triggerAsyncId: 触发异步资源的父 id
   * resouce：异步资源
   */
  init: (asyncId, type, triggerAsyncId, resource) => {},
  before: asyncId => {},
  after: asyncId => {},
  destroy: asyncId => {},
  promiseResolve: asyncId => {},
})
```

通过 asyncHooks 可以非常方便的追逐异步事件

```js
const async_hooks = require('async_hooks')
const fs = require('fs')
let indent = 0
async_hooks
  .createHook({
    init(asyncId, type, triggerAsyncId) {
      const eid = async_hooks.executionAsyncId()
      const indentStr = '├' + '─'.repeat(indent) + ' '
      fs.writeSync(
        process.stdout.fd,
        `${indentStr}${type}(${asyncId}):` +
          ` trigger: ${triggerAsyncId} execution: ${eid}\n`
      )
    },
    before(asyncId) {
      const indentStr = '├' + '─'.repeat(indent) + ' '
      fs.writeSync(process.stdout.fd, `${indentStr}before:  ${asyncId}\n`)
      indent += 2
    },
    after(asyncId) {
      indent -= 2
      const indentStr = '├' + '─'.repeat(indent) + ' '
      fs.writeSync(process.stdout.fd, `${indentStr}after:  ${asyncId}\n`)
    },
    destroy(asyncId) {
      const indentStr = '├' + '─'.repeat(indent) + ' '
      fs.writeSync(process.stdout.fd, `${indentStr}destroy:  ${asyncId}\n`)
    },
  })
  .enable()

require('net')
  .createServer(() => {})
  .listen(8080, () => {
    // Let's wait 10ms before logging the server started.
    setTimeout(() => {
      console.log('>>>', async_hooks.executionAsyncId())
    }, 10)
  })
```

输出

```bash
├ TCPSERVERWRAP(5): trigger: 1 execution: 1
├ TickObject(6): trigger: 5 execution: 1
├ before:  6
├── Timeout(7): trigger: 6 execution: 6
├── TIMERWRAP(8): trigger: 6 execution: 6
├ after:  6
├ destroy:  6
├ before:  8
├── before:  7
>>> 7
├──── TickObject(9): trigger: 7 execution: 7
├── after:  7
├ after:  8
├ before:  9
├ after:  9
├ destroy:  7
├ destroy:  9
```

clk-hooked 通过 async_hooks 重写了 clk 监听异步资源的方式，源码见 [传送门](https://github.com/Jeff-Lewis/cls-hooked/blob/0ff594bf6b2edd6fb046b10b67363c3213e4726c/context.js#L280)

### 总结

由于单线程事件驱动的特性，node 无法通过类似线程局部变量的方式跟踪收到请求后的全链路，通过传参的方式跟踪变量过于冗余繁杂，社区给出的方案是引入请求上下文，维护一个上下文的容器，一个请求对对应一个上下文，监听异步资源，在异步执行过程中切换上下文实现全链路追踪

### 参考

- [async listener polyfill](https://github.com/othiym23/async-listener)
- [github clk](https://github.com/othiym23/node-continuation-local-storage)
- [async_hooks](https://nodejs.org/api/async_hooks.html)
- [express-http-context](https://github.com/skonves/express-http-context)
