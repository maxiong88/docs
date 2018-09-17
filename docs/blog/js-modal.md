---
title: 弹出层
description: '主要讲弹出层出现的时候如何防止浏览器闪烁并且下面的页面不跟随滚动轴滚动'
sidebar: 'auto'
time: '2015-01-02'
prev: './js-exports'
next: './js-clone'
---
# 遮罩层

应用中大部分页面还是需要弹出层的，而最简便的方法就是设置 

``` css
html, body{
	overflow: hidden;
}
```

这里的弊端：我们会看到页面闪烁一下。

这里的我用到了bootstrap的解决方法（IE8+、IE9+）

## 判断浏览器滚动条宽度

::: tip
创建一个空div
添加class 设置出现滚动条
获取宽度
移除
:::

现在我们直接将重点，先来看几个api

> Element.getBoundingClientRect()(IE9+) 方法返回元素的大小及其相对于`视口的位置`
> > 返回DOMRect对象,这个对象是由该元素的 getClientRects() 方法返回的(方法返回一个指向客户端中每一个盒子的边界矩形的矩形集合。 )`一组矩形`的集合DOMRect{x:'',y:'',top:'',bottom:'',left:'',right:'',width:'',height:''}
> >
> > getClientRects()，返回值是ClientRect对象集合，该对象是与该元素相关的CSS边框。
> 
> clientWidth 是指可视区域的宽度，如有滚动条不包括滚动条
>
> offsetWidth (IE8+)返回一个元素的布局宽度，offsetWidth是测量包含元素的边框(border)、水平线上的内边距(padding)、竖直方向滚动条(scrollbar)（如果存在的话）、以及CSS设置的宽度(width)的值。
>
> scrollWidth 是指实际内容的宽度，不包括滚动条的宽度
>
> 


### 如何获取当前浏览器滚动条宽度

```js
.modal-scrollbar-measure {
    position: absolute;
    top: -9999px;
    width: 50px;
    height: 50px;
    overflow: scroll
}

// 兼容ie 9+
function _getScrollbarWidth(){
	var scrollDiv = document.createElement('div');
	scrollDiv.className = "modal-scrollbar-measure";
	document.body.appendChild(scrollDiv);
	var scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
	document.body.removeChild(scrollDiv)
	return scrollbarWidth;
}

// 兼容ie8

var measureScrollbar = function() {
	var scrollDiv = document.createElement("div");
	scrollDiv.className = "modal-scrollbar-measure",
	document.body.appendChild(scrollDiv);
	var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
	document.body.removeChild(scrollDiv)
	return scrollbarWidth
};
```

## 出现遮罩层去除滚动条闪烁

```css
body 添加
body{
	overflow:hidden;
	padding-right:_getScrollbarWidth()+"px"
}
modal 背景层
modal{
	padding-right:_getScrollbarWidth()+"px"
}
```


## 弹出层内容过多让其出现滚动条

```html
<div class="modal">
	<div class="modal-dialog">
		<div class=""></div>
	</div>
</div>
<style>
.modal {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1050;
    overflow-x: hidden;
    overflow-y: auto;
	background:rgba(0,0,0,.5);
    outline: 0;
	display: block;
    padding-right: 17px;
}
.modal-dialog{
	width: 500px;
	margin: 1.75rem auto;
	height:2000px;
	background:#FFF;
}
</style>
```

## 课外

现在 web ui框架很多，但是还是推荐使用 bootstrap  element-ui ant design cube-ui Vant 等




