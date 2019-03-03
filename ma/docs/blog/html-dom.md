---
title: DOM 是什么
description: ''
sidebar: 'auto'
time: '2018-10-01'
prev: ''
next: ''
---

## DOM

引用的 futeng 的话：

牢记：站高一个维度去理解问题！

为了理解DOM，我们至少需要站在浏览器的角度思考。

DOM概念本身很简单，请先完成跟我思路来：

+ 普通文件（*.text）和HTML、XML（*.html/*.xml）的区别仅仅是因为后者是有组织的结构文件；
+ 浏览器将结构化的文档以树的数据结构读入浏览器内存，并将每个树的子节点定义为一个NODE（想象这颗树，从根节点到叶子节点都被建模为一个NODE对象）
+ 这每个节点（NODE）都有自己的属性（名称、类型、内容...）
+ NODE之间有层级关系（parents、child、sibling...）
+ 以上已经完成文档的建模工作（将文档内容以树形结构写入内存），此时再编写一些方法来操作节点（属性和位置信息），即为NODE API

抽象一下：

+ DOM是一种将HTML/XML文档组织成对象模型的建模过程；
+ DOM建模重点在于如何解析HTML/XML文档和开放符合DOM接口规范的节点操作API接口

再抽象一下：

+ 解析文档，建模成对象模型，开放API接口。

最后：

+ DOM：Document Object Model 文档对象模型

再回顾下整个过程，每个步骤都可以问自己几个问题，
比如：
DOM到底是建模过程，还是最后建的那个模型，
还是指操作节点的API接口呢，还是...？

以上是站在浏览器的角度思考DOM，你还可以站在浏览器设计人员、网页编码人员等角度考虑：

+ DOM跟JavaScript什么关系？
    - DOM很显然诞生在浏览器，一开始是用JS实现的；
    - 但随着DOM本身的发展，已经形成规范，你可以用任何一种语言比如Python来解析文档，生成对像树，只要满足DOM标准，包括开放标准的操作接口，那你实现的就是一个DOM
+ DOM开放的接口如何操作？
    - JS原生接口使用。
    - JQuery高纬度封装如何使用。

至此，你应该明白了什么是DOM，甚至明白了为什么一开始不明白以后如何做，
如何举一反三，甚至还能看出一点如何建立体系化认知的影子。笑


牢记：站高一个维度去理解问题 ！

## DOM元素（节点）

html标签

## DOM结构

``` js

<html>
<head></head>
<body></body>
</html>

```

## [DOM对象](http://www.w3school.com.cn/js/js_obj_htmldom.asp)

js对象：window、navigator、screen、history、location

DOM对象：document、body、frame、image、input、object、select、table、link。。。。

### HTML DOM 对象

+ 一些常用的 HTML DOM 方法:
    - getElementById(id) - 获取带有指定 id 的节点（元素）
    - appendChild(node) - 插入新的子节点（元素）
    - removeChild(node) - 删除子节点（元素）

+ 一些常用的 HTML DOM 属性：

    - innerHTML - 节点（元素）的文本值
    - parentNode - 节点（元素）的父节点
    - childNodes - 节点（元素）的子节点
    - attributes - 节点（元素）的属性节点

## DOM节点

+ 文档本身是文档节点
+ 所有 HTML 元素是元素节点
+ 所有 HTML 属性是属性节点
+ HTML 元素内的文本是文本节点
+ 注释是注释节点