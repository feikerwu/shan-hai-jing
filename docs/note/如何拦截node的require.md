# 如何拦截node的require

都说知其然而知其所以然，require是我们做node开发接触最多的一个函数，了解require的原理有助对node模块系统的理解，还可以打出很多骚操作。
我比较喜欢带着问题去思考学习，所以这里也先来看两个例子。

## 问题
### jest module mock
jest 对 module 的 mock, 通过对module的mock，测试更聚焦当前模块。那jest是怎么mock module的呢
假设我们在test文件需要对 `models/user` 模块做mock，只需要在`models`下新建一个 `__mocks__` 目录，在`__mocks__`下新建一个user的mock文件，在测试脚本中通过`jest.mock`拦截`model/user`文件，`require('./model/user')` 引入的就是我们的mock文件。以下是相关代码

model/user 文件
```js
module.exports = {
  user: 'a',
}
```

model/__mocks/user 文件
```js
module.exports = {
  user: 'a_test',
}
```

测试脚本
```js
jest.mock('./model/user')
const a = require('./model/user')

test('test module mock', () => {
  expect(a).toEqual({ user: 'a_test' })
})

```

![](https://cdn.jsdelivr.net/gh/feikerwu/figure-bed@master/assets/20201014114612.png)


### module alias

[module-alias](https://github.com/ilearnio/module-alias), 不知道同志们有没有被相对路径折磨过，当路径层级深的时候，你又不想引进webpack之类的构建工具(eg, 只想写ts，tsc后直接用)，那一坨 `../../.././..`简直恶心，特别是想要改文件架构，只能在屎山糊屎。 module-alias 就是用于解决这个问题。

首先在 `package.json` 添加以下 alias 配置

```json
"_moduleAliases": {
  "@root"      : ".", // 项目根路径
  "@deep"      : "src/some/very/deep/directory/or/file",
  "@my_module" : "lib/some-file.js",
  "something"  : "src/foo",
}
```

然后在项目的启动文件最顶部添加以下代码，用户注册以上的alias配置到node

```js
require('module-alias/register')
```

最后，就可以快乐的使用 alias 别名来替代那一坨恶心的相对路径了

```js
require('module-alias/register')

const a = require('@root/a.js')
a()
```

## require 原理
通过上面两个例子，我们可以发现其都对require做了一些事情，不翻它们的源码，我们并不知道它在内部做了什么骚操作，即使翻了，你也不一定能看懂。所以我们可以考虑从require的原理出手，能不能自己实现上述两个例子的功能。

根据 [require api文档](https://nodejs.org/dist/latest-v14.x/docs/api/modules.html#modules_all_together)。require 加载模块流程如下

![](https://cdn.jsdelivr.net/gh/feikerwu/figure-bed@master/assets/20201014152406.png)

文件的解析算法可以参考[文件解析]https://nodejs.org/dist/latest-v14.x/docs/api/modules.html#modules_all_together

```
require(X) from module at path Y
1. If X is a core module,
   a. return the core module
   b. STOP
2. If X begins with '/'
   a. set Y to be the filesystem root
3. If X begins with './' or '/' or '../'
   a. LOAD_AS_FILE(Y + X)
   b. LOAD_AS_DIRECTORY(Y + X)
   c. THROW "not found"
4. If X begins with '#'
   a. LOAD_PACKAGE_IMPORTS(X, dirname(Y))
5. LOAD_PACKAGE_SELF(X, dirname(Y))
6. LOAD_NODE_MODULES(X, dirname(Y))
7. THROW "not found"

LOAD_AS_FILE(X)
1. If X is a file, load X as its file extension format. STOP
2. If X.js is a file, load X.js as JavaScript text. STOP
3. If X.json is a file, parse X.json to a JavaScript Object. STOP
4. If X.node is a file, load X.node as binary addon. STOP

LOAD_INDEX(X)
1. If X/index.js is a file, load X/index.js as JavaScript text. STOP
2. If X/index.json is a file, parse X/index.json to a JavaScript object. STOP
3. If X/index.node is a file, load X/index.node as binary addon. STOP

LOAD_AS_DIRECTORY(X)
1. If X/package.json is a file,
   a. Parse X/package.json, and look for "main" field.
   b. If "main" is a falsy value, GOTO 2.
   c. let M = X + (json main field)
   d. LOAD_AS_FILE(M)
   e. LOAD_INDEX(M)
   f. LOAD_INDEX(X) DEPRECATED
   g. THROW "not found"
2. LOAD_INDEX(X)

LOAD_NODE_MODULES(X, START)
1. let DIRS = NODE_MODULES_PATHS(START)
2. for each DIR in DIRS:
   a. LOAD_PACKAGE_EXPORTS(X, DIR)
   b. LOAD_AS_FILE(DIR/X)
   c. LOAD_AS_DIRECTORY(DIR/X)

NODE_MODULES_PATHS(START)
1. let PARTS = path split(START)
2. let I = count of PARTS - 1
3. let DIRS = [GLOBAL_FOLDERS]
4. while I >= 0,
   a. if PARTS[I] = "node_modules" CONTINUE
   b. DIR = path join(PARTS[0 .. I] + "node_modules")
   c. DIRS = DIRS + DIR
   d. let I = I - 1
5. return DIRS

LOAD_PACKAGE_IMPORTS(X, DIR)
1. Find the closest package scope SCOPE to DIR.
2. If no scope was found, return.
3. If the SCOPE/package.json "imports" is null or undefined, return.
4. let MATCH = PACKAGE_IMPORTS_RESOLVE(X, pathToFileURL(SCOPE),
  ["node", "require"]) defined in the ESM resolver.
5. RESOLVE_ESM_MATCH(MATCH).

LOAD_PACKAGE_EXPORTS(X, DIR)
1. Try to interpret X as a combination of NAME and SUBPATH where the name
   may have a @scope/ prefix and the subpath begins with a slash (`/`).
2. If X does not match this pattern or DIR/NAME/package.json is not a file,
   return.
3. Parse DIR/NAME/package.json, and look for "exports" field.
4. If "exports" is null or undefined, return.
5. let MATCH = PACKAGE_EXPORTS_RESOLVE(pathToFileURL(DIR/NAME), "." + SUBPATH,
   `package.json` "exports", ["node", "require"]) defined in the ESM resolver.
6. RESOLVE_ESM_MATCH(MATCH)

LOAD_PACKAGE_SELF(X, DIR)
1. Find the closest package scope SCOPE to DIR.
2. If no scope was found, return.
3. If the SCOPE/package.json "exports" is null or undefined, return.
4. If the SCOPE/package.json "name" is not the first segment of X, return.
5. let MATCH = PACKAGE_EXPORTS_RESOLVE(pathToFileURL(SCOPE),
   "." + X.slice("name".length), `package.json` "exports", ["node", "require"])
   defined in the ESM resolver.
6. RESOLVE_ESM_MATCH(MATCH)

RESOLVE_ESM_MATCH(MATCH)
1. let { RESOLVED, EXACT } = MATCH
2. let RESOLVED_PATH = fileURLToPath(RESOLVED)
3. If EXACT is true,
   a. If the file at RESOLVED_PATH exists, load RESOLVED_PATH as its extension
      format. STOP
4. Otherwise, if EXACT is false,
   a. LOAD_AS_FILE(RESOLVED_PATH)
   b. LOAD_AS_DIRECTORY(RESOLVED_PATH)
5. THROW "not found"
```

## 实验解决
根据示意图可以看到`require`函数的结果只可能来与两个地方

1. 缓存
2. 根据解析算法

我们可以从这两个方向去思考怎么去做文章

1. 针对缓存，可否变种缓存预热，提前将我们想要的加载的模块塞入到缓存，require时直接读取缓存数据
2. hook 解析算法，拦截原生的文件解析，在文件解析前就将符合条件的数据返回

做个实验测试下以上两种方案的可行性

### 缓存预热

在 a.js 写入

```js
module.exports = () => console.log('a')
```

在b.js 写入

```js
module.exports = () => console.log('b')
```

实现一个预热函数，删除 `a.js`的缓存，在 `a.js`的key下写入 `b.js`模块，核心代码如下

```js
function warmingCache(id, mockId) {
  const filename = require.resolve(id)
  const mockFilename = require.resolve(mockId)
  if (require.cache[filename]) {
    delete require.cache[filename]
  }
  require(mockId)
  require.cache[filename] = require.cache[mockFilename]
}

warmingCache('./a', './b')
const a = require('./a')
a()
```

打印出了 `b`, 说明通过cache去拦截module加载是可行的。

### 拦截解析算法
简单翻了下 require 的 源码，调用require加载依赖时，会在内部调用 `Module._resolveFilename` 去解析路径，详细源码可以参考 [Module](https://github.com/nodejs/node/blob/44a66adbaa9d82cf70b6569701359b9a871acd31/lib/internal/modules/cjs/loader.js#L805)

那我们可以考虑在调用Module._resolveFilename之前去做一些事情, 伪代码如下

```js
const originResolveFilename = Module._resolveFilename.bind(Module)
Module._resolveFilename = (...args) => {
  doSomething() // 先做我们自己的操作
  originResolveFilename(...args)
}
```

做个alias功能，将路径的 `@` 解析为`__dirname/./`, 源码如下

```js
const Module = require('module')
const path = require('path')

const originalResolveFilename = Module._resolveFilename
Module._resolveFilename = function hookRequire(request, ...args) {
  if (request.startsWith('@')) {
    request = path.join(__dirname, '.', request.substr(1))
  }
  return originalResolveFilename.call(this, request, ...args)
}

const a = require('@/a')
a()
```

能够打印出a，说明这个拦截方案也OK


module-alias 的实现和上面alias的小demo一样，将alias配置表写在package.json, 拦截 __resolveFilename，将alias别名替换，源码可以见 [源码](https://github.com/ilearnio/module-alias/blob/0d946dfb3f475061512043da3efc2dce4808ceab/index.js#L30)

## 总结

可以通过以下方式来拦截node的require
1. 预写缓存
2. 复写Module._resolveFilename



## 参考

+ [module-alias](https://github.com/ilearnio/module-alias)