---
title: javascript 深度克隆
description: '主要讲的是object, array, number, boolean, string, date, regexp。'
sidebar: 'auto'
time: '2015-01-01'
prev: './js-modal'
next: './js-mp2'
---

# javascript 深度克隆

我们直接来看代码 主要就是用到了遍历

``` js{2,4,8,17}
function _clone(value, refFrom, refTo){
    var copy = function copy(copiedValue){
        for(var key in value){
            copiedValue[key] = _clone(value[key])
        }
        return copiedValue;
    }
    // object, array, number, boolean, string, date, regexp
    switch(Object.prototype.toString.call(value).slice(8, -1)){
        case 'Object' : return copy({});
        case 'Array' : return copy([]);
        case 'Date' : return new Date(value.valueOf());
        case 'RegExp' : return _cloneRegExp(value);
        default : return value;
    }
}
function _cloneRegExp(pattern){
    return new RegExp(pattern.source, 
        (pattern.global ? 'g' : '') + 
        (pattern.ignoreCase ? 'i' : '') +
        (pattern.multiline ? 'm' : '')
    );
}
```

## 课外

::: tip 
推荐实际项目中使用lodash库，封装类型很全
:::

::: tip 对于 是一种以键-值对形式存储数据的数据结构 我们可以使用,但是函数除外
JSON.parse(JSON.stringify())
:::




