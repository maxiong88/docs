---
title: scrollWidth/clientWidth/offsetWidth
date: 2017-08-01 23:45:31
tags: 随手笔记
---

说一下，scrollWidth、clientWidth、offsetWidth的区别

<!--more-->

通过demo测试这三个属性差别

srcollWidth: 

		根据[mdn解释](https://developer.mozilla.org/zh-CN/docs/Web/API/element/		scrollWidth)元素的scrollWidth只读属性以px为单位返回元素的内容区域宽度或元素的本身的宽度		中更大的那个值。若元素的宽度大于其内容的区域（例如，元素存在滚动条时），scrollWidth得值要		大于clienWidth。
		
		这个属性会进行四舍五入并返回整数，如果你需要小数形式的值，
		使用[element.getBoundingClientRect()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect).
		
		
		语法：
		
		var xScrollWidth = element.scrollWidth;
		xScrollWidth的值是元素的内容宽度
		
		
clientWidth：

		  只读属性，根据[mdn解释](https://developer.mozilla.org/zh-CN/docs/Web/API/element/clientWidth)
       Element.clientWidth 属性表示元素的内部宽度，以像素计。
       该属性包括内边距，但不包括垂直滚动条（如果有）、边框和外边距。
       
       
       该属性值会被四舍五入为一个整数。
       如果你需要一个小数值，可使用 element.getBoundingClientRect()。
       
       语法：
       
       var intElemClientWidth = element.clientWidth;
       
       intElemClientWidth 是一个整数，表示元素的 clientWidth。
       
       
offsetWidth:

			只读属性，根据[mdn解释](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/offsetWidth)
			HTMLElement.offsetWidth 是一个只读属性，返回一个元素的布局宽度。一个典型的（译者			注：各浏览器的offsetWidth可能有所不同）offsetWidth是测量元素的边框(border)、水平线			上的内边距(padding)、竖直方向滚动条(scroolbar)（如果存在的话）、以及CSS设置的宽度			(width)的值。    
			
			语法
			
			var offsetWidth =element.offsetWidth;
			
			
	
	
后续！会把图片加上		
   

		
		

