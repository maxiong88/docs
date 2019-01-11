---
title: js组件之滚动
date: 2016-10-09 16:35:24
tags: javascript
---

主要是在实际项目当中遇到的问题总结

这篇是滚动组件

<!-- more -->

# 一、大话主席的


## [SuperSlide](http://www.superslide2.com/)  

  * pc端



## [TouchSlide](http://www.superslide2.com/TouchSlide/)
  
  * 移动端

不多说了，可去官网查看api，与demo

### 细节：

###### superslide左滚动自适应窗口宽度临时解决方案（更新v2.1.2）  [下载地址](http://www.superslide2.com/SuperSlide.2.1.2/jquery.SuperSlide.2.1.2.js) 

		1、增加参数设置 vis:"auto"，仅适应于：scroll:1, effect:"left或leftLoop"情况（也就是通常的单图片滚动自适应宽度焦点图）
		如上面案例调用：jQuery(".fullSlide").slide({ titCell:".hd ul", mainCell:".bd ul", effect:"leftLoop", vis:"auto", scroll:1, autoPlay:true, autoPage:true, trigger:"click" });
	
		2、修复 mouseOverStop 和 autoPlay均为false下，点击切换按钮后会自动播放bug


###### startFun/endFun介绍

SuperSlide能处理大部分效果，但也不是万能。当遇到一些特殊效果时或者想实现更炫的效果时，这两个函数可以帮到我们，前提是你有一定的javascript基础。

startFun：每次切换效果开始时执行函数，用于处理特殊情况或创建更多效果。用法 satrtFun:function(i,c){ }； 其中i为当前分页，c为总页数
endFun：每次切换效果结束时执行函数，用于处理特殊情况或创建更多效果。用法 endFun:function(i,c){ }； 其中i为当前分页，c为总页数

例如：调用下面的SuperSlide，并使用startFun和endFun会看到下面效果

```js
jQuery("#slideBox").slide({ mainCell:".bd ul",autoPlay:true,effect:"left",delayTime:2000,interTime:8000,
    startFun:function(i,c){
        $("#textarea").val( $("#textarea").val()+ "第"+(i+1)+"个效果开始，同时执行startFun函数。当前分页状态："+(i+1)+"/"+c+"\r\n")
    },
    endFun:function(i,c){
        $("#textarea").val( $("#textarea").val()+ "第"+(i+1)+"个效果结束，开始执行endFun函数。当前分页状态："+(i+1)+"/"+c+"\r\n")
    }
});
```

###### 实例：titCell、mainCell、targetCell 同时应用

`有时候我们会遇到 Tab 切换右侧有“更多”的情况，此时 targetCell 能很好解决问题`

```html
<div class="slideTxtBox">
    <div class="hd">
        <span class="more">
            <a href="#">> 更多1</a>
            <a href="#">> 更多2</a>
            <a href="#">> 更多3</a>
        </span>
        <ul><li>教育</li><li>培训</li><li>出国</li></ul>
    </div>
    <div class="bd">
        <ul>
            <li><span class="date">2011-11-11</span><a href="#">中国打破了世界软件巨头规则</a></li>
            <li><span class="date">2011-11-11</span><a href="#">口语：会说中文就能说英语！</a></li>
            <li><span class="date">2011-11-11</span><a href="#">农场摘菜不如在线学外语好玩</a></li>
            <li><span class="date">2011-11-11</span><a href="#">数理化老师竟也看学习资料？</a></li>
        </ul>
        <ul>
            <li><span class="date">2011-11-11</span><a href="#">名师教作文：３妙招巧写高分</a></li>
            <li><span class="date">2011-11-11</span><a href="#">耶鲁小子：教你备考SAT</a></li>
            <li><span class="date">2011-11-11</span><a href="#">施强：高端专业语言教学</a></li>
            <li><span class="date">2011-11-11</span><a href="#">数理化老师竟也看学习资料？</a></li>
        </ul>
        <ul>
            <li><span class="date">2011-11-11</span><a href="#">澳大利亚八大名校招生说明会</a></li>
            <li><span class="date">2011-11-11</span><a href="#">2012世界大学排名新鲜出炉</a></li>
            <li><span class="date">2011-11-11</span><a href="#">新加坡留学，国际双语课程</a></li>
            <li><span class="date">2011-11-11</span><a href="#">高考后留学日本名校随你选</a></li>
        </ul>
    </div>
</div>
```

```js
jQuery(".slideTxtBox").slide({ titCell:".hd li", mainCell:".bd", targetCell:".more a", autoPlay:true});
```

###### 实例：多列滚动-js分组

图解

![图解](../css/images/jsGroup.png)

```html
<div id="multipleColumn">
    <div class="hd">
        <a class="next"></a>
        <ul></ul>
        <a class="prev"></a>
        <span class="pageState"></span>
    </div>
    <div class="bd">
 
            <div class="picList">
                <li>...1</li>
                <li>...1</li>
                <li>...1</li>
                <li>...1</li>
                <li>...1</li>
                <li>...1</li>
                <li>...2</li>
                <li>...2</li>
                <li>...2</li>
                <li>...2</li>
                <li>...2</li>
                <li>...2</li>
                <li>...3</li>
                <li>...3</li>
                <li>...3</li>
                <li>...3</li>
                <li>...3</li>
                <li>...3</li>
            </div>
 
    </div>
</div>
```

```js
/* 使用js分组，每6个li放到一个ul里面 */
jQuery("#multipleColumn .bd li").each(function(i){ jQuery("#multipleColumn .bd li").slice(i*6,i*6+6).wrapAll("<ul></ul>");});
 
/* 调用SuperSlide，每次滚动一个ul，相当于每次滚动6个li */
jQuery("#multipleColumn").slide({titCell:".hd ul",mainCell:".bd .picList",autoPage:true,effect:"leftLoop",autoPlay:true});
```

### [英雄呼吁官网](http://www.yingxiong.com/join.html)


# 多图滚动Jquery插件

* <a href="http://www.58lih.com/demo/slider1.html#mxpiclf" target="_blank">mxpiclf</a>
* <a href="http://www.58lih.com/demo/slider1.html#fluxe" target="_blank">fluxe</a>


