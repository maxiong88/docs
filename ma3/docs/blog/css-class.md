---
title: 'html class类名一系列操作'
description: 'classList、className来操作css类名'
sidebar: 'auto'
time: '2019-02-01'
prev: ''
next: ''
---


`Element.classList` 是一个只读属性，返回一个元素的类属性的实时`DOMTokenList` 集合。

::: tip
+ DOMTokenList 一组空格分隔的标记。它和 JavaScript Array 对象一样，索引从 0 开始。DOMTokenList 总是区分大小写（case-sensitive）。

+ 实时 在控制台通过add  remove修改的时候会导致浏览器 重排与重绘

+ className 获取或设置指定元素的class属性的值
:::


使用 `classList` 是替代`element.className`作为空格分隔的字符串访问元素的类列表的一种方便的方法。

``` html

<div class="a b c" id="wrap"></div>

document.querySelector('#wrap').classList();

// DOMTokenList ["a", "b", "c", value:"a b c"]
```

## 方法

+ `add(string,string,...)` 添加指定的类值

+ `remove(string, string)` 删除指定的类值

+ `item(number)` 按集合中的索引返回类值

+ `replace( oldClass, newClass )`  用一个新类替换已有类

+ `contains( String )` 检查元素的类属性中是否存在指定的类值

+ `toggle ( String [, force] )` 

	- 当只有一个参数时：切换 class value; 即如果类存在，则删除它并返回false，如果不存在，则添加它并返回true。
	
	- 当存在第二个参数时：如果第二个参数的计算结果为true，则添加指定的类值，如果计算结果为false，则删除它	