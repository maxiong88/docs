---
title: 'Echarts 遇到的问题（持续）'
description: '总结一下'
sidebar: 'auto'
time: '2019-05-01'
prev: ''
next: ''
---

## 反向坐标轴

项目中如果y轴作为 类目轴时，默认顺序是从下往上布局，从而看到的数据是第一个是在最下面，想要修改这样的局面
让类目轴 从上到下排列：
``` js
yAxis:{
	inverse: true, // 默认 false
}
```

## 最小值不是从0开始的

``` js
series.data = series.data.map((item) => {
	return item + min
})

```

## y轴是类目轴，x轴是数值轴, x轴如何实现向类目轴那样的 坐标轴分割间隔

用 formatter，不要的值返回空字符串

``` js
axisLabel:{
	formatter:function(value, index){
		// 刻度标签的内容格式器，支持字符串模板和回调函数两种形式。
		if(index % 2 !== 0){
			return '';
		}
		return value;
	}
}
```

## legend的问题

如果`legend`也是通过接口实时变化的话，需要单独拿出，不然图表会一闪一闪的更新