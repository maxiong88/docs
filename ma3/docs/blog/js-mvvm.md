---
title: 'mvvm理解'
description: ''
sidebar: 'auto'
time: '2020-02-01'
prev: ''
next: ''
---


::: tip 中心
关注Model的变化，让MVVM框架去自动更新DOM的状态，从而把开发者从操作DOM的繁琐步骤中解脱出来！
:::

MVVM的设计思想：关注Model（数据）的变化，让MVVM框架去自动更新DOM的状态.

在MVVM设计模式中，M代表数据模型(业务和验证逻辑)，V代表视图层，viewModal扮演view和modal之间的使者，帮忙处理view的全部业务逻辑。代表视图状态的对象或对象集（它是一个对象或一组对象。这将包括要从模型中显示的任何数据以及辅助状态，例如启用、禁用，隐藏，可见哪些元素，等。）

使用MVVM，你不必担心数据是如何从View传递到ViewModal或从ViewModal传回到View，这一切都是自动发生的。可能会根据现实中，您需要编写代码让ViewModal中的某些更改通知view，以便让它知道如何更新自己

viewController 它响应视图中的事件，并根据需要更新ViewModal

!(../.vuepress/public/assets/img/68747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f313630302f312a564c68585552484c3972476c784e59653979647156672e706e67.png)[MVVM流程图]

MVVM主要用例是图形用户界面(GUI)编程.它通过将视图层与管理数据的后端逻辑分开来简化用户界面的事件驱动编程.

那这和我们曾经用过的MVC模式有什么不同呢？以下是MVC的结构

+ View 在 Controller 的顶端，而 Model 在 Controller 的底部
+ Controller 需要同时关注 View 和 Model
+ View 只能知道 Model 的存在并且能在Model的值变更时收到通知

MVC（modal view controller）使用不当，会使大量代码集中在controller（可以拆分）之中，让MVC模式变成Massive view controller

MVVM模式和MVC有些类似，但有以下不同：

+ ViewModel 替换了 Controller，在UI层之下
+ ViewModel 向 View 暴露它所需要的数据和指令对象
+ ViewModel 接收来自 Model 的数据

你可以看到这两种模式有着相似的结构，但新加入的 ViewModel 是用不同的方法将组件们联系起来的，它是双向的，而MVC只能单向连接。