## for await 和 Promise.all 的区别

### for await

`for await ...of...` 是ES6的语法，用于处理异步任务，当对象或者数组部署了异步迭代器, 都可以通用`for await`处理。

for example
如果数据内都异步任务，可以通过 `for await` 获取每个异步任务的执行结果
```js
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
```

上述脚本输出

```bash
3 1 2 1
```
说明`for await`是串行执行的。

### Promise.all



### 参考
[异步遍历器](https://es6.ruanyifeng.com/?search=for+await+&x=0&y=0#docs/async-iterator)