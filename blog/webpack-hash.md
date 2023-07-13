---
tags: #blog
date: 2020-08-06
title: webpack hash 实现以及nginx的hash实现对比
description: webpack hash实现以及nginx的hash实现对比
---

---
title: webpack hash 实现以及nginx的hash实现对比
date: 2020-08-06
description: webpack hash实现以及nginx的hash实现对比
---

#blog 

webpack 使用 node 的 `crypto` 包生成对应的文件的签名, [源码](https://github.com/webpack/webpack/blob/master/lib/util/createHash.js), 只对文件内容 hash，文件修改时间发生变化，而内容不变，则生成的文件摘要也无变化。

crypto 在当前支持的 openssl 算法可以通过

```bash
openssl list-message-digest-algorithms 获取
```

以下是生成摘要的简单 demo

```ts
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

const HASH_ALGORITHM = 'sha256';
const filename = path.join(__dirname, './index.ts');

const hash = crypto.createHash(HASH_ALGORITHM);

fs.promises.readFile(filename).then((chuck) => {
  console.log(chuck.toString());
  hash.update(chuck);
  console.log(`${hash.digest('hex')} ./index.ts`);
});
```

验证如下:

1. webpack 构建，生成 hash1
2. `touch` 修改文件的 mtime
3. webpack 再次构建，生成 hash2，和 hash1 比对

## Etag 生成

不同的服务器，其 ETag 生成方式不同，以 nginx 为例, nginx 根据文件大小以及文件的修改时间生成 ETag，
[代码地址](https://github.com/mikewest/nginx-static-etags/blob/25bfaf971123f3c7a177bc25d3d69225948beb16/ngx_http_static_etags_module.c#L143)

所以 ETag 发生变化，文件不一定发生变化

ETag 可用于

1. 避免内容编辑时的空中碰撞
2. 缓存未更改的资源
