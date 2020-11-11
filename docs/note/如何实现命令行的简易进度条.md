
### 如何实现一个命令行的进度条

很多CLI工具为了提高DX，在做耗时长的工作时，都会在命令行显示一个进度条。web端的进度条写多了，命令行的进度条还没写过，所以这里造个简易轮子，了解下原理。

#### 任务分解
分解下任务，要实现一个进度条，要做到以下工作
1. 传入一个进度数值X，绘制100%的进度容器和X%的进度条部分部分
这个实现简单，只需要 X% 部分和(100-X)%部分的字符不同即可。


2. 每次进度变化，清除当前已绘制部分，绘制更新后的进度内容
在浏览器端实现这点很容易，清除绘制部分都由渲染进程处理，在命令行终端可以用 ANSI 转义序列控制字符绘制，具体可以参考 [维基百科](https://zh.wikipedia.org/wiki/ANSI%E8%BD%AC%E4%B9%89%E5%BA%8F%E5%88%97)

简单来说，ANSI 就是控制终端输出的色彩、样式、光标位置以及控制终端行为的特殊字节. 一个ANSI转义字符通常以  `\x1b[` 开头，`\x1b[` 也叫做 CSI (Control Sequence Introducer), CSI
后面跟不同的编码可以表示不同的字符格式。

#### ANSI
For Many Examples,
+ 显示红字
  ```bash
  echo '\x1b[31;m hello world!'
  ```
  ![](https://cdn.jsdelivr.net/gh/feikerwu/figure-bed@master/assets/20201110145001.png)
+ 光标移动，清除整行
  ```bash
  echo "hello world \x1b[2K"
  ```
  ![](https://cdn.jsdelivr.net/gh/feikerwu/figure-bed@master/assets/20201110145800.png)

+ 来一手五彩斑斓的A
  ```js
  const forecolor = [];
  const backcolor = [];

  for (let i = 30; i <= 37; i++) {
    forecolor.push(i, i + 60);
    backcolor.push(i + 10, i + 70);
  }

  for (let f of forecolor) {
    let str = '';
    for (let b of backcolor) {
      str += `\x1b[${f};${b}m A `;
    }
    str += `\x1b[2k`;
    console.log(str);
  }

  ```
  ![](https://cdn.jsdelivr.net/gh/feikerwu/figure-bed@master/assets/20201110152003.png)

其它具体的转义码参考 [维基百科](https://zh.wikipedia.org/wiki/ANSI%E8%BD%AC%E4%B9%89%E5%BA%8F%E5%88%97)，现在画笔画板都有了，图怎么画就看画家的手了。

#### 简易进度条
有了以上的前置知识，写了简单的进度条就简单了

```ts
const prefix = '[';
const postfix = ']';
const MAX_CHARS = 40;

function render(precent: number) {
  const arrowNumber = ~~(MAX_CHARS * precent);
  const bar = '>'.repeat(arrowNumber) + ' '.repeat(MAX_CHARS - arrowNumber);
  const curProcessbar = `\x1b[1A\x1b[2K${prefix}${bar}${postfix} ${Math.floor(
    precent * 100
  )}%`;
  console.log(curProcessbar);
}

let cur = 0;
const timer = setInterval(() => {
  if (cur >= 100) {
    clearInterval(timer);
    return;
  }
  cur++;
  render(cur / 100);
}, 16);
```

<img alt="" class="lazyload inited loaded" data-src="https://cdn.jsdelivr.net/gh/feikerwu/figure-bed@master/assets/svg-2.svg?sanitize=true&amp;1" data-width="800" data-height="600" src="https://cdn.jsdelivr.net/gh/feikerwu/figure-bed@master/assets/svg-2.svg?sanitize=true&amp;1">


给你点 color 看看
```ts
const MAX_CHARS = 40;

function render(precent: number) {
  const arrowNumber = ~~(MAX_CHARS * precent);
  const bar =
    '\x1b[31m' +
    '▓'.repeat(arrowNumber) +
    '\x1b[34m' +
    '░'.repeat(MAX_CHARS - arrowNumber);
  const curProcessbar = `\x1b[1A\x1b[2K${bar} ${Math.floor(precent * 100)}%`;
  console.log(curProcessbar);
}

let cur = 0;
const timer = setInterval(() => {
  if (cur >= 100) {
    clearInterval(timer);
    return;
  }
  cur++;
  render(cur / 100);
}, 16);

```

<img alt="" class="lazyload inited loaded" data-src="https://cdn.jsdelivr.net/gh/feikerwu/figure-bed@master/assets/svg-1.svg" data-width="800" data-height="600" src="https://cdn.jsdelivr.net/gh/feikerwu/figure-bed@master/assets/svg-1.svg">

### 总结

> ANSI转义序列（ANSI escape sequences）是一种带内信号的转义序列标准，用于控制视频文本终端上的光标位置、颜色和其他选项。在文本中嵌入确定的字节序列，大部分以ESC转义字符和"["字符开始，终端会把这些字节序列解释为相应的指令，而不是普通的字符编码。

命令行也是终端一种，对用户可视的都是前端范畴，学会了ANSI也可以命令行内写画骚操作。

[github地址](https://github.com/feikerwu/shan-hai-jing)

### 参考
[ANSI 转义序列](https://zh.wikipedia.org/wiki/ANSI%E8%BD%AC%E4%B9%89%E5%BA%8F%E5%88%97)