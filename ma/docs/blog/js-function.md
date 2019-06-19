---
title: 'javascript 函数的理解（一）'
description: '函数声明、函数表达式、高阶函数'
sidebar: 'auto'
time: '2019-02-27'
tags: 'javascript'
prev: './js-this-keyword'
next: './js-clourse'
---

::: tip 概念
函数是第一类对象（first-class objects），或者说它们被称作一等公民（first-class citizens）。函数与对象共存，函数也可以被视为其他任意类型的JavaScript对象。函数和那些更普通的JavaScript数据类型一样，它能被变量引用，能以字面量形式声明，甚至能被作为函数参数进行传递。<br />
对象能做的任何一件事，函数也都能做。函数也是对象，唯一的特殊之处在于它是可调用的（invokable），即函数会被调用以便执行某项动作。
:::

## 函数定义

+ 函数声明、函数表达式
+ 箭头函数
+ 函数构造函数
+ 生成器函数

## 函数声明、函数表达式两者存在细微的差别

+ 时机
    - 函数声明：创建的函数是在执行其他代码前定义的。
    - 函数表达式：是在运行阶段与其他代码一起执行的，因此在函数表达式所在的语句执行前，它创建的函数是未定义的。
+ 命名
    - 使用函数声明时，将创建一个与函数同名的变量，并让它指向函数。
    - 使用函数表达式时，通常不给函数指定名称，因此你要么在代码中将函数赋给一个变量，要么以其他方式使用函数表达式。
+ 幕后
    - 函数声明：它在创建函数的同时，还创建了一个用于创建函数引用的变量。
    - 函数表达式也创建函数，结果为一个引用，但如何使用它由你决定。

::: danger 总结
无论是使用函数声明还是函数表达式来定义函数，得到的都是指向这个函数的引用<br />
函数声明不返回指向函数的引用，而是创建一个与函数同名的变量，并将指向函数的引用赋给它。<br />
使用函数表达式时，你必须显式地将得到的引用赋给一个变量
:::

## 高级函数
满足条件：
+ 函数可以作为参数被传递
    - 回调函数
        + 异步请求
        ``` js
            // 当我们想在 ajax 请求返回之后做一些事情，但又并不知道请求返回的确切时间时，最常见的方案就是把 callback 函数当作参数传入发起 ajax 请求的方法中，待请求完成之后执行 callback 函数
            var getAjax = function(userid, callback){
                $.ajax('http://xxx?'+userid,function(data){
                    if(typeof callback === 'function'){
                        callback(data)
                    }
                })
            }
            getAjax(1234, function(data){
                alert(data.username)
            })
        ```
        + 逻辑代码分离, 委托
        ``` js
        // 我们想在页面中创建 100个 div 节点，然后把这些 div 节点都设置为隐藏
        var appendDiv = function(callback){
            for(var i = 0;i<100;i++){
                var div = document.createELement('div');
                div.innerHTML = i;
                document.body.appendChild(div);
                if(typeof callback === 'function'){
                    callback(div)
                }
            }
        } 
        appendDiv(function(node){
            node.style.display = 'none'
        })
        ```
    - Array.prototype.sort <br/>
    Array.prototype.sort 接受一个函数当作参数，这个函数里面封装了数组元素的排序规则。从 Array.prototype.sort 的使用可以看到，我们的目的是对数组进行排序，这是不变的部分；而使 用什么规则去排序，则是可变的部分。把可变的部分封装在函数参数里，动态传入 Array.prototype.sort，使 Array.prototype.sort 方法成为了一个非常灵活的方法
+ 函数可以作为返回值输出
    - 判断数据的类型 
    ``` js
    var isType = function(type){
        return function(obj){
            return Object.prototype.toString.call(obj) === '[object '+type+']'
        }
    }
    var isString = isType('String')
    isString([1,2,3]) // false

    var type = {}
    for(var i=0,type;type=['String', 'Array', 'Number'][i++];){
        (function(type){
            Type['is'+type] = function(obj){
                return Object.prototype.toString.call(obj) === '[object '+type+']';
            }
        })(type)
    }
    Type.isArray([]); // true
    ```
    - getSingle 单例模式
高阶函数的其他用法：
+ 高阶函数实现AOP面向切面编程 装饰者模式
AOP（面向切面编程）的主要作用是把一些跟核心业务逻辑模块无关的功能抽离出来，这些跟业务逻辑无关的功能通常包括日志统计、安全控制、异常处理等。把这些功能抽离出来之后， 再通过“动态织入”的方式掺入业务逻辑模块中。这样做的好处首先是可以保持业务逻辑模块的纯净和高内聚性，其次是可以很方便地复用日志统计等功能模块。 
``` js
// 输出1，2，3
Function.prototype.before = function(beforeFn){
    var _self = this; // 保存原函数的引用
    return function(){ //返回包含了原函数和新函数的代理函数
        before.apply(this, arguments); // 执行新函数，修正this
        retrun _self.apply(this,arguments); // 执行原函数
    }
}
Function.prototype.after = function(afterFn){
    var _self = this;
    return function(){
        var ret = _self.apply(this, arguments);
        afterIn.apply(this, arguments);
        return ret;
    }
}
var func = function(){console.log(2)}
func = func.beforeFn(function(){
    console.log(1)
}).after(function(){
    console.log(3)
})
func() // 1,2,3
```
+ currying 函数柯里化
currying 又称部分求值。一个 currying 的函数首先会接受一些参数，接受了这些参数之后， 该函数并不会立即求值，而是继续返回另外一个函数，刚才传入的参数在函数形成的闭包中被保 存起来。待到函数被真正需要求值的时候，之前传入的所有参数都会被一次性用于求值。 
+ uncurrying
+ 函数节流
+ 分时函数
+ 惰性加载函数


## 经典面试题

``` js
console.log(a) [1] // function a(){console.log(2)}
var a = function(){console.log(1)}; [2]
function a(){console.log(2)} [3]
console.log(a) [4] // function(){console.log(1)}
```

有上面的知识我们可以梳理一下这个流程，浏览器是怎么操作的？

+ 由于[1][2]不是函数声明所有跳过
+ [3]是函数声明，必须先对齐进行处理，在做其他事情
    - 浏览器创建相应的函数，将这个函数存储起来`就会创建一个与函数名一样的的变量来存储指向这个函数的引用`，以便能够在它被调用时获取它
    - 并将得到的函数引用赋给与函数同名的变量，这个函数名为`a` 因此创建一个名为`a`的变量来存储指向这个函数的引用
+ 处理完所有函数声明后，浏览器回到代码开头，开始从头到尾顺序执行代码
    - 代码开头是个简单的输出 `a`, 而这个`a`在执行之前已被处理成一个指向函数的引用的变量，所以输出了`function a(){console.log(2)}`
    - 接下来，遇到另一个变量`a`,我来创建这个变量。在这条语句的右边，是一个函数表达式。我将这个函数存储起来，以便能够在其被调用时获取它。由于这是一个函数表达式， 我需要创建一个指向这个新函数的引用。现在，我只需将这个函数引用赋给变量`a` 即可
    - 因变量名相同，上一个变量值被下一个覆盖,[4]输出`function(){console.log(1)}`

## 为什么this参数表示函数上下文

当调用函数时，除了显式提供的参数外，this参数也会默认地传递给函数。this参数是面向对象JavaScript编程的一个重要组成部分，代表函数调用相关联的对象。因此，通常称之为函数上下文。<br/>
函数上下文是来自面向对象语言（如Java）的一个概念。在这些语 言中，this通常指向定义当前方法的类的实例。 <br/>
在JavaScript中，将一个函数作 为方法（method）调用仅仅是函数调用的一种方式。事实上，this参数 的指向不仅是由定义函数的方式和位置决定的，同时还严重受到函数调 用方式的影响

## 参考

+ HEAD FIRST JAVASCRIPT：
+ js忍者秘籍：
+ js设计模式
