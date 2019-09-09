---
title: "I DON'T KNOW JAVASCRIPT -- 闭包"
description: '直到有人向我解释这样......'
sidebar: 'auto'
time: '2019-02-28'
tags: 'javascript'
prev: './js-function'
next: ''
---

+ js王者归来
+ HEAD FIRST JAVASCRIPT：
+ [摘自](//medium.com/launch-school/javascript-weekly-all-about-scope-14f79dabbe16)

## 作用域

可以帮助我们保持代码的清洁，有效和可读性

规则定义了限制各个代码段之间如何相互作用的边界。

## 作用域范围--词法作用域

意味着通过阅读代码就能确定变量的作用域。

#### 词法作用域决定了变量是在哪里定义的

指的是JavaScript的作用域规则完全基于代码的结构，而不是一些动态的运行阶段属性。<br />
这意味着只需查看代码的结构，就能确定变量是在什么地方定义的。<br />
另外别忘了，在JavaScript中，只有函数会引入新的作用域。<br />
因此，对于在函数中引用的变量，要确定它是在哪里定义的，可从最里面（当前函数）开始依次向最外面进行查找，直到找到它为止。<br />
如果在这些函数中都找不到它，则它要么是全局的，要么未定义。 <br />

#### 在函数被嵌套很多层的情况下，环境的工作原理是什么呢？ 

在 JavaScript中，函数可以用来创造函数作用域。此时的函数像一层单向透视玻璃贴膜，在函数里面可以看到外面的变量，而在函数外面则无法看到函数里面的变量。这是因为当在函数中搜索一个变量的时候，如果该函数内并没有声明这个变量，那么此次搜索的过程会随着代码执行环境创建的作用域链往外层逐层搜索，一直搜索到全局对象为止。变量的搜索是从内到外而非从外到内的

::: tip 别忘了
JavaScript函数都是在定义它的环境中执行的。在函数中，要确定变量来自何方，可按从内到外的顺序依次在包含它的函数中搜索。

这意味着函数使用的作用域是函数定义的作用域，而不是函数调用的作用域
:::




## 闭包

### 概念

闭包的形成与变量的作用域以及变量的生存周期密切相关

闭包指的是函数及其引用的环境。(闭包内的变量值由引用的环境决定)



函数每次执行，都会创建一个称为执行上下文的内部对象（即：函数作用域）,这个对象会保存这个函数中所有变量和函数内部定义的函数的引用 <br/>
函数每次执行时对应的执行上下文都是独一无二的，正常情况下函数执行完毕执行上下文就会被销毁。


### 定义

+ 闭包是js的一个特性，其中内部函数可以访问外部函数的变量 - 由此形成了---作用域链<br>
	- 作用域链功能
		+ 访问自己的作用域
		+ 访问外部函数的变量和参数
		+ 访问全局变量
+ 闭包就是一个内部函数。
	- 那什么是内部函数呢？它是在一个函数内部的函数
	- 在闭包内声明的变量，闭包外的任何环境中都无法访问，除非闭包向外部环境提供了访问他们的接口

``` js
var globalVar  = 'xyz';
function outerFunc(outerArg){
	var outerVar = 'Alex'
	function innerFunc(innerArg){
		var innerVar = 'Chris'
		console.log('globalVar ='+ globalVar);
		console.log('outerArg ='+ outerArg);
		console.log('innerArg ='+ innerArg);
		console.log('outerVar ='+ outerVar);
		console.log('innerVar ='+ innerVar);
	}
	innerFunc(456)
}
outerFunc(123)
```
内部函数`innerFunc(456)`，我们可以访问
+ 他自己的作用域范围	(innerVar、innerArg)
+ 外部函数`outerFunc`中的(outerVar、outerArg)
+ 全局变量(globalVar)

::: tip
当一个函数执行并遇到一个变量时，它首先在自己的范围内查找它，如果找不到，它会在外部函数的范围内搜索，最后在全局范围内搜索。
:::



### 事实说话

``` js
function outer(){
	function inner(){

	}
}
```
这就是闭包，函数inner称为闭包函数。闭包如此强大的原因在于它对作用域链(或作用域层级)的访问。

闭包有3个作用域层级：
1，在它自身声明之内声明的变量
	``` js
	function outer(){
		function inner(){
			let a = 5;
			console.log(a)
		}
		inner();
	}
	// 输出5，闭包函数可以访问所有在其声明内部声明的变量
	```
2，对全局变量的访问
	``` js
	let global = 'global';
	function outer(){
		function inner(){
			let a = 5;
			console.log(global)
		}
		inner();
	}
	// 输出global，闭包能访问全局变量
	```
3，对外部函数变量的访问
	``` js
	let global = 'global';
	function outer(){
		let outer = 'outer';
		function inner(){
			let a = 5;
			console.log(outer)
		}
		inner();
	}
	// 输出outer，闭包能访问外部函数的变量。此处外部函数的含义是包裹闭包函数的函数
	```	
### 闭包与内存管理

使用闭包的同时比较容易形成循环引用，循环引用会带来内存泄漏，我们可以把变量设为null即可

### 作用

1，延续局部变量的寿命 

数据上报
``` js
var report = function( src ){     
	var img = new Image();     
	img.src = src; 
}; 
 
report( 'http://xxx.com/getUserInfo' );  
```

但是通过查询后台的记录我们得知，因为一些低版本浏览器的实现存在 bug，在这些浏览器 下使用 report 函数进行数据上报会丢失 30%左右的数据，也就是说，report 函数并不是每一次 都成功发起了 HTTP请求。丢失数据的原因是 img 是 report 函数中的局部变量，当 report 函数的 调用结束后，img 局部变量随即被销毁，而此时或许还没来得及发出 HTTP请求，所以此次请求 就会丢失掉。 

现在我们把 img 变量用闭包封闭起来，便能解决请求丢失的问题： 
``` js
 var report = (function(){     
	var imgs = [];     
	return function( src ){         
		var img = new Image();         
		imgs.push( img );         
		img.src = src;     
	} 
})(); 
```

2，封装变量


### 实例

``` js
var fn = arg => {
	let outer = 'v'
	let innerFn = () => {
		console.log(outer)
		console.log(arg)
	}
	return innerFn;
}

var closureFn = fn(5) [1]
closureFn(); [2]
// 输出 v， 5
```

innerFn 对于 fn 来说是一个闭包函数，并且 fn 被调用时返回了 innerFn。

控制台为啥打印出 v 5，背后发生了什么？分析

+ [1]被调用时，返回 innerFn
+ 当innerFn被返回时，js执行引擎视innerFn为一个闭包，并相应地设置了它的作用域。当closureFn通过作用域链被调用时就记住了 arg outer 的值
	- 当它被创建的时候记住它的上下文的（作用域，也就是outer arg）
+ 我们最后调用closureFn










什么是作用域链

``` html
<html>
	<script>
		function b(){
			console.log(myVar)
		}
		function a(){
			var myVar = 2;
			b()
		}
		var myVar = 1;
		a(); // 1
		// 为什么？ 函数b会查找自己作用域内的变量但是没有找到，因此他查找它的父作用域，在这种情况下，myVar = 1 全局作用域

		function a(){
			var myVAr = 2;
			function b(){
				console.log(myVar)
			}
			b();
		}
		var myVar = 1;
		a(); //2
		// 为什么？ 函数b会查找自己作用域内的变量但是没有找到，因此他查找它的父作用域(a)，在这种情况下，myVar = 2
		
	</script>
</html>
```

所以这种从函数范围到父范围的引用，最后在全局范围内，如果有的话，从内到外都称为作用域链。


[https://medium.com/hackernoon/execution-context-in-javascript-319dd72e8e2c](https://medium.com/hackernoon/execution-context-in-javascript-319dd72e8e2c)

::: tip 
我们将讨论JavaScript中的执行上下文(execution context)和作用域链(scope chain)。
我们还将逐步检查JavaScript的内部工作(internal working)。
理解这些概念不仅有助于理解JavaScript内部，还有助于理解变量提升(like hoisting)和闭包(closure)等其他概念
:::

+ 执行上下文 EC : 定义为执行js代码的环境。通过环境我们可以在特定时间访问this、变量、对象、函数
	- 全局执行上下文 GEC : js引擎单线程，js代码执行只有一个全局环境
	- 函数执行上下文 FEC : js引擎在查找任何函数调用时创建的上下文。每个函数都有自己的执行上下文。它可以不止一个。功能执行上下文可以访问全局执行上下文的所有代码，反之亦然。在执行全局执行上下文代码时，如果JS引擎找到函数调用，它将为该函数创建新的函数执行上下文
	- Eval eval函数内部的执行上下文

+ 执行上下文堆栈（ECS）：执行上下文堆栈是堆栈数据结构，即后进先出数据结构，用于存储在脚本生命周期中创建的所有执行堆栈。默认情况下，全局执行上下文存在于执行上下文堆栈中，它位于堆栈的底部。在执行全局执行上下文代码时，如果JS引擎找到函数调用，它会为该函数创建一个函数执行上下文，并将其推送到执行上下文堆栈之上。JS引擎执行其执行上下文位于执行上下文堆栈顶部的函数。一旦执行了函数的所有代码，JS引擎就会弹出该函数的执行上下文并开始执行它下面的函数。


js引擎如何处理执行上下文

``` js
var a = 10;
function functionA() {
	console.log("Start function A");
	function functionB(){
		console.log("In function B");
	}
	functionB();
}
functionA();
console.log("GlobalContext");
// Start function A
// In function B
// GlobalContext
```
一旦上面的代码加载到浏览器中，JS引擎就会在执行上下文堆栈中推送全局执行上下文。

当`functionA`从全局执行上下文调用时，JS引擎`functionA`在执行上下文堆栈中推送执行上下文并开始执行`functionA`。

当`functionB`从调用`functionA`的执行上下文，JS发动机推动`functionB`在执行上下文堆栈执行上下文。一旦`functionB`执行完所有代码，JS引擎就会弹出`functionB`执行上下文。

在此之后，当`functionA`执行上下文位于执行上下文堆栈之上时，JS引擎开始执行剩余的代码`functionA`。

一旦`functionA`执行了所有代码，JS引擎就会`functionA`从执行上下文堆栈中弹出执行上下文，并开始从全局执行上下文中执行剩余的代码。

当所有代码都被执行时，JS引擎会弹出全局执行上下文并结束JavaScript的执行。


如何创建执行上下文?

JavaScript引擎在以下两个阶段中创建执行上下文：
+ 创作阶段 : JS引擎调用函数但其执行尚未开始的阶段。在创建阶段，JS引擎处于编译阶段，它只扫描功能代码以编译代码，它不执行任何代码。
	- 在创建阶段，JS引擎执行以下任务：
		+ 创建Activation对象或Variable对象：Activation对象是JS中的一个特殊对象，它包含所有变量，函数参数和内部函数声明信息。由于激活对象是一个特殊对象，因此它没有该属性
		+ 创建作用域链：一旦创建了Activation对象，JS引擎就会初始化作用域链，作为当前函数所在的所有变量对象的列表。这还包括全局执行上下文的变量对象。范围链还包含当前函数变量对象。
		+ 确定this： 在作用域链之后，JavaScript引擎初始化值this
让我们通过一个例子来理解JavaScript引擎如何创建激活对象
	``` js
function funA (a, b) {
  var c = 3;
  
  var d = 2;
  
  d = function() {
    return a - b;
  }
}


funA(3, 2);
	```	

只是之后funA被调用并执行代码的之前funA开始，JS引擎创建一个executonContextObj为funA如下所示，其可以被表示：
executionContextObj = {
 variableObject: {}, // All the variable, arguments and inner function details of the funA funA的所有变量，参数和内部函数详细信息
 scopechain: [], // List of all the scopes inside which the current function is 当前函数所在的所有范围的列表
 this // Value of this 
}
激活对象或变量对象包含参数对象，该对象具有有关函数参数的详细信息。

它将具有在当前函数内声明的每个变量和函数的属性名称。在我们的例子中激活对象或变量对象将如下所示：

variableObject = {
  argumentObject : {
    0: a,
    1: b,
    length: 2
  },
  a: 3,
  b: 2
  c: undefined,
  d: undefined then pointer to the function defintion of d
}
ArgumentObject：JS引擎将创建参数对象，如上面的代码所示。它还将具有length指示函数中参数总数的属性。它只有属性名称，而不是它的值
现在，对于函数中的每个变量，JS引擎将在激活对象或变量对象上创建一个属性，并将其初始化undefined。由于参数也是函数内部的变量，因此它们也作为参数对象的属性存在。
如果变量已作为参数对象的属性存在，则JS引擎将不执行任何操作并将移至下一行。
当JS引擎在当前函数中遇到函数定义时，它将通过函数名称创建一个新属性。创建阶段中的函数定义存储在堆内存中，它们不存储在执行上下文堆栈中。函数名称属性指向堆内存中的定义。
因此，在我们的例子中，首先，d 将得到值undefined 作为变量，但是当JS引擎遇到具有相同名称的函数时，它会覆盖其值以将其指向d 存储在堆中的函数的定义。
在此JS引擎之后将创建范围链并确定其值this。


+ 执行阶段



在执行阶段，JS引擎将再次扫描函数以使用变量的值更新变量对象，并将执行代码。
在执行阶段之后，变量对象将如下所示：

variableObject = {
  argumentObject : {
    0: a,
    1: b,
    length: 2
  },
  a: 3,
  b: 2,
  c: 3,
  d: undefined then pointer to the function defintion of d
}



a = 1;

var b = 2;

cFunc = function(e) {
  var c = 10;
  var d = 15;
  
  a = 3
  
  function dFunc() {
    var f = 5;
  }
  
  dFunc();
}

cFunc(10);


当上述代码在浏览器中加载时，JS引擎将进入编译阶段以创建执行对象。在编译阶段，JS引擎只处理声明，它不会打扰值。这是执行上下文的创建阶段。
第1行：在这一行中，变量被赋值为，因此JS引擎不会将其视为变量声明或函数声明，而是移动到第3行。它在编译阶段对此行没有任何作用，因为它不是任何声明。 a 1
第3行：由于上面的代码在全局范围内并且它是一个变量声明，JS引擎将在全局执行上下文对象中创建一个具有此变量名称的属性，并使用undefined 值初始化它。
第5行：JS引擎找到一个函数声明，因此它将函数定义存储在堆内存中并创建一个属性，该属性将指向存储函数定义的位置。JS引擎不知道cFunc里面的内容只是指向它的位置。
第18行：这段代码不是任何声明，因此JS引擎不会做任何事情。
创建阶段阶段后的全局执行上下文对象：

globalExecutionContextObj = {
  activationbj: {
      argumentObj : {
          length:0
      },
      b: undefined,
      cFunc: Pointer to the function definition
  },
  scopeChain: [GLobal execution context variable object],
  this: value of this
}

由于没有代码，JS引擎现在将进入执行阶段并将再次扫描该功能。在这里，它将更新变量值并执行代码。
第1行：JS引擎发现a 变量对象中没有名称属性，因此它在全局执行上下文中添加了此属性并将其值初始化为1。
第3行：JS引擎检查变量对象中是否存在具有名称的属性，因此将其值更新为。 b 2
第5行：由于它是一个函数声明，它不会做任何事情并转移到第18行。
执行阶段后的全局执行上下文对象：
globalExecutionContextObj = {
  activationbj: {
      argumentObj : {
          length:0
      },
      b: 2,
      cFunc: Pointer to the function definition,
      a: 1
  },
  scopeChain: [GLobal execution context variable object],
  this: value of this
}
第18行：这里cFunc被调用，因此JS引擎再次进入编译阶段，cFunc 通过扫描它来创建执行上下文对象。
作为cFunc 具有e 作为参数，JS引擎将增加e 在参数对象cFunc 执行上下文对象和名称创建一个属性e ，并初始化它2。
第6行：JS引擎将检查是否c 是激活对象中的属性cFunc。由于该名称没有属性，因此它将添加c 为属性并将其值初始化为undefined。
第7行：与第6行相同
第9行：由于此行不是声明，JS引擎将移动到下一行
第11行：JS引擎找到一个函数声明，因此它将函数定义存储在堆内存中并创建一个属性dFunc ，该属性将指向存储函数定义的位置。JS引擎不知道里面是什么dFunc。
cFunc 编译阶段后执行上下文对象：
cFuncExecutionContextObj = {
  activationbj: {
      argumentObj : {
          0: e,
          length:1
      },
      e: 10,
      c: undefined,
      d: undefined
      dFunc: Pointer to the function definition,
  },
  scopeChain: [cFunc variable object, Global exection context variable object],
  this: value of this
}
第15行：由于此声明不是声明，JS引擎不会做任何事情。
此外，此函数中没有行，JS引擎将进入执行阶段，并将再次扫描执行cFunc 。
第6行和7：c 和d 分别获得10和15的值
第9行：由于a 它不是cFunc 执行上下文对象的属性而且它不是声明，JS引擎将在范围链的帮助下移动到全局执行上下文，并检查a 全局执行上下文对象中是否存在具有该名称的属性。如果该属性不存在，它将创建一个新属性并将其初始化。这里，由于名称的属性a 已存在于全局执行上下文对象中，因此它将其值更新为3from 1。在这种情况下，JS引擎移动到全局执行上下文，即当它在执行阶段找到一个变量时，它不是当前执行上下文对象的属性
第11行：JS引擎将创建一个dFunc 属性并指向其堆位置
执行阶段之后的执行上下文对象cFunc：
cFuncExecutionContextObj = {
  activationbj: {
      argumentObj : {
          0: e,
          length:1
      },
      e: 10,
      c: 10,
      d: 15
      dFunc: Pointer to the function definition,
  },
  scopeChain: [cFunc variable object, Global exection context variable object],
  this: value of this
}
第15行：由于这是一个函数调用，JS引擎将再次进入编译阶段以创建dFunc 执行上下文对象。
dFunc 执行上下文对象可以使用范围链访问在cFunc 和全局范围内定义的所有变量和函数。
同样，cFunc 可以访问全局范围内的所有变量和对象，但它不能访问dFunc变量和对象。
全局执行上下文无权访问cFunc 或dFunc 变量或对象。
通过上述概念，我想很容易理解提升在JavaScript中是如何工作的。
范围链
范围链是当前函数所在的函数的所有变量对象的列表。范围链还包含当前的函数执行对象。
考虑以下代码：
a = 1;

var b = 2;

cFunc = function(e) {
  var c = 10;
  var d = 15;
  
  console.log(c);
  console.log(a); 
  
  function dFunc() {
    var f = 5;
    console.log(f)
    console.log(c);
    console.log(a); 
  }
  
  dFunc();
}

cFunc(10);
这里，当cFunc 从全局执行上下文调用函数时，范围链cFunc 将如下所示
cFunc的范围链= [cFunc变量对象，
                         全局执行上下文变量对象]
当dFunc 从调用cFunc，因为dFunc 是内部cFunc，dFunc’s 范围链由dFunc可变对象，cFunc 可变对象和全局执行环境变量的对象。
dFunc的范围链= [dFunc变量对象，
                        cFunc变量对象，
                        全局执行上下文变量对象]
当我们尝试访问f 内部时dFunc，JS引擎检查变量对象f 内是否可用dFunc’s 。如果它找到f’s 值则console.log f’s 值。
当我们尝试访问c内部变量时dFunc，JS引擎会检查变量对象c 内是否可用dFunc’s。如果变量不可用，则它将移动到cFunc变量对象。
由于变量在变量对象中不可用，因此JS引擎移动到变量对象。正如变量对象可用，它将值。c dFunc’s cFunc’s c cFunc console.log c’s
当我们尝试在a’s 内部记录值时dFunc，JS引擎将检查变量对象a 内是否可用dFunc’s。如果a 在dFunc的 变量对象中不可用，它将移动到作用域链中的下一个项目，即cFunc’s变量对象。JS引擎将检查cFunc’s变量对象是否为变量a。这里，变量a在cFunc’s 变量对象上不可用，因此，它将检查dFunc’s作用域链中的下一个项，即全局执行上下文变量对象。这里a有dFunc’s 可变对象，它将控制a’ s 值。
类似地，在cFunc的情况下，JS引擎a’s 将从全局执行对象中找到变量值。
cFunc不知道该变量是否f存在。因此，如果我们试图访问f 距离cFunc 它会给出一个错误。但是，dFunc 函数具有使用范围链的访问c和d 变量
可以使用JavaScript中的作用域链上下文来解释闭包。



JavaScript闭包的底层运行机制


作用域链（Scope Chain）

js在运行的时候，需要一些空间让它来储存本地变量，我们称这些空间为作用域对象Scope Object或者词法环境。

在JavaScript中，作用域对象是在堆中被创建的（至少表现出来的行为是这样的），所以在函数返回后它们也还是能够被访问到而不被销毁。


作用域对象是可以有父作用域对象（parent scope object）的。当代码试图访问一个变量的时候，解释器将在当前的作用域对象中查找这个属性。如果这个属性不存在，那么解释器就会在父作用域对象中查找这个属性。就这样，一直向父作用域对象查找，直到找到该属性或者再也没有父作用域对象。我们将这个查找变量的过程中所经过的作用域对象乘坐作用域链（Scope chain）。


在作用域链中查找变量的过程和原型继承（prototypal inheritance）有着非常相似之处。但是，非常不一样的地方在于，当你在原型链（prototype chain）中找不到一个属性的时候，并不会引发一个错误，而是会得到undefined。但是如果你试图访问一个作用域链中不存在的属性的话，你就会得到一个ReferenceError


什么是闭包？闭包就是同时含有对函数对象以及作用域对象引用的最想。实际上，所有JavaScript对象都是闭包。
闭包是什么时候被创建的？因为所有JavaScript对象都是闭包，因此，当你定义一个函数的时候，你就定义了一个闭包。
闭包是什么时候被销毁的？当它不被任何其他的对象引用的时候。

当一个函数被定义的时候，函数标识符就被添加到了当前作用域对象中，并且这个标识符所引用的是一个函数对象，函数对象中所包含的势函数的源代码以及其他的属性，其中一个我们所关心的属性就是内部属性[[scope]],[[scope]]所指向的就是当前的作用域对象，也就是指的就是函数的标识符被创建的时候，我们所能够直接访问的那个作用域对象

scope是自己内部的作用域对象

需要注意的是作用域链是不会被复制的。每次函数调用只会往作用域链下面新增一个作用域对象。所以，如果在函数调用的过程当中对作用域链中的任何一个作用域对象的变量进行修改的话，那么同时作用域链中也拥有该作用域对象的函数对象也是能够访问到这个变化后的变量的。

``` js

"use strict";

var elems = document.getElementsByClassName("myClass"), i;

for (i = 0; i < elems.length; i++) {
  elems[i].addEventListener("click", function () {
    this.innerHTML = i;
  });
}
```

在上面的循环中创建了多个函数对象，所有的函数对象的[[scope]]都保存着对当前作用域对象的引用。而变量i正好就在当前作用域链中，所以循环每次对i的修改，对于每个函数对象都是能够看到的。


作用域是一个有限的变量或者对象，执行上下文可以访问这个变量或者对象

每个函数/执行上下文都有自己的范围。还有一个全局范围位于每个范围之上

``` js
const bestAvenger = 'Iron man';
function a () {
  const bestActor = "Neymar";
  console.log(bestAvenger); // output:Iron man
  function c() {
    const bestProgrammingLanguage = 'Html';
    console.log(bestActor); // output:Neymar
    b();
  }
  c();
}
function b() {
  console.log(bestProgrammingLanguage); // not defined error
}
a();
```

全局窗口称为G.
函数a称为A.
函数b称为B.
函数c称为C.

``` js
G = {a（），b（），const bestAvenger} 
A = {c（），const bestActor} 
B = {} 
C = {const bestProgrammingLanguage}
```

:::tip
要记住的事情：正如您在上面已经注意到的那样，函数位于定义它们的范围内，而不是它们被调用的位置。
:::

执行上下文

执行上下文是执行代码的函数的环境。每个函数都有自己的执行上下文。

函数的执行上下文/环境大致相当于：

函数参数，函数作用域，this关键字

更深入地执行执行上下文

执行上下文作为整个执行流程中的一个单元。由于每个函数都有自己的执行上下文，因此Js编译器会维护一堆执行上下文。它跟踪执行上下文是否按正确顺序。堆栈顶部包含当前正在执行的函数的执行上下文。


作用域链
除全局作用域外，每个作用域始终连接到其背后的一个或多个作用域，形成链或层次结构。全局作用域没有任何父级，这也是有意义的，因为它位于层次结构的顶部。

编译器如何使用此作用域链？

每当编译器遇到变量或对象时，它都会遍历当前执行上下文的整个作用域链，以查找它。如果没有在那里找到它，它遍历原型链，如果它也没有找到，它会抛出未定义的错误。

当console.log(bestAvenger)执行时，当前执行上下文是A，让我们看看A的范围链是什么：
A = A + G. 编译器在G中找到了变量
何时console.log(bestActor);执行; 当前执行上下文是C，让我们看看C的范围链是什么：
C = C + A + G. 编译器在A中找到了变量
什么时候 console.log(bestProgrammingLanguage)被执行了; 当前执行上下文是B，让我们看看是B的范围链：
B = B + G。编译器既不能在B或G中找到变量，也不会定义错误。

Javascript是单线程的。始终只有一个执行上下文被执行。因此，必须了解Javascript编译器如何处理内部资源。我们可以从本文中总结出以下几点

每个函数都有自己的执行上下文
执行上下文是包含其自身范围的函数的环境。
编译器通过查看函数在代码中的位置来创建函数的作用域。
编译器创建称为范围链的范围层次结构，全局范围位于此层次结构的顶部
当代码中使用变量时，编译器会向后查看作用域链，如果找不到，则抛出未定义的错误。


scope  context  this

现在是时候看看它是如何被计算机解释的。读取代码的方式基本上是从上到下，逐行。发生的第一件事就是创建阶段。解释器执行扫描并首先选择所有变量和函数声明；
变量跟函数声明将被提升到顶部

### “作用域”是什么以及它有什么作用

为了使其有意义，我们首先要考虑浏览器如何读取JavaScript。
无论何时加载页面，页面都从顶部开始，并在所谓的“创建”阶段中逐行读取代码。
在此阶段，它会遍历您的脚本并查找所有变量和函数名称。
并将它们编译在一起，以便您可以在需要时访问它们。





闭包，这个功能我们可以创建私有数据和定义应用程序接口

闭包作为一个概念，与作用域的概念密切相关

作用域简述：

高级函数  函数返回另一个函数


当一个函数在另一个函数中，而内部函数想要访问属于外部函数的变量时，就会发生闭包

闭包经常在JavaScript中用于对象数据隐私，事件处理程序和回调函数，以及部分应用程序，currying和其他函数编程模式。


闭包是捆绑在一起（封闭）的函数与对其周围状态（词汇环境）的引用的组合。

换句话说，闭包允许您从内部函数访问外部函数的作用域。在JavaScript中，每次创建函数时都会在函数创建时创建闭包。

要使用闭包，请在另一个函数内定义一个函数并公开它。要公开函数，请将其返回或传递给另一个函数。
即使在返回外部函数之后，内部函数也可以访问外部函数作用域中的变量。


JavaScript闭包就像汽车一样 - 它们带有各种组件，可以处于特定于该汽车的不同位置。
JavaScript中的每个函数都有一个闭包。这是JavaScript语言最酷的功能之一。因为没有闭包，所以很难实现像回调或事件处理程序这样的常见结构。
只要定义函数，就可以创建闭包。然后，当您执行函数时，它们的闭包使它们能够访问其作用域中的数据。
这有点制造汽车时（定义）就像它带有像一些功能start，accelerate，decelerate。每次驾驶汽车时，驾驶员都会执行这些汽车功能。这些功能的闭包由汽车本身定义，并且它们关闭了它们需要操作的变量。
让我们将这个类比缩小到accelerate函数。功能定义发生在汽车制造时：
功能加速（强制）{ 
  //汽车是否启动？
  //我们有燃料吗？
  //我们处于牵引力控制模式吗？
  //许多其他检查... 
  //如果一切顺利，根据
  力变量燃烧更多燃料（我们踩油门踏板有多难）
}
每次驾驶员踩下油门踏板时，都会执行此功能。注意这个函数如何需要访问很多变量来操作，包括它自己的force变量。但更重要的是，它需要超出其范围的变量，这些变量由其他汽车功能控制。这就是accelerate功能的关闭（我们用汽车本身得到的）就派上用场了。
这是accelerate函数的闭包对accelerate函数本身的承诺：
好的accelerate，当你执行时，你可以访问你的force变量，你可以访问isCarStarted变量，你也可以访问fuelLevel变量和isTractionControlOn变量。您还可以控制currentFuelSupply我们发送给引擎的变量。
请注意，闭包没有为这些变量赋予accelerate函数固定值，而是在执行加速函数时访问这些值的权限。
闭包与函数范围密切相关，因此了解这些作用域的工作原理将有助于您理解闭包。简而言之，了解范围最重要的是，当您执行一个函数时，会创建一个私有函数作用域并用于执行该函数的过程。
然后，当您从函数内执行函数时，这些函数作用域将被嵌套（您将一直执行这些函数）。
定义函数时会创建闭包- 而不是在执行时。然后，每次执行该函数时，它已经定义的闭包使它可以访问它周围可用的所有函数范围。
在某种程度上，您可以将范围视为临时范围（全局范围是唯一的例外），而您可以将封装本身视为永久范围。

Chrome devtools中报告的关闭
要真正理解闭包及它们在JavaScript中扮演的角色，首先需要了解一些关于JavaScript函数及其作用域的其他简单概念。
在我们开始之前，请注意我还为此创建了一个交互式实验室，您可以在此处进行操作。
1 - 功能由值参考指定
将函数放入如下变量时：
function sayHello（）{ 
  console.log（“hello”）; 
}; 
var func = sayHello;
您正在为变量分配对func函数的引用sayHello，而不是副本。这里func只是一个别名sayHello。你在别名上做的任何事情你将在原始函数上实际做。例如：
func.answer = 42; 
的console.log（sayHello.answer）; //打印42
该属性answer直接设置func 和读取使用sayHello，这是有效的。
您也可以sayHello通过执行func别名来执行：
func（）//打印“你好”
2 - 范围有一生
调用函数时，在执行该函数期间创建范围。那范围就消失了。
第二次调用该函数时，在第二次执行期间创建一个新的不同作用域。然后第二个范围也消失了。
function printA（）{ 
  console.log（answer）; 
  var answer = 1; 
}; 
printA（）; //这会创建一个在
printA（）
之后
立即
丢弃的范围
; //这会创建一个新的不同范围，它也会在之后被丢弃;
在上面的示例中创建的这两个范围是不同的。answer这里的变量根本不在它们之间共享。
每个功能范围都有一生。它们被创建并立即被丢弃。这个事实的唯一例外是全局范围，只要应用程序正在运行，它就不会消失。
3 - 闭包跨越多个范围
定义函数时，会创建一个闭包
与作用域不同，闭包是在定义函数时创建的，而不是在执行时创建的。执行该功能后，闭包也不会消失。
在定义函数之后以及执行函数之后，您可以在闭包中访问数据。
闭包包含定义的函数可以访问的所有内容。这意味着已定义函数的作用域，以及全局作用域和已定义函数作用域之间的所有嵌套作用域以及全局作用域本身。
var G ='G'; 
//定义一个函数并创建一个闭包
函数functionA（）{ 
  var A ='A' 
  
  //定义一个函数并创建一个闭包
  函数functionB（）{ 
    var B =' 
    B'console.log（A，B，G） ; 
  } 
  
  functionB（）; //打印A，B，G 
  // functionB闭包不被丢弃
  A = 42; 
  functionB（）; //打印42，B，G 
} 
functionA（）;
当我们functionB在这里定义时，它创建的闭包将允许我们访问functionB范围以及functionA加上全局范围的范围。
我们执行每一次functionB，我们都可以访问的变量B，A以及G 通过其先前创建的关闭。但是，该闭包不会给我们这些变量的副本，而是对它们的引用。因此，例如，如果变量的值A在functionB创建闭包后的某个时刻发生了变化，那么当我们执行functionB之后执行时，我们将看到新值，而不是旧值。第二次调用functionBprint，42, B, G 因为变量的值A改为42，闭包给了我们一个引用A，而不是一个副本。
不要将闭包与范围混淆
闭包与范围混淆是很常见的，所以让我们确保不要这样做。
// scope：global 
var a = 1; 
void function one（）{ 
  // scope：one 
  // closure：[one，global] 
  var b = 2; 
  
  void function two（）{ 
    // scope：two 
    // closure：[two，one，global] 
    var c = 3; 
    
    void function three（）{ 
      // scope：three 
      // closure：[three，two，one，global] 
      var d = 4; 
      console.log（a + b + c + d）; //打印10 
    }（）; 
  }（）;  
}（）;
在上面的简单示例中，我们有三个函数，它们都被定义并立即调用，因此它们都创建了作用域和闭包。
功能范围one()是它的身体。它的封闭使我们能够获得其范围和全球范围。
功能范围two()是它的身体。它的封闭使我们能够访问其范围以及功能范围one()和全局范围
同样，函数的闭包three()使我们可以访问示例中的所有范围。这就是为什么我们能够访问函数中的所有变量three()。
但是范围和闭包之间的关系并不总是像这样简单。当函数的定义和调用发生在不同的范围内时，事情就会变得不同。让我用一个例子解释一下：
var v = 1; 
var f1 = function（）{ 
  console.log（v）; 
} 
var f2 = function（）{ 
  var v = 2; 
  F1（）; //这会打印1还是2？
}; 
F2（）;
你认为上面的例子会打印出什么？代码很简单，f1()打印的值v在全局范围内为1，但是我们在f1()内部执行f2()，其中有一个不v等于2的值。然后我们执行f2()。
这段代码会打印1还是2？
如果你想说2，你会感到惊讶。这段代码实际上会打印1.原因是，范围和闭包是不同的。该console.log行将使用f1()我们定义时创建f1()的闭包，这意味着闭包f1()只允许我们访问f1()加上全局范围的范围。我们执行的范围f1()不会影响该关闭。事实上，关闭f1()不会让我们进入任何范围f2()。如果删除全局v变量并执行此代码，则会出现引用错误：
var f1 = function（）{ 
  console.log（v）; 
} 
var f2 = function（）{ 
  var v = 2; 
  F1（）; // ReferenceError：v未定义
}; 
F2（）;
这对理解和记忆非常重要。
4 - 闭包具有读写访问权限
由于闭包为我们提供了作用域中变量的引用，因此它们为我们提供的访问意味着读取和写入，而不仅仅是读取。
看看这个例子：
function outer（）{ 
  let a = 42; 
function inner（）{ 
    a = 43; 
  } 
inner（）; 
  的console.log（a）的 
} 
outer（）;
inner()这里的函数在定义时会创建一个闭包，使我们可以访问变量a。我们可以读取和修改该变量，如果我们修改它，我们将修改范围中的实际a变量outer()。
这段代码将打印43因为我们使用inner()函数闭包来修改outer()函数变量。
这实际上是我们可以在各处改变全局变量的原因。所有闭包都为我们提供了对所有全局变量的读写访问权限。
5 - 闭包可以共享范围
由于闭包在我们定义函数时允许我们访问嵌套作用域，当我们在同一作用域中定义多个函数时，该作用域在所有创建的闭包之间共享，当然，因此，全局作用域总是在所有闭包之间共享。关闭。
function parent（）{ 
  let a = 10; 
  
  function double（）{ 
    a = a + a; 
   的console.log（a）的 
  }; 
  
  function square（）{ 
    a = a * a; 
   的console.log（a）的 
  } 
  
  return {double，square} 
} 
let {double，square} = parent（）; 
双（）; //打印20 
平方（）; //打印400 
double（）; //打印800
在上面的例子，我们有一个parent()可变功能a设置为10.我们在此定义两个函数parent()功能的范围，double()和square()。创建的闭包double()和square()共享parent()函数的范围。由于两个double()和square()改变的值a，当我们执行的最后3行，我们双a（使a= 20），则该倍值（使平方a= 400），那么两倍平方值（使a= 800）。
最后一次测试
现在让我们检查一下你对闭包的理解。在执行以下代码之前，请尝试猜测它将打印的内容：
让a = 1; 
const function1 = function（）{ 
  console.log（a）; 
  a = 2 
} 
a = 3; 
const function2 = function（）{ 
  console.log（a）; 
} 
功能1（）; 
函数2（）;
我希望你做对了，我希望这些简单的概念能帮助你真正理解函数闭包在JavaScript中扮演的重要角色。
谢谢阅读。


[了解JavaScript：闭包](//medium.com/hackernoon/understanding-javascript-closures-4188edf5ea1b)

从最常见的JavaScript面试问题之一开始：
## 什么是闭包？

每次为事件处理程序添加回调时，都使用了闭包
:::tip
闭包是指函数能够记住并访问其词法范围，即使该函数在其词法范围之外执行也是如此。
:::

我们不会详细讨论本文中的范围(即，作用域)，但必须知道它是什么才能理解闭包的工作原理。
作用域实际上是包含某些变量和函数的代码的一部分。在JavaScript中，每个函数都创建一个新的作用域，它的变量和传递的参数只能在它内部使用。

现在关于那些嵌套函数的特殊之处在于它们可以访问它们的父变量。

## 闭包是暴露的函数

闭包是暴露的函数，即使我们从外部调用它们也可以访问其父级的范围。

``` js
function person(name) {
  return {
    greet: function() {
      console.log('hello from ' + name)
    }
  }
}

let alex = person('alex');
alex.greet(); // hello from alex
console.log(alex.name); // undefined
console.log(name); // will throw ReferenceError
```
`person`返回一个对象，该对象具有greet函数作为其之一属性。
正如我们现在所知，greet即使我们这样调用它，这个公开的函数仍然可以访问其父级参数。因此即使name变量未在其范围内明确定义，greet也会从其父级获取它，因为它是一个闭包。

## 带闭包的模块和封装

::: tip
通过闭包，我们可以为我们的函数定义一个公共API，并将其他所有内容保密。
:::

JavaScript中的封装这个概念的实现是使用模块模式完成的。

## 模块

[在ES6中，我们有更好的基于文件的模块，我们可以使用导入和导出关键字，但重要的是要注意它们只是我们将要看到的语法糖。](http://es6.ruanyifeng.com/#docs/module)

``` js
function Person(firstName, lastName, age) {
  var private = 'this is a private member';

  return {
    getName: function() {
      console.log('My name is ' + firstName + ' ' + lastName);
    },
    getAge: function() {
      console.log('I am ' + age + ' years old')
    }
  }
}

let person = new Person('Alex', 'Kondov', 22);
person.getName();
person.getAge();
console.log(person.private); //undefined
```
这是一个相当简单的例子，用于演示如何将某些函数的数据保密。我们可以使用其他嵌套函数，甚至可以在导出函数中使用它们，但不要公开它们。
``` js
function Order (items) {
  const total = items => {
    return items.reduce((acc, curr) => {
      return acc + curr.price
    }, 0)
  }
  
  const addTaxToPrice = price => price + (price * 0.2)
  
  return {
    calculateTotal: () => {
      return addTaxToPrice(total(items)).toFixed(2)
    }
  }
}

const items = [
  { name: 'Toy', price: 14.99 },
  { name: 'Candy', price: 7.99 }
]

const order = Order(items)
console.log(order.total) // undefined
console.log(order.addTaxToPrice) // undefined
console.log(order.calculateTotal()) // 27.58
```
在这个稍微更现实的例子中，我们有一个返回订单对象的函数。唯一暴露的功能是calculateTotal。它有一个Order函数的闭包，它允许它使用它的变量并传递参数。它还隐藏了在计算订单总额时实际发生的情况，允许您在将来添加运费或其他内容。
## 奇怪的部分

``` js
for (var i = 1; i <= 5; i++) {
  setTimeout(function timer () {
    console.log(i);
  }, i * 1000);
}
```
我们在这里所做的就是从1做5循环并设置超时以在一定时间后打印当前数字。常识说这段代码会输出1,2,3,4,5，对吗？

令我们惊讶的是，上面的代码在控制台中连续五次记录`6`。如果你在没有`for循环`的情况下，setTimeout则不会出现任何问题，因为将立即执行。

我们希望每个setTimeout调用都会收到它自己的i变量副本，但是它会从它的父节点作用域内访问它。

`settimeout`宏任务，先把for循环的`settimeout`全部压入事件列队。当那些1000毫秒通过时，循环已经很久完成，并且i变量以分配给它的值6为止。

我们了解这个问题，但我们如何解决？setTimeout将i在全局范围内查找变量，这会导致它不打印我们想要的数字。我们可以通过包装setTimeout函数并传递我们想要登录的变量来操纵它。这样，setTimeout函数将从它的父级范围而不是全局范围访问它。
``` js
for (var i = 1; i <= 5; i++) {
  (function(index) {
    setTimeout(function timer () {
      console.log(index);
    }, index * 1000);
  })(i)
}
```
我们正在使用IIFE（立即调用的函数表达式）并传递数字以记录它。IIFE是我们在定义它之后立即调用的函数，并且经常在诸如此类的情况下使用 - 当我们想要创建范围时。这样，每个函数都将使用它自己的变量副本进行调用，这意味着在setTimeout运行时它将访问正确的数字。因此，使用上面的示例，我们将得到我们正在寻找的1,2,3,4和5的结果。

## 结束思想

+ [凯尔辛普森关于作用域和闭包的书](https://github.com/getify/You-Dont-Know-JS/tree/master/scope%20%26%20closures)


Closure是函数创建时范围内所有变量的集合。要使用闭包，请在另一个函数内创建一个函数，该函数称为嵌套函数。即使在返回外部函数之后，内部函数也可以访问外部函数作用域中的变量（Closure有助于访问外部函数作用域）。每次创建函数时都会创建闭包。
在继续了解Closures之前，让我们首先了解一下JavaScript中的Scope Chain。
通常，有两种类型的范围：
全球范围
本地范围
在ES5版本中，函数内部的变量在外部不可见。但是块内的变量（if或while之类的条件）也是可见的。
由此，ES5具有功能范围。没有块范围。
编辑：2019年5月9日
根据ES5，使用函数是在代码中声明块作用域的唯一方法。
但是，在ES6中，let＆const关键字提供了块范围。
无论如何，更好地了解JavaScript如何逐步发展。
让我们继续这个ES5版本：
var a = 10; 
function app（）{ 
   var b = 2; 
   的console.log（a）的 // 10 
   console.log（b）; // 2 
} 
console.log（b）; // ReferenceError：b未定义
app（）;
我们已经知道，a是一个全局变量＆b是一个特定于app函数的局部变量。
我们无法从局部范围中获取局部变量的值。
使用嵌套函数 - 函数内部的函数
var a = 10; 
function app（）{ 
     var b = 2; 
     var d = 3; 
  function add（）{ 
     var c = a + b; 
   } 
return add; 
} 
var x = app（）; 
console.dir（X）;
这里，app是父函数，add函数是子函数。
而不是使用的console.log，console.dir用来安慰指定的JavaScript对象，它可以帮助开发者获取对象的属性的所有属性
变量x被分配给app函数，app函数返回add函数。因此，我们可以看到add函数的所有对象属性。
如果在浏览器中看到控制台，则可以在Scopes数组中看到Closure对象。

由于内部函数add访问外部函数变量b＆d，因此这两个变量将被添加到Closure对象中以供参考。
让我们看一下Closure的下一个例子：
var a = 10; 
var startFunc; 
function app（）{ 
      var b = 2; 
   function add（）{ 
      var c = a + b; 
      的console.log（C）; 
   } 
   startFunc = add（）; 
} 
应用程式（）; //调用app函数
startFunc; 
//因为上面调用的app函数会将add函数赋值给startFunc并控制c的值
将名为startFunc的全局函数分配给add函数，该函数是父app函数的子函数。
只有在调用app函数后才能执行此操作，否则startFunc将充当全局变量而不分配任何值
闭包在JavaScript中的应用
我们大多数人在编码时使用闭包，但我们不明白我们使用它的原因。JavaScript没有像其他面向对象编程语言那样的访问修饰符，如private，public，protected。因此，我们必须使用函数来保护命名空间免受ES5中的外部代码使用。
特别是在函数中，立即调用函数表达式（IIFE）是在声明之后立即执行的函数表达式。声明函数后，您不需要调用该函数。
IIFE支持在JavaScript中编写Module Pattern（设计模式之一）。
IIFE的语法定义是：
（function（）{ 
             //函数内部的变量和范围
}）（）;
我们举个例子：
var studnetEnrollment =（function（）{ 
    // 
    除了下面声明的函数外，没有人可以更改的私有变量.var 
     count = 0; 
     var prefix =“S”; 
    //返回一个命名函数表达式
     函数innerFunc（）{ 
         count = count + 1; 
         return prefix + count; 
     }; 
return innerFunc; 
}）（）; 
var x = studnetEnrollment（）; // S1 
console.log（x）; 
var y = studnetEnrollment（）; // S2 
console.log（y）;
count和prefix是2个私有变量，任何人都无法更改，只能访问内部函数（此处为innerFunc）。只有名为Closure的功能才能进行此访问。
第一次调用studentEnrollment函数时，函数内的count变量由innerFunc函数递增1。
在第二次，计数增加先前的计数值，即1到2
Closure功能可以实现这些功能。
结论
Closure是外部函数中的变量集合，它提供对内部函数作用域的访问以保护全局名称空间。
闭包使开发人员能够编写像OOP Languages这样的干净代码，这些代码不会混淆ES5版本中的全局和局部变量名称。



JavaScript闭包对我来说一直是个谜

## 开始之前

有一些概念
+ 执行上下文  execution context