---
title: 'Vue 规范'
description: ''
time: '2020-10-27'
prev: ''
next: ''
tags:
    - 'javascript'
    - 'vue'
---


### 事件命名规范
+ camelCase： 小驼峰法- myEvent
+ PascalCase： 大驼峰法- MyEvent
+ kebab-case： 短横拼写法- my-event

我们推荐你始终使用 **kebab-case** 的事件名。

``` js
<my-component @my-event="doSomething"></my-component>
```

