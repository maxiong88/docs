---
title: [精] 工作中antdv遇到的问题
description: '深入响应式原理、'
sidebar: 'auto'
time: '2018-01-03'
prev: ''
next: ''
imgPIc: '../assets/img/17.jpg'
---

## 没有深入响应式原理-遇到的问题

### select 遇到的问题

``` vue
<template>
    <div>
        <a-select
            style="width: 120px"
            v-model="queryParams.info"
            placeholder="请选择"
            :options="opt"
        ></a-select>
       
    </div>
</template>
<script>
export default{
    name:"select",
    data(){
        return {
            queryParams:{},
            opt:[]
        }
    },
    mounted(){
        setTimeout(()=>{
            this.opt = [{value:1,label:"测试1"}];
            // 赋值
            /*
                Vue 无法检测 property 的添加或移除。由于 Vue 会在初始化实例时对 property 执行 getter/setter 转化，所以 property 必须在 data 对象上存在才能让 Vue 将它转换为响应式的。
                对于已经创建的实例，Vue 不允许动态添加根级别的响应式 property。
                具体请参考官方文档：https://cn.vuejs.org/v2/guide/reactivity.html#对于对象

                下面出现问题info没有转换为响应式
            */
            this.queryParams.info = this.opt[0].value /*虽然值变了 是Object.defineProperty,但是Vue没有对info其转换为响应式*/
            /*
                以下方法可以追踪
            */
            Vue.set(this.queryParams, 'info', value)
            this.$set(this.queryParams, 'info', value)
            // 去创建一个新对象
            this.queryParams = Object.assign({},this.queryParams,{info})
        },100)
    }
}
</script>
```


## vue中使用纯函数