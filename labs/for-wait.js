const sleep = s => {
  return new Promise(resolve => {
    setTimeout(resolve, s * 1000);
  });
};

const asyncTask = async t => {
  await sleep(t);
  return t;
};

const tasks = [Promise.resolve(1), asyncTask(2), asyncTask(1)];

const run = async () => {
  for await (const taskResult of tasks) {
    console.log(taskResult);
  }
};

run();

console.log(3);
