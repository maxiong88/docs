---
title: charles 遇到的问题
date: 2017-06-01 22:37:09
tags: charles
---

1.Charles 代理失败
2.Charles 破解
3.Charles 知识

<!-- more -->

#### Charles 代理失败

`charles ios10.3 代理失败 SSLHandshake: Received fatal alert: unknown_ca`

`ios升级10版本发现使用charles代理访问https返回unknown ，即：SSLHandshake: Received fatal alert: unknown_ca`

好嘛，我抓个包，发现https 全部变成了unknown 。
charles设置好了代理，手机上设置好了ip地址和端口。
这不科学
经过一番探索终于在酷推上找到一篇文章
翻译如下：
在IOS10.3中信任根证书
设置》通用》关于本机》证书信任设置（这个在最下面） �勾选针对根证书启用完全信任。
再次进入charles 嘿嘿嘿。
这是ios处于安全性的考虑，没有默认开启，大家遇到这样的问题设置下就可以。当然前提是，必须设置好服务端和客户端的代理

#### Charles破解

[Charles最新版破解注册方法](http://charles.iiilab.com/)

#### Charles基础

* 左侧
	* Structure 网络请求按访问域名分类
	* Sequence 网络请求按访问的时间排序
    
* 过滤网络
	* filter 栏目输入
	* Proxy->Recording Setting->include 设置
	* 在想过滤的网络请求上右击，选择 “Focus”，之后在 Filter 一栏勾选上 Focussed 一项
    
* 代理
	* 在 Charles 的菜单栏上选择 “Proxy”–>“Proxy Settings”，填入代理端口 8888，并且勾上 “Enable transparent HTTP proxying” 就完成了在 Charles 上的设置
    
* 模拟慢速网络
	* Proxy”–>“Throttle Setting

* 解决冲突
	
	
	
	
	
转载：http://blog.csdn.net/sinat_21302587/article/details/72461258
转载：http://charles.iiilab.com/


修改与2017.09.03

 


