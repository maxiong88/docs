---
title: axios 源码解析--canceltoken 取消请求
description: ''
sidebar: 'auto'
time: '2018-01-01'
prev: ''
next: './js-this-call'
---



## 起因

问题，我想在每次进入路由前清除之前的所有请求;
问题，如果您发出第一个请求然后发出第二个请求，则首先返回第二个请求，然后返回第一个请求。这会使搜索结果不准确，具体取决于完成查询所需的时间;

::: tip
如果数据响应很快，canceltoken就无效了；
只是适应于上一次的请求时长比当前请求时长 长。。。
:::

## 源码

``` bash
axios.Cancel = require('./cancel/Cancel');
axios.CancelToken = require('./cancel/CancelToken');
axios.isCancel = require('./cancel/isCancel');
```

####  Cancel

::: tip
A `Cancel` is an object that is thrown when an operation is canceled.
当触发取消操作的时候 抛出一个 cancel对象
:::


#### CancelToken

``` js
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

/**
 * 
 * canceltoken 构造函数 定义了一个属性promise 这个一个只有开始状态的promise对象
 *  var s;
    var promise = new Promise(function s1(resolve){
        s = resolve;
    })
    Promise {<pending>}
        __proto__: 
            Promise[[PromiseStatus]]: "pending"
            [[PromiseValue]]: undefined
*/
  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token, // 实例化对象
    cancel: cancel // 是一个函数 包含 new  Cancel（message），
    // 调用的时候如果 source.cancel不存在则，resolvePromise函数执行了，
    // 那么token.promise对象，这个原本pedding，变成了resolve，
    // 并且将token.reason对象传递过去了
    // 执行new CancelToken ，就是让token的promise的状态变成了成功；
  };
};

module.exports = CancelToken;
```

#### isCancel

#### xhr.js

``` js
    var request = new XMLHttpRequest();
    if (config.cancelToken) {
      // Handle cancellation
      // 如果axios 配置 存在，仔细看这只是一个promise的then函数，只有在promise的状态变成成功后才会执行，而刚才我们分析了，cancel就是让这个promise的状态变成成功，所以如果执行了，取消请求的函数，这个then就会执行，取消发送请求，并且把发送请求的promise变成reject,被axiox.get().catch()捕获；
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }
```

## 使用方法

![引用 github iusse上面](https://github.com/axios/axios/issues/1361)

``` js
var iteration = 10;
function makeRequestCreator() {
    var call;
    return function(url) {
        if (call) {
            call.cancel();
        }
        call = axios.CancelToken.source();
        return axios.get(url, { cancelToken: call.token, withCredentials: true }).then((response) => {
            console.count('postForm'); 
        console.log('2222')
            console.log(response.title)
        }).catch(function(thrown) {
            if (axios.isCancel(thrown)) {
                console.log('First request canceled', thrown.message);
            } else {
                // handle error
            }
        });
    }
}
var get = makeRequestCreator();
get('a.php?name=1');
get('a.php?name=2');
get('a.php?name=3');


const makeRequestCreator = () => {
    let call;
    return url => {
    if (call) {
        call.cancel("Only one request allowed at a time.");
    }
    call = axios.CancelToken.source();
    return axios.get(url, {
        cancelToken: call.token
    });
    };
};
const get = makeRequestCreator();

const getSomething = async id => {
        try {
        const res = await get(`a.php?name=${id}`);
        // do something with res
        } catch(err) {
        if (axios.isCancel(err)) {
            console.error(`Cancelling previous request: ${err.message}`);
        }
    }
}
getSomething(1);
getSomething(2);
getSomething(3);
getSomething(4);
```

## 课外

1、如果接口反应够快，该怎么限制用户快速输入












