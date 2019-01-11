---
title: js深度克隆
date: 2018-05-06 09:53:08
tags: javascript
---




























JSON.parse方法

JSON对象parse方法可以将json字符串反序列化成js对象
JSON对象stringify方法可以将js对象序列化成json字符串

== JSON.parse(JSON.stringify('xxx'))

* 无法处理 undefined[忽略]、函数[忽略]、RegExp对象({})、new Date()[自己的toJSON]
* 无法处理对象循环引用 Converting circular structure to JSON
* 处理NaN的时候返回null

`
	var c = {}
	c.name = c;
	JSON.stringify(c) // TypeError
	$.extend(true, {}, c) // Maximum call stack size exceeded 超出最大调用栈
	
	JSON.stringify(/[0-9]/) // '{}'
	
	JSON.stringify(NaN) // "null"
`





lodash 

_.cloneDeep()  无法克隆函数









