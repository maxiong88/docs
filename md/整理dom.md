DOM 元素、节点、对象

DOM 文档对象模型（Document Object Model）使用来呈现以及任意HTML、XML交互的API文档

DOM 把整个页面映射为一个多层节点结构

借助DOM提供的API，可以轻松的删除、添加、替换或修改任何节点

DOM1 映射文档的结构

DOM2 定义新类型与接口
    DOM 视图
    DOM 事件
    DOM 样式
    DOM 遍历和范围

DOM3 
    DOM 加载保存
    DOM 验证

    https://segmentfault.com/a/1190000010096549

DOM 被设计用于解析HTML页面文档，方便js语言通过DOM访问和操作HTML页面中的内容

DOM并非js语言

各大浏览器将DOM的标准规范内容封装成了js语言所支持的形式

DOM
    D Document 将一个页面表示为一个文档 （DOM将HTML页面解析为一个文档。同时提供了document对象）
    O Object 将页面的每个元素表示为一个对象。例如body元素在DOM中对应的是HTMLBodyElement对象
    M Model 表示每个对象之间的关系 (主要是DOM树结构)

DOM 的作用
通过 W3C 的定义，我们还可以知道 DOM 主要是用来解析 HTML 页面的。也就是只要支持 DOM 的标准规范的开发语言，都可以通过 DOM 访问和更新 HTML 页面的内容、结构和样式。

https://juejin.im/post/587f4afb61ff4b00651b3c18

DOM是Document Object Model（文档对象模型）的缩写。它是为HTML和XML定义的一个编程接口，提供了文档的结构化表示（节点树状结构），同时也规定了使用脚本编程语言（例如JavaScript）应该如何访问以及操作DOM。这样一个节点树状结构是由不同的元素、父节点、子节点、兄弟节点等构成，它们彼此都有层级化的关系。

简单的讲，当你使用一个类似Chrome开发者工具的东东时，你可以看到一个可视化的DOM。你的HTML并不是DOM，但Chrome开发者工具为你展现了一个经过HTML或JavaScript加工之后的DOM。所以你可以把DOM理解成解析后的HTML。

http://www.jianshu.com/p/9eb00403cc81