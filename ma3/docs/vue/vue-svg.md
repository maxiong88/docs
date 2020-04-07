---
title: 'vue中svg使用'
description: ''
sidebar: 'auto'
time: '2019-08-01'
prev: ''
next: ''
tags: ['vue']
---

[SVG是什么，干嘛用的](//developer.mozilla.org/zh-CN/docs/Web/SVG)

项目中遇到的SVG的问题

## 如果UI给你的是SVG Sprite我们该怎么引入到页面

##### 通过 SCRIPT 标签引入

``` js
// <script src="//www.maxiong.ren/xiong/icon/common/sprite.js"></script>

!(function(){
    document.body.insertAdjacentHTML('after', '<div hidden><svg><symbol id=""></symbol>...</svg></div>')
})()
```
