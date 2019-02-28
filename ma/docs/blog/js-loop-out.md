---
title: 'javascript的循环怎么跳出'
description: 'for、map、some、filter等怎么跳出循环'
sidebar: 'auto'
time: '2019-02-28 10:00:00'
prev: ''
next: ''
---

`map()`方法创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。

``` js
const arr = [1,2,3,4];
try {

arr.map((v) => {
    console.log(v)
    if (v === 2) {
        throw 'out';
    }
})
} catch (e) {

}

```