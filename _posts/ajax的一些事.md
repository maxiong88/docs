---
title: ajax的一些事
date: 2018-04-23 09:56:14
tags: javascript
---

* [axios  post 问题](https://github.com/axios/axios#using-applicationx-www-form-urlencoded-format)
* withCredentials

<!-- more -->

## ajax  post提交

jquery的ajax post提交

contentType: application/x-www-form-urlencoded;charset=UTF-8(默认)

传输形式 Form  Data

后端可以获取我们传输的数据

![jquery ajax post 默认提交](../css/images/20180423135613_B1.png)
![ 返回值 ](../css/images/20180423135628_B2.png)


axios的post 提交

contentType: application/json;charset=UTF-8(默认)

传输形式 Request Payload 

后端获取不到我们传输的数据

![axios post 默认提交](../css/images/20180423135942_C1.png)
![返回值](../css/images/20180423135853_C2.png)


小伙伴的把axios的contentType修改成了application/x-www-form-urlencoded

![修改contentType](../css/images/20180423140437_D1.png)
![返回值](../css/images/20180423140537_D2.png)
![返回值](../css/images/20180423140602_D3.png)

返回了什么鬼，把我们的数据当前了key，value是空字符串

小伙伴们惊呆了

解决方法

* 使用URLSearchParams（）对象
* 使用FormData（）对象
* 通过qs插件
* 让后端添加对json获取

总结

jquery  ajax  post  默认是application/x-www-form-urlencoded格式发送数据

axios  post  默认 JavaScript对象序列化为JSON 


##  使用withCredentials发送跨域请求凭据

`MDN：`

	此属性是一个boolean类型，
	它指示了是否该使用类似cookie、authorization headers(头部授权)或者TLS客户端证书这一类资格证书来创建一个跨站点访问控制(cross-site Access-Control)请求。
	在同一站点下使用withCredentials属性是无效的。

	如果在发送来自其他域的XMLHttpRequest请求之前，未设置withCredentials 为true，那么就不能为它自己的域设置cookie值。而通过设置withCredentials 为true获得的第三方cookies，将会依旧享受同源策略，因此不能被通过document.cookie或者从头部相应请求的脚本等访问。

`字面：`

	凭据、证书、凭证、证件
	

我们先来看一下代码

我们设置一个简单的cookie
`
a.php
	
	
	header('Access-Control-Allow-Credentials: true');
	header('Access-Control-Allow-Methods: *');
	header('Access-Control-Allow-Headers: Content-Type,Access-Token');
	header('Access-Control-Fxpose-Headers: *');
	header('Access-Control-Allow-Origin:http://192.168.83.186:3000');
	
	$value = "my cookie value";

	// 发送一个简单的 cookie
	setcookie("TestCookie",$value);

	echo json_encode($_COOKIE);
	
index.html

	$.ajax({
		url : 'http://127.0.0.1/a.php',
		xhrFields:{
			withCredentials : true,
		},
		data:{
			"a":"1"
		},
		type: 'POST',
		dataType:'json',
		success:function(data){
			console.log(data, typeof data,'jquery, post')
		},
		error:function(data){
			console.log(data,'error')
		}
	});
`


* 如果设置此属性 a.php就可以$_COOKIE获取到cookie,
* 如果删除此属性 a.php就无法获取cookie
* 如果设置此属性， 服务器需要指定域名Access-Control-Allow-Origin：'$_SERVER["HTTP_ORIGIN"]'
* 如果不指定域名会报出 The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'.
* 当withCredentials设置为true时，它会尝试发送证书或cookie以及请求。 因为这意味着另一个源可能尝试进行已认证的请求，所以通配符（“*”）不被允许为“Access-Control-Allow-Origin”头。


![ 使用withCredentials发送跨域请求凭据，请求头带上了cookie](../css/images/20180423131626_A.png)
  
  

### 源码

[qs](https://github.com/ljharb/qs)
[axios](https://github.com/axios/axios)



















