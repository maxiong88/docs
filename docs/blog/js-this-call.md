---
title: js指向问题
description: 'apply、call、bind、箭头函数'
sidebar: 'auto'
time: '2015-01-06'
prev: './js-parseint'
next: './js-function-prototype'
---



https://juejin.im/post/5ba34e54e51d450e5162789b#comment


https://coding.imooc.com/learn/list/228.html


https://ustbhuangyi.github.io/vue-analysis/extend/event.html#%E7%BC%96%E8%AF%91







## 函数

函数是由事件驱动的或者当它被调用时执行的可重复使用的代码块。

## 构造函数

需要使用new运算符初始化

## 普通函数

不适用new运算符的函数


## 区别

1. 构造函数使用new运算符调用；普通函数不使用new运算符调用；

``` js
var p = new Person();
var p1 = Persion1();
```

2.构造函数内部可以使用this关键字；普通函数内部不建议使用this，因为这时候this指向的是window全局对象，这样无意间就会为window添加了一些全局变量或函数

``` bash
2.1 在构造函数内部，this指向的是构造出来的新对象

2.2 在普通函数内部，this指向的是window全局对象
```

3.构造函数默认不用return返回值；普通函数一般都有return返回值

``` bash
3.1 构造函数会默认返回this，也就是新的实例对象

3.2 普通函数如果没有return值的话，返回undefined

3.3 如果使用了return，那返回值会根据return值的类型而有所不同
3.3.1 return的是五种简单数据类型：String,Number,Boolean,Null,Undefined的话，构造函数会忽略return的值，依然返回this对象；而普通函数会返回return后面的值
3.3.2 如果return的是引用类型：Array,Date,Object,Function,RegExp,Error的话，构造函数和普通函数都会返回return后面的值
```

4.构造函数首字母建议大写；普通函数首字母建议小写

### 课外

new 做了什么

``` bash
var obj = {} 创建一个空对象obj

obj.__proto__ = co.prototype 将这个空对象的__proto__成员指向了构造函数对象的prototype成员对象，这是最关键的一步，具体细节将在下文描述。

co.call(obj) 将构造函数的作用域赋给新对象，因此co对象中的this指向了新对象obj，然后再调用co函数。

return obj 返回新对象obj
```


我都到一篇文章 用了一个很通俗易懂的 方法解释的，

js 给java打了一个电话告诉了它的住址让他过来吃饭，java就知道了js地址，java到了js家里不管怎么改动家里的布局，js、java都在js的家里面

引用类型的赋值其实是对象保存在栈区地址指针的赋值，所以两个变量指向同一个对象，任何的操作都会互相影响.

参考资料

[https://segmentfault.com/a/1190000008615288](https://segmentfault.com/a/1190000008615288)






















