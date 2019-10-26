---
title: react-redux原理
description: 'react-redux原理'
sidebar: 'auto'
time: '2018-12-31'
prev: ''
next: ''
---



流程

	=> dispatch(action) 开始分发action
	
		=> 同步方式调用store的reduce函数，返回值会被作为下一个state
		
			=> 通过Provider 的componentDidUpdate来触发监听器subscribe方法
			
				=> 判断当前state与上一次的state是否一致，不一致就setState，一致返回null



![js-react-redux.png](../.vuepress/public/assets/img/js-react-redux.png)