---
title: js继承
description: 'call、apply  ES6 Class js 原型链'
sidebar: 'auto'
time: '2019-05-20'
prev: ''
next: ''
---

## 概念

继承（Inheritance）是一种在新对象上复用现有对象的属性和方法的形式。这有助于避免重复代码和重复数据。

### 原型式继承

#### 原型是什么
JavaScript使用原型式继承，其中其行为被继承的对象称为原型。

#### 原型从哪里来
构造函数都包含属性prototype，这个属性可以访问原型对象。
``` js
function Person(){}
Person.prototype // 这是一个指向原型的引用
{
    constructor: Person()
    __proto__: Object
}
```

#### 如何设置原型
``` js
function Person(){
    this.sizhi = 4;
}
Person.prototype.aaa = function(){
    console.log('+++++:'+ this.sizhi)
}
```

#### 重写constructor属性的问题
+ 返回创建实例对象的构造函数的引用。注意，此属性的值是对函数本身的引用，而不是一个包含函数名称的字符串
+ 只有prototype才有constructor属性，而其他实例对象没有。(不考虑继承)
+ 若完全重写prototype，需要为重写后的prototype增加constructor属性，并规定其正确的指向。

#### 重写原型
JavaScript总是先在对象实例（即具体的人对象）中查找属性；如果找不到，再在原型中查找
``` js
function Person(){
    this.sizhi = 4;
}
Person.prototype.aaa = function(){
    console.log('+++++:'+ this.sizhi)
}
var ma = new Person();
ma.aaa = function(){
    console.log('-----:'+ this.sizhi)
}
```

#### fn.call详解
``` js
function showDog(name, bread, handler){
    Dog.call(this, name, bread) // 重用构造函数Dog中的代码来给属性等赋值---以此替换了那些重复的代码
    this.handler = handler;
}
```

#### 关键字
`hasOwnProperty()` 判断某个对象实例上是否有此属性，原型不是对象实例中定义<br/>
`fn.call(this, ...args)` fn是要调用的函数、this指定了函数fn中this指向的对象、args多个参数字符串；
理解：这里调用了fn的方法call，导致函数fn被调用。这里之所以调用方法call，而不是直接调用fn，是因为这里可以控制函数fn的this的值

#### 写一个，来一个
``` js
function Person(){
    this.a1 = 'a1'
    this.a2 = 'a2'
}
Person.prototype.a3 = function(){
    console.log('----:'+this.a1)
}
function ma(a1, a2){
    Person.call(this, a1, a2)
    this.ma1 = 'ma1'
}
ma.prototype = new Person(); // ma.prototype = Object.create(Person.prototype)
ma.prototype.constructor = ma;
var c = new ma();
```

#### 要点
+ 通过在原型中定义属性，可减少对象包含的重复代码。
+ 要重写原型中的属性，只需在实例中添加该属性即可
+ 要确定属性是否是在实例中定义的，可对实例调用方法hasOwnProperty
+ 要调用函数并指定函数体中this指向的对象，可调用其方法call

### ES6 class继承

ES6 的class可以看作只是一个语法糖，它的绝大部分功能，ES5 都可以做到，新的class写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。

### call、apply继承 object masquerading
``` js
function ClassX(){}
function ClassY(){}
function ClassZ() {
    this.newMethod = ClassX;
    this.newMethod();
    delete this.newMethod;

    this.newMethod = ClassY;
    this.newMethod();
    delete this.newMethod;
}

这里存在一个弊端，如果存在两个类 ClassX 和 ClassY 具有同名的属性或方法，ClassY 具有高优先级。因为它从后面的类继承。除这点小问题之外，用对象冒充实现多重继承机制轻而易举。

function classA (d1){
    this.a1='1'
    this.a2 = function(){
        console.log(this.a1, d1)
    }
}
function classB(d2){
    classA.call(this,d2)
}
var bv = new classB(4)
bv.a2(); // 1 4
由于这种继承方法的流行，ECMAScript 的第三版为 Function 对象加入了两个方法，即 call() 和 apply()。
```


inherit [yin hai ri te]