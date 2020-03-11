---
title: '[转载]前端架构杂思录：议 Function Component 与 Hooks'
description: ''
sidebar: 'auto'
time: '2019-04-01'
prev: ''
next: ''
---

[taobaofed.org](//taobaofed.org/blog/2018/11/27/hooks-and-function-component/)

最近团队里 @大果 分享了 React Hooks，也尝试讨论下 Function Component 与 React Hooks，技术的发展路径总是逐步降低其门槛，简单从轻量级角度我们做一个排序：

`createClass Component > Class Component > Function Component`

技术上 Class Component 是可以完全代替 createClass Component 方式，所以已经是废弃不推荐使用，那是不是 Function Component 也可以完全替代 Class Component？在没有 Hooks 之前显然是无法做到的。

``` js
function Hey(props, context) {
  return <span>Good {props.boy}</span>
}
```
Function Component 没有内部状态变化机制，只能从外部进行状态的驱动，组件的可测试性也非常高，是一个没有争议的 Good Design。

但这个 Design 并没法替代 Class Component，只是一个可选。所以现实是无论一个组件内部是不是有状态，大部分开发者一定是用思维惯性在编程，或者说 make it work first，都用 Class Component 没毛病。

但当下基于 Class Component 的 React 应用有哪些小问题？

第一，曾经 createClass 不用关心 this 的问题，现在很糟心，比如下面 handleClick 的 this 并不是当前 Hey 类的实例，一不小就异常，这虽然不是 Class Component 的锅，但确实是用户侧存在的多数问题。
``` js
class Hey extends Component {
  state = {
    name: 'yiyi',
    emoji: '😊';
  };

  handleClick() {
    // throw error
    this.setState({
      emoji: '😢'
    });
  }
  render() {
    return <span onClick={this.handleClick}>Hey {this.state.name}, {this.state.emoji}</span>
  }
}
```
第二，当前的 React 应用很容易陷入 标签嵌套地狱 的情形，比如下面用到 Context 的场景就非常典型，看着眼花缭乱。在数据同步场景里，
因为需要通知更新所有引用数据的地方，所以通过 render-props 形式定义在 Context.Consumer 的 Children 中，使用到越多的 Context 就会导致嵌套越多的层级，这简直是噩梦。
``` js
render() {
  return (
    <FooContext.Provider value={this.state.foo}>
      <BarContext.Provider value={this.state.bar}>
        <BarContext.Consumer>
          {bar => (
            <FooContext.Consumer>
              {foo => (
                console.log(bar, foo)
              )}
            </FooContext.Consumer>
          )}
        </BarContext.Consumer>
      </BarContext.Provider>
    </FooContext.Provider>
  )
}
```
第三，一些有状态的逻辑比较难重用。这个其实不算 React 独有的问题，只能说当前主流前端架构体系里都没有很好的解决方案。

因此 React 团队基于 Function Component 提出 Hooks 的概念，Hooks 有几个关键 API: useState、useEffect、useContext。这些 API 让 React 更 Reactive：

``` js
import { useState, useContext, useEffect, createContext } from 'react';
const FooContext = createContext('foo');
const BarContext = createContext('bar');

function Hey(props, context) {
  const [name, setName] = useState('yiyi');
  const [emoji, setEmoji] = useState('😊');

  const foo = useContext(FooContext);
  const bar = useContext(BarContext);

  const handleClick = () => setEmoji('😢');

  useEffect(() => {
    console.log('componentDidMount or componentDidUpdate');
    return () => {
      console.log('componentWillUnmount');
    }
  }, [name]);

  return (
    <>
      <span onClick={handleClick}>Hey {name}, {emoji}</span>

      <FooContext.Provider>
        <BarContext.Provider>
          {foo}, {bar}
        </BarContext.Provider>
      </FooContext.Provider>
    </>
  )
}
```

基于 Function Component 与 Hooks 整体代码是比较简洁的，也直接避免了 this 指向的问题，对比上文中 标签嵌套地狱 的代码，尤其使用 useContext 看起来的确舒服太多了，在使用 Context 的地方尽量通过 Function Component 结合 useContext hook 应该是未来的最佳实践。

Hooks 在架构上最值得称赞是提供一种有状态逻辑的复用机制，并且是通过组合的方式。如下使用 hooks 机制对页面是否可见状态的封装：

``` js
let { useState, useEffect } = require('react');

function useDocumentVisibility() {
  let [documentVisibility, setDocumentVisibility] = useState(document.visibilityState);

  function handleVisibilityChange() {
    setDocumentVisibility(document.visibilityState);
  }

  useEffect(() => {
    window.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      window.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return documentVisibility;
}

function Hey() {
  let documentVisibility = useDocumentVisibility();
  return {documentVisibility === 'visible' ? <span>hi</span>: null}
}
```

通过 Hooks 可以方便的把状态关注点进行分离，每一个状态分离后可复用，对于一个高复杂逻辑的项目，往往有非常多的业务数据状态，比如A页面与B页面都有一个登录状态需要同步，在原先我们的做法需要主动去关注状态与渲染之间的关系：

``` js
class A extends Component {
  state = {
    isLogin: getLoginState()
  }
  componenetDidMount() {
    LoginManager.on('status', (status) => { this.setState({isLogin: status})})
  }
  render() {
    return {this.state.isLogin ? <span>A</span> : null }
  }
}

class B extends Component {
  state = {
    isLogin: getLoginState()
  }
  componenetDidMount() {
    LoginManager.on('status', (status) => { this.setState({isLogin: status})})
  }
  render() {
    return {this.state.isLogin ? <span>B</span> : null }
  }
}
```

可以明显的察觉到两个页面为了做登录状态同步的事情，感觉 80% 的代码都是冗余重复的，如果使用 Hooks 就是完全不同的情形：

``` js
function useLogin(){
  const [isLogin, setLogin] = useState(getLoginState());
  LoginManager.on('status', (status) => { setLogin(status)});
  return isLogin;
}

function A() {
  const isLogin = useLogin();
  return {isLogin ? <span>A</span> : null }
}

function B() {
  const isLogin = useLogin();
  return {isLogin ? <span>B</span> : null }
}
```

细心的同学可能会发现 Function Component 在 re-render 时除了纯粹的 render 代码之外 useState 也是重复被申明与执行了的，这在逻辑上似乎有些不合常理，为什么下面代码重复被执行组件内上一次的 state 依旧还在？

``` js
const [name, setName] = useState('yiyi');
const [emoji, setEmoji] = useState('😊');
```

这里我们了解下 useState 的工作原理，看如下 useState 实现原理的示例代码，引擎通过代码上 useState 的执行顺序在内部维护一个 stateIndex 来识别当前是哪一个 state，并且只在第一次 render 时的才接受 initState, re-render 的时候从内部维护 state 存储器中获取上一次的 state 值。

```js
let stateIndex = 0;
let currentComponentInstance = null;
let isComponentDidMount = false;

function useState(initState) {
  const index = ++stateIndex;
  const privateStateStore = currentComponentInstance._state;
  if (!isComponentDidMount) {
    privateStateStore[index] = initState;
  }

  // 示例代码只考虑简单的数据类型
  const stateUpdater = (state) => privateStateStore[index] = state;

  const [privateStateStore[index], stateUpdater];
}
```

从内部原理实现角度，这个方案并不优雅，解决了问题但坑也比较大，比方说：useState 的执行顺序要在每次 render 时必须保持一致，否则 stateIndex 的顺序就会错乱，对于不熟悉个约定的新手来说是一个噩梦，这个问题一旦发生非常难调试。有人提议借助 Lint 来规避这个问题，这是典型的填补一个坑通过挖另一个坑来解决。

关于生命周期，使用 useEffect 基本解决了在 Fuction Component 无生命周期的问题，但这也是有代价的，显然 useEffect 在语义上抽象的不确定的，最糟糕的是 useEffect 约定了 return 的函数执行时机等价与 componentWillUnmount 执行时机，表达上比较晦涩，给代码的可读性上带来了些许的不愉快。要清楚 useEffect 并没有避免生命周期的概念，只是用一种方式隐藏了他们，这种隐藏方式我理解是基于 Fuction Component 的一种无奈。

此外 Function Component 还有一个特点是外部对组件的操作只能通过 props 进行控制，所以组件暴露方法来控制组件内部状态的方式不存在了，理想上能统一使用 Function Component 在架构上这一个益处，外部接口暴露更一致了，但只是理想。

结尾，复杂应用尽可能使用 Function Component + Hooks 是值得推荐的，这是更美好的明天。