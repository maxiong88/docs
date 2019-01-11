layout: post
title: 对bind方法的理解
date: 2018-01-25 21:11:35
tags: javascript
---

> react
> 原生js学习bind方法


[修改与05-17]

<!-- more -->

##### 语法

    fun.bind(thisArg[,arg1[,arg2[,...]]])
        thisArg 当绑定函数被调用时，该参数会作为`原函数`运行时的 this 指向。当使用new 操作符调用绑定函数时，该参数无效。
        arg1..  当绑定函数被调用时，这些参数将置于实参之前传递给被绑定的方法
		
	

##### 返回值

    返回由指定的this值和初始化参数改造的原函数拷贝
	
	> 返回个函数
	> 可以传入参数
	
	`
		var foo = {value:1}
		function bar (name, age){console.log()}
		var barFoo = bar.bind(foo, 'display') // bindFoo是一个函数
		bindFoo('33') // 此处可以再次传入参数
	`
	前两个实现
	`
		Function.prototype.bind = function(context){
			var self = this;
			// 获取bind函数从第二个参数到最后一个参数
			var args = Array.prototype.slice.call(arguments, 1)
			return function(){
				// 这时候的arguments是指bind返回的函数bindFoo调用时传入的参数
				var bindArgs = Array.prototype.slice.call(agruments);
				self.apply(context, args.concat(bindArgs));
			}
		}
	`
	
	> 一个绑定函数也能使用new操作符创建对象：这种行为就像把原函数当成构造器。提供的 this 值被忽略，同时调用时的参数被提供给模拟函数。: 通过修改返回的函数的原型来实现
	
	`
	var value = 2;

	var foo = {
		value: 1
	};

	function bar(name, age) {
		this.habit = 'shopping';
		console.log(this.value);
		console.log(name);
		console.log(age);
	}

	bar.prototype.friend = 'kevin';

	var bindFoo = bar.bind(foo, 'daisy');

	var obj = new bindFoo('18'); // this 已经指向了 obj
	// undefined
	// daisy
	// 18
	console.log(obj.habit);
	console.log(obj.friend);
	// shopping
	// kevin
	尽管在全局和 foo 中都声明了 value 值，最后依然返回了 undefind，说明绑定的 this 失效了
	`
	第三个
	`
	Function.property.bind2 = function(context){
		let self = this;
		// self -> bar(){}
		let args = Array.prototype.slice.call(arguments, 1);
		let fbound = function(){
			let bindArgs = Array.property.slice.call(arguments);
			// 1.当作为构造函数时， this -》实例（fbound创建的实例），self->绑定函数bar，结果为true，那么self指向实例
			// 2.当作为普通函数时， this->window，self-》绑定函数，此时结果为false，那么self指向绑定的context
			self.apply(this instanceof self ? this : context, args.concat(bindArgs));
		}
		// 为了要让 this instanceof self 为true 就要创建的实例继承绑定函数bar
		// 唯一办法就是让创建实例的函数fbound的prototype指向bar函数的prototype
		return fbound
	}
	
	version 2.0 直接将 fbound.prototype = this.prototype，我们直接修改fbound.prototype 的时候，也会直接修改函数bar的 prototype。这个时候，我们可以通过一个空函数来进行中转，然后利用组合继承的方式来实现
	Function.prototype.bind2 = function (context) {
		var self = this;
		var args = Array.prototype.slice.call(arguments, 1);
		
		var fNOP = function () {}; // // 定义一个中间函数，用于作为继承的中间值

		var fbound = function () {
			var bindArgs = Array.prototype.slice.call(arguments);
			self.apply(this instanceof self ? this : context, args.concat(bindArgs));
		}
		// 先让 fNOP 的原型方法指向 this 即函数bar的原型方法，继承 this 的属性
		fNOP.prototype = this.prototype;
		// 再将 fbound 即要返回的新函数的原型方法指向 fNOP 的实例化对象
		// 这样，既能让 fBound 继承 this 的属性，在修改其原型链时，又不会影响到 this 的原型链
		fbound.prototype = new fNOP();
		return fbound;
	}

	在上面的代码中，我们引入了一个新的函数 fun，用于继承原函数的原型，并通过 new 操作符实例化出它的实例对象，供 fBound 的原型继承，至此，我们既让新函数继承了原函数的所有属性与方法，又保证了不会因为其对原型链的操作影响到原函数

	`

##### 描述

   bind() 方法会创建一个新函数。当这个新函数被调用时，
   bind() 的第一个参数将作为它运行时的 this，之后的一序列参数将会在传递的实参前传入作为它的参数


我们先来看一下bind 原生写法

`
if (!Function.prototype.bind) {
  Function.prototype.bind = function(oThis) {
      // 如果不是一个函数抛出错误
    if (typeof this !== 'function') {
      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    }
    // 这里用到了一个slice, 从第一个参数开始返回，过滤掉了`this`
    var aArgs   = Array.prototype.slice.call(arguments, 1),
        // 当前this
        fToBind = this,
        // 空函数 中间件 继承中间值
        fNOP    = function() {},
        fBound  = function() {
            // 如果 当前this检 测返回当前this，否则传过来的this
          return fToBind.apply(this instanceof fNOP
                 ? this
                 : oThis,
                 // 默认参数与传入参数合并
                 aArgs.concat(Array.prototype.slice.call(arguments)));
        };

    // 维护原型关系
    if (this.prototype) {
      // Function.prototype doesn't have a prototype property
	  // 先让 fNOP 的原型方法指向 this 即函数bar的原型方法，继承 this 的属性
      fNOP.prototype = this.prototype; 
    }
	// 再将 fbound 即要返回的新函数的原型方法指向 fNOP 的实例化对象 这样，既能让 fBound 继承 this 的属性，在修改其原型链时，又不会影响到 this 的原型链
    fBound.prototype = new fNOP();

    return fBound;
  };
}
`

## react

事件 箭头函数、bind 绑定

`
	class A extends React.Component{
		sss=(a,b,c,d,e)=>{
			console.log(a,b,c,d,e) // 3,4,1,2
			/*
				ooo = {(d, e)=>this.sss("3", "4", d, e)} 
				var ooo = function(d, e){
					return sss(a,b,c,d) // 可以使用不定参数 ...  展开运算符
				}
			*/
		}
		mmm=(...args)=>{
			console.log(args) // 数组 ["aa", "bb", "1", "2", event]
			/*
				ooo = {this.mmm.bind(this, "aa", "bb")}
				this.mmm.bind(this, "aa", "bb")("1", "2")

			*/
		}	
		render(){
			return(
				<div>
					<Button ooo = {(d, e)=>this.sss("3", "4", d, e)}/>
					<Button ooo = {this.mmm.bind(this, "aa", "bb")}/>
				</div>
			)
		}
	}
	class Button extends React.Component{
		pFn=()=>{
			this.props.ooo("1", "2")
		}
		render(){
			return (
				<div>
					<p onClick={this.pFn}></p>
				</div>
			)
		}
	}
`

* [https://juejin.im/post/5abb8fbe5188255569190c17](https://juejin.im/post/5abb8fbe5188255569190c17)
* https://juejin.im/post/5af935d151882542821c6d91

	