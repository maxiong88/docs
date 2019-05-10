---
title: webpack 优化（持续）
description: ''
sidebar: 'auto'
time: '2119-05-01'
prev: ''
next: ''
---



## webpack 4.0

+  `mode` 配置模式 告诉 `webpack` 应该使用哪种模式
    - development
        + 会将 `process.env.NODE_ENV` 的值设为 `development`。启用 :
            - `NamedChunksPlugin` 将chunkId变成文件名，从而固定chunkId
            - `NamedModulesPlugin` 使用HMR时，会显示模块的相对路径
    - production
        + 会将 `process.env.NODE_ENV` 的值设为 `production`。启用 ：        
            - `FlagDependencyUsagePlugin` 
            - `FlagIncludedChunksPlugin`, 
            - * `ModuleConcatenationPlugin`, `Scope hoisting`
            - `NoEmitOnErrorsPlugin`,  遇到错误代码不跳出
            - `OccurrenceOrderPlugin`, webpack就能够比对id的使用频率和分布来得出最短的id分配给使用频率高的模块 `new webpack.optimize.OccurenceOrderPlugin()`
            - * `SideEffectsFlagPlugin` 开启`tree-shaking`消除死代码
            - `UglifyJsPlugin` 开启压缩js css `new webpack.optimize.UglifyJsPlugin()`