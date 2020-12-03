---
title: '[精]浏览器缓存'
description: '说的是http1.1'
time: '2020-10-27'
prev: ''
next: ''
imgPIc: '../assets/img/17.jpg'
---

:::tip  MDN
当 web 缓存发现请求的资源已经被存储，它会拦截请求，返回该资源的拷贝，而不会去源服务器重新下载。这样带来的好处有：缓解服务器端压力，提升性能(获取资源的耗时更短了)。对于网站来说，缓存是达到高性能的重要组成部分。缓存需要合理配置，因为并不是所有资源都是永久不变的：重要的是对一个资源的缓存应截止到其下一次发生改变（即不能缓存过期的资源）。
:::

### Cache-Control

通用消息头字段，被用于在http请求和响应中，通过指定指令来实现缓存机制。缓存指令是单向的，这意味着在请求中设置的指令，不一定被包含在响应中。

##### 部分值

+ :no-store 不存储缓存，每次成功状态码都是200。响应头有ETag（资源未修改值不变、资源改变了值也会改变），请求头不存在-If-None-Match
+ :max-age 设置缓存存储的最大周期，超过这个时间缓存被认为过期(单位秒)。
    - 发送请求时设置时间未过期时，每次成功状态码都是200。读取的是磁盘或者内存的缓存。响应头有ETag（资源未修改值不变、资源改变了值也会改变），请求头不存在-If-None-Match；如果资源修改了，会重新请求
    - 发送请求时设置时间过期，成功状态码是304。请求头带有-If-None-Match。再次请求会从新计算时间是否过期
    - 如果max-age=0，第二次请求以后状态码是304
+ :no-cache 
    - 成功状态码304。请求头带有-If-None-Match。
    - 每次请求都要通过源服务器验证，因此，不能将no-cache与immutable结合使用。
    - 如果不想响应存储在缓存中，请使用no-store
+ :immutable
    - 表示响应主体不会随时间变化。该资源（如果未过期）在服务器上不变，因此，即使用户明确刷新页面，客户端也不应为其发送条件重新验证（例如If-None-Match或If-Modified-Since）来检查更新。

### connection

是否会关闭网络连接。如果该值是“keep-alive”，网络连接就是持久的，不会关闭，使得对同一个服务器的请求可以继续在该连接上完成。

第一次：请求头跟响应头都存在connection；如果资源没有修改接下来的请求都是只有请求头存在connection

+ connection:keep-alive http/1.1 默认持续链接
+ connection:close http/1.0 默认关闭

如果断开在连接建立TCP耗时

### ETag

[参考MDN ETag](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/ETag)

HTTP响应头（它是由服务器生成返回给前端）特定版本的资源标识符。只有响应头存在，请求头有If-None-Match

如果给定URL中的资源更改，则一定要生成新的Etag值返回200、无新值返回304。 因此Etags类似于指纹，也可能被某些服务器用于跟踪。 比较etags能快速确定此资源是否变化，但也可能被跟踪服务器永久存留。

### If-None-Match

[参考MDN If-None-Match](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/If-None-Match)

请求首部。每次（第一次没有）发送请求的时候，客户端会发送一个If-None-Match，而它的值是ETag的值。ETag与If-None-Match会进行弱比较如果相同返回304资源未改变；如果不同返回200发送新的资源并更新响应头的ETag



HTTP 304 Not Modified client redirection响应代码指示不需要重新传输请求的资源。指向缓存资源的隐式重定向，

#### 缓存验证机制

强验证读取的是内存或者磁盘上的数据
弱验证会发送一条请求，客户端if-none-match与服务端etag作比较，如果一致说明资源没有被修改可正常使用去缓存里面拿吧，状态码返回304；否则返回新资源状态码200

[参考](https://github.com/duoani/HTTP-RFCs.zh-cn)