---
title: '闭包'
description: '闭包、作用域'
sidebar: 'auto'
time: '2019-02-28'
tags: 'javascript'
prev: './js-function'
next: ''
---

摘自 js王者归来

摘自 HEAD FIRST JAVASCRIPT：

## 词法作用域

意味着通过阅读代码就能确定变量的作用域。

#### 你说词法作用域决定了变量是在哪里定义的，这是什么意思？

指的是JavaScript的作用域规则完全基于代码的结构，而不是一些动态的运行阶段属性。<br />
这意味着只需查看代码的结构，就能确定变量是在什么地方定义的。<br />
另外别忘了，在JavaScript中，只有函数会引入新的作用域。<br />
因此，对于在函数中引用的变量，要确定它是在哪里定义的，可从最里面（当前函数）开始依次向最外面进行查找，直到找到它为止。<br />
如果在这些函数中都找不到它，则它要么是全局的，要么未定义。 <br />

#### 在函数被嵌套很多层的情况下，环境的工作原理是什么呢？ 

在环境中查找变量时，你将从最近的环境着手，沿环境链不断往下查找，直到找到变量为止。如果在环境链中没有找到，再在全局环境中查找。

::: tip 别忘了
JavaScript函数都是在定义它的环境中执行的。在函数中，要确定变量来自何方，可按从内到外的顺序依次在包含它的函数中搜索。
:::

## 闭包

### 概念

闭包指的是函数及其引用的环境。捕获其创建时所处作用域内的变量的值。(闭包内的变量值由引用的环境决定)

### 定义

闭包就是一个内部函数。那什么是内部函数呢？它是在另一个函数内部的函数
在闭包内声明的变量，闭包外的任何环境中都无法访问，除非闭包向外部环境提供了访问他们的接口

### 问题

闭包带来的问题是JavaScript的作用域是如何工作的。

### 事实说话

``` js
function outer(){
	function inner(){

	}
}
```
这就是闭包，函数inner称为闭包函数。闭包如此强大的原因在于它对作用域链(或作用域层级)的访问。

闭包有3个作用域层级：
1，在它自身声明之内声明的变量
	``` js
	function outer(){
		function inner(){
			let a = 5;
			console.log(a)
		}
		inner();
	}
	// 输出5，闭包函数可以访问所有在其声明内部声明的变量
	```
2，对全局变量的访问
	``` js
	let global = 'global';
	function outer(){
		function inner(){
			let a = 5;
			console.log(global)
		}
		inner();
	}
	// 输出global，闭包能访问全局变量
	```
3，对外部函数变量的访问
	``` js
	let global = 'global';
	function outer(){
		let outer = 'outer';
		function inner(){
			let a = 5;
			console.log(outer)
		}
		inner();
	}
	// 输出outer，闭包能访问外部函数的变量。此处外部函数的含义是包裹闭包函数的函数
	```	

### 实例

``` js
var fn = arg => {
	let outer = 'v'
	let innerFn = () => {
		console.log(outer)
		console.log(arg)
	}
	return innerFn;
}

var closureFn = fn(5) [1]
closureFn(); [2]
// 输出 v， 5
```

innerFn 对于 fn 来说是一个闭包函数，并且 fn 被调用时返回了 innerFn。

控制台为啥打印出 v 5，背后发生了什么？分析

+ [1]被调用时，返回 innerFn
+ 当innerFn被返回时，js执行引擎视innerFn为一个闭包，并相应地设置了它的作用域。当closureFn通过作用域链被调用时就记住了 arg outer 的值
	- 当它被创建的时候记住它的上下文的（作用域，也就是outer arg）
+ 我们最后调用closureFn
