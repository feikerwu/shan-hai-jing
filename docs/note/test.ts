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

// expected output: 2 3 1 4
