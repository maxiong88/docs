---
title: '小知识点'
description: ''
time: '3000-03-29'
prev: ''
next: ''
tags:
    - 'javascript'
    - 'html'
    - 'css'
---

### 在已知的对象结构中判断某个属性值是为否存在

``` js
// 函数参数设置默认值，参数会形成一个单独的作用域
isDef = v => v !== undefined;

function objFn(param){
    let i = {a:1,b:{c:1,d:2,f:()=>{}}};
    if(isDef(i = i) && isDef(i = i.b) && isDef(i = i.f)){
        i(param)
    }
}

```

+ [参考](https://es6.ruanyifeng.com/#docs/function#%E4%BD%9C%E7%94%A8%E5%9F%9F)

### 拷贝

``` js
// 所有属性
function extend(obj1,obj2){
    for(let i in obj1){
        obj2[i] = obj1[1]
    }
    return obj2
}

// 可枚举属性（继承属性和不可枚举属性是不能拷贝的）
Object.assign()

// 深拷贝
function clone(val){
    if(Array.isArray(val)){
        return val.map(clone)
    }else if(val && typeof val === 'object'){
        var res = {};
        for (var key in val) {
            res[key] = clone(val[key]);
        }
        return res
    }else{
        return val;
    }
}
```

### vue-router原理

+ 通过`use`安装VueRouter
+ 通过`Vue.mixin`给每个组件注入`beforeCreate、destroyed`生命周期，在`beforeCreate`中如果不存在`this.$options.router`就执行一次init，存在就不执行
+ 刷新进入
    - init->通过mode来区分使用那种路由模式 -> html5history构造函数/hashhistory构造函数/abstracthistory构造函数 -> 触发 History基类的transitionTo、confirmTransition-> 出发一系列historyAPI ->渲染页面
+ 用户点击
    - vurRouter.push -> html5history构造函数/hashhistory构造函数/abstracthistory构造函数 .push -> 触发 History基类的transitionTo、confirmTransition -> 出发一系列historyAPI ->渲染页面
+ hash模式
    - 首先判断浏览器是否支持`PushState`，支持使用historyAPI，不支持使用locationAPI
    - replaceHash 替换整个url地址
        + 如果支持hosityAPI，就是用`history.replaceState(state,'',url===window.location.href#path)` 不刷新页面
        + 如果不支持historyAPI，就是用`window.location.replace(url===window.location.href#path)` 刷新页面-替换当前url
        + 降级处理`window.location.replace(url===window.location.href#path)` 刷新页面-替换当前url
    - pushHash 改变path(hash值部分)的方式
        + 如果不支持historyAPI，就是用`window.location.hash = path` 不刷新页面
        + 如果支持hosityAPI，就是用`history.pushSate(state,'',url===window.location.href#path)` 不刷新页面
        + 降级处理`window.location.assign(url===window.location.href#path)` 加载一个新文档

+ history模式
    - 出去对hash值的处理

+ abstract nodejs非浏览器