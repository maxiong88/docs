---
title: vue入门
date: 2017-1-16 14:30:16
tags:  vue
---

### vue 介绍

Vue.js（读音 /vjuː/, 类似于 view） 是一套构建用户界面的 渐进式框架。与其他重量级框架不同的是，Vue 采用自底向上增量开发的设计。Vue 的核心库只关注视图层，并且非常容易学习，非常容易与其它库或已有项目整合。另一方面，Vue 完全有能力驱动采用单文件组件和 Vue 生态系统支持的库开发的复杂单页应用。

Vue 最显著的特性之一便是不太引人注意的响应式系统

Vue.js 的目标是通过尽可能简单的 API 实现响应的数据绑定和组合的视图组件。


<!-- more -->


[vue中文](http://vuefe.cn)

[vue官网](https://vuejs.org/)

[nodejs中文](https://nodejs.cn)

[git](https://git-scm.com/downloads)

### 安装vue-cli

		全局安装 vue-cli
		
		$ npm install --gloabl vue-cli
		
		创建一个基于 webpack 模版的新项目
		
		$ vue init webpack my-project

![Alt text](../css/images/20161221164039.png)

		安装依赖
		
		$ cd my-project
		
		$ npm install

		$ npm run dev


`注意：新版的vue-cli里面会提示安装vue-router`



### 基础知识

* router-view

	他会渲染路由组件

	Vue适合单页面应用，当你需要多个页面的时候，传统的web是通过转跳链接的方式实现的，而Vue可以通过路由的方式实现页面的跳转

	主要是构建 SPA (单页应用) 时，方便渲染你指定路由对应的组件。你可以 router-view 当做是一个容器，它渲染的组件是你使用 vue-router 指定的



###### 渐进式框架：

【大概就是你不必一开始就用Vue所有的全家桶，根据场景，官方提供了方便的框架供你使用。】

【大概就是你不必一开始就用Vue所有的全家桶，根据场景，官方提供了方便的框架供你使用。】

###### 自底向上设计：

[自底向上设计](http://baike.baidu.com/link?url=ojAIhzth9XRh4A58YIFzztyqmr9jfCo54FtH_FO7_ZybzqDh8SXSG9sxHi1FDF_X3BnSqxC5xOXsBgSigvTywpud8hqodhJu8rFMvi4TmD5QNrb5ySpWzzVmr_fNzFGuInv_4mZltRe53V3_dt-Eoq)

【一种设计程序的过程和方法。自底向上的程序设计就是先编写出基础程序段，然后再逐步扩大规模、补充和升级某些功能，实际上是一种自底向上构造程序的过程。】

###### 端口号查询

运行--cmd--：netstat -aon|findstr "8080"
       
结束进程：taskkill /pid(进程码) -t(结束该进程) -f(强制结束该进程以及所有子进程)

例如： taskkill /pid 2552 -f

##### 环境变量问题

bath : vue not commend

用户变量：

PATH：C:\Program Files (x86)\nodejs\node_global\

系统变量：

NODE_PATH：C:\Program Files (x86)\nodejs\node_global\node_modules

path：C:\Program Files (x86)\nodejs\node_global\

###### webpack  代理

vue-cli==》==config==》==index.js

`dev`

```js
    // 配置代理,ajax url  直接输出 /api/参数
    proxyTable: {
        '/api': {
            target: 'http://newpull.hsdk.dev.yingxiong.com:80',
            changeOrigin: true,
            pathRewrite: {
                '^/api': ''
            }
        }
    },
```

`build`

assetsPublicPath: './',




###### vue  api

vm.$on(event,callback)

监听当前实例上的自定义事件，事件可以由vm.$emit触发。回调函数会接收所有传入事件触发函数的额外参数

子父通信的时候，子组件使用$emit触发，父组件用$on监听

```

vm.$on('test', function (msg) {
  console.log(msg)
})
vm.$emit('test', 'hi')
// -> "hi"

```
vm.$emit(event,[...args])

触发当前实例上的事件。附加参数都会传给监听器回调

vm.$data 

Vue实例观察的数据对象，Vue实例代理了对其data对象属性的访问。

vm.$props

表示已接收组件的当前道具的对象。Vue实例代理了对齐props对象属性的访问。

vm.$el

vue实例使用的根DOM元素

vm.$options

用于当前vue实例的初始化选项。需要在选项中包含自定义属性时会有用处

```
new Vue({
  customOption: 'foo',
  created: function () {
    console.log(this.$options.customOption) // -> 'foo'
  }
})

```

vm.$parent

父实例

vm.$root

当前组件树的根Vue实例，如果没有父实例将会使自己

vm.$children

当前实例的直接子组件，需要注意$children并不保证顺序，也不是响应式的。

vm.$slot （重点。。。介绍）



