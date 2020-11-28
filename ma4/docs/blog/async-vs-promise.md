---
title: async vs promise
description: '了解为什么async/await是处理js中异步函数调用（保持良好性能）最佳方法'
sidebar: 'auto'
time: '2020-03-01'
prev: ''
next: ''
imgPIc: '../assets/img/17.jpg'
---



异步编程在js中优缺点。优点是异步编程是非阻塞的，尤其是在Node.js上下文中-响应快。缺点是处理异步编程可能很麻烦，因为有时您必须等待一个函数完成才能获得其“回调`callback`”，然后再进行下一个执行。
作为JavaScript或Node.js开发人员，正确理解`Promises`和`Callbacks`之间的区别是至关重要的。



## Promises

与传统的基于回调的方法相比，`Promise`提供了一种更简单的选择。还允许您使用类似同步`try/catch`的方法来处理异步错误。
promise就是简化了异步流和避免回调地狱，async、await允许我们编写看起来是同步的异步js


## 定义

+ [通过`AsyncFunction`构造函数创建一个`async function`对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/AsyncFunction) 
+ [使用`async function expression`函数声明方式创建一个`async function`对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function) 

声明方式在代码中调用效率比构造函数创建要高（AsyncFunction构造函数创建的对象将在创建函数时进行解析、声明式是与其他代码一起解析）

## 介绍

+ 是一种编写异步代码的新方法。以前的替代方法是 回调和promise
+ 实际上只是在promise之上构建的语法糖（async 返回promise，await是等待解决promise的语法糖）
+ 是非阻塞的
+ 使异步代码的外观和行为更像同步代码。

## async/await 规则

+ `async`函数返回一个 Promise 对象。必须等到内部所有await命令后面的 Promise 对象执行完，才会发生状态改变，除非遇到return语句或者抛出错误。也就是说，只有async函数内部的异步操作执行完，才会执行then方法指定的回调函数。
+ `async`函数内部return语句返回的值，会成为then方法回调函数的参数。
+ `async`函数内部抛出异常或者是返回reject，都会使函数的promise状态为失败reject。不在往下执行
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
上面代码中，函数f内部return返回的值、内部抛出错误，会被then、catch方法回调函数接收到。


## await 命令


+ await意思是async wait(异步等待)。
+ await  操作符用于等待一个Promise 对象。它只能在异步函数 async function 中使用([顶层-await](https://es6.ruanyifeng.com/#docs/async#%E9%A1%B6%E5%B1%82-await))。如果不是 Promise 对象，就直接返回对应的值。
+ await 表达式会暂停当前 async function 的执行，等待 Promise 处理完成。

  - 若 Promise 正常处理(fulfilled)，其回调的resolve函数参数作为 await 表达式的值，继续执行 async function。

  - 若 Promise 处理异常(rejected)，await 表达式会把 Promise 的异常原因抛出。

+ 如果 await 操作符后的表达式的值不是一个 Promise，则返回该值本身。

+ 如果await命令后面定义了then方法，await会将其视为promise处理



``` js
async function f() {
  // 等同于
  // return 123;
  return await 123;
}

f().then(v => console.log(v))
// 123
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
// 或
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


## 为什么 async/await更好----案例

### case01

假设一个函数getJSON返回一个promise。

``` js
// 用promise来实现它
const makeRequest = () =>
  getJSON()
    .then(data => {
      console.log(data)
      return "done"
      // 所有同步代码都需要写在这里，不然获取数据可能时undefined
    })
}
makeRequest();

// 使用async/await:
const makeRequest = async () => {
  let data = await getJSON()
  // 正常书写同步代码
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
+ 由于Async / Await是基于Promises构建的，因此您甚至可以将Promise.all与await关键字一起使用：
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

##### case01 实战
记录api花费时间
``` js
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



## 事件循环对 async promise性能分析(暂无)
> 处理是否相同 ？？
> 微任务 ？？
> MDN,异步函数返回一个asyncFunction对象，promise没有，asyncFunction有什么好处 ？？
> 性能如何 ？？

+ [dzone](//dzone.com/articles/java-vs-go-microservices-load-testing-rematch)
+ [stackoverflow](//stackoverflow.com/questions/54347806/questions-on-performance-regarding-async-await-vs-promises-and-the-event-loop)



## async 案例

###### 出现报错终止
``` js
async function errorAsync() {
  let ret = null;
  try {
    for(let anim of [1,2,3,4,5,6]) {
      ret = await new Promise((a,b)=>{if(anim==2){b(anim+'错误')}else{a(anim+'成功')}});
    }
  } catch(e) {
    /* 忽略错误，继续往下执行 -不再执行以后的await*/
    console.log(e,'抛出错误')
  }
  return ret;
}
errorAsync();
// 2错误 抛出错误  ;Promise {<fulfilled>: "1成功"}
```

###### 实现多次重复尝试
``` js
const NUM_RETRIES = 3;

async function test() {
  let i;
  for (i = 0; i < NUM_RETRIES; ++i) {
    try {
      await Axios.get('http://google.com/this-throws-an-error');
      break;
    } catch(err) {}
  }
  console.log(i); // 3
}

test();
// 上面代码中，如果await操作成功，就会使用break语句退出循环；如果失败，会被catch语句捕捉，然后进入下一轮循环。
```

###### 如何实现休眠效果
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

###### 按顺序完成异步操作

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
// VM1061:6 1@1606286448225
// VM1061:6 3@1606286451227
// VM1061:6 9@1606286460237
// VM1061:6 2@1606286462244
// VM1061:6 4@1606286466247
// VM1061:6 7@1606286473249
// VM1061:6 6@1606286479253
// VM1061:6 5@1606286484261
// VM1061:6 8@1606286492263
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
// 或者使用promise all let [] = await Promise.all([])
logInOrder([1,3,9,2,4,7,6,5,8])
// VM1066:10 1@1606286554135
// VM1066:10 3@1606286556138
// VM1066:10 9@1606286562135
// VM1066:10 2@1606286555148
// VM1066:10 4@1606286557142
// VM1066:10 7@1606286560146
// VM1066:10 6@1606286559150
// VM1066:10 5@1606286558134
// VM1066:10 8@1606286561149
```

###### 10 个 Ajax 同时发起请求，全部返回展示结果，并且至多允许三次失败，说出设计思路

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

// VM1077:21 1
// VM1077:18 3@@1606286886701
// VM1077:18 2@@1606286885715
// VM1077:18 9@@1606286892713
// VM1077:21 2
// VM1077:18 7@@1606286890702
// VM1077:18 6@@1606286889706
// VM1077:18 5@@1606286888704
// VM1077:21 3
// VM1077:27 Uncaught (in promise) 抛出3次错误

```

+ [参考](https://tc39.es/ecmascript-asyncawait/#async-function-definitions)
+ [循环]
+ [函数]
+ [promise]


