---
title: sass 学习（持续）
description: ''
sidebar: 'auto'
time: '2019-01-01'
prev: ''
next: ''
---

## @each 指令

在@each中，定义了一个变量，其中包含列表中每个项目的值

`@each $var in <list or map>`

+ $var: 它表示变量的名称。 @each规则将$var设置到列表中的每个项目，并使用值$var输出样式。
+ `<list or map>`: 这些是SassScript表达式，将返回列表或映射。

案例:

``` js
@each $color in red, green, yellow, blue {
  .p_#{$color} {
    background-color: #{$color};
  }
}

.p_red {
  background-color: red;
}

.p_green {
  background-color: green;
}

.p_yellow {
  background-color: yellow;
}

.p_blue {
  background-color: blue;
}
```


[参考](//www.sass.hk/guide/)


## Object.assign

`Object.assign(target[目标对象], ...sources[源对象])` 返回目标对象

+ 只会拷贝源对象自身的并且可枚举的属性到目标对象
+ 拷贝的是属性值(只用于简单对象的深拷贝)
+ 后面的源对象会覆盖前面对象中相同的属性


