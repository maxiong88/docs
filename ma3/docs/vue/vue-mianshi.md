---
title: 'Vue 知识点'
description: ''
sidebar: 'auto'
time: '2019-08-01'
prev: ''
next: ''
---


## Vue事件绑定原理说一下

每一个Vue实例都是一个Event Bus，当子组件被创建的时候，父组件将事件传递给子组件，子组件初始化的时候是有$on方法将事件注册到内部，在需要的时候使用$emit触发函数，而对于原生native事件，使用addEventListener绑定到真实的DOM元素上。

## Vue模板渲染的原理是什么？

vue中的模板template无法被浏览器解析并渲染，因为这不属于浏览器的标准，不是正确的HTML语法，所有需要将template转化成一个JavaScript函数，这样浏览器就可以执行这一个函数并渲染出对应的HTML元素，就可以让视图跑起来了，这一个转化的过程，就成为模板编译。
模板编译又分三个阶段，解析parse，优化optimize，生成generate，最终生成可执行函数render。

+ parse阶段：使用大量的正则表达式对template字符串进行解析，将标签、指令、属性等转化为抽象语法树AST。
+ optimize阶段：遍历AST，找到其中的一些静态节点并进行标记，方便在页面重渲染的时候进行diff比较时，直接跳过这一些静态节点，优化runtime的性能。
+ generate阶段：将最终的AST转化为render函数字符串。





作者：杨溜溜
链接：https://juejin.im/post/6870374238760894472
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。