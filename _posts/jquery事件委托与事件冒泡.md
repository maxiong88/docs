---
title: jquery事件委托与事件冒泡
date: 2017-05-16 11:04:35
tags: javascript
---

面试中的问题，关于 事件委托与事件冒泡，jquery on委托事件body在ios下点击无效等；

<!-- more -->


#### 1.什么是事件委托，什么是事件冒泡

事件委托：

	事件：onclick  onmouseover onmouseout 等
	
	委托：就是让别人来做，这个事件本来是加在某些元素上的，然而你却加到别人身上来做，完成这个事件
	
	好处：1.提高性能（不能去操作每个dom）
	
			2.未来元素还会有之前的事件
			
			
			
			
事件冒泡：

	事件：onclick  onmouseover onmouseout 等
	
	冒泡：向上执行
	
	
	阻止冒泡方法：
	
	1。父级使用on 子集使用onclick
	


```
$("#a2").on("click",function(){
  console.log("a2")
})
$("#a3").on("click",function(){
  console.log("a3")
})
// 点击a3的时候，先执行a3，在执行a2 打开浏览器 （向上冒泡了）

解决方法

$("#a3").on("click",function(e){
  console.log("a3");
  e.stopPropagation()// 阻止了冒泡
  e.preventDefault() // 阻止了默认行为
  // 或
  return false
})
// 点击a3的时候只执行a3

// 如果是动态生成的 绑定同一个父级
$("#a2").append('<button id="a3">2222222</button>')
$("body").on("click","#a2",function(){
  console.log("a2")
})
$("body").on("click",'#a3',function(e){
  console.log("a3");
  e.stopPropagation()// 阻止了冒泡
  e.preventDefault() // 阻止了默认行为
  // 或
  return false
})

```	

			

#### onclick与addEventListener 区别

他只执行最后一个：

	document.getElementById("xxx").onclick = function(){}

他按顺序执行：

	document.getElementById("xxx").addEventListener("click",function(){},false)
	
addEventListener 三个参数 最后一个（false true）

	true  事件句柄在捕获阶段执行 （从上到下执行 从父元素到子元素）
	
	false 事件句柄在冒泡阶段执行 （从下到上执行 从子元素到父元素）
	


#### 在ios下，使用document或者body 绑定 click事件点击无效

1.使用jquery on事件委托

	```
	$("body"/document).on("click","xxx",function(){})
	```
	
	解决办法：
	
		1.将click换成touchstart，这样会出现穿透，需要添加 return false
		2.换成可冒泡的标签，例如：a，
		3.在此标签上添加css属性，cursor：pointer
		
		
#### 禁止a标签点击

	1.添加css属性 pointer-events：none css3属性
	2.阻止其默认行为 e.preventDefault() 	

	



