---
title: 学习系列
description: ''
sidebar: 'auto'
time: '2015-01-10'
prev: ''
next: ''
---



## initGlobalAPI 初始化全局api


+ 通过`Object.defineProperty()`修改vue的config属性，只读不可编辑不可枚举
+ 初始化一下全局方法`util、set、delete、nextTick、observable`
+ 定义`vue.options = {}`	
+ `ASSET_TYPES`遍历值传给V.options,拼接`s`，赋值一个空对象
	- 'component'
	- 'directive'
	- 'filter'
+ `vue.options`增加新属性`_base`，值为一个基本的`vue`构造函数，内置属性`uid`自增
+ 通过`extends`方法将`KeepAlive`组件，存入`V.options.components`中
	- extends方法就是`Mix properties into target object.`{to[key] = _from[key]}
+ initExtend()
	- V.extend() 类继承
+ initAssetRegisters(V); 
	- 资产注册

## initAssetRegisters 初始化注册重要资产方法

+ (id[组件名称、过滤函数名称、指令名称],definition[组件对象配置信息、过滤callback、指令callback])

+ ASSET_TYPES 通过遍历，vue又增加了`component、directive、filter`全局属性方法（静态属性方法绑定在构造函数上面的）

	- 'component',
		+ 先校验 组件名称 `validateComponentName`
		+ 第二个参数是否是对象
			- 强制添加name属性，不存在有组件名称代替
			-`_base.extend(definition)`调用`V.extend`方法,从而将definetion变成了一个`VueComponent(options[V.options与definition对象的合并])构造函数`
	- 'directive',
		+ 第二参数重新定义为一个对象
			- bind: 原函数definition
			- update: 原函数definition
	- 'filter'

+给`V.options[components,directives,filters]`依次注入我们的全局或者局部（组件[id/VueComponent]、指令[id/{bind,update}]、过滤器）


## 注册组件

``` js
var d = Vue.component('btnc', {
	template: '<div>{{msgD}}</div>',
	data:{msgD:'dddd'}
})
```
以上面为例

+ 执行Vue.component
	- 传入参数 组件名称id，组件配置信息definition
	- 执行_base.extend(definition)
		+ 这是一个类继承
			- 通过`mergeOptions`让`definition`与`Vue.options`
				+ mergeOptions(parent, child)
					- parent Vue.options配置项{components, filters, _base, directives}
					- child 组件的配置项{template, name, data, ...}
					- strats 遍历来判断执行程序员设置的api或者生命周期是否合法
						+ 判断了如果写入组件内部的data属性值不是function将抛出错误


## 总结：

Vue会先把组件放入到`Vue.options.components`中并以组件的名称为属性，属性值是通过`Vue.options._base.extend()`方法封装为一个类Vue构造函数	
	