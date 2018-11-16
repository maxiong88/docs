---
title: js原型
description: '简单理解一下原型'
sidebar: 'auto'
time: '2015-01-05'
prev: './js-this-call'
next: './js-function-0'
---



## 对象都是通过函数来创建的

``` js
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

```

## prototype

所以的函数默认都会拥有一个名为prototype的公有并且不可枚举的属性，他会指向另一个对象

``` js
function foo(){}

foo.prototype // {}

var a = new foo() // {}
```

这个对象通常被称为foo的原型

这个原型默认有一个公有并且不可枚举的属性constructor,这个属性引用的是对象关联的函数，即foo.prototype.constructor === foo;

当我们调用 new foo() 创建对象也有一个constructor属性，指向 创建这个对象的函数，即 foo

::: tip
实际上 我们创建的对象a并没有constructor属性，虽然a.constructor确实指向了foo函数，但是这个属性并不表示a有foo“构造”
a.constructor只是通过默认的[[prototype]]委托指向foo，这和构造没有关系
:::

构造函数是 所有带 new 的函数调用，

::: tip
prototype是函数才会有的属性
:::

![Function.prototype->constructor->Function](../.vuepress/public/assets/img/prototype-20180914134848.png)

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

``` js
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

```


## [[prototype]]

浏览器中 __proto__

js中的对象有一个特殊的[[prototype]]内置属性，其实就是对于其他对象的引用。
几乎所有对象在创建的时候[[prototype]]属性都会被赋予一个非空的值（这个值一般默认是Object对象）。

``` js
var xiong = {
	a : 1
}
```

当我们试图引用对象的属性时会触发[[get]]操作，比如`xiong.a`。对于默认的[[get]]操作来说，第一步就是检查对象本身是否有这个属性，如果有就是用它.

但是如果a不在xiong中，就需要使用对象[[prototype]]链了。

对于默认的[[get]]操作来说，如果无法在对象本身找到需要的属性，就会继续访问对象的[[prototype]]链(直到找到位置，否则返回undefined)。

``` js
var xiong = {a : 1}
var xiong2 = Obejct.create(xiong)
// 输出xiong2 
我们可以看到有一个__proto__属性它指向了xiong，所以 xiong2.a = 1

'a' in xiong2 // true
```

使用for...in遍历对象时原理和查找[[prototype]]链类似，任何可以通过原型链访问到的（并且可以枚举的enumerable）的属性都会被枚举。
如果使用in操作符来检查属性在对象中是否存在时，他会查找对象的整条原型链（包括不可枚举）

所有普通的[[prototype]]链最终都会指向内置的Object.prototype



[es6的proxy](es6的proxy)




























