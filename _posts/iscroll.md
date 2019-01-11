---
title: iscroll遇到的问题
date: 2016-11-11 11:16:39
tags: javascript
---

## 前沿

这里是讲的是遇到的问题，后续会把api补全


<!-- more -->

## 问题

##### iscroll 使用中a标签失效

* 可设置参数 click : true,（亲测）
* 或者（没有亲测）
```js
$(function(){
   new IScroll(obj,{
    scrollX : true,
    freeScroll : false,
    //preventDefault : false,
    preventDefaultException:{
     tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|A)$/
   }
   })
})

``` 
