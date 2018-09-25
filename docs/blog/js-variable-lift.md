---
https://segmentfault.com/a/1190000008213835
https://www.jianshu.com/p/0f49c88cf169
https://gist.github.com/rwaldron/ca35924d59ddc60a6aa165e1e4a3acda
https://dmitripavlutin.com/variables-lifecycle-and-why-let-is-not-hoisted/
https://stackoverflow.com/questions/31219420/are-variables-declared-with-let-or-const-not-hoisted-in-es6/31222689#31222689
http://www.ecma-international.org/ecma-262/6.0/#sec-for-statement-runtime-semantics-labelledevaluation
https://www.baidu.com/s?wd=js%20%20TDZ&rsv_spt=1&rsv_iqid=0xccf18bb10005d9de&issp=1&f=8&rsv_bp=1&rsv_idx=2&ie=utf-8&rqlang=cn&tn=baiduhome_pg&rsv_enter=0&oq=TDZ&rsv_t=8f15HAiu0xHN6lLCMKkV27bU2vPqORr%2FRzNGfYHr2BBSvTS3sItpzUV0nvXhMEbCQ3tk&rsv_pq=d144cc7800077f31&inputT=2660&rsv_sug3=52&rsv_sug1=34&rsv_sug7=100&rsv_sug2=0&rsv_sug4=3322

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



















在 js种所有的声明`var`，`let`，`const`，`function`，`function*`，`class` 都存在提升 hoisted

var/ function/ function*声明和let/ const/ class声明之间的区别是初始化

在作用域顶部创建绑定时，
前者（var/ function/ function*）使用undefined或者（生成器）函数初始化。
然而，词汇声明（let/ const/ class）的变量保持未初始化。
这意味着ReferenceError（引用错误）当您尝试访问它时会引发异常
只有在评估let/ const/ class语句时，才会初始化它，
之前（上面）的所有内容称为时间死区。

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

um在声明之前访问该变量var num，因此将其计算为undefined。
该函数function getPi() {...}在文件末尾定义。但是，该函数可以在声明之前调用getPi()，因为它被提升到范围的顶部。

这是经典的变量提升 Hoisting

首先你声明或描述一个未知的术语。然后才用它做短语。let 鼓励您使用变量来遵循这种方法。


当引擎使用变量时，它们的生命周期包括以下阶段：
声明阶段正在范围内注册变量。
初始化阶段是分配内存并为范围中的变量创建绑定。在此步骤中，变量将自动初始化为undefined。
赋值阶段是为初始化变量赋值。

当变量通过声明阶段时，它具有单一化状态，但未达到初始化。

请注意，就变量生命周期而言，声明阶段是一般与变量声明不同的术语。简而言之，引擎在3个阶段处理变量声明：声明阶段，初始化阶段和分配阶段。



## 结论

