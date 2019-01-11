---
title: Eruda-手机网页调试利器
date: 2017-08-27 19:06:24
tags: 前端杂谈
---

Eruda 是一个专为手机网页前端设计的调试面板，类似 DevTools 的迷你版，其主要功能包括：捕获 console 日志、检查元素状态、显示性能指标、捕获 XHR 请求、显示本地存储和 Cookie 信息、浏览器特性检测等等。


<!-- more -->


## 添加代码
	
	`
	    if (location.href.indexOf("f12=1") != -1) {
	        var e = document.createElement("script");
	        e.src = "//https://github.com/liriliri/eruda/blob/master/doc/README_CN.md";
	        e.onload = function() {
	            window.eruda && window.eruda.init();
	            e = null
	        };
	        document.head.appendChild(e)
	    }
	
	`
	
	
### 感谢

	[http://eruda.liriliri.io/](http://eruda.liriliri.io/)
	[https://www.v2ex.com/t/316893](https://www.v2ex.com/t/316893)
	

