---
title: eventLoop 事件循环机制
description: ''
sidebar: 'auto'
time: '2019-05-01'
prev: ''
next: ''
---

## 定义


事件循环有一个或多个任务队列[task queue]。任务队列是按顺序排列的任务列表，可以是：

+ Events
    - 并非所有事件都是使用任务队列调度的
    - 在特定的EventTarget对象上异步调度事件对象是一项任务
+ Parsing 语法分析
    - HTML解析器标记一个或多个字节，然后处理任何生成的标记，通常是一项任务。
+ Callbacks 回调
    - 异步调用回调是一项任务。
+ Using a resource 使用资源
    - 当算法提取资源时，如果提取是异步进行的，那么一旦部分或全部资源可用，资源的处理就是一项任务。
+ Reacting to DOM manipulation 对DOM操作
    - 有些元素具有响应DOM操作而触发的任务，例如，当该元素插入到文档中时。

[官网](//www.w3.org/TR/2011/WD-html5-20110525/webappapis.html#event-loop)

只要事件循环存在，它就必须连续运行以下步骤：

