---
title: Fullpage入门指南
date: 2016-10-10 15:17:03
tags: fullpage
---

Fullpage是最好用的全屏滚动插件，很多前端设计师用他制作出了优秀的效果，本小节的内容将为大家介绍如何快速的使用Fullpage插件，构建自己的全屏单页网站。(IE8+)

<!-- more -->

## 1.安装

    npm install fullpage.js

或引入插件文件

    head
   
        <link rel="stylesheet" type="text/css" href="//cdn.bootcss.com/fullPage.js/2.8.6/jquery.fullPage.min.css" />

    body

        <script src="//cdn.bootcss.com/jquery/1.8.2/jquery.min.js"></script>
        <script type="text/javascript" src="//cdn.bootcss.com/fullPage.js/2.8.6/jquery.fullPage.min.js"></script>


对于内容比较多的页面，可以设置右侧的滚动条，但是默认情况下无法滚动，你需要jquery.slimscroll.min.js文件来自定义滑条滚动效果。



## 2、编写HTML代码  
  
默认情况下，每一屏幕的代码都需要有DIV包裹，并且设置DIV的类名为section，默认情况下，第一个setion将作为首页显示在页面上。

	<div id="fullpage">
		<div class="section">Some section</div>
		<div class="section">Some section</div>
		<div class="section">Some section</div>
		<div class="section">Some section</div>
	</div>

假如你需要让某一个section作为首页的第一屏展示，你只需要给这个section添加一个active的类，Fullpage会自动优先展示这个屏幕，例如定义下面的代码：

    <div class="section active">Some section</div>

Fullpage自带左右滑动的幻灯片，只需要在section中添加DIV元素，并且给DIV元素添加slide类，FUllpage会自动生成幻灯片特效，例如下面的代码：

	<div class="section">
		<div class="slide"> Slide 1 </div>
		<div class="slide"> Slide 2 </div>
		<div class="slide"> Slide 3 </div>
		<div class="slide"> Slide 4 </div>
	</div>

## 3、初始化Fullpage

使用jQuery的文档加载完毕以后执行函数，初始化Fullpage插件。

	$(document).ready(function() {
	     $('#fullpage').fullpage();
	});

## 4、Fullpage初始化参数

* `controlArrows: (default true)` 决定是否使用控制箭头向左或向右移动幻灯片。
* `verticalCentered: (default true)` 决定是否初始化后，是否垂直居中网页的内容，如果你想自定义元素的位置，那么你可以设置为false，在插件初始化后调用afterrender回调函数加载其它的脚本库设置你网页的内容。
* `scrollingSpeed: (default 700)`每个屏幕滚动动画执行的时间，时间的单位为毫秒（ms）
* `sectionsColor:(default none) `定义每个section的CSS背景演示，例如下面的代码：

		$('#fullpage').fullpage({
		    sectionsColor: ['#f2f2f2', '#4BBFC3', '#7BAABE', 'whitesmoke', '#000'],
		});

* `anchors: (default [])` 定义导航的锚文本信息例如（#example），每个导航文本之前用英文逗号（,）分隔，快速导航的锚文本URL也是使用的这个文本，浏览器通过此锚文本链接可以支持前进和后退按钮功能。此选项的设置还可以作为用户的书签，当用户打开带有锚文本的URL时，Fullpage可以自动跳转到对应的section屏幕或者slide幻灯片位置。注意，如果你使用了此选项，那么网页中不能有相同的ID，一来Fullpage插件无法准确的定位到section屏幕或者slide幻灯片位置，二来这也有悖网页中CSS的编写规范。

		$('#dowebok').fullpage({
			sectionsColor: ['#1bbc9b', '#4BBFC3', '#7BAABE', '#f90'],
			anchors: ['page1', 'page2', 'page3', 'page4'],
			menu: '#menu'
		});

* `lockAnchors: (default false)` 确定是否在URL中的锚点将在插件有任何影响。你仍然可以使用锚内部自己的函数和回调，但他们不会有任何作用，在网站的滚动。如果你想把fullpage.js在URL使用锚其他插件。注意，这样的设置有助于了解anchors选项在侧边栏菜单的对应关系，与类的元素的值。通过.section它在标记的位置。`自己理解`
* `easing: (default easeInOutCubic)` 定义了用于垂直和水平滚动的过渡效果，它要求文件vendors/jquery.easings.min.js或者jQuery UI插件，具体的动画效果你可以参考 easings插件介绍 ，你也可以使用其它的动画插件库。
* `easingcss3: (default ease) ` 定义在滚动屏幕中使用css3:true设置的过度效果，你可以使用 CSS3 transition-timing-function 属性 自定义多个动画效果，例如：linear、ease-out、……，或者使用cubic-bezier方法创建自定义的动画效果，你可能想要使用 Matthew Lein CSS Easing Animation Tool 创建这个。
* `loopTop: (default false) ` 定义屏幕滚动到第一个后，是否循序滚动到最后一个。  
* `loopBottom: (default false) ` 定义屏幕滚动到最后一个后，是否循环滚动到第一个。
* `loopHorizontal: (default true) ` 定义`水平的`幻灯片是否循环切换。
* `css3: (default true)` 确定是否使用JavaScript和CSS3转换滚动在切片和幻灯片。加快平板电脑和移动设备的浏览器支持CSS3的运动有益。如果此选项设置为true，浏览器不支持CSS3，jQuery回调函数将被替代。
* `autoScrolling: (default true) ` 是否使用插件的滚动方式，如果选择 false，则会出现浏览器自带的滚动条
* `fitToSection: (default true)` 设置是否自适应整个窗口的空间，以某个section的内容为分界线，设置为true时，某个的section将填充到整个页面，否者用户可以停留在网页的任何位置。
* `fitToSectionDelay: (default 1000)` 
* `scrollBar: (default false)` 定义是否使用浏览器默认的滚动条，如果使用浏览器默认的滚动条，autoScrolling配置任然生效，用户也可以自由滚动的网站与滚动条和fullpage.js将适合的部分在屏幕滚动时完成。
  *  <a href="http://alvarotrigo.com/fullPage/examples/scrollBar.html" target="_blank">scrollBar案例</a>
* `paddingTop: (default 0)` 定义每个section固定的头部留白，例如设置paddingBottom: ’10px’、 paddingBottom: ’10em’、……，在使用固定表头的情况下有用的。
* `paddingBottom: (default 0) ` 
   * 定义每个section固定的低部留白
* `fixedElements: (default null) `
* `normalScrollElements: (default null)`
* `normalScrollElementTouchThreshold : (default 5) `
* `bigSectionsDestination: (default null) `
* `keyboardScrolling: (default true) `
  * 是否使用键盘方向键导航
* `touchSensitivity: (default 5) `
  * 定义了浏览器窗口的宽度/高度的百分比，多远的触摸滑动可以跳转到下一个section / slide。
* `continuousVertical: (default false) `
  * 定义向下滚动到最后一节是否应该向下滚动到第一个，如果向上滚动的第一部分应该滚动到最后一个。不兼容loopTop和loopBottom选项。
* `continuousHorizontal: (default false) `
  * 定义的某个元素是否在网页的固定位置，元素将被关闭的插件是必要的时候，使用CSS3的选项保持滚动结构固定。它需要对这些元素的jQuery选择器字符串。例如：fixedElements: ‘#element1, .element2’。
* `scrollHorizontally: (default false)`
  * <a href="http://alvarotrigo.com/fullPage/extensions/scrollHorizontally.html" targte="_blank">scrollHorizontally案例</a>
* `interlockedSlides: (default false) `
  * 确定移动一个水平滑块将迫使其他部分滑动滑块在同一方向。可能的值是真实的，虚假的或与联锁部分阵列
  * interlocked: [1, 3],
  * <a href="http://alvarotrigo.com/fullPage/extensions/interlockedSlides.html" targte="_blank">interlocked案例</a>
* `resetSliders: (default false)`
* `fadingEffect: (default false)`
* `animateAnchor: (default true) `
  * 定义当网页的URL中有锚文本的时候，是否帮用户定位到对应的section或者slide。
* `recordHistory: (default true)`
  * 定义是否将网页滚动的的状态纪录到浏览器的历史记录中。
* `menu: (default false)`
```html
    <ul id="myMenu">
	    <li data-menuanchor="firstPage" class="active"><a href="#firstPage">First section</a></li>
	    <li data-menuanchor="secondPage"><a href="#secondPage">Second section</a></li>
	    <li data-menuanchor="thirdPage"><a href="#thirdPage">Third section</a></li>
	    <li data-menuanchor="fourthPage"><a href="#fourthPage">Fourth section</a></li>
	</ul>
```
```js
    $('#fullpage').fullpage({
	    anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage', 'lastPage'],
	    menu: '#myMenu'
	});
```

    注意：注意这个自定义的菜单代码应该放置到插件设置的内容外面，避免因为排版不兼容问题可以使用css3:true，否则将被附加到body的插件本身。

* `navigation: (default false)`
   * 如果设置为true，那他将会显示一个小圆圈组成的快速导航栏。


* `navigationPosition: (default none) `
   * 结合参数navigation一起使用，用于设置navigation定义的菜单显示的位置，可以设置为left/right。


* `navigationTooltips: (default [])`
   * 定义当navigation设置为true的时候，鼠标移动到快速导航上面的提示文本，每个属性中间用英文半角逗号（,）隔开


* `showActiveTooltip: (default false) `
   * 设置是否自动显示navigationTooltips中设置的工具提示文本。


* `slidesNavigation: (default false) `
  * 使用方法同navigation，不过这个参数设置的导航显示位置不同，而且这个是用户设置幻灯片的。
  * <a hred="http://alvarotrigo.com/fullPage/examples/navigationH.html" target="_blank">slidesNavigation案例</a>


* `slidesNavPosition: (default bottom)`
  * 定义slidesNavigation中设置的导航菜单显示的位置，可选的设置值为top/bottom，你可能要修改CSS样式确定的距离从顶部或底部以及任何其他风格如颜色。


* `scrollOverflow: (default false) `
  * 默认值：false，设置当内容超过屏幕的高度的时候，裁切多余的内容。
  * 当设置为true时，插件不会自动裁切多余的内容，但是剩下没有显示的内容任然不能显示，此时，你可以使用 jquery.slimscroll.min插件来自定义滚动事件，如果要使用这个插件，应该在Fullpage插件之前引入，例如下面的代码：
  
```JS 
	<script type="text/javascript" src="http://alvarotrigo.com/fullPage/vendors/scrolloverflow.min.js"></script>
	<script type="text/javascript" src="//cdn.bootcss.com/fullPage.js/2.8.6/jquery.fullPage.min.js"></script>
```

  * <a href="http://codepen.io/alvarotrigo/pen/rVZWQb" target="_blank">scrollOverflow案例</a>

* `scrollOverflowOptions: `
* `sectionSelector: (default .section)`
* `slideSelector: (default .slide) `
* `responsiveWidth: (default 0) `
* `responsiveHeight: (default 0) `
* `responsiveSlides: (default false ) `

## 5、Fullpage方法

前面介绍了Fullpage的配置参数，接下来为大家介绍一些Fullpage中的方法函数，这些函数是在插件初始化外调用，不同于回调函数，且不受参数的影响。

* `moveSectionUp()` 
   *  设置section向上滚动
   *  使用方法 $.fn.fullpage.moveSectionUp();
   *  <a href="http://runjs.cn/detail/tvaru5eb" target="_blank">moveSectionUp案例</a>
* `moveSectionDown()`
   *  设置section向下滚动
   *  $.fn.fullpage.moveSectionDown();
   *  <a href="http://sandbox.runjs.cn/show/jsauoraq" target="_blank">moveSectionDown案例</a>
* `moveTo(section, slide)`
   *  设置屏幕滚动到某个section或者slide，两个参数都是某个内容块的索引值或者是锚文本，默认情况下slide的索引被设置为0。
   *  $.fn.fullpage.moveTo('section描点(索引默认1)','slider索引默认0')
   *  <a href="http://codepen.io/alvarotrigo/pen/doqOmY" target="_blank">moveTo案例</a>
   *  section调转到第二页，slider水平移动到第二页
* `silentMoveTo(section, slide)`
   *  这个函数的用法和MoveTo方法完全一样，只是MoveTo在切换的时候有动画效果，而silentMoveTo方法在切换的时候没有动画效果，直接跳转到对应的section中。
   *  $.fn.fullpage.silentMoveTo('section描点(索引默认1)','slider索引默认0')
   *  <a href="http://codepen.io/alvarotrigo/pen/doqOeY" target="_blank">silentMoveTo案例</a>
* `moveSlideRight()`
   *  设置幻灯片向右滑动，
   *  $.fn.fullpage.moveSlideRight();
   *  <a href="http://codepen.io/alvarotrigo/pen/Wvgoyz" target="_blank">moveSlideRight案例</a> 
* `moveSlideLeft()`
   *  设置幻灯片向左滑动，
   *  $.fn.fullpage.moveSlideLeft();
   *  <a href="http://codepen.io/alvarotrigo/pen/gpdLjW" target="_blank">moveSlideLeft案例</a>
* `setAutoScrolling(boolean)`
   *  设置（false）出现滚动条
   *  设置（true）关闭滚动条
   *  $.fn.fullpage.setAutoScrolling(false/true);
   *  <a href="http://codepen.io/alvarotrigo/pen/rVZWrR" target="_blank">setAutoScrolling案例</a>  
* `setFitToSection(boolean)`
   *  设置（true）是否自适应section在屏幕上。
   *  设置（false）不自适应section在屏幕上。
   *  $.fn.fullpage.setFitToSection(false/true);
   *  <a href="http://codepen.io/alvarotrigo/pen/GJXNYm" target="_blank">setFitToSection案例</a>  
* `setLockAnchors(boolean)`
   *  设置（true）确定将锚文本锁定到URL中。
   *  设置（false）不将锚文本锁定到URL中。
   *  $.fn.fullpage.setLockAnchors(false/true);
   *  <a href="http://codepen.io/alvarotrigo/pen/yNxVRQ" target="_blank">setLockAnchors案例</a> 
* `setAllowScrolling(boolean, [directions])`
   *  设置（true）开启鼠标滑轮和移动触摸事件
   *  设置（false）禁止Fullpage自动绑定的鼠标滑轮和移动触摸事件，
   *  不过用户任然可以通过键盘和点击快速导航的方式切换section/slide
   *  $.fn.fullpage.setAllowScrolling(false/true);
   *  $.fn.fullpage.setAllowScrolling(false, 'down');只能向上
   *  $.fn.fullpage.setAllowScrolling(false, 'down, right');只section向上slider右
   *  <a href="http://codepen.io/alvarotrigo/pen/EjeNdq" target="_blank">setAllowScrolling案例</a> 
* `setKeyboardScrolling(boolean, [directions])`
   *  设置（true）开启键盘控制事件
   *  设置（false）禁止键盘控制事件，
   *  的方式切换section/slide
   *  $.fn.fullpage.setKeyboardScrolling(false/true);
   *  $.fn.fullpage.setKeyboardScrolling(false, 'down');只能向上
   *  $.fn.fullpage.setKeyboardScrolling(false, 'down, right');只section向上slider右
   *  <a href="http://codepen.io/alvarotrigo/pen/GJXNwm" target="_blank">setKeyboardScrolling案例</a>
* `setRecordHistory(boolean)`
   *  设置（true）为每个URL的变更纪录到浏览器中的历史记录中
   *  设置（false）否
   *  $.fn.fullpage.setRecordHistory(false/true);
   *  <a href="http://codepen.io/alvarotrigo/pen/rVZWQb" target="_blank">setRecordHistory案例</a>
* `setScrollingSpeed(milliseconds)`
   *  定义每个section/slide滚动的时间，默认的时间单位为毫秒（ms）。
   *  $.fn.fullpage.setScrollingSpeed(700);
   *  <a href="http://codepen.io/alvarotrigo/pen/NqLbeY" target="_blank">setScrollingSpeed案例</a>
* `destroy(type)`
   *  移除Fullpage的事件和添加的HTML/CSS样式风格，理想的使用在使用Ajax加载内容。
   *  $.fn.fullpage.destroy('all');
   *  <a href="http://codepen.io/alvarotrigo/pen/bdxBzv" target="_blank">destroy案例</a>
* `reBuild()`
   *  更新DOM结构以适应新的窗口大小或其内容
   *  $.fn.fullpage.reBuild();
   *  <a href="http://alvarotrigo.com/fullPage/examples/methods.html" target="_blank">reBuild案例</a>
*  `setResponsive(boolean)`
   *  设置页面的响应模式。
   *  当设置为true autoscrolling将关闭
   *  $.fn.fullpage.setResponsive(false/true);
   *  <a href="http://codepen.io/alvarotrigo/pen/WxOyLA" target="_blank">reBuild案例</a>
* `responsiveSlides.toSections()`

* `responsiveSlides.toSlides()`


## 延时加载

 <a href="http://codepen.io/alvarotrigo/pen/eNLBXo" targte="_blank">data-src案例</a>

fullpage.js提供了一种懒加载图像，视频和音频元素，所以他们不会放慢您的网站加载或不必要的浪费数据传输。使用延迟加载时，所有这些元素只会加载时进入视口。启用延迟加载，所有你需要做的是改变你的src属性的data-src如下图所示：

		<img data-src="image.png">
		<video>
		  <source data-src="video.webm" type="video/webm" />
		  <source data-src="video.mp4" type="video/mp4" />
		</video>

## 5、Fullpage回调

* `afterLoad (anchorLink, index)` 
  *  滚动到某一屏后的回调函数，接收 anchorLink 和 index 两个参数。
  *  anchorLink 是锚链接的名称/index 是section的索引，从1开始计算 
  *  <a href="http://codepen.io/alvarotrigo/pen/XbPNQv" targte="_blank">案例</a>
  
```JS
$('#fullpage').fullpage({
    anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage', 'lastPage'],

    afterLoad: function(anchorLink, index){
        var loadedSection = $(this);

        //using index
        if(index == 3){
            alert("Section 3 ended loading");
        }

        //using anchorLink
        if(anchorLink == 'secondSlide'){
            alert("Section 2 ended loading");
        }
    }
});
```

* `onLeave (index, nextIndex, direction)`
  *  滚动前的回调函数，接收 index、nextIndex 和 direction 3个参数
  *  index 是离开的“页面”的序号，从1开始计算；/nextIndex 是滚动到的“页面”的序号，从1开始计算；/direction 判断往上滚动还是往下滚动，值是 up 或 down。
  *  取消section的滚动,你可以在onLeave 回调函数中返回false，那么将取消滚动。
  
		```js
		$('#fullpage').fullpage({
		    onLeave: function(index, nextIndex, direction){
		        //it won't scroll if the destination is the 3rd section
		        if(nextIndex == 3){
		            return false;
		        }
		    }
		});
		```
  *  <a href="http://codepen.io/alvarotrigo/pen/XbPNQv" targte="_blank">案例</a>
* `afterRender()`
  *  这个回调函数只是在生成页面结构的时候调用。
* `afterResize()`
  *  这个回调函数在窗口发生大小改变的时候被调用，就在部分调整。
* `afterSlideLoad (anchorLink, index, slideAnchor, slideIndex)`
  *  slide中有效
  *  滚动到某一水平滑块后的回调函数
  *  anchorLink 是锚链接的名称/index 是section的索引，从1开始计算/slideAnchor是锚链接的名称/slideIndex是slide索引（从0开始）
  *  <a href="http://codepen.io/alvarotrigo/pen/XbPNQv" targte="_blank">案例</a>
* `onSlideLeave (anchorLink, index, slideIndex, direction, nextSlideIndex)`
  *  slide中有效
  *  滚动到某一水平滑块前的回调函数
  *  anchorLink 是锚链接的名称/index 是section的索引，从1开始计算/slideAnchor是锚链接的名称/nextSlideIndex是slide索引（从0开始）/direction滑动方向
  *  <a href="http://codepen.io/alvarotrigo/pen/XbPNQv" targte="_blank">案例</a>
  *  取消slide滑动，你可以设置回调函数onSlideLeave 返回false，那么他将阻止此次的滑动事件，就像onLeave一样。


## 6、问题

在safari里面使用使用触控板滑动页面的时候出现的BUG，解决方法：

##### 主要是css问题，修改最小高度

```css
html, body {
    font-family: "Microsoft Yahei";
    height: auto;
    min-height: 430px;//写小一点高度
    width: 100%;
}
```

##### 如果内容高度超过屏幕高度，可设置scrollOverflow：true并引入

     <script type="text/javascript" src="http://alvarotrigo.com/fullPage/vendors/scrolloverflow.min.js"></script>

##### 自适应高度 

它可以创建截面高度较小或较大，视口。这是理想的用于页脚

	<div class="section">Whole viewport</div>scrollHorizontally
	<div class="section fp-auto-height">Auto height</div>

* <a href="http://runjs.cn/code/wuim4uv1" targte="_blank">案例</a>

###### <a href="http://alvarotrigo.com/fullPage/examples/oneSection.html" targte="_blank">oneSection.html案例</a>


## 7.所有相关案例
 * <a href="http://alvarotrigo.com/fullPage/examples/apple.html" targte="_blank">滑动添加动画案例</a>
 * <a href="http://alvarotrigo.com/fullPage/examples/autoHeight.html" targte="_blank">自适应高度案例</a>
 * <a href="http://alvarotrigo.com/fullPage/examples/autoplayVideoAndAudio.html" targte="_blank">音频播放案例</a>
 * <a href="http://alvarotrigo.com/fullPage/examples/backgrounds.html" targte="_blank">背景图片案例</a>
 * <a href="http://alvarotrigo.com/fullPage/examples/callbacks.html" targte="_blank">回调函数案例</a>
 * <a href="http://alvarotrigo.com/fullPage/examples/continuous.html" targte="_blank">continuousVertical: true连续滚动案例</a>
 * <a href="http://alvarotrigo.com/fullPage/examples/fixedHeaders.html" targte="_blank">头部底部固定案例</a>
 * <a href="http://alvarotrigo.com/fullPage/examples/gradientBackgrounds.html" targte="_blank">背景色渐变案例</a>
 * <a href="http://alvarotrigo.com/fullPage/examples/methods.html" targte="_blank">所有方法案例</a>
 * <a href="http://alvarotrigo.com/fullPage/examples/noAnchor.html" targte="_blank">无描点案例</a>
 * <a href="http://alvarotrigo.com/fullPage/examples/normalScroll.html" targte="_blank">autoScrolling: false案例</a>
 * <a href="http://alvarotrigo.com/fullPage/examples/scrolling.html" targte="_blank">超出内容加滚动条案例</a>
 * <a href="http://alvarotrigo.com/fullPage/examples/scrollBar.html" targte="_blank">显示滚动条还是整平滚动案例</a>
 * <a href="dev.static.yingxiong.com/yzr/2.0/index.html" targte="_blank">最后一瓶上位案例</a>


