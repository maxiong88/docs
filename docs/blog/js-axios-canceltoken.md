---
title: axios 源码解析--canceltoken 取消请求
description: '目前只适用于请求响应时间过长导致'
sidebar: 'auto'
time: '2015-01-09'
prev: ''
next: './js-variable-lift'
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
  // 调用canceltoken 则promise属性 表示生成的promise对象设置为开始
  var resolvePromise;
  // promise对象完成 赋值给resolvePromise
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
	   // 开始执行 promise 
	  // executor()函数中执行的代码就是子程序需要完成事。
	  //在executor()函数内如果调用了resolve()，resolve()则会把Promise对象的状态PromiseStatus修改为fulfilled，
	  //把resolve(value)中的value值赋给Promise对象的PromiseValue。
	  //然后再依次执行由then()方法构成的回调链中的回调函数。
	  // 同样，在executor()中调用reject()的过程也是类似的
  executor(function cancel(message) {
  // 如果上下文存在reason则取消请求
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }
	// 创建一个 取消操作对象
    token.reason = new Cancel(message);
	// 将reason传给下一个环节 resolve  then
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 如果请求取消 则抛出 取消
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
创建一个新的取消标记对象 与 一个函数 这个函数就是我们传入的信息
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
      // 如果axios 配置 存在，仔细看这只是一个promise的then函数，
	  // 只有在promise的状态变成成功后才会执行，而刚才我们分析了，
	  // cancel就是让这个promise的状态变成成功，所以如果执行了，取消请求的函数，
	  // 这个then就会执行，取消发送请求，并且把发送请求的promise变成reject,被axiox.get().catch()捕获；
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }
		// 如果该请求已被发出,XMLHttpRequest.abort() 方法将终止该请求
        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }
```

## 创建形式

直接使用静态属性

``` js
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

axios.get('/user/12345', {
  cancelToken: source.token
}).catch(function (thrown) {
  if (axios.isCancel(thrown)) {
    console.log('Request canceled', thrown.message);
  } else {
    // handle error
  }
});

axios.post('/user/12345', {
  name: 'new name'
}, {
  cancelToken: source.token
})

// cancel the request (the message parameter is optional)
source.cancel('Operation canceled by the user.');
```

通过构造函数 来创建

``` js
const CancelToken = axios.CancelToken;
let cancel;

axios.get('/user/12345', {
  cancelToken: new CancelToken(function executor(c) {
    // An executor function receives a cancel function as a parameter
    cancel = c;
  })
});

// cancel the request
cancel();
```

## 使用方法

[引用 github iusse上面](https://github.com/axios/axios/issues/1361)

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


2、跨域的问题没有不依靠服务端来解决的，
2.1、cors  需要服务端配合
2.2、jsonp 需要服务端配合
2.3、nginx反向代理

3、公司项目
3.1、移动端，在我快速输入删除重复这个动作就会发现每个接口都请求成功了，但是搜索出来的内容就会闪烁，
3.2、pc端，。。。。。。。。。。。。。。。数据请求成功并渲染了html但是并没有马上让html可见，而是有了等待时间才让其可见 (jquery ui autocomplete)









