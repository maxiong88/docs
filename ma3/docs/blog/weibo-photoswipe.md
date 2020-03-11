---
title: 'photoswipe用法'
description: '超好用的图片展示，缩放，懒加载，兼容pc移动，微博、马蜂窝都在用'
sidebar: 'auto'
time: '2018-01-04'
prev: ''
next: ''
---



## options 

常用后期会补充

> galleryUID : 每组图片画廊生成唯一id，在形成URL时由History模块使用。 `http://example.com/#&gid=1&pid=2`

> galleryPIDs : 为每张图片自定义ID。如果选项集设置为true，则幻灯片对象必须具有pid（图片标识符）属性，该属性可以是字符串或整数。`http://example.com/#&gid=1&pid=image-two`

> loop: !0, 是否循环

> getThumbBoundsFn : (index){} 计算缩略图位置,index是点击的当前图片索引,函数应返回一个具有坐标的对象，初始放大动画将从该坐标开始（或缩小动画将结束）

> index: 0, 当前图片索引值

> barsSize: {top:0,bottom:0} 顶部区域位置

> captionEl: false 控制标题是否展示

> fullscreenEl: false 控件是否展示全屏按钮

> shareEl: false 控件是否展示分享按钮

> bgOpacity: .1 背景透明度

> tapToClose: true 轻点关闭

> tapToToggleControls: false 轻点控件不可见

## API  Events

常用后期会补充

> `pswp.listen('gettingData', function(index, item) {}` 幻灯片触发之前

> `pswp.init()` photoswipe初始化

> `pswp.listen('beforeChange', function() {}` slides change 之前

> `pswp.listen('close', function() {}` photoswipe关闭

> `pswp.framework.bind( DOM, 'pswpTap', function(e) {}` 自定义dom 添加事件 移动端 pswpTap




## 案例

``` js

/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
/* eslint-disable no-sequences */
/* eslint-disable react/forbid-elements */
/* eslint-disable react/button-has-type */
/* eslint-disable react/no-unknown-property */
import React from 'react';
import PhotoSwipe from './photoswipe.jsx';
import PhotoswipeUI from './photoswipe-ui.jsx';
export default class pswp extends React.Component{
    state = {
        url: ''
    }
    componentDidMount(){
        let that = this;
        const initPhotoSwipeFromDOM = function(gallerySelector) {
			// 控制url上面的hash值
            const photoswipeParseHash = function() {
                let hash = window.location.hash.substring(1),
                    params = {};
                if(hash.length < 5) { // pid=1
                    return params;
                }
                let vars = hash.split('&');
                for (let i = 0; i < vars.length; i++) {
                    if(!vars[i]) {
                        continue;
                    }
                    let pair = vars[i].split('=');
                    if(pair.length < 2) {
                        continue;
                    }
                    params[pair[0]] = pair[1];
                }
                if(params.gid) {
                    params.gid = parseInt(params.gid, 10);
                }
                return params;
            };
            const parseThumbnailElements = function(el) {
                let thumbElements = el.childNodes,
                    numNodes = thumbElements.length,
                    items = [],
                    ele,
                    item;
                for(let i = 0; i < numNodes; i++) {
                    ele = thumbElements[i].children[0];
                    // include only element nodes
                    if(ele.nodeType !== 1) {
                        continue;
                    }

                    // create slide object
                    item = {
                        src: ele.getAttribute('src'),
                        w: ele.width*5,
                        h: ele.height*5
                    };
                    item.el = ele; // save link to element for getThumbBoundsFn
                    if(ele) {
                        item.msrc = ele.getAttribute('src'); // thumbnail url
                    }
                    // original image
                    item.o = {
                        src: item.src,
                        w: ele.naturalWidth,
                        h: ele.naturalHeight
                    };
                    items.push(item);
                }
                return items;
            };
            const onThumbnailsClick = function(e) {
                e.preventDefault();
                let hashData = photoswipeParseHash();
                if(hashData.pid && hashData.gid) {
                    window.history.pushState('', '', window.location.pathname + window.location.search);
                }
                let eTarget = e.target;
                if(eTarget.getAttribute('src') === eTarget.getAttribute('data-echo')){
                    let clickedGallery = eTarget.parentNode.parentNode;
                    let index = eTarget.getAttribute('data-index');
                    if(index >= 0) {
                        openPhotoSwipe( index, clickedGallery );
                    }
                }
                return false;
            };
            const openPhotoSwipe = function(index, galleryElement) {
                let pswpElement = document.querySelectorAll('.pswp')[0],
                    gallery,
                    options,
                    items;

                items = parseThumbnailElements(galleryElement);

                // define options (if needed)
                options = {
                    galleryUID: galleryElement.getAttribute('data-pswp-uid'),
                    loop: !1,
                    getThumbBoundsFn: function(index) {
                        let thumbnail = items[index].el,
                            pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                            rect = thumbnail.getBoundingClientRect();
                        return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
                    }
                    // hideAnimationDuration:0, showAnimationDuration:0
                };
                options.index = parseInt(index, 10);
                // options.mainClass = 'pswp--minimal--dark';
                options.barsSize = {top:0,bottom:0};
                options.captionEl = false; // 控制标题
                options.fullscreenEl = true; // 开启全屏  现在是下载
                options.shareEl = false; // 关闭分享
                options.bgOpacity = 0.85; // 背景色透明度
                options.tapToClose = true; // 轻点关闭
                options.tapToToggleControls = false; // 轻点控件不可见

                // Pass data to PhotoSwipe and initialize it
                gallery = new PhotoSwipe( pswpElement, PhotoswipeUI, items, options);
                gallery.listen('gettingData', function(index, item) {
                    that.setState({
                        url: item.src
                    });
                });
                gallery.init();
                gallery.listen('beforeChange', function() {
                    let e = gallery.getCurrentIndex();
                    that.setState({
                        url: items[e].src
                    });
                });
                gallery.listen('close', function() {
                    that.setState({
                        url: ''
                    });
                });
                gallery.framework.bind(document.querySelector('.button-save'), 'pswpTap', function(e) {
                    window.android && window.android.batchDownloadPic && window.android.batchDownloadPic([`${that.state.url}`],'/超级宝/询价管理/');
                });
            };
            // select all gallery elements
            let galleryElements = document.querySelectorAll( gallerySelector );
            for(let i = 0, l = galleryElements.length; i < l; i++) {
                galleryElements[i].setAttribute('data-pswp-uid', i+1);
                galleryElements[i].onclick = onThumbnailsClick;
            }
        };
        initPhotoSwipeFromDOM('.my-gallery-inquiry');
    }
    ePre(e){
        window.android && window.android.batchDownloadPic && window.android.batchDownloadPic([`${this.state.url}`],'/超级宝/询价管理/');
    }
    render(){
        return (
            <div id='gallery' className='pswp' tabindex='-1' role='dialog' aria-hidden='true'>
                <div className='pswp__bg'></div>
                <div className='pswp__scroll-wrap'>
                    <div className='pswp__container'>
                        <div className='pswp__item'></div>
                        <div className='pswp__item'></div>
                        <div className='pswp__item'></div>
                    </div>
                    <div className='pswp__ui pswp__ui--hidden'>
                        <div className='pswp__top-bar'>
                            <div className='pswp__counter'></div>
                            <button className="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>
                            <button className='pswp__button pswp__button--close' title='Close (Esc)'></button>
                            <div className='pswp__button pswp__button--down button-save'>
                                <i className='m-font m-font-download'></i>
                                <img className='save-img' src={`${this.state.url}`} />
                            </div>
                            {/* <a target='_blank' title='Toggle fullscreen' className='pswp__button pswp__button--down button-save'>
                                <i className='m-font m-font-download'></i>
                                <img className='save-img' src={`${this.state.url}`} />
                            </a> */}
                            <button className='pswp__button pswp__button--zoom' title='Zoom in/out'></button>
                            <div className='pswp__preloader'>
                                <div className='pswp__preloader__icn'>
                                    <div className='pswp__preloader__cut'>
                                        <div className='pswp__preloader__donut'></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='pswp__share-modal pswp__share-modal--hidden pswp__single-tap'>
                            <div className='pswp__share-tooltip'>
                            </div>
                        </div>
                        <button className='pswp__button pswp__button--arrow--left' title='Previous (arrow left)'></button>
                        <button className='pswp__button pswp__button--arrow--right' title='Next (arrow right)'></button>
                        <div className='pswp__caption'>
                            <div className='pswp__caption__center'></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

```


[http://photoswipe.com/](http://photoswipe.com/)
[https://www.bootcdn.cn/](https://www.bootcdn.cn/)


