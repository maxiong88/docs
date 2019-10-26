---
title: '微信开发中遇到的BUG'
description: ''
sidebar: 'auto'
time: '2049-03-29'
prev: ''
next: ''
---

## ios12系统的微信浏览器在软键盘收起时，页面无法回滚的bug修复

#### 虽然软键盘收起后页面回滚至底部，顶部按钮提交事件没有触发

+ 原因： 未知
+ 解决方法：
``` js
// 方法一：
element.onblur = () => {
    setTimeout(() => {
        window.document.body.scrollTop = window.document.body.scrollHeight;
    }, 0);
};
document.body.scrollTop 谷歌已废弃，使用 window.pageYOffset 或者 document.documentElement.scrollTop
// 方法二：
给body元素底部增加空白
// 方法三：
element.scrollIntoView(true)
element.scrollIntoViewIfNeeded();
该方法会导致input框置浏览器顶部或者键盘顶部，无法居中展示
```

#### 在多个输入框间切换输入，页面滚动凌乱了，页面先滚至底部又滚回至输入框在可是区域

``` js
doms.forEach((item) => {
  item.onfocus = () => {
    // 元素获取焦点时，由webview滚动元素至可是区域
    window.inputFocuseTimeout && clearTimeout(window.inputFocuseTimeout);
  };
  item.onblur = () => {
    window.inputFocuseTimeout && clearTimeout(window.inputFocuseTimeout);
    window.inputFocuseTimeout = setTimeout(() => {
      window.document.body.scrollTop = window.document.body.scrollHeight;
    }, 0);
  };
});
```

+[萍萍掘金](https://juejin.im/post/5ccf81d66fb9a03234165b85)