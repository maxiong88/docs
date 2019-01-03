# css 清除浮动

#### 方法

	* 利用clear属性进行清除
	* 讲父容器形成BFC(块级格式化上下文)
	
	
#### 原理

###### clear属性

	* clear属性的意义就是禁止特定方向上存在的浮动 （clear:both）
		
		* 具体的实现原理是通过引入清楚区域，这相当于加了一块看不见的框把定义clear属性的元素向下挤
			直到元素指定方向刚好没有浮动元素，这样看起来包含框就把浮动框给包含了，
			实际上浮动框脱离文本流的性质没变，它们依然是“浮”在上面的
			
	* 利用css伪元素  (原理跟clear属性一样，)通过将这个类添加到父容器当中，会在父容器的末尾增加了一个高度为0、具有清除属性的、不可见的块级元素
	{
	content:"."; // 该属性用于定义元素之前或之后放置的生成内容
	height:0; // 这个属性定义元素内容区的高度，在内容区外面可以增加内边距、边框和外边距
	visibility:hidden; // 属性规定元素是否可见,即使不可见的元素也会占据页面上的空间
	display:block; // 修改为块级元素
	clear:both // 属性规定元素的哪一侧不允许其他浮动元素 both在左右两侧均不允许浮动元素。 (如果声明为左边或右边清除，会使元素的上外边框边界刚好在该边上浮动元素的下外边距边界之下)
	}
	{zoom:1} // 兼容ie
	
###### BFC (导致其计算高度时将浮动元素的高度计算在内)

	######## 触发方式
	
		* 根元素 html
		* float:left\right
		* position:absolute\fixed
		* display:inline-block\table-cell\flex
		* overflow:hidden\auto\scroll\
	
	######## 布局规则
		
		* 内部的Box会在垂直方向，一个接一个地放置。
		* Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠
		* 每个元素的margin box的左边， 与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。
		* BFC的区域不会与float box重叠。
		* BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。
		** 计算BFC的高度时，浮动元素也参与计算


###### 原型继承

	组合继承，指的是将原型链和借用构造函数的技术组合到一起。思路是使用原型链实现对原型属性和方法的继承，而通过借用构造函数来实现对实例属性的继承。这样，既通过在原型上定义方法实现了函数的复用，又能够保证每个实例都有它自己的属性。

	```

		function Animal(name,color,age){
			this.name= name;
			this.color = ["red","green"];
			this.age = age

		}
		Animal.prototype.sayName = function(){
			console.log(this.age)
		}

		function Dog(name,tui){
			Animal.call(this,name) // Animal的方法属性要在Dog里面走一边 将Animal的方法属性到Dog作用域中执行,这样就可以继承属性方法
			this.tui = tui
		}

		Dog.prototype = new Animal();
		Dog.prototype.constructor = Dog;
		Dog.prototype.say1 = function(){
			console.log(this.name)
		}
		Dog.prototype.tui1 = function(){
			console.log(this.tui)
		}

		var Dog1 = new Dog("小狗1","四支腿1");

		Dog1.color.push("blank")
		console.log(Dog1.tui1())
		console.log(Dog1.color)

		var Dog2 = new Dog("小狗2","四支腿2");
		console.log(Dog2.tui1())
		console.log(Dog2.color)

	```		

	```
	class Animal{

		constructor(props){

			this.name = props.name || ""
		}
		eat(){
			alert(this.name+"吃动心")
		}

	}
	class Brind extends Animal{
		constructor(props){

			super(props);
			this.type = props.type || ""
		}
		flay(){
			alert(this.name+"在飞")
		}

	}
	```


##### js必包

	闭包是一个函数，通过闭包我们可以访问一个函数内部的变量。(当一个内部函数被其外部函数之外的变量引用时)
	
	全局变量
	var age =1;
	function box(){
		return age++
	}
	box() // age : 2
	alert(age) // age : 2
	
	局部变量
	
	function box(){
		var age =2;
		age ++;
		return age;
	}
	box() // age:3
	box() // age:3
	
	匿名函数与闭包
	
	function box(){
		var age =3;
		return function(){
			age++;
			return age;
		}
	}
	
	box()() // 这样跳用就好比是局部变量 age :4
	box()() // age :4
	
	
	var b = box() // 这样就形成了闭包
	b() // age:4
	b() // age:5
	var c = box();
	c() // age:4
	c() // age:5

	
####  vuex 

	1.http://blog.csdn.net/wulixiaoxiao1/article/details/57084834
	
	
	
	
	
	
#### 多个对象转为数组

var a = {};
var b = {}

var c1 = Array.call(this,a,b)	


js sort 排序

var ary = [2, 98, 34, 45, 78, 7, 10, 100, 99];
ary.sort((a, b) => {
 return a-b; // 升序
 return b-a  // 降序
});
console.log(ary);

VM2428:5 (9) [2, 7, 10, 34, 45, 78, 98, 99, 100]
	
参数a和b，就是依次从array数组中取连续的两个元素，如从示例中先选择前两个元素：10, 5。
所以，在匿名函数内 a - b 的结果是 5。

再看下，匿名函数的结果跟排序的关系：
如果 compareFunction(a, b) 小于 0 ，那么 a 会被排列到 b 之前；
如果 compareFunction(a, b) 等于 0 ， a 和 b 的相对位置不变。备注：ECMAScript 标准并不保证这一行为，而且也不是所有浏览器都会遵守（例如 Mozilla 在 2003 年之前的版本）；
如果 compareFunction(a, b) 大于 0 ， b 会被排列到 a 之前。
compareFunction(a, b) 必须总是对相同的输入返回相同的比较结果，否则排序的结果将是不确定的。

所以，示例是按照 compareFunction(a, b) 的返回值来排序的。


/** 
 * author maxiong
 * 2018.08.04
 * 根据参数不同，来确定是升序还是降序
 * 
 * obj 师叔祖
 * 
 * key 是键值
 * 
 * rev 升降自动生成默认 升序
 * sortBy(obj,key,rev)
 * 
 * */

export const sortBy = function(obj,key,rev){
    rev == "ascending" ? (rev = 1) : (rev = -1);
    return obj.sort(function (a, b) {
        if (a[key] > b[key]) {
          return rev * 1;
        }
        if (a[key] < b[key]) {
          return rev * -1;
        }
        // a 必须等于 b
        return 0;
    });
}