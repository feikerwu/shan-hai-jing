nest 是一款构建高效，可扩展的 Node.js 服务器端应用程序的框架。
nest 里高度使用了控制反转([IoC](../design/IOC&DI.md))的设计思想。for example

```ts
import { Injectable } from '@nestjs/common'
import { Cat } from './interfaces/cat.interface'

// 定义一个依赖
@Injectable()
export class CatsService {
  private readonly cats: Cat[] = []

  create(cat: Cat) {
    this.cats.push(cat)
  }

  findAll(): Cat[] {
    return this.cats
  }
}

@Controller('cats')
export class CatsController {
  // 依赖注入
  constructor(private catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto)
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll()
  }
}
```

上述源码来自 [nestjs 官方文档](https://docs.nestjs.com/providers)，可以看到在 nest 通过在类构造器中实现依赖注入的

```ts
@Controller('cats')
export class CatsController {
  // 依赖注入
  constructor(private catsService: CatsService) {}
}
```

在`constructor`中只是声明了`catsService: CatsService`, 并没有给`catsService`实例化，那么 nestjs 是怎么知道当前类需要哪些依赖，寻找并注入的呢？

#### 实现方式

nestjs 是用 ts 写的，当开启 `emitDecoratorMetadata`, 编译选项后(配置如下)

```json
{
  "compilerOptions": {
    "target": "ES5",
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

如果源码引入了 [reflect-metadata](https://github.com/rbuckton/reflect-metadata) 这个包，那么在运行时，ts 编译器会将类型信息通过 `reflect-metadata` 注入, 出处参考 [typescript issue](https://github.com/Microsoft/TypeScript/issues/2577#issue-65755483)

```ts
import 'reflect-metadata'

class Point {
  x: number
  y: number
}

class Line {
  private _p0: Point

  @validate
  set p0(value: Point) {
    this._p0 = value
  }
  get p0() {
    return this._p0
  }
}

function validate<T>(
  target: any,
  propertyKey: string,
  descriptor: TypedPropertyDescriptor<T>
) {
  let set = descriptor.set
  descriptor.set = function(value: T) {
    let type = Reflect.getMetadata('design:type', target, propertyKey)
    if (!(value instanceof type)) {
      throw new TypeError('Invalid type.')
    }
    set.call(target, value)
  }
}
```

等价于

```ts
class Line {
  private _p0: Point

  @validate
  @Reflect.metadata('design:type', Point)
  set p0(value: Point) {
    this._p0 = value
  }
  get p0() {
    return this._p0
  }
}
```

`@Reflect.metadata('design:type', Point)` 会在 `Reflect` 中给 `Line.p0` 设置一个 key 为`design:type` 的元信息，具体内容可以参考文档[reflect-metadata](https://github.com/rbuckton/reflect-metadata)，类似的还有 `design:paramtypes`,`design:returntype`。

nest 就是通过上述方式，在实例化时根据 `design:type` 获取到在`constructor`中参数的 class 类型，并根据 class 类型实现依赖注入。一个简单实现

```ts
import 'reflect-metadata'
type Construct = { new (...args: any): any }

// 全局IoC容器
const IoCPool: Set<Construct> = new Set()

// 加入到IoC容器
function Injectable(target: Construct) {
  IoCPool.add(target)
}

function DI(target: Construct): Construct {
  const dependenciesCls = Reflect.getMetadata('design:paramtypes', target)
  const dependenciesInstance = dependenciesCls.map((d: Construct) => {
    if (!IoCPool.has(d)) {
      throw new Error(`unresigned dependence ${d.name}`)
    }
    // 递归注入
    return d.length ? DI(d) : new d()
  })

  class F {
    constructor() {
      // 注入依赖实例
      return new target(...dependenciesInstance)
    }
  }

  return F
}

@Injectable
class A {
  say() {
    console.log('A')
  }
}

@DI
class B {
  constructor(private a: A) {}
  say() {
    this.a.say()
    console.log('B')
  }
}

// @ts-ignore
let b = new B()
b.say()
// A B
```

### 参考

- [深入理解 TypeScript](https://jkchao.github.io/typescript-book-chinese/tips/metadata.html#%E5%9F%BA%E7%A1%80)
- [typescript decorator](https://www.typescriptlang.org/docs/handbook/decorators.html#metadata)
- [reflect-metadata](https://github.com/rbuckton/reflect-metadata)
