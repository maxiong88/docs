---
title: http2 转
description: ''
sidebar: 'auto'
time: ''
prev: ''
next: ''
---

+ HTTP2是二进制协议
    - HTTP/1.1传输的是文本数据，而HTTP/2传输的是二进制数据，++ 提高了数据传输效率 ++。
+ 这是一个复用协议[HTTP/2支持TCP连接多路复用]。并行的请求能在同一个链接中处理，移除了HTTP/1.x中顺序和阻塞的约束。
    - HTTP 1.1需要为不同的HTTP请求建立单独的TCP连接，而HTTP/2的多个HTTP请求可以复用同一个TCP连接。
    - 要知道，建立TCP连接时需要3次握手，再加上TLS的4次握手，加起来就是7次握手，如果可以复用TCP连接的话，则可以减少这些多余的开销。
+ 压缩请求headers。因为headers在一系列请求中常常是相似的，其移除了重复和传输重复数据的成本。
+ 其允许服务器在客户端缓存中填充数据，通过一个叫服务器推送的机制来提前请求。[HTTP/2支持服务器推送(Server Push)]
    - 当客服端向服务端请求HTML时，Server Push服务端可以提前返回HTML所依赖的css、js等资源，这样可以节省解析HTML以及请求资源的时间，从而缩短页面的加载时间。
+ 对Alt-Svc的支持允许了给定资源的位置和资源鉴定，允许了更智能的CDN缓冲机制。
+ Client-Hints 的引入允许浏览器或者客户端来主动交流它的需求，或者是硬件约束的信息给服务端。
+ 在Cookie头中引入安全相关的的前缀，现在帮助保证一个安全的cookie没被更改过。


转[//blog.fundebug.com/2019/10/28/speedup-fundebug-by-using-http2/](//blog.fundebug.com/2019/10/28/speedup-fundebug-by-using-http2/)
