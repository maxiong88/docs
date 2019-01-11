---
title: es6传参.md
date: 2018-01-08 16:41:15
tags: javascript
---

1. 优化代码 传参 惰性求值
2. 箭头函数传参

<!-- more -->

## 函数参数的默认值

###### 基本用法

	ES5 中，不能直接为函数的参数指定默认值，只能采取内部赋值
	
	`
		function log(x, y){
			x = x || '我是第一个';
			y = y || 1;
			console.log(x, ':', y)
		}
		log() // 我是第一个 : 1
		log('app', 5) // app : 5
		log('', 0) // 我是第一个 : 1
		log('', false) // 我是第一个 : 1
		log('', '') // 我是第一个 : 1
	`
	
	从上面可以看出，当传入的参数为0，false, ''时，会直接去到后面的值，而不是传入的值；
	
	js中 || && 运算符的关系
	
		对象       为 true
		非零数字   为 true
		零         为 false
		非空字符串 为 true
		空字符串   为 false
		
	
	为了避免这个问题，我们需要对某个参数不设置||运算符，并且通过typeof、Object.prototype.toString.call()来判断是否为undefined
	
	ES6 允许为函数的参数设置默认值，即直接写在参数定义的后面
	
	`
		function log(x, y='word'){
			console.log(x, y)
		}
		log() // undefined 'word'
		log('') // '' word
		log('', '') // '' ''
		
		function Pont(x, y){
			this.x = x;
			this.y = y
		}
		const p = new Point()
		p // {x:0, y:0}
	`
	
	参数变量是默认声明的，所以不能用let、const再次声明
	`
		function foo(x=5){
			let x = 1;
			const x = 2;
		}
		// 都会报错
	`
	
	参数默认值不是传值，而是每次都要重新计算默认值表达式的值。参数默认值是`惰性求值`的（该值被取用的时候求值）
	
	### 项目案例
	
	`
		_js_fn=()=>{
			let _data = {
				username: this.state.rowList.values[0],
				operator_id: localStorage.getItem('operator_id') || 999
			}
		}
		
		改为
		
		_js_fn=(
			username = this.state.rowList.values[0],
			operator_id = 999
		)=>{
			let _data = {
				username
				operator_id,
			}
		}
		
		更能直观的让人看出参数(哪些参数可以省略、优化)
	`
	
	
	https://www.jianshu.com/p/66c71fb5ea62
	
