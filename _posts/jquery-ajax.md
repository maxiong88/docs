---
title: ajax 使用方法总结
date: 2016-09-22 20:05:42
tags: javascript
---


## ajax简介
AJAX即“Asynchronous Javascript And XML”（异步JavaScript和XML），是指一种创建交互式网页应用的网页开发技术。Ajax不是一种新的编程语言，而是使用现有标准的新方法。AJAX可以在不重新加载整个页面的情况下，与服务器交换数据。这种异步交互的方式，使用户单击后，不必刷新页面也能获取新数据。使用Ajax，用户可以创建接近本地桌面应用的直接、高可用、更丰富、更动态的Web用户界面。

<!-- more -->

### 异步交互和同步交互

<pre>
要说Ajax就不得不说，异步传输和同步传输了。
异步是值：发送方发出数据后，不等接收方发回响应，接着发送下一个数据包的通讯方式。
同步是指：发送方发出数据后，等待接收方发回响应以后才发下一个数据包的通讯方式。
也可以理解为：
异步传输：你传吧，我去做我的事了，传输完了告诉我一声。
同步传输：你现在传输，我要看着你传输完成，才去做别的事。
</pre>

### 什么是Ajax

<pre>
AJAX即“Asynchronous Javascript And XML”（异步JavaScript和XML），
是指一种创建交互式网页应用的网页开发技术。
允许浏览器与服务器通信而无须刷新当前页面的技术成为Ajax
</pre>

### Ajax的工作原理

<pre>
Ajax的原理简单来说通过XmlHttpRequest对象来向服务器发异步请求，从服务器获得数据，然后用javascript来操作DOM而更新页面。这其中最关键的一步就是从服务器获得请求数据。要清楚这个过程和原理，我们必须对 XMLHttpRequest有所了解。
</pre>



主要是 jquery $.ajax()

```
jQuery对Ajax做了大量的封装，jQuery采用了三层封装：
最底层的封装方法为：$.ajax()
快捷方法：.load()、$.get()、$.post()、$.getScript() 、 $.getJSON()
```
### $.ajax()方法对象参数表：

* url ： string ： 发送请求的地址
* type ： string ：请求方式：POST、GET。默认GET
* timeout ：Number ：设计请求超时的时间(毫秒)
* data ：Object或String ：发送到服务器的数据
* dataType ：String ：返回数据类型：html、xml、json
* beforeSend ：Function ： 发送请求,用于在向服务器发送请求前执行一些动作
* complete ：Function ：请求完成以后调用的回调函数
* success ：Function ：请求成功后调用的回调函数
* error ： Function ：请求失败后调用的回调函数
* cache ：Boolean ：设置浏览器缓存响应，默认true
* content ：DOM ：
* contentType ：即将发送信息至服务器的内容编码类型
 * (默认: "application/x-www-form-urlencoded; charset=UTF-8")
* processData ：
* dataFilter ：
* ifModified ：
* global ：
* username ：
* password ：
* xhr ：
* traditional ：
* jsonp ：在一个 jsonp 请求中重写回调函数的名字。
 * <small>这个值用来替代在 "callback=?" 这种 GET 或 POST 请求中 URL 参数里的 "callback" 部分，比如 {jsonp:'onJsonPLoad'} 会导致将 "onJsonPLoad=?" 传给服务器。</small>
* jsonpCallback ：为 jsonp 请求指定一个回调函数名。
 * <small>这个值将用来取代 jQuery 自动生成的随机函数名。这主要用来让 jQuery 生成度独特的函数名，这样管理请求更容易，也能方便地提供回调函数和错误处理。你也可以在想让浏览器缓存 GET 请求的时候，指定这个回调函数名。</small>
* async ：String ：是否异步处理。默认true，false为同步处理。
 * <small>false为同步，在请求Ajax的时候将整个浏览器锁死，请求结束以后，才会继续执行下面的东西</small>

### $.get()方法对象参数表：

* url ：待载入页面的url地址
* data ：待发送的key/value参数
* success ：载入成功时回调函数
* dataType ：返回内容格式，xml、json、text、html、script

### $.post()方法对象参数表：

* url ：待载入页面的url地址
* data ：待发送的key/value参数
* success ：载入成功时回调函数
* dataType ：返回内容格式，xml、json、text、html、script

### $.getJSON()方法对象参数表：

* url ：待载入页面的url地址
* data ：待发送的key/value参数
* success ：载入成功时回调函数

### ajax中跳入error一些原因：

<pre>
1.dataType错误
2.async请求同步异步问题
 * async默认是true(异步请求),如果想一个Ajax执行完后再执行另一个Ajax, 需要把async=false
 * 例如，你用post请求传值到另一个页面后台，但是页面一加载你的ajax就已经执行过了，传值接收是在后台才完成的，这时候就请求不到数据，所以可以考虑把ajax请求改为同步试试。
3.data不能不写。data:"{}"
4.传递参数
5.url问题
</pre>

#### ajax中error参数：

<pre>
error:function(XMLHttpRequest,textStatus,errorThrown){}
	XMLHttpRequest参数
		XMLHttpRequest.readyState: 状态码的意思
		0 － （未初始化）还没有调用send()方法 
		1 － （载入）已调用send()方法，正在发送请求 
		2 － （载入完成）send()方法执行完成，已经接收到全部响应内容 
		3 － （交互）正在解析响应内容 
		4 － （完成）响应内容解析完成，可以在客户端调用了
		status:返回的HTTP状态码，比如常见的404,500等错误代码。 
		statusText:对应状态码的错误信息，比如404错误信息是not found,500是Internal Server Error。 
		responseText ：服务器响应返回的文本信息
	textStatus的值：null, timeout, error, abort, parsererror(类型的问题)   
	errorThrown的值：收到http出错文本，如 Not Found 或 Internal Server Error.  
</pre>

#### $.ajax() beforeSend 项目应用处
###### 防止重复数据提交、ajax 提示loading
 
	要避免这种现象，
	在$.ajax请求中的beforeSend方法中把提交按钮禁用掉，
	等到Ajax请求执行完毕，在恢复按钮的可用状态。
	$.ajax({
	     url:"",
	     data:"",
	     contentType:""//请求内容类型，可设置编码（乱码）
	     beforeSend:function(){
	         //禁用按钮防止重复提交
	         //开启loading模式
	     },
	     success:function(){},
	     complete:function(){
	        //开启提交按钮
	        //关闭loading
	     },
	     error:function(){},
	})
 
### 跨域 AJAX
* 由于浏览器存在同源策略机制，同源策略阻止从一个源加载的文档或脚本获取或设置另一个源加载的文档的属性。
 * 特别的：由于同源策略是浏览器的限制，所以请求的发送和响应是可以进行，只不过浏览器不接受罢了。
* 浏览器同源策略并不是对所有的请求均制约：
 * 制约： XmlHttpRequest
 * 不叼： img、iframe、script等具有src属性的标签
* 跨域，跨域名访问，如：http://www.c1.com 域名向 http://www.c2.com域名发送请求
* 跨域4种方法
 * 利用iframe
 * 利用jsonp 只支持get请求，优势兼容浏览器以及向不支持cors网站请求数据
 * 利用代理
 * 利用html5提供的XMLHttpRequest Level2
  * Access-Control-Allow-Origin 

```js
var p = 1;
 $.ajax({
     url : "",
     type : "",
     data : "{}",
     dataType : "",
     jsonp : "callback",
     jsonpCallback : "jsonp"+p++,
     beforeSend : function(){},
     success : function(){},
     error : function(){}
 })
```

### Ajax的核心XMLHttpRequest对象：


初始化代码如下：
```js
function   createXmlHttpRequest(){  
   var xmlHttp;  
   try{    //Firefox, Opera 8.0+, Safari  
           xmlHttp=new XMLHttpRequest();  
    }catch (e){  
           try{    //Internet Explorer  
                  xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");  
            }catch (e){  
                  try{  
                          xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");  
                  }catch (e){}    
           }  
    }  
   return xmlHttp;  
 }  
```

发送请求
```js
//发送请求  
function sendRequest(){  
var xmlHttpReq = createXmlHttpRequest(); 
//获取文本框的值  
var chatMsg=input.value;  
var url="chatServlet.do?charMsg="+chatMsg;  
//建立对服务器的调用  
XMLHttpReq.open("POST",url,true);  
//设置MiME类别,如果用 POST 请求向服务器发送数据，  
//需要将"Content-type" 的首部设置为 "application/x-www-form-urlencoded".  
//它会告知服务器正在发送数据，并且数据已经符合URL编码了。  
XMLHttpReq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");  
//状态改变的事件触发器,客户端的状态改变会触发readystatechange事件,  
xmlHttpReq.onreadystatechange=function(){  
//为4表示请求和响应结束  
if(xmlHttpReq.readyState==4){  
//200表示响应成功  
if(xmlHttpReq.status==200){  
//在div上添加action返回的值  
document.getElementById("info").innerHTML=xmlHttpReq.responseText;  
}  
}  
}  
//这是get方式发送数据，中文记得在接受时进行编码  
xmlHttpReq.open("post","/webLogic/test_test.do?username=aaa",true);  
//post请求时一定要加这个请求头  
//xmlHttpReq.setRequestHeader("Content-Type","application/x-www-form-urlencoded");  
//xmlHttpReq.send("username="+"德玛"+"&pwd="+"123");//这是post请求的发送数据方法  
//get方式send(null)，写了也没用  
xmlHttpReq.send(null);   
}  
```

接受请求 
```js
function processResponse(){  
if(XMLHttpReq.readyState==4){ //判断对象状态 4代表完成  
if(XMLHttpReq.status==200){ //信息已经成功返回，开始处理信息  
document.getElementById("chatArea").value=XMLHttpReq.responseText;  
}  
}  
}  
```
* XMLHttpRequest 对象用于在后台与服务器交换数据。
 *  在不重新加载页面的情况下更新网页
 *  在页面已加载后从服务器请求数据
 *  在页面已加载后从服务器接收数据
 *  在后台向服务器发送数据

* 先了解其属性和方法
 * 属性
```js
readyState	
	表示XMLHttpRequest对象的状态：
	0：未初始化。对象已创建，未调用open；
	1：open方法成功调用，但Sendf方法未调用；
	2：send方法已经调用，尚未开始接受数据；
	3：正在接受数据。Http响应头信息已经接受，但尚未接收完成；
	4：完成，即响应数据接受完成。
```
<pre>
Onreadystatechange
请求状态改变的事件触发器（readyState变化时会调用这个属性上注册的javascript函数）。
responseText
服务器响应的文本内容
responseXML
服务器响应的XML内容对应的DOM对象
Status
服务器返回的http状态码。200表示“成功”，404表示“未找到”，500表示“服务器内部错误”等。
statusText
服务器返回状态的文本信息。
</pre>
 * 方法
 <pre>
Open(string method,string url,boolean asynch,
String username,string password)
指定和服务器端交互的HTTP方法，URL地址，即其他请求信息；
Method:表示http请求方法，一般使用"GET","POST".
url：表示请求的服务器的地址；
asynch：表示是否采用异步方法，true为异步，false为同步；
后边两个可以不指定，username和password分别表示用户名和密码，提供http认证机制需要的用户名和密码。
Send(content)
向服务器发出请求，如果采用异步方式，该方法会立即返回。
content可以指定为null表示不发送数据，其内容可以是DOM对象，输入流或字符串。
SetRequestHeader(String header,String Value)
设置HTTP请求中的指定头部header的值为value.
此方法需在open方法以后调用，一般在post方式中使用。
getAllResponseHeaders()
返回包含Http的所有响应头信息，其中相应头包括Content-length,date,uri等内容。
返回值是一个字符串，包含所有头信息，其中每个键名和键值用冒号分开，每一组键之间用CR和LF（回车加换行符）来分隔！
getResponseHeader(String header)
返回HTTP响应头中指定的键名header对应的值
Abort()
停止当前http请求。对应的XMLHttpRequest对象会复位到未初始化的状态。
</pre>



