---
title: '笔记'
description: ''
sidebar: 'auto'
time: '2000-01-01'
prev: ''
next: ''
---

## new操作符


+ `new` 是一个与构造函数一起用来创建对象的运算符。
	- 运算符：对操作数进行操作
+ `new`运算符 只操作一种操作数，那就是函数调用
	- 如何操作
+ 首先，我创建一个新对象。人人都以为这是构造函数做的，但实际上是我做的。
+ 接下来，我调用构造函数，并确保在构造函数的函数体内，关键字this指向了我创建的新对象。 
	- 为何要这么做
+ 让构造函数中的语句能够引用这个对象。毕 竟，给这个对象添加属性和方法才是构造函数的全 部意义所在
+ 接下来，我确保从构造函数返回创建的新对 象。这提供了极大的便利，让开发人员不用显式地返 回它。
+ 我和对象字面量交情匪浅。这个家伙很了不 起，需要快速创建对象时，我也会毫不犹豫地使用 它。但需要创建大量类似的对象，确保对象能够利用 代码重用，需要确保对象一致以及支持一些高级对象 用法时，就要用到我了



要明白如何 使用我，必须先明白对象的工作原理、函数的工作原 理、this的工作原理等。只有掌握了大量的知识后， 你才会考虑了解我！


构造函数的工作原理

要明白构造函数工作原理，关键在于了解运算符new都做了些什么？

``` js
function Test(name) {
  this.name = name
}
Test.prototype.sayName = function () {
    console.log(this.name)
}
const t = new Test('yck')

// 以下是conosle.log(t)输出
Test {
    name: "yck"
    __proto__:{
        sayName: ƒ ()
        constructor: ƒ Test(name)
            arguments: null
            caller: null
            length: 1
            name: "Test"
            prototype: {sayName: ƒ, constructor: ƒ}
            __proto__: ƒ ()
            [[FunctionLocation]]: VM4610:1
            [[Scopes]]: Scopes[2]
        __proto__: Object
    }
}
```

我们来跟踪一下其执行过程。

+ new 首先创建一个新的空对象
+ 接下来，new设置this，使其指向这个新对象
	- 这个this存储了一个引用，指向代码当前处理的对象
+ 设置this后，调用函数Test，并将yck当作实参传递给它
+ 接下来，执行这个函数代码，与大多数构造函数一样，Test给新创建的this对象的属性赋值
+ 最后，Test函数执行完毕后，运算符new返回this--指向新创建的对象的引用。请注意，它会自动为你返回this，你无需在代码中显式地返回。指向新对象的引用被返回后，我们将其赋给变量t

从上面一个例子中我们可以得出这些结论：

+ `new` 通过构造函数 `Test` 创建出来的实例可以访问到构造函数中的属性
+ `new` 通过构造函数 `Test` 创建出来的实例可以访问到构造函数原型链中的属性，也就是说通过 `new` 操作符，实例与构造函数通过原型链连接了起来

关于构造函数返回值的问题：

+ 构造函数会默认返回this，也就是新的实例对象
+ 普通函数如果没有return值的话，返回undefined
+ return的是五种简单数据类型：String,Number,Boolean,Null,Undefined的话，构造函数会忽略return的值，依然返回this对象
+ 如果return的是引用类型：Array,Date,Object,Function,RegExp,Error的话，构造函数和普通函数都会返回return后面的值,构造函数的原型不被使用

`Object.create(prototype/null)`返回值是一个新对象，带着指定的原型对象和属性。

`Object.setPrototypeOf({},prototype/null)`设置一个指定的对象的原型 ( 即, 内部[[Prototype]]属性）到另一个对象或  null。

原理

+ new 操作符会返回一个新对象，所以我们需要在内部创建一个对象
+ 这个对象可以访问构造函数上的任意属性,可以访问到构造函数原型上的属性，所以需要将对象与构造函数链接起来
+ 返回原始值需要忽略，返回对象需要正常处理

回顾了这些作用，我们就可以着手来实现功能了

```js
function create(Con, ...args) {
//   let obj = {};
//   Object.setPrototypeOf(obj, Con.prototype)
    let obj = Object.create(Con.prototype)
    let result = Con.apply(obj, args)
    return result instanceof Object ? result : obj
}
```


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


## throttle debounced

::: tip 防抖和节流的作用都是防止函数多次调用。

区别在于，
假设一个用户一直触发这个函数，
且每次触发函数的间隔小于wait，
防抖的情况下不会触发并从新计算wait时间，直到空闲时间大于await，
节流函数上次执行函数时间 空闲大于await就会执行。

:::

### throttle 节流

+ 在特定间隔内调用函数
+ 节流是使重复事件发生率的降低
+ 适用于在调整大小和滚动等事件上限制处理程序执行速率

``` js

function throttle(func, timeout) {
    let ready = true;
    return (...args) => {
        if (!ready) {
            return;
        }

        ready = false;
        func(...args);
        setTimeout(() => {
            ready = true;
        }, timeout);
    };
}

```

### debounced 去抖

+ 在一定时间内仅调用一次函数
+ 去抖可确保为可能发生多次的事件恰好发生一次

``` js

function debounce(func, timeout) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func(...args);
        }, timeout);
    };
}

```

## js 克隆

只针对  object number string boolean date function

```js

_clone(value, [], [], true)

function _cloneRegExp(pattern){
    return new RegExp(pattern.source, 
        (pattern.global ? 'g' : '') + 
        (pattern.ignoreCase ? 'i' : '') +
        (pattern.multiline ? 'm' : '') +
		(pattern.sticky ? 'y' : '') +
		(pattern.unicode ? 'u' : '')
    );
}
/**
  *复制一个对象。
  *
  * @私人的
  * @param {*} value要复制的值
  * @param {Array} refFrom包含源引用的数组
  * @param {Array} refTo包含复制的源引用的数组
  * @param {Boolean} deep是否执行深度克隆。
  * @return {*}复制的值。
*/
function _clone(value, refFrom, refTo, deep){
	var copy = function copy(copiedValue){
		var len = refFrom.length;
		var idx = 0;
		while(idx < len){
			if(value === refFrom[idx]){
				return refTo[idx]
			}
			idx += 1
		}
		refFrom[idx + 1] = value;
		refTo[idx + 1] = copiedValue;
		for(var key in value){
			copiedValue[key] = deep ? _clone(value[key], refFrom, refTo, true) : value[key]
		}
		return copiedValue;
		
	}
	switch(Object.prototype.toString.call(value).slice(8, -1)){
		case 'Object' : return copy({});
		case 'Array' : return copy([]);
		case 'Date' : return new Date(value.valueOf());
		case 'RegExp' : return _cloneRegExp(value);
		default : return value;
	}
}

```


## 手写bind

[规范](//tc39.github.io/ecma262/#sec-function.prototype.bind)

+ 让 目标 成为this
+ 是否是一个包含[[call]]内部方法的有效函数，如果不是`TypeError` [1]
+ args 是一个新的集合，它是由除thisArg以外所有参数组成 [2]
+ 创建一个 包装函数 [3]
+ return 包装函数

``` js
// https://tc39.github.io/ecma262/#sec-function.prototype.bind
module.exports = Function.bind || function bind(that){
	var $this = this;
	if(typeof $this !== 'function'){ // [1]
		throw TypeError(string($this) + 'is not function');
	}
	var partArgs = [].slice.call(arguments, 1); // [2]
	var boundFunction = function(){ // [3]
		var args = partArgs.concat(arguments); // 合并参数
		// 1 this 是不是boundFunction 的实例 说明返回的boundFunction被当做new的构造函数调用
		return $this instanceof boundFunction ?
			construct($this, args.length, args)
			// new $this(args.join())
			: 
			$this.apply(that, args);
	}
	if($this.prototype){
		// 维护原型，不然无法访问原型内方法
		boundFunction.prototype = $this.prototype
	}
	return boundFunction;
}
var factories = {};
function construct(C, argsLength, args){
	if(!(argsLength in factories)){
		for (var list = [], i = 0; i < argsLength; i++) list[i] = 'a[' + i + ']';
		factories[argsLength] = Function('C,a', 'return new C(' + list.join(',') + ')');
		return factories[argsLength](C, args);
	}
}
```

实际环境中还是需要`lodashjs`库




+ [jquery-throttle-debounce-plugin](//benalman.com/projects/jquery-throttle-debounce-plugin/)
+ [throttle-debounce](//github.com/niksy/throttle-debounce)
+ [juejin.im](//juejin.im/post/5b7298de51882561126f0389)
+ [taobaofed.org](//taobaofed.org/blog/2016/11/17/react-components-communication/)