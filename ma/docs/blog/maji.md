---
title: '马记'
description: 'ES6 解构赋值'
sidebar: 'auto'
time: '2019-03-29'
prev: ''
next: ''
---

## ES6 解构赋值

开篇说一下原因,看下面代码

```js
let {
	token,
	login_mobile,
	submit_entry,
	carid,
	cityid,
	ciyt_id,
	m,
	site_longitude,
	site_latitude,
	site_id,
	gps_type
} = this.query;
cityid = cityid || ciyt_id;
site_longitude = site_longitude == 'undefined' ? 0 : site_longitude;
site_latitude = site_latitude == 'undefined' ? 0 : site_latitude;
site_id = site_id == 'undefined' ? 0 : site_id;
gps_type = gps_type == 'undefined' ? 1 : gps_type;
login_mobile = login_mobile || m;
login_mobile = login_mobile == 'undefined' ? '' : !login_mobile ? '' : login_mobile;
token = token == 'undefined' ? '' : !token ? '' : token;
submit_entry = submit_entry == 'undefined' ? '' : !submit_entry ? '' : submit_entry;
```

上面的代码`this.query`这个对象用到了对象的解构赋值，但是我们下面那部分做的判断纯属多余，加小白

我们先来看看babel怎么转义的

``` js
let {ma,xiong,maxiong = 11} = deconst; 

// babel 

"use strict";

var _deconst = deconst,
    ma = _deconst.ma,
    xiong = _deconst.xiong,
    _deconst$maxiong = _deconst.maxiong,
    maxiong = _deconst$maxiong === undefined ? 11 : _deconst$maxiong;
```

+ 解构赋值要求等号右边是一个对象

``` js
let { x, y, ...z } = null; // 运行时错误
let { x, y, ...z } = undefined; // 运行时错误
```

+ 解构赋值必须是最后一个参数，否则会报错。

``` js
let { ...x, y, z } = someObject; // 句法错误
let { x, ...y, ...z } = someObject; // 句法错误
// VM1878:3 Uncaught SyntaxError: Rest element must be last element
```

+ 对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量。真正被赋值的是后者，而不是前者。

``` js
let { foo: baz } = { foo: "aaa", bar: "bbb" };
baz // "aaa"
foo // error: foo is not defined
```

+ 对象的解构也可以指定默认值。

``` js
var {x = 3} = {};
x // 3

var {x, y = 5} = {x: 1};
x // 1
y // 5

var {x: y = 3} = {};
y // 3

var {x: y = 3} = {x: 5};
y // 5

var { message: msg = 'Something went wrong' } = {};
msg // "Something went wrong"
```
+ 默认值生效的条件是，对象的属性值严格等于`undefined`。

``` js
var {x = 3} = {x: undefined};
x // 3

var {x = 3} = {x: null};
x // null
```

上面代码中，属性x等于null，因为null与undefined不严格相等，所以是个有效的赋值，导致默认值3不会生效。

如果解构失败，变量的值等于undefined。

最初的问题可以修改为

``` js
let {
	token = '',
	login_mobile = 0,
	submit_entry = '',
	carid = 0,
	cityid = 0,
	ciyt_id = 0,
	m = 0,
	site_longitude = 0,
	site_latitude = 0,
	site_id = 0,
	gps_type = 1
} = this.query;
cityid = cityid || ciyt_id;
login_mobile = login_mobile || m;
```