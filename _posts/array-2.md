---
title: array-2
date: 2017-02-20 10:27:10
tags:
---

数组的基本操作

## JS随机操作数组元素

* Math.random() 结果为0-1间的一个随机数[0,1)
* Math.round(num) 参数num为一个数值，函数结果为num四舍五入的整数
* Math.floor(num) 参数num为一个数值，函数结果为num的整数部分（向下取整）
* Math.ceil(num) 参数num为一个数值，函数结果为返回大于等于num的整数（向上取整）

```
document.write(Math.ceil(-0.1) + "<br />")
// 0
document.write(Math.ceil(0.1) + "<br />")
// 1
document.write(Math.ceil(0.40) + "<br />")
// 1
document.write(Math.ceil(5) + "<br />")
// 5
document.write(Math.ceil(5.1) + "<br />")
// 6
document.write(Math.ceil(-5.1) + "<br />")
// -5
document.write(Math.ceil(-5.9))
// -5
```

## 数组

* join(通过指定的分隔符进行分隔的) 方法用于把数组中的所有元素放入一个字符窜，默认逗号
* split() 方法用于把一个字符串分割成字符窜数组

## Array.prototype.slice.call() 详解

* 在js中Array是一个类，slice是此类里的一个方法，使用该方法Array.prototype.slice
* slice() 截取







