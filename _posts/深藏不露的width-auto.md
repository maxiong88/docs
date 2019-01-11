---
title: 深藏不露的 width:auto
date: 2018-03-30 14:24:03
tags: css世界
---

* 页面某个模块的文字内容是动态的，可能是几个字，也可能是一句话。然 后，希望文字少的时候居中显示，文字超过一行的时候居左显示。该如何实现？ 

* width:100% 有必要吗?

* 补录中。。。。

<!-- more -->

### width: 100% 有必要吗？

`
// 一个垂直导航
.a{
	display:inline-block;
	width:100%;
}
`

![官网](../css/images/20180330144843.png)

从上面一段代码与一张图片中可以看到，这样的width:100%是不必要的


外部尺寸与流体特性 

1、正常流宽度 

![正常流宽度](../css/images/20180330145145.png)

（截图了）

2、格式化宽度

![格式化宽度](../css/images/20180330145549.png)

（截图了）

### 单行居中多行居左

`
<style>
.box {
  width:200px;
  margin:20px;
  padding: 10px;
  background-color: #cd0000;
  text-align: center;
}
.content {
  display: inline-block;
  text-align: left;
}
</style>
<div class="box">
  <p id="conMore" class="content">文字内容</p>
</div>
<div class="box">
  <p id="conMore" class="content">文字文字内容文字内容文字内容文字内容文字内容文字内容内容</p>
</div>
`

内部尺寸与流体特性

所谓“内部尺寸”，简单来讲就是 元素的尺寸由内部的元素决定，而非由外部的容器决定。如何快速判断一个元素使用的是否 为“内部尺寸”呢？很简单，假如这个元素里面没有内容，宽度就是 0，那就是应用的“内 部尺寸” 

特性

* （1）包裹性 【除了“包裹”，还有“自适应性”。永远小于外部尺寸】
* （2）首选最小宽度
* （3）最大宽度

除了 inline-block 元素，浮动元素以及绝对定位元素都具有包裹性， 均有类似的智能宽度行为。 

本问大多是实际项目中案例，结合《css世界》这本书说讲解其原理。