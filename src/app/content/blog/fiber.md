---
tags: #blog
date: 2020-05-05
title: React 的 fiber 模型
description: 简述React的fiber模型
---

---
title: React 的 fiber 模型
date: 2020-05-05
description: 简述React的fiber模型
---

#blog 

## Why Fiber

React 是声明式的，也就是说我们只需要关心 state 的变化，至于 state 变化了，其内部如何变动，react 内部都会去做管理。react 把这种内部管理过程叫做**Reconciliation**。
Fiber 之前的协调算法叫做 stack Reconciliation，在 setState 到 UI 渲染完成，整个流程是同步的，当要渲染的组件树过大时，会阻塞渲染线程，导致页面卡死。（js 引擎和 UI 渲染引擎相互阻塞）。
React 为了解决 stack reconciliation 的性能问题，重写了整套 reconciliation 算法，新的算法被称作 Fiber Reconciliation， 简称 **Fiber**。

### 为什么称新的算法为 Fiber

在计算机体系中有进程和线程的概念，进程是一段 program 的实例，线程是进程的最小调度单位，其共享进程内的资源。在线程下还有纤程(Fiber，中文纤维)，以下是维基百科的定义

> 在 [计算机科学](https://zh.wikipedia.org/wiki/%E8%A8%88%E7%AE%97%E6%A9%9F%E7%A7%91%E5%AD%B8) 中，**纤程**（英语：Fiber）是一种最轻量化的 [线程](https://zh.wikipedia.org/wiki/%E7%BA%BF%E7%A8%8B) （lightweight threads）。它是一种用户态线程（user thread），让 [应用程序](https://zh.wikipedia.org/wiki/%E6%87%89%E7%94%A8%E7%A8%8B%E5%BC%8F) 可以独立决定自己的线程要如何运作。操作系统 [内核](https://zh.wikipedia.org/wiki/%E5%86%85%E6%A0%B8) 不能看见它，也不会为它进行 [调度](https://zh.wikipedia.org/wiki/%E6%8E%92%E7%A8%8B) 。
> 就像一般的线程，纤程有自己的 [定址空间](https://zh.wikipedia.org/wiki/%E5%AE%9A%E5%9D%80%E7%A9%BA%E9%96%93) 。但是纤程采取合作式多任务（Cooperative multitasking），而线程采取先占式多任务（Pre-emptive multitasking）。应用程序可以在一个线程环境中创建多个纤程，然后手动运行它。纤程不会被自动运行，必须要由 [应用程序](https://zh.wikipedia.org/wiki/%E6%87%89%E7%94%A8%E7%A8%8B%E5%BC%8F) 自己指定让它运行，或换到下一个纤程。
> 跟线程相比，纤程较不需要 [操作系统](https://zh.wikipedia.org/wiki/%E4%BD%9C%E6%A5%AD%E7%B3%BB%E7%B5%B1) 的支持。

React 团队把这个功能命名为 Fiber，含义也是更加紧密的处理机制，比 Thread 更细

### Fiber 架构的主要功能

Fiber 最最关键是提供了增量更新，将渲染工作拆分到不同渲染帧。
其它关键功能有

- 暂停/中止任务并能够在之后恢复任务。
- 为不同的任务设置不同的优先级。
- 重新使用之前完成的任务。

## 什么是 Fiber 架构

为了做到以上提到的功能，首先要做的是把整个渲染流程拆分成小的任务单元，从某种意义上说，拆分后的任务单元就是**Fiber**。一个 Fiber 叫做一个任务单元。
在 React 中，每一个组件都可以被看作一个纯函数，一个 react 应用被渲染，可以被看作是函数的调用，在计算机中，函数调用被称作是函数调用栈，每一次函数调用，新函数作为一个新的栈帧被 push 到调用栈，一个栈可以被理解为计算机的一个调度单位。但是由于 js 和渲染线程是互相阻塞的，在原生的调用栈中，如果函数开始被执行，也就是说执行权被交给函数调用栈，在所有函数执行完毕，调用栈被清空，渲染线程一直被阻塞。这也是 stack reconciliation 性能问题的主要原因。Fiber 在此之上的优化想法就是能否实现一个自己的可控的虚拟调用栈，在内存中保持虚拟调用栈的上下文。

React 根据组件去拆分任务，每个任务可以称做 Fiber，Fiber 表现为一个 js 对象，其包含组件的信息，可以用以下结构表示

```ts
FiberNode {
	stateNode: {}; // 组件的一些信息
	child: FiberNode; // 儿子节点
	sibling: FiberNode; // 兄弟节点
	Parent: FiberNode; // 父亲节点
}
```

组件形成组件树，相应的 Fiber 组成一棵 Fiber 树，任务调度就是如何去操作这棵树的过程。
在新的 Fiber 架构中，一个更新被分为两个阶段，分别是

- Reconciliation Phase ， 更新 dom，过程是可以被打断的
- Commit Phase，提交阶段，一次性的将所有的 dom 渲染出来

## 参考

- [Build your own React](https://pomb.us/build-your-own-react/)
- [GitHub - acdlite/react-fiber-architecture: A description of React’s new core algorithm, React Fiber](https://github.com/acdlite/react-fiber-architecture)
- [浅谈 React Fiber - 知乎](https://zhuanlan.zhihu.com/p/77579841)
- [React Fiber 源码分析 （介绍） - 菜的黑人牙膏 - 博客园](https://www.cnblogs.com/Darlietoothpaste/p/9941117.html)
- [GitHub - reactjs/react-basic: A description of the conceptual model of React without implementation burden.](https://github.com/reactjs/react-basic)
- [React Fiber 是什么 - 知乎](https://zhuanlan.zhihu.com/p/26027085)
- [React Fiber 原理介绍 - 有赞美业前端团队 - SegmentFault 思否](https://segmentfault.com/a/1190000018250127)
