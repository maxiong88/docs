---
title: h5存储
description: 'h5存储'
sidebar: 'auto'
time: '2015-01-06'
prev: ''
next: ''
---

1.html5中的web storage（司涛蕊之）（网络存储）两种方式：sessionStorage，localStorage
 sessionStorage用于本地存储一个会话session中的数据，这些数据只有在同一个会话中的页面才能访问当会话结束（页面关闭时）数据也随之消失
 sessionstorage不是一种持久化的本地存储，仅仅是会话级别的存储
 而localStorage用于持久化本地存储，除非主动删除数据，否则数据是永远不会过期的
web storage和cookie的区别
Web Storage的概念和cookie相似，区别是它是为了更大容量存储设计的。Cookie的大小是受限的，并且每次你请求一个新的页面的时候Cookie都会被发送过去，这样无形中浪费了带宽，另外cookie还需要指定作用域，不可以跨域调用。
除此之外，Web Storage拥有setItem,getItem,removeItem,clear等方法，不像cookie需要前端开发者自己封装setCookie，getCookie。
但是Cookie也是不可以或缺的：Cookie的作用是与服务器进行交互，作为HTTP规范的一部分而存在 ，而Web Storage仅仅是为了在本地“存储”数据而生
if(window.addEventlistener){
window.addEventlistener("storage",storage_fun,false);

}else if(window.attachEvent){
window.attachEvent("storage",storage_fun);

}

IE7一下用userData

2.html5  touch事件
  touchstart事件：当手指触摸屏幕时候触发，即使已经有一个手指放在屏幕上也会触发
  touchmove事件：当手指在屏幕滑动的时候连续的触发，在这个事件发生期间，调用preventDefault()事件可以阻止滚动
  touchend事件：当手指从屏幕上离开的时候触发
  touchcancel事件：当系统停止跟踪触摸的时候触发
  clientX返回当前事件被触发时，鼠标指针的水平位置
  clientY返回事件触发时，鼠标指针的垂直坐标
  screenX当某个事件被触发时，鼠标真挚的水平坐标
  screenY(返回当某个事件被触发时，鼠标指针的垂直坐标)
  touches:表示当前跟踪的触摸操作的touch对象的数组
  targetTouches：特定于事件目标的touch对象数组
  changeTouches：表示自上次触摸以来发生了什么改变的Touch对象的数组。
  每个Touch对象包含的属性如下。
  clientX：触摸目标在视口中的x坐标。
  clientY：触摸目标在视口中的y坐标。
  identifier：标识触摸的唯一ID。
   pageX：触摸目标在页面中的x坐标。
   pageY：触摸目标在页面中的y坐标。
   screenX：触摸目标在屏幕中的x坐标。
   screenY：触摸目标在屏幕中的y坐标。
   target：触目的DOM节点目标。

touch  事件  需要阻止事件的默认行为   event.preventDefault();


html5测试工具
1.webkit内核使用---谷歌的toggle device mode （他勾 低外丝 猫的）
                ---苹果真机
2.火狐os 模拟器--firebug
3.IE浏览器----使用IEtester  IE泰丝特
4.使用browserstack测试    不绕则 丝泰克
5.欧鹏浏览器


css字体选择
   font-family:'Hiragino Sans GB','Microsoft Yahei',"WenQuanYi Micro Hei",SimSun,Tahoma,Arial,Helvetica,STHeiti;

这些网页字体依次是 “苹果丽黑字体”(这个是苹果系列设备上用)，微软雅黑、文泉驿(细)微米黑字体，宋体，Tahoma,Arial,Helvetica,苹果黑体字体(这个是苹果系列设备上用)

如何选择网页字体？
建议使用微软雅黑，如果是数字或者字母的话可以尝试使用英文字体Tahoma,Arial,Helvetica，兼顾一下苹果系列设备，附加一个'Hiragino Sans GB',STHeiti

微软雅黑如果是小字号会不好看，大字号会比较好看，雅黑字体加粗不好看，大字号不加
粗比较美观。

font-size:字体大小 移动端使用rem


如何有效减少网页加载时间？
 1.减少页面http请求数量
    a.使用CSS Sprites技术进行图片合并
    b.
  2.cdn网络加速
  3.添加文件缓存头
  4.服务器开启gzip压缩
  5.js脚本放到末尾
  6.避免使用css脚本
  7.css,js外部调用，合并压缩文件
  8.尽可能减少dcom元素
  9.分页方式

360浏览器渲染模式固定极速模式 <meta name="renderer" content="webkit">


Modernizr(毛豆奶子)是一个检测浏览器对HTML5和CSS3特性默认触摸事件 */

问题

  -ms-touch-action: none;  /* 阻止windows Phone 的默认触摸事件 */



box-shadw阴影 上（负） 右（正）下（正）左（负） 当为0 0 的时候四周都有阴影  第三个参数就是模糊距离 第四个参数模糊长度
