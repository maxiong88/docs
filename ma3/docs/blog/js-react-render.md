---
title: react render
description: 'ReactDOM.render、render'
sidebar: 'auto'
time: '2019-03-03'
prev: ''
next: ''
---


我们通过断点调试
`ReactDOM.render(<App />, document.getELementById('main'))`
原理

``` js

程序开始 

+ enableStableConcurrentModeAPIs 启用当前模式
	- 给ReactDOM注入 createRoot 方法
	- 是否存在devtool 、是否是可用的dom、当前窗口是否在一个框架中 !foundDevTools && canUseDOM && window.top顶层窗口 如果窗口本身就是顶层窗口，top属性返回的是对自身的引用。 === window.self是对当前窗口自身的引用
		+ 判断浏览器
		+ 是否在http服务中
	- 冻结RwactDOM对象，赋值给ReactDOM$2、ReactDOM$3、导出reactDom

+ 执行ReactDOM.render()函数
	- element 通过ReactElement 封装返回一个新对象，具体属性 方法自己看吧
	- container 容器
	- callback 回调函数
		
	- 判断容器是否存在
	- container._reactHasBeenPassedToCreateRootDEV
	- return legacyRenderSubtreeIntoContainer（null, element, container, false, callback）
		+ topLevelUpdateWarnings
			- 是不是根容器、是不是DOM的根节点
			- isRootRenderedBySomeReact 强转boolean 是不是有跟节点呈现 
			- getReactRootElementInContainer（container）
				+ 容器不存在返回null
				+ 如果是根节点
					- 返回 Document[代表整个文档（DOM 树的根节点）].documentELement
				+ 如果不是根节点
					- 返回 Element[代表元素].firstChild 
				+ 返回一个 根元素或者子节点 如果不存在返回null
				
``` js
// [103] 从节点获取实例 获取当前节点的实例
function getInstanceFromNode$1(node) {
	  var inst = node[internalInstanceKey];

	  if (inst) {
		if (inst.tag === HostComponent || inst.tag === HostText) {
		  return inst;
		} else {
		  return null;
		}
	  }

	  return null;
}
// [101]
function getReactRootElementInContainer(container) {
  if (!container) {
	return null;
  }

  if (container.nodeType === DOCUMENT_NODE) {
	return container.documentElement; // 如果是document节点，则返回document的根元素只读属性 html
  } else {
	return container.firstChild; // 只读属性返回树中节点的第一个子节点，如果节点是无子节点，则返回 null。
  }
}
// 根级更新错误警告
topLevelUpdateWarnings = function topLevelUpdateWarnings(container) { // [100]
	// container 容器节点 div#root
	// container._reactRootContainer 默认undefined
	// container.nodeType 节点类型， 1 element节点 、9 document节点
	// 第一次进入是 false
	if (container._reactRootContainer && container.nodeType !== COMMENT_NODE) {
	  var hostInstance = findHostInstanceWithNoPortals(container._reactRootContainer._internalRoot.current);

	  if (hostInstance) {
		!(hostInstance.parentNode === container) ? warningWithoutStack$1(false, 'render(...): It looks like the React-rendered content of this ' + 'container was removed without using React. This is not ' + 'supported and will cause errors. Instead, call ' + 'ReactDOM.unmountComponentAtNode to empty a container.') : void 0;
	  }
	}
	
	// true 
	var isRootRenderedBySomeReact = !!container._reactRootContainer;
	
	// 返回null，一个只读属性，返回子节点引用或者html根元素或者null
	var rootEl = getReactRootElementInContainer(container); // [101]
	
	// 返回false，判断是否有非根节点的子元素
	var hasNonRootReactChild = !!(rootEl && getInstanceFromNode$1(rootEl)); // [102]
	
	
	!(!hasNonRootReactChild || isRootRenderedBySomeReact) ? warningWithoutStack$1(false, 'render(...): Replacing React-rendered children with a new root ' + 'component. If you intended to update the children of this node, ' + 'you should instead have the existing children update their state ' + 'and render the new components instead of calling ReactDOM.render.') : void 0;
	
	// 如果不是element节点类型 或者没有tagname 或者tagname不是body 抛出不提倡组件呈现在document.body中，需要渲染到容器元素中
	!(container.nodeType !== ELEMENT_NODE || !container.tagName || container.tagName.toUpperCase() !== 'BODY') ? warningWithoutStack$1(false, 'render(): Rendering components directly into document.body is ' + 'discouraged, since its children are often manipulated by third-party ' + 'scripts and browser extensions. This may lead to subtle ' + 'reconciliation issues. Try rendering into a container element created ' + 'for your app.') : void 0;
  };
  
    function legacyCreateRootFromDOMContainer(container, forceHydrate) {
      var shouldHydrate = forceHydrate || shouldHydrateDueToLegacyHeuristic(container); // First clear any existing content.

      if (!shouldHydrate) {
        var warned = false;
        var rootSibling = void 0;

        while (rootSibling = container.lastChild) {
          {
            if (!warned && rootSibling.nodeType === ELEMENT_NODE && rootSibling.hasAttribute(ROOT_ATTRIBUTE_NAME)) {
              warned = true;
              warningWithoutStack$1(false, 'render(): Target node has markup rendered by React, but there ' + 'are unrelated nodes as well. This is most commonly caused by ' + 'white-space inserted around server-rendered markup.');
            }
          }
          container.removeChild(rootSibling);
        }
      }

      {
        if (shouldHydrate && !forceHydrate && !warnedAboutHydrateAPI) {
          warnedAboutHydrateAPI = true;
          lowPriorityWarning$1(false, 'render(): Calling ReactDOM.render() to hydrate server-rendered markup ' + 'will stop working in React v17. Replace the ReactDOM.render() call ' + 'with ReactDOM.hydrate() if you want React to attach to the server HTML.');
        }
      } // Legacy roots are not async by default.

      var isConcurrent = false;
      return new ReactRoot(container, isConcurrent, shouldHydrate);
    }  
  
function legacyRenderSubtreeIntoContainer(parentComponent, children, container, forceHydrate, callback) {
      {
        topLevelUpdateWarnings(container);
      }

      var root = container._reactRootContainer;

      if (!root) {
		// 如果当前容器没有_reactRootContainer属性别初始安装
        // Initial mount
        root = container._reactRootContainer = legacyCreateRootFromDOMContainer(container, forceHydrate);

        if (typeof callback === 'function') {
          var originalCallback = callback;

          callback = function callback() {
            var instance = getPublicRootInstance(root._internalRoot);
            originalCallback.call(instance);
          };
        } // Initial mount should not be batched.


        unbatchedUpdates(function () {
          if (parentComponent != null) {
            root.legacy_renderSubtreeIntoContainer(parentComponent, children, callback);
          } else {
            root.render(children, callback);
          }
        });
      } else {
        if (typeof callback === 'function') {
          var _originalCallback = callback;

          callback = function callback() {
            var instance = getPublicRootInstance(root._internalRoot);

            _originalCallback.call(instance);
          };
        } // Update


        if (parentComponent != null) {
          root.legacy_renderSubtreeIntoContainer(parentComponent, children, callback);
        } else {
          root.render(children, callback);
        }
      }

      return getPublicRootInstance(root._internalRoot);
} 
```				
			



+ ExecutionEnvironment 判断执行环境
    - 判断浏览器
    - 需要http服务
    - document.documentMode属性返回浏览器渲染文档的模式 只支持IE，如果正式环境小于8，则提示使用浏览器按最新模式渲染 IE=edge
    - expectedFeatures 如果浏览器不支持 提示使用 polyfill

+ ReactInstrumentation  本地开发 错误代码信息提示

+ ReactDOMUnknownPropertyHook

+ ReactDOMNullInputValuePropHook

+ ReactDOMInvalidARIAHook

+ ReactDOM.js render函数
    - nextElement React Element
    - container 容器
    - callback 回调函数 [大家知道callback 回调 是什么吗]()
    - return _renderSubtreeIntoContainer 将子目录呈现到容器中
        + ReactUpdateQueue 更新列队

        + parentComponent 第一次为null、nextContext = {} 初始当前作用域

            - [HTML DOM nodeType 属性](http://www.w3school.com.cn/jsref/prop_node_nodetype.asp)
            - container.nodeType
                - 如果当前容器元素节点类型 等于 默认  9 代表整个文档（DOM 树的根节点）。
                    - 

        + !container || !container.tagName || container.tagName.toUpperCase() !== 'BODY' 不提倡组件呈现在document.body中，需要渲染到容器元素中


```