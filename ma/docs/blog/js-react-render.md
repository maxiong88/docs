---
title: react render
description: 'ReactDOM.render、render'
sidebar: 'auto'
time: '2019-03-03'
prev: ''
next: ''
---


我们通过断点调试
`ReactDOM.render(<App />, document.getELementById('main'))`
原理

``` js

程序开始 

+ ExecutionEnvironment 判断执行环境
    - 判断浏览器
    - 需要http服务
    - document.documentMode属性返回浏览器渲染文档的模式 只支持IE，如果正式环境小于8，则提示使用浏览器按最新模式渲染 IE=edge
    - expectedFeatures 如果浏览器不支持 提示使用 polyfill

+ ReactInstrumentation  本地开发 错误代码信息提示

+ ReactDOMUnknownPropertyHook

+ ReactDOMNullInputValuePropHook

+ ReactDOMInvalidARIAHook

+ ReactDOM.js render函数
    - nextElement React Element
    - container 容器
    - callback 回调函数 [大家知道callback 回调 是什么吗]()
    - return _renderSubtreeIntoContainer 将子目录呈现到容器中
        + ReactUpdateQueue 更新列队

        + parentComponent 第一次为null、nextContext = {} 初始当前作用域

            - [HTML DOM nodeType 属性](http://www.w3school.com.cn/jsref/prop_node_nodetype.asp)
            - container.nodeType
                - 如果当前容器元素节点类型 等于 默认  9 代表整个文档（DOM 树的根节点）。
                    - 

        + !container || !container.tagName || container.tagName.toUpperCase() !== 'BODY' 不提倡组件呈现在document.body中，需要渲染到容器元素中


```