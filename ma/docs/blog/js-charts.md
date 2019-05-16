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