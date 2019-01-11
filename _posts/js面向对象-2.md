---
title: js面向对象（一）
date: 2016-12-29 10:49:47
tags: javascript
---

面向对象程序设计（OOP）最常用到的概念：
	
		1.对象、方法、属性
		2.类
		3.封装
		4.聚合
		5.重用与继承
		6.多态

<!-- more -->



auto

使用普通滚动, 当手指从触摸屏上移开，滚动会立即停止。

touch

使用具有回弹效果的滚动, 当手指从触摸屏上移开，内容会继续保持一段时间的滚动效果。继续滚动的速度和持续的时间和滚动手势的强烈程度成正比。同时也会创建一个新的堆栈上下文。
-webkit-overflow-scrolling是真的创建了带有硬件加速的系统级控件，所以效率很高。但是这相对是耗更多内存的，最好在产生了非常大面积的overflow时才应用。

/*建议：将属性挂在body上可以避免很多奇怪的bug*/

body{-webkit-overflow-scrolling:touch;}

/*局部滚动的DOM节点*/

.scroll-el{overflow-y:auto;}

隐藏滚动条

::-webkit-scrollbar {

display: none;;

}

局部滚动案例 [demo](http://www.58lih.com/demo/scroll-touch.html)

思路：

1.当用户点击开启以后，页面禁止滑动（touchmove）;当用户手处发滑动的div的时候，开启页面滑动，手指离开屏幕，页面禁止滑动

