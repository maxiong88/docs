---
title: 'js async方法'
description: ''
sidebar: 'auto'
time: '2019-02-01'
prev: ''
next: ''
---






























## 含义

async 函数 它就是Generator函数的语法糖

async 函数的实现原理，就是将 Generator 函数和自动执行器，包装在一个函数里。

+ async函数对 Generator 函数的改进，体现在以下四点。

	- Generator 函数的执行必须靠执行器，所以才有了co模块，而async函数自带执行器。也就是说，async函数的执行，与普通函数一模一样，只要一行。
	
	- async和await，比起星号和yield，语义更清楚了。async表示函数里有异步操作，await表示紧跟在后面的表达式需要等待结果。
	
	- co模块约定，yield命令后面只能是 Thunk 函数或 Promise 对象，而async函数的await命令后面，可以是 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时会自动转成立即 resolved 的 Promise 对象）
	
	- async函数的返回值是 Promise 对象，这比 Generator 函数的返回值是 Iterator 对象方便多了。你可以用then方法指定下一步的操作。
	
进一步说，async函数完全可以看作多个异步操作，包装成的一个 Promise 对象，而await命令就是内部then命令的语法糖。
	
	``` js
	
	async function fn(args) {
	  // ...
	}

	// 等同于

	function fn(args) {
	  return spawn(function* () {
		// ...
	  });
	}
	spawn(){}
	// 执行器
	```

## 描述

### async 

当调用一个 `async` 函数时，会返回一个 `Promise` 对象。
当这个 `async` 函数返回一个值时，`Promise` 的 `resolve` 方法会负责传递这个值；
当 `async` 函数抛出异常时，`Promise` 的 `reject` 方法也会传递这个异常值。

``` js

async function g1(){return 'hhh'}

g1()

// -> 

Promise {
	[[PromiseStatus]]: "resolved"
	[[PromiseValue]]: "hhh"
}

```

`async` 函数中可能会有 await 表达式，
这会使 `async` 函数暂停执行，
等待 `Promise`  的结果出来，
然后恢复`async`函数的执行并返回解析值`（resolved）`。



## 用法

### 声明

``` js

// 函数声明
async function foo() {}

// 函数表达式
const foo = async function () {};

// 对象的方法
let obj = { async foo() {} };
obj.foo().then(...)

// Class 的方法
class Storage {
  constructor() {
    this.cachePromise = caches.open('avatars');
  }

  async getAvatar(name) {
    const cache = await this.cachePromise;
    return cache.match(`/avatars/${name}.jpg`);
  }
}

const storage = new Storage();
storage.getAvatar('jake').then(…);

// 箭头函数
const foo = async () => {};

```

## 返回promise对象

async函数返回一个 Promise 对象。

async函数内部return语句返回的值，会成为then方法回调函数的参数。

return 语句中没有 await 操作符，因为 async function 的返回值将被隐式地传递给 Promise.resolve。	

``` js

async function f() {
  return 'hello world';
}

f().then(v => console.log(v))
// "hello world"

```	

async函数内部抛出错误，会导致返回的 Promise 对象变为reject状态。抛出的错误对象会被catch方法回调函数接收到。

``` js

async function f() {
  throw new Error('出错了');
}

f().then(
  v => console.log(v),
  e => console.log(e)
)
// Error: 出错了

```

## Promise-对象的状态变化

只有async函数内部的异步操作执行完，才会执行then方法指定的回调函数。除非遇到return语句或者抛出错误

``` js

async function getTitle(url) {
  let response = await fetch(url);
  let html = await response.text();
  return html.match(/<title>([\s\S]+)<\/title>/i)[1];
}
getTitle('https://tc39.github.io/ecma262/').then(console.log)
// "ECMAScript 2017 Language Specification"

```

## await

await 表达式会暂停当前 async function 的执行，等待 Promise 处理完成。

若 Promise 正常处理(fulfilled)，其回调的resolve函数参数作为 await 表达式的值，继续执行 async function。

若 Promise 处理异常(rejected)，await 表达式会把 Promise 的异常原因抛出。

如果第一个被中断 第二个就不会执行
	
	这时可以将第一个await放在try...catch结构里面，这样不管这个异步操作是否成功，第二个await都会执行。
	
	await后面的 Promise 对象再跟一个catch方法，处理前面可能出现的错误。
	
	下面的例子使用try...catch结构，实现多次重复尝试。
	
	``` js
	
	const superagent = require('superagent');
const NUM_RETRIES = 3;

async function test() {
  let i;
  for (i = 0; i < NUM_RETRIES; ++i) {
    try {
      await superagent.get('http://google.com/this-throws-an-error');
      break;
    } catch(err) {}
  }
  console.log(i); // 3
}

test();

	```

另外，如果 await 操作符后的表达式的值不是一个 Promise，则返回该值本身。

``` js

async function f() {
  // 等同于
  // return 123;
  return await 123;
}

f().then(v => console.log(v))
// 123

```

因为定义了then方法，await会将其视为Promise处理。


## 注意

前面已经说过，await命令后面的Promise对象，运行结果可能是rejected，所以最好把await命令放在try...catch代码块中。

``` js

async function myFunction() {
  try {
    await somethingThatReturnsAPromise();
  } catch (err) {
    console.log(err);
  }
}

// 另一种写法

async function myFunction() {
  await somethingThatReturnsAPromise()
  .catch(function (err) {
    console.log(err);
  });
}

```

多个await命令后面的异步操作，如果不存在继发关系，最好让它们同时触发。

``` js

let foo = await getFoo();
let bar = await getBar();

```

上面代码中，getFoo和getBar是两个独立的异步操作（即互不依赖），被写成继发关系。这样比较耗时，因为只有getFoo完成以后，才会执行getBar，完全可以让它们同时触发。

``` js

// 写法一
let [foo, bar] = await Promise.all([getFoo(), getBar()]);

// 写法二
let fooPromise = getFoo();
let barPromise = getBar();
let foo = await fooPromise;
let bar = await barPromise;

```