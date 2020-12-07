---
title: [精] 工作中antdv遇到的问题
description: '深入响应式原理、form表单提交'
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


## form表单提交

#### 表单数据对象时嵌套的，重置数据可能会失效

出现下面的问题还是说明没有仔细去阅读官方文档
:::tip
prop--->是：`表单域 model 字段`，在使用 validate、resetFields 方法的情况下，该属性是必填的
需要v-model模式下
:::
``` vue
<template>
<!--/ 比如这样时错误的/-->
    <a-form-model ref="formmodel" :model="formmodel" :rules="rules">
        <a-form-item prop="age">
            <a-input v-model="formmodel.params1.age">
        </a-form-item>
        <a-form-item prop="age">
            <a-input v-model="formmodel.params2.age">
        </a-form-item>
    </a-form-model>
</template>
<script>
    export default {
        name:"formmodel",
        data(){
            return {
                formmodel:{
                    params1:{
                        age:''
                    },
                    params2:{
                        age:''
                    }
                },
                rules:{
                    "age":[{required:true}],
                }
            }
        },
        methods:{
            reset(){
                this.$refs.formmodel.resetFields();// 不会是表单数据还原
            },
            submit(){
                this.$refs.formmodel.validate(valid =>{

                })
            }
        }
    }
</script>

<template>
<!--/ 比如这样是对的/-->
    <a-form-model ref="formmodel" :model="formmodel" :rules="rules">
        <a-form-item prop="params1.age">
            <a-input v-model="formmodel.params1.age">
        </a-form-item>
        <a-form-item prop="params2.age">
            <a-input v-model="formmodel.params2.age">
        </a-form-item>
    </a-form-model>
</template>
<script>
    export default {
        name:"formmodel",
        data(){
            return {
                formmodel:{
                    params1:{
                        age:''
                    },
                    params2:{
                        age:''
                    }
                },
                rules:{
                    "params1.age":[{required:true}],
                }
            }
        },
        methods:{
            reset(){
                this.$refs.formmodel.resetFields();// 会是表单数据还原
            },
            submit(){
                this.$refs.formmodel.validate(valid =>{

                })
            }
        }
    }
</script>
```
