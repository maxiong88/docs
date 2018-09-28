---
title: let会被提升吗
description: 'let会被提升吗'
sidebar: 'auto'
time: '2015-01-08'
prev: ''
next: './js-variable-lift'
---

In JavaScript, all binding declarations are instantiated when control flow enters the scope in which they appear. Legacy var and function declarations allow access to those bindings before the actual declaration, with a "value" of undefined. That legacy behavior is known as "hoisting". let and const binding declarations are also instantiated when control flow enters the scope in which they appear, with access prevented until the actual declaration is reached; this is called the Temporal Dead Zone. The TDZ exists to prevent the sort of bugs that legacy hoisting can create.



let 声明一个块级作用域的本地变量
``` bash
function varTest() {
  var x = 1; // 同样的变量!
  if (true) {
    var x = 2;  // 同样的变量!
    console.log(x);  // 2
  }
  console.log(x);  // 2
}

function letTest() {
  let x = 1; // 不同的变量
  if (true) {
    let x = 2;  // 不同的变量
    console.log(x);  // 2
  }
  console.log(x);  // 1
}
```

let 重复定义一个变量将引起 TypeError
``` bash
if (x) {
  let foo;
  let foo; // TypeError thrown.
}
```

let  声明不会被提升到当前执行上下文的顶部
``` bash
function do_something() {
  console.log(bar); // undefined
  console.log(foo); // ReferenceError: foo is not defined
  var bar = 1;
  let foo = 2;
}
```





## 提升

提升是将变量或函数，虚拟移动到当前作用域开头的过程，通常用于变量语句var和函数声明function fun() {...}。


### 容易出错的 var 提升

以前（现在）我会在当前作用域范围内的任何地方看到变量var varname和函数function funName() {...}声明的奇怪做法：

``` js
// var hoisting
num;     // => undefined  
var num;  
num = 10;  
num;     // => 10  
// function hoisting
getPi;   // => function getPi() {...}  
getPi(); // => 3.14  
function getPi() {  
  return 3.14;
}

```

num在声明之前访问该变量var num，因此将其计算为undefined。
该函数function getPi() {...}在文件末尾定义。但是，该函数可以在声明之前调用getPi()，因为它被提升到范围的顶部。

这是经典的变量提升 Hoisting


### 在底层：变量生命周期


当引擎（V8）使用变量时，它们的生命周期包括以下阶段：
声明阶段正在范围内注册变量。
初始化阶段是分配内存并为范围中的变量创建绑定。在此步骤中，变量将自动初始化为undefined。
赋值阶段是为初始化变量赋值。

当变量通过声明阶段时，它具有单一化状态 undefined，但未达到初始化。

![var-1](../.vuepress/public/assets/img/variable-1.jpg)

请注意，就变量生命周期而言，声明阶段是一般与变量声明不同的术语。
简而言之，引擎在3个阶段处理变量声明：声明阶段，初始化阶段和分配阶段。


### var 的变量生命周期

让我们来看一下引擎是如何处理var变量的：

![var-2](../.vuepress/public/assets/img/variable-2.jpg)


``` js
function multiplyByTen(number) {  
  console.log(ten); // => undefined
  var ten;
  ten = 10;
  console.log(ten); // => 10
  return number * ten;
}
multiplyByTen(4); // => 40  
```

当JavaScript开始执行multipleByTen(4)并进入函数作用域时，变量ten在第一个语句之前传递声明和初始化步骤。
因此，当console.log(ten)记录它时undefined。
该语句ten = 10指定初始值。分配后，该行console.log(ten)正确记录10值。

### Function 的变量生命周期

声明、初始化和分配阶段在封闭函数范围的开头（仅一步骤）同时发生。
funName()可以在范围的任何位置调用，而不取决于声明语句的位置（甚至可以在末尾）。

![var-3](../.vuepress/public/assets/img/variable-3.jpg)

``` js
function sumArray(array) {  
  return array.reduce(sum);
  function sum(a, b) {
    return a + b;
  }
}
sumArray([5, 10, 8]); // => 23  
```

当JavaScript执行时sumArray([5, 10, 8])，它进入sumArray函数范围。
在此范围内，在任何语句执行之前，sum通过所有3个阶段：声明，初始化和赋值。
这种方式甚至array.reduce(sum)可以sum在其声明声明之前使用function sum(a, b) {...}。

### let 变量生命周期

let变量的处理方式不同于var。主要区别在于声明和初始化阶段是分开的。

![var-4](../.vuepress/public/assets/img/variable-4.jpg)

``` js
let condition = true;  
if (condition) {  
  // console.log(number); // => Throws ReferenceError
  let number;
  console.log(number); // => undefined
  number = 5;
  console.log(number); // => 5
}
```

当JavaScript进入if (condition) {...}块范围时，number立即通过声明阶段。
因为number未初始化状态并且处于暂时死区，所以尝试访问变量会抛出ReferenceError: number is not defined。
稍后该语句let number进行初始化。现在可以访问变量，但它的值是undefined。
赋值语句number = 5当然是分配阶段。

const和class类型具有相同的生命周期let，除了赋值只能发生一次。



在 js种所有的声明`var`，`let`，`const`，`function`，`function*`，`class` 都存在提升 hoisted

var/ function/ function*声明和let/ const/ class声明之间的区别是初始化

在作用域顶部创建绑定时，
前者（var/ function/ function*）使用undefined或者（生成器）函数初始化。
然而，词汇声明（let/ const/ class）的变量保持未初始化。
这意味着ReferenceError（引用错误）当您尝试访问它时会引发异常
只有在评估let/ const/ class语句时，才会初始化它，
之前（上面）的所有内容称为时间死区。









## 结论

使用 var 声明变量容易出错
let 使用改进的算法来声明变量，还有块作用域。
由于let声明和初始化阶段是分离的，因此提升对let变量无效（包括const和class）。
在初始化之前，变量处于临时死区(TDZ)并且不可访问。

[https://dmitripavlutin.com/variables-lifecycle-and-why-let-is-not-hoisted/](https://dmitripavlutin.com/variables-lifecycle-and-why-let-is-not-hoisted/)