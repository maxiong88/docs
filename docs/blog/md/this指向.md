## https://juejin.im/post/59bfe84351882531b730bac2

this永远指向最后调用它的那个对象

`
	var name="windowsName";
	function a(){
		var name="xx";
		console.log(this.name); // windowsName
		console.log("inner",this) // window
		console.log()
	}
	a(); // this永远指向最后调用他的那个对象  window.a() window调用
	console.log("other",this) // window
	
	严格模式
	全局对象返回 undefined
`

`
var name="windowsName"
var a = {
	name:"xx",
	fn:function(){
		console.log(this.name) // xx
	}
}
a.fn() // fn是a调用的，所以打印的值就是a，但是window.a.fn()也可以那这个this为什么指向a呢？？？
`

`
var name="windowsName";
var a={
	name:"xx",
	fn:function(){
		console.log(this.name) // xx
	}
}
window.a.fn() // this永远指向`最后`调用它的那个对象,最后调用它的对象是a
`

`
var name="windowsName"
var a = {
	fn:function(){
		console.log(this.name) // undefined
	}
}
window.a.fn(); 
`

这里为什么会打印 undefined 呢？
这是因为正如刚刚所描述的那样，调用 fn 的是 a 对象，
也就是说 fn 的内部的 this 是对象 a，而对象 a 中并没有对 name 进行定义，
所以 log 的 this.name 的值是 undefined。

这个例子还是说明了：this 永远指向最后调用它的那个对象，因为最后调用 fn 的对象是 a，
所以就算 a 中没有 name 这个属性，也不会继续向上一个对象寻找 this.name，
而是直接输出 undefined。

`
var name="window"
var a = {
	name:null,
	fn:function(){
		console.log(this.name) // window
	}
}
var f = a.fn()
f()
`
这里你可能会有疑问，为什么不是 xx，这是因为虽然将 a 对象的 fn 方法赋值给变量 f 了，
但是没有调用，再接着跟我念这一句话：“this 永远指向最后调用它的那个对象”，
由于刚刚的 f 并没有调用，所以 fn() 最后仍然是被 window 调用的。所以 this 指向的也就是 window。

由以上五个例子我们可以看出，this 的指向并不是在创建的时候就可以确定的，
在 es5 中，永远是this 永远指向最后调用它的那个对象。

`
 var name = "windowsName";

    function fn() {
        var name = 'xx';
        innerFunction();
        function innerFunction() {
            console.log(this.name);      // windowsName
        }
    }

    fn()
`

怎么改变this指向

* Es6箭头函数
* 在函数内部使用_this = this
* 使用apply、call、bind
* new实例化一个对象

`
var name = "windowsName";

    var a = {
        name : "Cherry",

        func1: function () {
            console.log(this.name)     
        },

        func2: function () {
            setTimeout(  function () {
                this.func1()
            },100);
        }

    };

    a.func2()     // this.func1 is not a function
`
在不使用箭头函数的情况下，是会报错的，
因为最后调用 setTimeout 的对象是 window，
但是在 window 中并没有 func1 函数。

众所周知，ES6 的箭头函数是可以避免 ES5 中使用 this 的坑的。
箭头函数的 this 始终指向函数定义时的 this，而非执行时.
箭头函数需要记着这句话：“箭头函数中没有 this 绑定，
必须通过查找作用域链来决定其值，如果箭头函数被非箭头函数包含，
则 this 绑定的是最近一层非箭头函数的 this，否则，
this 为 undefined”。

`
var name = "windowsName";

    var a = {
        name : "Cherry",

        func1: function () {
            console.log(this.name)     
        },

        func2: function () {
            setTimeout( () => {
                this.func1()
            },100);
        }

    };

    a.func2()     // Cherry
`

如果不使用 ES6，那么这种方式应该是最简单的不会出错的方式了，
我们是先将调用这个函数的对象保存在变量 _this 中，
然后在函数中都使用这个 _this，这样 _this 就不会改变了。

`
var name = "windowsName";

    var a = {

        name : "Cherry",

        func1: function () {
            console.log(this.name)     
        },

        func2: function () {
            var _this = this;
            setTimeout( function() {
                _this.func1()
            },100);
        }

    };

    a.func2()       // Cherry
`
这个例子中，在 func2 中，首先设置 var _this = this;
这里的 this 是调用 func2 的对象 a，
为了防止在 func2 中的 setTimeout 被 window 调用而导致的在 
setTimeout 中的 this 为 window。我们将 this(指向变量 a) 
赋值给一个变量 _this，
这样，在 func2 中我们使用 _this 就是指向对象 a 了。

`
var a = {
        name : "Cherry",

        func1: function () {
            console.log(this.name)
        },

        func2: function () {
            setTimeout(  function () {
                this.func1()
            }.apply(a),100);
        }

    };

    a.func2()            // Cherry
`

MDN

apply() 方法调用一个函数, 其具有一个指定的this值，以及作为一个数组（或类似数组的对象）提供的参数

fun.apply(thisArg, [argsArray])
<this>
thisArg：在 fun 函数运行时指定的 this 值。需要注意的是，指定的 this 值并不一定是该函数执行时真正的 this 值，如果这个函数处于非严格模式下，则指定为 null 或 undefined 时会自动指向全局对象（浏览器中就是window对象），同时值为原始值（数字，字符串，布尔值）的 this 会指向该原始值的自动包装对象。
<参数>
argsArray：一个数组或者类数组对象，其中的数组元素将作为单独的参数传给 fun 函数。如果该参数的值为null 或 undefined，则表示不需要传入任何参数。从ECMAScript 5 开始可以使用类数组对象。

`
 var a = {
        name : "Cherry",

        func1: function () {
            console.log(this.name)
        },

        func2: function () {
            setTimeout(  function () {
                this.func1()
            }.call(a),100);
        }

    };

    a.func2()            // Cherry
`

传参不一样
所以 apply 和 call 的区别是 call 方法接受的是若干个参数列表，而 apply 接收的是一个包含多个参数的数组。
fun.call(thisArg[, arg1[, arg2[, ...]]])

`
 var a = {
        name : "Cherry",

        func1: function () {
            console.log(this.name)
        },

        func2: function () {
            setTimeout(  function () {
                this.func1()
            }.bind(a)(),100);
        }

    };

    a.func2()            // Cherry
`
bind()方法创建一个新的函数, 当被调用时，将其this关键字设置为提供的值，在调用新函数时，在任何提供之前提供一个给定的参数序列。

bind创建一个函数需要手动调用


JS 中的函数调用

函数调用的方法一共有 4 种

作为一个函数调用
函数作为方法调用
使用构造函数调用函数
作为函数方法调用函数（call、apply）

1.作为一个函数调用
		 var name = "windowsName";
    function a() {
        var name = "Cherry";

        console.log(this.name);          // windowsName

        console.log("inner:" + this);    // inner: Window
    }
    a();
    console.log("outer:" + this)         // outer: Window
	
这样一个最简单的函数，不属于任何一个对象，就是一个函数，这样的情况在 JavaScript 的在浏览器中的非严格模式默认是属于全局对象 window 的，在严格模式，就是 undefined。

但这是一个全局的函数，很容易产生命名冲突，所以不建议这样使用。

2.函数作为方法调用（所以说更多的情况是将函数作为对象的方法使用）
 var name = "windowsName";
    var a = {
        name: "Cherry",
        fn : function () {
            console.log(this.name);      // Cherry
        }
    }
    a.fn();
这里定义一个对象 a，对象 a 有一个属性（name）和一个方法（fn）。

然后对象 a 通过 . 方法调用了其中的 fn 方法。

然后我们一直记住的那句话“this 永远指向最后调用它的那个对象”，所以在 fn 中的 this 就是指向 a 的。

3.使用构造函数调用函数	
如果函数调用前使用了 new 关键字, 则是调用了构造函数。
这看起来就像创建了新的函数，但实际上 JavaScript 函数是重新创建的对象：
// 构造函数:
function myFunction(arg1, arg2) {
    this.firstName = arg1;
    this.lastName  = arg2;
}

// This    creates a new object
var a = new myFunction("Li","Cherry");
a.lastName;                             // 返回 "Cherry"

new过程
var a = new myFunction("Li","Cherry");

new myFunction{
    var obj = {};
    obj.__proto__ = myFunction.prototype;
    var result = myFunction.call(obj,"Li","Cherry");
    return typeof result === 'obj'? result : obj;
}
创建一个空对象 obj;
将新创建的空对象的隐式原型指向其构造函数的显示原型。
使用 call 改变 this 的指向
如果无返回值或者返回一个非对象值，则将 obj 返回作为新对象；如果返回值是一个新对象的话那么直接直接返回该对象。
4.作为函数方法调用函数
在 JavaScript 中, 函数是对象。
JavaScript 函数有它的属性和方法。
call() 和 apply() 是预定义的函数方法。 两个方法可用于调用函数，两个方法的第一个参数必须是对象本身
在 JavaScript 严格模式(strict mode)下, 在调用函数时第一个参数会成为 this 的值， 即使该参数不是一个对象。
在 JavaScript 非严格模式(non-strict mode)下, 如果第一个参数的值是 null 或 undefined, 它将使用全局对象替代。

匿名函数的 this 永远指向 window