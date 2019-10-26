---
title: JavaScript之旅：let const 暂时性死区
---

|| redeclare 重复声明 | hositing 变量提升 | block scope 块级作用域 | create global props 创建全局 |
|-----| ------ | ----------- |----------- |----------- |
|var| true   | true |false |true |
|let| false | false|true |false |
|const| false    | false |true |false |


## var

``` js
conosle.log(a)
var a = '111'

//  this code after hoisting 变量提升后

var a;
console.log(a)
a = '111'

// The JavaScript engine is not physically moving your code, your code stays where you typed it. javascript引擎并没有实际移动代码，而是将代码保留在输入时的位置。
```

#### 什么是变量提升

在编译阶段，在代码执行前几微秒，将扫描函数和变量声明。所有这些函数和变量声明都被添加到名为Lexical Environment的JavaScript数据结构内的内存中。这样它们甚至可以在源代码中实际声明之前使用。

#### 提升var变量

``` js
console.log(a) // outputs 'undefined'
var a = '222';
```

请记住JavaScript仅提升声明，而不是初始化。也就是说，在编译期间，JavaScript只 在内存中存储函数和变量声明，而不是它们的赋值（值）。
当JavaScript引擎var在编译阶段找到变量声明时，它会将该变量添加到词法环境中并在执行期间将其初始化值为`undefined`，当它到达在代码中完成实际赋值的行时，它将分配该值到变量。

## const

::: tip
const实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动。对于简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量。但对于复合类型的数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指向实际数据的指针，const只能保证这个指针是固定的（即总是指向另一个固定的地址），至于它指向的数据结构是不是可变的，就完全不能控制了。因此，将一个对象声明为常量必须非常小心。 
:::

## 暂时性死区

::: tip
暂时性死区的本质就是，只要一进入当前作用域，所要使用的变量就已经存在了，但是不可获取，只有等到声明变量的那一行代码出现，才可以获取和使用该变量。
:::

ES6 规定暂时性死区和let、const语句不出现变量提升，主要是为了减少运行时错误，防止在变量声明前就使用这个变量，从而导致意料之外的行为。这样的错误在 ES5 是很常见的，现在有了这种规定，避免此类错误就很容易了。

## let var 区别

+ var在编译时初始化为`undefined`，let在编译时对其求值时才初始化为`value`
+ var全局作用域/函数作用域，let块/子块作用域; var可以在函数的任何地方访问，但是let和const只能在声明它们的块内访问。var是函数作用域，而let是块作用域

``` js
// ES5  num的循环值为3，因此num具有全局范围
 var num = 10; 
for（var num = 0; num <3; num ++）{ 
  console.log（num）; // 0 1 2
 } 
console.log（num）; // 3

// ES6 当我们在for循环中使用let声明num时，for循环中的num具有完全不同的范围，而for循环之外的num具有不同的范围
let num = 10; 
for（let num = 0; num <3; num ++）{ 
  console.log（num）; // 0 1 2
 } 
console.log（num）; // 10
```