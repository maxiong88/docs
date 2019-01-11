---
title: vue 生命周期
date: 2017-03-30 17:57:29
tags: vue
---


每个Vue 实例在被创建之前都要经过一系列的初始化过程。

vue 生命周期就是: vue实例从创建到销毁的过程

例如：实例需要配置数据观测(data observer)、编译模版、挂载实例到DOM，然后在数据变化时更新DOM。

在这过程中，实例也会调用一些生命周期钩子，这就给我们提供了执行自定义逻辑的机会

<!-- more -->

![生命周期图（转载）](http://www.58lih.com/css/images/6e69817f1e18ae5389320cc5c00641b4.jpg)


#### Vue生命周期例子

所有的生命周期钩子自动绑定this上下文到实例中，因此你可以访问数据，对属性和方法进行运算

这意味着你不能使用箭头函数来定义一个生命周期方法。因为箭头函数绑定了父上下文，

因此this与你期待的vue实例不同，this.fetchTodos（派发待办事项）的行为未定义

```
<div id="aa">{{a}}</div>	

var myvue = new Vue({
	el : "#aa",
	data : {
		
		a : "我是data数据"

	},

	computed : {

		a1 : function () {

			return '我是计算属性'	

		}

	},
	// 在实例初始化之后 ，数据观测(data observer) 和event/watcher事件配置之前被调用
	beforeCreate () {
		
		console.log(this)  // this 指向vue实例
		
		console.log(this.$el)  // Vue实例使用的跟DOM元素  返回underfined

		console.log(this.$data) // vue实例观察的数据对象。vue实例代理了对其data对象属性的访问 返回underfined

		console.log(this.a) // 获取data对象上的属性 返回underfined

		console.log(this.a1) // 获取计算属性值 返回undefined
	
	},
	// 实例已经创建完成之后被调用 。在这一步，实例已完成以下配置：数据观测(data observer),属性和方法的运算，watch/event事件回调。然而，挂在阶段还没有开始，$el属性目前不可见
	created () {

		console.log(this)  // this 指向vue实例
		
		console.log(this.$el)  // Vue实例使用的跟DOM元素  返回underfined

		console.log(this.$data) // vue实例观察的数据对象。vue实例代理了对其data对象属性的访问 返回 object

		console.log(this.a) // 获取data对象上的属性 返回 "我是data数据"

		console.log(this.a1) // 获取计算属性值 返回 "我是计算属性"

	},
	// 在挂载开始之前被调用；相关的render函数首次被调用。（该钩子在服务器段渲染期间不被调用）
	beforeMount () {
	
		console.log(this)  // this 指向vue实例
		
		console.log(this.$el)  // Vue实例使用的跟DOM元素  返回  <div id="aa">{{a}}</div>
						
								// 我们发现el还是{{a}} 这里就是应用的virtual DOM(虚拟DOM)技术，先把坑占住了，到后面mounted挂载的时候再把值渲染进去

		console.log(this.$data) // vue实例观察的数据对象。vue实例代理了对其data对象属性的访问 返回 object

		console.log(this.a) // 获取data对象上的属性 返回 "我是data数据"

		console.log(this.a1) // 获取计算属性值 返回 "我是计算属性"		
		
	},
	// el 被新创建的vm.$el替换，并挂载到实例上去之后调用该钩子。如果root实例挂载了一个文档内元素，当mounted被调用时vm.$el也在文档内。（该钩子在服务器段渲染期间不被调用）
	mounted () {

		console.log(this)  // this 指向vue实例
		
		console.log(this.$el)  // Vue实例使用的跟DOM元素  返回 "<div id="Index"></div>"

		console.log(this.$data) // vue实例观察的数据对象。vue实例代理了对其data对象属性的访问 返回 object

		console.log(this.a) // 获取data对象上的属性 返回 "我是data数据"

		console.log(this.a1) // 获取计算属性值 返回 "我是计算属性"	
			
	},
	// 数据更新是调用，发生在虚拟DOM重新渲染和打补丁之前。你可以在这个钩子中进一步地更改状态，这不会触发附加的重渲染过程。（该钩子在服务器段渲染期间不被调用）
	beforeUpdate () {

	

	},
	// 由于数据更改导致的虚拟DOM重新渲染和打补丁，在这之后回调用该钩子。
	// 当这个钩子被调用时，组件DOM已经更新，所以你现在可以执行依赖与DOM的操作。
	// 然而在大多数情况下，你应该避免在此期间更改状态，因为这可能会导致更新无限循环。
	updated () {

	

	},
	// 实例销毁之前调用。在这一步实例仍然完全可用
	beforeDestroy () {

	

	},
	// Vue 实例销毁后调用，调用后vue实例指示的所有东西都会解绑定，所有的事件监听会被移除，所有的子实例也会被销毁
	destroyed () {

	

	}
	
})


```

![vue生命周期](http://www.58lih.com/css/images/QQ20170330151655.png)
![vue生命周期](http://www.58lih.com/css/images/QQ20170330151708.png)




#### 1.1.1 vue实例的data对象

	* 介绍：

vue实例的数据对象。vue将会递归将data的属性转换为getter/setter，从而让data的属性能够响应数据变化。`对象必须是纯粹的对象（含有0个或者多个key/value对）`；浏览器API创建的原生对象，原型上的属性会被忽略。大概来说，data应该只能是数据-不推荐观察拥有状态行为的对象。

一旦观察过，不需要再次在数据对象上添加响应式属性。因此推荐在创建实力之前，就声明所有的根级响应式属性。

实力创建之后，可以通过vm.$data访问原始数据。vue实力也代理了data对象上所有的属性。因此访问vm.a等价于访问vm.$data.a.

以_或$开头的属性不会被vue实例代理，因此它们可能和vue内置的属性、API方法冲突。你可以使用例如vm.$data._property的方式访问这些属性。

当一个组件被定义，data必须声明为返回一个初始数据对象的函数，因为组件可能被用来创建多个实例。如果data仍然是一个纯粹的对象，则所有的实例共享引用同一个数据对象！通过提供data函数，每次创建一个新实例后，我们能够调用data函数，从而返回初始数据的一个全新副本数据对象。

如果需要，可以通过将vm.$data传入JSON.pares(JSON.stringify(...))得到深拷贝的原始数据对象。

注意：`不应该对data属性使用箭头函数`。箭头函数绑定了父级作用域的上下文，所以this将不会按照期望指向Vue实例，将是underfined

注意：`什么时候data是字面量对象（实例化），什么时候是函数对象（组件中）`


	* 类型

Object | Function


	* 限制

组件的定义只接受function
























此文档部分转载 http://www.zhimengzhe.com/Javascriptjiaocheng/236707.html