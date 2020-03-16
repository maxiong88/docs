---
title: async vs promise
description: '了解为什么async/await是处理js中异步函数调用（保持良好性能）最佳方法'
sidebar: 'auto'
time: '2020-03-01'
prev: ''
next: ''
---



异步编程在js中优缺点。优点是异步编程是非阻塞的，尤其是在Node.js上下文中-响应快。缺点是处理异步编程可能很麻烦，因为有时您必须等待一个函数完成才能获得其“回调`callback`”，然后再进行下一个执行。
作为JavaScript或Node.js开发人员，正确理解`Promises`和`Callbacks`之间的区别是至关重要的。



## Promises

与传统的基于回调的方法相比，`Promise`提供了一种更简单的选择。还允许您使用类似同步`try/catch`的方法来处理异步错误。
promise就是简化了异步流和避免回调地狱，async、await允许我们编写看起来是同步的异步js

+ [dzone](//dzone.com/articles/java-vs-go-microservices-load-testing-rematch)
+ [stackoverflow](//stackoverflow.com/questions/54347806/questions-on-performance-regarding-async-await-vs-promises-and-the-event-loop)

## 知识点

+ [构造函数](./js-function.html)
+ [promise](./js-promise.html)

## 定义

+ 通过`AsyncFunction`构造函数创建一个`async function`对象 【1】 `Object.getPrototypeOf(async function(){}).constructor`
+ 使用`async function expression`函数声明方式创建一个`async function`对象 【2】 `async function [name](){}`

2的声明并在代码中调用效率比1高（AsyncFunction构造函数创建的对象将在创建函数时进行解析、声明式是与其他代码一起解析）

## 介绍

+ 是一种编写异步代码的新方法。以前的替代方法是 回调和promise
+ 实际上只是在promise之上构建的语法糖（async 返回promise，await是等待解决promise的语法糖）
+ 是非阻塞的
+ 使异步代码的外观和行为更像同步代码。

## async/await 规则

+ `async`函数返回一个 Promise 对象。
+ `async`函数内部return语句返回的值，会成为then方法回调函数的参数。
+ `async`函数内部抛出异常或者是返回reject，都会使函数的promise状态为失败reject。
+ 使用async/await时，请确保使用try/catch进行错误处理
+ 在循环或迭代器中使用await要小心。并行执行代码可能会出现执行顺序不同

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

## 为什么 async/await更好----案例

### case01

假设一个函数getJSON返回一个promise。

这就是你如何用promise来实现它

``` js
const makeRequest = () =>
  getJSON()
    .then(data => {
      console.log(data)
      return "done"
    })
}
makeRequest()
```

使用async/await:

``` js
const makeRequest = async () => {
  console.log(await getJSON())
  return "done"
}
makeRequest()
```

##### Why Is It better?

+ 代码简洁！（上面代码避免了嵌套代码）
+ Error handling 错误处理！（使用相同的结构来处理异步、同步错误。使用try/catch，无需使用promise的catch）
``` js
// promsie 
const makeRequest = () => {
  try {
    getJSON()
      .then(result => {
        // this parse may fail
        const data = JSON.parse(result)
        console.log(data)
      })
      // uncomment this block to handle asynchronous errors
      // .catch((err) => {
      //   console.log(err)
      // })
  } catch (err) {
    console.log(err)
  }
}

// async
const makeRequest = async () => {
  try {
    // this parse may fail
    const data = JSON.parse(await getJSON())
    console.log(data)
  } catch (err) {
    console.log(err)
  }
}
```
+ Conditionals ajax条件嵌套/中间值
``` js
// promise
const makeRequest = () => {
  return getJSON()
    .then(data => {
      if (data.needsAnotherRequest) {
        return makeAnotherRequest(data)
          .then(moreData => {
            console.log(moreData)
            return moreData
          })
      } else {
        console.log(data)
        return data
      }
    })
}
// async
const makeRequest = async () => {
  const data = await getJSON()
  if (data.needsAnotherRequest) {
    const moreData = await makeAnotherRequest(data);
    console.log(moreData)
    return moreData
  } else {
    console.log(data)
    return data
  }
}
```
+ Error stacks 错误堆栈！
+ 更容易调试！（箭头函数）
+ You can await anything 等待延迟同步执行
``` js
// 记录api花费时间

// promise
const recordTime = (makeRequest) => {
  const timeStart = Date.now();
  makeRequest().then(() => { // throws error for sync functions (.then is not a function)
    const timeEnd = Date.now();
    console.log('time take:', timeEnd - timeStart);
  })
}

// async
const recordTime = async (makeRequest) => {
  const timeStart = Date.now();
  await makeRequest(); // works for any sync or async function
  const timeEnd = Date.now();
  console.log('time take:', timeEnd - timeStart);
}
```

### case02

``` js
// users to retrieve
const users = [
'W8lbAokuirfdlTJpnsNC5kryuHtu1G53',
'ZinqxnohbXMQdtF6avtlUkxLLknRxCTh',
'ynQePb3RB2JSx4iziGYMM5eXgkwnufS5',
'EtT2haq2sNoWnNjmeyZnfUmZn9Ihfi8w'
];
// array to hold response
let response = [];
// fetch all 4 users and return responses to the response array
function getUsers(userId) {
axios
.get(`/users/userId=${users[0]}`)
.then(res => {
// save the response for user 1
response.push(res);
axios
.get(`/users/userId=${users[1]}`)
.then(res => {
// save the response for user 2
response.push(res);
axios
.get(`/users/userId=${users[2]}`)
.then(res => {
// save the response for user 3
response.push(2);
axios
.get(`/users/userId=${users[3]}`)
.then(res => {
// save the response for user 4
response.push(res);
})
.catch(err => {
// handle error
console.log(err);
});
})
.catch(err => {
// handle error
console.log(err);
});
})
.catch(err => {
// handle error
console.log(err);
});
})
.catch(err => {
// handle error
console.log(err);
});
}
```

哎呀，这很丑陋，并且在代码中占用了大量空间。

async/await是JavaScript的最新，最重要的功能，它使我们不仅可以避免回调地狱，还可以确保我们的代码干净并且可以正确捕获错误。 我对Async / Await最为着迷的是，它是基于Promises（非阻塞等）构建的，但仍允许代码被读取和读取，就好像它是同步的一样。 这就是力量所在。

``` js

// users to retrieve
const users = [
'W8lbAokuirfdlTJpnsNC5kryuHtu1G53',
'ZinqxnohbXMQdtF6avtlUkxLLknRxCTh',
'ynQePb3RB2JSx4iziGYMM5eXgkwnufS5',
'EtT2haq2sNoWnNjmeyZnfUmZn9Ihfi8w'
];
// array to hold response
let response = [];
async function getUsers(users) {
try {
response[0] = await axios.get(`/users/userId=${users[0]}`);
response[1] = await axios.get(`/users/userId=${users[1]}`);
response[2] = await axios.get(`/users/userId=${users[2]}`);
response[3] = await axios.get(`/users/userId=${users[3]}`);
} catch (err) {
console.log(err);
}
}
```

由于Async / Await是基于Promises构建的，因此您甚至可以将Promise.all（）与await关键字一起使用：

``` js

async function fetchUsers() {
  const user1 = getUser1();
  const user2 = getUser2();
  const user3 = getUser3();
  const results = await Promise.all([user1, user2, user3]);
}
```

::: tip 注意：
Async / await由于其同步特性而稍慢一些。 连续多次使用它时应小心，因为await关键字会停止执行其后的所有代码，与在同步代码中完全一样。
:::

## 事件循环对 async promise性能分析
> 处理是否相同 ？？
> 微任务 ？？
> MDN,异步函数返回一个asyncFunction对象，promise没有，asyncFunction有什么好处 ？？
> 性能如何 ？？




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