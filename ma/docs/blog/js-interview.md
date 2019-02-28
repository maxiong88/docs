---
title: interview
description: 'async用法'
sidebar: 'auto'
time: '5200-03-01'
prev: ''
next: ''
---



## [1,2,3].map(parseInt)

+ 考察map
+ 考察parseint
	- 考察进制
	
##### [map](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

含义

`map()`方法创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。

描述

map 方法会给原数组中的每个元素都按顺序调用一次  callback 函数。
callback 每次执行后的返回值（包括 undefined）组合起来形成一个新数组。 
callback 函数只会在有值的索引上被调用；
那些从来没被赋过值或者使用 delete 删除的索引则不会被调用。

##### [parseint(string, radix)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/parseInt)

含义

parseInt() 函数解析一个字符串参数，并返回一个指定基数的整数 (数学系统的基础)。

描述

parseInt 函数将其第一个参数转换为字符串，解析它，并返回一个整数或NaN。
如果不是NaN，返回的值将是作为指定基数（基数）中的数字的第一个参数的整数。

##### 进制换算

##### 案例分析

``` js

[1,2,3].map(parseInt) // [1, NaN, NaN]

// 等价

[1,2,3].map((item, index, arr) => {
	return parseInt(item, index)
})

// 等价

[1,2,3].map((item, index) => parseInt(item, index))


```

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
async function logInOrder(urls) {
	let response;
	let num = 0;
  // 并发读取远程URL
  const textPromises = urls.map(async url => {
	
	//if(url === 3){
try{
	response = await new Promise((resolve,reject) => {setTimeout(() => {reject(url+'@@'+Date.now())}, url*1000)});
}catch(err){
	num += 1;
	response = null
	if(num > 3){
		throw Error('失败三次')
		
	}
}

	//}else{
//response = await new Promise((resolve,reject) => {setTimeout(() => {resolve(url+'@'+Date.now())}, url*1000)});
//}
    
    return response;
  });
	console.log(textPromises, '=======11111')
  // 按次序输出
  for (const textPromise of textPromises) {
    console.log(await textPromise);
  }
}
logInOrder([1,3,2,4,7,6,5,8])

```