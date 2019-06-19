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

#### 词法作用域决定了变量是在哪里定义的

指的是JavaScript的作用域规则完全基于代码的结构，而不是一些动态的运行阶段属性。<br />
这意味着只需查看代码的结构，就能确定变量是在什么地方定义的。<br />
另外别忘了，在JavaScript中，只有函数会引入新的作用域。<br />
因此，对于在函数中引用的变量，要确定它是在哪里定义的，可从最里面（当前函数）开始依次向最外面进行查找，直到找到它为止。<br />
如果在这些函数中都找不到它，则它要么是全局的，要么未定义。 <br />

#### 在函数被嵌套很多层的情况下，环境的工作原理是什么呢？ 

在 JavaScript中，函数可以用来创造函数作用域。此时的函数像一层单向透视玻璃贴膜，在函数里面可以看到外面的变量，而在函数外面则无法看到函数里面的变量。这是因为当在函数中搜索一个变量的时候，如果该函数内并没有声明这个变量，那么此次搜索的过程会随着代码执行环境创建的作用域链往外层逐层搜索，一直搜索到全局对象为止。变量的搜索是从内到外而非从外到内的

::: tip 别忘了
JavaScript函数都是在定义它的环境中执行的。在函数中，要确定变量来自何方，可按从内到外的顺序依次在包含它的函数中搜索。
:::

## 闭包

### 概念

闭包的形成与变量的作用域以及变量的生存周期密切相关

闭包指的是函数及其引用的环境。(闭包内的变量值由引用的环境决定)

### 定义

闭包就是一个内部函数。那什么是内部函数呢？它是在一个函数内部的函数<br>
在闭包内声明的变量，闭包外的任何环境中都无法访问，除非闭包向外部环境提供了访问他们的接口

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
### 闭包与内存管理

使用闭包的同时比较容易形成循环引用，循环引用会带来内存泄漏，我们可以把变量设为null即可

### 作用

1，延续局部变量的寿命 

数据上报
``` js
var report = function( src ){     
	var img = new Image();     
	img.src = src; 
}; 
 
report( 'http://xxx.com/getUserInfo' );  
```

但是通过查询后台的记录我们得知，因为一些低版本浏览器的实现存在 bug，在这些浏览器 下使用 report 函数进行数据上报会丢失 30%左右的数据，也就是说，report 函数并不是每一次 都成功发起了 HTTP请求。丢失数据的原因是 img 是 report 函数中的局部变量，当 report 函数的 调用结束后，img 局部变量随即被销毁，而此时或许还没来得及发出 HTTP请求，所以此次请求 就会丢失掉。 

现在我们把 img 变量用闭包封闭起来，便能解决请求丢失的问题： 
``` js
 var report = (function(){     
	var imgs = [];     
	return function( src ){         
		var img = new Image();         
		imgs.push( img );         
		img.src = src;     
	} 
})(); 
```

2，封装变量


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
