---
title: '[转]JavaScript中的执行上下文和堆栈是什么？'
description: '了解解释器尝试做什么，为什么在声明它们之前可以使用某些函数/变量以及它们的值是如何确定的'
sidebar: 'auto'
time: ''
prev: ''
next: ''
---

## 什么是执行上下文

当代码在JavaScript中运行时，执行它的环境非常重要，有：
+ 全局环境 首次执行代码的默认环境
+ 局部环境 每当执行流程进入函数体时
+ eval环境 要在内部eval函数内执行的文本

我们可以把`execution content`执行上下文看作为作用域。

我们举例说明

``` js
// global context 全局上下文（全局作用域）
var sayhello = 'hello'
function persion(){
    // execution context 函数上下文（局部作用域）
    var first = 'df'
    var last = 'ed'
    function firstname(){
        // execution context 函数上下文（局部作用域）
        return first
    }
    function lastname(){
        // execution context 函数上下文（局部作用域）
        return last
    }
    alert(sayhello + firstname() +' '+lastname())
}
```

没有特别之处，一个`global context` 三个`function context`，`global context`可以访问程序中的任何位置

你可以拥有任意数量的`function context`，并且每个函数调用都会创建一个新的上下文，从而创建一个私有作用域，其中无法从当前函数作用域外直接访问函数内部声明的任何内容。

在上面示例中，函数可以访问自己上下文之外声明的变量，但外部上下文无法访问在函数中声明的变量/函数。为什么会这样？

## 执行上下文堆栈

浏览器中js解析器是单线程，这实际意味着在浏览器中一次只能发生一件事，其他动作或事件在所谓的"排队"中排队`execution stack`

![堆栈插入顺序](../.vuepress/public/assets/img/ecstack.jpg)

绿色是插入，红色是弹出

这个堆栈是后进先出（顶部的函数完成执行当前操作，它将从堆栈顶部弹出），最后控制权返回到当前堆栈中`global context`

``` js
(function foo(i){
    if(i === 3){
        return ;
    } else {
        foo(++i);
    }
}(0))

```

![示例演示](../.vuepress/public/assets/img/es1.gif)

代码简单地调用自身3次，将i的值递增1.每次foo调用函数时，都会创建一个新的执行上下文。一旦上下文完成执行，它将弹出堆栈并且控制返回到它下面的上下文，直到`global context`再次到达。

关于以下内容需要记住以下5个要点`execution stack`：
+ 单线程
+ 同步执行
+ 一个全局作用域(上下文)
+ 无限的函数上下文。
+ 每个函数调用都会创建一个新的`execution context`，甚至是对自身的调用。

## 详细执行上下文

所以我们现在知道，每次调用函数时，都会创建一个新的执行上下文。

但是，在JavaScript解释器中，对执行上下文的每个调用都有两个阶段：

+ Creation Stage[调用函数时，但在执行任何代码之前] 创建阶段
    - 创建作用域链
    - 创建变量，函数，参数
    - 确定this
+ Activation / Code Execution Stage  激活/执行阶段：
    - 为函数赋值、引用和解释/执行代码

可以将每个`execution context`概念上表示为具有3个属性的对象：

``` js
executionContextObj = {
    'scopeChain': { /* variableObject + all parent execution context's variableObject */ },
    'variableObject': { /* function arguments / parameters, inner variable and function declarations 函数参数、内部变量和函数声明 */ },
    'this': {}
}
```

## AO VO

此ExecutionContextObj是在调用函数时，但在实际函数执行之前创建的。这就是所谓的第一阶段，`Creation Stage(创造阶段)`。在这里，解释器通过扫描函数中传递的参数或参数、局部函数声明和局部变量声明来创建ExecutionContextObj。此扫描的结果将成为ExecutionContextObj中的`variableObject(可变对象)`。

下面是解释程序如何评估代码的伪概述
+ 找一些代码来调用一个函数
+ 在执行`function`代码之前，创建`execution context`
+ 进入创建阶段：
    - 初始化`Scope Chain`
    - 创建`variable object(变量对象)` 
        + 创建`arguments object(类数组对象)`，检查参数的上下文，初始化名称和值并创建引用副本
        + 扫描上下文以获取函数声明：
            - 找到的每个函数声明，在`variable object`创建一个属性名为函数名的属性，这个属性值指函数的引用指针
            - 如果属性名存在，则将覆盖引用指针的值
        + 扫描上下文以获取变量声明：
            - 找到的每个变量声明，在`variable object`创建一个属性名为变量名称的属性，赋值`undefined`
            - 如果属性名已存在，跳过继续执行
    - 确定`this`
+ 激活/执行阶段：
    - 在上下文中运行/解释函数代码，并在代码逐行执行时分配变量值。

``` js
function foo(i) {
    var a = 'hello';
    var b = function privateB() {

    };
    function c() {

    }
}

foo(22);

// 在调用foo(22), creation stage 外观如下
fooExecutionContext = {
    scopeChain: { ... },
    variableObject: {
        arguments: {
            0: 22,
            length: 1
        },
        i: 22,
        c: pointer to function c()
        a: undefined,
        b: undefined
    },
    this: { ... }
}
// 如您所见，`creation stage`创建阶段处理定义属性的名称，没有给它们赋值，形式参数除外。
// 一旦创作阶段结束，执行流进入函数，函数完成执行后，激活/代码执行阶段如下：
fooExecutionContext = {
    scopeChain: { ... },
    variableObject: {
        arguments: {
            0: 22,
            length: 1
        },
        i: 22,
        c: pointer to function c()
        a: 'hello',
        b: pointer to function privateB()
    },
    this: { ... }
}
```

## 关于变量提升的问题

变量和函数声明被提升到作用域的顶部

但是，没有人详细解释为什么会发生这种情况，掌握了关于解释器如何创建`activation object 执行对象`的新知识，很容易理解为什么。请使用以下代码示例：

``` js
​(function() {

    console.log(typeof foo); // function pointer
    console.log(typeof bar); // undefined

    var foo = 'hello',
        bar = function() {
            return 'world';
        };

    function foo() {
        return 'hello';
    }

}());​
```

我们现在可以回答的问题是：

+ 为什么我们可以在声明它之前访问foo？
    - 如果我们遵循创建阶段`creation stage`，我们知道在执行阶段之前已经创建了变量。因此，当函数流开始执行时，已经在执行对象`activation object`中定义了foo。

+ `Foo`被声明了两次，为什么`foo`显示是 `function` 和不是 `undefined` 或 `string`？
    - 尽管`foo`声明了两次，但我们从创建阶段`creation stage`就知道函数是在变量执行对象之前创建的，并且如果执行对象上已经存在属性名，我们只需绕过声明。
    - 因此，首先在执行对象上创建对函数`foo（）`的引用，当解释器到达`var foo`时，我们已经看到属性名`foo`存在，因此代码不执行任何操作并继续执行。

+ 为什么`bar` 是 `undefined`
    - `bar`实际上是一个具有函数赋值的变量，我们知道变量是在创建阶段`creation stage`创建的，但是它们是用`undefined`值来初始化