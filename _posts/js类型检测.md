---
title: js类型检测
date: 2018-03-30 11:55:58
tags: javascript
---

typeof 介绍

instanceof 不用

constructor 不用

Object.prototype.toString.call() 介绍

<!-- more -->

js是弱类型或者说是动态语言

因为：
你可以使用一个变量保存（定义）不同类型的数据

	var a = 42  number
	var a = "42" string
	var a = true boolean
	var a = {} object

数据类型：（boolean、null、undefined、number、string、symbol六种）+（Object）

## typeof 操作符返回一个字符串，表示未经计算的操作的类型

typeof (operand[表示对象或原始值，其类型奖将返回])

* typeof undefined "undefined"
* typeof null "object"
* typeof boolean "boolean"
* typeof number(NaN、Infinity) "number"
* typeof string "string"
* typeof symbol "symbol"
* typeof function "function"
* typeof 任何其他对象 "object"

检测范围

typeof 检测能力有限，只能检测一下范围内的类型：
* undefined、number、string、symbol、boolean、object的function

陷阱

* typeof null == 'object' 

链接： [http://2ality.com/2013/10/typeof-null.html](http://2ality.com/2013/10/typeof-null.html)

“typeof null”错误是JavaScript第一个版本的补遗。在这个版本中，值以32位为单位存储，其中包含一个小型标记（1-3位）和实际的数据值。类型标签存储在单元的低位中。其中有五个：

000：对象。数据是对对象的引用。
1：int。数据是一个31位有符号整数。
010：双倍。数据是对双浮点数的引用。
100：字符串。数据是对字符串的引用。
110：布尔值。数据是一个布尔值。

而js  里的Null 是机器码NULL空指针, (0x00 is most platforms).所以空指针引用 加上 对象标记还是0,最终体现的类型还是object..

* typeof function(){} == 'function' 

ECMA-262 规定任何在内部实现 Call 方法的对象都应该在应用 typeof 运算符时返回 function

## Object.prototype.toString.call()

toString() 方法返回一个表示该对象的字符串

* "maxiong".toString() "maxiong"
* [1,2].toString() "1,2"
* null.toString() Cannot read property 'toString' of null
* Date.now().toString() "1522378202871"
* var a = function (){} a.toString() "function(){}"
* var a = {} a.toString() "[object Object]"

obj.toString()的结果和Object.prototype.toString.call(obj)的结果不一样，这是为什么？

 这是因为toString为Object的原型方法，而Array ，function等类型作为Object的实例，都重写了toString方法。
 不同的对象类型调用toString方法时，根据原型链的知识，
 调用的是对应的重写之后的toString方法（function类型返回内容为函数体的字符串，Array类型返回元素组成的字符串.....），
 而不会去调用Object上原型toString方法（返回对象的具体类型），
 所以采用obj.toString()不能得到其对象类型，只能将obj转换为字符串类型；
 因此，在想要得到对象的具体类型时，应该调用Object上原型toString方法。
 
	var arr=[1,2,3];
	console.log(Array.prototype.hasOwnProperty("toString"));//true
	console.log(arr.toString());//1,2,3
	delete Array.prototype.toString;//delete操作符可以删除实例属性
	console.log(Array.prototype.hasOwnProperty("toString"));//false
	console.log(arr.toString());//"[object Array]"
	
删除了Array的toString方法后，同样再采用arr.toString()方法调用时，不再有屏蔽Object原型方法的实例方法，
因此沿着原型链，arr最后调用了Object的toString方法，返回了和Object.prototype.toString.call(arr)相同的结果。	

可以让call()种的对象调用当前对象所拥有的function。

## constructor可以处理基本数据类型的检测

## 只要在当前实例的原型链上，用instanceof检测出来的结果都是true，所以在类的原型继承中，最后检测出来的结果未必是正确的

* [转载](https://www.cnblogs.com/youhong/p/6209054.html)


