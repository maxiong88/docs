---
title: axios 源码解析--canceltoken 取消请求
description: '目前只适用于请求响应时间过长导致'
sidebar: 'auto'
time: '2015-01-09'
prev: './js-vue-observer-1'
next: './js-variable-lift'
---

我们从一个简单的例子开始

``` js
const CancelToken = axios.CancelToken; ##1
let cancel; ##1

axios.get('/user/12345', { ##3
  cancelToken: new CancelToken(function executor(c) { ##4
    // An executor function receives a cancel function as a parameter
    cancel = c; ##5
  })
});

// cancel the request
cancel(); ##6
```

我们从上面的js讲起：

A `CancelToken` is an object that can be used to request cancellation of an operation.
“取消标记”是可以用来请求取消操作的对象。

·##1· 是将axios的CancelToken静态方法赋给变量

·##4· axios配置config中cancelToken：是实例化取消标记（CancelToken）构造函数
从源码获知如果axios配置了cancelToken那么他就会有一个不一样的机遇；
当我们实例化构造函数`CancelToken`以后我们发生了什么

1. canceltoken函数定义了一个promise属性，指向只有开始状态的promise对象，resolvePromise = resolve函数
2. 将上下文this作用域赋给token变量
3. 有一个执行者函数executor(),他会执行传过来的参数函数
4. executor参数中函数就是通过reslove函数将token.reason传给下一个环节 resolve  then

·##5· 这个就是把构造函数cancelToken中的executor(参数)函数中的参数赋给了 cancel变量

·##6· 函数声明存在提升 哈哈哈  [具体看下面的源码](./js-axios-canceltoken#CancelToken)
构造函数cancelToken被实例化以后this做出了改变 promise对象的状态 pending ==》resolved，多出了一个reason属性值为Cancel构造函数实例化的对象

``` js
CancelToken {promise: Promise}
promise: Promise {<resolved>: Cancel}
reason: Cancel {message: undefined}
```

接下来就是开始发送请求了`Axios.prototype.request`
此函数会返回一个promise对象
``` js
Axios.prototype.request = function request(config) {
	// ....省略...
	// Hook up interceptors middleware
	var chain = [dispatchRequest, undefined];
	// 方法会将这个对象转为 Promise 对象，然后就立即执行thenable对象的then方法。
	var promise = Promise.resolve(config);

	// ...省略...

	while (chain.length) {
		// .then就是Promise 实例添加状态改变时的回调函数，我们注册then状态方法
		promise = promise.then(chain.shift(), chain.shift());
	}
	// 由于取消了请求 `dispatchRequest`抛出乐意异常 所以此promise对象状态变成了rejected
	return promise;
};
```

再来看一下`dispatchRequest`函数
Dispatch a request to the server using the configured adapter.
使用配置的适配器向服务器发送请求。

``` js
module.exports = function dispatchRequest(config) {
	throwIfCancellationRequested(config);
	// ... 省略
}
function throwIfCancellationRequested(config) {
	if (config.cancelToken) {
	    config.cancelToken.throwIfRequested();
	}
}
// 这里抛出一个异常
// 此reason就是 构造函数 Cancel()实例化后的对象
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
	if (this.reason) {
	    throw this.reason;
	}
};
```

以上就是·##6·发生的事情

总结一下：当一个请求调用了cancel以后将 在取消标记函数canceltoken中 将promise状态从peding变成了resolve
发出请求Axios.prototype.request返回promise对象（此promise对象状态变成了rejected因为取消了请求）

当我们把·##6·去掉以后就会越过`throwIfCancellationRequested`这个函数往下走进入`xhrAdapter`函数来处理


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

``` JS
// Cancel类 干嘛的咱不知道
// 构造函数 Cancel在原型上添加了 toString、__CANCEL__两个方法
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;

```


#### CancelToken

``` js
// CancelToken
// executor 执行函数
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
	// 将作用域赋给token
  var token = this;
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
    cancel: cancel // 是一个cancel函数 包含 new  Cancel（message），
    // 调用的时候如果 source.cancel不存在则，resolvePromise函数执行了，
    // 那么token.promise对象，这个原本pedding，变成了resolve，
    // 并且将token.reason对象传递过去了
    // 执行new CancelToken ，就是让token的promise的状态变成了成功；
  };
};

module.exports = CancelToken;
```

#### isCancel

``` js
// 强制转boolean
module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};
```

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









