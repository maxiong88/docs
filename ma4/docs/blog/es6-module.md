---
title: '[精]es6模块 or commonjs模块'
description: '在review代码的时候，提了一句export与export default是否可以共存。在模块中导入是导出的什么（副本-拷贝、视图）'
sidebar: 'auto'
time: '2018-01-03'
prev: ''
next: ''
imgPIc: '../assets/img/17.jpg'
---

## 16.1 Overview 概述

JavaScript has had modules for a long time. However, they were implemented via libraries, not built into the language. ES6 is the first time that JavaScript has built-in modules.
JavaScript拥有模块已经有很长一段时间了。但是，它们是通过库实现的（requirejs、seajs），而不是内置到语言中。ES6是JavaScript第一次内置模块。


ES6 modules are stored in files. There is exactly one module per file and one file per module. You have two ways of exporting things from a module. These two ways can be mixed, but it is usually better to use them separately.
ES6模块存储在文件中。每个文件只有一个模块，每个模块只有一个文件。有两种方法可以从模块中导出内容。这两种方法可以混合使用，但通常最好分开使用。

### 16.1.1 Multiple named exports 多命名导出

There can be multiple named exports:
可以导出多个命名

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

## 16.4 Importing and exporting in detail 

### 16.4.1 Importing styles import关键字
ECMAScript 6 provides several styles of importing2:
提供几种类型的导入

``` js
// Default import:
  import localName from 'src/my_lib';
// Namespace import: imports the module as an object (with one property per named export). 命名空间
  import * as my_lib from 'src/my_lib';
// Named imports: 名称导入
  import { name1, name2 } from 'src/my_lib';
// You can rename named imports: 重命名导入

  // Renaming: import `name1` as `localName1`
  import { name1 as localName1, name2 } from 'src/my_lib';

  // Renaming: import the default export as `foo` 
  import { default as foo } from 'src/my_lib';
// Empty import: only loads the module, doesn’t import anything. The first such import in a program executes the body of the module.
// 空导入，只加载模块，不导入任何内容
  import 'src/my_lib';
// There are only two ways to combine these styles and the order in which they appear is fixed; the default export always comes first.
// 只有两种方法可以组合这些样式，并且它们的显示顺序是固定的；默认的导出总是排在第一位。

// Combining a default import with a namespace import:
  import theDefault, * as my_lib from 'src/my_lib';
// Combining a default import with named imports
  import theDefault, { name1, name2 } from 'src/my_lib';
```

### 16.4.2 Named exporting styles: inline versus clause 导出
There are two ways in which you can export named things inside modules.
有两种方法可以在模块中导出命名对象。

On one hand, you can mark declarations with the keyword export.
一方面，可以使用关键字export标记声明。

``` js
export var myVar1 = ···;
export let myVar2 = ···;
export const MY_CONST = ···;

export function myFunc() {
    ···
}
export function* myGeneratorFunc() {
    ···
}
export class MyClass {
    ···
}
```

On the other hand, you can list everything you want to export at the end of the module (which is similar in style to the revealing module pattern).
另一方面，您可以在模块末尾列出要导出的所有内容（在样式上类似于显示模块模式）。

``` js
const MY_CONST = ···;
function myFunc() {
    ···
}

export { MY_CONST, myFunc };
// You can also export things under different names: 您还可以导出不同名称的内容：

export { MY_CONST as FOO, myFunc };
```

### 16.4.3 Re-exporting 
Re-exporting means adding another module’s exports to those of the current module. You can either add all of the other module’s exports:
重新导出意味着将另一个模块的导出添加到当前模块的导出中。您可以添加其他模块的所有导出：

`export * from 'src/other_module';`
Default exports are ignored3 by export *.

Or you can be more selective (optionally while renaming):

``` js
export { foo, bar } from 'src/other_module';

// Renaming: export other_module’s foo as myFoo
export { foo as myFoo, bar } from 'src/other_module';
```

### 16.4.4 All exporting styles 
ECMAScript 6 provides several styles of exporting4:
ECMAScript 6提供了几种类型的导出

``` js
// Re-exporting:
// Re-export everything (except for the default export):
  export * from 'src/other_module';
// Re-export via a clause:
  export { foo as myFoo, bar } from 'src/other_module';

  export { default } from 'src/other_module';
  export { default as foo } from 'src/other_module';
  export { foo as default } from 'src/other_module';
// Named exporting via a clause:
  export { MY_CONST as FOO, myFunc };
  export { foo as default };
// Inline named exports:
// Variable declarations:
  export var foo;
  export let foo;
  export const foo;
// Function declarations:
  export function myFunc() {}
  export function* myGenFunc() {}
// Class declarations:
  export class MyClass {}
// Default export:
// Function declarations (can be anonymous here):
  export default function myFunc() {}
  export default function () {}

  export default function* myGenFunc() {}
  export default function* () {}
// Class declarations (can be anonymous here):
  export default class MyClass {}
  export default class {}
// Expressions: export values. Note the semicolons at the end.
  export default foo;
  export default 'Hello world!';
  export default 3 * 7;
  export default (function () {});
```
### 16.4.5 Having both named exports and a default export in a module  在模块中同时具有命名导出和默认导出
The following pattern is surprisingly common in JavaScript: A library is a single function, but additional services are provided via properties of that function. Examples include jQuery and Underscore.js. The following is a sketch of Underscore as a CommonJS module:
以下模式在JavaScript中非常常见：一个库是一个单独的函数，但是其他服务是通过该函数的属性提供的。例如jQuery和underline.js。以下是作为CommonJS模块的下划线示意图：
``` js
//------ underscore.js ------
var _ = function (obj) {
    ···
};
var each = _.each = _.forEach =
    function (obj, iterator, context) {
        ···
    };
module.exports = _;

//------ main.js ------
var _ = require('underscore');
var each = _.each;
```

With ES6 glasses, the function _ is the default export, while each and forEach are named exports. As it turns out, you can actually have named exports and a default export at the same time. As an example, the previous CommonJS module, rewritten as an ES6 module, looks like this:
对于ES6，函数是默认的导出，而每个和forEach都被命名为导出。事实证明，您实际上可以同时拥有命名导出和默认导出。例如，先前的CommonJS模块重写为ES6模块，如下所示：
``` js
//------ underscore.js ------
export default function (obj) {
    ···
}
export function each(obj, iterator, context) {
    ···
}
export { each as forEach };

//------ main.js ------
import _, { each } from 'underscore';

```
Note that the CommonJS version and the ECMAScript 6 version are only roughly similar. The latter has a flat structure, whereas the former is nested.
注意CommonJS版本和ECMAScript 6版本只是大致相似的。后者有一个扁平的结构，而前者是嵌套的。

#### 16.4.5.1 Recommendation: avoid mixing default exports and named exports  建议：避免混合默认导出和命名导出
I generally recommend to keep the two kinds of exporting separate: per module, either only have a default export or only have named exports.
我通常建议将这两种导出分开：每个模块，要么只有默认导出，要么只有命名导出。

However, that is not a very strong recommendation; it occasionally may make sense to mix the two kinds. One example is a module that default-exports an entity. For unit tests, one could additionally make some of the internals available via named exports.
然而，这并不是一个很有力的建议；有时将这两种方法混合起来可能是有意义的。一个例子是默认导出实体的模块。对于单元测试，还可以通过命名导出使一些内部组件可用。

#### 16.4.5.2 The default export is just another named export  默认导出只是另一个命名导出
The default export is actually just a named export with the special name default. That is, the following two statements are equivalent:
默认导出实际上只是一个具有特殊名称默认值的命名导出。也就是说，以下两个语句是等价的：
``` js
import { default as foo } from 'lib';
import foo from 'lib';
```
Similarly, the following two modules have the same default export:
类似地，以下两个模块具有相同的默认导出：
``` js
//------ module1.js ------
export default function foo() {} // function declaration!

//------ module2.js ------
function foo() {}
export { foo as default };
```
#### 16.4.5.3 default: OK as export name, but not as variable name 默认：可以作为导出名，但不能作为变量名
You can’t use reserved words (such as default and new) as variable names, but you can use them as names for exports (you can also use them as property names in ECMAScript 5). If you want to directly import such named exports, you have to rename them to proper variables names.
不能将保留字（如default和new）用作变量名，但可以将它们用作导出的名称（也可以在ECMAScript 5中将它们用作属性名）。如果要直接导入此类命名导出，则必须将它们重命名为适当的变量名。

That means that default can only appear on the left-hand side of a renaming import:
这意味着默认值只能出现在重命名导入的左侧：
``` js
import { default as foo } from 'some_module';
//And it can only appear on the right-hand side of a renaming export:

export { foo as default };
//In re-exporting, both sides of the as are export names:

export { myFunc as default } from 'foo';
export { default as otherFunc } from 'foo';

// The following two statements are equivalent: 等效
export { default } from 'foo';
export { default as default } from 'foo';
```
#### 16.4.3.1 Making a re-export the default export  使重新导出成为默认导出

The following statement makes the default export of another module foo the default export of the current module:
`export { default } from 'foo';`

The following statement makes the named export myFunc of module foo the default export of the current module:
`export { myFunc as default } from 'foo';`

## 16.7 Details: imports as views on exports 细节：

Imports work differently in CommonJS and ES6: 差异

+ In CommonJS, imports are copies of exported values. CommonJS 导入时导出值的副本
+ In ES6, imports are live read-only views on exported values. ES6 导入时对导出值的实时只读视图
The following sections explain what that means.
以下各节解释这意味着什么。

### 16.7.1 In CommonJS, imports are copies of exported values 在CommonJS中，导入是导出值的副本
With CommonJS (Node.js) modules, things work in relatively familiar ways.
于CommonJS（Node.js）模块，事情以相对熟悉的方式工作。

If you import a value into a variable, the value is copied twice: once when it is exported (line A) and once it is imported (line B).
如果将值导入变量，则会复制两次：一次是导出时（a行），一次是导入时（B行）。
``` js
//------ lib.js ------
var counter = 3;
function incCounter() {
    counter++;
}
module.exports = {
    counter: counter, // (A)
    incCounter: incCounter,
};

//------ main1.js ------
var counter = require('./lib').counter; // (B)
var incCounter = require('./lib').incCounter;

// The imported value is a (disconnected) copy of a copy
console.log(counter); // 3
incCounter();
console.log(counter); // 3

// The imported value can be changed
counter++;
console.log(counter); // 4
```
If you access the value via the exports object, it is still copied once, on export:
如果通过导出对象访问该值，则在导出时仍会复制该值一次：

``` js
//------ main2.js ------
var lib = require('./lib');

// The imported value is a (disconnected) copy
console.log(lib.counter); // 3
lib.incCounter();
console.log(lib.counter); // 3

// The imported value can be changed
lib.counter++;
console.log(lib.counter); // 4
```

### 16.7.2 In ES6, imports are live read-only views on exported values 
In contrast to CommonJS, imports are views on exported values. In other words, every import is a live connection to the exported data. Imports are read-only:
与CommonJS相反，imports是关于导出值的视图。换句话说，每个导入都是到导出数据的实时连接。导入是只读的：

Unqualified `imports (import x from 'foo')` are like const-declared variables.
The properties of a module object foo `(import * as foo from 'foo')` are like the properties of a frozen object.
The following code demonstrates how imports are like views:
``` js
//------ lib.js ------
export let counter = 3;
export function incCounter() {
    counter++;
}

//------ main1.js ------
import { counter, incCounter } from './lib';

// The imported value `counter` is live
console.log(counter); // 3
incCounter();
console.log(counter); // 4

// The imported value can’t be changed
counter++; // TypeError
```
If you import the module object via the asterisk (*), you get the same results:
``` js
//------ main2.js ------
import * as lib from './lib';

// The imported value `counter` is live
console.log(lib.counter); // 3
lib.incCounter();
console.log(lib.counter); // 4

// The imported value can’t be changed
lib.counter++; // TypeError
```
Note that while you can’t change the values of imports, you can change the objects that they are referring to. For example:
请注意，虽然不能更改导入的值，但可以更改它们所引用的对象。例如：
``` js
//------ lib.js ------
export let obj = {};

//------ main.js ------
import { obj } from './lib';

obj.prop = 123; // OK
obj = {}; // TypeError
```
#### 16.7.2.1 Why a new approach to importing? 
Why introduce such a relatively complicated mechanism for importing that deviates from established practices?

Cyclic dependencies: The main advantage is that it supports cyclic dependencies even for unqualified imports.
Qualified and unqualified imports work the same. In CommonJS, they don’t: a qualified import provides direct access to a property of a module’s export object, an unqualified import is a copy of it.
You can split code into multiple modules and it will continue to work (as long as you don’t try to change the values of imports).
On the flip side, module folding, combining multiple modules into a single module becomes simpler, too.
In my experience, ES6 imports just work, you rarely have to think about what’s going on under the hood.

## 16.8 Design goals for ES6 modules 设计目标


If you want to make sense of ECMAScript 6 modules, it helps to understand what goals influenced their design. The major ones are:
如果您想理解EcmaScript6模块，那么了解哪些目标影响了它们的设计将有助于理解。主要是：

+ Default exports are favored 默认导出受到青睐
+ Static module structure 静态模块结构
+ Support for both synchronous and asynchronous loading 支持同步和异步加载
+ Support for cyclic dependencies between modules 支持模块之间的循环依赖关系

The following subsections explain these goals. 以下小节解释这些目标。

### 16.8.1 Default exports are favored

ECMAScript 6 favors the single/default export style, and gives the sweetest syntax to importing the default. 
Importing named exports can and even should be slightly less concise.

### Static module structure 静态模块结构

当前的JavaScript模块格式具有动态结构：导入和导出的内容可以在运行时更改。ES6引入自己的模块格式的一个原因是启用静态结构，这有几个好处。但是在我们开始之前，让我们来看看静态结构意味着什么。
这意味着您可以在编译时（静态地）确定导入和导出—您只需要查看源代码，不必执行它。ES6在语法上强制执行此操作：您只能在顶层导入和导出（永远不能嵌套在条件语句中）。并且导入和导出语句没有动态部分（不允许变量等）。
下面是两个没有静态结构的CommonJS模块示例。

``` js
// 在第一个示例中，必须运行代码以了解它导入的内容：
var my_lib;
if (Math.random()) {
    my_lib = require('foo');
} else {
    my_lib = require('bar');
}
// 在第二个示例中，必须运行代码以了解它导出的内容：
if (Math.random()) {
    exports.baz = ···;
}
```

EcmaScript6模块的灵活性较差，并强制您保持静态。因此，您将获得几个好处，下面将介绍这些好处。

#### 16.8.2.1 Benefit: dead code elimination during bundling  构建期间消除无用代码
In frontend development, modules are usually handled as follows:
在前端开发中，模块通常处理如下：

+ During development, code exists as many, often small, modules. 在开发过程中，代码存在于尽可能多的（通常是小的）模块中。
+ For deployment, these modules are bundled into a few, relatively large, files. 对于部署，这些模块被捆绑成几个相对较大的文件。
The reasons for bundling are: 捆绑的原因是：

1、Fewer files need to be retrieved in order to load all modules. 为了加载所有模块，需要检索的文件更少。
2、Compressing the bundled file is slightly more efficient than compressing separate files. 压缩捆绑的文件比压缩单独的文件稍微高效一些。
3、During bundling, unused exports can be removed, potentially resulting in significant space savings. 在绑定期间，可以删除未使用的导出，这可能会显著节省空间。

Reason #1 is important for HTTP/1, where the cost for requesting a file is relatively high. That will change with HTTP/2, which is why this reason doesn’t matter there.
原因1对于HTTP/1很重要，因为请求文件的成本相对较高。这将随着HTTP/2而改变，这就是为什么这个原因在那里并不重要。

Reason #3 will remain compelling. It can only be achieved with a module format that has a static structure.
第三个理由仍将令人信服。它只能用具有静态结构的模块格式来实现。


[David Herman](http://esdiscuss.org/topic/moduleimport#content-0)

#### 16.8.2.6 Benefit: ready for types  优点：适合类型
Static type checking imposes constraints similar to macros: it can only be done if type definitions can be found statically. Again, types can only be imported from modules if they have a static structure.
静态类型检查强制执行类似于宏的约束：只有在可以静态找到类型定义时才能执行。同样，类型只能从具有静态结构的模块中导入。

Types are appealing because they enable statically typed fast dialects of JavaScript in which performance-critical code can be written. One such dialect is [Low-Level JavaScript](http://lljs.org/) (LLJS).
类型之所以吸引人，是因为它们支持JavaScript的静态类型快速方言，在这种方言中可以编写性能关键的代码。其中一种方言是低级JavaScript（LLJS）。

#### 16.8.2.7 Benefit: supporting other languages 优点：支持其他语言
If you want to support compiling languages with macros and static types to JavaScript then JavaScript’s modules should have a static structure, for the reasons mentioned in the previous two sections.
如果您希望支持将带有宏和静态类型的语言编译为JavaScript，那么JavaScript的模块应该具有静态结构，原因在前两节中提到。

#### 16.8.2.8 Source of this section 
[“Static module resolution” by David Herman,静态模块分析](http://calculist.org/blog/2012/06/29/static-module-resolution/)

### 16.8.3 Support for both synchronous and asynchronous loading 同步和异步加载支持
ECMAScript 6 modules must work independently of whether the engine loads modules synchronously (e.g. on servers) or asynchronously (e.g. in browsers). Its syntax is well suited for synchronous loading, asynchronous loading is enabled by its static structure: Because you can statically determine all imports, you can load them before evaluating the body of the module (in a manner reminiscent of AMD modules).
ECMAScript 6模块必须独立于引擎,无论是同步加载模块（例如在服务器上）还是异步加载模块（例如在浏览器中）。其语法非常适合同步加载，异步加载由其静态结构启用：
因为可以静态地确定所有导入，所以可以在评估模块主体之前加载它们（以类似于AMD模块的方式）。

### 16.8.4 Support for cyclic dependencies between modules 支持模块之间的循环依赖性
Support for cyclic dependencies was a key goal for ES6 modules. Here is why:
支持循环依赖性是ES6模块的一个关键目标。原因如下：

Cyclic dependencies are not inherently evil. Especially for objects, you sometimes even want this kind of dependency. For example, in some trees (such as DOM documents), parents refer to children and children refer back to parents. In libraries, you can usually avoid cyclic dependencies via careful design. In a large system, though, they can happen, especially during refactoring. Then it is very useful if a module system supports them, because the system doesn’t break while you are refactoring.
循环依赖并不是天生的邪恶。尤其是对于对象，有时甚至需要这种依赖关系。例如，在某些树（如DOM文档）中，父对象引用子对象，子对象引用回父对象。在库中，通常可以通过仔细设计避免循环依赖。但是，在大型系统中，它们可能会发生，特别是在重构期间。如果一个模块系统支持它们，这将非常有用，因为在重构时系统不会崩溃。

The Node.js documentation acknowledges the importance of cyclic dependencies and Rob Sayre provides additional evidence:
Node.js文档承认循环依赖的重要性

## 16.9 FAQ: modules 模块，常见问题

### 16.9.1 Can I use a variable to specify from which module I want to import? 是否可以使用变量指定要从哪个模块导入？
The import statement is completely static: its module specifier is always fixed. 
If you want to dynamically determine what module to load, you need to use [the programmatic loader API](#sec_module-loader-api):
import语句是完全静态的：它的模块说明符总是固定的。如果要动态确定要加载的模块，则需要使用编程加载程序API：

``` js
const moduleSpecifier = 'module_' + Math.random();
System.import(moduleSpecifier)
.then(the_module => {
    // Use the_module
})
```

### 16.9.2 Can I import a module conditionally or on demand? 我可以有条件地或按需导入模块吗？
Import statements must always be at the top level of modules. 
That means that you can’t nest them inside if statements, functions, etc. 
Therefore, you have to use [the programmatic loader API](#sec_module-loader-api) if you want to load a module conditionally or on demand:
导入语句必须始终位于模块的顶层。这意味着您不能将它们嵌套在if语句、函数等内部。因此，如果要有条件或按需加载模块，必须使用编程加载程序API：

``` js
if (Math.random()) {
    System.import('some_module')
    .then(some_module => {
        // Use some_module
    })
}
```

### 16.9.3 Can I use variables in an import statement? 是否可以在import语句中使用变量？ 不能
No, you can’t. Remember – what is imported must not depend on anything that is computed at runtime. Therefore:
记住-导入的内容不能依赖于运行时计算的任何内容。
``` js
// Illegal syntax:
import foo from 'some_module'+SUFFIX;
```

### 16.9.4 Can I use destructuring in an import statement? 可以再import语句中使用解构吗？不能
No you can’t. The import statement only looks like destructuring, but is completely different (static, imports are views, etc.).
`import`语句看起来只是解构，但完全不同（static、imports是视图等）
Therefore, you can’t do something like this in ES6:

``` js
// Illegal syntax: 非法语法
import { foo: { bar } } from 'some_module';
```

### 16.9.5 Are named exports necessary? Why not default-export objects? 是否需要命名导出？为什么不使用 `export default`导出对象
You may be wondering – why do we need named exports if we could simply default-export objects (like in CommonJS)? 
The answer is that you can’t enforce a static structure via objects and lose all of the associated advantages (which are explained in this chapter).
答案是，您不能通过对象强制执行静态结构，从而失去所有相关的优点（本章将对此进行解释）。

### 16.9.6 Can I eval() the code of module? 能用eval执行模块代码

模块对于`eval()`来说是 height-level a construct;

语法上，`eval()`接受脚本(不允许`import`、`export`)，而不是模块

## 16.10 Advantages of ECMAScript 6 modules es6 模块优势

+ More compact syntax 更紧凑的语法
+ Static module structure (helping with dead code elimination, optimizations, static checking and more) 静态模块结构（有助于消除死代码、优化、静态检查等）
+ Automatic support for cyclic dependencies 自动支持循环依赖项

+ No more UMD 通用模块重新定义
+ New browser APIs become modules instead of global variables or properties of navigator.新的浏览器api成为模块，而不是导航器的全局变量或属性。
+ No more objects-as-namespaces 不再有对象作为命名空间

## 16.11 Further reading 延伸阅读

+ [avaScript Modules--Yehuda Katz](https://github.com/wycats/jsmodules)

### 书写方式

``` js
// [1]

export const a = 1;
export const b = 2

// [2]

const a = 1;
const b = 2;
export = {a,b}

```

不区分优先写法

### export、export default混合使用

``` js
// [1]
export const a = 1;
export default function s(){}

// [2]
import s,{a} from './1.js'
```

### 项目常量非常多

``` js
// 写在一个文件里面 [1]
export const a = 1;
...
export const b = 2;

// 创建constants目录，合并在index.js中,使用时直接加载index.js [2]

//---constants/a.js
export const a = 1
//---constants/b.js
export const b = 2
//---constants/index.js
export {a} from './a.js'
export {b} from './b.js'

//---script.js
import {a,b} from './constants/index'

```

第[2]种框架用的多，一般项目就是[1]就够了

### 加载规则

+ defer 页面渲染完在执行模块脚本
+ async 只要js加载完成渲染引擎会中断渲染，js立即执行


### 参考文献

+ [https://exploringjs.com/es6/ch_modules.html](https://exploringjs.com/es6/ch_modules.html)
+ [https://addyosmani.com/writing-modular-js/](https://addyosmani.com/writing-modular-js/)
+ [https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/)
+ [https://es6.ruanyifeng.com/#docs/module](https://es6.ruanyifeng.com/#docs/module)


