type FuncReturnPromise = (...args: any[]) => Promise<any>;

/**
 * 串行任务
 */
const chain = (jobs: Array<FuncReturnPromise>) => (...args: Array<any>) =>
  jobs.reduce((a, b) => a.then(b), Promise.resolve(args));

const jobs: Array<FuncReturnPromise> = [
  (...args) => {
    console.log(args);
    console.log('a');
    return Promise.resolve(1);
  },
  (...args) => {
    console.log(args);
    console.log('b');
    return Promise.resolve(2);
  },
];

// function chain(jobs: Array<FuncReturnPromise>) {
//   return (...args: Array<any>) =>

// }

chain(jobs)(123);
