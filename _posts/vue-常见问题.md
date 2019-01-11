---
title: vue 常见问题
date: 2017-07-11 16:10:13
tags: vue
---

实际项目中遇到问题，github上应该也有答案，我在这里总结一下我自己的

1.部分oppo、华为手机不兼容vue-router
2.非父子组件通信，这里只说bus来通信

<!-- more -->

1.部分oppo、华为手机不兼容vue-router

`原因：是部分es6写法不支持，babel-polyfill库起到一个修补作用`

		1.cdn加载到html页面
		<script src="https://cdn.bootcss.com/babel-polyfill/6.23.0/polyfill.min.js"></script>
		测试版本 7.0.0-alpha.12
		
		2.通过 npm install --save babel-polyfill 安装
			1.在main。js里面添加import "babel-polyfill";
			2.在webpack.confg.js中引入 
				module.exports = {
				  entry: ["babel-polyfill", "./app/js"]
				};


转载：http://blog.csdn.net/qq_16559905/article/details/70238583

2.初始化bus

	```
		bus.js
		
			import vue from 'Vue'
			export default new vue({})
			
			
		a.vue
			
			<template>
				<div>
					<span @click="tongji"></span>
				</div>
			</template>
			<sctipy>
				import bus from './bus.js'			export default{
					data(){
						return {
							
						}
					},
					methods:{
					// methods 将被混入到 Vue 实例中。可以直接通过 VM 实例访问这些方法，或者在指令表达式中使用。方法中的 this 自动绑定为 Vue 实例。

						tongji(){
							var self = this;
							// 需要在methods中使用
							bus.$emit("tongjiA",arguments)
						}
					}
				}	
			</script>
			
		b.vue
		
			<template>
				<div>
					<span ></span>
				</div>
			</template>
			<sctipy>
				import bus from './bus.js'			export default{
					data(){
						return {
							
						}
					},
					created(){
					//实例已经创建完成之后被调用。在这一步，实例已完成以下的配置：数据观测(data observer)，属性和方法的运算， watch/event 事件回调。然而，挂载阶段还没开始，$el 属性目前不可见
					// 在这里使用
						var self = this;
						bus.$on("tongjiA",function(arguments){
							console.log(agruments)
						})
					},
					methods:{
						
					}
				}	
			</script>
			
	```


