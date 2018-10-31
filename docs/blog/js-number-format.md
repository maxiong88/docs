---
title: 'js数字格式化'
description: ''
sidebar: 'auto'
time: '2018-01-02'
prev: ''
next: ''
tag: 'js number方法'
---


## 数字格式化

### NumberFormat

Intl.NumberFormat 是对语言敏感的格式化数字类的构造器类

语法：
new Intl.NumberFormat(locales,options)
Intl.NumberFormat.call(this,locales,options)

locales 包含一种或多种语言或区域设置标记的区域设置字符串数组 https://tools.ietf.org/html/rfc5646#appendix-A

options 包含一些或所有的下面属性的类: {}

`minimumIntegerDigits` : 使用的整数数字的最小数目.可能的值是从1到21,默认值是1.
`minimumFractionDigits` : 使用的小数位数的最小数目.可能的值是从0到20;如果列表中没有提供则值为2
`maximumFractionDigits` : 使用的小数位数的最大数目。可能的值是从0到20;纯数字格式的默认值是minimumfractiondigits和3中大的那一个；货币格式默认值是minimumfractiondigits和国际标准化组织列表(如果列表中没有提供则值为2)中大的那一个;百分比格式默认值是minimumfractiondigits和0中大的那一个。

`minimumSignificantDigits` : 使用的有效数字的最小数目。可能的值是从1到21；默认值是1。
`maximumSignificantDigits` : 使用的有效数字的最大数量。可能的值是从1到21；默认是minimumsignificantdigits.

::: tip 
下面的属性分为两组：minimumintegerdigits,minimumfractiondigits,maximumfractiondigits作为一组,
minimumsignificantdigits和maximumsignificantdigits作为一组.如果定义了第二组中的任意一个属性,
则忽略第一组的设置.
:::

例子：
``` js
var number = 3500;
console.log(new Intl.NumberFormat().format(number)); // 3,500
```

兼容性：
不好

衍生：
Number.prototype.toLocalString(locales,options)