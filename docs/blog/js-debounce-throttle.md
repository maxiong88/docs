---
title: 'js 防抖节流'
description: ''
sidebar: 'auto'
time: '2015-01-13'
prev: ''
next: './js-vue-observer-3'
---

::: TIP 防抖和节流的作用都是防止函数多次调用。

区别在于，
假设一个用户一直触发这个函数，
且每次触发函数的间隔小于wait，
防抖的情况下只会调用一次(并从新计算wait时间)，
而节流的 情况会每隔一定时间（参数wait）调用函数。

:::