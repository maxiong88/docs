---
title: sticky footer
date: 2017-06-06 09:34:44
tags: html+css
---

什么是sticky footer

是一种网页效果

如果页面内容不足够长，页脚固定在浏览器宽口的底部
如果内容足够长时，页面固定在页面的最底部

通过js和css都可以实现、本编只介绍css方式

<!-- more -->

1、使用display：table 方法

`display:table 指定对象为块级元素的表格`
`display:table-row 指对象作为表格行`

```
<style>
    html{
        height:100%;
    }
    body{
        min-height:100%;
        display:table;
        width:100%;
    }
    .content{
        display:table-row;
        height:100%;
        padding:20px;
    }
    .footer{
        padding:20px;
    }
</style>
<div class="content">
  <h1>Sticky Footer with Flexbox</h1>
  <p><button id="add">Add Content</button></p>
</div>

<footer class="footer">
  Footer 
</footer>

```

2、flex 布局==垂直排列

```
<style>
html{
height:100%
}
body{
height:100%;
display:flex;
flex-direction:colum
}
.content{
flex:1;
padding:20px;
}
.footer{
padding:20px;
}
</style>
<div class="content">
  <h1>Sticky Footer with Flexbox</h1>
  <p><button id="add">Add Content</button></p>
</div>

<footer class="footer">
  Footer 
</footer>
```

3、使用css计算函数  calc  vh 有兼容性安卓

```
<style>
.content{
min-height:calc(100vh-50px)
}
.footer{
height:50px;
background:red;
width:calc(10/100*100% + 0%)
}
</style>
<div class="content">
  <h1>Sticky Footer with Flexbox</h1>
  <p><button id="add">Add Content</button></p>
</div>

<footer class="footer">
  Footer 
</footer>
```
4、div内嵌套一个div

`使用margin负值padding正值`

```
<style>
html,body{
height:100%;
}
.content{
min-height:100%
}
.content-inside{
    padding-bottom:50px
}
.footer{
height:50px;
marin-top:-50px;
}
</style>
<div class="content">
  <div class="content-inside">
    <h1>Sticky Footer with Negative Margin 2</h1>
    <p><button id="add">Add Content</button></p>
  </div>
</div>

<footer class="footer">
  Footer 
</footer>

或 不需要添加额外的div

<style>
html,body{
height:100%
}
.content{
min-height:100%;
padding-bottom:1px;
}
.footer{
height:50px;
background:red
}   
</style>
     <div class="content">
        <h1>Sticky Footer with Negative Margin 1</h1>
    </div>
    <footer class="footer">
        Footer 
        </footer>

```

5、微信ui  媒体查询

`小于一定高度的时候使用fixed定位`

```
@media screen and (min-height: 438px){
position: fixed;
left: 0;
bottom: 0;
width: 100%;
text-align: center;
}
```




