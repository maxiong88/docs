---
title: 'js number'
description: '数字格式化、小数乘除加减、科学计数法、进制换算'
sidebar: 'auto'
time: '2018-01-02'
prev: './js-math'
next: './js-debounce-throttle'
tag: 'js number方法'
---


## 数字格式化

### NumberFormat

Intl.NumberFormat 是对语言敏感的格式化数字类的构造器类

语法：
new Intl.NumberFormat(locales,options)
Intl.NumberFormat.call(this,locales,options)

locales 包含一种或多种语言或区域设置标记的区域设置字符串数组 https://tools.ietf.org/html/rfc5646#appendix-A

options 包含一些或所有的下面属性的类: {}

`minimumIntegerDigits` : 使用的整数数字的最小数目.可能的值是从1到21,默认值是1.
`minimumFractionDigits` : 使用的小数位数的最小数目.可能的值是从0到20;如果列表中没有提供则值为2
`maximumFractionDigits` : 使用的小数位数的最大数目。可能的值是从0到20;纯数字格式的默认值是minimumfractiondigits和3中大的那一个；货币格式默认值是minimumfractiondigits和国际标准化组织列表(如果列表中没有提供则值为2)中大的那一个;百分比格式默认值是minimumfractiondigits和0中大的那一个。

`minimumSignificantDigits` : 使用的有效数字的最小数目。可能的值是从1到21；默认值是1。
`maximumSignificantDigits` : 使用的有效数字的最大数量。可能的值是从1到21；默认是minimumsignificantdigits.

::: tip 
下面的属性分为两组：minimumintegerdigits,minimumfractiondigits,maximumfractiondigits作为一组,
minimumsignificantdigits和maximumsignificantdigits作为一组.如果定义了第二组中的任意一个属性,
则忽略第一组的设置.
:::

例子：
``` js
var number = 3500;
console.log(new Intl.NumberFormat().format(number)); // 3,500
```

兼容性：
不好

衍生：
Number.prototype.toLocalString(locales,options)

### 普通js实现

数字精度

``` js
/**
@ value 需要处理的值
@ precision 精准度
@ isRoundUp 是否需要四舍五入
*/
function doPrecision(value, precision, isRoundUp){
    // 指数格式化，通过精准度与指数，将value变成乘以10的N次方的倍数的值
    const exponentialForm = Number(`${value}e${precision}`);
    // 如果需要四舍五入 通过 Math.round函数处理 ，否则使用floor函数向下取整（不会四舍五入）
    const rounded = isRoundUp ? Math.round(exponentialForm) : Math.floor(exponentialForm);
    // 指数格式化 通过精准度与指数，将value变成除以10的N次方的倍数的值
    return Number(`${round}e-${precision}`).toFixed(precision);
}
```

金额千分符

``` js
/**
@ value 处理的值
@ hasSeparator  数字是否有千位分隔符
@ separator 数字千分符符号
*/
function doFormat(value, hasSeparator, separator){
    if(!hasSeparator){
        return value;
    }
    // 数字部分
    const numberParts = value.split('.');
    // 整数部分
    const integerValue = numberParts[0];
    // 小数部分
    const decimalValue = numberParts[1];
    // 格式化赋值
    const formateValue = formatValueByGapStep(3, integerValue, separator, 'right', 0, 1);
    return `${formateValue.value}.${decimalValue}`
}
/**
@ step 分隔几位数字
@ value 处理的value
@ gap 分隔符
@ direction 开始位置
@ range 光标位置
@ isAdd 
@ oldValue 整数部分
*/
function formatValueByGapStep(step, value, gap = '', direction = 'right', range, isAdd = 1, oldValue = ''){
    if(value.length === 0){
        return {value,range}
    }
    // 把字符串分割成字符串数组
    const arr = value && value.split('');
    let _range = range;
    let showValue = '';

    if(dircetion === 'right'){
        // 格式化是从右边开始
        for(let j = arr.length-1,k = 0;j>=0;j--,k++){
            const m = arr[j];
            // 当前初始变量的值 必须是step的倍数
            showValue = k > 0 && k % step === 0 ? m + gap + showValue : m + '' + showValue;
        } 
    }else{
		arr.some((n, i) => {
			showValue = i > 0 && i % step === 0 ? showValue + gap + n : showValue + '' + n
		})
    }
    return {value: showValue, range: _range}
}
```

### 手动输入 格式化

。。。 持续