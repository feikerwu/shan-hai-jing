---
title: 如何实现锚点定位双向更新
date: 2020-12-02
description: 
---

在一些静态站点，页面滑动，页面大纲会随着页面滑动对应更新，如下图

![image-20201202180219478](https://cdn.jsdelivr.net/gh/feikerwu/figure-bed@master/assets/image-20201202180219478.png)

这里有一种对应关系

+ 页面滑动时，目录对应条目高亮
+ 点击目录对应条目，页面滑动到对应位置

这里看下如何比较优雅的实现这种场景

## 前置

我们有页面各个标题的内容，以及标示信息，比如id。结构类似

```json
[
  {
    "depth": 1,
    "id": "字符串匹配",
    "value": "字符串匹配"
  },
  {
    "depth": 2,
    "id": "暴力",
    "value": "暴力"
  },
  {
    "depth": 2,
    "id": "rk",
    "value": "RK"
  },
  {
    "depth": 2,
    "id": "kmp",
    "value": "KMP"
  },
  {
    "depth": 2,
    "id": "基于有限自动机的字符串匹配",
    "value": "基于有限自动机的字符串匹配"
  },
  {
    "depth": 2,
    "id": "参考",
    "value": "参考"
  }
]
```

### 点击目录，更新页面位置

这个比较好处理，给每个标题一个链接锚点，锚点为

```js
`${window.location.hostname}${window.location.pathname}#${标题id}/`
```

比如 `字符串匹配`的路径可能为 `https://example.com/path/#字符串匹配`，点击目录滚动到对应锚点即可。

1. 通过`a`标签，`<a href="https://example.com/path/#字符串匹配">`跳转

2. 通过`scrollIntoView` 滑动, id为对应的标题id

   ```js
    document
       .getElementById(id)
       .scrollIntoView({ inline: 'nearest', behavior: 'smooth' });
   ```



### 页面位置变更，目录对应更新

这里有两个方案

1. 监听页面滚动位置，判断哪个标题内容进入到视图，然后更新对应的目录标题样式
2. 浏览器提供了原生的API `IntersectionObserver`, 用于观测DOM元素的交叉情况，我们使用``IntersectionObserver`监听各个标题区块即可

将对应逻辑抽出一个hook

```tsx
import React, { useState, useEffect } from 'react';

/**
 * 获取当前锚点id
 * @param anchorsId 锚点ids
 */
const useAnchor = (anchorsId: string[]) => {
  const [activeAnchor, setActiveAnchor] = useState(null);
  useEffect(() => {
    // 观测进入到视图的内容
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveAnchor(entry.target.id);
        }
      });
    });

    forEach(anchorsId, id => observer.observe(document.getElementById(id)));

    return () =>
      forEach(anchorsId, id => observer.unobserve(document.getElementById(id)));
  }, []);

  return activeAnchor;
};

/**
 * 对一个可遍历对象每一个元素操作
 * @param iterator 可遍历对象
 * @param func 操作函数
 */
function forEach<T>(iterator: Iterable<T>, func: (args: T) => unknown): void {
  for (let val of iterator) {
    func(val);
  }
}

export default useAnchor;

```

获取到当前进入到页面的标题id后，更新目录。