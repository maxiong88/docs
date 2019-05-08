---
title: '[转]重学 JS new操作符'
description: ''
sidebar: 'auto'
time: '2019-01-01'
prev: ''
next: ''
---

## new 的作用

我们先来通过两个例子来了解 `new` 的作用

``` js
function Test(name) {
  this.name = name
}
Test.prototype.sayName = function () {
    console.log(this.name)
}
const t = new Test('yck')
console.log(t.name) // 'yck'
t.sayName() // 'yck'

// 以下是conosle.log(t)输出
Test {
    name: "yck"
    __proto__:{
        sayName: ƒ ()
        constructor: ƒ Test(name)
            arguments: null
            caller: null
            length: 1
            name: "Test"
            prototype: {sayName: ƒ, constructor: ƒ}
            __proto__: ƒ ()
            [[FunctionLocation]]: VM4610:1
            [[Scopes]]: Scopes[2]
        __proto__: Object
    }
}
```

从上面一个例子中我们可以得出这些结论：

+ `new` 通过构造函数 `Test` 创建出来的实例可以访问到构造函数中的属性
+ `new` 通过构造函数 `Test` 创建出来的实例可以访问到构造函数原型链中的属性，也就是说通过 `new` 操作符，实例与构造函数通过原型链连接了起来

关于构造函数返回值的问题：

+ 构造函数会默认返回this，也就是新的实例对象
+ 普通函数如果没有return值的话，返回undefined
+ return的是五种简单数据类型：String,Number,Boolean,Null,Undefined的话，构造函数会忽略return的值，依然返回this对象
+ 如果return的是引用类型：Array,Date,Object,Function,RegExp,Error的话，构造函数和普通函数都会返回return后面的值,构造函数的原型不被使用

基本类型

``` js
// 基本类型
function Otaku (name, age) {
    this.strength = 60;
    this.age = age;

    return 'handsome boy';
}

var person = new Otaku('Kevin', '18');

console.log(person.name) // undefined
console.log(person.habit) // undefined
console.log(person.strength) // 60
console.log(person.age) // 18

```

引用类型

``` js
// 引用类型
function Otaku (name, age) {
    this.strength = 60;
    this.age = age;

    return {
        name: name,
        habit: 'Games'
    }
}
Otaku.prototype.dd='ddd'
var person = new Otaku('Kevin', '18');

console.log(person.name) // Kevin
console.log(person.habit) // Games
console.log(person.strength) // undefined
console.log(person.age) // undefined
console.log(person.dd) // undefined
```

## 自己实现 new 操作符

首先我们再来回顾下 `new` 操作符的几个作用

+ new 操作符会返回一个新对象，所以我们需要在内部创建一个对象
+ 这个对象可以访问构造函数上的任意属性,可以访问到构造函数原型上的属性，所以需要将对象与构造函数链接起来
+ 返回原始值需要忽略，返回对象需要正常处理

回顾了这些作用，我们就可以着手来实现功能了

```js
function create(Con, ...args) {
//   let obj = {};
//   Object.setPrototypeOf(obj, Con.prototype)
    let obj = Object.create(Con.prototype)
    let result = Con.apply(obj, args)
    return result instanceof Object ? result : obj
}
```

[这就是一个完整的实现代码，我们通过以下几个步骤实现了它](//www.ecma-international.org/ecma-262/5.1/#sec-11.2.2)

[草稿](//tc39.github.io/ecma262/#sec-new-operator)

new 运算符

+ 新表达式 new NewExpression => EvaluteNew(NewXepresstion, empty)
+ 成员表达式 new MemberExpression Arguments => EvaluateNew(MemberExpression, Arguments)

EvaluateNew( constructExpr, arguments ) 求值 

使用参数constructexpr和arguments计算new，执行以下步骤：
+ 构造函数 constructexpr 存在
+ arguments为empty或者是一个arguments对象
+ 假设 ref是构造函数返回的结果







+ 让 `ref` 为新表达式的计算结果
+ 

+ 首先函数接受不定量的参数，第一个参数为构造函数，接下来的参数被构造函数使用
+ 创建一个空对象
    - 需要访问构造函数的原型链
    - 需要访问构造函数内部的属性和方法
+ `obj = Object.create(func.prototype)`创建一个新对象，使用现有的对象来提供新创建的对象的__proto__
+ `func.apply(obj, arg)`调用一个具有给定this值的函数，以及作为一个数组（或类似数组对象）提供的参数。
    - `obj`是 在 `func` 函数运行时使用的 this 值
    - `arg` 一个数组或者类数组对象
+ ~~然后内部创建一个空对象 `obj`~~
+ ~~因为 `obj` 对象需要访问到构造函数原型链上的属性，所以我们通过 `setPrototypeOf` 将两者联系起来。这段代码等同于 `obj.__proto__ = Con.prototype`~~
+ ~~将 `obj` 绑定到构造函数上，并且传入剩余的参数, 将构造函数的作用域赋给新对象，因此co对象中的this指向了新对象obj，然后再调用co函数。~~
+ 判断构造函数返回值是否为对象，如果为对象就使用构造函数返回的值，否则使用 `obj`，这样就实现了忽略构造函数返回的原始值

接下来我们来使用下该函数，看看行为是否和 `new` 操作符一致

``` js
function Test(name, age) {
  this.name = name
  this.age = age
}
Test.prototype.sayName = function () {
    console.log(this.name)
}
const a = create(Test, 'yck', 26)
console.log(a.name) // 'yck'
console.log(a.age) // 26
a.sayName() // 'yck'
```

## 延伸一下

`Object.create(prototype/null)`返回值是一个新对象，带着指定的原型对象和属性。

`Object.setPrototypeOf({},prototype/null)`设置一个指定的对象的原型 ( 即, 内部[[Prototype]]属性）到另一个对象或  null。


+ [KieSun](//github.com/KieSun/Dream)
+ [https://segmentfault.com/a/1190000008615288](//segmentfault.com/a/1190000008615288)