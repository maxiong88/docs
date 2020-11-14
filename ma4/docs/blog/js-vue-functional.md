---
title: 'Vue 函数组件'
description: '怎么用，Vue2[版]'
sidebar: 'auto'
time: '2019-01-01'
prev: ''
next: ''
imgPIc: '../assets/img/17.jpg'
---

函数组件使用场景：不需要实例化，无状态，没有生命周期的组件，除了props之外没有别的配置项，都可以改写成函数式组件。

由于函数式组件没有`this`，所以`props`、`slots`等都在`context`上面挂着。

书写方式一：

``` vue
// *.vue
<template functional>
    <div>{{props.text ? '11': '22'}}</div>
</template>
```

书写方式二：

``` vue
// *.vue
<script>
    export default {
        name:"functional-name",
        functional:true,
        render(createElement,context){
            console.log(context)
            return <div>{context.props.text}</div>
        }
    }
</script>
```

书写方式三：

``` js
// *.js
export default {
    name:"functional-name",
    functional:true,
    render(createElement, context){
        console.log(context)
        return <div>{context.props.text}</div>
    }
}
```
