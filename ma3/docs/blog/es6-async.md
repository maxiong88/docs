---
title: es6 async await用法
description: '含义、常例'
sidebar: 'auto'
time: '2019-03-01'
prev: ''
next: ''
---

## 知识点

+ [构造函数](./js-function.html)


## 定义

+ 通过`AsyncFunction`构造函数创建一个`async function`对象 【1】 `Object.getPrototypeOf(async function(){}).constructor`
+ 使用`async function expression`函数声明方式创建一个`async function`对象 【2】 `async function [name](){}`

2的声明并在代码中调用效率比1高（AsyncFunction构造函数创建的对象将在创建函数时进行解析、声明式是与其他代码一起解析）



## 原理

~~async 函数的实现原理，就是将 Generator 函数和自动执行器，包装在一个函数里。`不解释`~~

## 返回 Promise 对象

`async`函数返回一个 Promise 对象。

`async`函数内部return语句返回的值，会成为then方法回调函数的参数。

`async`函数内部抛出异常或者是返回reject，都会使函数的promise状态为失败reject。

``` js
async function f() {
  return 'hello world';
}

f().then(v => console.log(v))
// "hello world"

async function f() {
    throw new Error('has Error');
}
f()
    .then(res => {
        console.log(res, 1);
    })
    .catch(error => {
        console.log(error, 2);
    })
// Error: has Error 2
```
上面代码中，函数f内部return命令返回的值，会被then方法回调函数接收到。

## await 命令

::: tip
await意思是async wait(异步等待)。
await  操作符用于等待一个Promise 对象。它只能在异步函数 async function 中使用。
await 表达式会暂停当前 async function 的执行，等待 Promise 处理完成。

若 Promise 正常处理(fulfilled)，其回调的resolve函数参数作为 await 表达式的值，继续执行 async function。

若 Promise 处理异常(rejected)，await 表达式会把 Promise 的异常原因抛出。

另外，如果 await 操作符后的表达式的值不是一个 Promise，则返回该值本身。
:::


``` js
async function f() {
  // 等同于
  // return 123;
  return await 123;
}

f().then(v => console.log(v))
// 123
```

+ await命令后面是一个对象的实例。这个实例不是 Promise 对象，但是因为定义了then方法，await会将其视为Promise处理。

## async 注意事项



第一点，await命令后面的Promise对象，运行结果可能是rejected
`任何一个await语句后面的 Promise 对象变为reject状态，那么整个async函数都会中断执行。`，
所以最好把await命令放在try...catch代码块中或者在Promise对象后面增加catch方法;

第二点，多个await命令后面的异步操作，如果不存在继发关系，最好让它们同时触发。

``` js
async function axiosA(){

	let a1 = await new Promise((resolve,reject) => {setTimeout(() => {resolve(1)}, 10000)})
	let a2 = await new Promise((resolve,reject) => {setTimeout(() => {resolve(2)}, 10000)})
	console.log(a1, a2)
}
axiosA() // 20秒以后输出1，2
```

上面的例子，a1,a2是两个独立的异步，被写成继发关系。这样比较耗时，因为只有a1完成以后，才会执行a2，完全可以让它们同时触发。

``` js
async function axiosA1(){
	let [a1, a2] = await Promise.all([new Promise((resolve,reject) => {setTimeout(() => {resolve(1)}, 10000)}),new Promise((resolve,reject) => {setTimeout(() => {resolve(2)}, 10000)})]);
	console.log(a1, a2)
}
或
async function axiosA(){
	let a1 =  new Promise((resolve,reject) => {setTimeout(() => {resolve(1)}, 10000)})
	let a2 =  new Promise((resolve,reject) => {setTimeout(() => {resolve(2)}, 10000)})
	a1 = await a1;
	a2 = await a2
	console.log(a1, a2)
}
axiosA1(); // 10秒以后同时输出1，2
```

第三点，await命令只能用在async函数之中，如果用在普通函数，就会报错。

第四点，async 函数可以保留运行堆栈。因为等到await执行完毕才会往下执行

## 当async/await遇上forEach

``` js
function dbFuc(db) { //这里不需要 async
  let docs = [
  new Promise((resolve) => {setTimeout(() => {resolve(1+','+Date.now())}, 1000)}),
  new Promise((resolve) => {setTimeout(() => {resolve(2+','+Date.now())}, 3000)}),
  new Promise((resolve) => {setTimeout(() => {resolve(3+','+Date.now())}, 2000)})
  ];
  // 可能得到错误结果
  docs.forEach(async function (doc) {
    let a = await doc;
    console.log(a)
  });
}
dbFuc();
// 1,1571645398094  3,1571645399094  2,1571645400094 // 并发
```
上面代码可能不会正常工作，原因是这时三个db.post操作将是并发执行，也就是同时执行，而不是继发执行。正确的写法是采用for循环。
``` js
// 继发
async function dbFuc(db) {
  let docs = [{}, {}, {}];

  for (let doc of docs) {
    await db.post(doc);
  }
}
```

## async 案例

+ 实现多次重复尝试。

``` js
// for while
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

+ 如何实现休眠效果

``` js
function sleep(interval) {
  return new Promise(resolve => {
    setTimeout(resolve, interval);
  })
}

// 用法
async function one2FiveInAsync() {
  for(let i = 1; i <= 5; i++) {
    console.log(i);
    await sleep(1000);
  }
}

one2FiveInAsync();
```

+ 按顺序完成异步操作

``` js
// 继发
async function logInOrder(urls) {
  for (const url of urls) {
    const response = await new Promise((resolve,reject) => {
      setTimeout(() => {resolve(url+'@'+Date.now())}, url*1000)
    });
    console.log(await response);
  }
}
VM24624:4 1@1551346291594
VM24624:4 3@1551346294595
VM24624:4 2@1551346296596
VM24624:4 4@1551346300597
VM24624:4 7@1551346307599
VM24624:4 6@1551346313602
VM24624:4 5@1551346318603
VM24624:4 8@1551346326605
// 并发
async function logInOrder(urls) {
  // 并发读取
  const textPromises = urls.map(async url => {
    const response = await new Promise((resolve,reject) => {setTimeout(() => {resolve(url+'@'+Date.now())}, url*1000)});
    return response;
  });
	console.log(textPromises, '=======11111')
  // 按次序输出
  for (const textPromise of textPromises) {
    console.log(await textPromise);
  }
}
logInOrder([1,3,2,4,7,6,5,8])
VM24450:10 1@1551346111979
VM24450:10 3@1551346113979
VM24450:10 2@1551346112979
VM24450:10 4@1551346114979
VM24450:10 7@1551346117979
VM24450:10 6@1551346116979
VM24450:10 5@1551346115979
VM24450:10 8@1551346118980
```

+ 10 个 Ajax 同时发起请求，全部返回展示结果，并且至多允许三次失败，说出设计思路

``` js
// 第一种 继承关系
async function axios(urls){
    let i;
    let num = 0;
    let arr = [];
	for(i of urls){
		try{
            arr.push(
                await new Promise((resolve, reject) => {
                    console.log(i,'===')
                    if(i === 1 || i === 4 || i === 8){
                        setTimeout(() => {reject(i+'@@'+Date.now())}, 1000)
                    }else{
                        setTimeout(() => {resolve(i+'@@@'+Date.now())}, 1000)
                    }
                    
                })
            );
        }catch(err){
            num ++;
            console.log(err,num)
            if(num >= 3){
				throw('错误了三弟')
			}
        }
	}
    console.log(arr, num)
    return arr;
}
axios([1,2,3,4,5,6,7,8,9,19,23])

VM32383:10 1 "==="
VM32383:21 1@@1551429003656 1
VM32383:10 2 "==="
VM32383:10 3 "==="
VM32383:10 4 "==="
VM32383:21 4@@1551429006662 2
VM32383:10 5 "==="
VM32383:10 6 "==="
VM32383:10 7 "==="
VM32383:10 8 "==="
VM32383:21 8@@1551429010669 3
VM32383:29 Uncaught (in promise) 错误了三弟
```

``` js
// 并发操作
async function logInOrder(urls) {
    let response;
    let num = 0;
    const textPromises = urls.map(async url => {
        response = await new Promise((resolve,reject) => {
            if(url === 1 || url === 4 || url === 8){
                setTimeout(() => {reject(url+'@@@'+Date.now())}, url*1000)
            }else{
                setTimeout(() => {resolve(url+'@@'+Date.now())}, url*1000)
            }
        });
    return response;
    });
	console.log(textPromises, '=======11111')
    // 按次序输出
    for (const textPromise of textPromises) {
        try{
            console.log(await textPromise);
        }catch(w){
            num++;
            console.log(num);
            if(num >=3){
                throw('抛出3次错误');
            }
        }
    }
}
logInOrder([1,3,2,4,7,6,5,8])

VM32579:15 (8) [Promise, Promise, Promise, Promise, Promise, Promise, Promise, Promise] "=======11111"
    0: Promise {<rejected>: "1@@@1571646981511"}
    1: Promise {<resolved>: "3@@1571646983510"}
    2: Promise {<resolved>: "2@@1571646982511"}
    3: Promise {<pending>}
    4: Promise {<pending>}
    5: Promise {<pending>}
    6: Promise {<pending>}
    7: Promise {<pending>}
VM4668:22 1
VM4668:19 3@@1571646983510
VM4668:19 2@@1571646982511
VM4668:22 2
VM4668:19 7@@1571646987510
VM4668:19 6@@1571646986511
VM4668:19 5@@1571646985510
VM4668:22 3
VM32579:25 Uncaught (in promise) '抛出3次错误'

```

### setTimeout

setTimeout不是一个async函数，所以你不能在ES7 async-await中使用它。但您可以sleep使用ES6 Promise实现您的功能：

``` js
function sleep (arg) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(arg), 3000)
  })
}
async function a(){

  console.log(1)
  console.log(await sleep(3))
  console.log(2)
}
a();// 1,3,2
```

[https://tc39.es/ecmascript-asyncawait/#async-function-definitions](https://tc39.es/ecmascript-asyncawait/#async-function-definitions);