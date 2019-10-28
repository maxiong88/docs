---
title: 'css弹性盒子布局'
description: 'flex布局是前端写页面经常用到的，这里想是说明一下，想必大家只知道怎么用不知道名词解释'
sidebar: 'auto'
time: ''
prev: ''
next: ''
---

::: tip
`flexbox`，是一种一维的布局模型。它给 `flexbox` 的子元素之间提供了强大的空间分布和对齐能力。

我们说 `flexbox` 是一种一维的布局，是因为一个 `flexbox` 一次只能处理一个维度上的元素布局，一行或者一列。作为对比的是另外一个二维布局 `CSS Grid Layout`，可以同时处理行和列上的布局。
:::

+ `flexbox` 的两根轴线 — 主轴和交叉轴
    - 主轴由 `flex-direction` 定义，可以取4个值：`row\row-reverse\column\column-reverse`
    - 交叉轴垂直于主轴

`flexbox` 的特性是沿着主轴或者交叉轴对齐之中的元素。


+ 我们把一个容器的 `display` 属性值改为 `flex` 或者 `inline-flex`。
    - 元素排列为一行 (`flex-direction` 属性的初始值是 `row`)。
    - 元素从主轴的起始线开始。
    - 元素不会在主维度方向拉伸，但是可以缩小。
    - 元素被拉伸来填充交叉轴大小。(左右布局登高)
    - `flex-basis` 属性为 `auto`。
    - `flex-wrap` 属性为 `nowrap`。

#### `flex` 元素上的属性:
+ `flex-basis` 定义了 ++该元素的布局空白++ 的基准值。默认`auto`,浏览器检测这个元素是否具有确定的尺寸, 如果有`flex-basis`为具体`width`,如果没有给元素设定尺寸，`flex-basis` 的值采用元素内容的尺寸,(用在子元素)
+ `flex-grow` flex 元素会以 flex-basis 为基础，沿主轴方向增长尺寸。这会使该元素延展， ++并占据此方向轴上的布局空白++ 。属性可以按比例分配空间。处理flex元素在主轴上增加空间的问题
+ `flex-shrink` 属性是处理flex元素收缩的问题
+ `justify-content` 定义了在当前行上，弹性项目沿主轴如何排布。
+ `align-items` 定义了在当前行上，弹性项目沿侧轴默认如何排布。

+ [https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Flexible_Box_Layout](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Flexible_Box_Layout)

