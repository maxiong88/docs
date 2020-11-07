---
title: 'proxy、reflect'
description: ''
sidebar: 'auto'
time: '2019-01-03'
prev: ''
next: ''
---

### Proxy

`const p = new Proxy(target, handler)`

The Proxy object enables you to create a proxy for another object, which can intercept and redefine fundamental operations for that object.

Proxy原意是~~代理~~,。创建一个代理对象，并拦截和重新定义该对象的基本操作。

返回的代理对象是不等于原始对象。

``` js
// 如果，handler是一个空对象，没有任何拦截效果，访问proxy就等同于访问target。即使这样 proxy ===/== target也是不成立的
var target = {};
var handler = {};
var proxy = new Proxy(target, handler);
proxy.a = 'b';
target.a // "b"
```

Proxy对象可以作为某个对象的属性值或者某个对象的原型对象
``` js
var object = { proxy: new Proxy(target, handler) };
var proxy = new Proxy({}, {
  get: function(target, propKey) {
    return 35;
  }
});

let obj = Object.create(proxy);
obj.time // 35
```

同一个拦截器函数`handler`，可以设置拦截多个操作。

#### Proxy的this问题

+ Proxy 拦截函数内部的this，指向的是handler对象。

[参考MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
[参考ES6-ruan](https://es6.ruanyifeng.com/#docs/proxy)

### Reflect

Reflect 是一个内置的对象，它提供拦截 JavaScript 操作的方法。这些方法与proxy handlers的方法相同。Reflect不是一个函数对象，因此它是不可构造的。

[参考](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect)