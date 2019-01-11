---
title: 学习web存储
date: 2016-09-27 14:33:54
tags: html5+css3
---

## HTML5 Web 存储

h5的存储方式包括：LocalStorage、SessionStorage、 GlobalStroage、Web SQL、IndexDb五种方式

<!-- more -->

html5提供了两种在客户端存储数据的新方法

 * localStorage - 没有时间限制的数据存储，也就是持久化的本地存储除非主动删除否则数据永远不会过期
 * sessionStorage - 针对一个session的数据存储,这些数据只有在同一个会话中的页面才能访问并且对话结束后数据也随之销毁，不是一种持久的本地存储
 
 
        之前，这些都是由 cookie 完成的。但是 cookie 不适合大量数据的存储，因为它们由每个对服务器的请求来传递，这使得 cookie 速度很慢而且效率也不高。除此之外，Web Storage拥有setItem,getItem,removeItem,clear等方法，不像cookie需要前端开发者自己封装setCookie，getCookie。
        但是Cookie也是不可以或缺的：Cookie的作用是与服务器进行交互，作为HTTP规范的一部分而存在 ，而Web Storage仅仅是为了在本地“存储”数据而生

* localStorage是一个普通对象，任何对象的操作都适用。
* localStorage对象的属性值只能是字符串。
  * 这个需要特别注意了，假设我们要保存一个对象到localStorage中，可以使用拼接的方式或者借助JSON类，将对象换成字符窜

拼接

```js
var obj = {
    "na=me": "chua",
    age: 9
}

//拼接到localStorage
var str = "";
for(var i in obj){
    str += encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]) + ";"
}
str = str.substring(0,str.length - 1);
localStorage.testObj = str;

//解析出来
var strA = localStorage.testObj.split(";");
var newObj = {};
for(var i = 0; i < strA.length; i++){
    var tmp = strA[i].split("=");
    newObj[decodeURIComponent(tmp[0])] = decodeURIComponent(tmp[1]);
}
```

json类

     JSON.parse()
     JSON.stringify()


获取localStorage中保存的键值对的数量：localStorage.length。
下面这个例子用来获取localStorage的键值对

```js
for(var i=0;i<localStorage.length;i++){
    console.log(localStorage.key(i)+ " : " + localStorage.getItem(localStorage.key(i)));
 }
```

### html5 web storage的浏览器支持

浏览器的支持除了IE７及以下不支持外，其他标准浏览器都完全支持(ie及FF需在web服务器里运行)，值得一提的是IE总是办好事，例如IE7、IE6中的UserData其实就是javascript本地存储的解决方案。通过简单的代码封装可以统一到所有的浏览器都支持web storage。
要判断浏览器是否支持localStorage可以使用下面的代码：

```js
if(window.localStorage){
alert("浏览支持localStorage") 
}
else
{ 
alert("浏览暂不支持localStorage") 
} 
//或者 if(typeof window.localStorage == 'undefined'){ alert("浏览暂不支持localStorage") }
```

封装

```js
// <![CDATA[
(function(){
window.localData = {
        hname:location.hostname?location.hostname:'localStatus',
        isLocalStorage:window.localStorage?true:false,
        dataDom:null,

        initDom:function(){
            if(!this.dataDom){
                try{
                    this.dataDom = document.createElement('input');
                    this.dataDom.type = 'hidden';
                    this.dataDom.style.display = "none";
                    this.dataDom.addBehavior('#default#userData');
                    document.body.appendChild(this.dataDom);
                    var exDate = new Date();
                    exDate = exDate.getDate()+30;
                    this.dataDom.expires = exDate.toUTCString();
                }catch(ex){
                    return false;
                }
            }
            return true;
        },
        set:function(key,value){
            if(this.isLocalStorage){
                window.localStorage.setItem(key,value);
            }else{
                if(this.initDom()){
                    this.dataDom.load(this.hname);
                    this.dataDom.setAttribute(key,value);
                    this.dataDom.save(this.hname)
                }
            }
        },
        get:function(key){
            if(this.isLocalStorage){
                return window.localStorage.getItem(key);
            }else{
                if(this.initDom()){
                    this.dataDom.load(this.hname);
                    return this.dataDom.getAttribute(key);
                }
            }
        },
        remove:function(key){
            if(this.isLocalStorage){
                localStorage.removeItem(key);
            }else{
                if(this.initDom()){
                    this.dataDom.load(this.hname);
                    this.dataDom.removeAttribute(key);
                    this.dataDom.save(this.hname)
                }
            }
        }
    }

    var text = document.getElementById('localDataHook');
    var btn = document.getElementById('clearBtnHook');
    window.onbeforeunload = function(){
        localData.set('beiyuuData',text.value);
    }
    btn.onclick = function(){localData.remove('beiyuuData');text.value=''};
    if(localData.get('beiyuuData')){
        text.value = localData.get('beiyuuData');
    }
})()
// ]]>

```

### localStorage和sessionStorage操作

localStorage和sessionStorage都具有相同的操作方法，例如setItem、getItem和removeItem等

setItem存储value
用途：将value存储到key字段
用法：.setItem( key, value)

	sessionStorage.setItem("key", "value");
	localStorage.setItem("site", "58lih.com");

getItem获取value
用途：获取指定key本地存储的值
用法：.getItem(key)

	var value = sessionStorage.getItem("key"); 
	var site = localStorage.getItem("site");

removeItem删除key
用途：删除指定key本地存储的值
用法：.removeItem(key)
	
	sessionStorage.removeItem("key"); 
	localStorage.removeItem("site");

clear清除所有的key/value
用途：清除所有的key/value
用法：.clear()

	sessionStorage.clear();
	localStorage.clear();

web Storage不但可以用自身的setItem,getItem等方便存取，也可以像普通对象一样用点(.)操作符，及[]的方式进行数据存储

### localStorage和sessionStorage的key和length属性实现遍历