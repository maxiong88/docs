---
title: javascript interview
description: ''
sidebar: 'auto'
time: '2019-03-01'
prev: ''
next: ''
---



## [1,2,3].map(parseInt)

+ 考察map
+ 考察parseint
	- 考察进制
	
##### [map](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

含义

`map()`方法创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。

描述

map 方法会给原数组中的每个元素都按顺序调用一次  callback 函数。
callback 每次执行后的返回值（包括 undefined）组合起来形成一个新数组。 
callback 函数只会在有值的索引上被调用；
那些从来没被赋过值或者使用 delete 删除的索引则不会被调用。

##### [parseint(string, radix)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/parseInt)

含义

parseInt() 函数解析一个字符串参数，并返回一个指定基数的整数 (数学系统的基础)。

描述

parseInt 函数将其第一个参数转换为字符串，解析它，并返回一个整数或NaN。
如果不是NaN，返回的值将是作为指定基数（基数）中的数字的第一个参数的整数。

##### 进制换算

##### 案例分析

``` js

[1,2,3].map(parseInt) // [1, NaN, NaN]

// 等价

[1,2,3].map((item, index, arr) => {
	return parseInt(item, index)
})

// 等价

[1,2,3].map((item, index) => parseInt(item, index))


```

## [防抖节流](/js-debounce-throttle.html)