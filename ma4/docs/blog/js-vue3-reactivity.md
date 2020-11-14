---
title: 'Vue3 源码-响应基础'
description: ''
time: '2020-10-26'
prev: ''
next: ''
tags:
    - 'javascript'
    - 'vue'
---



### index.ts



### ref.ts

``` js

```

+ 带 `ref` 的响应式变量：返回一个响应式且可变的 具有value属性的ref 对象,
    - 它是具有RefImpl构造函数的内置对象类型的实例
``` js
RefTmpl = {
    __v_isRef: true
    _rawValue: "1"
    _shallow: false
    _value: "1"
    value: "1"
}
```


[proxy、reflect](../js-reflection.html)
js标准内置对象[WeakMap](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)：一组键/值对的集合，其中的键是弱引用的。其键必须是对象，而值可以是任意的。更有利于垃圾回收正确进行,并且key是不可枚举的。如果想要key可枚举的话建议使用[Map](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map)