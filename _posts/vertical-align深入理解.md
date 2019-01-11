---
title: verticalAlign深入理解
date: 2018-03-16 16:13:01
tags: css世界
---

[此篇正在完善中....]
为什么来写这边文章，是因为我们老大在群里说一句：

`vertical-align: baseline; 这个baseline的具体位置是什么，有谁比较了解; 还有就是一朋友问我vertical-align与line-height关系`

表示一脸的懵逼，不知道在说什么；

<!-- more -->

## 这个总结步骤分为几步
	
	1、内联行元素、行盒子、ifc、bfc
	2、字体为什么会上下留白
	3、baseline是什么
	4、baseline的位置
	5、vertical-align
	6、案例

## 一、内联行元素、行盒子、ifc、bfc

。。。。。。。
	
## 二、字体为什么会上下留白

原因是在于字体本身：它的工作原理是：

`a font defines its em-square (or UPM, units per em), a kind of container where each character will be drawn. This square uses relative units and is generally set at 1000 units. But it can also be 1024, 2048 or anything else.
based on its relative units, metrics of the fonts are set (ascender, descender, capital height, x-height, etc.). Note that some values can bleed outside of the em-square.
in the browser, relative units are scaled to fit the desired font-size.`

##### 一键翻译

一个字体定义了它的em-square（或者UPM，每个单位的单位），一种容器，每个字符将被绘制。这个广场使用相对单位，一般设置为1000个单位。但它也可以是1024，2048或其他任何东西。
根据其相对单位设置字体的度量（上升，下降，大写高度，x高度等）。请注意，某些值可能会在em-square外溢出。
在浏览器中，相对单位被缩放以适合所需的字体大小。

##### 可参考

* [http://iamvdo.me/en/blog/css-font-metrics-line-height-and-vertical-align?utm_source=CSS-Weekly&utm_campaign=Issue-253&utm_medium=web](http://iamvdo.me/en/blog/css-font-metrics-line-height-and-vertical-align?utm_source=CSS-Weekly&utm_campaign=Issue-253&utm_medium=web)
* [https://juejin.im/post/59c9bc196fb9a00a402e0166](https://juejin.im/post/59c9bc196fb9a00a402e0166)

## 三、baseline是什么

![baseline基线图](../css/images/vertical_blog_11.png)

可以将上面的四条红色实线，想象成我们学习英文的时候用的4线格本，上面标注的baseline基线就是4线格本的第三条线。(也是就是x字母的底边线)

这里面的图片需要区分字体（宋体【正规字体】、其他字体），大家看到在baseline与text-bottom中间还有一个红色线，这条线其实也是text-bottom，只不过因为字体的不同,会导致字体的上下留白也不一样(HHead/Win Descent这个值不同导致字体高度不同)

`在baseline与middle之间的距离是x-height，就是字母x一半高度`

## 四、baseline的位置

##### （1）不同display值的baseline的位置

问题：是所有的display类型的元素都有Baseline吗？像inline-block这样的元素如果有好几行文字，是按第一行文字的baseline,还是按第二行文字的基线呢？

![多行文字的时候父元素基线是以哪个为标准的](../css/images/vertical_blog_1.png)

像这样的一个div盒模型中有两行文字，那么它的基线应该是按哪一条呢？为什么要搞清楚这个问题？因为display:inline;display:inline-block;的元素都是按baseline来对齐的。不知道你写的元素的baseline在哪，也就等于你写的下一个元素出现在哪个位置，你根本不知道。

![存在基线与不存在基线](../css/images/vertical_b_2.png)	

你会发现，但没有一种对齐标准的时候，物品的摆放将显得异常的混乱。所以这个时候，理解display:inline:display:inline-block;display:block;的基线在什么位置就显得格外的重要了

##### 接下来分情况考虑：

###### （一）display:inline的基线

inline的元素（如：span,label,i,等元素）的基线就是其中的元素的字体的基线。

就是在第一节中的各种baseline.几个不同的inline元素放在同一行的时候，就是把几个的baseline对齐就可以了，就像上面的不同字号的“MO”按基线对齐后的排列是一样的。

###### （二）display:inline-block的基线

我们用一个实例来看一下：


	<style>
		.a{
			display:inline-block;
			width:100px;
			height:100px;
			word-wrap:break-word; // 在长单词或 URL 地址内部进行换行	
			background-color: hsl(2, 86%, 58%);
			color:#fff;
		}
		.cspan{
			color:#000
		}
	</style>
	<div>
		<div class="a">
			<span>
				MOMOMOMOMOMOMOOMOM
			</span>
		</div>
		<span class="cspan">MOMO</span>
	</div>
		

展示效果，如下

![展示效果](../css/images/vertical_blog_3.png)

从图中可以看出div元素的baseline是以其包含的inline元素的最后一行作为自己的baseline。下一个同一行中的元素将会把baseline与div的这条基线对齐。

###### 那么所有的display:inline-block;都这样吗？像img这种的里面没有inline元素的怎么办呢？

我们再通过一个实例来看一下。

	`
	<img src="https://c4.xinstatic.com/f3/20180314/1617/5aa8da9d20d37241999_18.jpg" alt="" style="background-color:hsl(2, 86%, 58%);height:100px;width:100px;">
	<span style="color:#000">MOMO</span>
	`

![图片+字体](../css/images/vertical_1_3.png)

可以看出img的baseline是它的最底边

其实看到这，我们大概也能得出一些结论了，就是display:inline-block;的元素的baseline(基线)当其中有inline元素是按inline的baseline,当没inline元素是，按最低边。

这样总结对吗？告诉你：基本是对的。不信，我们来看一下W3C对于inline-block的基线的定义：

参考：[https://www.w3.org/TR/CSS2/visudet.html，最下面一行](https://www.w3.org/TR/CSS2/visudet.html)

`
The baseline of an 'inline-block' is the baseline of its last line box in the normal flow, unless it has either no in-flow line boxes or if its 'overflow' property has a computed value other than 'visible', in which case the baseline is the bottom margin edge.
`

###### 我大概解释是：

	行块“的基线是正常流中最后一行框的基线，除非他没有在当前流中（如果用position等会让元素脱离文档流、或者是没有内容），
	或者它的oveflow属性是可见（visible）以外的值（hidden、scroll、auto），
	在这种情况下，基线是底部边距边缘。


1、对于用到overflow属性非visible值的情况，做了一个实例

	`
	<div>
		<div style="display:inline-block;width:100px;height:100px;word-wrap:break-word;
		background-color: hsl(2, 86%, 58%);color:#fff;overflow:hidden">
			<span>
				MOMOMOMOMOMOMOOMacxM
			</span>
		</div>
		<span style="color:#000">MOMO</span>
	</div>
	`

效果如下，inline-block元素的基线是底部边缘了

![overflow非visible,使用了hidden,基线是绿色那条直线](../css/images/vertical_1_3.png)

2、对于无内容的情况，做了一个实例

	`
	<div style="width:100%;height:200px;border:#000 solid 1px;position:relative;">
		<div style="display:inline-block;width:100px;height:100px;border:1px solid red;"></div>
		<span></span>
		<div style="border-top:1px solid blue;width:100%;height:1px;position:absolute;top:100px;"></div>
	</div>
	`

效果如下，inline-block元素的基线是底部边缘了(蓝色线就是基线，【为什么inline-block元素有白色缝隙我们下面会说】)

![无内容情况](../css/images/vertical_blog_123.png)

###### （三）display:inline-block的基线

因为block元素是自己霸占一行，所以它根本不需要基线，因为它不需要在前面或者后面与任何元素对齐。

## 五、vertical-align 

#####  接下来就给大家详细讲解下vertical-align是什么，干什么？

先看取值

| 值        |  描述  | 
| :-----:   | :-------:  | 
|   baseline  | 默认值，元素放到父元素的基线上 |  
|  top        |   把元素的顶端与行中最高元素（整行【行盒子】的顶部）的顶端对齐   |
| text-top       |    把元素的顶端与父元素字体的顶端对齐(整个字体元素顶部【`为什么字体上下会有留白`】)    | 
|   bottom  | 把元素的顶端与行中最低的元素（整行的底部）的顶端对齐 |  
|  text-bottom        |   把元素的低端与父元素字体的低端对齐   |
| middle      |    把子元素放置在父元素的中部（小写字母中间对齐）   | 
|   %  | 使用line-height属性的百分比值来排列次元素，允许负值 |  
|  length        |   正负数都是以父元素的基线为准，往上下移动   |
| inherit      |    规定继承父元素属性值    | 
|  sub        |   垂直对齐文本的下标  |
| supper      |    垂直对齐文本的上标    | 


###### 参考w3链接 [https://www.w3.org/TR/CSS2/visudet.html#vertical-align](https://www.w3.org/TR/CSS2/visudet.html#vertical-align)

`This property affects the vertical positioning inside a line box of the boxes generated by an inline-level element.`

此属性影响内联行元素(inline-level element)生成的盒子，在行框（盒子）中的垂直位置。


----------------------------------------------------

我们用案例来做说明


##### img底部的缝隙与使用inline-block元素内是空元素的时候底部有缝隙


	<div style="width:100%;border:#000 solid 1px;position:relative;">
		<div style="display:inline-block;width:100px;height:100px;border:1px solid red;"></div>
		<div style="display:inline-block;width:100px;height:100px;border:1px solid red;"></div>
		<div style="border-top:1px solid blue;width:100%;height:1px;position:absolute;top:100px;"></div>
	</div>  
	<div style="width:100%;border:#000 solid 1px;position:relative;margin-top:20px">
		<img src="https://c6.xinstatic.com/f3/20180310/1128/5aa350e17af22370842_18.jpg" width="100px" height="100px">
		<div style="border-top:1px solid blue;width:100%;height:1px;position:absolute;top:100px;"></div>
	</div>  
	<div style="width:100%;border:#000 solid 1px;position:relative;margin-top:20px">
		<img src="https://c6.xinstatic.com/f3/20180310/1128/5aa350e17af22370842_18.jpg" width="100px" height="100px">
		<span>搜索xxcv</span>
		<div style="border-top:1px solid blue;width:100%;height:1px;position:absolute;top:100px;"></div>
	</div>


![案例图片](../css/images/vertical_blog_a1.png)

以上蓝色部分为baseline基线，
在div中放入inline-block元素内容为空或者是img标签的时候
会出现白色缝隙

起因：

这个问题产生主要是由于baseline造成的
还是上文说到的4线格本，实际上inline-block的图片下面的哪个
空白就是baseline与bottom之间的距离

解决：

1.给父级元素添加line-height:0px，因为line-height指的是vertical-align的bottom与top之间的距离，设置为0的时候baseline与bottom之间的距离为0；
2.同上，父级元素设置font-size:0,这样行高line-height也是0，也就没有空白缝隙了
3.将img变成块级元素
4.给父级元素添加具体高度
5.给inline-block、inline添加vertical-align：bottom、top、middle

会发现使用line-height、height 会把字体下面一小部分给删除掉，

##### 左侧是一个文字，右侧是一个图标，进行水平对齐.

	
	<pre>红色是baseline，inline元素的baseline与inline-block的baseline对齐</pre>
	<div style="border:1px solid #000;margin:10px;position:relative">
	<span style="">我是爸爸axg</span>
	<span style="display: inline-block;width: 20px;height: 20px;background: blue;"></span>
	<div style="border-top:1px solid red;width:100%;height:1px;position:absolute;top:20px;"></div>
	</div>
	<pre>红色是baseline，inline元素的baseline与inline-block的baseline对齐</pre>
	<div style="border:1px solid #000;margin:10px;position:relative">
	<span style="vertical-align:middle">我是爸爸axg</span>
	<span style="display: inline-block;width: 20px;height: 20px;background: blue;vertical-align:middle"></span>
	<div style="border-top:1px solid red;width:100%;height:1px;position:absolute;top:20px;"></div>
	</div>
	<pre>
	大家注意到没有，第一个案例与第二个案例的文字距离顶部的距离是没有变化的（那为什么会有间距呢），而inline-block元素在下调；
	我们来找一下行盒子,
	我们看到红色分虚线他平分了行盒子，而这个虚线恰好就是 行盒子的基线+x的height一半；
	其实行盒子最后，会存在一个我们看不到的文本盒子，这里我们通过添加一个伪元素，添加一个x，直观模式下，该文本也会默认大小的（font-size：0除外）
	所以该缝隙，就是由于这个文本盒子本身空间所占据的；
	当将icon高度拉高、父级盒子字体设置为0、当前元素font-size变大，都可以解决此类问题
	</pre>
	<style>
	.a-line::after {
	content: 'x'
	}
	</style>

	<div style="border:1px solid #000;margin:10px;position:relative" class="a-line">
	<span style="vertical-align:middle">我是爸爸axg</span>
	<span style="display: inline-block;width: 20px;height: 20px;background: blue;vertical-align:middle"></span>
	<div style="border-top:1px solid red;width:100%;height:1px;position:absolute;top:20px;"></div>
	<div style="border-top:1px dashed red;width:100%;height:1px;position:absolute;top:12px;"></div>
	</div>
	<pre>设置font-size:0;</pre>
	<style>
	.a-line::after {
	content: 'x';
	}
	</style>

	<div style="border:1px solid #000;margin:10px;position:relative;font-size:0;" class="a-line">
	<span style="vertical-align:middle;font-size:14px;">我是爸爸axg</span>
	<span style="display: inline-block;width: 20px;height: 20px;background: blue;vertical-align:middle"></span>
	<div style="border-top:1px solid red;width:100%;height:1px;position:absolute;top:20px;"></div>
	<div style="border-top:1px dashed red;width:100%;height:1px;position:absolute;top:12px;"></div>
	</div>
	<pre>只将inline-block添加vertical-align:middle属性</pre>
	<div style="border:1px solid #000;margin:10px;position:relative;" class="a-line">
	<span style="font-size:14px;">我是爸爸axg</span>
	<span style="display: inline-block;width: 20px;height: 20px;background: blue;vertical-align:middle"></span>
	<div style="border-top:1px solid red;width:100%;height:1px;position:absolute;top:20px;"></div>
	<div style="border-top:1px dashed red;width:100%;height:1px;position:absolute;top:12px;"></div>
	</div>

![案例解决方案](../css/images/vertical_blog_as11.png)

##### inline-block下沉

	<pre>
	我们通过给ul添加一个伪元素来确定ul的baseline，我们知道是x的底部，我们发现inline-block元素是以ul的baseline对齐的；
	这种问题我们应该怎么决解呢
		给所有inline-block元素添加vertical-align：top、bottom、middle等值,ulj基线会改变
		这里使用overflow：hidden会隐藏下面button按钮
	</pre>
	<style>
	ul::after{
	content:"x"
	}
	</style>
	<ul style="margin:10px;padding:10px;border:blue solid 1px;">
	<li style="position:relative;width:200px;height:250px;border:#000 solid 1px;display:inline-block;font-size:14px;">
		<img src="https://c6.xinstatic.com/f3/20180310/1128/5aa350e17af22370842_18.jpg" width="100%">
		<p style="width:80%;text-align:center;">周星驰财政学财政学在电风扇电风扇走心辞职信</p>
		<div style="width:100px;height:20px;background:red;position:absolute;left:50%;bottom:-10px;margin-left:-50px"></div>
		<div style="border-top:1px solid red;width:100%;height:1px;position:absolute;top:170px;"></div>
	</li>
	<li style="position:relative;width:200px;height:250px;border:#000 solid 1px;display:inline-block;font-size:14px;" width="100%">
		<img src="https://c6.xinstatic.com/f3/20180310/1128/5aa350e17af22370842_18.jpg" width="100%">
		<p style="width:80%;text-align:center;">周星驰财政学财政</p>
		<div style="width:100px;height:20px;background:red;position:absolute;left:50%;bottom:-10px;margin-left:-50px"></div>
		<div style="border-top:1px solid red;width:100%;height:1px;position:absolute;top:152px;"></div>
	</li>
	</ul>

![案例解决方案](../css/images/vaertical_blog_as111.png)



参考链接：

* [https://segmentfault.com/a/1190000004466536](https://segmentfault.com/a/1190000004466536)
* [http://iamvdo.me/en/blog/css-font-metrics-line-height-and-vertical-align?utm_source=CSS-Weekly&utm_campaign=Issue-253&utm_medium=web](http://iamvdo.me/en/blog/css-font-metrics-line-height-and-vertical-align?utm_source=CSS-Weekly&utm_campaign=Issue-253&utm_medium=web)
* [https://juejin.im/post/59c9bc196fb9a00a402e0166](https://juejin.im/post/59c9bc196fb9a00a402e0166)
* 可是查看张鑫旭的《css世界》一书，讲的很好
