---
title: 来呀 快活呀 反正有大把时光 了解一下this 关键字
description: '来呀 快活呀 反正有大把时光 了解一下this'
sidebar: 'auto'
time: '2019-06-14'
prev: ''
next: ''
---

## 规范

+ [MDN](//developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this)
  - 函数的 `this` 关键字在 JavaScript 中的表现略有不同，此外，在严格模式和非严格模式之间也会有一些差别
  - 在绝大多数情况下，函数的调用方式决定了`this`的值
  - this返回值 当前执行代码的环境对象

+ [ecma 文档](//www.ecma-international.org/ecma-262/6.0/#sec-this-keyword)
  - 是运行时语义 (this是运行时绑定的)
  - `this` 生来局部，而且一直都保持局部态
  - 箭头函数所改变的并非把 `this` 局部化，而是完全不把 `this` 绑定到里面去

+ [this关键字](//www.ecma-international.org/ecma-262/6.0/#sec-resolvethisbinding)：
  - 使用正在运行的执行上下文的词汇环境`lexicalenvironment`确定关键字this的绑定。

## 摘要
+ JavaScript的 `this` 总是指向一个对象，而具体指向哪个对象是在运行时基于函数的执行环境动态绑定的，而非函数被声明时的环境。 
+ this 的指向大致可以分为以下 4种
  - 作为对象的方法调用
  - 作为普通函数调用
  - 构造器调用
  - [Function.prototype.call 或 Function.prototype.apply 调用](./js-this-call-apply)


## 函数(`运行内\时`)上下文

在函数内部，`this`的值取决于函数被调用的方式

## this在函数调用中

当函数不作为对象的属性被调用时，也就是我们常说的普通函数方式，此时的 this 总是指向全局对象。在浏览器的`JavaScript`里，这个全局对象是`window`对象。 

::: tip 注意
内部函数的上下文仅取决于调用，而不取决于外部函数的上下文
:::

``` js
window.name = 'globalName'; 
 
var getName = function(){     
  return this.name; 
}; 
console.log( getName() );    // 输出：globalName 
或者： 
window.name = 'globalName'; 
 
var myObject = {     
  name: 'sven',     
  getName: function(){         
    return this.name;     
  } 
}; 
var getName = myObject.getName; 
console.log( getName() );    // globalName
```
有时候我们会遇到一些困扰，比如在 div 节点的事件函数内部，有一个局部的 callback 方法， callback 被作为普通函数调用时，callback 内部的 this 指向了 window，但我们往往是想让它指向 该 div 节点，见如下代码： 
``` js
<html>     
<body>         
<div id="div1">我是一个 div</div>     
</body>     
<script> 
 window.id = 'window'; 
 document.getElementById( 'div1' ).onclick = function(){
    alert ( this.id );        // 输出：'div1'         
    var callback = function(){             
      alert ( this.id );        // 输出：'window'         
    }         
    callback();     
};
  </script> 
</html> 
```

此时有一种简单的解决方案，可以用一个变量保存 div 节点的引用： 

``` js
document.getElementById( 'div1' ).onclick = function(){     
  var that = this;    // 保存 div 的引用     
  var callback = function(){         
    alert ( that.id );    // 输出：'div1'     
  }     
  callback(); 
};
```

## 作为对象方法调用

在 JavaScript 中，函数也是对象，因此函数可以作为一个对象的属性，此时该函数被称为该对象的方法，在使用这种调用方式时，this被自然绑定到该对象。

::: tip
理解函数调用和方法调用之间的区别有助于正确识别上下文。
:::

``` js
['Hello', 'World'].join(', '); // method invocation
({ ten: function() { return 10; } }).ten(); // method invocation
var obj = {};  
obj.myFunction = function() {  
  return new Date().toString();
};
obj.myFunction(); // method invocation

var otherFunction = obj.myFunction;  
otherFunction();     // function invocation  
parseFloat('16.60'); // function invocation  
isNaN(0);            // function invocation  
```

JavaScript对象从其继承方法prototype。在对象上调用继承的方法时，调用的上下文仍然是对象本身：

``` js
var myDog = Object.create({  
  sayName: function() {
     console.log(this === myDog); // => true
     return this.name;
  }
});
myDog.name = 'Milo';  
// method invocation. this is myDog
myDog.sayName(); // => 'Milo'  

```

Object.create()创建一个新对象myDog并设置原型。myDog对象继承sayName方法。何时myDog.sayName()执行，myDog是调用的上下文。

在ECMAScript 6 class语法中，方法调用上下文也是实例本身;

## 构造函数调用

普通函数跟构造函数区别在于被调用的方式。当时用new运算符调用函数时，该函数总返回一个对象，通常情况下，构造器里的`this`指向返回的这个对象

``` js
var MyClass = function(){     
  this.name = 'sven'; 
}; 
 
var obj = new MyClass(); 
alert ( obj.name );     // 输出：sven 
```

如果构造器显示式地返回了一个 object 类型的对象，那么此次运算结果终会返回这个对象，而不是我们之前期待的 this

``` js
var MyClass = function(){     
  this.name = 'sven';     
  return {    // 显式地返回一个对象         
  name: 'anne'     
  } 
}; 
 
var obj = new MyClass(); 
alert ( obj.name );     // 输出：anne
```

如果构造器不显式地返回任何数据，或者是返回一个非对象类型的数据，就不会造成上述问题： 
``` js
var MyClass = function(){    
  this.name = 'sven'    
  return 'anne';    // 返回 string 类型 
}; 
 
var obj = new MyClass(); 
alert ( obj.name );     // 输出：sve
```

## Function.prototype.call 或 Function.prototype.apply 或 Function.prototype.bind 调用 

跟普通的函数调用相比，用 Function.prototype.call 或 Function.prototype.apply 可以动态地改变传入函数的 this

``` js
var rabbit = { name: 'White Rabbit' };  
function concatName(string) {  
  console.log(this === rabbit); // => true
  return string + this.name;
}
// Indirect invocations
concatName.call(rabbit, 'Hello ');  // => 'Hello White Rabbit'  
concatName.apply(rabbit, ['Bye ']); // => 'Bye White Rabbit'  
```

### bind()

.bind()的作用是创建一个新函数，调用时其 `上下文` 为传递给.bind()的第一个参数。它是一种强大的技术，允许创建具有预定义的这个值的函数。

``` js
var numbers = {  
  array: [3, 5, 10],
  getNumbers: function() {
    return this.array;    
  }
};
// Create a bound function
var boundGetNumbers = numbers.getNumbers.bind(numbers);  
boundGetNumbers(); // => [3, 5, 10]  
numbers.getNumbers() // => [3, 5, 10]  
// Extract method from object
var simpleGetNumbers = numbers.getNumbers;  
simpleGetNumbers(); // => undefined or throws an error in strict mode 
```

`numbers.getNumbers.bind(numbers)` 返回一个以`numbers`对象为上下文的`boundGetNumbers`新函数,
然后调用`boundGetNumbers()`该函数的`this`指向`numbers`对象,并返回正确的数组对象。
将`numbers.getNumbers`提取到`simpleGetNumbers`变量中而不进行绑定。
对后来的调用`simpleGetNumbers()`具有`this`作为`window或undefined`在严格模式，而不是`numbers对象`，
在这种情况下，`simpleGetNumbers()`将无法正确返回数组。

#### bind() 紧密绑定上下文

.bind()建立一个永久的上下文链接，并始终保持它。在使用call、apply、bind改变上下文是不起作用的。<br />
只有绑定函数的构造函数调用才能改变它，但这不是推荐的方法（对于构造函数调用，使用普通函数，而不是绑定函数）。

``` js
function getThis() {  
  'use strict';
  return this;
}
var one = getThis.bind(1);  
// Bound function invocation
one(); // => 1  
// Use bound function with .apply() and .call()
one.call(2);  // => 1  
one.apply(2); // => 1  
// Bind again
one.bind(2)(); // => 1  
// Call the bound function as a constructor
new one(); // => Object  
```

### 箭头函数

函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。<br />
this指向的固定化,导致内部的this就是外层代码块的this<br />
this绑定以后，不可做修改<br />
~~对象方法不可以使用箭头函数~~<br />

看点例子1：

```js
const cat = {
  lives: 9,
  jumps: () => {
    return this; // window
  }
}
```
~~这是因为对象不构成单独的作用域，导致箭头函数定义时的作用域就是全局作用域。~~

定义时 `cat` 没有运行，所以 this 指向全局环境。

看点例子2：

``` js
function foo(){
  setTimeout(() => {
    console.log("id:", this.id)
  }, 100);
}
foo.call({id:42});
```
这个例子中，箭头函数位于foo函数内部。只有foo函数运行后，它才会按照定义生成，所以**foo运行时所在的对象，恰好是箭头函数定义时所在的对象**。

看点例子3：

``` js
function foo() {
   return () => {
      return () => {
         return () => {
            console.log("id:", this.id);
         };
      };
   };
}

foo.call( { id: 42 } )()()();
```
这些内嵌的函数都没有声明它们自己的 `this`，所以 `this.id` 的引用会简单地顺着作用域链查找，一直查到 `foo()` 函数，它是第一处能找到一个确切存在的 `this` 的地方。

换句话说，`this` 生来局部，而且一直都保持局部态。箭头函数并不会绑定一个 `this` 变量，它的作用域会如同寻常所做的一样一层层地去往上查找。

``` js
function foo() {
  return () => {
    return () => {
      return () => {
        console.log("id:", this.id);
      };
    };
  };
}

var f = foo.call({id: 1});

var t1 = f.call({id: 2})()(); // 1
var t2 = f().call({id: 3})(); // 1
var t3 = f()().call({id: 4}); // 1
```
this对象的指向是可变的，但是在箭头函数中，它是固定的。


::: warning 换个角度理解(非箭头函数)
[在这篇文章里](//yehudakatz.com/2011/08/10/understanding-javascript-function-invocation-and-this/)，Yehuda Katz 将 apply 或 call 方式作为函数调用的基本方式，其他几种方式都是在这一基础上的演变，或称之为语法糖。Yehuda Katz 强调了函数调用时 this 绑定的过程，不管函数以何种方式调用，均需完成这一绑定过程，不同的是，作为函数调用时，this 绑定到全局对象；作为方法调用时，this 绑定到该方法所属的对象。
:::

## 总结

+ `this` 无论如何都是局部的
+ 由于其运行期绑定的特性，JavaScript 中的 this 含义要丰富得多，它可以是全局对象、当前对象或者任意对象，这完全取决于`函数的调用方式`。

+ 箭头函数
  - 箭头函数的`this`是定义时绑定的
  - 箭头函数所改变的并非把 `this` 局部化，而是完全不把 `this` 绑定到里面去
  - 箭头函数没有一个自己的 `this`，但当你在内部使用了 `this`，常规的局部作用域准则就起作用了，它会指向最近一层作用域内的 `this`。

+ 非箭头函数
  - this是运行时绑定的

## 丢失的this
这是一个经常遇到的问题，我们先看下面的代码
``` js
var obj = {     
  myName: 'sven',     
  getName: function(){         
    return this.myName;     
  } 
}; 
 
console.log( obj.getName() );    // 输出：'sven' 
 
var getName2 = obj.getName; 
console.log( getName2() );    // 输出：undefined 
```
当调用 obj.getName 时，getName 方法是作为 obj 对象的属性被调用的，根据提到的规律，此时的 this 指向 obj 对象，所以 obj.getName()输出'sven'

当用另外一个变量 getName2 来引用 obj.getName，并且调用 getName2 时，根据提到的规律，此时是普通函数调用方式，this 是指向全局 window 的，所以程序的执行结果是 undefined

再看另一个例子，document.getElementById 这个方法名实在有点过长，我们大概尝试过用一 个短的函数来代替它

``` js
var getId = function( id ){     
  return document.getElementById( id ); 
}; 
 
getId( 'div1' );
```
我们也许思考过为什么不能用下面这种更简单的方式： 
``` js
var getId = document.getElementById;  
getId( 'div1' ); 
```
这段代码抛出了一个异常。这是因为许多 引擎的 document.getElementById 方法的内部实现中需要用到 this。这个 this 本来被期望指向 document，当 getElementById 方法作为 document 对象的属性被调用时，方法内部的 this 确实是指 向 document 的。<br/>
但当用 getId 来引用 document.getElementById 之后，再调用 getId，此时就成了普通函数调用， 函数内部的 this 指向了 window，而不是原来的 document

我们可以尝试利用 apply 把 document 当作 this 传入 getId 函数，帮助“修正”this
``` js
document.getElementById = (function( func ){     
  return function(){         
    return func.apply( document, arguments );     
  } 
})( document.getElementById ); 
 
var getId = document.getElementById; 
var div = getId( 'div1' ); 
 
alert (div.id);    // 输出： div1 
```

## 参考资料

+ [dmitripavlutin.com](//dmitripavlutin.com/gentle-explanation-of-this-in-javascript/)
+ [ibm.com](//www.ibm.com/developerworks/cn/web/1207_wangqf_jsthis/index.html)
+ [javascriptweblog.com](//javascriptweblog.wordpress.com/2010/08/30/understanding-javascripts-this/)
+ [yehudakatz.com](//yehudakatz.com/2011/08/10/understanding-javascript-function-invocation-and-this/)

![bind-3](../.vuepress/public/assets/img/bind-3.jpg)