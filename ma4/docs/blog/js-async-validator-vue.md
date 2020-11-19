---
title: '[精]async-validator使用'
description: '怎么用与在项目中遇到的问题，Vue[版]/React[版]'
sidebar: 'auto'
time: '2019-11-01'
prev: ''
next: ''
imgPIc: '../assets/img/17.jpg'
---

``` js
// 在Vue中 ElementUI、AntDesignVue
rules:{
    [name]:[{required,trigger,type,validator}]
}
```

type设置类型以后，程序会将设置类型处理成校验规则，输入了不符合类型的值都会提示错误

``` js
// 默认类型string

```


如果required:false，type设置成除string以外的类型


``` js
import Schema from 'async-validator';
new Schema({
    v: {
    sdf:'',
    required: false,
    type:number,// 设置number类型
    message:"设置了也会被移除"
    },
}).validate(
    {
        v: 1,
    },
    {
    messages:{
        types:{
        number:"整数"
        }
    }
    },
    errors => {
    console.log(errors)
    },
);
```


``` js
// Schema 原型方法：define
// 构造函数Schema实例化会调用此函数
// 返回被格式化-数组-以后的校验规则
// 入参 ：定义的校验规则集合
define(rules) {
    if (!rules) {
        throw new Error('Cannot configure a schema with no rules');
    }
    if (typeof rules !== 'object' || Array.isArray(rules)) {
        throw new Error('Rules must be an object');
    }
    this.rules = {};
    let z;
    let item;
    for (z in rules) {
        if (rules.hasOwnProperty(z)) {
        item = rules[z];
        this.rules[z] = Array.isArray(item) ? item : [item];
        }
    }
},



// Schema 原型方法：getType
// 返回校验类型
// 入参 ：每个属性定义的校验规则
getType(rule) {
    // 正则类型
    if (rule.type === undefined && rule.pattern instanceof RegExp) {
        rule.type = 'pattern';
    }
    if (
        typeof rule.validator !== 'function' &&
        rule.type &&
        !validators.hasOwnProperty(rule.type)
    ) {
        // 如果检验方法不是函数，且存在校验类型，但是校验类型不在校验类型集合内，则抛出 不知道校验规则类型是什么
        throw new Error(format('Unknown rule type %s', rule.type));
    }
    // 返回校验类型 默认string
    return rule.type || 'string';
},

// Schema 原型方法：getValidationMethod
// 返回校验方法
// 入参 ：每个属性定义的校验规则
getValidationMethod(rule) {
    // 如果我们定义的校验规则里面存在自定义的校验方法，就是用自定义校验方法
    /*
        rules:{
            name:[{required:true,trigger:'change',validator:function(rule,value,callback){
                // 自定义校验规则
            }}]
        }
    */
    if (typeof rule.validator === 'function') {
        return rule.validator;
    }
    const keys = Object.keys(rule);
    const messageIndex = keys.indexOf('message');
    if (messageIndex !== -1) {
        keys.splice(messageIndex, 1);
    }
    // 移除我们定义的校验规则中的message以后，通过object.keys()获取校验规则中剩余属性，且key为required是唯一，如果只存在required则调用required校验方法
    if (keys.length === 1 && keys[0] === 'required') {
        return validators.required;
    }
    // 否则就使用我们定义的type类型为校验方法，type类型默认string
    return validators[this.getType(rule)] || false;
},
```


[github](https://github.com/yiminghe/async-validator)