---
title: 为什么 [1,2,3].map(parseInt) 
description: '来理解一下array.map、parseint'
sidebar: 'auto'
time: '2015-01-07'
prev: ''
next: './js-this-call'
---


## ParseInt(string, radix)

parseInt() 函数可解析一个字符串，并返回一个整数。

string 要被解析的字符串。

:::tip radix 转化的进制数

表示要解析的数字的基数。该值介于 2 ~ 36 之间。

当参数 radix 的值为 0，或没有设置该参数时，parseInt() 会根据 string 来判断数字的基数。
	如果字符串 string 以"0"开头, 基数是8（八进制）或者10（十进制），因此，永远都要明确给出radix参数的值。
	如果字符串 string 以其它任何值开头，则基数是10 (十进制)。
	如果字符串 string 以"0x"或者"0X"开头, 则基数是16 (16进制)。
	
如果该参数小于 2 或者大于 36，则 parseInt() 将返回 NaN。

:::

`这里有个进制的问题，不是科班出生不懂`

## Array.prototype.map()

array.map(function(currentValue, index,arr){}, thisValue)

::: tip
currentValue 当前元素的值
index 当前元素的索引值
arr 当前元素属于的数组对象
thisValue 对象作为该执行回调时使用，传递给函数，用作 "this" 的值。如果省略了 thisValue ，"this" 的值为 "undefined"
:::


``` bash
var parseInt = function(string, radix, obj) {
    return string + "-" + radix + "-" + obj;
};

["1", "2", "3"].map(parseInt);//["1-0-1,2,3", "2-1-1,2,3", "3-2-1,2,3"]
//"-" + obj 导致obj调用toString()方法自动转换为了string,相当于连接符
//第1次遍历：1 + "-" + 0 + "-" + [1,2,3]="1-0-1,2,3"

//toString()还有以下几种特殊情况
[{a:1},{b:2}].toString()//"[object Object],[object Object]"
[1,2].toString()//"1,2"
[[1,2],[3,4]].toString()//"1,2,3,4"
```


## 进制

我们还需要了解进制数的相关知识：

二进制的定义：用0和1两个数码来表示的数。

三进制的定义：用0和1，2三个数码来表示的数......

十进制的定义：用0和1，2，3...9十个数码来表示的数。

``` bash
//以2为基数，
parseInt('1', 2)//1
parseInt('2', 2)//NaN
parseInt('3', 2)//NaN
parseInt('10',2)//2
//以3为基数，
parseInt('1', 3)//1
parseInt('2', 3)//2
parseInt('3', 3)//NaN
parseInt('10',3)//3
//以4为基数，
parseInt('1', 4)//1
parseInt('2', 4)//2
parseInt('3', 4)//3
parseInt('4', 4)//NaN
parseInt('10',4)//4
......

//总结：
我们可以这样理解，二进制里没有2，3，...9,三进制里没有3，4...9,四进制里没有4，5...9
即当string无法转成radix基数时会返回NaN
```


``` bash
['1','2','3'].map(parseInt)
//  parseInt('1', 0) -> 1   //radix=0,以10为基数解析 1*10^1+0*10^0=10
//  parseInt('2', 1) -> NaN //radix=1<2,返回NaN
//  parseInt('3', 2) -> NaN //3无法转成二进制

//即遍历后结果为 [1,NaN,NaN]

```

``` js
[1,2,3,4,3,4,6,8,9, 99, 888].map(parseInt)
(11) [1, NaN, NaN, NaN, 3, 4, NaN, NaN, NaN, NaN, 888]
```

## 帮助

!(https://juejin.im/post/5b7298de51882561126f0389)[https://juejin.im/post/5b7298de51882561126f0389]

