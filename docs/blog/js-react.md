---
title: 'react render'
description: ''
sidebar: 'auto'
time: '2015-01-03'
prev: ''
next: ''
---


写react组件都会继承react.Component

一个组件类必须要实现一个render方法，这个render方法必须要返回一个jsx元素

注意，必须要用一个外层的jsx元素把所有内容包裹起来。返回并列多个jsx元素不合法

JSX 是 JavaScript 语言的一种语法扩展，你可以在里面写html+js。

jsx只是为 React.createElement(component, props, ...other)方法提供的语法糖

## createElement(type, [config], [childrens])

然后babel就会帮我们调用 React.createElement。 这也是为什么我们就算文件内没用到 React，也需要引入的原因。 


``` jsx

// jsx语法
let app = (<div id='app'>马雄</div>);

// babel转义 
let app = React.createElement('div', {id: 'app'}, '马雄');

console.log(app)

```

createElement 是将jsx转为 ReactElement的函数， 我们把 app 标签打印出来可以看到这个对象就是我们所说的ReactElement。

![react-createElement](../.vuepress/public/assets/img/react-createelement-1.png)

这里面主要是处理一下 key, ref, defaultProps， 然后将其他的参数和 childrens 放到props对象，最后调用ReactElement。

上面我们写的都是直接写jsx，如果是一个 Class 形式的ReactComponent，其实也一样，只是type从原来的dom标签变成传入的类。

```

import React from 'react';

let app = React.createElement('div', {id: 'app'}, 'Hello World!');

class Ho extends React.Component{
    render(){
        return (
            <div id='app'>
                <h2>gggg</h2>
            </div>
        )
    }
}
console.log(app, Ho, <Ho />)
```

![react-createElement](../.vuepress/public/assets/img/react-createlement-2.png)

对比上一次的结果，我们发现只有type这里是存在差异的，而这种差异带来的，就是React在渲染元素、组件时候的差异了

组件的定义: 是一个可复用的部件，接收props，并返回元素。

`到这一步，我们只是做了从jsx语法到React Element的转换，但基本上React库的部分就到这里了。`




##### 从JSX到React.createElement()

JSX是在编译的时候由Babel转译成React.createElement()调用的。我们可以使用[https://babeljs.io/repl](https://babeljs.io/repl)查看

``` bash
// jsx语法
import React from 'react'

ReactDOM.render(
  <h1 style={{color:"blue"}}>hello world</h1>,
  document.getElementById("root")
);
```

转义后

``` bash
// babel转义 
"use strict";

import React from 'react'

ReactDOM.render(React.createElement(
  "h1",
  { style: { color: "blue" } },
  "hello world"
), document.getElementById("root"));

```

> React.createElement() - 方法只是做了简单的参数修正，返回一个ReactElement实例对象

	>> 1. React.createElement(type, config, children) 仅仅是 ReactElement.createElement()的一个别名; `src/isomorphic/React.js 22行`

	>> ReactElement.createElement(type, config, children) 做了三件事： `src/isomorphic/classic/element/ReactElement.js 181行`
		1) 把 config里的数据一项一项拷入props, 
		2) 拷贝 children 到 props.children， 
		3) 拷贝 type.defaultProps 到 props

	>> 然后 ReactElement(type,…, props) 会把 type 和 props 原样透传给 ReactElement 的构造函数，并返回新构造的实例. `src/isomorphic/classic/element/ReactElement.js 115行`

这个新构建的ReactElement一会会在ReactMount.instantiateReactComponent() 函数中用到。因为下一步也会构建一个ReactElement我们先把这一步生成的对象命名为ReactElement[1]。
	
#### ReactDom.render() -  开始渲染

> ReactDom.render 执行的是 ReactMount.render `src\renderers\dom\ReactDOM.js 30行`

> 执行 ReactMount._renderSubtreeIntoContainer `src\renderers\dom\client\ReactMount.js 567行`

	>> 检测ReactELement[1]合法性

	>> 检擦container页面容器是否已经被渲染过react组件

	>> 调用renderNewRootComponent渲染（将新组件呈现到dom中）

	>> 调用instantiateReactComponent这是初始化组件的入口函数，

> 执行instantiateReactComponent  `src\renderers\shared\stack\reconciler\instantiateReactComponent.js`
  
  >> 它通过判断node类型来区分不同组件入口（【node类型null】空组件、【node类型对象】DOM标签组件（ReactDOMComponent）或自定义组件（ReactCompositeComponent）、【node类型字符串或数字】文本组件（ReactDOMTextComponent）、【node其他情况】不做处理）
	

	


## 生命周期

::: tip 这个先不考虑

static defaultProps = {}

static propTypes = {}

服务端渲染

:::

#### <center>v15</center>

![v15](../.vuepress/public/assets/img/react-life-3.jpg)


#### <center>v16</center>

![v16](../.vuepress/public/assets/img/react-life-1.jpg)