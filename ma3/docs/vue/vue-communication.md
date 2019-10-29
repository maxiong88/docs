---
title: 'Vue 组件通信'
description: ''
sidebar: 'auto'
time: '2019-08-01'
prev: ''
next: ''
---

## vue.observable({})

返回的对象可以直接用于渲染函数和计算属性内，并且会在发生改变时触发相应的更新。简易版vuex

``` js
// store/store.js
import Vue from 'vue';
export const store = Vue.observable({number:0,list:[]})
export const mutation = {
    number(n){
        state.number = n;
    },
    list(n){
        state.list = n;
    }
}

// a.vue
import {store, mutation} from '@/store/store.js';
export default {
    methods:{
        Acb(){
            mutation.number(1)
        },
        Bcb(){
            mutation.list([{}])
        }
    }
}

// b.vue
import {store, mutation} from '@/store/store.js';
export default {
    computed:{
        number(){
            return store.number // 获取更新
        },
        list(){
            return store.list // 获取更新
        }
    }
}
```



## slot

+ 插槽: `Vue` 实现了一套内容分发的 API，这套 API 的设计灵感源自 `Web Components` 规范草案，将 `<slot>` 元素作为承载分发内容的出口
+ 插槽prop: 绑定在`<slot>`元素上的特性,父级作用域中(父组件中)，我们可以给 `v-slot` 带一个值来定义我们提供的插槽 `prop` 的名字(我们也可以解构它，并且给他提供默认值)
+ 后备内容: 有时为一个插槽设置具体的后备 (也就是默认的) 内容是很有用的，它只会在没有提供内容的时候被渲染。

``` js
// 子组件
<template>
    <div>
        <slot
            :user="user" {/*在slot元素上绑定一个绑定一个特性，这个特性被称为插槽 prop；现在在父级作用域中，我们可以给 v-slot 带一个值来定义我们提供的插槽 prop 的名字*/}
        >{/*这里面的是后背内容或者默认内容*/}</slot>
    </div>
</template>

// 父组件
<template>
    <div>
        <Child #user="user">{/*这里可以对user进行解构赋值，设置默认值*/}
            {{user.firstname}}
        </Child>
    </div>
</template>
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

## $emit\$on

+ 子组件可以向父组件，只能同层传递，不能跨组件传递
+ EventBus 全局事件总线，可以实现跨组件之间通信

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

// 还可以使用 `EventBus.$once` `EventBus.$off`
```

## $parent/$children

<p class='tip'>
节制地使用 $parent 和 $children - 它们的主要目的是作为访问组件的应急方法。更推荐用 props 和 events 实现父子组件通信
</p>

## ref

`ref` 被用来给元素或子组件注册引用信息。引用信息将会注册在父组件的 `$refs` 对象上。如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素；如果用在子组件上，引用就指向组件实例

<p class='tip'>
因为 `ref` 本身是作为渲染结果被创建的，在初始渲染的时候你不能访问它们 - 它们还不存在！`$refs` 也不是响应式的，因此你不应该试图用它在模板中做数据绑定
</p>

## provide/inject

<p class='tip'>
provide 和 inject 主要为高阶插件/组件库提供用例。并不推荐直接用于应用程序代码中。
</p>

这对选项需要一起使用，以允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深，并在起上下游关系成立的时间里始终生效。如果你熟悉 React，这与 React 的上下文特性很相似。

## prop
+ 传值尽可能不要去修改传过来的值
+ `.sync` 修饰符 在有些情况下，我们可能需要对一个 prop 进行“双向绑定”。不幸的是，真正的双向绑定会带来维护上的问题，因为子组件可以修改父组件，且在父组件和子组件都没有明显的改动来源。

## vuex

## v-model

## 超链接

+ [Vue和React组件通信](blog/mianshi.md#Vue和React组件通信)