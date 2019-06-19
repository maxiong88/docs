---
title: es6 async await用法
description: '含义、常例'
sidebar: 'auto'
time: '2019-03-01'
prev: ''
next: ''
---

## 原理

async 函数的实现原理，就是将 Generator 函数和自动执行器，包装在一个函数里。`不解释`

## 返回 Promise 对象

`async`函数返回一个 Promise 对象。

`async`函数内部return语句返回的值，会成为then方法回调函数的参数。

``` js
async function f() {
  return 'hello world';
}

f().then(v => console.log(v))
// "hello world"
```
上面代码中，函数f内部return命令返回的值，会被then方法回调函数接收到。

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
  let docs = [{}, {}, {}];

  // 可能得到错误结果
  docs.forEach(async function (doc) {
    await db.post(doc);
  });
}
const dbFuc = async () => {
    let docs = [{}, {}, {}];
    const asyncFnWrap = async (item) => {
        await db.post(item);
    };
    for (let i = 0, len = docs.length; i < len; i++) {
        asyncFnWrap(docs[i]);
    }
};
```
上面代码可能不会正常工作，原因是这时三个db.post操作将是并发执行，也就是同时执行，而不是继发执行。正确的写法是采用for循环。
``` js
async function dbFuc(db) {
  let docs = [{}, {}, {}];

  for (let doc of docs) {
    await db.post(doc);
  }
}
```

## async 案例

+ 按顺序完成异步操作

``` js
// 继发
async function logInOrder(urls) {
  for (const url of urls) {
    const response = await new Promise((resolve,reject) => {setTimeout(() => {resolve(url+'@'+Date.now())}, url*1000)});
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
            if(url === 2 || url === 7 || url === 6){
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
VM32579:19 1@@1551430059827
VM32579:19 3@@1551430061827
VM32579:20 1
VM32579:19 4@@1551430062828
VM32579:20 2
VM32579:20 3
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