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

### 参考

[Typing objects in TypeScript](https://2ality.com/2020/01/typing-objects-typescript.html)
