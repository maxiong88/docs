---
title: '教你写插件(-)，读懂Vue.use()'
description: ''
sidebar: 'auto'
time: '2019-08-01'
prev: ''
next: ''
---

[官方文档](//cn.vuejs.org/v2/api/#Vue-use)

安装 Vue.js 插件。如果插件是一个对象，必须提供 install 方法。如果插件是一个函数，它会被作为 install 方法。install 方法调用时，会将 Vue 作为参数传入。

该方法需要在调用 new Vue() 之前被调用。

当 install 方法被同一个插件多次调用，插件将只会被安装一次。

```js
// 举例
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import Vuex from 'vuex';
Vue.use(Vuex)
```

来读一下源码

Flow 是 facebook 出品的 JavaScript 静态类型检查工具

``` js
/* @flow */

// 将类数组转为真正的数组
import { toArray } from '../util/index'

export function initUse (Vue: GlobalAPI) {
    // 入参必须是函数或者对象
    Vue.use = function (plugin: Function | Object) {
        // 如果插件源 存在此插件就不会多次安装
        const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))
        if (installedPlugins.indexOf(plugin) > -1) {
            return this
        }

        // additional parameters 获取参数
        const args = toArray(arguments, 1)
        // 追加this Vue实例
        args.unshift(this)
        // 如果有install方法
        if (typeof plugin.install === 'function') {
            // 执行plugin 指针this保持不变
            plugin.install.apply(plugin, args)
        // 如果传入是函数
        } else if (typeof plugin === 'function') {
            // 执行plugin 传入参数
            plugin.apply(null, args)
        }
        // 当前插件进入插件源
        installedPlugins.push(plugin)
        return this
    }
}
```

现在我们发现 Vue.use() 的注册本质上就是执行了一个 install 方法，install 里的内容由开发者自己定义，通俗讲就是一个钩子可能更贴近语义化而已。