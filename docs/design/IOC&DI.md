## 控制反转

控制反转(Inversion of Control)是一种设计思想，用于解决对象依赖间的强耦合。

### 使用场景

系统设计中会出现不同类相互引用，比如 A 引用了 B, 如果 B 类发生更改，那么在修改 B 的时候，还需要去动 A。在大型系统中，类间的引用可能是多对多，极其复杂，这种场景在对类的修改简直是牵一发而动全身。

```typescript
class A {
  constructor() {
    this.instanceB = new B()
  }
  doSomething() {
    this.instanceB.doSomething()
  }
}

class B {
  //...
}
```

IoC 就是解决这种场景的一个设计思想。IoC 反转的控制是指类 A 对类 B 的引用控制，通过引入第三方 IoC 容器，收集系统内对象的控制权，由第三方控制依赖，A 对 B 由主动控制变成了被动的接受(控制反转)。

### 实现方式

#### 依赖注入(Dependency Injection)

在对象运行时注入依赖关系。以 nest 为例，在构造函数中注入依赖。

#### example

以 nest 为例，

1. 通过 `@Injectable` 装饰器定义一个依赖，并收集到 IoC 容器
2. 通过构造函数实现依赖注入
   ```ts
   @Controller('cats')
   export class CatsController {
     constructor(private catsService: CatsService) {
       // 注入CatService
     }
   }
   ```

### 参考

[控制反转和依赖注入](https://zhuanlan.zhihu.com/p/33492169)
[维基百科: IoC & DI](https://zh.wikipedia.org/wiki/%E6%8E%A7%E5%88%B6%E5%8F%8D%E8%BD%AC)
