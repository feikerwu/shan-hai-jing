---
title: linux 软链
date: 2020-05-05
description: linux 的软链接硬链接实验
---

## linux 软链

### linux 硬链接和软链接

linux 链接分为两种，分别是硬链接和软链接。

linux 中的文件都有个文件索引(Inode Index)表示其唯一性。

硬链接是指多个文件名指向同一个文件索引, 有以下特性:

1. 只有当所有文件路径被删除完，磁盘中的文件索引才会被删除。
2. 删除一个硬链接不会影响到其它的链接。
3. 修改一个文件名内的内容，会影响到其它硬链接

软链接是一个文本文件，其内有指向其它文件或者目录的位置信息，有以下特性

1. 修改软链内容会影响原文件内容
2. 删除原文件则软链失效。

### 实验

linux 上 `ln` 命令生成软链接或硬链接。

```bash
 ln

  Creates links to files and directories.

  - Create a symbolic link to a file or directory:
    ln -s path/to/file_or_directory path/to/symlink

  - Overwrite an existing symbolic to point to a different file:
    ln -sf path/to/new_file path/to/symlink

  - Create a hard link to a file:
    ln path/to/file path/to/hardlink
```

```bash
echo "test" >> test1
ln test1 test2 # 生成test2硬链接
echo "test2" >> test2 # 在test2文件后面追加一行test2
cat test1 # 打印两行，分别为test test2

ln -s test1 test3 # 生成test3软链接
cat test3 # 打印test test2两行
echo "test3" >> test3
cat test2 # 打印 test test2 test3 三行
rm test
cat test3 # 能正常打印
rm test2
cat test3 #  No such file or directory
```

## npm link

`npm link` 做了两件事

1. 生成软链`{prefix}/lib/node_modules/<package>`，将其指向当前的目录
2. 将当前目录的可执行 bin 文件生成软链，软链地址为 `{prefix}/bin/{name}`

其中的`{prefix}`为 npm 中全局下载目录前缀，可通过`npm prefix -g` 获取，以本机为例

```bash
npm prefix -g
/Users/feiwu/.nvm/versions/node/v10.20.1
```

以下是在本机下`npm link`实验

```bash
npm link
/Users/feiwu/.nvm/versions/node/v10.20.1/bin/fei -> /Users/feiwu/.nvm/versions/node/v10.20.1/lib/node_modules/fei-cli/dist/index.js
/Users/feiwu/.nvm/versions/node/v10.20.1/lib/node_modules/fei-cli -> /Users/feiwu/code/github/fei-cli
```

查看软链具体信息

```bash
ls -li /Users/feiwu/.nvm/versions/node/v10.20.1/bin/fei
2867279 lrwxr-xr-x 1 feiwu staff 41 4 30 17:07 /Users/feiwu/.nvm/versions/node/v10.20.1/bin/fei -> ../lib/node_modules/fei-cli/dist/index.js

ls -li /Users/feiwu/.nvm/versions/node/v10.20.1/lib/node_modules/fei-cli
10290554 lrwxr-xr-x  1 feiwu  staff  32  6 28 00:02 /Users/feiwu/.nvm/versions/node/v10.20.1/lib/node_modules/fei-cli -> /Users/feiwu/code/github/fei-cli
```
