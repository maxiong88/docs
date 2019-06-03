---
title: '理解交互'
description: 'schema、window全局上下文、JSBridge'
sidebar: 'auto'
time: '2019-06-01'
prev: ''
next: ''
---

bridge [不睿之] 桥梁

schame url的不紧可以在native内交互，也是可以跨app来交互的

WKWebView很多交互都是异步的，所以在很大程度上，在和m页通信的时候，提高了开发成本

入 WKWebView 之后，相对比 UIWebView 内存占用小那么多，主要是因为网页的载入和渲染这些耗内存和性能的过程都是由 WKWebView 进程去实现的

通过解析url内的伪协议来实现Native与JS之间的数据传输。

WebView作为承载H5页面的容器，有一个特性是非常重要，即`它可以捕捉到所有在容器中发起的网络请求`。其实想要`JS唤起Native`的方法，只要建立起`JS与Native通信`的桥梁即可，而这一点正好被WebView的这一特性所实现。

## 传递消息

我们可以通过`发起网络请求来向Native端传递消息`，如通过子窗口iframe.src来发起请求。当然，使用location.href也可以发起请求，不过由于location.href作为当前页面的地址，所以并不推荐使用。

``` js
function schemeJump (url) { // 通过iframe子窗口发起网络请求
  let iframe = document.createElement('iframe')
  iframe.src = url
  iframe.style.width = '1px'
  iframe.style.height = '1px'
  iframe.style.display = 'none' // 不显示iframe
  document.documentElement.appendChild(iframe)
  setTimeout(() => {
    document.documentElement.removeChild(iframe)
  }, 0)
}

```

我们也可以使用ajax来发送网络请求，只要Native端与H5同步一套解析规则即可。不过在实际开发中，由于ajax用于和服务端进行交互，所以最好还是使用iframe子窗口来发送请求。

## 执行回调

在唤起Native方法后，往往还需要执行一些回调，由于客户端无法直接执行JS代码，但可以获取WebView中的`全局变量`，因此可以将回调方法挂载在全局变量上，之后客户端调用全局变量上的回调方法就可以了。



js 端可以封装一层队列，所有 js 代码调用消息都先进入队列并不立刻发送，然后 h5 会周期性比如 500 毫秒，清空一次队列，保证在很快的时间内绝对不会连续发 2 次请求通信。

+ window.prompt 
