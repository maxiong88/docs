---
---










































我们来看一下构造函数

``` js
function Vue(options){
	this._init(options)
}
```


当我们new Vue({})的时候，执行的是_init()方法，这个方法是在initMixin(Vue)这里，
执行_init方法会触发initState(this 当前实例),在这个inistate方法里面会判断如果存在data调用initData(this 当前实例),
在这个initData中有一个while循环，检测关键字(methods、proxy、$、_),

`这里有一个知识点就是charCodeAt(i)指定的位置的字符的 Unicode 编码; String.fromCharCode()将 Unicode 编码转为字符。`

在initData中 执行observe(data, true) 检测data数据,为每个值创建一个观察者实例

我们来看一下 
``` js
function observe(value, asRootData){
	if(如果这个值被观察，则返回)
	{ob = value.__ob__;}
	else if(如果没有被观察，则实例化Observer)
	{ob = new Observer(value);}
}
```

当我们 new Observer(value)

``` js
function Observer(value){
	// this.dep = new Dep();
	// 这里进行了判断 数组与对象（默认必须是对象 因为data:{}）
	if(数组)
	{this.observeArray(value);}
	else if(对象)
	{this.walk(value);}
}
// 如果是数组 开始遍历数组的每个值，然后在进行__ob__观察
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};
// 如果是对象
Observer.prototype.walk = function walk (obj) {

  var keys = Object.keys(obj);
  console.log(keys,'==3')
  for (var i = 0; i < keys.length; i++) {
    defineReactive(obj, keys[i]);
  }
};

function defineReactive (){
 // 首先他会把data里面所有值变成可观察的，完成以后
	// 并使用 Object.defineProperty 把这些属性全部转为 getter/setter，Object.defineProperty 通过监听每个key
}
```


