---
title: vue nextTick 原理[new]
description: ''
sidebar: 'auto'
time: '2019-10-25'
prev: ''
next: ''
---


## 原理

+ 调用nextTick,回调函数push入callbacks,call改变this指向,执行回调，
+ 如果回调不存在，但是是promise对象可使用链式调用

+ 使用promise，为兼容ios 开启一个setTimeout
+ 如果不是ie mutationobserver存在或者原生存在或者有mutationobserver类型 启用mutatoinobserver
+ setimmediate
+ setTimeout

``` js{1}
监听DOM的修改，并作出反应
/* globals MutationObserver */ 

import { noop } from 'shared/util'
import { handleError } from './error'
import { isIE, isIOS, isNative } from './env'

// 是否使用微任务
export let isUsingMicroTask = false

// 事件池
const callbacks = []

// 开始状态false
let pending = false

// 发起回调
function flushCallbacks () {
  pending = false
  const copies = callbacks.slice(0)
  callbacks.length = 0
  for (let i = 0; i < copies.length; i++) {
    copies[i]()
  }
}

// 使用微任务的异步延迟包装器
// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
let timerFunc

// mutationObserver 在 uiwebview ios 9.3以上有bug，所以如果原生支持promise 优先使用promise 
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  const p = Promise.resolve()
  timerFunc = () => {
    p.then(flushCallbacks)
    // 在有问题的uiwebview中，promise.then不会完全中断，但它可能会陷入一种奇怪的状态，
    // 即回调被推到微任务队列中，但队列不会被刷新，直到浏览器需要做一些其他工作，
    // 例如处理计时器。因此，我们可以通过添加一个空计时器来“强制”刷新微任务队列。
    if (isIOS) setTimeout(noop)
  }
  // 微任务开启
  isUsingMicroTask = true

// 如果不是ie MutationObserver构造函数存在 且 是原生支持或者数据类型是MutationObserverConstructor(构造函数)
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // 不支持promise的使用mutationObserver
  let counter = 1
  const observer = new MutationObserver(flushCallbacks)
  // 每使用一次nectTick就创建一次文本节点
  const textNode = document.createTextNode(String(counter))
  observer.observe(textNode, {
    // CharacterData 抽象接口（abstract interface）代表 Node 对象包含的字符
    characterData: true
  })
  timerFunc = () => {
    counter = (counter + 1) % 2
    textNode.data = String(counter)
  }
  isUsingMicroTask = true
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  //回退到setimmediate。
  //在技术上，它利用（宏）任务队列
  //但它还是比settimeout更好的选择。
  timerFunc = () => {
    setImmediate(flushCallbacks)
  }
} else {
  // 回退到setTimeout
  timerFunc = () => {
    setTimeout(flushCallbacks, 0)
  }
}

// function 回调函数
// object 作用域
export function nextTick (cb?: Function, ctx?: Object) {
  let _resolve
  callbacks.push(() => {
    if (cb) {
      try {
        cb.call(ctx)
      } catch (e) {
        handleError(e, ctx, 'nextTick')
      }
    } else if (_resolve) {
      _resolve(ctx)
    }
  })
  if (!pending) {
    pending = true
    timerFunc()
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    // promise
    return new Promise(resolve => {
      _resolve = resolve
    })
  }
}
```


## MutationObserver

`MutationObserver` 接口提供了监视对DOM树所做更改的能力

`var observer = new MutationObserver(callback);`

参数

一个回调函数，每当被指定的节点或子树以及配置项有Dom变动时会被调用。回调函数拥有两个参数：一个是描述所有被触发改动的MutationRecord对象数组，另一个是调用该函数的MutationObserver 对象。

返回值

一个新的、包含监听Dom变化回调函数的MutationObserver 对象
创建并返回一个新的 MutationObserver 它会在指定的DOM发生变化时被调用。

MutationObserver 好处

+ 不会对性能产生影响
+ 监听DOM更改，而做出反应
+ 不需要setTimeout了
+ [demo](./demo/mutationobserver.html)