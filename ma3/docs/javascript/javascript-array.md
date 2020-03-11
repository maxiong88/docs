---
title: '正确使用数组方法'
description: '在review代码的时候发现代码的臃肿、不明白其用法等问题总结一下'
sidebar: 'auto'
time: '2019-12-02'
prev: ''
next: ''
---

## Array.indexOf() 、Array.includes()

+ MDN
    - `indexOf()`方法返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1。
    - `includes()` 方法用来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 true，否则返回false。

通过`MDN`的定义，我们可以直观地看出这两个方法要怎么用

#### 案例

``` js
{
    [1,2,3,4].indexOf(3) !== -1 ? '存在' : '不存在'

    // 在这个例子中使用indexof来返回 被查找元素的索引，又进行了运算符的转化。使用includes直白简洁

    [1,2,3,4].includes(3) ? '存在' : '不存在'
}
```

::: tip

如果只是判断被查找的元素存不存在只需要使用includes即可(无法判断下标索引);
如果需要被查找元素的当前索引可以使用indexOf;
因为indexOf使用了比较运算符进行判断，所以不支持`NaN`查找
:::

## Array.find()、Array.findIndex()、Array.indexOf()、Array.includes()

+ `findIndex((当前遍历到的元素，当前遍历到的索引，数组本身) => {}, thisArg)` 返回数组中找到的第一个元素的索引，否则返回 -1
+ `find((当前遍历到的元素，当前遍历到的索引，数组本身) => {}, thisArg)` 返回数组满足提供测试函数的的第一个元素的值，否则undefined
+ `indexOf(需要查找的元素，开始的索引)` 返回在数组中找到一个给定元素的第一个索引，否则返回-1
+ `includes(需要查找的元素值，开始的索引)` 用来判断一个数组是否包含一个指定的值，返回true，false

