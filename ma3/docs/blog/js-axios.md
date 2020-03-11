---
title: axios 源码解析-- 知识点
description: ''
sidebar: 'auto'
time: '2015-01-10'
prev: './js-axios-canceltoken'
next: ''
---

## encodeURI 知识点

+ encodeURI

``` js
axios.get('a.php',{
		params:{
			name:JSON.stringify({a:1,b:2,c:[1,2,3,4]})
		}
});

// "http://localhost/a.php?name=%7B%22a%22:1,%22b%22:2,%22c%22:[1,2,3,4]%7D"
```

我们从源码可知，axios get方法中用
`buildURL(url, params, paramsSerializer)` 方法对url做了一下处理；四个方案

1、params参数不存在返回url
2、paramsSerializer 是一个负责 `params` 序列化的函数，如果存在serializedParams = paramsSerializer(params)
3、params instanceof URLSearchParams 一些实用的方法来处理 URL 的查询字符串 serializedParams = params.toString();
4、utils.forEach parts.push(encode(key) + '=' + encode(v));  serializedParams = parts.join('&');
``` js
function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}
```

参数做了一次 encodeURLComponent(), 然后又将具有功能的字符串替转成正常值