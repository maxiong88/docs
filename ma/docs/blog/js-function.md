---
title: 'javascript 函数的理解（一）'
description: '函数声明、函数表达式'
sidebar: 'auto'
time: '2019-02-27'
tags: 'javascript'
prev: ''
next: ''
---

摘自 HEAD FIRST JAVASCRIPT：

## 函数声明

``` js
function ma(){}
```

#### 分析函数声明

在分析网页期间（执行任何代码之前），浏览器查找函数声明。找到 函数声明时，浏览器创建相应的函数，并将得到的函数引用赋给与函 数同名的变

在执行代码之前，会先把所有js解析一遍，如果遇到了函数声明的必须先对他进行处理，在做其他的事情

#### 怎么处理呢？

先将这个函数存储起来（`就会创建一个与函数名一样的的变量来存储指向这个函数的引用`），以便能够在他被调用时获取它，

处理完所有代码以后，浏览器开始回到代码开头，开始从头到尾顺序执行

## 函数表达式

``` js
var ma = function(){}
```
函数表达式的结果是一个函数引用，因此在可以使用函数引用的任何地方，都可使用函数表达式，

## 两者存在细微的差别

函数声明：创建的函数是在执行其他代码前定义的。

函数表达式：是在运行阶段与其他代码一起执行的，因此在函数表达式所在的语句执行前，它创建的函数是未定义的。

另一个差别与函数命名相关：使用函数声明时，将创建一个与函数同名的变量，并让它指向函数；而使用函数表达式时，通常不给函数指定名称，因此你要么在代码中将函数赋给一个变量，要么以其他方式使用函数表达式。

函数声明在幕后为你做了一些工作：它在创建函数的同时，还创建了一个用于创建函数引用的变量。函数表达式也创建函数，结果为一个引用，但如何使用它由你决定。

::: tip 总结
无论是使用函数声明还是函数表达式来定义函数，得到的都是指向这个函数的引用

函数声明不返回指向函数的引用；而是创建一个与函数同名的变量，并将指向函数的引用赋给它。

使用函数表达式时，你必须显式地将得到的引用赋给一个变量
:::

## 经典面试题

``` js
console.log(a) [1] // function a(){console.log(2)}
var a = function(){console.log(1)}; [2]
function a(){console.log(2)} [3]
console.log(a) [4] // function(){console.log(1)}
```

有上面的知识我们可以梳理一下这个流程，浏览器是怎么操作的？

+ 由于[1][2]不是函数声明所有跳过
+ [3]是函数声明，必须现对齐进行处理，在做其他事情
    - 将这个函数存储起来，以便能够在它被调用时获取它
    - 这个函数名为`a` 因此创建一个名为`a`的变量来存储指向这个函数的引用
+ 处理完所有函数声明后，浏览器回到代码开头，开始从头到尾顺序执行代码
    - 代码开头是个简单的输出 `a`, 而这个`a`在执行之前已被处理成一个指向函数的引用的变量，所以输出了`function a(){console.log(2)}`
    - 接下来，遇到另一个变量`a`,我来创建这个变量。在这条语句的右边，是一个函数表达式。我将这个函数存储起来，以便能够在其被调用时获取它。由于这是一个函数表达式， 我需要创建一个指向这个新函数的引用。现在，我只需将这个函数引用赋给变量`a` 即可
    - 因变量名相同，上一个变量值被下一个覆盖,[4]输出`function(){console.log(1)}`

<p class='tip'>
这里涉及到了js 是编译型(解释型)语言，变量提升（js引擎做的事情）
</p>

## 理解函数

####  函数声明为何不是表达式呢

函数声明是一条语句。可以认为它包含一条隐藏的赋值语句，这条语句将函数引用赋给一个变量。函数表达式不自动将函数引用赋给任何变量，你必须显式地这样

#### 向函数传递函数时，传递的到底是什么呢？

传递的是指向函数的引用。可将这种引用视为指针， 它指向函数本身的内部表示。引用本身可存储在变量中， 可赋给变量，还可作为实参传递给函数。另外，在函数引 用后面加上圆括号，将调用相应的函数。

 #### 函数的功能：
 
我能够返回值，我能够将你的代码伪装成匿名的，我能够实现闭包，我还与对象关系紧密。

#### 函数引用

指向函数的引用。你可以使用函数引用来调用函数，还可以将它们赋给变量、存储在对象中、传递给函数或从函数返回它们（就像对象引用一样）。