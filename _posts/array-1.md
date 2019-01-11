---
title: array 数组整理
date: 2017-02-14 10:56:36
tags:
---

javascript 数组对象是一个用于构造数组的全局对象；它们是高级的，列表式的对象

数组是类似列表的对象，在原型中提供了遍历以及改变其中元素的很多方法。 数组的长度及其中元素的类型都是不固定的。因为数组的长度可读可写，有时数组中的元素也不是在连续的位置，所以JavaScript 数组不一定是密集的。通常情况下，这是一些方便的特性；如果这些特性不适用于你的特定使用场景，你可以考虑使用固定类型数组。


<!-- more -->

### 创建一个数组

```
var fruits = ["Apple","Banana"];
console.log(fruits.length)
// 2
```

### 通过索引访问数组元素

```
var first = fruits[0];
// Apple

var last = fruits[fruits.length-1]
// Banana
```

### 遍历一个数组

```
fruits.forEach(function(item,index,array){
console.log(item,index)
})
```

使用forEach() 函数可对数组中每个元素调用指定函数

返回值 currentValue（数组中正在处理的当前元素）

返回值 index（数组中正在处理的当前元素的索引）

返回值 array（被应用到的数组）

```
function logArrayElements(el,index,array){
console.log('a['+index+']='+el)
}

// 当数组元素不存在的时候，不会读取
[2,5,,9].forEach(logArrayElements)
// a[0] = 2
// a[1] = 5
// a[3] = 9
```

```
function Counter(){
this.sum = 0;
this.count = 0
}
// 使用 prototype 属性来向对象添加属性：
Counter.prototype.add = function(array){
array.forEach(function(entry){
this.sum += entry
++this.count;
},this)
// 对象作为该执行回调时使用，去掉this 就会报错
}
var object= new Counter()
obj.add([2,5,9])
obj.count 
// 3
obj.sum
// 16 

var words = ['one', 'two', 'three', 'four'];
words.forEach(function(word) {
  console.log(word);
  if (word === 'two') { 
   // 循环到 two的时候index下表是1
    words.shift();
   // shift() 函数把数组第一个元素删除并返回删除元素
   // pop() 函数删除并返回数组的最后一个元素
  }
   // 这样数组就变成了['two', 'three', 'four'] 下表依次0，1，2
   // 所以下表会从2开始，返回four
});
// one
// two
// four
```

IE兼容写法

```
if(!Array.prototype.forEach){
Array.prototype.forEach = function(callback){
var T,k;
if(this==null){
throw new TypeError('this is null or not default')
}
var O = Object(this)
var len = O.length >>> 0;
if(typeof callback !== 'function'){
throw new TypeError(callback + 'is not a function')
}
if(arguments.length > 1){
T = arguments[1]
}
k = 0;
while(k<len){
var kvalue;
if(k in O){
kValue = O[k]
callback.call(T,kValue,k,O)
}
k++;
}
}
}
```


# javascript 数组方法对比

* javascript 提供了多种新增，移除，替换数组元素的方法，但是有些会影响原来的数组；有的则不会，他是新建了一个数组

## 新增：影响原数组

### 添加元素倒数组的末尾

```
var newLength = fruits.push("Orange")
// 返回插入的当前元素 Orange
console.log(fruits)
// ["Apple", "Banana", "Orange"]
```

### 添加数组首位的元素

```
var newLength = fruits.unshift("strawberry")
// 返回插入的当前元素 strawberry
console.log(newLength)
// ["strawberry","Apple", "Banana"]
```

## 新增：不影响原数组

```
 使用 array.concat('参数')
 let muArr = ['a','b','c','d','e']
 let muArr2 = muArr.concat('f')
 console.log(muArr2)
 ["a", "b", "c", "d", "e", "f"]
 console.log(muArr)
 ["a", "b", "c", "d", "e"]
 使用js的展开操作符，三个点...(展开操作符恢复至原来的数组，从原来数组取出所有元素，然后存入新的环境)
 let muArr = ['a','b','c','d','e']
 添加元素倒数组的末尾
 let muArr2 = [...muArr,'f']
 console.log(muArr2)
 ["a", "b", "c", "d", "e", "f"]
 console.log(muArr)
 ["a", "b", "c", "d", "e"]
 let muArr2 = ['z',...muArr]
 添加数组首位的元素
 console.log(muArr2)
 ["z","a", "b", "c", "d", "e"]
 console.log(muArr)
 ["a", "b", "c", "d", "e"]
```

### 删除数组末尾的元素

```
var last = fruits.pop()
// 返回被删除的当前元素 Orange
console.log(fruits)
// ["Apple", "Banana"]
```

### 删除数组首位的元素

```
var first = fruits.shift()
// 返回被删除元素 Apple
console.log(fruits)
// ["Banana"]
```

### 找到每个元素在数组中的索引

```
var pos = fruits.indexOf("bannan")
// 1
```

### 通过索引删除/添加某个元素 ； 替换：影响原数组

```
Array.splice(index,howmany,item1,.....,itemX)
index 整数，规定添加、删除项目的位置
howmany 要删除的项目数量，如果设置0，则不会删除项目
item1,...item2 向数组添加的新项目
var arr = [1,2,3,4,5]
console.log(arr)
// 1,2,3,4,5
arr.splice(2,0,'6') // [] 空数组
console.log(arr)
// 1,2,3,4,5,6
arr.splice(2,1,'6')
// 1,2,6,4,5
arr.splice(2,3,'7')
// 1,2,7
arr.splice(2,3,'7','8')
// 1,2,7,8
```

### 替换：不影响原数组

```
 array.map()
 const arr = ['1','2','3','4','5']
 const arr2 = arr.map(item =>{
 if(item === '2'){
 item='22'
 }
 return item
 })
 console.log(arr2)
 ['1','22','3','4','5']
 是个强力方法，可以用于转换数据，而不污染原先的数据源
 const origArr = ['a', 'b', 'c', 'd', 'e'];  
 const transformedArr = origArr.map(n => n + 'Hi!'); // ['aHi!', 'bHi!', 'cHi!', 'dHi!', 'eHi!']  
 console.log(origArr); // ['a', 'b', 'c', 'd', 'e']; // 原数组毫发无损
```

### 复制(拷贝)一个数组

* Array.slice() // 从已有的数组中返回选定的元素
   *  arrayObject.slice(start,end) 
   *  start 开始位置
   *  end 结束位置
* ... 展开操作符
* Array.concat() // 用于连接两个或多个数组
   * arrayObject.concat(array1,array2)
   * array1 可以使具体的值，或者是数组 

```
var fruits = [1,2,3,4,5]
var shallCopy = fruits.slice()
console.log(shallCopy)
// 1,2,3,4,5
或
var shallCopy = [...fruits]
console.log(shallCopy)
// 1,2,3,4,5
或
var shallCopy = fruits.concat()
console.log(shallCopy)
// 1,2,3,4,5
```

### 移除：不影响原数组

```
 array.filter() 方法使用指定的函数测试所有元素，并创建一个包含所有通过测试的元素的新数组。
 const arr = ['1','2','3','4','5']
 arr.filter(a => a !== '2')
 ['1','3','4','5']
```

### 移除：影响原数组

```
 使用 array.pop() array.shift() array.splice()
 let muArr = ['a','b','c','d','e']
 移除尾部的元素
 let muArr2 = muArr.pop()
 console.log(muArr2)
 e // 获取移除的元素 （返回被移除的元素==尾部）
 console.log(muArr)
 ['a','b','c','d'] //返回移除的元素后的新数组
 let muArr =['a','b','c','d','e']
 移除首部的元素
 let muArr2 = muArr.shift()
 console.log(muArr2)
 a // 获取移除的元素 （返回被移除的元素==首部）
 console.log(muArr)
 ["b", "c", "d", "e"]
 splice(规定添加/删除项目的位置，要删除的数量设置为0则不会删除，向数组添加的新项目) 方法向/从数组中添加/删除项目，然后返回被删除的项目--该方法会改变原始数组
 var arr = []
 arr[0] = "A"
 arr[1] = "B"
 arr[2] = "C"
 arr[3] = "D"
 console.log(arr)
 ['A','B','C','D']
 arr.splice(2,0,"E")
 console.log(arr)
 ['A','B','E','C','D']
 arr.splice(0,2)
 ['A','B']
 并添加一个新元素来替代被删除的元素
 arr.splice(2,1,"E")
 console.log(arr)
 ['A','B','E','D']
 slice(开始选取，结束选取) 方法可从已有的数组中返回选定的元素。
 如果 end 未被规定，那么 slice() 方法会选取从 start 到数组结尾的所有元素。
 var arr = []
 arr[0] = '1'
 arr[1] = '2'
 arr[3] = '3'
 arr.slice(1)
 ['2','3']
 arr.slice(1,2)
 ['3']
```