---
title: Vue源码解析1
date: 2017-02-20 14:40:30
tags: vue
---

这是个人见解，如有不足还需指正

<!-- more -->

### 开源vue框架

* https://www.iviewui.com/docs/guide/i18n
* http://mint-ui.github.io/docs/#!/zh-cn2/badge


## 解析vue源码

/* Convert a value to a string that is actually rendered */
/* 将值转换为实际呈现的字符串 */

```
function _toString (val) {
	return val == null 
		? ''
		: typeof val === 'object'
			? JSON.stringify(val, null, 2)
			: String(val)
}
```

// typeof 可以用来检测给定变量的数据类型

* JavaScript数据类型是非常简洁的，它只定义了6中基本数据类型
    * null：空、无。表示不存在，当为对象的属性赋值为null，表示删除该属性
	* undefined：未定义。当声明变量却没有赋值时会显示该值。可以为变量赋值为undefined
	* number：数值。最原始的数据类型，表达式计算的载体
	* string：字符串。最抽象的数据类型，信息传播的载体
	* boolean：布尔值。最机械的数据类型，逻辑运算的载体
	* object：对象。面向对象的基础
* 但判断一个变量是否存在时，用if(typeof str == underfined)
* typeof 1 ===> 返回字符窜 "number"
* typeof "1" ==> 返回字符窜 "string"
* typeof true ==> 返回字符窜 "boolean"
* typeof {} ==> 返回字符窜 "object"
* typeof [] ==> 返回字符窜 "object"
* typeof function(){} ==> 返回字符窜 "function"
* typeof null ==> 返回字符窜 "object"
* typeof underfined ==> 返回字符窜 "undefined"

* 即

* typeof 37 === 'number'
* typeof 3.14 === 'number'
* typeof NaN === 'number'

* typeof "" === 'string'
* typeof "bla" === 'string'
* typeof String("abc") === 'string'

* typeof true === 'boolean'

* typeof undefined === 'undefined'

* typeof null === 'object'
* typeof {a:1} === 'object'
* typeof [1,2,3] === 'object'
* typeof new Date() === 'object'
* typeof function(){} === 'function'
* typeof Math === 'object'
* typeof Math.sin === 'function'

* 你会发现：JavaScript解释器认为null是属于object数据类型的一种特殊形式，而function(){}是function类型，也就是说函数也是一种基本数据类型，而不是对象的一种特殊形式。
* 实际上，在JavaScript中，函数是一个极容易引起误解或引发歧义的数据类型，它可以是独立的函数类型，又可以作为对象的方法，也可以被称为类或构造器，还可以作为函数对象而存在等。
* 所以，在《JavaScript权威指南》中把function被看做是object基本数据类型的一种特殊对象，另外《悟透JavaScript》和《JavaScript高级程序设计》也把函数视为对象，而不是一种基本数据类型。但是在《JavaScript语言精髓与编程实践》中却把function视为一种基本数据类型，而把null视为object类型的一种特殊形式。至于谁对谁错，看来只有根据具体情况而定了。

 

// String() 函数是把对象的值转为字符窜

// JSON.stringify(value [, replacer] [, space]) 将json文件转字符窜
//// value 必须字段。就是你输入的对象，比如数组、类等
//// replacer 可选 一种是数组 一种是方法
////// 情况一：replacer为数组时，通过后面的实验可以知道，它是和第一个参数value有关系的。一般来说，系列化后的结果是通过键值对来进行表示的。 所以，如果此时第二个参数的值在第一个存在，那么就以第二个参数的值做key，第一个参数的值为value进行表示，如果不存在，就忽略。
////// 情况二：replacer为方法时，那很简单，就是说把系列化后的每一个对象（记住是每一个）传进方法里面进行处理。
//// space 就是用什么来做分隔符
////// 1）如果省略的话，那么显示出来的值就没有分隔符，直接输出来 。
////// 2）如果是一个数字的话，那么它就定义缩进几个字符，当然如果大于10 ，则默认为10，因为最大值为10。
////// 3）如果是一些转义字符，比如“\t”，表示回车，那么它每行一个回车。 
////// 4）如果仅仅是字符串，就在每行输出值的时候把这些字符串附加上去。当然，最大长度也是10个字符。

* 只有第一个参数的情况下
* var student = {} // new Object()
* student.name = "maxiong"
* student.age = "19"
* student.location = "China"
* var json = JSON.stringify(student)
* console.log(json) // String '{"name":"maxiong","age":"19","location":"China"}'
* console.log(student) //Object {name: "maxiong", age: "19", location: "China"}

* 当第二个参数存在的话
* 如果为null就忽略
* 如果是方法，就是说把系列化后的每一个对象（记住是每一个）传进方法里面进行处理
* var student = []
* student[0] = "one"
* student[1] = "two"
* student[2] = "three"
* var json = JSON.stringify(student,switchUpper)
* function switchUpper(key,value){
* return value.toString().toUpperCase()
* }
* 或者 
* var json = JSON.stringify(student, function(key,value){return value.toString().toUpperCase()})
* console.log(json)
* "ONE,TWO,THREE"
* 如果不是function是数组
* var stuArr1 = []
* stuArr1[0] = "one"
* stuArr1[1] = "two"
* stuArr1[2] = "three"
* var stuArr2 = []
* stuArr2[0] = "1"
* stuArr2[1] = "2"
* var json = JSON.stringify(stuArr1,stuArr2)
* console.log(json)
* ["one","two","three"]
* 如果第一个参数是对象，第二个参数数组
* var stuObj = {}
* stuObj.id = "20122014001"
* stuObj.name = "Tomy"
* stuObj.age = 25
* var stuArr = []
* stuArr[0] = "id"
* stuArr[1] = "age"
* stuArr[2] = "addr" // 这个stuObj对象里不存在。
* var json = JSON.stringify(stuObj,stuArr)
* console.log(json)
* '{"id":"20122014001","age":25}'


* 当第三个参数存在情况下
* 如果是一个数字的话，那么它就定义缩进几个字符
* var json = JSON.stringify(student，null,2)
* String '{
*  "name": "maxiong",
*  "age": "19",
*  "location": "China"
* }'
* 如果是一些转义字符，比如“\t”，表示回车，那么它每行一个回车
* var json = JSON.stringify(student，null,'\t')
* String '{
*	"name": "maxiong",
*	"age": "19",
*	"location": "China"
* }'

// JSON.parse(X) 将字符窜转为json

// 如需兼容IE 使用json2.js 

/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 * 将一个值转为number
 * 如果返回NaN，直接输出字符窜
 */

```
function toNumber (val) {
	var n = parseFloat(val);
	return isNaN(n) ? val : n
}
```
* parseFloat() 函数可解析一个字符串，并返回一个浮点数。
	* 该函数指定字符串中的首个字符是否是数字。如果是，则对字符串进行解析，直到到达数字的末端为止，然后以数字返回该数字，而不是作为字符串。
	* 如果字符串的第一个字符不能被转换为数字，那么 parseFloat() 会返回 NaN。
	* 如果只想解析数字的整数部分，请使用 parseInt() 方法。

```
document.write(parseFloat("10")) 
// 10
document.write(parseFloat("10.00")) 
// 10
document.write(parseFloat("10.33")) 
// 10.33
document.write(parseFloat("34 45 66")) 
// 34
document.write(parseFloat(" 60 ")) 
// 60
document.write(parseFloat("40 years"))
// 40
document.write(parseFloat("He was 40"))
// NaN
document.write(parseFloat("3.14")) 
// 3.14
document.write(parseFloat("314e-2")) 
// 3.14
document.write(parseFloat("0.0314E+2")) 
// 3.14
document.write(parseFloat("3.14more non-digit characters")) 
// 3.14

// Number() 函数把对象的值转换为数字，如果无法转换为数字，返回NaN
```
/**
 * Make a map and return a function for checking if a key
 * is in that map.
 * 创建一个对象
 * 将字符转转数组
 * 遍历数组将数组元素作为map的属性
 * 是否区分大小写
 * 返回一个方法
 *  如果 var a = makeMap('str',true)
 *  console.log(a('str1'))
 *  如果str1属于str里面的一个子元素，则返回true
 */

```
function makeMap (str, expectsLowerCase) {
	var map = Object.create(null)；
	var list = str.split(',');
 	for(var i=0;i<list.length;i++){
		map[list[i]] = true
	}
	return expectsLowerCase ? function (val) { return map[val.toLowerCase()]}
							: function (val) { return map[val]}
}
```

* Object.create() 方法创建一个拥有指定原型和若干个指定属性的对象。
	* var o;
	* o = Object.create(null) 创建一个原型为null的空对象
	* var o;
	* o = Object.create(Object.prototype) 以字面量方式创建的空对象就相当于此 
* String.split() 将字符窜转数组

```
使用Object.create() 来实现一个简单的继承

function xiong () {
	this.age = '10'
}
xiong.prototype.sex = function () {
	return 'nv'
}
function pop () {
	xiong.call(this)
}
pop.prototype = Object.create(xiong.prototype)
var pp = new pop()
console.log(pp.age) 
// 10
```

/**
 * Check if a tag is a built-in tag.
 * 固定放入两个参数
 */

```
var isBuiltInTag = makeMap('slot,component', true);
```

/**
 * Remove an item from an array
 * 从数组中移除元素，返回被删除的元素
 */

```
function remove$1 (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}
```

* arr.length 传入数组长度
* ArrayObj/stringObj.indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置。
	* 如果是数组/字符窜返回当前元素的下标，如果没有返回-1 
* ArrayObj.splice(index,howmany,item1....) 方法向/从数组中添加/删除项目，然后返回被删除的项目。
	* 该方法会改变原始数组
	* index 整数，规定要添加或者删除的位置，使用负数可从数组尾部开始
	* howmany 要删除的项目数量，如果设为0，则不会删除
	* item 向数组添加的新项目
	* 如果是从arrayObject中删除元素，则返回的是删除的元素
