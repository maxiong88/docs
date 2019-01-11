---
title: js原型
date: 2018-04-02 22:12:42
tags: javascript
---

来学一下

<!-- more -->

## 对象都是通过函数来创建的

`
function fn(){}
var a = new Fn();

var a1 = {a:10,v:10}
var a2 = [1,2]

var obj = new Array();
obj[0] = 1;
obj[1] = 2;

var obj = new Object();
obj.a = 10;
obj.b = 10;

console.log(typeof (Object));  // function
console.log(typeof (Array));  // function

`

## prototype原型

js中 每一个函数都有一个属性叫做prototype，这个prototype的属性值是一个对象[属性集合]，
这个对象集合默认的只有一个叫做constructor的属性，而这个属性指向（的值是）函数自己

![Function.prototype->constructor->Function](../assets/img/prototype-20180914134848.png)

原型既然作为对象，属性的集合，不可能就只弄个constructor来玩玩，肯定可以自定义的增加许多属性。
例如这位Object大哥，人家的prototype里面，就有好几个其他属性。

``` js
Object.prototype 谷歌浏览器查看
{
constructor: ƒ Object()
hasOwnProperty: ƒ hasOwnProperty()
isPrototypeOf: ƒ isPrototypeOf()
propertyIsEnumerable: ƒ propertyIsEnumerable()
toLocaleString: ƒ toLocaleString()
toString: ƒ toString()
valueOf: ƒ valueOf()
__defineGetter__: ƒ __defineGetter__()
__defineSetter__: ƒ __defineSetter__()
__lookupGetter__: ƒ __lookupGetter__()
__lookupSetter__: ƒ __lookupSetter__()
get __proto__: ƒ __proto__()
set __proto__: ƒ __proto__()
}
```

你也可以在自己自定义的方法的prototype中新增自己的属性

```js
function a(){}
a.prototype.fh = function(){}
```

调用prototype属性

因为每个对象都有一个隐藏的属性——“__proto__”，这个属性引用了创建这个对象的函数的prototype。

```js 
function a1(){this.name="0000"}
a1.prototype.named = '11111';
var a2 = new a1();

console.log(a1.prototype) // {named: "11111", constructor: ƒ a1()}
console.log(a2) // a1{name: '0000', __proto__: {named: "11111", constructor: ƒ a1()}}

```

即：a2.__proto__ === a1.prototype


复制两个问题
`
function Person(name, age) {
    this.name = name;
    this.age = age;
    this.sayHi = function () {
        console.log("hi, I am " + this.name);
    }
 
}
// var nullProto = Object.create(null);
Person.prototype = null;
console.log(Person.prototype); //null
var me = new Person("ErumHuang", 22);
console.log(me.__proto__); //{}  

===============  typeof null  "object"


function Person(name, age) {
    this.name = name;
    this.age = age;
    this.sayHi = function () {
        console.log("hi, I am " + this.name);
    }
 
}
var nullProto = Object.create(null);
Person.prototype = nullProto;
console.log(Person.prototype); //{}
var me = new Person("ErumHuang", 22);
console.log(me.__proto__); //undefined

=========== Object.create(null) 没有继承任何原型方法(没有任何属性)的空对象

`

## 每个对象都有一个隐藏的属性：__proto__（隐式原型）

每个对象都有一个__proto__属性，指向创建该对象的函数的prototype.


## instanceof

instanceof 运算符用来测试一个对象在其`原型链中`是否存在一个构造函数的 prototype 属性。

对于值类型，你可以通过typeof判断，string/number/boolean都很清楚，但是typeof在判断到引用类型的时候，返回值只有object/function，
你不知道它到底是一个object对象，还是数组，还是new Number等等。


object instanceof constructor

object.__proto__  instanceof  fn.prototype

`
function Foo(){}
var f1 = new Foo()

* f1 instanceof Foo // true
= f1.__proto__ ==== Foo.prototype

* f1 instanceof Object // true 
= f1.__prpto__.__proto__ ==== Object.prototype

* Object instanceof Function
= Object.__proto__ === Function.prototype

* Function instanceof Object
= Function.__proto__.__proto__ === Object.prototype

* Function instanceof Function
= Array.__proto__ === Function.prototype
= Function.__proto__ === Function.prototype

`


![解释](../css/images/181637013624694.png)

instanceof表示的就是一种继承关系，或者原型链的结构

## 原型链 继承

访问一个对象的属性时，先在基本属性中查找，如果没有，再沿着__proto__这条链向上找，这就是原型链。

hasOwnProperty() 方法会返回一个布尔值，指示对象自身属性中是否具有指定的属性

![hasOwnProperty,for…in…循环中，一定要注意](../css/images/20180402134735.png)

## 原型的灵活性

* 对象或者函数，刚开始new出来之后，可能啥属性都没有。但是你可以这会儿加一个，过一会儿在加两个，非常灵活。

* 如果继承的方法不合适，可以做出修改
= Array的toString()就被重写了
= var obj = {a:1} obj.toString() [object Object]
= var obj = [1,2] obj.toString() "1,2"

* 如果你要添加内置方法的原型属性，最好做一步判断，如果该属性不存在，则添加。如果本来就存在，就没必要再添加了。



本文摘自 王大神的博客 http://www.cnblogs.com/wangfupeng1988/p/3977924.html