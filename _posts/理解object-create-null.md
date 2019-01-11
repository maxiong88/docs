layout: post
title: 理解object.create(null)
date: 2018-04-11 21:44:48
tags: javascript
---

`
    在学习vue源码的时候，作者使用了Object.create(null)来初始化一个新对象。为什么不用更简洁的{}
`

<!-- more -->

## 定义

MDN上面定义：

`该方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__`

语法：

Object.create(proto, [properitiesObject])
* proto 新创建对象的原型对象
* propertiesObject 可选，创建对象的可枚举属性
* 返回值：一个新对象，带着指定的原型对象和属性

## Object.create()、{}的区别

先看一下我们将长使用的{}创建的对象是什么样子：

`
var o = {maxiong: 123}
console.log(o)
`

打印如下：

![QQ20180411-220636@2x](../css/images/QQ20180411-220636@2x.png)

o.__proto__ === Object.prototype

从上面可以看到，新创建的对象继承了Object自身的方法，如hasOwnProperty、toString等

在看一下Object.create()创建对象

`
var o = Object.create(null)
console.log(o)
var o1 = Object.create(null,{
    a:{
        writable: true,
        configurable: true,
        value: "maxiong"
    }
})
console.log(o1)
`

![QQ20180411-223309@2x](../css/images/QQ20180411-223309@2x.png)

可以到看，
新创建的o对象没有任何属性（包括原型连） 查看log显示 No properties 无任何属性
新创建的o1对象我们通过第二个参数定义了一个属性（是可描述可删除的，可写）但是他只有自身定义的属性，再无其他
所以我们调用toString的时候会报错Uncaught TypeError

上面的例子，参数使用了null，将null设置成了新创建对象的原型，自然就不会有原型链上的属性

`
var o2 = Object.create({})
console.log(o2)
var o3 = Object.create({},{
    a:{
        writable: true,
        configurable: true,
        value: "maxiong"
    }
})
console.log(o3)
`

将null改成了{}

![QQ20180411-224308@2x](../css/images/QQ20180411-224308@2x.png)

这样创建的对象和使用{}创建的对象很类似，只不过是多了一层__proto__

`
var o4 = Object.create(Object.protoype,{
    a:{
        writable: true,
        configurable: true,
        value : "maxiong"
    }
})
console.log(04)
`

![QQ20180411-225209@2x](../css/images/QQ20180411-225209@2x.png)

这就跟定义对上了

新创建的对象的__proto__指向现有对象
即 新对象.__proto__ === {}
    {}.__proto__ === Object.prototype
    Object.prototype.__proto__ === null(题外话)

## 使用Object.create(null) 的场景

通过`QQ20180411-223309@2x`我们知道null创建的新对象很干净，无任何属性，我们自定义属性的时候完全不必担心会将原型链上的同名方法覆盖掉，因为它不存在

* Object.prototype.hasOwnProperty(obj, "属性名") obj.hasOwnProperty("属性名") 检测当前属性是不是自身属性不会从原型链查找
* Object.getOwnPropertyNames(obj) 指定对象的所有自身属性的属性名（包括不可枚举属性但不包括Symbol值作为名称的属性）组成的数组。
* Object.keys() 方法会返回一个由一个给定对象的自身可枚举属性组成的数组，数组中属性名的排列顺序和使用 for...in 循环遍历该对象时返回的顺序一致 （两者的主要区别是 一个 for-in 循环还会枚举其原型链(只是第一级的)上(继承)的属性）。


## 总结一下

* 如果你需要一个特别干净且高度可定制的对象就使用 Objecr.create(null)
* 如果你想定一个新对象的__proto__指向特定的原型就使用 Object.create(Array.prototype等)
* 


