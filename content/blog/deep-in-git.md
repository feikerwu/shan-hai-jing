---
title: 深入理解git
date: 2020-08-12
description: 头条面试题，如何实现一个带并发控制的任务管理器
---


深入探索git底层原理以及常用操作


git (分布式版本管理系统) 是目前使用最广泛的一个版本控制系统，知其然以及知其所以然能帮助我们在开发过程中快速定位问题。

#### git 底层

git 是一个内容寻址文件系统，核心部分就是一个简单的 key-value 键值数据库，key 是一个 sha1 计算后的 hash 串，value 是压缩后的数据文件(blob)。

#### blob

git 仓库的所有文件都是用 blob(二进制数据文件)存储的，文件内容存储在.git/objects， 以文件内容的hash值前两位作为目录名，hash2位后作为文件名

![image](https://user-images.githubusercontent.com/39146693/88771659-28603900-d1b2-11ea-956b-8273e1fe473b.png)


git 以 `blob ${文件大小} \0 ${文件内容}` 来计算 hash，通过以下验证

```bash
echo 'test' | git hash-object --stdin
9daeafb9864cf43055ae93beb0afd6c7d144bfa4

echo 'blob 5\0test' | openssl sha1
9daeafb9864cf43055ae93beb0afd6c7d144bfa4
```





可以看到文本 test 通过 git 计算的 hash 和文本`blob 5\0test` 在 sha1 计算的 hash 值一样

#### tree

把文件cat出来，发现是一堆乱码，那是因为blob文件是被压缩过的，文件的头stat信息以及文件组织结构都被丢失了。

git用tree来保存这些信息，一个tree包括了

+ 指向其它tree或者blob的指针
+ 指针类型（它是tree还是blob）
+ 文件名
+ 文件权限（可读，可些，可执行）

可以把master分支上最新提交所指向的树对象打印出来看看

```bash
git cat-file -p master^{tree}

100644 blob 87adace1aa1660900f66db4db04afceb1c9973cd	.gitignore
100644 blob 5312291951904c9402e5b2ef79f3e7d5591e60df	TODO.md
040000 tree d5633113208cb719f0756b122b049f0fb0e1fc6c	dist
040000 tree ba509bd56e0c77ed2581e78c754535d323f7c47b	example
100644 blob bc3140ee20e132f81fbe67c49f4cfdffcbb7d7e3	package-lock.json
100644 blob 15861951236a4b10137918c87bbde51553e50c4b	package.json
040000 tree f27cd1e5968a1d240c3779ee4fd0bcb588f388b5	src
100644 blob e18e7f8d08f47ea47c97725b3eac5d0df80dcbdd	tsconfig.json
```

其实tree就是我们理解数据结果的那个tree，tree的中间节点指向其它的tree，叶子节点指向blob

![image](https://user-images.githubusercontent.com/39146693/88771714-3c0b9f80-d1b2-11ea-844f-79909d9fe299.png)


#### 其它优化

1. 如果git仓库中的存在文件出现多次，比如file-A被拷贝到dir-B/fiel-C，那么这个文件在git里面只会被保存一次，因为它的文件内容是一样，不一样的只是文件名以及文件位置，只要把这些信息保存在tree里面，就可以定位到具体的内容
2. git object 是压缩后的数据，如果 object 过多，git 会把资源数据打包成有个 Packfile，Packfile 保存文件内容，以及每次增量更新的修改。



### commit

每次的commit都指向一个tree，并且包含一些头信息

+ 代码修改者以及提交者
+ 日期
+ commit message
+ 当前commit的上一次提交，如果是merge操作，可能会有多个parent commit

git 会根据以上信息计算一个sha1，作为commit的唯一key

![image](https://user-images.githubusercontent.com/39146693/88771748-462d9e00-d1b2-11ea-9bda-747355298642.png)


每个commit都是当前代码的一次快照

可以通过一下操作验证

```bash
# 打印objects下的文件
tree .git/objects

objects/
├── 4b
│   └── 825dc642cb6eb9a060e54bf8d69288fbee4904
├── 9d
│   └── aeafb9864cf43055ae93beb0afd6c7d144bfa4
├── 9e
│   └── a265b576f105b3c7515c691fd6bd2d202d68a8
├── c0
│   └── 7b19257d9414174748d121caf7e6e09c753a6b
├── info
└── pack

# 通过git cat-file -t 找到上次commit提交的sha1
git cat-file -t 9ea265
commit

# 查看上次commit的信息
git cat-file -p 9ea265

tree c07b19257d9414174748d121caf7e6e09c753a6b
author feikerwu <feikerwu@gmail.com> 1576226621 +0800
committer feikerwu <feikerwu@gmail.com> 1576226621 +0800

init

## 可以看到一个commit的包含的所有信息
```



###  references

head, 标签以及分支都只是一个commit的引用，或者别名。引用信息存储在 `.git/refs` 文件夹下

```bash
tree .git/refs
.git/refs
├── heads
│   ├── master
│   └── test
└── tags
    └── tag-1


git log --oneline
9ea265b (HEAD -> master, tag: tag-1, test) init

# 查看文件内容
cat .git/refs/heads/master
9ea265b576f105b3c7515c691fd6bd2d202d68a8

```

通过以上，可以看到refs/heads/master 存储hash值和当前commit hash值相同



#### 标签 tag

git tag 给某个commit打标签，用于快速或检出有里程碑意义的commit。注意，tag确定，其指向的commit就不会变。

```bash
# 给最新的提交添加一个tag
git tag `tag-name`

# 给某个特定的commit添加一个tag
git tag `tag-name` `hash{8}`

# 给最新的提交添加一个tag，并且添加一些信息
git tag `tag-name` -m `message`
```



#### 分支 branch

branch 也是commit的引用，和tag不同的是，branch指向的commit会随着提交更新



### Tips

1. 如果有人在本地误操作将某条分支删除，并且没有推送到远程仓库，如何恢复

   注意到，分支只是commit的一个引用，只要commit没有被删除，提交内容都可以恢复 ，具体操作 如下

   ```bash
   ## 列出所有分支的提交记录，找到被删除分支的commit
   git relog
   ## 签出恢复
   git checkout `找到的commit`
   ```

2. 列出所有已经合入到 master 的分支` git branch —merged master`

3. 列出所有没有合入到 master 的分支 `git branch --no-merged maste`

4. 查看某个文件每一行的所有操作记录 `git blame ${filename}`

5. `git cherry-pick commitId[s]`，挑好看的樱桃，相对比于直接merge，cherry-pick可以只挑选部分commit到当前分支内容



##### 参考

[Git-内部原理-对象](https://git-scm.com/book/zh/v2/Git-内部原理-Git-对象)