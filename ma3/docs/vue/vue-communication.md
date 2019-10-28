---
title: 'Vue 组件通信'
description: ''
sidebar: 'auto'
time: '2019-08-01'
prev: ''
next: ''
---

## vue.observable({})

返回的对象可以直接用于渲染函数和计算属性内，并且会在发生改变时触发相应的更新。

``` js


```

## $attr

+ 可以收集父组件中的所有传过来的属性除了那些在当前组件中没有通过 props 接收的。
+ 子组件通过 $attrs 可以获取没有被子组件作为 props 特性绑定的传递过来的值
    ``` js
        //父组件
        <A msg='1111' df='222'>
        //子组件
        {
            props:['msg'],
            mounted(){
                console.log(this.$attrs) // 输出 {df:'222'}
            }
        }
    ```
+ 子组件可以通过 v-bind='$attrs' 显性的绑定 可手动绑定到子组件的其他位置
+ 父组件通信子组件，如果子组件中没有通过props来接受父组件传递的值，那么将会在子组件根元素通过html属性的方式追加
    ``` js
        //父组件
        <AB msg='1111' sd='2222'>
        //子组件
        <div sd='2222'>{{msg}}</div>
        {
            props:['msg']
        }
    ```
+ 我们可以通过 inheritAttrs : false 这些默认行为将会被去掉,但是我们还是可以通过$attr获取
    ``` js
        //父组件
        <zi msg='sss' es='eee' />
        //子组件
        <zi v-bind='$attr'>
        //孙组件
        <sun>
        {
            mounted(){
                console.log(this.$attr) // {msg:'sss', es:'eee'}
            }
        }
    ```

## $listenter 

+ 一个包含了所有在父组件上注册的事件侦听器的对象。这只是一个指向 data.on 的别名，除.native获取不到
    ``` js
    //父组件
    <A v-on:a1='function(){}' @a2='function(){}' @a3.native='function(){}' @update:curGroup="function(i){aa = i}"/>
    {
        data(){
            return {
                aa:''
            }
        }
    }
    //子组件
    {
        mounted(){
            console.log(this.$listenter) // {a1:f, a2:f, update:curGroup:f}
        }
    }
    ```
+ 通过 v-on="$listeners" 事件可以往下传递
    ``` js
        // 父组件
        <A @:a1='function(){}' @a2='function(){}' @a3.native='function(){}'>
        // 子组件
        <B v-on="$listenters">
        // 孙祖建
        {
            mounted(){
                console.log(this.$listenter) // {a1:f, a2:f}
            },
            methods:{
                sdf(){
                    this.$emit('update:curGroup', 'f')
                }
            }
        }
    ```

## EventBus 全局事件总线

``` js
// bus.js
import Vue from 'vue';
export const EventBus = new Vue();
// 组件使用
import { EventBus } from './event-bus.js';
EventBus.$emit('i-got-clicked', this.clickCount);

import { EventBus } from './event-bus.js';
EventBus.$on('i-got-clicked', clickCount => {
  console.log(`Oh, that's nice. It's gotten ${clickCount} clicks! :)`)
});
```

还可以使用 `EventBus.$once` `EventBus.$off`