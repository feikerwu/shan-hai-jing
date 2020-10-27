- 如何在 ts 给对象签名

  ```ts
  interface ExampleInterface {
    // Property signature 属性签名
    myProperty: boolean

    // Method signature 方法签名
    myMethod(x: string): void

    // Index signature 索引签名
    [prop: string]: any

    // Call signature 调用签名
    (x: number): string

    // Construct signature 构造器签名
    new (x: string): ExampleInstance
  }
  ```

- ts 中 `Object` 和 `ObjectConstructor` 的区别
  Object 类型定义 Object.prototype
  ObjectConstructor 类型定义 Object 这个 class

  ```ts
  // Object 的签名
  interface Object {
    constructor: Function
    toString(): string
    toLocaleString(): string
    valueOf(): Object
    hasOwnProperty(v: PropertyKey): boolean
    isPrototypeOf(v: Object): boolean
    propertyIsEnumerable(v: PropertyKey): boolean
  }

  // ObjectConstructor 的签名
  interface ObjectConstructor {
    new (value?: any): Object
    (): any
    (value: any): any
    readonly prototype: Object
    getPrototypeOf(o: any): any
    getOwnPropertyDescriptor(
      o: any,
      p: PropertyKey
    ): PropertyDescriptor | undefined
    getOwnPropertyNames(o: any): string[]
    create(o: object | null): any
    create(
      o: object | null,
      properties: PropertyDescriptorMap & ThisType<any>
    ): any
    defineProperty(
      o: any,
      p: PropertyKey,
      attributes: PropertyDescriptor & ThisType<any>
    ): any
    defineProperties(
      o: any,
      properties: PropertyDescriptorMap & ThisType<any>
    ): any
    seal<T>(o: T): T
    freeze<T>(a: T[]): readonly T[]
    freeze<T extends Function>(f: T): T
    freeze<T>(o: T): Readonly<T>
    preventExtensions<T>(o: T): T
    isSealed(o: any): boolean
    isFrozen(o: any): boolean
    isExtensible(o: any): boolean
    keys(o: object): string[]
  }
  ```













### TS Exercises

1. 以下为什么会报错
```ts
type User = {
  id: number;
  kind: string;
};

function makeCustomer<T extends User>(u: T): T {
  // 为什么会报错?
  return {
    id: u.id,
    kind: 'customer'
  }
}
```
T 有可能是User的子类，T能约束User，User约束不了T

2. 如果约束两个参数的类型统一
```ts
function f(a: string | number, b: string | number) {
    if (typeof a === 'string') {
        return a + ':' + b; // no error but b can be number!
    } else {
        return a + b; // error as b can be number | string
    }
}
f(2, 3); // correct usage
f(1, 'a'); // should be error
f('a', 2); // should be error
f('a', 'b') // correct usage
```



### 参考

[Typing objects in TypeScript](https://2ality.com/2020/01/typing-objects-typescript.html)
