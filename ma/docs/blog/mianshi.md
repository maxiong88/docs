---
title: '笔记'
description: ''
sidebar: 'auto'
time: '2000-01-01'
prev: ''
next: ''
---

## new操作符




## 在 Vue 中，子组件为何不可以修改父组件传递的 Prop，如果修改了，Vue 是如何监控到属性的修改并给出警告的。

::: tip 
首先父级的组件发生更新，子组件的`prop`也会更新为最新值，数据流就单向的；
如果是基本类型值改变，则会控制台发生警告
如果是对象和数组值改变，会更新，不发生警告[如果是更新当前对象的值会 发生警告]

可使用两种方案解决：

1、在子组件中定义一个本地的 `data` 属性并将这个 `prop` 用作其初始值

2、在子组件中使用这个 `prop` 的值来定义一个计算属性`computed`
:::

第二个问题：如果修改了，Vue 是如何监控到属性的修改并给出警告的

+ 模板解析
	- initProps 
		- vm.$options.propsData 获取父组件传递给子组件的 `prop` 数据
		- 通过for in  遍历可枚举属性，所以不会深度遍历，调用 loop(key)
			+ !isRoot !isUpdatingChildComponent 都是true
			+ 通过 `defineReactive$$1` 
				- 这里注入了 customSetter  defineReactive$$1错误提示信息 ·Avoid mutating a prop directly·
				- 为每个属性添加依赖 dep
			+ `updateListeners` 注册绑定监听事件
				- `createFnInvoker`
				- `add`
	- ...其他生命周期解析

+ 触发更新的时候
	- 执行 `invoker`
	- 判断绑定事件是否是数组
	- 不是数组将会return 出错误
	- `invokeWithErrorHandling`
	- 通过 apply 执行事件
	- Object.defineProperty 修改定义属性的值
	- customSetter  !isRoot !isUpdatingChildComponent 都是true
	- 执行 defineReactive$$1 注册是回调函数 warn [引用类型中 newVal===value return 出去了 ]
	- 子组件状态改变 控制台出现警告[引用类型不出警告，父子组件状态都改变]

用下面的例子来说明：

``` js
	Vue.component('Zoo', {
		props: ['ddd', 'aaa'],
		template: '<h3 @click="zzzw">{{ ddd }}</h3>',
		mounted(){
			console.log(this.aaa)
		},
		methods:{
			zzzw(){
				this.ddd = 'mmmmmmmmmm'
			}
		}
	})
	new Vue({
		el:'#app',
		data:{
			ddd:'ssss',
			aaa:{
				www:'2222'
			}
		}
	});

```

## vue $attr $listeners 用法



## Vue和React组件通信

<p class="tip">
节制地使用 `$parent` 和 `$children` - 它们的主要目的是作为访问组件的应急方法。更推荐用 `props` 和 `events` 实现父子组件通信
</p>

+ vue 父组件 传 子组件
	- 子组件定义`props[可以是数组、对象]`来接收父组件的数据
		+ 如果直接修改数据
			- 基本类型会提示警告，修改失败
			- 引用类型第一级别会提示警告，修改失败；第二级以后父子同时会改变
		+ 如果用一个对象同时设置多个 prop 的时候，父组件可通过`v-bind.sync="doc"`设置，则每一个属性 都作为一个独立的 prop 传进去子组件
	- 父组件可以使用`$children`来访问子组件实例
	- 父组件可以使用`$ref` 来访问子组件的实例或者DOM元素
	- `provide(父组件定义) / inject(子组件获取)`
	- `$attr / $listeners`
	- `v-model`

+ vue 子组件 传 父组件
	- 子组件可以使用`$parent`来访问父组件实例
	- 子组件通过`$emit`触发, 触发当前实例上的事件；父组件`$on`监听当前实例上的自定义事件

+ vue  非父子组件
	- 通过一个事件栈
	- vuex、redux、mobox、Flux
	
+ react 
	- 父组件可以向子组件通过传 props 的方式，向子组件进行通讯。
	- 如果父组件与子组件之间不止一个层级，可通过 `... 运算符`
		``` js
		// 通过 ... 运算符 向 Child_1_1 传递 Parent 组件的信息
			class Child_1 extends Component{
			  render() {
				return <div>
				  <p>{this.props.msg}</p>
				  <Child_1_1 {...this.props}/>
				</div>
			  }
			}

			class Child_1_1 extends Component{
			  render() {
				return <p>{this.props.msg}</p>
			  }
			}
		```
	- 子组件向父组件通讯，同样也需要父组件向子组件传递 `props`进行通讯，只是父组件传递的，是作用域为父组件自身的函数，子组件调用该函数，将子组件想要传递的信息，作为参数，传递到父组件的作用域中

+ react 兄弟组件间通讯
	- 他们有一个共同点同一个父级，所以我们就可以子1传父，父传子2，这样就有一个为题，会导致所有组件（父子）render一遍
	- Flux 与 Redux
	- eventProxy
		+ on、one：on 与 one 函数用于订阅者监听相应的事件，并将事件响应时的函数作为参数，on 与 one 的唯一区别就是，使用 one 进行订阅的函数，只会触发一次，而 使用 on 进行订阅的函数，每次事件发生相应时都会被触发。
		+ trigger：trigger 用于发布者发布事件，将除第一参数（事件名）的其他参数，作为新的参数，触发使用 one 与 on 进行订阅的函数。
		+ off：用于解除所有订阅了某个事件的所有函数。
	``` js
	// eventProxy.js
		'use strict';
		const eventProxy = {
		  onObj: {},
		  oneObj: {},
		  on: function(key, fn) {
			if(this.onObj[key] === undefined) {
			  this.onObj[key] = [];
			}

			this.onObj[key].push(fn);
		  },
		  one: function(key, fn) {
			if(this.oneObj[key] === undefined) {
			  this.oneObj[key] = [];
			}

			this.oneObj[key].push(fn);
		  },
		  off: function(key) {
			this.onObj[key] = [];
			this.oneObj[key] = [];
		  },
		  trigger: function() {
			let key, args;
			if(arguments.length == 0) {
			  return false;
			}
			key = arguments[0];
			args = [].concat(Array.prototype.slice.call(arguments, 1));

			if(this.onObj[key] !== undefined
			  && this.onObj[key].length > 0) {
			  for(let i in this.onObj[key]) {
				this.onObj[key][i].apply(null, args);
			  }
			}
			if(this.oneObj[key] !== undefined
			  && this.oneObj[key].length > 0) {
			  for(let i in this.oneObj[key]) {
				this.oneObj[key][i].apply(null, args);
				this.oneObj[key][i] = undefined;
			  }
			  this.oneObj[key] = [];
			}
		  }
		};

		export default eventProxy;
	```

## [1,2,3].map(parseInt)

+ parseInt() 函数可解析一个字符串，并返回一个整数。
	- string 要被解析的字符串。
	- radix 转化的进制数

+ array.map(function(currentValue, index,arr){}, thisValue)
	- currentValue 当前元素的值
	- index 当前元素的索引值
	- arr 当前元素属于的数组对象
	- thisValue 对象作为该执行回调时使用，传递给函数，用作 "this" 的值。如果省略了 thisValue ，"this" 的值为 "undefined"

``` bash
var parseInt = function(string, radix, obj) {
    return string + "-" + radix + "-" + obj;
};

["1", "2", "3"].map(parseInt);
// ["1-0-1,2,3", "2-1-1,2,3", "3-2-1,2,3"]
// "-" + obj 导致obj调用toString()方法自动转换为了string,相当于连接符
// 第1次遍历：1 + "-" + 0 + "-" + [1,2,3]="1-0-1,2,3"

//toString()还有以下几种特殊情况
[{a:1},{b:2}].toString()//"[object Object],[object Object]"
[1,2].toString()//"1,2"
[[1,2],[3,4]].toString()//"1,2,3,4"
```

我们还需要了解进制数的相关知识：

二进制的定义：用0和1两个数码来表示的数。

三进制的定义：用0和1，2三个数码来表示的数......

十进制的定义：用0和1，2，3...9十个数码来表示的数。

``` bash
//以2为基数，
parseInt('1', 2)//1
parseInt('2', 2)//NaN
parseInt('3', 2)//NaN
parseInt('10',2)//2
//以3为基数，
parseInt('1', 3)//1
parseInt('2', 3)//2
parseInt('3', 3)//NaN
parseInt('10',3)//3
//以4为基数，
parseInt('1', 4)//1
parseInt('2', 4)//2
parseInt('3', 4)//3
parseInt('4', 4)//NaN
parseInt('10',4)//4

['1','2','3'].map(parseInt)
//  parseInt('1', 0) -> 1   // radix=0,以10为基数解析 1*10^1+0*10^0=10
//  parseInt('2', 1) -> NaN // radix=1<2,返回NaN
//  parseInt('3', 2) -> NaN // 3无法转成二进制
//即遍历后结果为 [1,NaN,NaN]

[1,2,3,4,3,4,6,8,9, 99, 888].map(parseInt)
// [1, NaN, NaN, NaN, 3, 4, NaN, NaN, NaN, NaN, 888]
```

::: tip 
我们可以这样理解，二进制里没有2，3，...9,三进制里没有3，4...9,四进制里没有4，5...9
即当string无法转成radix基数时会返回NaN
:::


+ [juejin.im](//juejin.im/post/5b7298de51882561126f0389)
+ [taobaofed.org](//taobaofed.org/blog/2016/11/17/react-components-communication/)