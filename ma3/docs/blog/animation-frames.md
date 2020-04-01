---
title: Animation frames 动画帧
description: 'requestAnimationFrame setTimeout setInterval'
sidebar: 'auto'
time: '2020-04-01'
prev: ''
next: ''
---



## 什么是requestAnimationFrame

用于动画的基本API, 无论是基于DOM的样式更改，canvas，webGl

## 为什么要是用它

浏览器可以将并发动画一起优化为单个重排和重绘周期，从而获取更高保真的动画。(浏览器可以对其进行优化，从而使动画更加流畅)
如果您在不可见的选项卡中运行动画，则浏览器将无法使其运行，这意味着cpu GPU和内存使用减少，从而延长了电池寿命.

## setTimeout和setInterval有什么问题

+ 不考虑浏览器正在发生的其他事情。
+ 仅在需要时更新屏幕，而不是在计算机能够更新时更新。浪费处理能力
+ 同时播放多个元素的动画
    - 一种解决方法是，将所有动画逻辑放在一个间隔中，同时要理解，即使特定元素可能不需要当前帧的任何动画，动画调用也可能正在运行
    - 替代方法是使用单独的间隔。这种方法的问题在于，每次在屏幕上移动某些内容时，浏览器都必须重新绘制屏幕。这很浪费！