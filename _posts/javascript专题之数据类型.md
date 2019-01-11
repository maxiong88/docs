---
title: javascript专题之数据类型
date: 2017-12-19 14:43:13
tags: javascript专题
---

isPlainObject  `是否是纯(普通)对象`

之所以要判断是不是 plainObject，是为了跟其他的 JavaScript对象如 null，数组，宿主对象（documents）等作区分，因为这些用 typeof 都会返回object。










参考lodash 
    
    isPlainObject

    检测这个·value·是不是一个普通对象，
    是由创建对象或者
    是他的__proto__指向null















    


















参考 https://github.com/mqyqingfeng/Blog/issues/30