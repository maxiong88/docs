---
title: js面向对象-1
date: 2017-03-17 13:53:08
tags: javascript
---


面试遇到的问题，在实际项目中忽略了这种问题；



<!-- more -->


js是一种基于对象的语言，它又不是一种真正的面向对象语言，因为它的语法中没有class（类）

属性 property 【坡绕 坡 梯】

方法 method 【买 sei 的】

原型  prototype 【坡肉地太仆】


一、生成实例对象的原始模式

假定猫是对象，它有名字和颜色两个属性

```
var cat = {
	name : "",
	color : ""
}
```

我们需要根据这个原型对象的规格schema，生成两个实例对象

```
var cat1 = {} //创建一个空对象
cat1.name = "大毛" // 按照原型对象的属性赋值
cat1.color = "黄色"
var cat2 = {}
cat2.name = "二毛"
cat2.color = "黑色"

```
这就是最简单的封装了，把两个属性封装在一个对象里面。但是，这样的写法有两个缺点，一是如果多生成几个实例，写起来就非常麻烦；二是实例与原型之间，没有任何办法，可以看出有什么联系。

二、原始模式改进

写一个函数，解决代码重复的问题

```
function Cat(name,color){
	return {
		name : name,
		color : color
	}
}
```

然后生成实例对象，就等于是在调用函数

```
var cat1 = Cat("1","2")
var cat2 = Cat("1","2")
```
cat1和cat2之间没有内在的联系，不能反映出它们是同一个原型对象的实例。

三、构造函数模式

为了解决从原型对象生成实例的问题，Javascript提供了一个构造函数（Constructor）模式。

所谓"构造函数"，其实就是一个普通函数，但是内部使用了this变量。对构造函数使用new运算符，就能生成实例，并且this变量会绑定在实例对象上。

```
function Cat(a,b){
	this.a = a;
	this.b = b;
}
```

现在就可以生成实例对象了

```
var cat1 = new Cat("1","2")
var cat2 = new Cat("1","2")
alert(cat1.a) // 1
alert(cat2.a) // 1
```

这时cat1和cat2会自动含有一个constructor属性，指向它们的构造函数

```
alert(cat1.constructor == Cat) // true
alert(cat2.constructor == Cat) // true
```

Javascript还提供了一个instanceof运算符，验证原型对象与实例对象之间的关系

```
alert(cat1 instanceof Cat) // true
alert(cat2 instanceof Cat)  // true
```
四、构造函数模式问题

构造函数方法很好用，但是存在一个浪费内存的问题。

请看，我们现在为Cat对象添加一个不变的属性type（种类），再添加一个方法eat（吃）。那么，原型对象Cat就变成了下面这样：


```

function Cat(name,color){
　　　　this.name = name;
　　　　this.color = color;
　　　　this.type = "猫科动物";
　　　　this.eat = function(){alert("吃老鼠");};
　　}
还是采用同样的方法，生成实例：
　var cat1 = new Cat("大毛","黄色");
　　var cat2 = new Cat ("二毛","黑色");
　　alert(cat1.type); // 猫科动物
　　cat1.eat(); // 吃老鼠
```

表面上好像没什么问题，但是实际上这样做，有一个很大的弊端。那就是对于每一个实例对象，type属性和eat()方法都是一模一样的内容，每一次生成一个实例，都必须为重复的内容，多占用一些内存。这样既不环保，也缺乏效率。

```
alert(cat1.eat == cat2.eat); //false
```

能不能让type属性和eat()方法在内存中只生成一次，然后所有实例都指向那个内存地址呢？回答是可以的。

五、prototype模式

Javascript规定，每一个构造函数都有一个prototype属性，指向另一个对象。这个对象的所有属性和方法，都会被构造函数的实例继承。

这意味着，我们可以把那些不变的属性和方法，直接定义在prototype对象上。

```
　function Cat(name,color){
　　　　this.name = name;
　　　　this.color = color;
　　}
　　Cat.prototype.type = "猫科动物";
　　Cat.prototype.eat = function(){alert("吃老鼠")};

然后，生成实例。

　var cat1 = new Cat("大毛","黄色");
　　var cat2 = new Cat("二毛","黑色");
　　alert(cat1.type); // 猫科动物
　　cat1.eat(); // 吃老鼠
```

这时所有实例的type属性和eat()方法，其实都是同一个内存地址，指向prototype对象，因此就提高了运行效率。

```
alert(cat1.eat == cat2.eat) // true
```

六、prototype模式的验证方法

为了配合prototype属性，Javascript定义了一些辅助方法，帮助我们使用它。，

构造函数继承

一、构造函数绑定

1.使用call或者apply，将父对象的构造函数绑定在子对象上

`调用一个对象的一个方法，以另一个对象替换当前对象`


注意到，call()与apply()的区别：功能一样。第二个参数形式不一样。call传递多个参数，是任意形式。apply第二个参数必须是数组形式。

用代码来理解它们区别最好：

 

a.call(b,2,3); ==>  a.apply(b,[2,3]);//数组形式传入

 

 

就是利用了apply参数是数组的特性。结合函数的隐性参数，都会自动保存在arguments数组中。这样，使用apply的方式：

 

this.initialize.apply(this, arguments);

 

可以直接将当前函数的arguments数组作为apply的第二个参数传入，不需要转化。

