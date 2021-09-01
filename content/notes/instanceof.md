---
title: 手写instanceof
date: 2021-09-01
desc: 手写instanceof
---

> instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。

开发中，经常需要通过 instanceof 来判断某个实例对象是否为我们想要的类型来确定后续的逻辑, 伪码表示为

```ts
if (A instanceof B) {
  doSomethingWith(A);
}
```

所以有必要去了解 instanceOf 的实现方式，根据 MDN 的描述

> instanceof 运算符用来检测 constructor.prototype 是否存在于参数 object 的原型链上。

我们来实现一个 mockInstanceOf 函数，函数效果与 instanceOf 等同, 通过描述，可以写出以下伪码

```ts
// 判断 A 是否为 B 的实例
function mockInstanceOf(A, B) {
  const prototypeChains = getPrototypeChain(A);
  return prototypeChains.includes(B.prototype);
}
```

问题关键在于如何找到一个实例对象 instance 的原型链, JS 可以通过三种方式找到 instance 的原型

1. `Reflect.getPrototypeOf`, 元编程
2. `Object.getPrototypeOf`
3. `instance.__proto__`, 不推荐，非标准

所以可以实现获取原型链方法

```ts
function getPrototypeChain(instance) {
  const chains = [];

  let backup = instance;

  while (!!backup) {
    const curPrototype = Reflect.getPrototypeOf(backup);
    chains.push(curPrototype);
    backup = curPrototype;
  }

  return chains;
}
```

完整代码

```ts
function mockInstanceOf(A, B) {
  const prototypeChains = getPrototypeChain(A);
  return prototypeChains.includes(B.prototype);
}

function getPrototypeChain(instance) {
  const chains = [];

  let backup = instance;

  while (!!backup) {
    const curPrototype = Reflect.getPrototypeOf(backup);
    chains.push(curPrototype);
    backup = curPrototype;
  }

  return chains;
}
```

当然，也可以在遍历原型链的时候就开始判断，节省额外的空间开销

```ts
function mockInstanceOf(A, B) {
  let backup = A;

  while (!!backup) {
    const curPrototype = Reflect.getPrototypeOf(backup);
    backup = curPrototype;

    if (curPrototype === B.prototype) {
      return true;
    }
  }

  return false;
}
```
