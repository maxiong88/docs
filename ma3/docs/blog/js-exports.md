---
title: es6模块 or commonjs模块
description: '再看axios源码的时候看到了 module.exports module.exports.default export export default'
sidebar: 'auto'
time: '2015-01-03'
prev: ''
next: ''
---

+ [https://exploringjs.com/es6/ch_modules.html](https://exploringjs.com/es6/ch_modules.html)
+ [https://addyosmani.com/writing-modular-js/](https://addyosmani.com/writing-modular-js/)
+ [https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/)

## 16.1 Overview 概述

JavaScript has had modules for a long time. However, they were implemented via libraries, not built into the language. ES6 is the first time that JavaScript has built-in modules.
JavaScript拥有模块已经有很长一段时间了。但是，它们是通过库实现的（requirejs、seajs），而不是内置到语言中。ES6是JavaScript第一次内置模块。


ES6 modules are stored in files. There is exactly one module per file and one file per module. You have two ways of exporting things from a module. These two ways can be mixed, but it is usually better to use them separately.
ES6模块存储在文件中。每个文件只有一个模块，每个模块只有一个文件。有两种方法可以从模块中导出内容。这两种方法可以混合使用，但通常最好分开使用。

### 16.1.1 Multiple named exports 多命名导出

There can be multiple named exports:
可以有多少命名导出

``` js
//------ lib.js ------
export const sqrt = Math.sqrt;
export function square(x) {
    return x * x;
}
export function diag(x, y) {
    return sqrt(square(x) + square(y));
}

//------ main.js ------
import { square, diag } from 'lib';
console.log(square(11)); // 121
console.log(diag(4, 3)); // 5
```

You can also import the complete module:
可以导出完整（全部）模块

``` js
//------ main.js ------
import * as lib from 'lib';
console.log(lib.square(11)); // 121
console.log(lib.diag(4, 3)); // 5
```

### 16.1.2 Single default export 默认导出

There can be a single default export. For example, 
可以有一个默认导出

``` js
// a function:
//------ myFunc.js ------
export default function () { ··· } // no semicolon!

//------ main1.js ------
import myFunc from 'myFunc';
myFunc();

// Or a class:
//------ MyClass.js ------
export default class { ··· } // no semicolon!

//------ main2.js ------
import MyClass from 'MyClass';
const inst = new MyClass();
```

Note that there is no semicolon at the end if you default-export a function or a class (which are anonymous declarations).
请注意，如果默认导出函数或类（它们是匿名声明），则末尾没有分号。

### 16.1.3 Browsers: scripts versus modules  浏览器中 

||Scripts|Modules|
|:---|:---|:---|
|HTML element	|`<script>`|	`<script type="module">`|
|Default mode|	non-strict|	strict|
|Top-level variables are|	global|	local to module|
|Value of this at top level(this值)|	window|	undefined|
|Executed|	synchronously(同步)|	asynchronously(异步)|
|Declarative imports (import statement)|	no|	yes|
|Programmatic imports (Promise-based API)|	yes|	yes|
|File extension|	.js|	.js|

## 16.2 Modules in JavaScript js中的模块


Even though JavaScript never had built-in modules, the community has converged on a simple style of modules, which is supported by libraries in ES5 and earlier. This style has also been adopted by ES6:
尽管JavaScript从来没有内置模块，但是社区已经融合到一种简单的模块风格，这是ES5和更早版本的库所支持的。ES6也采用了这种风格：

+ Each module is a piece of code that is executed once it is loaded. (每个模块都是一段代码，一旦加载就执行。)
+ In that code, there may be declarations (variable declarations, function declarations, etc.).(在该代码中，可能有声明（变量声明、函数声明等）。)
  - By default, these declarations stay local to the module.(默认情况下，这些声明保留在模块的本地。)
  - You can mark some of them as exports, then other modules can import them.(您可以将其中一些标记为导出，然后其他模块可以导入它们。)
+ A module can import things from other modules. It refers to those modules via module specifiers, strings that are either:(模块可以从其他模块导入内容。通过模块标识符说明符导入)
  _ Relative paths `('../model/user')`: these paths are interpreted relatively to the location of the importing module. The file extension .js can usually be omitted.（相对路径）
  - Absolute paths `('/lib/js/helpers')`: point directly to the file of the module to be imported.
  - Names `('util')`: What modules names refer to has to be configured.（绝对路径）
+ Modules are singletons. Even if a module is imported multiple times, only a single “instance” of it exists.（模块是单例的。即使一个模块被多次导入，它也只存在一个“实例”。）

This approach to modules avoids global variables, the only things that are global are module specifiers.
这种模块方法避免了全局变量，唯一全局变量是模块标识符（说明符）。

### 16.2.1 es5 modules

两个最重要的（不幸的是不相容的）标准是：

+ CommonJS Modules： 这个标准的主要实现在Node.js中（Node.js模块有一些超出CommonJS的特性）。特点：
  - Compact syntax 紧凑语法
  - Designed for synchronous loading and servers  设计用于同步加载和服务器

+ Asynchronous Module Definition (AMD):这个标准最流行的实现是RequireJS。特点：
  - 稍微复杂一点的语法，使AMD能够在不使用eval（）的情况下工作（或编译步骤）
  - 为异步加载和浏览器设计

以上只是ES5模块的一个简化说明。如果你想要更深入的资料，可以看看 [Addy Osmani的“使用AMD、CommonJS和ES Harmony编写模块化JavaScript”](http://addyosmani.com/writing-modular-js/)。

### 16.2.2 es6 modules

es6模块的目标是创建一种CommonJS和AMD用户都满意的格式：

+ Similarly to CommonJS, they have a compact syntax, a preference for single exports and support for cyclic dependencies。与CommonJS类似，它们有一个紧凑的语法、对单个导出的偏好和对循环依赖的支持。
+ Similarly to AMD, they have direct support for asynchronous loading and configurable module loading.。与AMD类似，它们直接支持异步加载和可配置模块加载。

内置到语言中，ES6模块可以超越CommonJS和AMD（详细信息将在后面介绍）：
  - Their syntax is even more compact than CommonJS’s. 它们的语法甚至比CommonJS更紧凑。
  - Their structure can be statically analyzed (for static checking, optimization, etc.). 它们的结构可以进行静态分析（用于静态检查、优化等）。
  - Their support for cyclic dependencies is better than CommonJS’s. 他们对循环依赖的支持比CommonJS好。

The ES6 module standard has two parts: ES6模块标准分为两部分：
+ Declarative syntax (for importing and exporting) 声明式语法
+ Programmatic loader API: to configure how modules are loaded and to conditionally load modules 编程加载程序API：配置如何加载模块并有条件地加载模块

## 16.3 The basics of ES6 modules

There are two kinds of exports: named exports (several per module) and default exports (one per module). [As explained later](#sec_mixing-named-and-default-exports), it is possible use both at the same time, but usually best to keep them separate.

两种导出方式：named exports(可以存在多个)、default exports(模块中只能存在一个)

### 16.3.1 Named exports (several per module)

A module can export multiple things by prefixing its declarations with the keyword export. These exports are distinguished by their names and are called named exports.
模块可以通过在其声明前面加上关键字`export`来导出多个内容。这些导出按名称区分，称为命名导出。

``` js
//------ lib.js ------
export const sqrt = Math.sqrt;
export function square(x) {
    return x * x;
}
export function diag(x, y) {
    return sqrt(square(x) + square(y));
}

//------ main.js ------
import { square, diag } from 'lib';
console.log(square(11)); // 121
console.log(diag(4, 3)); // 5
```
There are other ways to specify named exports (which are explained later), but I find this one quite convenient: simply write your code as if there were no outside world, then label everything that you want to export with a keyword.
有其他方法可以指定命名导出（稍后将解释），但我发现这一种方法非常方便：只要编写代码，就好像没有外部世界一样，然后用关键字标记要导出的所有内容。

If you want to, you can also import the whole module and refer to its named exports via property notation:
如果需要，还可以导入整个模块，并通过属性表示法引用其命名导出：

``` js
//------ main.js ------
import * as lib from 'lib';
console.log(lib.square(11)); // 121
console.log(lib.diag(4, 3)); // 5
```

The same code in CommonJS syntax: For a while, I tried several clever strategies to be less redundant with my module exports in Node.js. Now I prefer the following simple but slightly verbose style that is reminiscent of the [revealing module pattern](http://christianheilmann.com/2007/08/22/again-with-the-module-pattern-reveal-something-to-the-world/):
CommonJS语法中的相同代码有一段时间，我尝试了一些聪明的策略来减少Node.js中模块导出的冗余。现在，我更喜欢以下简单但略显冗长的样式，这种样式让人想起显示模块模式：

``` js
//------ lib.js ------
var sqrt = Math.sqrt;
function square(x) {
    return x * x;
}
function diag(x, y) {
    return sqrt(square(x) + square(y));
}
module.exports = {
    sqrt: sqrt,
    square: square,
    diag: diag,
};

//------ main.js ------
var square = require('lib').square;
var diag = require('lib').diag;
console.log(square(11)); // 121
console.log(diag(4, 3)); // 5
```
???????

### 16.3.2 Default exports (one per module) 

Modules that only export single values are very popular in the Node.js community. 
But they are also common in frontend development where you often have classes for models and components, with one class per module. 
An ES6 module can pick a default export, the main exported value. Default exports are especially easy to import.
在Node.js社区中，只导出单个值的模块非常流行。

但它们在前端开发中也很常见，在前端开发中，通常有模型和组件类，每个模块有一个类。

ES6模块可以选择默认导出，即主导出值。默认导出特别容易导入。

The following ECMAScript 6 module “is” a single function:
以下ECMAScript 6模块“是”单个函数：

``` js
//------ myFunc.js ------
export default function () {} // no semicolon!

//------ main1.js ------
import myFunc from 'myFunc';
myFunc();
```

An ECMAScript 6 module whose default export is a class looks as follows:

``` js
//------ MyClass.js ------
export default class {} // no semicolon!

//------ main2.js ------
import MyClass from 'MyClass';
const inst = new MyClass();
```
There are two styles of default exports:

+ Labeling declarations 标签声明
+ Default-exporting values directly 直接导出默认值

#### 16.3.2.1 Default export style 1: labeling declarations

You can prefix any function declaration (or generator function declaration) or class declaration with the keywords export default to make it the default export:
可以在任何函数声明（或生成器函数声明）或类声明前面加上关键字export default，使其成为默认导出：

``` js
export default function foo() {} // no semicolon!
export default class Bar {} // no semicolon!
```


You can also omit the name in this case. That makes default exports the only place where JavaScript has anonymous function declarations and anonymous class declarations:
在这种情况下，也可以省略名称。这使得默认导出成为JavaScript具有匿名函数声明和匿名类声明的唯一位置：

``` js
export default function () {} // no semicolon!
export default class {} // no semicolon!
```

##### 16.3.2.1.1 Why anonymous function declarations and not anonymous function expressions?

When you look at the previous two lines of code, you’d expect the operands of export default to be expressions. They are only declarations for reasons of consistency: operands can be named declarations, interpreting their anonymous versions as expressions would be confusing (even more so than introducing new kinds of declarations).

If you want the operands to be interpreted as expressions, you need to use parentheses:

``` js
export default (function () {});
export default (class {});
```

??????

###  16.3.2.2 Default export style 2: default-exporting values directly

The values are produced via expressions:
``` js
export default 'abc';
export default foo();
export default /^xyz$/;
export default 5 * 7;
export default { no: false, yes: true };
```
Each of these default exports has the following structure.
``` js
export default «expression»;
```
That is equivalent to:
```js
const __default__ = «expression»;
export { __default__ as default }; // (A)
```
The statement in line A is an export clause (which is explained in a later section).

#### 16.3.2.2.1 Why two default export styles?

The second default export style was introduced because variable declarations can’t be meaningfully turned into default exports if they declare multiple variables:

export default const foo = 1, bar = 2, baz = 3; // not legal JavaScript!
Which one of the three variables foo, bar and baz would be the default export?

### 16.3.3 Imports and exports must be at the top level 

As explained in more detail later, the structure of ES6 modules is static, you can’t conditionally import or export things. That brings a variety of benefits.
正如后面更详细的解释，ES6模块的结构是静态的，不能有条件地导入或导出东西。这带来了很多好处。

This restriction is enforced syntactically by only allowing imports and exports at the top level of a module:

``` js
if (Math.random()) {
    import 'foo'; // SyntaxError
}

// You can’t even nest `import` and `export`
// inside a simple block:
{
    import 'foo'; // SyntaxError
}
```

### 16.3.4 Imports are hoisted 被提升

Module imports are hoisted (internally moved to the beginning of the current scope). Therefore, it doesn’t matter where you mention them in a module and the following code works without any problems:
提升模块导入（内部移动到当前作用域的开头）。因此，在模块中提到它们并不重要，以下代码可以正常工作：

``` js
foo();

import { foo } from 'my_module';
```

## CommonJS模块规范

exports 

module.exports

::: tip
通过 require('') 导出
exports是引用 module.exports的值。
module.exports 被改变的时候，exports不会被改变，而模块导出的时候，
真正导出的执行是module.exports，而不是exports
:::

``` js
module.exports = Axios
module.exports.default = Axios

会使Axios陷入无限引用状态

```

## ES6模块规范

export 输出

import 输出进口引入

export default 输出 未定义

::: tip
用export default，import语句不需要使用大括号；
使用export default命令，为模块指定默认输出；
一个模块只能有一个默认输出，所以export default只能使用一次；
用export，对应的import语句需要使用大括号；
如果在一个页面 既包含export  有包含export default 只能通过 import * as obj from '' 导出，
按 es6 的规范 import * as obj from "xxx" 会将 "xxx" 中所有 export 导出的内容组合成一个对象返回。如果都使用 es6 的规范，这个是很明确的。
:::


## babel

我们在写export、export default的时候babel都会给我们转化成

``` js{7}
export var name="李四";

export default {}

转


"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var name = exports.name = "李四";

exports.default = {};
```
