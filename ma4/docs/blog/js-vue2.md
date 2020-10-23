---
title: '马记'
description: 'ES6 解构赋值、instanceof类型检测、== 与 === 你真的明白吗、navigator.sendBeacon'
time: '2049-03-29'
prev: ''
next: ''
tags:
    - 'javascript'
    - 'html'
    - 'css'
---

qqqqq js-vue2


``` js
const form = document.forms[0];

form.addEventListener("submit", function(event) {
  event.preventDefault();
  const { name, description, task } = this.elements;
  // or
  // const { name, description, task } = event.target.elements;
  console.log(name.value, description.value, task.value);
});

```
