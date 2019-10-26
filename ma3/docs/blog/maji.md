---
title: '马记'
description: 'ES6 解构赋值、instanceof类型检测、== 与 === 你真的明白吗、navigator.sendBeacon'
sidebar: 'auto'
time: '2049-03-29'
prev: ''
next: ''
---

## ES6 解构赋值

开篇说一下原因,看下面代码

```js
let {
	token,
	login_mobile,
	submit_entry,
	carid,
	cityid,
	ciyt_id,
	m,
	site_longitude,
	site_latitude,
	site_id,
	gps_type
} = this.query;
cityid = cityid || ciyt_id;
site_longitude = site_longitude == 'undefined' ? 0 : site_longitude;
site_latitude = site_latitude == 'undefined' ? 0 : site_latitude;
site_id = site_id == 'undefined' ? 0 : site_id;
gps_type = gps_type == 'undefined' ? 1 : gps_type;
login_mobile = login_mobile || m;
login_mobile = login_mobile == 'undefined' ? '' : !login_mobile ? '' : login_mobile;
token = token == 'undefined' ? '' : !token ? '' : token;
submit_entry = submit_entry == 'undefined' ? '' : !submit_entry ? '' : submit_entry;
```

上面的代码`this.query`这个对象用到了对象的解构赋值，但是我们下面那部分做的判断纯属多余，加小白

我们先来看看babel怎么转义的

``` js
let {ma,xiong,maxiong = 11} = deconst; 

// babel 

"use strict";

var _deconst = deconst,
    ma = _deconst.ma,
    xiong = _deconst.xiong,
    _deconst$maxiong = _deconst.maxiong,
    maxiong = _deconst$maxiong === undefined ? 11 : _deconst$maxiong;
```

+ 解构赋值要求等号右边是一个对象

``` js
let { x, y, ...z } = null; // 运行时错误
let { x, y, ...z } = undefined; // 运行时错误
```

+ 解构赋值必须是最后一个参数，否则会报错。

``` js
let { ...x, y, z } = someObject; // 句法错误
let { x, ...y, ...z } = someObject; // 句法错误
// VM1878:3 Uncaught SyntaxError: Rest element must be last element
```

+ 对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量。真正被赋值的是后者，而不是前者。

``` js
let { foo: baz } = { foo: "aaa", bar: "bbb" };
baz // "aaa"
foo // error: foo is not defined
```

+ 对象的解构也可以指定默认值。

``` js
var {x = 3} = {};
x // 3

var {x, y = 5} = {x: 1};
x // 1
y // 5

var {x: y = 3} = {};
y // 3

var {x: y = 3} = {x: 5};
y // 5

var { message: msg = 'Something went wrong' } = {};
msg // "Something went wrong"
```
+ 默认值生效的条件是，对象的属性值严格等于`undefined`。

``` js
var {x = 3} = {x: undefined};
x // 3

var {x = 3} = {x: null};
x // null
```

上面代码中，属性x等于null，因为null与undefined不严格相等，所以是个有效的赋值，导致默认值3不会生效。

如果解构失败，变量的值等于undefined。

最初的问题可以修改为

``` js
let {
	token = '',
	login_mobile = 0,
	submit_entry = '',
	carid = 0,
	cityid = 0,
	ciyt_id = 0,
	m = 0,
	site_longitude = 0,
	site_latitude = 0,
	site_id = 0,
	gps_type = 1
} = this.query;
cityid = cityid || ciyt_id;
login_mobile = login_mobile || m;
```

## instanceof 类型检测

说对象是某个构造函数的实例并非纸上谈兵，实际上，可以在代码中使用运算符 instanceof 来确定对象是由哪个构造函数创建的

在JavaScript中，操作符instanceof使用在原型链中

### MDN解释

`instanceof`运算符用于测试构造函数的[原型对象]prototype属性是否出现在对象的原型链中的任何位置

### 实现原理

说到原理这东西其实`MDN`上面已经给出了答案，就是要检测的对象的原型链中的任何位置，是否有 `构造函数的prototype`

对于5.1规范 6.0规范(不考虑)

``` js
function instance_of(L, R) {//L 表示左表达式，R 表示右表达式
	var O = R.prototype;// 取 R 的显示原型
	L = L.__proto__;// 取 L 的隐式原型
	while (true) { 
	    if (L === null) 
			return false; 
		if (O === L)// 这里重点：当 O 严格等于 L 时，返回 true 
			return true; 
		L = L.__proto__; 
	} 
}
```

### 语法

`[要检测的对象] instanceof [某个构造函数]`

在这里我们就说 要检测的对象 是构造函数创建的是一个实例

实际上创建对象时，运算符new在幕后存储了一些信息，让你随时都能确定对象是有哪个构造函数创建的。运算符instanceof就是根据这些信息来确定对象是否是指定构造函数的实例

### 描述

检测构造函数的原型对象是否存在于实例的原型链中

### 实例

``` js
var simpleStr = "This is a simple string"; 
var myString  = new String();
var newStr    = new String("String created with constructor");
var myDate    = new Date();
var myObj     = {};
var myNonObj  = Object.create(null);

simpleStr instanceof String; // 返回 false, 检查原型链会找到 undefined
myString  instanceof String; // 返回 true
newStr    instanceof String; // 返回 true
myString  instanceof Object; // 返回 true

myObj instanceof Object;    // 返回 true, 尽管原型没有定义
({})  instanceof Object;    // 返回 true, 同上
myNonObj instanceof Object; // 返回 false, 一种创建对象的方法，这种方法创建的对象不是Object的一个实例

myString instanceof Date; //返回 false

myDate instanceof Date;     // 返回 true
myDate instanceof Object;   // 返回 true
myDate instanceof String;   // 返回 false

console.log(Object instanceof Object);//true 
console.log(Function instanceof Function);//true 
console.log(Number instanceof Number);//false 
console.log(String instanceof String);//false 
console.log(Function instanceof Object);//true 
console.log(Foo instanceof Function);//true 
console.log(Foo instanceof Foo);//false
```

清单 7. Object instanceof Object

``` js
// 为了方便表述，首先区分左侧表达式和右侧表达式
ObjectL = Object, ObjectR = Object; 
// 下面根据规范逐步推演
O = ObjectR.prototype = Object.prototype 
L = ObjectL.__proto__ = Function.prototype 
// 第一次判断
O != L 
// 循环查找 L 是否还有 __proto__ 
L = Function.prototype.__proto__ = Object.prototype 
// 第二次判断
O == L 
// 返回 true
```

清单 8. Function instanceof Function

``` js
// 为了方便表述，首先区分左侧表达式和右侧表达式
FunctionL = Function, FunctionR = Function; 
// 下面根据规范逐步推演
O = FunctionR.prototype = Function.prototype 
L = FunctionL.__proto__ = Function.prototype 
// 第一次判断
O == L 
// 返回 true
```

清单 9. Foo instanceof Foo

``` js
// 为了方便表述，首先区分左侧表达式和右侧表达式
FooL = Foo, FooR = Foo; 
// 下面根据规范逐步推演
O = FooR.prototype = Foo.prototype 
L = FooL.__proto__ = Function.prototype 
// 第一次判断
O != L 
// 循环再次查找 L 是否还有 __proto__ 
L = Function.prototype.__proto__ = Object.prototype 
// 第二次判断
O != L 
// 再次循环查找 L 是否还有 __proto__ 
L = Object.prototype.__proto__ = null 
// 第三次判断
L == null 
// 返回 false
```

+ 基本类型因为没有原型链，所以使用instanceof 返回false
+ 通过`Object.create(null)`创建的对象 无任何属性原型链 所以也返回false
+ 基本类型可以使用typeof检测
+ 检测数据类型可使`Object.prototype.toString.call(类型)`

## for..in、for..of、forEach、map、for

+ for...in

该语句会以任意顺序遍历一个对象的`可枚举属性`。对于每个不同的属性，语句都会被执行。

如果只遍历自身属性最好不要用此语句，可以使用 `getOwnPropertyNames()` 或执行 `hasOwnProperty()` 来确定某属性是否是对象本身的属性

该语句可以使用`break;`跳出循环；

后期被增加、删除、修改的属性无法遍历到

+ for...of

该语句在可迭代对象（包括 `Array`，`Map`，`Set`，`String`，`TypedArray`，`arguments 对象`等等）上创建一个迭代循环，调用自定义迭代钩子，并为每个不同属性的值执行语句

无论是`for...in`还是`for...of`语句都是迭代一些东西。它们之间的主要区别在于它们的迭代方式。

`for...of`与`for...in`的区别

for...in 语句以原始插入顺序迭代对象的可枚举属性。

for...of 语句遍历可迭代对象定义要迭代的数据。

``` js
Object.prototype.objCustom = function() {}; 
Array.prototype.arrCustom = function() {};

let iterable = [3, 5, 7];
iterable.foo = 'hello';

for (let i in iterable) {
  console.log(i); // logs 0, 1, 2, "foo", "arrCustom", "objCustom"
}

for (let i in iterable) {
  if (iterable.hasOwnProperty(i)) {
    console.log(i); // logs 0, 1, 2, "foo"
  }
}

for (let i of iterable) {
  console.log(i); // logs 3, 5, 7
}
```

如果要遍历一个普通对象, 错误提示必须是`iterator`接口

``` js
var a = {a:1,b:2}
for(var i in a){console.log(i)} // Uncaught TypeError: a is not iterable
```

该语句可以使用`break;`跳出循环；

后期被增加、删除、修改的属性无法遍历到

+ forEach((当前处理的元素、当前元素索引、正在操作数组){}, 作用域this)

该方法对数组的每个元素执行一次提供的函数。

该方法返回值 `undefined`

该方法不能中止或跳出

::: tip 若你需要提前终止循环，你可以使用：

简单循环
for...of 循环
Array.prototype.every()
Array.prototype.some()
Array.prototype.find()
Array.prototype.findIndex()

:::

+ Array.prototype.map((正在处理的元素、当前索引、被调用的数组){},作用域this)

会返回一个新数组

该方法不能中止或跳出

``` js
// 下面的语句返回什么呢:
["1", "2", "3"].map(parseInt);
// 你可能觉的会是[1, 2, 3]
// 但实际的结果是 [1, NaN, NaN]
["1", "2", "3"].map(() => {return parseInt(item, index)})
```


## navigator.sendBeacon

`navigator.sendBeacon()` 方法可用于通过HTTP将少量数据异步传输到Web服务器

这个方法主要用于满足统计和诊断代码的需要，这些代码通常尝试在卸载（unload）文档之前向web服务器发送数据

[navigator.sendBeacon](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/sendBeacon)