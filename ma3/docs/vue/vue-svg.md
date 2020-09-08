---
title: 'vue中svg使用'
description: '项目中遇到的SVG的问题'
sidebar: 'auto'
time: '2020-04-09'
prev: ''
next: ''
tags: ['vue']
---

[SVG是什么，干嘛用的](//developer.mozilla.org/zh-CN/docs/Web/SVG)

## 如果UI给你的是SVG Sprite我们该怎么引入到页面

##### 通过 SCRIPT 标签引入

``` js
// <script src="//www.maxiong.ren/xiong/icon/common/sprite.js"></script>

!(function(){
    document.body.insertAdjacentHTML('after', '<div hidden><svg><symbol id=""></symbol>...</svg></div>')
})()

// 在html中使用方法
<svg><use xlink:href="#id"></use></svg>
```

##### 在vue组件中通过`require('xxxx')`引入

``` html
<!--
 icon-sprite.vue
-->

<template>
    <div>
        <svg>
           <use :xlink:href="`${require('@/assets/icon-svg/sprite.svg')}#${iconName}`"></use>
        </svg>
    </div>
</template>
<script>
    export default{
        name:"icon-sprite",
        data(){
            return {}
        },
        props:{
            iconName:{
                type:String,
                default:"icon-default"
            }
        }
    }
</script>

```

##### 使用第三方库

[vue-svg-sprite](//github.com/thierrymichel/vue-svg-sprite) 

``` js

    import sdr from  '@/assets/icon-svg/sprite.svg';
    // const sdr = require('@/assets/icon-svg/sprite.svg')
    Vue.use(SvgSprite, {
    url: sdr, // svg sprite 地址，可以省略（使用默认svg sprite）或者为`''`（用于内联，全局引入的 svg sprite）
    class: 'my-class',
    });
```

::: tip 注意
url的值：需要使用 `import/ require`引入，否则无法正常工作
:::


## 如果ui给你的是单个SVG

#### 通过img标签引入

``` html
<img :src="`${require('@/assets/aiqfome.svg')}`" alt="">
```

#### vue-svg-loader

[vue-svg-loader](//github.com/visualfanatic/vue-svg-loader)

使用`vue-svg-loader` 它可以把svg文件当作vue组件使用

```js
    // vue.config.js
    module.exports = {
        chainWebpack: (config) => {
            const svgRule = config.module.rule('svg');
    
            svgRule.uses.clear();
            svgRule
                .rule('svg-smart')
                .test(/\.svg$/)
                .use('vue-svg-loader')
                .loader('vue-svg-loader')
        }
    }
```
``` html
    <!--
        .vue
    -->
    <template>
        <div>
            <VueLogo />
        </div>
    </template>
    <script>
       import VueLogo from '@/assets/aiqfome.svg'; // 单个svg
        export default{
            data(){
                return {
                sw: 'icon-person',
                // qa: aiqfome
                }
            },
            components:{
                VueLogo
            }
        } 
    </script>
 ```

 #### svg-sprite-loader

 [svg-sprite-loader`](//github.com/JetBrains/svg-sprite-loader)

使用`svg-sprite-loader` 创建SVG sprite

``` js
    // vue.config.js
    module.exports = {
        chainWebpack: config => {
            const svgRule = config.module.rule('svg')
            svgRule.uses.clear()
                svgRule
                .rule('svg-smart')
                .test(/\.svg$/)
                // .include
                // .add(resolve('src/assets/icon-list'))
                // .end()
                .use('svg-sprite-loader')
                .loader('svg-sprite-loader')
                .options({
                    symbolId: '[name]'
                })
        }
    }


    // main.js--引入全部
    // requires and returns all modules that match
    const requireAll = requireContext => requireContext.keys().map(requireContext);
    
    // import all svg
    const req = require.context('@/assets/icon-list', true, /\.svg$/);
    requireAll(req);
```

[creating-svg-sprites-with-webpack-using-svg-sprite-loader](//edgardorl.com/blog/creating-svg-sprites-with-webpack-using-svg-sprite-loader/)


## 延伸

#### require.context()

你还可以通过` require.context() `函数来创建自己的 context。

如果想引入一个文件夹下面的所有文件，或者引入能匹配一个正则表达式的所有文件，这个功能就会很有帮助

[webpack官网解释](//webpack.docschina.org/guides/dependency-management/#%E5%B8%A6%E8%A1%A8%E8%BE%BE%E5%BC%8F%E7%9A%84-require-%E8%AF%AD%E5%8F%A5)

``` js
// requires and returns all modules that match
const requireAll = requireContext => requireContext.keys().map(requireContext);
 
// import all svg
const req = require.context('@/assets/icon-list', true, /\.svg$/);
console.log(req) // 打印如下
requireAll(req);

var map = {
	"./gatsby.svg": "./src/assets/icon-list/gatsby.svg",
	"./scaleway.svg": "./src/assets/icon-list/scaleway.svg"
};

// __webpack_require__ (webpack 特有变量) 
// 就是原始 require 函数。这个表达式不会被解析器解析为依赖


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) { // 上下文解析
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./src/assets/icon-list sync recursive \\.svg$";
```



