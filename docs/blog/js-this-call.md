---
title: 了解一下this
description: '来了解一下this'
sidebar: 'auto'
time: '2015-01-06'
prev: './js-variable-lift'
next: './js-function-prototype'
---

## 神秘的 this

从像Java，PHP或其他标准语言这样的背景，this被视为类方法中当前对象的一个​​实例：不多也不少。大多数情况下，它不能在方法之外使用，这种简单的方法不会造成混淆。

在JavaScript中，情况是不同的：this是函数的当前执行上下文。该语言有4种函数调用类型：

函数调用： alert('Hello World!')
方法调用： console.log('Hello World!')
构造函数调用： new RegExp('\\d')
间接调用： alert.call(undefined, 'Hello World!')

每种调用类型都以自己的方式定义上下文，因此this行为与开发人员期望的略有不同。

## 函数

函数是由事件驱动的或者当它被调用时执行的可重复使用的代码块。

## 构造函数

需要使用new运算符初始化

## 普通函数

不适用new运算符的函数


## 区别

1. 构造函数使用new运算符调用；普通函数不使用new运算符调用；

``` js
var p = new Person();
var p1 = Persion1();
```

2.构造函数内部可以使用this关键字；普通函数内部不建议使用this，因为这时候this指向的是window全局对象，这样无意间就会为window添加了一些全局变量或函数

``` bash
2.1 在构造函数内部，this指向的是构造出来的新对象

2.2 在普通函数内部，this指向的是window全局对象
```

3.构造函数默认不用return返回值；普通函数一般都有return返回值

``` bash
3.1 构造函数会默认返回this，也就是新的实例对象

3.2 普通函数如果没有return值的话，返回undefined

3.3 如果使用了return，那返回值会根据return值的类型而有所不同
3.3.1 return的是五种简单数据类型：String,Number,Boolean,Null,Undefined的话，构造函数会忽略return的值，依然返回this对象；而普通函数会返回return后面的值
3.3.2 如果return的是引用类型：Array,Date,Object,Function,RegExp,Error的话，构造函数和普通函数都会返回return后面的值
```

4.构造函数首字母建议大写；普通函数首字母建议小写

### 课外

new 做了什么

``` bash
var obj = {} 创建一个空对象obj

obj.__proto__ = co.prototype 将这个空对象的__proto__成员指向了构造函数对象的prototype成员对象，这是最关键的一步，具体细节将在下文描述。

co.call(obj) 将构造函数的作用域赋给新对象，因此co对象中的this指向了新对象obj，然后再调用co函数。

return obj 返回新对象obj
```


我都到一篇文章 用了一个很通俗易懂的 方法解释的，

js 给java打了一个电话告诉了它的住址让他过来吃饭，java就知道了js地址，java到了js家里不管怎么改动家里的布局，js、java都在js的家里面

引用类型的赋值其实是对象保存在栈区地址指针的赋值，所以两个变量指向同一个对象，任何的操作都会互相影响.


## 函数调用

``` js 
function hello(name) {  
  return 'Hello ' + name + '!';
}
// Function invocation
var message = hello('World');  
console.log(message); // => 'Hello World!' 

var message = (function(name) {  
   return 'Hello ' + name + '!';
})('World');
console.log(message) // => 'Hello World!'  
```

### this在函数调用中

this是函数调用中的全局对象.
全局对象由执行环境决定。在浏览器中，它是window对象。

在函数调用中，执行上下文是全局对象。

让我们检查以下函数中的上下文：

``` js
function sum(a, b) {  
   console.log(this === window); // => true
   this.myNumber = 20; // add 'myNumber' property to global object
   return a + b;
}
// sum() is invoked as a function
// this in sum() is a global object (window)
sum(15, 16);     // => 31  
window.myNumber; // => 20  
```

在sum(15, 16)调用时，JavaScript自动设置this为全局对象，在浏览器中window。

当this在任何函数作用域之外使用时（最顶层的作用域：全局执行上下文），它还引用全局对象：

``` js
console.log(this === window); // => true  
this.myString = 'Hello World!';  
console.log(window.myString); // => 'Hello World!'  

<!-- In an html file -->  
<script type="text/javascript">  
   console.log(this === window); // => true
</script>  
```

### this在函数调用中，严格模式

this是undefined在严格模式下的函数调用

严格模式是在ECMAScript 5.1中引入的，它是JavaScript的限制变体。它提供更好的安全性和更强的错误检查。

要启用严格模式，请将指令'use strict'放在函数体的顶部。

启用后，严格模式模式会影响执行上下文，从而this使其undefined处于常规函数调用中。与上述情况2.1相反，执行上下文不再是全局对象。

这在JavaScript函数调用，严格模式下
以严格模式执行的函数示例：

``` js
function multiply(a, b) {  
  'use strict'; // enable the strict mode
  console.log(this === undefined); // => true
  return a * b;
}
// multiply() function invocation with strict mode enabled
// this in multiply() is undefined
multiply(2, 5); // => 10  
```

当multiply(2, 5)作为函数调用时，this是undefined。

严格模式不仅在当前作用域中有效，而且在内部作用域中有效（对于在内部声明的所有函数）：

``` js
function execute() {  
   'use strict'; // activate the strict mode    
   function concat(str1, str2) {
     // the strict mode is enabled too
     console.log(this === undefined); // => true
     return str1 + str2;
   }
   // concat() is invoked as a function in strict mode
   // this in concat() is undefined
   concat('Hello', ' World!'); // => "Hello World!"
}
execute(); 
```
 
'use strict'插入到executebody 的顶部，在其范围内启用严格模式。因为concat在execute范围内声明，所以它继承了严格模式。并调用concat('Hello', ' World!')使得this要undefined。

单个JavaScript文件可能包含严格和非严格模式。因此，对于相同的调用类型，可以在单个脚本中具有不同的上下文行为：

``` js
function nonStrictSum(a, b) {  
  // non-strict mode
  console.log(this === window); // => true
  return a + b;
}
function strictSum(a, b) {  
  'use strict';
  // strict mode is enabled
  console.log(this === undefined); // => true
  return a + b;
}
// nonStrictSum() is invoked as a function in non-strict mode
// this in nonStrictSum() is the window object
nonStrictSum(5, 6); // => 11  
// strictSum() is invoked as a function in strict mode
// this in strictSum() is undefined
strictSum(8, 12); // => 20  
```


### 陷阱：this内在的功能
函数调用的常见陷阱认为this内部函数与外部函数中的相同。
正确地说，内部函数的上下文仅取决于调用，而不取决于外部函数的上下文。

为了获得预期this，使用间接调用修改内部函数的上下文（使用.call()或.apply()）或创建绑定函数（使用.bind()）。

以下示例计算两个数字的总和：

``` js
var numbers = {  
   numberA: 5,
   numberB: 10,
   sum: function() {
     console.log(this === numbers); // => true
     function calculate() {
       // this is window or undefined in strict mode
       console.log(this === numbers); // => false
       return this.numberA + this.numberB;
     }
     return calculate();
   }
};
numbers.sum(); // => NaN or throws TypeError in strict mode  
```

numbers.sum()是对象的方法调用），因此sum()上下文是numbers对象。calculate函数是在里面定义的sum，所以你可能也希望calculate的上下文也是sum。

然而，它calculate()是一个函数调用（但不是方法调用），它具有this全局对象window或undefined严格模式。即使外部函数sum将上下文作为numbers对象，它也没有影响。

在严格模式下抛出numbers.sum()is NaN或错误的调用结果TypeError: Cannot read property 'numberA' of undefined。绝对不是预期的结果5 + 10 = 15，因为calculate没有正确调用。

要解决此问题，calculate应使用与sum方法相同的上下文执行函数，以便访问numberA和numberB属性。

一种解决方案是calculate通过调用calculate.call(this)（间接调用函数，）手动将上下文更改为所需的上下文。

``` js
var numbers = {  
   numberA: 5,
   numberB: 10,
   sum: function() {
     console.log(this === numbers); // => true
     function calculate() {
       console.log(this === numbers); // => true
       return this.numberA + this.numberB;
     }
     // use .call() method to modify the context
     return calculate.call(this);
   }
};
numbers.sum(); // => 15  
```
calculate.call(this),改变了calculate this指向，并调用
现在this.numberA + this.numberB相当于numbers.numberA + numbers.numberB。该函数返回预期的结果5 + 10 = 15。



## Method invocation 方法调

方法是存储在对象属性中的函数。

``` js
var myObject = {  
  // helloFunction is a method
  helloFunction: function() {
    return 'Hello World!';
  }
};
var message = myObject.helloFunction();  
```

helloFunction是myObject的方法。要获取该方法，请使用属性访问器：myObject.helloFunction。

以下调用列表显示了如何区分这些类型：函数调用 与 方法调用

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

理解函数调用和方法调用之间的区别有助于正确识别上下文。

### this在方法调用中

在对象上调用方法时，this成为对象本身。

``` js
var calc = {  
  num: 0,
  increment: function() {
    console.log(this === calc); // => true
    this.num += 1;
    return this.num;
  }
};
// method invocation. this is calc
calc.increment(); // => 1  
calc.increment(); // => 2  
```

让我们来看另一个案例。JavaScript对象从其继承方法prototype。在对象上调用继承的方法时，调用的上下文仍然是对象本身：

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
Object.create()创建一个新对象myDog并设置原型。myDog对象继承sayName方法。
何时myDog.sayName()执行，myDog是调用的上下文。

在ECMAScript 6 class语法中，方法调用上下文也是实例本身：

``` js

class Planet {  
  constructor(name) {
    this.name = name;    
  }
  getName() {
    console.log(this === earth); // => true
    return this.name;
  }
}
var earth = new Planet('Earth');  
// method invocation. the context is earth
earth.getName(); // => 'Earth'  
```

### 将方法与其对象分离

可以将来自对象的方法提取为分离的变量var alone = myObj.myMethod。
单独调用该方法时，与原始对象分离alone()，您可能会认为this该方法是定义该方法的对象。

正确地，如果在没有对象的情况下调用该方法，则会发生函数调用：其中this是全局对象window或undefined严格模式.

创建绑定函数var alone = myObj.myMethod.bind(myObj)（使用.bind()，）可以修复上下文，使其成为拥有该方法的对象。

以下示例创建Animal构造函数并创建它的实例 - myCat。然后setTimout()在1秒后记录myCat对象信息：

``` js
function Animal(type, legs) {  
  this.type = type;
  this.legs = legs;  
  this.logInfo = function() {
    console.log(this === myCat); // => false
    console.log('The ' + this.type + ' has ' + this.legs + ' legs');
  }
}
var myCat = new Animal('Cat', 4);  
// logs "The undefined has undefined legs"
// or throws a TypeError in strict mode
setTimeout(myCat.logInfo, 1000);  
```
你可能认为setTimout会调用myCat.logInfo()，它应该记录有关myCat对象的信息。

不幸的是，当作为参数传递时，该方法与其对象分离：setTimout(myCat.logInfo)。以下情况是等效的：

``` js
setTimout(myCat.logInfo);  
// is equivalent to:
var extractedLogInfo = myCat.logInfo;  
setTimout(extractedLogInfo);  
```

当logInfosplit作为函数调用时，this是全局对象还是undefined严格模式（但不是 myCat对象）。因此对象信息无法正确记录。

函数可以使用.bind()方法与对象绑定。如果分离的方法与myCatobject 绑定，则解决了上下文问题：

``` js
function Animal(type, legs) {  
  this.type = type;
  this.legs = legs;  
  this.logInfo = function() {
    console.log(this === myCat); // => true
    console.log('The ' + this.type + ' has ' + this.legs + ' legs');
  };
}
var myCat = new Animal('Cat', 4);  
// logs "The Cat has 4 legs"
setTimeout(myCat.logInfo.bind(myCat), 1000);  
```

myCat.logInfo.bind(myCat)返回一个新函数，该函数执行起来与logInfo一样，它的this是myCat。


## Constructor invocation 构造函数调用：

这个例子声明了一个函数Country，然后将它作为构造函数调用：

``` js
function Country(name, traveled) {  
   this.name = name ? name : 'United Kingdom';
   this.traveled = Boolean(traveled); // transform to a boolean
}
Country.prototype.travel = function() {  
  this.traveled = true;
};
// Constructor invocation
var france = new Country('France', false);  
// Constructor invocation
var unitedKingdom = new Country;

france.travel(); // Travel to France  
```

new Country('France', false)是Country函数的构造函数调用。执行的结果是一个新对象，name 属性是'France'。
如果在没有参数的情况下调用构造函数，则可以省略括号对：new Country。

从ECMAScript 2015开始，JavaScript允许使用class语法定义构造函数：

``` js
class City {  
  constructor(name, traveled) {
    this.name = name;
    this.traveled = false;
  }
  travel() {
    this.traveled = true;
  }
}
// Constructor invocation
var paris = new City('Paris', false);  
paris.travel(); 
```

new City('Paris')是一个构造函数调用。对象初始化由类中的特殊方法处理：constructor具有this新创建的对象。

构造函数调用创建一个空的新对象，该对象从构造函数的原型继承属性。构造函数的作用是初始化对象。

### this在构造函数调用中

`this是构造函数调用中新创建的对象`

``` js
function Foo () {  
  console.log(this instanceof Foo); // => true
  this.property = 'Default Value';
}
// Constructor invocation
var fooInstance = new Foo();  
fooInstance.property; // => 'Default Value'  

class Bar {  
  constructor() {
    console.log(this instanceof Bar); // => true
    this.property = 'Default Value';
  }
}
// Constructor invocation
var barInstance = new Bar();  
barInstance.property; // => 'Default Value'  
```

### 忘记了new

一些JavaScript函数不仅在作为构造函数调用时创建实例，而且在作为函数调用时也创建实例。例如RegExp：

``` js
var reg1 = new RegExp('\\w+');  
var reg2 = RegExp('\\w+');

reg1 instanceof RegExp;      // => true  
reg2 instanceof RegExp;      // => true  
reg1.source === reg2.source; // => true  
```

执行时new RegExp('\\w+')，RegExp('\\w+')JavaScript会创建等效的正则表达式对象。

使用函数调用来创建对象是一个潜在的问题（不包括工厂模式），因为一些构造函数可能会忽略在new缺少关键字时初始化对象的逻辑。

``` js
function Vehicle(type, wheelsCount) {  
  this.type = type;
  this.wheelsCount = wheelsCount;
  return this;
}
// Function invocation
var car = Vehicle('Car', 4);  
car.type;       // => 'Car'  
car.wheelsCount // => 4  
car === window  // => true  
```

Vehicle是一个在上下文对象上设置type和wheelsCount属性的函数。返回
执行Vehicle('Car', 4)对象时car，它具有正确的属性：car.typeis 'Car'和car.wheelsCountis 4。您可能认为它适用于创建和初始化新对象。

但是在函数调用中this是window对象,因为结果Vehicle('Car', 4)是在window对象上设置属性- 错误的场景。未创建新对象。

``` js
function Vehicle(type, wheelsCount) {  
  if (!(this instanceof Vehicle)) {
    throw Error('Error: Incorrect invocation');
  }
  this.type = type;
  this.wheelsCount = wheelsCount;
  return this;
}
// Constructor invocation
var car = new Vehicle('Car', 4);  
car.type               // => 'Car'  
car.wheelsCount        // => 4  
car instanceof Vehicle // => true

// Function invocation. Generates an error.
var brokenCar = Vehicle('Broken Car', 3);  
```

new Vehicle('Car', 4) 效果很好：创建并初始化一个新对象，因为new 关键字存在于构造函数调用中。

在构造函数中添加了验证：this instanceof Vehicle以确保执行上下文是正确的对象类型。如果this不是a Vehicle，则生成错误。每当Vehicle('Broken Car', 3)执行（没有new）时抛出异常：Error: Incorrect invocation。

## Indirect invocation 间接调用

`使用 call() 、 apply()方法调用函数时执行间接调用`

JavaScript中的函数是第一类对象，这意味着函数是一个对象。这个对象的类型是Function。

::: tip .call()和.apply()用于调用具有可配置上下文的函数:
call方法（thisArg[，arg1[，arg2[，...]]]）接受第一个参数thisArg作为调用的上下文和
参数arg1、arg2、...的列表这些参数作为参数传递给调用函数。

.apply方法(thisArg，[arg1，arg2，...])方法接受第一个参数thisArg作为调用的上下文，
并接受作为参数传递给被调用函数的值[arg1，arg2，...]的数组样对象。
:::

下面的示例演示了间接调用：

``` js
function increment(number) {  
  return ++number;  
}
increment.call(undefined, 10);    // => 11  
increment.apply(undefined, [10]); // => 11  
```

例如，两者之间的主要区别在于.call()接受参数列表myFun.call(thisValue, 'val1', 'val2')。
但是.apply()接受类似数组的对象中的值列表，例如myFunc.apply(thisValue, ['val1', 'val2'])。

### this in indirect invocation 间接调用中的this

`this在间接调用中是作为第一个参数传递给.call()或.apply()的值。`

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

当函数应该用特定的上下文执行时，间接调用是有用的。
例如，用于解决函数调用的上下文问题，其中在严格模式下，它总是window或undefined 

``` js

function Runner(name) {  
  console.log(this instanceof Rabbit); // => true
  this.name = name;  
}
function Rabbit(name, countLegs) {  
  console.log(this instanceof Rabbit); // => true
  // Indirect invocation. Call parent constructor.
  Runner.call(this, name);
  this.countLegs = countLegs;
}
var myRabbit = new Rabbit('White Rabbit', 4);  
myRabbit; // { name: 'White Rabbit', countLegs: 4 } 
```

在Rabbit内部调用Runer.call(this, name)间接调用父函数(Runer)来初始化对象。

::: tip 总结：大白话
Fun.call()、Fun.apply()种的第一个参数就是当前的上下文，
Fun变化就是：修改了自己的this，并且执行一遍
:::

## Bound function

绑定函数是与对象连接的函数。
通常它是由原始函数使用.bind()方法创建的。
原始和绑定函数共享相同的代码和范围，但执行时的上下文不同。

bind方法（thisArg[，arg1[，arg2[，...]]]）接受第一个参数thisArg作为调用时绑定函数的上下文
以及参数arg1、arg2、...的可选列表这些参数作为参数传递给调用函数。它返回一个与thisArg绑定的新函数。

以下代码创建绑定函数，稍后调用它：

``` js
function multiply(number) {  
  'use strict';
  console.log(this === 2) // true
  return this * number;
}
// create a bound function with context
var double = multiply.bind(2);  
// invoke the bound function
double(3);  // => 6  
double(10); // => 20  
```

multiply.bind(2)返回一个新的函数对象(加倍函数)，它与数字2绑定。
乘法和加法具有相同的代码和范围。

与.Apple()和.call()方法相反，它立即调用函数，.bind()方法只返回一个新函数，
该函数稍后将被调用，并对此进行预配置。

### this in bound function 绑定函数中的this

`当调用绑定函数时，this是.bind()的第一个参数。`

.bind()的作用是创建一个新函数，调用时其 `上下文` 为传递给.bind()的第一个参数。
它是一种强大的技术，允许创建具有预定义的这个值的函数。

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

numbers.getNumbers.bind(numbers) 返回一个以numbers对象为上下文的 boundGetNumbers新函数
然后调用boundGetNumbers()该函数的this指向 numbers对象,并返回正确的数组对象

将numbers.getNumbers 提取到 simpleGetNumbers变量中而不进行绑定
对后来的调用simpleGetNumbers()具有this作为window或undefined在严格模式，而不是numbers对象，
在这种情况下，simpleGetNumbers()将无法正确返回数组。反之可以

### Tight context binding 紧密绑定上下文

.bind()建立一个永久的上下文链接，并始终保持它。
在使用call、apply、bind改变上下文是不起作用的

只有绑定函数的构造函数调用才能改变它，
但这不是推荐的方法（对于构造函数调用，使用普通函数，而不是绑定函数）。

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

只new one()更改绑定函数的上下文，其他类型的调用总是this等于1。

### polyfillBind

``` js
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}
function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;
```

## 箭头函数

引入箭头函数有两个方面的作用：更简短的函数并且不绑定this。

``` js
var hello = (name) => {  
  return 'Hello ' + name;
};
hello('World'); // => 'Hello World'  
// Keep only even numbers
[1, 2, 5, 6].filter(item => item % 2 === 0); // => [2, 6]
```

箭头函数带来较轻的语法，不包括详细的关键字function。return当函数只有1个语句时，你甚至可以省略。
箭头函数是匿名的，这意味着该name属性是一个空字符串''。(函数字面量声明的时候)
它也不提供与arguments常规函数相对的对象

``` js
var sumArguments = (...args) => {  
   console.log(typeof arguments); // => 'undefined'
   return args.reduce((result, item) => result + item);
};
sumArguments.name      // => ''  
sumArguments(5, 5, 6); // => 16  
```


### 箭头函数功能

`this是定义箭头函数的封闭上下文`

``` js
class Point {  
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  log() {
    console.log(this === myPoint); // => true
    setTimeout(()=> {
      console.log(this === myPoint);      // => true
      console.log(this.x + ':' + this.y); // => '95:165'
    }, 1000);
  }
}
var myPoint = new Point(95, 165);  
myPoint.log();  
```

如果在此示例中尝试使用常规函数，则会创建自己的上下文（window或undefined在严格模式下）。因此，要使相同的代码与函数表达式一起正常工作，必须手动绑定上下文：setTimeout(function() {...}.bind(this))。这很冗长，使用箭头功能是一种更简洁的解决方案。

箭头函数一劳永逸地与词汇上下文绑定。this 即使使用上下文修改方法也无法修改：

``` js
var numbers = [1, 2];  
(function() {  
  var get = () => {
    console.log(this === numbers); // => true
    return this;
  };
  console.log(this === numbers); // => true
  get(); // => [1, 2]
  // Use arrow function with .apply() and .call()
  get.call([0]);  // => [1, 2]
  get.apply([0]); // => [1, 2]
  // Bind
  get.bind([0])(); // => [1, 2]
}).call(numbers);
```
函数表达式是间接调用的.call(numbers)，这使得this调用成为numbers。该get箭头函数this为numbers过，因为它需要上下文词汇。

无论如何get调用，箭头函数始终保持初始上下文numbers。与其他上下文间接调用，get.call([0])或. get.apply([0])重新绑定get.bind([0])()无效。

箭头函数不能用作构造函数。如果将其作为构造函数调用new get()，则JavaScript会抛出错误：TypeError: get is not a constructor。


### 陷阱：用箭头函数定义方法

示例使用箭头函数定义format()类上的方法Period：

``` js
function Period (hours, minutes) {  
  this.hours = hours;
  this.minutes = minutes;
}
Period.prototype.format = () => {  
  console.log(this === window); // => true
  return this.hours + ' hours and ' + this.minutes + ' minutes';
};
var walkPeriod = new Period(2, 30);  
walkPeriod.format(); // => 'undefined hours and undefined minutes'  
```

箭头函数在声明的时候会绑定静态上下文

函数表达式解决了这个问题，因为常规函数确实根据调用改变了它的上下文：

``` js
function Period (hours, minutes) {  
  this.hours = hours;
  this.minutes = minutes;
}
Period.prototype.format = function() {  
  console.log(this === walkPeriod); // => true
  return this.hours + ' hours and ' + this.minutes + ' minutes';
};
var walkPeriod = new Period(2, 30);  
walkPeriod.format(); // => '2 hours and 30 minutes'  
```

## 结论


参考资料

[https://dmitripavlutin.com/gentle-explanation-of-this-in-javascript/](https://dmitripavlutin.com/gentle-explanation-of-this-in-javascript/)






















