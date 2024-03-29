---
tags: #blog
date: 2020-05-05
title: 如何实现一个并发控制的任务管理器
description: 头条面试题，如何实现一个带并发控制的任务管理器
---

---
title: 如何实现一个并发控制的任务管理器
date: 2020-05-05
description: 头条面试题，如何实现一个带并发控制的任务管理器
---
#blog

## 实现要点

1. 首先需要一个缓冲队列，将push的任务存储起来
2. 每次任务跑完之后需要告知调度器跑完了
3. 调度器接受到跑完的信息后去处理新的调度


## 代码
```ts
interface PromiseLikeJob {
  (...args: any[]): Promise<any>;
}

interface SchedulerInterface {
  // @todo: 更改类型any的写法，maybe infer可以支持
  add: (job: PromiseLikeJob) => Promise<any>;
}

interface SchedulerConfig {
  MAX_PARALLELISM: number;
}

class Scheduler implements SchedulerInterface {
  private buffer: Array<PromiseLikeJob> = [];

  private MAX_PARALLELISM: number = 2;
  private runningJobs: number = 0;

  constructor(config: SchedulerConfig) {
    this.MAX_PARALLELISM = config?.MAX_PARALLELISM;
  }

  add(job: PromiseLikeJob) {
    return new Promise((resolve) => {
      this.buffer.push(() =>
        job().then((res) => {
          resolve(res);
          this.runningJobs--;
          this.run();
        })
      );
      this.run();
    });
  }

  run() {
    if (this.runningJobs < this.MAX_PARALLELISM) {
      const cur = this.buffer.shift();
      if (cur) {
        this.runningJobs++;
        cur();
      }
    }
  }
}

// test code
const scheduler = new Scheduler();
const timeout = (delay: number) =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, delay)
  );

const addTask = (time: number, order: number) => {
  scheduler.add(() => timeout(time)).then(() => console.log(order));
};

addTask(1000, 1);
addTask(500, 2);
addTask(400, 3);
addTask(300, 4);

```