---
title: '网站性能分析'
description: ''
sidebar: 'auto'
time: '2019-08-01'
prev: ''
next: ''
---









+ 如果网站使用了自定义字体，内容隐藏时间长，体验差
    - `font-display`添加到`@font-face`中，
        + optional: 为字体提供一个非常小的阻塞周期并且没有交换周期
            - 如果没有缓存自定义字体，它会告诉浏览器只使用后备字体
            - 现在，当客户第一次访问该页面时，他们将立即看到文本，以后备字体呈现。浏览器将在后台下载自定义字体并将其用于后续页面
            - 单页面应用切换路由的时候字体不会处于激活状态
        + fallback: 为字体提供一个非常小的阻塞周期和短暂的交换周期
        + swap: 为字体提供一个非常小的阻塞周期和无限的交换周期
        + block: 为字体提供一个短暂的阻塞周期和无限的交换周期
        + auto: 字体显示策略由用户代理定义

+ [img 优化](https://images.guide)
    - [测试](https://www.webpagetest.org)
    - 使用`picture`标记与不同的浏览器保持兼容
        + [MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/picture)
        + 包含`source img`两个标签
        + source srcset地址路径  media媒体查询  type图片类型
    - 低质量图像占位符SQIP LQIP
    - img.decode() 函数加载图像 会开启一个微任务

+ 不要再现代浏览器中使用`babel-polyfill`  [webpack-esnext-boilerplate](https://github.com/philipwalton/webpack-esnext-boilerplate)

+ 本地存储 恒定不变的接口数据 省市县 等

+ 服务端的压缩

+ 减少css阻塞
    - 先加载主要css
    - 动态加载剩下css
    ``` js
    document.addEventLiastener('DOMContentLoaded', () => {
        const styles = ['.css','.css'];
        styles.forEach((path) => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = path;
            document.head.appendChild(link)
        })
    })
    ```

+ 优化js
    - `defer`和`async`
        + `无` 先解析html，加载js，执行js，（加载与执行js一起，阻塞下面dom解析）继续解析html
        + `async` 先解析html，加载js，（还会同步解析html），等js加载完成立即执行js，在解析下面html
        + `defer` 先解析html，加载js（还会同步解析html），等所有dom解析完成，在会执行js

    - ？？？ 延迟执行是否按顺序执行
    - 仅在必要时加载非重要代码
        + 在浏览器使用 `source` -> `ctrl+shift+p` ->  `start coverage` -> `changes` 来查看文件代码是否被使用，红色代表没有被使用，绿色表示被使用了
        + 动态导入：通过模块内的内联函数调用拆分代码
            ``` js
            const lazyComponent = () => import('./lazyComponent.vue');
            ```
    - 在现代浏览器中删除polyfill

+ webpack
    - 1、内嵌小图片，通过url-loader对1-10kb转base64，即使使用http2也有用
    - [http2到了但是雪碧图没死](https://blog.octo.com/en/http2-arrives-but-sprite-sets-aint-no-dead/)
    ``` js
        module.exports = {
        module: {
            rules: [
            {
                test: /\.(jpe?g|png|gif)$/,
                loader: 'url-loader',
                options: {
                // Images larger than 10 KB won’t be inlined
                limit: 10 * 1024
                }
            }
            ]
        }
        };
    ```
    - 2、内嵌小型SVG图像，通过 svg-url-loader
    - 该加载程序的工作方式类似于url-loader，但是它使用URL编码而不是Base64 编码文件。因为SVG是文本，所以URL编码的结果较小。
    ``` js
        // webpack.config.js
        module.exports = {
        module: {
            rules: [
            {
                test: /\.svg$/,
                loader: 'svg-url-loader',
                options: {
                // Images larger than 10 KB won’t be inlined
                limit: 10 * 1024,
                // Remove quotes around the encoded URL –
                // they’re rarely useful
                noquotes: true,
                }
            }
            ]
        }
        };
    ```
    - 3、压缩图片  tinify
















+ [摘自](https://iamakulov.com/notes/walmart/)
+ [摘自](https://itnext.io/@frakowski)