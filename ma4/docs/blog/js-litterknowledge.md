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

## 在已知的对象结构中判断某个属性值是为否存在

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

## 拷贝

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

应付一下面试吧，项目中推荐使用`Lodash.js`

## vue-router原理

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

## curl 查看接口返回信息

``` js
// 使用方法：curl <url地址> -b "cookie (document.cookie)"；
```

## pm2我大前端没用过啊

起因：
公司项目有一个邮件系统，每天定时给员工发送邮件；
我使用`express、multer、webpack、jquery、js-xlsx、phantom、node-cron、moment`做了一个简易版的；
问题来了，我使用ajax提交xls文件超了180kb，以后node服务器相应失败，传小文件可以，然后我就一脸蒙蔽，因为在我本地是可以的，因为有运维妹子，所以服务器不归我们。今天就屁颠屁颠的跑去各种找原因，换启动方式、加内存等这不是解决问题的根本方法，找到总监一看我去原来是因为pm2这个狗东西。强行解释一波，只要服务器上面文件有改动，pm2就会重启就是这么简单，因为有时间间隔，所以小文件基本不会出现这个显现，但是已超过大小问题就暴露出来了，文件修改服务器重启就是这个。

我们是把文件上传的目录与下载的目录是跟项目放在一起的，并没有存放到临时文件中，当文件post到了上传目录中我们转换了临时文件并拷贝到下载目录中，pm2知道了文件修改，于是重启了服务导致上传失败，接口爆出404.

pm2 api很丰富、解决办法就是通过`--ignore-watch` 排除监听的目录/文件，可以是特定的文件名，也可以是正则.

::: tip 提示
命令式输入 可能很严谨 标点符号输入错误 也会导致服务不起作用
pm2 start app.js --watch --ignore-watch="test upload db"
:::

## vscode配置svn

安装TortoiseSVN,并勾选上command line client tools选项, 选择第二个选项

[参考](https://blog.csdn.net/enter89/article/details/85302642)、[参考](https://blog.csdn.net/weixin_41697323/article/details/103410287)
