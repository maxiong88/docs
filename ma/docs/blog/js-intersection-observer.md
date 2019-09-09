---
title: 图片视频懒加载
description: 'Intersection Observer、getBoundingClientRect scroll resize orientationchange'
sidebar: 'auto'
time: '2019-07-25'
prev: ''
next: ''
---

### 有何用

+ 可以减少初始页面加载时间、初始页面负载以及系统资源使用量，所有这一切都会对性能产生积极影响


### 进入IntersectionObservers

+ `intersectionObservers` 可以让你知道观察到的元素何时进入或退出浏览器的视口
    - `boundingClientRect` 是getBoundingClientRect()调用观察元素的结果。
    - `intersectionRect` 是这两个矩形的交集，有效地告诉您 观察到的元素的哪个部分是可见的。 
    - `intersectionRatio` 是密切相关的，并告诉你有多少元素是可见的
    - 规范实际上说IntersectionObserver实现应该使用 `requestIdleCallback()`这意味着对您提供的回调的调用优先级较低，并且将在闲置时间由浏览器进行。这是一个有意识的设计决策。

### 神奇

+ 懒加载
+ 无限滚动
+ iframe广告嵌入，来查看用户浏览量，用户停留时间等
+ 根据用户是否已滚动到相应区域来灵活开始执行任务或动画。
+ 如果两个元素发生的交集部分在N%左右，我需要做处理一些事情(执行回调)

### intersectionObserver

``` js

new IntersectionObserver(function(entries, observer){

}, {
    root:'', //所监听对象的祖先元素
    rootMargin: '', // 祖元素的偏移量
    rhtesholds: [] // 阈值列表，每到一个值就会生成一个通知，调用函数
})

```

``` html
<style>
    img{
        height: 100%
        width: 100%
        object-fit: cover
        border-radius: 3px
        background-color: #333
    }
    img.lazy-image{
        opacity: 0.1
        will-change: opacity
        transition: all 0.3s
    }
    img.lazy-image.loaded{
        opacity: 1    
    }
</style>
<div class='.center'>
    <div class='gallery'>
        <div class='image'>
            <img src='' class='lazy-image'>
        </div> 
    </div>
</div>

<script>
    let lazyImages = [...document.querySelectorAll('.lazy-image')]; // Array.from(document.querySelectorAll('.lazy-image'))
    const interactSettings = {
        root: document.querySelector('.center'),
        rootMargin: '0px 0px 200px 0px'
    }
    function onIntersection(imageEntites) {
        imageEntites.forEach(image => {
            if (image.isIntersecting) {
                observer.unobserve(image.target)
                image.target.src = image.target.dataset.src
                image.target.onload = () => image.target.classList.add('loaded')
            }
        })
    }

    let observer = new IntersectionObserver(onIntersection, interactSettings)

    lazyImages.forEach(image => observer.observe(image));


    function createImages(imgs) {
    for (let i of imgs) {
        // Create an image HTML tag
        const image = document.createElement('img');
        image.setAttribute('data-lazy', i.download_url);
        image.classList.add('lazy-loading');
        document.getElementById('imagesContainer').appendChild(image);
    }
    // Sets an observer for each image
    lazyTargets = document.querySelectorAll('.lazy-loading');
    lazyTargets.forEach(lazyLoad);
    }

    // The lazy loading observer
    function lazyLoad(target) {
    const obs = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            const src = img.getAttribute('data-lazy');

            img.setAttribute('src', src);
            img.classList.add('fadeIn');

            observer.disconnect();
        }
        });
    });
    obs.observe(target);
    }
</script>
```

### 事件监听

```js
import {throttle} from 'lodash-es'

document.addEventListener("DOMContentLoaded", function() {
    let lazyImages = [...document.querySelectorAll('.lazy-image')]; // Array.from(document.querySelectorAll('.lazy-image'))
    let inAdvance = 300;

    function lazyLoad(){
        lazyImages.forEach(image => {
            if(images.offsetTop < window.innerHeight + window.pageYOffset + inAdvance){
                image.src = image.dataset.src; // dataset 获取data-*属性值或者给属性赋值
                image.onload = () => {image.classList.add('loaded')}
            }
        })
        // if all loaded removeEeventListeners
    }
    lazyLoad();

    document.addEventListener('scroll', throttle(lazyLoad, 50));
    window.addEventListener('resize', throttle(lazyLoad, 50));
    window.addEventListener("orientationchange", throttle(lazyLoad, 50));
});
```


### No JS, zero JS, nothing, only HTML attribute

开启谷歌浏览器 实验功能`chrome://flags/#enable-lazy-image-loading`

``` html
<img srcv='https://c3.xinstatic.com/o/20190704/1503/5d1da4b9b33b3367347_18.jpg' loading='lazy'>
```


### 注意事项

+ 首屏线以上尽量不要延迟加载，而应将此类资源视为关键资产，进行正常加载。
    - Intersection Observer API 允许您在创建新的 IntersectionObserver 实例时，在 options 对象中指定 rootMargin 属性。 如此即可为元素提供缓冲区，以便在元素进入视口之前触发延迟加载行为
    - 要使用滚动事件处理代码实现这种效果，只需调整 getBoundingClientRect 检查以包括缓冲区
+ 布局移位与占位符
    - 使用纯色占位符来占用尺寸、目标图像相同的空间、骨架屏
    - [低质量图像占位符SQIP](https://github.com/axe312ger/sqip) 需要服务端配合
    - [低质量图像占位符LQIP](https://www.guypo.com/introducing-lqip-low-quality-image-placeholders) 需要服务端配合
+ 图像解码延迟
    - img.decode() 函数加载图像
    ``` js
        // 老
            function getImage(path){
                return new Promise((resolve, reject) => {
                    let image = new Image();
                    image.onload = resolve(image)
                    image.onerror = resolve;
                    image.src = path;
                })
            }
            getImage('maxiong.jpg').then(img => {
                document.body.append(img);
            })
        // 新
        const img = new Image();
        img.src = 'maxiong.jpg';
        img.decode().then(() => {
            document.body.appendChild(img)
        }).then(() => {
            throw new Error(`无法加载/解码大图像。`)
        })
    ```

### 懒加载库

+ [yall](https://github.com/malchata/yall.js) 该库使用 Intersection Observer，可回退到事件处理程序， 而且与 IE11 和主流浏览器兼容。
+ [lozad](https://github.com/ApoorvSaxena/lozad.js) 是超轻量级且只使用 Intersection Observer 的库
+ [lazysizes](https://github.com/aFarkas/lazysizes) 是功能全面的延迟加载库，可以延迟加载图像和 iframe
+ [blazy](https://github.com/dinbror/blazy) 是另一个轻量级的延迟加载器（大小为 1.4 KB）。 与 lazysizes 相同，blazy 不需要任何第三方实用程序即可进行加载，并且适用于 IE7+。 但其缺点是不使用 Intersection Observer
+ [react-lazyload](https://github.com/twobin/react-lazyload)



### 番外

+ [兼容性](//caniuse.com/#search=IntersectionObserver)
+ [W3C](//github.com/w3c/IntersectionObserver)
+ [谷歌](https://developers.google.com/web/fundamentals/performance/lazy-loading-guidance/images-and-video/)
+ [谷歌](https://developers.google.com/web/updates/2016/04/intersectionobserver?source=post_page---------------------------)
+ [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Intersection_Observer_API)














