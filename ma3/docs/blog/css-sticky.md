---
title: 'position:sticky'
description: ''
sidebar: 'auto'
time: '2020-03-18'
prev: ''
next: ''
---

sticky 的本意是粘糊糊的，但在 css 中的表现更像是吸附。常见的吸顶、吸底（移动端网站的头部返回栏，底部切换栏之类）的效果用这个属性非常适合

::: MDN
粘性定位是相对定位和固定定位的混合。将该元素视为相对位置，直到它超过指定的阈值为止，此时将其视为固定位置
:::

粘性元素（position: sticky;）与固定元素（position: fixed;）非常相似，即使用户向上或向下滚动页面，它们都保持其在屏幕上的位置。区别？粘性元素仍局限在其所在的父容器中。

粘滞定位`sticky`实际上应该根据最近的可滚动祖先来定义。

`sticky`的偏移量是参照最近的（祖先元素）可以滚动，如果祖先没有就找`viewport`



对于有sticky的元素，left right top bottom 是相对于`flow box`的各个边的偏移，`flow box`用于约束元素的偏移。
left right的百分数是指`flow box`的宽度（width）；
top bottom的百分数是指`flow box`的宽度（height）；


粘性定位元素和粘性约束矩形底部之间的交集限制了在任何方向上的移动，因此偏移永远不会将粘性定位元素推到其包含块之外。但是，当页面滚动时元素可以在其包含块内自由移动时，它似乎被固定到相关的流根边缘，类似于固定位置元素。

请注意，具有非自动顶部样式和自动底部样式的粘贴定位元素只能通过粘贴定位向下推；它永远不会向上偏移。

同一容器中多个粘贴定位的元素独立偏移。粘性位置偏移可能导致它们重叠。


<p class="tip">
sticky支持BFC，可能低版本浏览器不支持

</p>


英语单词不多，翻译无力！

+ [csswg](//drafts.csswg.org/css-position-3/#sticky-pos)
+ [sticky兼容性js](//github.com/dollarshaveclub/stickybits)

## 案例

### table position：sticky

+ sticky不能再table的thead、tr中工作，但是可以在th中工作

``` html
<style>
table {
  text-align: left;
  position: relative;
  border-collapse: collapse; 
}
th {
  background: white;
  position: sticky;
  top: 0;
  box-shadow: 0 2px 2px -1px rgba(0, 0, 0, 0.4);
}
</style>
<table>
<thead>
<tr>
<th></th>
<th></th>
</tr>
</thead>
<tbody>
<tr></tr>
</tbody>
</table>
```

+ 弹窗顶部右侧增加关闭icon，可以使用此属性




## 特效

吸顶、视觉差、页脚展示

+ https://css-tricks.com/getting-fancy-with-position-sticky/
+ https://css-tricks.com/creating-sliding-effects-using-sticky-positioning/
+ https://css-tricks.com/sticky-smooth-active-nav/
+ https://css-tricks.com/the-slideout-footer/
