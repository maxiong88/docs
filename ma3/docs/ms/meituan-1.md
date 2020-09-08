---
title: '美团点评 - 到店事业群 前端面经（3轮技术面+hr面）'
description: ''
sidebar: 'auto'
time: '2020-04-09'
prev: ''
next: ''
tags: ['面试']
---

[转-掘金-美团点评 - 到店事业群 前端面经（3轮技术面+hr面）](//juejin.im/post/5e85b6c46fb9a03c37302e1f#comment)



### 1. css实现动画，怎么让它执行完这个去执行另外一个keyFrame，你怎么知道这个动画什么时候结束

#### 可以通过css的animation属性

知识点：[animation](//developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations) 该`animation`属性被指定为一个或多个单个动画，以逗号分隔。属性如下：

+ `animation-name` ：指定`@keyframes`描述动画关键帧的规则名称。
+ `animation-duration[九 睿 神]` 配置动画完成一个周期所需的时间。
+ `animation-timing-function` 配置动画的时间；也就是说，通过建立加速曲线，动画如何在关键帧之间过渡。
+ `animation-delay[迪 累]` 配置元素加载时间与动画序列开始之间的延迟。
+ `animation-iteration-count[一 特 睿 神]` 配置动画应重复的次数；您可以指定infinite无限期重复动画。默认1次
+ `animation-direction[的 rek 神]` 配置动画在序列中每次运行时是否应交替显示方向或重置为起点并重复自身。
+ `animation-fill-mode` 配置动画在执行之前和之后应用的值。
+ `animation-play[普 累]-state[死 得 t]` 使您可以暂停和恢复动画序列。

``` html
<style>

    .s{
        width: 100px;
        height: 100px;
        background: red;
        animation-name: name1, name2;
        animation-delay:  0s, 3s;
        animation-timing-function:  ease , ease;
        animation-duration: 2s, 2s;
        animation-fill-mode: both, both;
        position: absolute;
    }
    @keyframes name1 {
        from{left:0}
        to{left: 300px;}
    }
    @keyframes name2 {
        from{top:0}
        to{top: 300px;}
    }
</style>
<div class="s"></div>
```

#### 使用事件 

animationEnd animationStart

elapsedTime 此属性表示动画运行时长

``` js
    const animation = document.querySelector('.s');
    let iterationCount = 0;
    animation.addEventListener('animationstart', () => {
    });

    animation.addEventListener('animationiteration', () => {
        iterationCount++;
        console.log(iterationCount+'----99999')
    });

    animation.addEventListener('animationend', (target) => {
        console.log('222=',target)
    });
```

## 实现隔一段时间输出name

``` js
// 方案一 使用普通方法
    function A(name) {
    this.name = name;
    }
    A.prototype.log = function() {
        //每隔2s输出一下name
        let that = this;
        let timer = 0;
        function as(){
            window.requestAnimationFrame(as);

            let date = new Date().getTime()
            if(date - timer >=2000){
                timer = date;
                window.requestAnimationFrame(as);
                console.log(that.name, date)
            }
        }
        as()
    }
    var f = new A('maxiong')
    f.log();
// 方案二 使用promise
    function A(name) {
        this.name = name;
    }
    A.prototype.log = function() {
        //每隔2s输出一下name

        let p = new Promise((resolve)=>{
            setTimeout(resolve, 2000)
        })
        p.then(()=>{
            console.log(this, this.name, new Date().getTime()/1000)
        }).then(() => {
            this.log()
        })
    }
    var f = new A('maxiong')
    f.log();
// 方案三  async await
    function A(name) {
  this.name = name;
}
A.prototype.log = async function() {
    //每隔2s输出一下name
    await new Promise((resolve)=>{
        setTimeout(resolve, 2000)
    })
    console.log(this, this.name, new Date().getTime()/1000)
    this.log();
}
var f = new A('maxiong')
f.log();
```

## 为啥下面这个代码会爆栈？用setTimeout来递归实现setInterve()就不会爆栈

``` js
// 不会爆栈
    setInterval(() => {
        console.log('setinterval')
    }, 1000);
    function fo(){
        setTimeout(() => {
            fo();
            console.log('setinterval')
        }, 1000);
    }
    fo()
// 会爆栈
    function fo(){
        fo()
        conosle.log('222')
    }
    fo()
```

？？？？？？

## requestAnimationFrame，算他的执行间隔

这里用到了 `requestAnimationFrame` 的回调函数的入参 `DOMHighResTimeStamp`, 单位毫秒

该参数与`performance.now()`的返回值相同，它表示`requestAnimationFrame()` 开始去执行回调函数的时刻。

```js
let timer = 0;
function intervalS(f){
    if(!timer) timer = f;
    let sd = f - timer;
    if(sd){
        timer = 0;
        console.log(sd)
    }
    window.requestAnimationFrame(intervalS);
}
window.requestAnimationFrame(intervalS)

```

## requestAnimationFrame实现一个移动的动画

## `<input type="file">` 这个东西好丑，怎么让它变漂亮

input file上传按钮的美化思路是，先把之前的按钮透明度opacity设置为0,然后，外层用div包裹，就实现了美化功能。

## 如果出现js阻塞怎么办,你的算法会收到影响嘛？比如说下面这种情况，你丢帧了怎么办？

``` js
for (let i = 0; i < 10000000000; i++) {

}
```

## head里的hmtl会显示出来嘛？head里面都有啥东西

``` js
<head>
    <div>1</div>
</head>
```

[MDN-head](//developer.mozilla.org/zh-CN/docs/Web/HTML/Element/head)

`HTML head` 元素 规定文档相关的配置信息（元数据），包括文档的标题，引用的文档样式和脚本等。

