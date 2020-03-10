---
title: eventLoop 事件循环机制
description: '翻译了一部分'
sidebar: 'auto'
time: '2020-01-01'
prev: ''
next: ''
---


:::tip js 是单线程语言

JS运行在浏览器中，是单线程的，每个进程一个JS线程，
既然是单线程的，在某个特定的时刻只有特定的代码能够被执行，并阻塞其它的代码(其他任务都必须在后面排队等待)

单线程模型带来了一些问题，主要是新的任务被加在队列的尾部，只有前面的所有任务运行结束，才会轮到它执行。
如果有一个任务特别耗时，后面的任务都会停在那里等待，造成浏览器失去响应，又称“假死”
JavaScript语言的设计者意识到，这时CPU完全可以不管IO设备，挂起处于等待中的任务，先运行排在后面的任务。等到IO设备返回了结果，再回过头，把挂起的任务继续执行下去。
这种机制就是JavaScript内部采用的Event Loop。
:::

:::tip js 调用栈 (call stack)

调用栈是一种栈结构,它用来存储计算机程序执行时候其活跃子程序的信息。

调用栈其实就是一种解析器去处理程序的机制，它是栈数据结构。它能追踪子程序的运行状态。
（1）当脚本要调用一个函数时，解析器把该函数添加到栈中并且执行这个函数。并形成一个栈帧
（2）任何被这个函数调用的函数会进一步添加到调用栈中，形成另一个栈帧,并且运行到它们被上个程序调用的位置。
（3）当执行完这个函数后，如果它没有调用其他函数，则它会从调用栈中推出。然后调用栈继续运行其他部门。
（4) 异步函数的回调函数一般都会被添加到运行队列里面，如settimeout会在响应的时间后把回调函数放入队列中，队列里的函数需要等栈为空时才会被推入栈中执行。如果队列中有其他函数，需要等队列前面的函数被堆入调用栈中之后才会运行。
:::

> 任务队列 task queue
>>同步任务（synchronous）同步任务指的是，在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务
>>异步任务（asynchronous）异步任务指的是，不进入主线程、而进入"任务队列"（task queue）的任务，只有"任务队列"通知主线程，某个异步任务可以执行了，该任务才会进入主线程执行

所有同步任务都在主线程上执行，形成一个执行栈（execution context stack）。

# Event loops

+ 关键字
    - agent : An agent comprises a set of ECMAScript execution contexts, an execution context stack, a running execution context, a set of named job queues, an Agent Record, and an executing thread. Except for the executing thread, the constituents of an agent belong exclusively to that agent.【代理包括一组ECMAScript执行上下文、一个执行上下文堆栈、一个正在运行的执行上下文、一组命名工作队列、一个代理记录和一个正在执行的线程。除了执行线程，代理的组成部分只属于该代理。】


## 定义

像事件调用、交互、scripts、渲染、网络等，都属于事件循环。[在将来，这个标准希望能够准确地定义什么是事件循环]

+ window event loop 窗口事件循环
+ worker event loop 工作进程事件循环
+ worklet event loop 工作集事件循环

事件循环具有一个或多个任务队列[task queue]。任务队列是一组任务。任务队列是按顺序排列的任务列表.

任务队列【task queue】是集合，而不是队列，因为++事件循环处理模型++的第一步从所选队列中获取第一个可运行的任务，而不是将第一个任务从队列中取出.

微任务队列[microtask queue]不是任务队列。

##### Tasks 在以下任务中触发：

+ Events
    - 在特定的EventTarget对象上异步调度事件对象 通常是有一个专门的任务来完成的【是一项任务】
    - 并非所有事件都是使用任务队列调度的；许多事件在其他任务期间调度
+ Parsing 语法分析/解析
    - HTML解析器标记一个或多个字节，然后处理任何生成的标记，通常是一项任务。
+ Callbacks 回调
    - 异步调用回调是一项任务。【调用回调通常由专用任务完成】
+ Using a resource 使用资源
    - 当算法提取资源时，如果提取是异步进行【非阻塞的方式进行】的，那么一旦部分或全部资源可用，资源的处理就是一项任务【资源的处理就由一个任务执行】。
+ Reacting to DOM manipulation 对DOM操作的反应
    - 有些元素具有响应DOM操作而触发的任务，例如，当该元素插入到文档中时。

##### 在形式上，任务有以下结构构成：

+ Steps ,指定任务要完成的工作的一系列步骤。
+ A source, 任务源之一，用于对相关任务进行分组和序列化
+ A document, 文本相关任务，对于不在窗口事件循环中的任务，为空。
+ A script evaluation environment settings object set， A set of environment settings objects used for tracking script evaluation during the task.

如果浏览器上下文不为空或者激活状态，task是就绪状态.

每个事件循环都与特定的任务列队相关联

每个事件循环都有一个当前正在运行的任务，该任务可以是任务，也可以是空的。最初，这是空的。它用于处理可重入性。

每个事件循环都有一个微任务队列，它是一个微任务队列，最初为空。微任务是指通过队列微任务算法创建的任务的一种口语方式。

每个事件循环都有一个执行微任务检查点布尔值，初始值为false。它用于防止执行微任务检查点算法的可重入调用。

## 列队 Queuing tasks



## Processing model

事件循环存在必须按以下步骤执行：

+ 让 taskQueue 成为事件循环的任务列队之一，所选任务列队必须至少包含一个可运行任务。如果没有这样的任务列队，然后跳到下面的微任务步骤【microtask】
+ 让 oldestTask 成为 taskQueue中第一个可运行的任务，并将其从 taskQueue 中移除
+ 将事件循环当前正在运行的任务设置为 oldestTask
+ 让 taskStartTime be the current high resolution time.
+ 执行 oldestTask 的步骤。
+ 将当前正在运行的任务设置为null
+ Microtasks: Perform a microtask checkpoint. 执行微任务检查
+ Let now be the current high resolution time. [HRT]

在进行微任务的时候，有一个 performing a microtask checkpoint 检查是否执行微任务标记，避免再次进入（当前微任务结束以后，检查点设为false）

## Generic task sources

暂无

## 处理来自其他规范的事件循环

暂无


[w3官网](//www.w3.org/TR/2011/WD-html5-20110525/webappapis.html#event-loop)
[whatwg官网](//html.spec.whatwg.org/multipage/webappapis.html#event-loops)




我是一种单线程并发语言。

我有一个`call stack`[调用栈、调用堆栈、函数调用栈]，一个`event loop`[事件循环]，一个`callback queue`[回调列队]，以及一些api和特性[APIS and stuff]

为什么回调是一种事件，回调地狱

什么是JavaScript运行时的简化视图：

heap 是内存分配发生的地方，

然后调用堆栈`call stack`，也就是堆栈帧所在位置，诸如此类的东西

js是一种单线程编程语言，单线程运行时，它有一个调用堆栈。它一次只能做一件事，这就是单线程的意思，程序可以一次运行一段代码





理解事件循环如何运行对于代码优化是重要的，有时对于正确的架构也很重要。

事件循环有xian'shi