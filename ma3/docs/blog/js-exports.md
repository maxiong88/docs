---
title: export使用方法
description: '再看axios源码的时候看到了 module.exports module.exports.default export export default'
sidebar: 'auto'
time: '2015-01-03'
prev: ''
next: ''
---



## CommonJS模块规范

exports 

module.exports

::: tip
通过 require('') 导出
exports是引用 module.exports的值。
module.exports 被改变的时候，exports不会被改变，而模块导出的时候，
真正导出的执行是module.exports，而不是exports
:::

``` js
module.exports = Axios
module.exports.default = Axios

会使Axios陷入无限引用状态

```

## ES6模块规范

export 输出

import 输出进口引入

export default 输出 未定义

::: tip
用export default，import语句不需要使用大括号；
使用export default命令，为模块指定默认输出；
一个模块只能有一个默认输出，所以export default只能使用一次；
用export，对应的import语句需要使用大括号；
如果在一个页面 既包含export  有包含export default 只能通过 import * as obj from '' 导出，
按 es6 的规范 import * as obj from "xxx" 会将 "xxx" 中所有 export 导出的内容组合成一个对象返回。如果都使用 es6 的规范，这个是很明确的。
:::


## babel

我们在写export、export default的时候babel都会给我们转化成

``` js{7}
export var name="李四";

export default {}

转


"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var name = exports.name = "李四";

exports.default = {};
```
