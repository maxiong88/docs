---
title: javascript 深度克隆
description: '主要讲的是object, array, number, boolean, string, date, regexp。'
sidebar: 'auto'
time: '2015-01-01'
prev: './js-modal'
next: './js-mp2'
---

# javascript 深度克隆


只针对  object number string boolean date function

::: tip === 与 == 区别

== 会先转译成相同类型在做比较

定义一个变量

var dfs;

dfs == null; // true

dfs == undefined; // true

dfs === null; // false

dfs === undefined; // true

null == undefined;// true

null === undefined; //false

:::

``` javascript{2,4,8,17}

var clone = _curry1(function clone(value){
	return _clone(value, [], [], true)
})

// 在执行clone() 的时候他执行的是 _curry1 里面的function f1函数体

// 如果传入的不是空，调用fn函数，通过apply 进而改变fn的this指

function _curry1(fn){
	return function f1(a){
		if(arguments.length === 0){
			return f1;
		}else{
			return fn.apply(this, arguments)
		}
	}
}

function _cloneRegExp(pattern){
    return new RegExp(pattern.source, 
        (pattern.global ? 'g' : '') + 
        (pattern.ignoreCase ? 'i' : '') +
        (pattern.multiline ? 'm' : '') +
		(pattern.sticky ? 'y' : '') +
		(pattern.unicode ? 'u' : '')
    );
}
/**
  *复制一个对象。
  *
  * @私人的
  * @param {*} value要复制的值
  * @param {Array} refFrom包含源引用的数组
  * @param {Array} refTo包含复制的源引用的数组
  * @param {Boolean} deep是否执行深度克隆。
  * @return {*}复制的值。
*/
function _clone(value, refFrom, refTo, deep){
	var copy = function copy(copiedValue){
	
		var len = refFrom.length;
		var idx = 0;
		while(idx < len){
			if(value === refFrom[idx]){
				return refTo[idx]
			}
			idx += 1
		}
		refFrom[idx + 1] = value;
		refTo[idx + 1] = copiedValue;
		for(var key in value){
			copiedValue[key] = _clone(value[key], refFrom, refTo, true)
		}
		return copiedValue;
		
	}
	switch(Object.prototype.toString.call(value).slice(8, -1)){
		case 'Object' : return copy({});
		case 'Array' : return copy([]);
		case 'Date' : return new Date(value.valueOf());
		case 'RegExp' : return _cloneRegExp(value);
		default : return value;
	}
}

```







## 课外

::: tip 
推荐实际项目中使用lodash库，封装类型很全
:::

::: tip 对于 是一种以键-值对形式存储数据的数据结构 我们可以使用,但是函数除外
JSON.parse(JSON.stringify())
:::




