---
title: 了解call、apply、bind
description: ''
sidebar: 'auto'
time: '2019-06-13'
prev: ''
next: ''
---

ECAMScript3给Function的原型定义了两个方法，它们是`Function.prototype.call`和`Function. prototype.apply`

## 区别

作用一模一样，区别在于传入参数形式的不同
+ apply第一参数this，指定了函数体内this对象的指向；第二参数 数组或者类数组
+ apply第一参数this，指定了函数体内this对象的指向；第二参数 多个字符串

有时候我们使用 call 或者 apply 的目的不在于指定 this 指向，而是另有用途，比如借用其他对象的方法。那么我们可以传入 null 来代替某个具体的对象

``` js
Math.max.apply( null, [ 1, 2, 5, 3, 4 ] )    // 输出：5 
```

## 用途

### 改变this指向

``` js
var obj1 = { name: 'sven' }; 
 
var obj2 = { name: 'anne' }; 
 
window.name = 'window'; 
 
var getName = function(){     
    alert ( this.name ); 
}; 
 
getName();    // 输出: window 
getName.call( obj1 );    // 输出: sven 
getName.call( obj2 );    // 输出: anne 
```

当执行 getName.call( obj1 )这句代码时，getName 函数体内的 this 就指向 obj1 对象，所以此处的 
``` js
var getName = function(){ alert ( this.name ); };
var getName = function(){ alert ( obj1.name ); };
```

###  Function.prototype.bind 

大部分高级浏览器都实现了内置的Function.prototype.bind，用来指定函数内部的this指向， 即使没有原生的 Function.prototype.bind 实现，我们来模拟一个也不是难事，代码如下： 
``` js
Function.prototype.bind = function(context){
    var that = this;
    return function(){
        // 当执行新的函数的时候，会把之前传入的context当作新函数体内的this
        return that.apply(context, arguments)
    }
}
// 如下：
var obj = { name: 'sven' }; 
 
var func = function(){     
    alert ( this.name );    // 输出：sven 
}.bind( obj); 
 
func();
```

我们通过 Function.prototype.bind 来“包装”func 函数，并且传入一个对象 context 当作参数，这个 context 对象就是我们想修正的 this 对象。<br/>
在 Function.prototype.bind 的内部实现中，我们先把 func 函数的引用保存起来，然后返回一 个新的函数。当我们在将来执行 func 函数时，实际上先执行的是这个刚刚返回的新函数。在新 函数内部，that.apply( context, arguments )这句代码才是执行原来的 func 函数，并且指定 context 对象为 func 函数体内的 this

这是一个简化版的 Function.prototype.bind 实现，通常我们还会把它实现得稍微复杂一点， 使得可以往 func 函数中预先填入一些参数： 

``` js
Function.prototype.bind = function(){
    var that = this;
    var context = [].shift.call(arguments); // 获取需要绑定的this上下文，shift返回删除数组的第一个元素，会修改原数组
    var args = [].slice.call(arguments); // 剩余参数转为数组
    return function(){ // 返回一个新函数
        // 执行新的函数时候，会把之前传入的context当作新函数体内的this，并且组合两次分别传入的参数，作为新函数的参数
        return that.apply(context, [].concat.call(args, [].slice.call(arguments)));
    }
}
var obj = { name: 'sven' }; 
 
var func = function( a, b, c, d ){     
    alert ( this.name );        // 输出：sven     
    alert ( [ a, b, c, d ] )    // 输出：[ 1, 2, 3, 4 ] 
}.bind( obj, 1, 2 ); 
 
func( 3, 4 ); 
```

### 借用其他对象的方法 

实现继承：

``` js
var A = function( name ){     
    this.name = name; 
}; 
 
var B = function(){     
    A.apply( this, arguments ); 
}; 
 
B.prototype.getName = function(){    
    return this.name; 
}; 
 
var b = new B( 'sven' ); 
console.log( b.getName() );  // 输出： 'sven' 
```

借用方法

``` js
var a= {}
Array.prototype.push.call(a, 'first');

Math.max.apply(null, array)
```