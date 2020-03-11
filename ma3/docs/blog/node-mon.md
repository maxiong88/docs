---
title: 'nodemon的一些用法'
description: ''
sidebar: 'auto'
time: '2019-04-01'
prev: ''
next: ''
---


`nodemon`是一种工具，通过在检测到目录中的文件更改时自动重新启动节点应用程序来帮助开发基于node.js的应用程序。

安装：

`npm install -g nodemon`

### 用法：

`nodemon [你的节点应用]`

使用nodemon很简单，如果我的应用程序接受主机和端口作为参数，我会这样开始：

`nodemon ./server.js localhost 8080`

### 配置：

两种配置方式

+ nodemon.json
+ package.json
	- nodemonConfig: {}
	
### 监控多个目录：

默认情况下，nodemon监视当前工作目录。

如果要控制该选项，请使用该--watch选项添加特定路径：

`nodemon --watch app --watch libs app/server.js`

现在，只有在./app或./libs目录中有更改时，nodemon才会重新启动。
默认情况下，nodemon将遍历子目录，因此不需要显式包含子目录。

`不能使用通配符[globbing]传递多个目录`

### 指定扩展观察列表: `-e`

您可以使用`-e（或--ext）`开关指定自己的列表

`nodemon -e js，jade`

现在nodemon将重新启动在目录与扩展任何更改文件（或子目录）`.js，.jade`。

### 忽略文件: `--ignore`

忽略目录

`nodemon --ignore lib/ --ignore tests/`

忽略文件

`nodemon --ignore lib/app.js`

### 延迟重启：`--delay`

`nodemon --delay 10[ms/s] server.js`

延迟数是在重新启动之前延迟的秒数（或毫秒，如果指定）。
因此，nodemon只会在最后一次文件更改后的给定秒数内重新启动应用程序。

### 总结

``` js
  --config file ............ alternate nodemon.json config file to use
  -e, --ext ................ extensions to look for, ie. js,jade,hbs. 要查找的扩展 ie. js,jade
  -x, --exec app ........... execute script with "app", ie. -x "python -v".
  -w, --watch path.......... watch directory "path" or files. use once for
                             each directory or file to watch. 查看目录“path”或文件。对每个要监视的目录或文件使用一次
  -i, --ignore ............. ignore specific files or directories. 忽略特定文件或目录
  -V, --verbose ............ show detail on what is causing restarts.
  -- <your args> ........... to tell nodemon stop slurping arguments.

```
