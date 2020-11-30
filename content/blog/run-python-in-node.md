---
title: 如何在 nodejs 内解析其它脚本
date: 2020-07-08
description: 原题,启动一个 Node Server，通过这个 Server 访问一个 php 文件，怎么输出运行解析 php 后的结果？
---

原题: 启动一个 Node Server，通过这个 Server 访问一个 php 文件，怎么输出运行解析 php 后的结果？

不会 php，用 python 意思一下，理论上是一样的。

给定一个 python 脚本， 如果获取其执行结果

```python
print 'hello world'
```

主旨思想是在 node 内启动一个子进程用于解析 python, 实现如下，如果严谨一点还可以
通过 node 先去安装 python 然后再执行脚本

```ts
import { spawn } from 'child_process'
import path from 'path'

const pyExec = spawn('python', [path.resolve(__dirname, './test_print.py')])

pyExec.stdout.on('data', data => console.log(`node received data: ${data}`))
pyExec.stderr.on('data', err => console.error(`node received error: ${err}`))

pyExec.on('close', code => {
  console.log(`child process exited with code ${code}`)
})
```
