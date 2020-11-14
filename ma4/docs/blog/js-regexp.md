---
title: '[精]正则表达式'
description: '了解一下'
sidebar: 'auto'
time: '2019-01-01'
prev: ''
next: ''
---

### 构建方式

+ 字面量 `/a/`
+ 构造函数 `new RegExp('a')` 可以插入变量

### 在线工具

`https://regexr.com/`


[参考](https://juejin.im/post/6891455192009539598)
[参考](https://zh.javascript.info/)
[参考](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions)


## 括号作用

### 1.分组和分支结构

#### 1.1分组

我们知道/a+/匹配连续出现的“a”，而要匹配连续出现的“ab”时，需要使用/(ab)+/。

其中括号是提供分组功能，使量词“+”作用于“ab”这个整体，测试如下：

``` js

var regex = /(ab)+/g; // 加了括号匹配的ab
var string = "ababa abbb ababab";

console.log( string.match(regex) ); // ["abab", "ab", "ababab"]

var regex1 = /ab+/g; // 不加匹配的是一个a多个b

console.log( string.match(regex1) ); // ["ab", "ab", "abbb", "ab", "ab", "ab"]

var string = 'asd[asdf]dsfsdf[eee]sadfasd[555]';
var regex2 = /\[(.+?)\]/g

console.log(a.match(regex2)); // ["[asdf]", "[eee]", "[555]"]

```

#### 1.2 分支结构

而在多选分支结构(p1|p2)中，此处括号的作用也是不言而喻的，提供了子表达式的所有可能。

比如，要匹配如下的字符串：

> I love JavaScript
> I love Regular Expression

``` js

var regex = /^I love (JavaScript|Regular Expression)$/;

console.log( regex.test("I love JavaScript") ); // true

console.log( regex.test("I love Regular Expression") ); // true

```

如果去掉正则中的括号，即/^I love JavaScript|Regular Expression$/，

匹配字符串是"I love JavaScript"和"Regular Expression"，当然这不是我们想要的。


### 2.引用分组

这是括号一个重要的作用，有了它，我们就可以进行数据提取，以及更强大的替换操作。

而要使用它带来的好处，必须配合使用实现环境的API。


#### 2.1 提取数据

比如提取出年、月、日，可以这么做：

``` js

var regex = /(\d{4})-(\d{2})-(\d{2})/;
var regex1 = /(\d{4})-(\d{2})-(\d{2})/g;
var string = "2017-06-12";

console.log( string.match(regex) ); 
// => ["2017-06-12", "2017", "06", "12", index: 0, input: "2017-06-12"]

console.log( string.match(regex1) )
// => ["2017-06-12"]

```

match返回的一个数组，第一个元素是整体匹配结果，然后是各个分组（括号里）匹配的内容，然后是匹配下标，最后是输入的文本。

::: tip 注意

在全局检索模式下，match() 即不提供与子表达式匹配的文本的信息，也不声明每个匹配子串的位置。

如果您需要这些全局检索的信息，可以使用 RegExp.exec()。

::: 

另外也可以使用正则对象的exec方法：

``` js

var regex = /(\d{4})-(\d{2})-(\d{2})/;
var string = "2017-06-12";
console.log( regex.exec(string) ); 
// => ["2017-06-12", "2017", "06", "12", index: 0, input: "2017-06-12"]

```

同时，也可以使用构造函数的全局属性$1至$9来获取：

``` js

var regex = /(\d{4})-(\d{2})-(\d{2})/;
var string = "2017-06-12";

regex.test(string); // 正则操作即可，例如
//regex.exec(string);
//string.match(regex);

console.log(RegExp.$1); // "2017"
console.log(RegExp.$2); // "06"
console.log(RegExp.$3); // "12"

```

#### 2.2 替换

比如，想把yyyy-mm-dd格式，替换成mm/dd/yyyy怎么做？

``` js

var regex = /(\d{4})-(\d{2})-(\d{2})/;
var string = "2017-06-12";
var result = string.replace(regex, "$2/$3/$1");
console.log(result); // "06/12/2017"

```

其中replace中的，第二个参数里用$1、$2、$3指代相应的分组。等价于如下的形式：

``` js

var regex = /(\d{4})-(\d{2})-(\d{2})/;
var string = "2017-06-12";
var result = string.replace(regex, function() {
	return RegExp.$2 + "/" + RegExp.$3 + "/" + RegExp.$1;
});
console.log(result); // "06/12/2017"

```

也等价于：

``` js

var regex = /(\d{4})-(\d{2})-(\d{2})/;
var string = "2017-06-12";
var result = string.replace(regex, function(match, year, month, day) {
	return month + "/" + day + "/" + year;
});
console.log(result); // "06/12/2017"

```

### 3. 反向引用

除了使用相应API来引用分组，也可以在正则本身里引用分组。但只能引用之前出现的分组，即反向引用。

还是以日期为例。

比如要写一个正则支持匹配如下三种格式：

> 2016-06-12
> 2016/06/12
> 2016.06.12

最先可能想到的正则是:

``` js

var regex = /\d{4}(-|\/|\.)\d{2}(-|\/|\.)\d{2}/;
var string1 = "2017-06-12";
var string2 = "2017/06/12";
var string3 = "2017.06.12";
var string4 = "2016-06/12";
console.log( regex.test(string1) ); // true
console.log( regex.test(string2) ); // true
console.log( regex.test(string3) ); // true
console.log( regex.test(string4) ); // true

```

其中/和.需要转义。虽然匹配了要求的情况，但也匹配"2016-06/12"这样的数据。

假设我们想要求分割符前后一致怎么办？此时需要使用反向引用：

``` js

var regex = /\d{4}(-|\/|\.)\d{2}\1\d{2}/;
var string1 = "2017-06-12";
var string2 = "2017/06/12";
var string3 = "2017.06.12";
var string4 = "2016-06/12";
console.log( regex.test(string1) ); // true
console.log( regex.test(string2) ); // true
console.log( regex.test(string3) ); // true
console.log( regex.test(string4) ); // false

```

注意里面的\1，表示的引用之前的那个分组(-|\/|\.)。不管它匹配到什么（比如-），\1都匹配那个同样的具体某个字符。

我们知道了\1的含义后，那么\2和\3的概念也就理解了，即分别指代第二个和第三个分组。

看到这里，此时，恐怕你会有三个问题。


##### 3.1 括号嵌套怎么办？

## | ()

`影响表达式的子表达式之间的关系：`

+ `|` 左右两边表达式之间“或”关系，匹配左边或者右边

+ `()` 

	- 在被修饰匹配次数的时候，括号中的表达式可以作为整体被修饰
	- 取匹配结果的时候，括号中的表达式匹配到的内容可以被单独得到

#### 举例

``` js

var s = "I'm Tom, he is Jack";

s.match(/Tom|Jack/gi)

//  ["Tom", "Jack"]

```



正则表达式是用于匹配字符串中字符组合的模式。

在JavaScript 中，正则表达式也是对象。

这些模式被用于 RegExp 的 exec 和 test 方法以及 String 的 match、replace、search 和 split 方法



\ 做为转意，即通常在"\"后面的字符不按原来意义解释，如/b/匹配字符"b"，当b前面加了反斜杆后/\b/，转意为匹配一个单词的边界。

对正则表达式功能字符的还原，如"*"匹配它前面元字符0次或多次，/a*/将匹配a,aa,aaa，加了"\"后，/a\*/将只匹配"a*"。



## 创建一个正则表达式

###### 使用一个正则表达式字面量，适用于正则表达式是常量

``` js
var re = /ab+c/
```

###### 调用RegExp对象的构造函数 

``` js
var re = new RegExp("ab+c")
```

使用构造函数，提供了对正则表达式运行时的编译。当你知道正则表达式的模式会发生改变， 或者你事先并不了解它的模式或者是从其他地方（比如用户的输入），得到的代码这时比较适合用构造函数的方式。

##### 特殊字符

+ ^ 匹配一个输入或一行的开头 /^a/.test("an A") true; /^a/.test("An a") false
+ $ 匹配一个输入或一行的结尾 /a$/.test("an A") false; /a$/.test("An a") true
+ * 匹配签一个表达式0此或多次，等价于{0,}	贪婪型
+ + 匹配前面一个表达式1此或多次，等价于{1,} 贪婪型
+ ? 匹配前面一个表达式0次或者1次，等价于{0,1} 懒惰型
+ . 匹配除了换行符(\n)之外的任何单个字符
+ (X) 匹配x并且记住匹配项.叫做`捕获括号`
+ (?:x) 匹配x但是不记住匹配项，只做为匹配，不返回结果.叫做`非捕获括号`

``` js

industr(?:y|ies)  就是一个比  industry | industries 更简略的表达式

var regular = /^Subject:(?:\d)/
var str = "Subject:1 as something";
var result = regular.exec(str);

// ["Subject:1", index: 0, input: "Subject:1 as something", groups: undefined]

var regular = /^Subject:(\d)/
var str = "Subject:1 as something";
var result = regular.exec(str);

// (2) ["Subject:1", "1", index: 0, input: "Subject:1 as something", groups: undefined]

```

* x(?=y) 匹配x仅仅当x后面跟着y，正向肯定查找
* x(?!y) 匹配x仅仅当x后面不跟着y，正向否定查找
* x|y 匹配x或者y
* {n} 匹配前面一个字符刚好发生了n次，n是正整数
* {n,m} 匹配前面的字符至少n次，最多m次
* [xyz] 匹配方括号中任意字符
* [^xyz] 匹配任何没有包含在方括号中的字符
* [\b] 匹配一个退格
* \b 匹配一个词的边界
	* /\bm/匹配“moon”中得‘m’；
	* /oo\b/并不匹配"moon"中得'oo'，因为'oo'被一个词汇字符'n'紧跟着。
	* /oon\b/匹配"moon"中得'oon'，因为'oon'是这个字符串的结束部分。这样他没有被一个词汇字符紧跟着。
	* /\w\b\w/将不能匹配任何字符串，因为一个单词中的字符永远也不可能被一个非词汇字符和一个词汇字符同时紧跟着
* \B 匹配一个非单词边界
	* /\B../匹配"noonday"中得'oo', 而/y\B./匹配"possibly yesterday"中得’ye‘
* \d 匹配一个(单个)数组 [0-9]
* \D 匹配一个(单个)非数字自负 [^0-9]
* \f 匹配一个(单个)换页符
* \n 匹配一个(单个)换行符
* \r 匹配一个(单个)回车符
* \s 匹配一个(单个)空白字符
* \S 匹配一个非空白字符
* \w 匹配一个单子字符 [A-Za-z0-9]
* \W 匹配一个非单子字符 [^A-Za-z0-9]
* \n 当n是一个正整数，一个返回引用到最后一个与有n插入的正值表达式匹配的富字符窜
* \0 匹配null字符
* \xhh 匹配带有两位小数代码(hh)的字符
* \xhhhh 匹配带有四位小数代码(hh)的字符 

::: tip
`[A-z],[Z-a]`是正确的，但是这样会造成匹配到排列在`z,a`之间的字符
`[a-Z],[z-A]`是错误的

`[\r]?`与`\r?`是等价的，添加了`[]`好处是增加可读性和避免产生误解
:::

##### 正则表达式方法

* exec 一个在字符窜中执行查找匹配的RegExp方法，他返回一个数组（未匹配到则返回null）
* test 一个字符窜中测试是否匹配的RegExp方法，他返回true或false
* match 一个在字符窜中执行查找匹配的String方法，他返回一个数组（未匹配到则返回null）
* search 一个在字符窜中检测匹配的String方法，他返回匹配到的位置索引（失败返回-1）
* replace 一个在字符窜中执行查找匹配的String方法，并且使用替换字符窜替换匹配掉的子字符窜
* split 一个使用正则表达式或者一个固定字符窜分割一个字符窜，并将分割后的子字符窜存储倒数组中的string方法

`
当你想要知道再一个字符窜中的一个匹配是否被找到，你可以使用test或search方法
`

`
想得到更多的信息则可以使用exec或match方法
`

##### 正则表达式标志

* g 全局搜索
* i 不区分大小写搜索
* m 多行搜索
* y 执行“粘性”搜索,匹配从目标字符串的当前位置开始，可以使用y标志。

##### $1 \1

$1-$9存放着正则表达式中最近的9个表达式的提取结果，这些结果按照匹配的出现顺序依次排列
基本语法是 RegExp.$n 这些属性是静态的除了replace中的第二个参数可以省略RegExp之外没其他地方都要加上RegExp

``` js
在regexp 中访问
var a1 = /(\d+)-(\d+)-(\d+)/.test("2016-03-26")
console.log(a1)
// true
RegExp.$1
// 2016
RegExp.$2
// 03
RegExp.$3
// 26

在replace中使用
"2016-03-26".replace(/(\d+)-(\d+)-(\d+)/,"$1年$2月$3日")
// 2016年03月26日

\1 表示后向引用，是指在正则表达式中，从左往右数，第1个()中的内容，以此类推，\2表示第2个()，\0表示整个表达式。

var rgx = /\d{4}(\-|\/|.)\d{1,2}\1\d{1,2}/
```

#### 应用

``` js
stringObject.match(searchvalue) // 需要检索的字符窜
stringObject.match(regexp) // 要匹配的模式的RegExp对象

<script type="text/javascript">

var str="Hello world!"
document.write(str.match("world") + "<br />")
document.write(str.match("World") + "<br />")
document.write(str.match("worlld") + "<br />")
document.write(str.match("world!"))

world
null
null
world!

</script>
<script type="text/javascript">

var str="1 plus 2 equal 3"
console.log(str.match(/\d+/g))
// [1,2,3] 输出数组
</script>



stringObject.replace(regexp/substr,replacement)
// 1参数 规定子字符窜或要替换的模式RegExp对象
// 2参数 一个字符窜值，规定了替换文本或生成替换文本的函数

<script type="text/javascript">

var str="Visit Microsoft!"
document.write(str.replace(/Microsoft/, "W3School"))
// Visit W3School!
</script>

我们将把 "Doe, John" 转换为 "John Doe" 的形式：
name = "Doe, John";
name.replace(/(\w+)\s*, \s*(\w+)/, "$2 $1");

我们将把所有的花引号替换为直引号：
name = '"a", "b"';
name.replace(/"([^"]*)"/g, "'$1'");

我们将把字符串中所有单词的首字母都转换为大写：
name = 'aaa bbb ccc';
uw=name.replace(/\b\w+\b/g, function(word){
  return word.substring(0,1).toUpperCase()+word.substring(1);}
  );
```


#### 应用实例

###### js 正则判断判断移动端

``` js
if(/(iphone|iPad|iPod|iOS)/i.test(navigator.userAgent)){
	window.location.href=""
}
console.log(navigator.userAgent.toLowerCase().match(/iphone/i)=="iphone")
// true
```

###### 用javascript替换url中的参数

```js

function changeUrlArg(url,arg,val){
	
	var pattern = arg+'=([^&]*)';
	
	var replaceText = arg+'='+val;

	if(url.match(pattern)){
	
		return url.replace(eval('/('+arg+'=)([^&]*)/gi'),replaceText)

	}else{
		
		if(url.match('[\?]')){
	
			return url+'&'+replaceText

		}else{
	
			return url+'?'+replaceText

		}

	}

}


// url 目标url

// param 需要替换的参数名称

// paramVal 替换以后参数值

// 返回新的url

function changUrl(url,param,paramVal){
	var newAddUrl = "";
	var tempArray = url.split("?") // 字符串转数组
	var baseUrl = tempArray[0] // 主机名
	var addUrl = tempArray[1] // 参数

	var temp = ""

	if(addUrl){
		tempArray = addUrl.split("&")
		for(var i=0;i<tempArray.length;i++){
			if(tempArray[i].split('=')[0]==param){
				newAddurl += temp + tempArray[i];
				temp = "&"
			}
		}
	}
	var rows_txt = temp + "" +param + "=" + paramVal;
	return baseUrl + "?" +newAddUrl + rows_txt
}
```

## 元字符

+ `[]` 一个字符集合,必须匹配该集合里面的字符其中一。字符集和可以用元字符`^`来求非，来排除所列字符；定义一个集合的具体做法如下：
	- 把所有的字符都列举出来
	- 利用元字符`-`以字符区间的方式给出

::: tip
当在字符集里面使用的时候，像`.`和`+`这样的元字符将被解释为普通字符,不需要被转义---转义了也没坏处.`[\w.]`的使用效果与`[\w\.]`是一样的
:::

正则：


RegExp 对象

RegExp 对象表示正则表达式，它是对字符串执行模式匹配的强大工具

直接量语法：

/pattern/attributes

创建RegExp对象的语法：

new RegExp(pattren,attributes)

参数：

参数pattern是一个字符串，指定了正则表达式的模式或其他正则表达式

参数attributes是一个可选字符串，包含属性g（全局匹配）、i（区分大小写）、m（多行匹配）

返回值：

一个新的RegExp对象，具有指定的模式和标志，如果参数pattern是正则表达式而不是字符串

那么RegExp()构造函数将用与指定的RegExp相同模式和标志创建一个新的RegExp对象

如果不用new运算符，而将regexp()作为函数调用，那么他的行为与用wen运算符调用时一样，

只是当pattern是正则表达式室，他只返回pattern，不是在创建一个新的regexp对象



test : 方法用于检测一个字符窜是否匹配某个模式

用法： 

regExpObject.test(string)

返回值： true  false


``` js

// 检查输入手机号码是否正确

/^1[3|4|5|7|8]\d{9}$/.test(str)

// 返回true 或者false



```


replace: 用于在字符窜中用一些字符替换另一些字符，或者替换一个与正则表达式匹配的子串

语法： 

stringObject.replace(regexp/substr,replacement)

regexp/substr 必需 规定子字符串或要替换的模式的regexp对象

请注意，如果该值是一个字符串，则将它作为要检索的直接量文本模式，而不是首先被转换为regexp对象

请注意， 无法传入变量


返回值： 一个新的字符窜


``` js

// 检测日期格式

new Date()
// 返回 Fri Mar 24 2017 16:16:19 GMT+0800 (中国标准时间)


var a = "2017年06月01日";
var b = "2017年06月20日";

// 第一种
var a1 = a.replace("年","-").replace("月","-").replace("日","")
// 2017-06-01

// 第二种
var a1 = a.replace(/(\d{4}).(\d{1,2}).(\d{1,2}).+/mg,'$1-$2-$3')
// 2017-06-01

// 第三种
Date.parse(a.replace('年','-').replace('月','-').replace('日',''))

//第四种
var a = "2017年06月01日 10:10:10";
a.replace(/(\d{4}).(\d{1,2}).(\d{1,2}).+ (\d{1,2}).(\d{1,2}).(\d{1,2})/mg,'$1-$2-$3 $4:$5:$6')

Date.parse(a1)
// 方法可解析一个日期时间字符窜，并返回毫秒数
// 格式 ： 2017-01-02 或者 2017/01/01
dateObject.getTime() 
// 结合date对象使用 返回一个毫秒数  dataObject   new Date()



```


match : 可在字符窜内检索指定的值，或找到一个或者多个正则表达式的匹配

语法： 

stringObject.match(searchvalue)  searchvalue 必需 规定要检索的字符串值

stringObject.match(regexp)  regexp 必需 规定要匹配的模式的regexp对象。如果该参数不是regexp对象，则需要首先把它传递给regexp构造函数，将其转换为regexp对象


返回值： 返回指定的值，而不是字符窜位置 （存放匹配结果的数组，该数组的内容依赖于regexp是否具有全局标志g）

如果regexp没有g，那么match()方法就只能在stringObject中执行一次匹配。

如果没有找到任何匹配的文本，match()将返回null。

否则，它将返回一个数组，其中存放了与它找到的匹配文本有关信息。

该数组的第0个元素存放的是匹配文本，而其余的元素存放的是

与正则表达式的子表达式匹配的文本。

除了这些常规的数组元素之外，返回的数组还含有两个对象属性。

index属性声明的是匹配文本的起始字符在stringObject中的位置，

input属性声明的是对stringObject的引用。

如果regexp具有标志g，则match()方法将执行全局检索，找到

stringObject中的所有匹配子字符窜。若没有找到任何匹配的子串，

则返回null。如果找到了一个或者多个匹配子串，则返回一个数组。

不过全局匹配返回的数组的内容与前者大不相同，它的数组元素中

存放的是stringObject中所有的匹配子串，而且也没有index属性或者input属性

注意：在全局检索模式下，match()既不提供与子表达式匹配的文本，也不声明每个匹配子

串的位置。




``` js

验证邮箱

/^\w@\w\.\w$/.test("test.text@text.com")

/^[\w.]+@[\w.]+\.\w+$/.test("test.text@text.com")

/^\w+[\w.]*@[\w.]+\.\w+$/.test("test.text@text.com")

/^((\w)+([\._])?)*(\w)+@((\w)+([\._])?)*(\w)+\.[a-zA-Z]{2,3}$/g.test("ma.xio@ng_a@qq.com")

验证一年的12个月：

^(0?[1-9]|1[0-2])$ 正确格式为：“01”-“09”和“1”“12” 
```







.toString(obj) 可以将所有的数据(类型)都转为字符窜，但是要排除null与undefined
				
obj可以转化进制

String(参数) 可以将null和undefined转换为字符窜，但没法转进制


# js  原生 操作

* scrollWidth,clientWidth,offsetWidth的区别
* http://blog.csdn.net/u014374031/article/details/56011233
* http://www.cnblogs.com/fullhouse/archive/2012/01/16/2324131.html
* http://www.jb51.net/article/61460.htm


### 修改于20170329


var a = '5555[222]333'

a.match(/[(.+?)]/g)  匹配中括号文字


``` js

export function limitFloat(val){
  let sNum = val.toString(); //先转换成字符串类型
  if (sNum.indexOf('.') == 0) {//第一位就是 .
    console.log('first str is .')
    sNum = '0' + sNum
  }
  sNum = sNum.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符
  sNum = sNum.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的
  sNum = sNum.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
  sNum = sNum.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');//只能输入两个小数
  //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
  if(sNum.indexOf(".")< 0 && sNum !=""){
    sNum = parseFloat(sNum);
  }
  return sNum

```