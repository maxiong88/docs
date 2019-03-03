---
title: 'js Array方法'
description: ''
sidebar: 'auto'
time: '2019-02-01 10:00:00'
prev: ''
next: ''
---

## concat() 

concat() 方法用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。`返回一个浅拷贝`

## every(callback)

every() 方法测试数组的所有元素是否都通过了指定函数的测试。
`every 不会改变原数组。如果所有都通过func返回ture，有一个没有通过就返回false`

``` js
// 检测数组元素是否都大于10
function isBigEnough(element, index, array) {
  return (element >= 10);
}
var passed = [12, 5, 8, 130, 44].every(isBigEnough);
// passed is false
passed = [12, 54, 18, 130, 44].every(isBigEnough);
// passed is true
```
MDN

``` js
if (!Array.prototype.every){
    Array.prototype.every = function(fun){
        'use strict';

        var t = this;
        var len = t.length;
        for (var i = 0; i < len; i++){
            // callback 被调用时传入三个参数：元素值，元素的索引，原数组。
            if (i in t && !fun.call(undefined, t[i], i, t)){
                return false;
            }   
        }
        return true;
    };
}
```

## find(callback)

find() 方法返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined。
`find 方法不会改变数组。`

## findIndex(callback)

findIndex()方法返回数组中满足提供的测试函数的第一个元素的索引。否则返回-1。

## indexOf(searchElement)

indexOf()方法返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1。

## includes(valueToFind)

includes() 方法用来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 true，否则返回false。

## forEach(callback)

forEach() 方法对数组的每个元素执行一次提供的函数。
`返回值 undefined`

::: tip
没有办法中止或者跳出 forEach()、map() 循环，除了抛出一个异常。如果你需要这样，使用 forEach() 方法是错误的。
若你需要提前终止循环，你可以使用：

+ 简单循环
+ for...of 循环
+ Array.prototype.every()
+ Array.prototype.some()
+ Array.prototype.find()
+ Array.prototype.findIndex()

若条件允许，也可以使用 filter() 提前过滤出需要遍历的部分，再用 forEach() 处理。
:::

## map方法

该方法：创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。

map方法不会改变原数组。

欣赏一下Polyfill，来自MDN

``` js
if(!Array.prototype.map){
    Array.prototype.map = function(callback){
        let k = 0; // k赋值0
        let T = this; // 当前数组
        let len = this.length; // 数组长度
        let A = new Array(len); // 创建新数组，长度与原数组相同
        while(k < len){
            let kValue;
            let mapValue;
            if(k in T){
                kValue = T[k];
                mapValue = callback.call(undefined, kValue, k, T);// 当前作用域，元素值，元素的索引，原数组
                A[k] = mapValue;
            }
            k ++;
        }
        return A;
    }
}
```

从上可知

+ map从新创建了一个长度与原数组相同的数组
+ 通过while遍历并且判断当前的键是否存在
+ 如果键存在，则执行callback函数，并赋值给新数组
+ 返回新数组

所以不管我们在map里面return出什么，他都会push进新数组里面去，map返回一个数组。

::: tip
如果通过throw抛出异常，那么很荣幸地告诉你，整个程序将不会在执行，虽然他打断了map循环
:::

## reduce()

reduce() 方法对数组中的每个元素执行一个由您提供的reducer函数(升序执行)，将其结果汇总为单个返回值。`返回值：函数累计处理的结果`

## some()

some() 方法测试是否至少有一个元素通过由提供的函数实现的测试。