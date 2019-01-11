---
title: 理解js构造函数
date: 2017-03-17 13:53:08
tags: javascript
---


面试遇到的问题，在实际项目中忽略了这种问题；



<!-- more -->





javascript 对象的创建方式

对象字面量和使用new表达式

对象字面量：

1.不便于创建大量相同类型的对象

2.不利于使用继承等高级特性

new表达式是配合构造函数使用

定义构造函数

```

```










js中构造函数与普通函数区别：

1.构造函数第一个字母大写  function Person(){}

2.非构造函数第一个字母小写 function person(){}

3.任何函数，只要通过new操作符来调用，那他就可以作为构造函数

4.任何函数，如果不通过new操作符来调用，那它跟普通函数也没有什么两样

```
// 创建函数
function Person(name,age){
	this.name = name;
	this.age = age;
	this.sayName = function(){
		console.log(this.name)
	}
}
// 当做构造函数使用
var person = new Person('Ni',29);
person.satName();
// 当作普通函数调用
Person('Ni',29);
window.sayName();
```

5.使用new操作符来调用一个构造函数的时候发生了什么？


var obj = {} 创建一个空对象obj

obj.__proto__ = co.prototype 将这个空对象的__proto__成员指向了构造函数对象的prototype成员对象，这是最关键的一步，具体细节将在下文描述。

co.call(obj) 将构造函数的作用域赋给新对象，因此co对象中的this指向了新对象obj，然后再调用co函数。

return obj 返回新对象obj


6.正确定义javascript构造函数

js的构造函数并不是作为类的一个特定方法存在的；

当任意一个普通函数用于创建一类对象时，它就被称作构造函数，或构造函数。

一个函数要作为一个真正意义上的构造函数，需要满足：

	1.在函数内部对新对象this的属性进行设置，通常是添加属性和方法

	2.构造函数可以包含返回语句(不推荐),但返回值必须是this，或者其它非对象类型值





