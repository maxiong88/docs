---
title: flex 踩过的坑
date: 2017-03-27 11:07:02
tags:
---

主要是在实际项目中遇到的兼容性问题




<!-- more -->


在  ios 8.4.1 系统中  使用flex以后 他的子项必须是块级元素

```
<style>
	.flex11{
		width:100%;
		display:flex; /* ios9+、android4.4+*/
		display:-webkit-flex; /* ios6.1+ */
		display:-webkit-box; /* android 4.4.4-、ios8.1- */
	}
	.flex11 span{
		flex:1; /* ios9.0+、android 4.4+ */
		-webkit-flex:1; /* ios 6.1+ 然并不管用*/
		-webkit-box-flex:1; /* 检索伸缩盒子对象的子元素如何分配其剩余空间 ios6.0-ios8.0 android 2.1-4.4 */
		display:block; /* 如果是行内元素需要转块级元素，不然无效 */
	}
</style>

<div class="flex11">
	<span>1</span>
	<span>1</span>
	<span>1</span>
	<span>1</span>
</div>

```



### 文本垂直居中

display:table-cell 


设置了display:table-cell的元素

* 对高宽敏感
* 对margin值无反应(IE7有反应)
* 响应padding属性
* 内容溢出时会自动撑开父元素

display:table-cell的几种用法

1.大小不固定元素的垂直居中

![大小不固定元素垂直居中](http://www.58lih.com/css/images/20170331110255.png)

display:table-cell 加上vertical-align:middle使高度不同元素都垂直居中，
其中div的display:inline-block使几个div在同一行显示

2.多行单行文本垂直居中

```
<style> 
.vertical-centering{
	width: 400px;
	height: 300px;
	display:table-cell;
	vertical-align:middle;
	text-align:center;
}

</style>
<div class="vertical-centering"> 
	<span>我是要垂直居中的</span>
</div>

```

3.display:table-cell实现等高布局

```
<!--使用table-cell实现等高布局-->
    <div class="table">
        <div class="cell">
            <p><a href="#">章鱼小娃你</a> 来自北京</p>
            <p>签名：想找个保鲜盒把你给我的那些感动都装起来。当你让我伤心的时候就拿出来回味一下。</p>
            <p>签名：想找个保鲜盒把你给我的那些感动都装起来。当你让我伤心的时候就拿出来回味一下。</p>
        </div>
        <div class="cell">
            <p><a href="#">章鱼小娃你</a> 来自北京</p>
            <p>签名：想找个保鲜盒把你给我的那些感动都装起来。当你让我伤心的时候就拿出来回味一下。</p>
            <p>签名：想找个保鲜盒把你给我的那些感动都装起来。当你让我伤心的时候就拿出来回味一下。</p>
        </div>
        <div class="cell">
            <p><a href="#">章鱼小娃你</a> 来自北京</p>
            <p>签名：想找个保鲜盒把你给我的那些感动都装起来。当你让我伤心的时候就拿出来回味一下。</p>
            <p>签名：想找个保鲜盒把你给我的那些感动都装起来。当你让我伤心的时候就拿出来回味一下。</p>
        </div>
    </div>

	<style>
	
		.table{
		    display: table;
		    background-color: snow;
		    width: 70%;
		    margin:0 auto;
		}
		.cell{
		    display: table-cell;
		    width: 30%;
		    margin: 10px;
		}
	
	</style>

```

把摆布div设置为table样式，内部设置为table-cell样式即可

3.display:table-cell 实现左侧浮动右侧自适应

```
<div class="container">
    <a class="fl"><img  width="150px" height="200px" src="http://img4.duitang.com/uploads/item/201210/05/20121005140836_s5AWw.png"></a>
    <div class="right">
        <p><a href="#">章鱼小娃你</a> 来自北京</p>
        <p>签名：想找个保鲜盒把你给我的那些感动都装起来。当你让我伤心的时候就拿出来回味一下。</p>
        <p>微博：坐在办公室，只听轰隆隆几声巨响，晴天也能打雷吗？原来街对面的芭莎咖啡厅被炸成了两截。这定点爆破也太失败了，也不清下场，把路过的汽车震得灰头土脸，愣在路中央不知如何是好。其次，房子只炸了一半，另一半屹立不倒，是乍药太水还是房子质量太好？</p>
    </div>
</div>
<style>
.container{
    overflow: hidden;
    background-color: snow;
    width: 70%;
    margin:0 auto;
}
.fl{
    float: left;
}
.right{
    display: table-cell;

}
</style>
```



图片转载 http://www.jianshu.com/p/700ede25d0bc


/*  display 属性  */

display:-webkit-box `ios3.2-8.1 android 2.1-4.4.4`

display:-webkit-flex `ios7.0+ android 4.4+ `

display:flex `ios9.0+`


/* 伸缩盒（旧）  */


兼容性 ： android 2.1-4.4.4、iso 6.0-8.3-10.3

`注意：需要前缀-webkit。作用域flex容器上`

box-orient: 设置或检索伸缩盒对象的子元素的排列方式

			horizontal  设置伸缩盒对象的子元素的排列方式从左往右水平排列 （默认）
			
			vertical    设置伸缩盒对象的子元素从上到下纵向排列

			inline-axis 设置伸缩盒对象的子元素沿行轴排列

			block-axis  设置伸缩盒对象的子元素沿块轴排列



box-pack: 设置或检索伸缩盒对象的子元素的对齐方式

			start 设置伸缩盒对象的子元素从开始位置对齐

			center 设置伸缩盒对象的子元素居中对齐

			end 设置伸缩盒对象的子元素从结束位置对齐

			justify 设置或伸缩盒对象的子元素两端对齐

`沿X轴对齐`



box-align: 设置或检索伸缩盒对象的子元素的对齐方式

			start 设置伸缩盒对象的子元素从开始位置对齐

			center 设置伸缩盒对象的子元素居中对齐

			end 设置伸缩盒对象的子元素从结束位置对齐

			baseline 设置伸缩盒对象的子元素基线对齐

			stretch 设置伸缩盒对象的子元素自适应父元素尺寸	

`沿y轴对齐`	



box-flex: 设置或检索伸缩盒对象的子元素如何分配其剩余空间 `作用到flex子元素`
 
box-ordinal-group: 设置或检索伸缩盒对象的子元素的显示顺序，较低的元素显示在前面 `作用到flex子元素`

box-direction: 设置或检索伸缩盒对象的子元素的排列顺序是否反转 `flex容器`

				normal 设置伸缩盒对象的子元素按正常顺序排列

				reverse 翻转伸缩盒对象的子元素的排列顺序



 	
/* 伸缩盒（新） */

oder 设置或检索弹性盒模型对象的子元素出现的顺序。`作用在flex子项目上和flex容器中的绝对定位子元素`


`注意：在ios7+需要前缀-webkit、ios9+不用`


justify-content 设置或检索弹性盒子元素在主轴x轴方向上的对齐方式 `作用到flex容器`

				flex-start 弹性盒子元素将向行起始位置对齐

				flex-end 弹性盒子元素将向行结束位置对齐

				center 弹性盒子元素将向行中间位置对齐

				space-between 弹性盒子元素会平均地分配在行里

				space-around 弹性盒子元素会平均地分配在行里，两端保留子元素于子元素之间间距大小的一半


`注意：在IOS7.0+需要添加前缀-webkit`	

	
align-self 定义flex子项单独在侧轴y轴方向上的对齐方式	   	`作用flex子项`

			auto 如果'align-self'的值为'auto'，则其计算值为元素的父元素的'align-items'值，如果其没有父元素，则计算值为'stretch'。

			flex-start 弹性盒子元素在侧轴起始位置的边界紧靠住该行的侧轴起始边界

			flex-end 弹性盒子元素的侧轴起始位置的边界仅靠住该行的侧轴结束边界

			center 弹性盒子元素在该行的侧轴上居中位置

			baseline 如弹性盒子元素的行内轴与侧轴为同一条，则该值与'flex-start'等效。其它情况下，该值将参与基线对齐。

			stretch 如果指定侧轴大小的属性值为'auto'，则其值会使项目的边距盒的尺寸尽可能接近所在行的尺寸，但同时会遵照'min/max-width/height'属性的限制。


align-items 定义flex子项在flex容器的当前行的侧轴方向上的对齐方式 `作用在flex容器`

			flex-start 弹性盒子元素的侧轴起始位置的边界紧靠住该行的侧周期是边界

			flex-end 弹性盒子元素的侧轴起始位置的边界紧靠住该行的侧轴结束边界

			center 弹性盒子元素在该行上居中

			baseline 如弹性盒子元素的行内轴与侧轴为同一条，则该值与'flex-start'等效。其它情况下，该值将参与基线对齐

			stretch 如果指定侧轴大小的属性值为'auto'，则其值会使项目的边距盒的尺寸尽可能接近所在行的尺寸，但同时会遵照'min/max-width/height'属性的限制。

`注意：在IOS7.0+需要添加前缀-webkit`	


align-content 多行。请注意本属性在只有一行的伸缩容器上没有效果。 `作用到flex容器`

				flex-start 各行向弹性盒容器的起始位置堆叠

				flex-end 各行向弹性盒容器的结束为止堆叠

				center 各行向弹性盒容器的中间位置堆叠

				space-between 各行向弹性盒容器中平均分布

				space-around 各行向弹性盒容器中水平分布，两端保留子元素与子元素之间间距大小的一半

				stretch 各行将会伸展已占用剩余的空间

`注意：在IOS7.0+需要添加前缀-webkit`	

flex-wrap 该属性控制flex容器是单行或者多行，同时横轴的方向决定了新行堆叠的方向 `作用到flex容器`

		nowrap flex容器为单行。该情况下flex子项可能会溢出容器

		wrap flex容器为多行。该情况下flex子项溢出部分会被防止到新行，子项内部会发生断行

		wrap-reverse 反转wrap排列

`注意：在IOS7.0+需要添加前缀-webkit`



flex-direction 该属性通过定义flex容器的主轴方向来决定flex子项在flex容器中的位置。决定dlex需要如何排列 `作用到flex容器`

				row 主轴于行内轴方向作为默认的书写模式，即横向从左往右走

				row-reverse 对齐方式与row相反

				column 主轴与侧轴方向作为默认的书写模式，即纵向从上往下排列

				column-reverse 对齐方式与column相反


`注意：在IOS7.0+需要添加前缀-webkit`

flex-flow 复合属性，设置或检索弹性盒模型对象的子元素排列方式 `作用在flex容器`

			flex-direction 定义弹性盒子元素的排列方向

			flex-wrap 控制flex容器是单行或者多行

`注意：在IOS7.0+需要添加前缀-webkit`

flex 复合属性。设置或检索弹性盒模型对象的子元素如何分配空间 `作用于flex子项`

		flex-grow 用来指定扩展比率，即剩余空间是正值时此flex子项相对于flex容器里其他flex子项能分配到空间比例

		flex-shrink 用来指定收缩比率，即剩余空间是负值时此flex子项相对于flex容器里其他flex子项能收缩的空间比例

		flex-basis 用来指定伸缩基准值，即再根据伸缩比率计算出剩余空间的分布之前，flex子项长度的起始数值

`注意：在IOS7.0+需要添加前缀-webkit`




### 实例应用（布局layout）




##### 单行文字垂直居中

```
<style>
	.flex20{
		width: 100%;
		height:300px;
		display:-webkit-box;

		display:flex;
		display:-webkit-flex;
		justfiy-content:center;
		-webkit-justify-content:center; /* 单行沿x轴对齐方式 */
		
		/*  旧版 */
		-webkit-box-orient:horizontal; /* 默认子元素对齐方式从左往右 */
		-webkit-box-pack:center; /* 沿x轴对齐 */
		-webkit-box-align:center; /* 沿y轴对齐 */
		
	}
	.flex20 span{
		align-self:center; /* 沿y轴对齐 */
		-webkit-align-self:center;
	}
</style>

<div class="flex20"> 
	<span>我是垂直居中，我是单行</span>
</div>

```


##### 多行文字垂直居中

```
<style>
*{
	margin:0;
	padding:0;
	box-sizing:border-box;
	-webkit-box-sizing:border-box;
}
	.flex20{
		width: 100%;
		padding:0 20px;
		height:300px;
		display:-webkit-box;

		display:flex;
		display:-webkit-flex;
		align-content:center;
		-webkit-align-content:center; /* 多行沿x轴对齐方式 */
		
		-webkit-align-items:center;
		align-items:center; /* 作用在flex容器 */
		/*  旧版 */

		
	}
	.flex20 span{
		-webkit-align-self:center;
				align-self:center;/* 作用到y轴 */
	}
</style>

<div class="flex20"> 
	<span>我是垂直居中，我是单行我是垂直居中，我是单行我是垂直居中，我是单行我是垂直居中，我是单行我是垂直居中，我是单行我是垂直居中，我是单行</span>
</div>

```

##### 两端对齐 justify


```
text-align:justify

或

弹性布局

-webkit-box-pack:justify

-webkit-justify-content:space-between
```












		


	



	



			