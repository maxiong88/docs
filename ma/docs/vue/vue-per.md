---
title: '优化'
description: '延迟加载、按路由拆分代码'
sidebar: 'auto'
time: ''
prev: ''
next: ''
---

摘自：https://itnext.io/@frakowski

+ 延迟加载与性能优化
    - 在浏览器使用 `source` -> `ctrl+shift+p` ->  `start coverage` -> `changes` 来查看文件代码是否被使用，红色代表没有被使用，绿色表示被使用了
    - 动态导入：通过模块内的内联函数调用拆分代码
        ``` js
        const lazyComponent = () => import('./lazyComponent.vue');
        ```

+ vue-router路由懒加载、[webpack的SplitChunksPlugin将公共依赖项分组到一个单独的包中](//webpack.js.org/plugins/split-chunks-plugin/)

+ 代码拆分我们的状态管理 - Vuex模块 `registerModule` =>  `unregisterModule` 动态加载