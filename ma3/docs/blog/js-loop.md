---
title: 'js 循环那些事'
description: ''
sidebar: 'auto'
time: '2019-02-01'
prev: ''
next: ''
---

## for(var i; i<len;i++)

+ break 跳出当前的for循环
+ continue 跳过本次循环，继续往下执行循环
+ return 语法错误

``` js

// for break
for(var i = 0; i < 3; i += 1){
    for(var j = 0; j < 3; j++){
        if(j === 1){
            break;
        }
        console.log(i+'-'+j);
    }
}

// 0-0,1-0,2-0

// for continue
for(var i = 0; i < 3; i += 1){
    for(var j = 0; j < 3; j++){
        if(j === 1){
            continue;
        }
        console.log(i+'-'+j);
    }
}
// 0-0,0-2,1-0,1-2,2-0,2-2
```

## forEach((item, index) => {})
对每个元素执行一次给定的函数。
除了抛出异常以外，没有办法中止或跳出 forEach() 循环。如果你需要中止或跳出循环，forEach() 方法不是应当使用的工具。

+ return 结束本次循环，进入下一次循环
+ break、continue 语法错误
+ 返回值：无返回值
+ 不会改变原对象

``` js
var arr = [1,2,3];

arr.forEach(function(value,index) {
    if(index === 1){
        return true;
    }
    console.log(index)
});
// 0, 2
```

## map((item, index) => {})
map 不修改调用它的原数组本身（当然可以在 callback 执行时改变原数组）
+ return 返回新数组当前元素的值
+ break、continue 语法错误
+ 返回值：新数组

``` js
var arr = [1,2,3];

var df = arr.map(function(value,index) {
    if(index === 1){
        return true;
    }
    //console.log(index)
});
//  [undefined, true, undefined]

var df = arr.map(function(value,index) {
    if(index === 1){
        return false;
    }
    //console.log(index)
});
// [undefined, false, undefined]
```

## for...in

以任意顺序遍历一个对象自有的、继承的、可枚举的、非Symbol的属性
+ break、continue 无效
+ return 语法错误

``` js
var arr = [1,2,3];

for(var i in arr){
    if(i === 1){
        break;
        // continue
    }
    console.log(i)
}
// 0,1,2
```

## for...of

语句在可迭代对象（包括 Array，Map，Set，String，TypedArray，arguments 对象等等）上创建一个迭代循环，调用自定义迭代钩子，并为每个不同属性的值执行语句

+ return 语法错误
+ break 跳出for of 循环
+ continue 跳过本次循环

``` js
var arr = [1,2,3];

for(var i of arr){
    if(i === 2){
        continue;
    }
    console.log(i)
}
// 1,3

var arr = [1,2,3];

for(var i of arr){
    if(i === 2){
        break
    }
    console.log(i)
}
// 1
```