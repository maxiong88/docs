---
title: this指向问题
date: 2017-05-06 09:53:08
tags: javascript
---


面试遇到的问题，理解this指向的小技巧


<!-- more -->

this 总结 ：

1.1 先来看看豆大神的大白话理解

	1.1.1 找点大法：你找不到.的函数调用，this指向一般是window
	
	```
	function foo(){
		console.log(this)	
	}
	foo() // 输出window
	window.foo() // 输出window
	```
	
	`不用怀疑，也不用犹豫，找不到任何·的这种情况下，函数内部的this指向window`
	
	```
	function foo(callback){
		callback() // 调用其实在这里，你是找不到·的
	}
	foo(function(){
		console.log(this)
	})
	```
	
	`
	这个例子就是，匿名函数内部打印了this，他作为参数，内部的this指向window
	`
	
	1.1.2 找点大法：有·的函数调用，this指向一般的最后一个·左侧的那个对象：
	
		1.1.2.1 调用语句里面只有一个·
	
		```
		var bar = {name:""}
		bar.foo = function(){console.log(this)}
		bar.foo() // bar 
		这个例子我们找到了·的存在，左侧是bar，指向是bar
		```
		
		1.1.2.2 调用语句里能找到多个·
		
		```
		var obj = {name:""}
		obj.bar = {name:""}
		obj.bar.foo = function(){
			console.log(this)
		}
		obj.bar.foo() // bar
		这个例子我们找到了两个·最后一个·左侧的对象是bar，那么this指向就是bar
		```
		㈡如果发现你找到的“.”左侧是prototype，那么再往左找一个“.”，这个“.”左侧的对象是this指向。

	1.1.3 面向对象中this
	
		```
		function foo(){
			console.log(this)
		}
		foo.prototype.bar = function(){
			console.log(this)
		}
		foo.prototype.func = function(fn){
			fn()
		}
		foo() // window
		foo.prototype.bar() // foo
		var fo = new foo() // fo
		fo.bar() // fo
		fo.fn(function(){console.log(this)}) // window
		
		当foo() 时，foo被当作普通函数，那么遵循找点大法foo()内部的this是指向window；
		
		当foo.prototype.bar()时，foo还是被当作普通函数遵循找点大法发现有了prototype，再往左找，发现this指向foo  （谷歌里面object,在这里打印this.bar 显示为定义，所以我认为this的指向是当前函数）
		
		当new foo时，foo作为构造函数被实例化，foo内部this指向实例化后的foo，也就是我声明的fo 
		
		当fo.bar时遵循找点大法发现this指向fo
		
		当fo.func(匿名函数)时，匿名函数前没有“.”，匿名函数作为参数，所以遵循㈠，发现其内部this指向window

		```
	1.1.4 call apply会改变this指向
	
	总结：
	
	•	找不到“.”的函数调用，其内部的this一般指向window象；
	•	找得到“.”的函数调用，其内部的this一般指向最后一个“.”左侧的那个对象，如果左侧是prototype，再向左找一个；（原理里面可能会指向当前函数，点规则无效）
	•	明确区分函数是[构造函数]还是[普通函数]，[构造函数]内的this指向实例化后的对象；
	•	函数作为参数传递，被调用时其内部的this一般指向window。
	•	call和apply会改变this指向，参阅巧妙理解call、apply。
	•	ES6/7的箭头函数也会影响this指向，这个很简单，我就不多讲啦~
	
一句话来说，就是“谁调的我(普通函数)，我内部的this就指向谁；new我一下(构造函数)，我内部的this就指向我的实例化”



## 我测试发现在原型内存在问题，无法访问，this指向他本身


原型：一个属性，属性名叫prototype 只有构造函数有

	原型链：一个属性，属性名叫做__proto__万物皆有，最后归宗到Object.prototype上，Object。prototype的__proto__ 值为null

```
var a1 = function(){this.name="1"}

a1.prototype.bar = function(){console.log(this);console.log(this.name)}

a1.prototype.bar()

Object bar: ()constructor: ()__proto__: Object  // this
undefined // this,name
```


js  实现 new 方法

1.创建一个空对象

2.利用apply改变this指向，指向foo

3.把foo 的__proto__属性执行 Foo 的prototype

4. 返回 foo



（转载https://juejin.im/post/590192760ce4630061516c09）很好的一篇教程；

