# 路由

    路由就是用来跟后端服务器进行交互的一种方式，
    通过不同路径，来请求不同的资源，
    请求不同的页面是路由的其中一种功能

# 前端路由诞生

但是随着SPA单页面程序的发展，便出现了前端路由一说。
单页面顾名思义就是一个网站只有一个html页面，但是点击不同的导航显示不同的内容，对应的url也会发生变化，
这就是前端路由做的事。也就是通过JS实时检测url的变化，从而改变显示的内容。


Ajax，全称 Asynchronous JavaScript And XML，是浏览器用来实现异步加载的一种技术方案。

在 90s 年代初，大多数的网页都是通过直接返回 HTML 的，用户的每次更新操作都需要重新刷新页面。
及其影响交互体验，随着网络的发展，迫切需要一种方案来改善这种情况。
1996，微软首先提出 iframe 标签，iframe 带来了异步加载和请求元素的概念，
随后在 1998 年，微软的 Outloook Web App 团队提出 Ajax 的基本概念（XMLHttpRequest的前身），
并在 IE5 通过 ActiveX 来实现了这项技术。在微软实现这个概念后，
其他浏览器比如 Mozilia，Safari，Opera 相继以 XMLHttpRequest 来实现 Ajax。
（  兼容问题从此出现，话说微软命名真喜欢用X，MFC源码一大堆。。）
不过在 IE7 发布时，微软选择了妥协，兼容了 XMLHttpRequest 的实现。
有了 Ajax 后，用户交互就不用每次都刷新页面，体验带来了极大的提升。

但真正让这项技术发扬光大的，(｡･∀･)ﾉﾞ还是后来的 Google Map，它的出现向人们展现了 Ajax 的真正魅力，
释放了众多开发人员的想象力，让其不仅仅局限于简单的数据和页面交互，为后来异步交互体验方式的繁荣发展带来了根基。

而异步交互体验的更高级版本就是 SPA（那么问个问题，异步交互最高级的体验是什么？会在文末揭晓）—— 单页应用。
单页应用不仅仅是在页面交互是无刷新的，连页面跳转都是无刷新的，为了实现单页应用，所以就有了前端路由。

单页应用的概念是伴随着 MVVM 出现的。最早由微软提出，然后他们在浏览器端用 `Knockoutjs` 实现。
但这项技术的强大之处并未当时的开发者体会到，可能是因为 `Knockoutjs` 实现过于复杂，导致没有大面积的扩散。
同样，这次接力的选手依然是 Google。Google 通过 Angularjs 将 MVVM 及单页应用发扬光大，
让前端开发者能够开发出更加大型的应用，职能变得更大了。
（不得不感慨，微软 跟 Google 都是伟大的公司）。
随后都是大家都知道的故事，前端圈开始得到了爆发式的发展，陆续出现了很多优秀的框架。

# 前端路由实现方式

    1. hash hashChange
    2. history history.pushState 和 history.replaceState；

hash即URL中"#"字符后面的部分。
（hash 属性是一个可读可写的字符串，该字符串是 URL 的锚部分（从 # 号开始的部分）。）

　　①、使用浏览器访问网页时，如果网页URL中带有hash，页面就会定位到id（或name）与hash值一样的元素的位置；

　　②、hash还有另一个特点，它的改变不会导致页面重新加载；

　　③、hash值浏览器是不会随请求发送到服务器端的；

　　④、通过window.location.hash属性获取和设置hash值。

window.location.hash值的变化会直接反应到浏览器地址栏（#后面的部分会发生变化），
同时，浏览器地址栏hash值的变化也会触发window.location.hash值的变化，从而触发onhashchange事件。

为了将一个事件侦听器添加到现有的一个事件处理程序集中，使用函数 "addEventListener"。
window.addEventListener("hashchange", funcRef, false);


html5引入了一个history对象，包含了一套访问浏览器历史的api，可以通过window.history访问到它。

HTML5引入了 history.pushState() 和 history.replaceState() 方法，
它们分别可以添加和修改历史记录条目。这些方法通常与window.onpopstate 配合使用。

### pushState() 方法的例子
假设在 http://mozilla.org/foo.html 中执行了以下 JavaScript 代码:

var stateObj = { foo: "bar" };
history.pushState(stateObj, "page 2", "bar.html");
这将使浏览器地址栏显示为 http://mozilla.org/bar.html，但并不会导致浏览器加载 bar.html ，甚至不会检查bar.html 是否存在。

假设现在用户又访问了 http://google.com，然后点击了返回按钮。此时，地址栏将显示 http://mozilla.org/bar.html，同时页面会触发 popstate 事件，事件对象state中包含了 stateObj 的一份拷贝。页面本身与 foo.html 一样，尽管其在 popstate  事件中可能会修改自身的内容。

如果我们再次点击返回按钮，页面URL会变为http://mozilla.org/foo.html，文档对象document会触发另外一个 popstate 事件，这一次的事件对象state object为null。 这里也一样，返回并不改变文档的内容，尽管文档在接收 popstate 事件时可能会改变自己的内容，其内容仍与之前的展现一致。

### pushState() 方法
pushState() 需要三个参数: 一个状态对象, 一个标题 (目前被忽略), 和 (可选的) 一个URL
在某种意义上，调用 pushState() 与 设置 window.location = "#foo" 类似，二者都会在当前页面创建并激活新的历史记录。但 pushState() 具有如下几条优点：

新的 URL 可以是与当前URL同源的任意URL 。而设置 window.location 仅当你只修改了哈希值时才保持同一个 document。
如果需要，你可以不必改变URL。而设置 window.location = "#foo";在当前哈希不是 #foo 的情况下， 仅仅是新建了一个新的历史记录项。
你可以为新的历史记录项关联任意数据。而基于哈希值的方式，则必须将所有相关数据编码到一个短字符串里。 
假如 标题 在之后会被浏览器用到，那么这个数据是可以被使用的（哈希则不然）。
注意 pushState() 绝对不会触发 hashchange 事件，即使新的URL与旧的URL仅哈希不同也是如此。




前端路由的实现其实很简单。
本质上就是检测 url 的变化，截获 url 地址，然后解析来匹配路由规则。
但是这样有人就会问：url 每次变化都会刷新页面啊？页面都刷新了，JavaScript 怎么检测和截获 url？
在 2014 年之前，大家是通过 hash 来实现路由，url hash 就是类似于
`https://segmentfault.com/a/1190000011956628#articleHeader2`
这种 `#`。后面 hash 值的变化，并不会导致浏览器向服务器发出请求，浏览器不发出请求，也就不会刷新页面。
另外每次 hash 值的变化，还会触发 `hashchange` 这个事件，通过这个事件我们就可以知道 hash 值发生了哪些变化。
那么，事情就变得相当简单了。

(低版本中通过轮询来监听hash变化)

### replaceState() 方法
history.replaceState() 的使用与 history.pushState() 非常相似，
区别在于  replaceState()  是修改了当前的历史记录项而不是新建一个。 
注意这并不会阻止其在全局浏览器历史记录中创建一个新的历史记录项。
replaceState() 的使用场景在于为了响应用户操作，你想要更新状态对象state或者当前历史记录的URL

### replaceState() 方法示例

假设 http://mozilla.org/foo.html 执行了如下JavaScript代码：

var stateObj = { foo: "bar" };
history.pushState(stateObj, "page 2", "bar.html");
        上文2行代码可以在 "replaceState() 方法示例" 部分找到。然后，假设http://mozilla.org/bar.html执行了如下 JavaScript：

history.replaceState(stateObj, "page 3", "bar2.html");
        这将会导致地址栏显示http://mozilla.org/bar2.html,，但是浏览器并不会去加载bar2.html 甚至都不需要检查 bar2.html 是否存在。

        假设现在用户重新导向到了http://www.microsoft.com，然后点击了回退按按钮。这里，地址栏会显示http://mozilla.org/bar2.html。假如用户再次点击回退按钮，地址栏会显示http://mozilla.org/foo.html，完全跳过了bar.html。


### popstate 事件

每当活动的历史记录项发生变化时， popstate 事件都会被传递给window对象。
如果当前活动的历史记录项是被 pushState 创建的，或者是由 replaceState 改变的，那么 popstate 事件的状态属性 state 会包含一个当前历史记录状态对象的拷贝
### 获取当前状态
        页面加载时，或许会有个非null的状态对象。这是有可能发生的，举个例子，假如页面（通过pushState() 或 replaceState() 方法）设置了状态对象而后用户重启了浏览器。那么当页面重新加载时，页面会接收一个onload事件，但没有 popstate 事件。然而，假如你读取了history.state属性，你将会得到如同popstate 被触发时能得到的状态对象。

你可以读取当前历史记录项的状态对象state，而不必等待popstate 事件， 只需要这样使用history.state 属性： 

var currentState = history.state;


HTML5标准发布

# 异步交互的最高级体验是什么？   

PWA，让前端页面可以做到离线操作（是不是越来越像原生 app 了？）




# 前端路由在很多开源的js类库框架中都得到支持，如angularJS，vuejs，Reactjs等等。

# react-router  源码解析

React Router 是建立在 history 之上的。 简而言之，一个 history 知道如何去监听浏览器地址栏的变化， 
并解析这个 URL 转化为 location 对象， 然后 router 使用它匹配到路由，最后正确地渲染对应的组件。
常用的 history 有三种形式
    browserHistory
    hashHistory
    createMemoryHistory


    hashHistory

    Hash history 使用 URL 中的 hash（#）部分去创建形如 example.com/#/some/path 的路由。

http://javascript.ruanyifeng.com/bom/history.html

1.概述
浏览器窗口有一个history对象，用来保存浏览历史。
如果当前窗口先后访问了三个网址，那么history对象就包括三项，history.length属性等于3
history对象提供了一系列方法，允许在浏览历史之间移动
`
    back()：移动到上一个访问页面，等同于浏览器的后退键。
    forward()：移动到下一个访问页面，等同于浏览器的前进键。
    go()：接受一个整数作为参数，移动到该整数指定的页面，比如go(1)相当于forward()，go(-1)相当于back()。
`

    history.back();
    history.forward();
    history.go(-2);

如果移动的位置超出了访问历史的边界，以上三个方法并不报错，而是默默的失败

history.go(0)相当于刷新当前页面

常见的“返回上一页”链接，代码如下
document.getElementById('backLink').onclick = function () {
  window.history.back();
}
返回上一页时，页面通常是从浏览器缓存之中加载，而不是重新要求服务器发送新的网页。

2.history.pushState()

HTML5为history对象添加了两个新方法，history.pushState()和history.replaceState()，用来在浏览历史中添加和修改记录。
if (!!(window.history && history.pushState)){
  // 支持History API
} else {
  // 不支持
}
上面代码可以用来检查，当前浏览器是否支持History API。如果不支持的话，可以考虑使用Polyfill库History.js。
history.pushState方法接受三个参数，依次为：
state：一个与指定网址相关的状态对象，popstate事件触发时，该对象会传入回调函数。如果不需要这个对象，此处可以填null。
title：新页面的标题，但是所有浏览器目前都忽略这个值，因此这里可以填null。
url：新的网址，必须与当前页面处在同一个域。浏览器的地址栏将显示这个网址。
假定当前网址是example.com/1.html，我们使用pushState方法在浏览记录（history对象）中添加一个新记录。
var stateObj = { foo: 'bar' };
history.pushState(stateObj, 'page 2', '2.html');
添加上面这个新记录后，浏览器地址栏立刻显示example.com/2.html，但并不会跳转到2.html，甚至也不会检查2.html是否存在，它只是成为浏览历史中的最新记录。这时，你在地址栏输入一个新的地址(比如访问google.com)，然后点击了倒退按钮，页面的 URL 将显示2.html(会请求)；你再点击一次倒退按钮，URL 将显示1.html。
总之，pushState方法不会触发页面刷新，只是导致history对象发生变化，地址栏会有反应。

如果pushState的url参数，设置了一个新的锚点值（即hash），并不会触发hashchange事件。如果设置了一个跨域网址，则会报错。

// 报错
history.pushState(null, null, 'https://twitter.com/hello');
上面代码中，pushState想要插入一个跨域的网址，导致报错。这样设计的目的是，防止恶意代码让用户以为他们是在另一个网站上。

3.history.replaceState()
history.replaceState方法的参数与pushState方法一模一样，区别是它修改浏览历史中当前纪录。

假定当前网页是example.com/example.html。
history.pushState({page: 1}, 'title 1', '?page=1');
history.pushState({page: 2}, 'title 2', '?page=2');
history.replaceState({page: 3}, 'title 3', '?page=3');

history.back()
// url显示为http://example.com/example.html?page=1

history.back()
// url显示为http://example.com/example.html

history.go(2)
// url显示为http://example.com/example.html?page=3

4.history.state属性

history.state属性返回当前页面的state对象。

history.pushState({page: 1}, 'title 1', '?page=1');

history.state
// { page: 1 }

6.popstate 事件

每当同一个文档的浏览历史（即history对象）出现变化时，就会触发popstate事件。

需要注意的是，仅仅调用pushState方法或replaceState方法 ，并不会触发该事件，只有用户点击浏览器倒退按钮和前进按钮，或者使用 JavaScript 调用back、forward、go方法时才会触发。另外，该事件只针对同一个文档，如果浏览历史的切换，导致加载不同的文档，该事件也不会触发。

使用的时候，可以为popstate事件指定回调函数。
window.onpopstate = function (event) {
  console.log('location: ' + document.location);
  console.log('state: ' + JSON.stringify(event.state));
};

// 或者

window.addEventListener('popstate', function(event) {
  console.log('location: ' + document.location);
  console.log('state: ' + JSON.stringify(event.state));
});
回调函数的参数是一个event事件对象，它的state属性指向pushState和replaceState方法为当前 URL 所提供的状态对象（即这两个方法的第一个参数）。上面代码中的event.state，就是通过pushState和replaceState方法，为当前URL绑定的state对象。

这个state对象也可以直接通过history对象读取。

6.URLSearchParams API
URLSearchParams API用于处理URL之中的查询字符串，即问号之后的部分。没有部署这个API的浏览器，可以用url-search-params这个垫片库。

var paramsString = 'q=URLUtils.searchParams&topic=api';
var searchParams = new URLSearchParams(paramsString);
has()：返回一个布尔值，表示是否具有某个参数
get()：返回指定参数的第一个值
getAll()：返回一个数组，成员是指定参数的所有值
set()：设置指定参数
delete()：删除指定参数
append()：在查询字符串之中，追加一个键值对
toString()：返回整个查询字符串

URLSearchParams还有三个方法，用来遍历所有参数。
keys()：遍历所有参数名
values()：遍历所有参数值
entries()：遍历所有参数的键值对

URLSearchParams实例可以当作POST数据发送，所有数据都会URL编码。
let params = new URLSearchParams();
params.append('api_key', '1234567890');

fetch('https://example.com/api', {
  method: 'POST',
  body: params
}).then(...)



1. 什么是路由
在Web开发过程中，经常会遇到『路由』的概念。那么，到底什么是路由？简单来说，路由就是URL到函数的映射。

2. router和route的区别
route就是一条路由，它将一个URL路径和一个函数进行映射，例如：

/users        ->  getAllUsers()
/users/count  ->  getUsersCount()
这就是两条路由，当访问/users的时候，会执行getAllUsers()函数；当访问/users/count的时候，会执行getUsersCount()函数。

而router可以理解为一个容器，或者说一种机制，它管理了一组route。简单来说，route只是进行了URL和函数的映射，而在当接收到一个URL之后，去路由映射表中查找相应的函数，这个过程是由router来处理的。一句话概括就是 “The router routes you to a route“。

3. 服务器端路由
对于服务器来说，当接收到客户端发来的HTTP请求，会根据请求的URL，来找到相应的映射函数，然后执行该函数，并将函数的返回值发送给客户端。对于最简单的静态资源服务器，可以认为，所有URL的映射函数就是一个文件读取操作。对于动态资源，映射函数可能是一个数据库读取操作，也可能是进行一些数据的处理，等等。

以Express为例，

app.get('/', (req, res) => {
  res.sendFile('index')
})

app.get('/users', (req, res) => {
  db.queryAllUsers()
    .then(data => res.send(data))
})
这里定义了两条路由：

当访问/的时候，会返回index页面
当访问/users的时候，会从数据库中取出所有用户数据并返回
不仅仅是URL

在router匹配route的过程中，不仅会根据URL来匹配，还会根据请求的方法来看是否匹配。例如上面的例子，如果通过POST方法来访问/users，就会找不到正确的路由

4. 客户端路由
对于客户端（通常为浏览器）来说，路由的映射函数通常是进行一些DOM的显示和隐藏操作。这样，当访问不同的路径的时候，会显示不同的页面组件。客户端路由最常见的有以下两种实现方案：

基于Hash
基于History API
(1) 基于Hash

我们知道，URL中#及其后面的部分为hash。例如：

const url = require('url')
var a = url.parse('http://example.com/a/b/#/foo/bar')
console.log(a.hash)
// => #/foo/bar
hash仅仅是客户端的一个状态，也就是说，当向服务器发请求的时候，hash部分并不会发过去。

通过监听window对象的hashChange事件，可以实现简单的路由。例如：

window.onhashchange = function() {
  var hash = window.location.hash
  var path = hash.substring(1)

  switch (path) {
    case '/':
      showHome()
      break
    case '/users':
      showUsersList()
      break
    default:
      show404NotFound()
  }
}
(2) 基于History API

通过HTML5 History API可以在不刷新页面的情况下，直接改变当前URL。详细用法可以参考：

Manipulating the browser history
Using the HTML5 History API
我们可以通过监听window对象的popstate事件，来实现简单的路由：

window.onpopstate = function() {
  var path = window.location.pathname

  switch (path) {
    case '/':
      showHome()
      break
    case '/users':
      showUsersList()
      break
    default:
      show404NotFound()
  }
}
但是这种方法只能捕获前进或后退事件，无法捕获pushState和replaceState，一种最简单的解决方法是替换pushState方法，例如：

var pushState = history.pushState
history.pushState = function() {
  pushState.apply(history, arguments)

  // emit a event or just run a callback
  emitEventOrRunCallback()
}
不过，最好的方法还是使用实现好的history库。

(3) 两种实现的比较

总的来说，基于Hash的路由，兼容性更好；基于History API的路由，更加直观和正式。

但是，有一点很大的区别是，基于Hash的路由不需要对服务器做改动，基于History API的路由需要对服务器做一些改造。下面来详细分析。

假设服务器只有如下文件（script.js被index.html所引用）：

/-
 |- index.html
 |- script.js
基于Hash的路径有：

http://example.com/
http://example.com/#/foobar
基于History API的路径有：

http://example.com/
http://example.com/foobar
当直接访问http://example.com/的时候，两者的行为是一致的，都是返回了index.html文件。

当从http://example.com/跳转到http://example.com/#/foobar或者http://example.com/foobar的时候，也都是正常的，因为此时已经加载了页面以及脚本文件，所以路由跳转正常。

当直接访问http://example.com/#/foobar的时候，实际上向服务器发起的请求是http://example.com/，因此会首先加载页面及脚本文件，接下来脚本执行路由跳转，一切正常。

当直接访问http://example.com/foobar的时候，实际上向服务器发起的请求也是http://example.com/foobar，然而服务器端只能匹配/而无法匹配/foobar，因此会出现404错误。

因此如果使用了基于History API的路由，需要改造服务器端，使得访问/foobar的时候也能返回index.html文件，这样当浏览器加载了页面及脚本之后，就能进行路由跳转了。

5. 动态路由
上面提到的例子都是静态路由，也就是说，路径都是固定的。但是有时候我们需要在路径中传入参数，例如获取某个用户的信息，我们不可能为每个用户创建一条路由，而是在通过捕获路径中的参数（例如用户id）来实现。

例如在Express中：

app.get('/user/:id', (req, res, next) => {
  // ... ...
})
在Flask中：

@app.route('/user/<user_id>')
def get_user_info(user_id):
    pass
6. 严格路由
在很多情况下，会遇到/foobar和/foobar/的情况，它们看起来非常类似，然而实际上有所区别，具体的行为也是视服务器设置而定。

在Flask的文档中，提到，末尾有斜线的路径，类比于文件系统的一个目录；末尾没有斜线的路径，类比于一个文件。因此访问/foobar的时候，可能会重定向到/foobar/，而反过来则不会。

如果使用的是Express，默认这两者是一样的，也可以通过app.set来设置strict routing，来区别对待这两种情况。