---
title: div垂直居中
date: 2017-06-01 21:46:33
tags: html5+css3
---

项目中遇到问题，div垂直居中的问题，总结一下

<!-- more -->

1.使用css3 变换transform translate平移

`在父元素(不)知道宽高的时候都可使用,在子元素中使用`

```
<div class="parent">
<div class="child">
我局中了
</div>
</div>
<style>
.child{
position:absolute;
left:50%;
top:50%;
-webkit-transform:translate(-50%,-50%);
transform:translate(-50%,-50%);

}
</style>
```

2.使用display:table display:table-cell

`需要注意使用此方法的时候父级元素需要知道高度`

```
<div class="parent">
<div class="child">
我局中了
</div>
</div>
<style>
.parent{
display:table;
height:500px;
}
.child{
display:table-cell;
vertical-align:middle;

}
</style>
```

3.使用 position:absolute  margin负值



```
<div class="parent">
<div class="child">
我局中了
</div>
</div>
<style>
.parent{

}
.child{
position:absolute;
left:50%;
top:50%;
width:100px;
height:200px;
margin: -50px 0 0 -100px;

}
</style>
```

4.子元素相对于父元素绝对定位(偏移量都为0)，子元素设置margin:auto;

`父元素子元素必须都知道高宽`

```
<div class="parent">
<div class="child">
我局中了
</div>
</div>
<style>
.parent{
height: 800px;
position: relative;
width: 800px;
}
.child{
position:absolute;
left:0;
top:0;
right:0;
bottom:0;
width:100px;
height:200px;
margin:auto

}
</style>
```

5.使用display:flex;

`父级需要知道高宽`

```
<div class="parent">
<div class="child">
我局中了
</div>
</div>
<style>
.parent{
display: -webkit-box;
display: -webkit-flex;
display: -ms-flexbox;
display: flex;
-webkit-box-pack: center;
-webkit-justify-content: center;
-ms-flex-pack: center;
justify-content: center;
-webkit-box-align: center;
-webkit-align-items: center;
-ms-flex-align: center;
align-items: center;
width: 800px;
height: 800px;

}
.child{


}
</style>
```



