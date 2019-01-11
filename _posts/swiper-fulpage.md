---
title: js组件
date: 2016-09-29 11:57:35
tags: javascript
---


主要是在实际项目当中遇到的问题总结

这篇是滑动组件

<!-- more -->

## swiper.js (移动端)

### 版本号

* v3.3.1

### api

* [中文](http://www.swiper.com.cn/)
* [英文](http://idangero.us/swiper/)


### 基本使用 遇到的问题

###### effects 切换效果注意事项

在使用effect为fade(淡入淡出的时候)，如果图片为png的时候，请设置参数fade为true

   * 默认：false。关闭淡出。过渡时，原slide透明度为1（不淡出），过渡中的slide透明度从0->1（淡入），其他slide透明度0。
   * 选值：true。开启淡出。过渡时，原slide透明度从1->0（淡出），过渡中的slide透明度从0->1（淡入），其他slide透明度0。


###### swiper嵌套swiper

1、swiper在嵌套swiper的时候（注：IOS设备中），swiper的左右按钮无法显示（原因不明确啊）
  

   * 如果子元素有动画，(或者有下滑箭头)
    
	     0%{-webkit-transform:translate3d(0,0,0);} 
	     100%{-webkit-transform:none;}
	     备注：如果使用-webkit-transform:translate3d(0,0,0);无效
	     请大家以后在结束动画以后使用none


      <span class="nextBg"><em></em></span>

      .swiper .slide1.swiper-slide-active .nextBg{
		 -webkit-animation:fadeIn ease-in-out .3s 1.5s both;
		 animation:fadeIn ease-in-out .3s 1.5s both
		}
		@-webkit-keyframes fadeIn{
			0%{
			filter:alpha(opacity=0);
			-webkit-opacity:0;
			-moz-opacity:0;
			opacity:0;
			-webkit-transform:translate3d(0,0,0)
			}
		100%{
			opacity:1;
			filter:alpha(opacity=100);
			-webkit-opacity:100;
			-moz-opacity:100;
			opacity:100;
			-webkit-transform:none
			}
		}

		@keyframes fadeIn{
			0%{filter:alpha(opacity=0);
			-webkit-opacity:0;
			-moz-opacity:0;
			opacity:0;transform:translate3d(0,0,0)
			}
		100%{
			opacity:1;
			filter:alpha(opacity=100);
			-webkit-opacity:100;
			-moz-opacity:100;
			opacity:100;
			transform:none
			}
		}
     .swiper .nextBg em {
	    -webkit-animation: upAndDown1 .5s ease-out alternate infinite both;
	    -moz-animation: upAndDown1 .5s ease-out alternate infinite both;
	    -ms-animation: upAndDown1 .5s ease-out alternate infinite both;
	    animation: upAndDown1 .5s ease-out alternate infinite both;
	}
	
	@-webkit-keyframes upAndDown1{
       0%{-webkit-transform:translateY(.15rem)}
	   100%{-webkit-transform:translateY(-.15rem)}
	}
	@keyframes upAndDown1{
       0%{transform:translateY(.15rem)}
	   100%{transform:translateY(-.15rem)}
	}

          

  * js
     * [案例](http://dev.static.yingxiong.com/zjlm/2.0/m/) 
       
     每次滑动的时候请求此方法

		 ```js
		  
		//兼容ios
		$("body").append("<div class='iosBugpic' style='width:100%;height:100%;position:fixed;left:0;top:0;z-index:111;background:transparent;'></div>")
		setTimeout(function(){$(".iosBugpic").remove()},100);
		
		 ```

   * （原因。。。。。）
   * 感觉bug的出现好像是没有按w3c标准去写
   * [w3cschool](http://www.w3school.com.cn/)


###### swiper 网络布局

* centeredSlides
  *  设定为true时，活动块会居中，而不是默认状态下的居左。
* [slidesPerView](http://www.swiper.com.cn/api/Slides_grid/2014/1215/24.html)
  * 设置slider容器能够同时显示的slides数量(carousel模式)。
  * 可以设置为number或者 'auto'则自动根据slides的宽度来设定数量。
  * loop模式下如果设置为'auto'还需要设置另外一个参数loopedSlides。
  * loopedSlides 在loop模式下使用slidesPerview:'auto',还需使用该参数设置所要用到的loop个数。
* [slidesPerGroup](http://www.swiper.com.cn/api/Slides_grid/2014/1217/27.html)
  * 在carousel mode下定义slides的数量多少为一组。 
* [spaceBetween](http://www.swiper.com.cn/api/Slides_grid/2015/0308/198.html) 
  * slide之间的距离（单位px）。
* [slidesPerColumn](http://www.swiper.com.cn/api/Slides_grid/2015/0308/199.html) 
  * 多行布局里面每列的slide数量。 
* [slidesPerColumnFill](http://www.swiper.com.cn/api/Slides_grid/2015/0308/200.html)
  * 多行布局中以什么形式填充：

## (重点)

* [slidesOffsetBefore](http://www.swiper.com.cn/api/Slides_grid/2015/0722/282.html)
  * 设定slide与左边框(上边框)的预设偏移量（单位px）。
* [slidesOffsetAfter](http://www.swiper.com.cn/api/Slides_grid/2015/0722/283.html) 
  * 设定slide与右边框(下边框)的预设偏移量（单位px）。
  * [案例](http://yys.163.com/m/)
  * [案例](http://zh.163.com/m/)
  * [测试](/ceshi-web/1)

###### swiper 在安卓机上qq自带浏览器会出现卡顿(处理方法)


  * observer 启动动态检查器，当改变swiper的样式（例如隐藏/显示）或者修改swiper的子元素时，自动初始化swiper。
     *  observer : !0

  * followFinger  默认true, 如设置为false，拖动slide时它不会动，当你释放时slide才会切换。
     *  followFinger : !1


###### swiper 快速切换到指定slide。

  * mySwiper.slideTo(index, speed, runCallbacks)
    * Swiper切换到指定slide。
    * index:必选，num，指定将要切换到的slide的索引。
    * speed:可选，num(单位ms)，切换速度
    * runCallbacks:可选，boolean，设置为false时不会触发onSlideChange回调函数。
