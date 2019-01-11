---
title: webkit 私有属性
date: 2017-04-01 10:45:57
tags:
---


主要就是项目当中遇到的，整理一下

# -webkit-overflow-scrolling

-webkit-overflow-scrolling 属性控制元素在移动设备上是否使用滚动回弹效果


		-webkit-overflow-scrolling: touch; 使用具有回弹效果的滚动，当手指移开，内容会保持一段时间的滚动效果

		-webkit-overflow-scrolling: auto; 使用普通滚动，当手指从触摸屏上移开，滚动会立即停止


# ::-webkit-scrollbar 滚动条整体部分

如需要隐藏可使用 ::-webkit-scrollbar{display:none}

# ::-webkit-scrollbar-thumb 滚动轴

# -webkit-tap-highlight-color:transparent 透明值

# -webkit-appearance 改变按钮和其他控制外观

		-webkit-appearance:none

# -webkit-line-clamp 限制在一块元素显示的文本的行数

		  overflow : hidden;
		  text-overflow: ellipsis;
		  display: -webkit-box;
		  -webkit-line-clamp: 2;
		  -webkit-box-orient: vertical;

# 单行省略号

		white-space:nowrap;
		overflow:hidden;
		text-overflow:ellipsis;