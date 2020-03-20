---
title: webpack 优化（持续）
description: ''
sidebar: 'auto'
time: '2119-05-01'
prev: ''
next: ''
---

[仓库地址](https://github.com/maxiong88/demo-react-webpack)
[参考](https://developers.google.com/web/fundamentals/performance/webpack)
[参考](https://webpack.js.org/configuration/optimization/)
[参考](https://nystudio107.com/blog/an-annotated-webpack-4-config-for-frontend-web-development)

祭出量化插件`speed-measure-webpack-plugin`, 告诉你plugin、loader耗时。详细配置访问： [speed-measure-webpack-plugin](https://www.npmjs.com/package/speed-measure-webpack-plugin)

## webpack 4.0

+  `mode` 配置模式 告诉 `webpack` 应该使用哪种模式
    - development
        + 会将 `process.env.NODE_ENV` 的值设为 `development`。启用 :
            - `NamedChunksPlugin` 将chunkId变成文件名，从而固定chunkId
            - `NamedModulesPlugin` 使用HMR时，会显示模块的相对路径
    - production
        + 会将 `process.env.NODE_ENV` 的值设为 `production`。启用 ：        
            - `FlagDependencyUsagePlugin` 
            - `FlagIncludedChunksPlugin`, 
            - * `ModuleConcatenationPlugin`, `Scope hoisting` 为ES模块启用模块级联（也称为范围提升） 捆绑包具有更少的模块 - 并且模块开销更少, mode为 production模式下自动开始否则关闭
            - `NoEmitOnErrorsPlugin`,  遇到错误代码不跳出
            - `OccurrenceOrderPlugin`, webpack就能够比对id的使用频率和分布来得出最短的id分配给使用频率高的模块 `new webpack.optimize.OccurenceOrderPlugin()`
            - * `SideEffectsFlagPlugin` 开启`tree-shaking`消除死代码 [谁 k 鹰]
            - `UglifyJsPlugin` 开启压缩js css `new webpack.optimize.UglifyJsPlugin()`

## `loader` 转化处理优化
    
由于loader对文件的转换操作很耗时，所以需要让尽可能少的文件被loader处理。
如下：五种方案

+ exclude、include
    - `exclude` 的优先级高于 `include`，在 `include` 和 `exclude` 中使用绝对路径数组`[path.resolve(__dirname, [path,[path]]), ...]`，尽量避免 `exclude`，更倾向于使用 `include`。
    ``` js
    const path = require('path');
    module.exports = {
        // ...
        module: {
            rules:[
                {
                    test: /\.js[x]?$/,
                    include: [path.resolve(__dirname, 'src')]
                    // exclude: /node_modules/,
                    // use: ['cache-loader', 'thread-loader','babel-loader?cacheDirectory']
                    // use:['babel-loader?cacheDirectory']
                    use:['babel-loader']
                }
            ]
        }
    }
    ```
+ 如果只针对`babel-loader`在配置项中添加 `cacheDirectory` 在第一次还是很慢，二次以后还是很快的; 将会尝试读取缓存
    ``` js
    const path = require('path')
    module.exports = {
        module:{
            rules:[
                {
                    test: /\.js[x]?$/,
                    include: [path.resolve(__dirname, 'src')],
                    // use: ['cache-loader', 'thread-loader','babel-loader?cacheDirectory']
                    use:['babel-loader?cacheDirectory']
                }
            ]
        }
    }
    ```
+ `cache-loader` 在一些性能开销较大的 loader 之前添加此 loader，以将结果缓存到磁盘里。
    ``` js
    const path = require('path')
    module.exports = {
        module:{
            rules:[
                {
                    test: /\.js[x]?$/,
                    include: [path.resolve(__dirname, 'src')],
                    use: ['cache-loader', 'babel-loader', 'style-loader',.....]
                    //use:['babel-loader?cacheDirectory']
                }
            ]
        }
    }
    ```
    <p class='tip'>
        请注意，保存和读取这些缓存文件会有一些时间开销，所以请只对性能开销较大的 loader 使用此 loader。
    </p>
+ `thread-loader` 把这个 loader 放置在其他 loader 之前， 放置在这个 loader 之后的 loader 就会在一个单独的 worker 池(worker pool)中运行
+ `happypack` 它把任务分解给多个子进程去并发的执行，子进程处理完后再把结果发送给主进程。
    <p class='tip'>
        当你的项目不是很复杂时，不需要配置 happypack，因为进程的分配和管理也需要时间，并不能有效提升构建速度，甚至会变慢。
    </p>

::: tip
测试了这三个[thread-loader、cache-loader、babel-loader?cacheDirectory]，当`babel-loader?cacheDirectory` 与 `cache-loader` 的时间用时还是比较少的
:::


## plugin优化 

有四种

### compression-webpack-plugin

`npm i compression-webpack-plugin --save-dev` 压缩大小提高渲染速度

通过Webpack插件 CompressionPlugin，对JS文件进行gzip压缩，压缩后为*.js.gz

``` js
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
plugins: [
    new CompressionPlugin()
]
}
```
<p class='tip'>
并且需要后端人员配合，将返回的Response Headers 对 Content-Encoding 设置为 gzip;
</p>

### DllPlugin

将不长改变的库，分打包，不如CDN好

### IgnorePlugin

[连接](//webpack.js.org/plugins/ignore-plugin/#root)

内置插件，作用是忽略第三方包指定目录。

``` js
import moment from 'moment';
import 'moment/locale/zh-cn';// 可手动引入

module.exports = {
    plugins:[
        //忽略 moment 下的 ./locale 目录
        new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/
        });
    ]
}
```

如上，如果我们不过滤语言包，在进行webpack构建的时候，webpack也会提示我们
``` js
// 隐藏了128个模块，是可以选择的
./node_modules/moment/locale sync ^\.\/.*$ 3 KiB {0} [optional] [built] + 128 hidden modules
```

忽略前263KB，忽略后55KB

### HardSourceWebpackPlugin

HardSourceWebpackPlugin是webpack的插件，用于为模块提供中间缓存步骤。为了查看结果，您需要使用此插件运行两次webpack：第一个构建将花费正常时间。第二个版本将明显更快。

``` js
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

module.exports = {
  context: // ...
  entry: // ...
  output: // ...
  plugins: [
    new HardSourceWebpackPlugin()
  ]
}
```

## externals 外部扩张

作用： 防止将某些通过`import`引入的文件，打包到build。例如：通过CDN引入的react、vue、lodash等
``` js
module.exports = {
  //...
  externals: [ // string object function regex
    {
      // String
      react: 'react',
      // Object
      lodash : {
        commonjs: 'lodash', // 可以将 library 作为一个 CommonJS 模块访问。
        commonjs2:'lodash', //和上面的类似，但导出的是 module.exports.default.
        amd: 'lodash', //  类似于 commonjs，但使用 AMD 模块系统。
        root: '_' // indicates global variable 可以通过一个全局变量访问 library（例如，通过 script 标签）
      },
      // Array
      subtract: ['./math', 'subtract'],
        head: {head: ['_', 'head']} // lodash 用_
    },
    // Function
    function(context, request, callback) {
      if (/^yourregex$/.test(request)){
        return callback(null, 'commonjs ' + request);
      }
      callback();
    },
    // Regex
    /^(jquery|\$)$/i
  ]
};

// 使用

<script src='https://cdn.bootcss.com/lodash.js/4.17.15/lodash.min.js'></script>
import head from 'head'
console.log(head([1, 2, 3]));

```

## `resolve` 配置模块如何解析

``` js
resolve: {
    extensions: ['*','.js', '.jsx', '.json','.less','.css'],
    alias: { // 前缀缩写
        '@': path.resolve(__dirname, '..', 'src'),
        'js': path.resolve(__dirname, '..', 'src/common/js'),
        'lessCommon': path.resolve(__dirname, '..', 'src/common/less'),
        'jspage': path.resolve(__dirname, '..', 'src/page'),
    },
    modules: [path.resolve(__dirname,'../node_modules')] // 去哪里搜索第三方包
}
```
<p class='tip'>
    `resolve.modules`使用绝对路径，他将仅在给定目录中搜索!!!
    配置这些只是用来方便目录文件解析，对于项目的速度优化几乎可以不计
</p>

## module.noParse

`module.noParse` 防止 webpack 解析那些任何与给定正则表达式相匹配的文件。忽略的文件中不应该含有 import, require, define 的调用，或任何其他导入机制。忽略大型的 library 可以提高构建性能。

如果一些第三方模块没有AMD/CommonJS规范版本，可以使用 noParse 来标识这个模块，这样 Webpack 会引入这些模块，但是不进行转化和解析，从而提升 Webpack 的构建性能 ，例如：jquery 、lodash。

``` js
module: {
    rules: [],
    noParse: RegExp | [RegExp] | function | /jquery|loadsh/
}
```

## 开启 JS 多进程压缩、抽离公共代码

方案有一种，如下：

optimization 配置：开启 JS 多进程压缩

+ `minimize` 默认使用`terser-webpack-plugin` 来压缩js, 默认false；production模式下是true
+ `minimizer` 允许您通过提供不同的一个或多个自定义TerserPlugin实例来覆盖默认最小化器。
    ``` js
    // https://webpack.js.org/plugins/terser-webpack-plugin/
    // https://webpack.js.org/configuration/optimization#optimizationminimize
    new UglifyJsPlugin({
        uglifyOptions: {
            compress: {
                warnings: false,
                drop_console: true,//console
                pure_funcs: ['console.log']//移除console
            }
        },
        cache: true, // 启用文件缓存
        parallel: true, // 使用多进程并行运行来提高构建速度
        sourceMap: false 
    }),
    ```

optimization 配置：抽离公共代码

+ `splitChunks`
    ``` js
    splitChunks: {
        cacheGroups: {
            vendors: {
                test: /[\\/]node_modules[\\/]/,
                name: 'vendors',
                priority: 9,
                chunks: 'initial'
            },
            common: {
                chunks: 'initial', //initial表示提取入口文件的公共部分
                //chunks: 'all',
                minChunks: 2, //表示提取公共部分最少的文件数
                minSize: 0, //表示提取公共部分最小的大小
                name: 'commons' //提取出来的文件命名
            }
        }
    }
    ```

+ 开启模块热替换 
    - `new webpack.NamedModulesPlugin()`
    - `react-hot-loader`
    - `vue-hot-loader`

+ 复制静态资源 `copy-webpack-plugin`
    ``` js
    new CopyWebpackPlugin([
        {
            from: path.resolve(__dirname, '..', 'static'),
            to: 'staticresources',
            ignore: ['.*']
        }
    ])
    ```

+ 压缩提取css `mini-css-extract-plugin`
    ``` js
    {
        test: /\.css$/,
        use: [process.env.NODE_ENV !== 'development' ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader']
    },
    {
        test: /\.less/,
        use: [process.env.NODE_ENV !== 'development' ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', 'postcss-loader', 'less-loader']
    }
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles/[name].[chunkhash:8].css'
        })
    ]
    ```

+ 生成一个HTML5文件，其中包含使用script标记在正文中的所有webpack包 `html-webpack-plugin`
    ``` js
    let pages = Object.keys(entryWebpackConfig.entries);
    pages.forEach(function(pathname) {
        let conf = {
            title:titleConfig[pathname].title,
            filename: 'html/' + pathname + '/index.html',
            template: './index.html',
            inject: true,
            minify: false
        };
        conf.inject = 'body';
        conf.chunks = [pathname];
        conf.hash = false;
        devWebpackConfig.plugins.unshift(new HtmlWebpackPlugin(conf));
    });
    ```

+ 前端使用ES模块，webpack可使用tree-shaking来减少代码

``` js
//math.js
const add = (a, b) => {
    console.log('aaaaaa')
    return a + b;
}

const minus = (a, b) => {
    console.log('bbbbbb')
    return a - b;
}

export {
    add,
    minus
}
//index.js
import {add, minus} from './math';
add(2,3);
```
构建的最终代码里，minus 函数不会被打包进去。

+ 通过NODE_ENV 设置环境 变量 来减少代码


## webpack 中，module，chunk 和 bundle 的区别是什么？

+ 所谓 `chunk`, 指的是一个或者几个 `module` 组成的一个独立的 `js` 文件, 而 `chunk` 分为以下几个类型:
    - Entry Chunks: Entry Chunks是我们最常见的Chunks类型, 包含了我们自己写的业务逻辑相关代码(大多数情况下是独有的代码, 即不会被提取到公共 chunks 中的代码), 一般会等到 Initial Chunks 加载完成才会执行(或者是遇到 module 编号为 0 的 module).
    - Normal Chunks: Normal Chunks 主要指代那些应用运行时动态加载的模块,Webpack会为我们创建类似于 JSONP 这样合适的加载器来进行动态加载.
    - Initial Chunks: Initial Chunks 本质上还是 Normal Chunks, 不过其会在应用初始化时完成加载, 往往这个类型的Chunks由split-chunks-plugin生成, 这个这个里面包含了全局的模块位置信息, Entry chunks 中的代码执行依赖这个 chunk, 因此应该优先加载这个 js.
+ module就是我们代码中通过import或require引入的一个文件，可以是js，css或图片等等。注意它和chunk的不同：chunk是最终的输出文件，而module是编码时的内部引用
+ bundle chunk是指代码块，而bundle是指打包后的代码

## filename 和 chunkFilename 的区别

+ filename 就是对应于 entry 里面的输入文件，确定每个输出包的名称
+ chunkFilename 需要被打包出来的文件的名称

## webpackPrefetch、webpackPreload 和 webpackChunkName 到底是干什么的？

## hash、chunkhash、contenthash 有什么不同？

+ hash（所有文件哈希值相同，只要改变内容跟之前的不一致，所有哈希值都改变，没有做到缓存意义） `工程级别的`
+ chunkhash（同一个模块，就算将js和css分离，其哈希值也是相同的，修改一处，js和css哈希值都会变，同hash，没有做到缓存意义）
+ contenthash（只要文件内容不一样，产生的哈希值就不一样）  `针对文件内容级别的`
    - css 用的contenthash
    - js 用的chunkhash
        + main bundle 会随着自身的新增内容的修改，而发生变化。
        + vendor bundle 会随着自身的 module.id 的变化，而发生变化。
        + manifest bundle 会因为现在包含一个新模块的引用，而发生变化。
        + 添加 HashedModuleIdsPlugin 可避免 不论是否添加任何新的本地依赖，对于前后两次构建，vendor hash 都应该保持一致：

## 页面优化




## 工具

+ [webpack-dashboard](//github.com/FormidableLabs/webpack-dashboard/) 增强了webpack输出的大小依赖性，进度和其他细节

+ [bundlesize](//github.com/siddharthkp/bundlesize) 验证webpack资产是否超过指定的大小

+ [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer) 查看哪些模块占用了空间




