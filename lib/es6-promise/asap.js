// Node.js和浏览器的高优先级任务队列
let len = 0;
let vertxNext;
let customSchedulerFn;

export var asap = function asap(callback, arg) {
  queue[len] = callback;
  queue[len + 1] = arg;
  len += 2;
  if (len === 2) {
    // If len is 2, that means that we need to schedule an async flush.
    // If additional callbacks are queued before the queue is flushed, they
    // will be processed by this flush that we are scheduling.
    if (customSchedulerFn) {
      customSchedulerFn(flush);
    } else {
      scheduleFlush();
    }
  }
}

export function setScheduler(scheduleFn) {
  customSchedulerFn = scheduleFn;
}

//export function setAsap(asapFn) {
//  asap = asapFn;
//}

const browserWindow = (typeof window !== 'undefined') ? window : undefined;
const browserGlobal = browserWindow || {};
const BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
// node 环境
// const isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

// test for web worker but not in IE10
// web worker 是运行在后台的 JavaScript，不会影响页面的性能。
// 通过使用Web Workers，Web应用程序可以在独立于主线程的后台线程中，运行一个脚本操作。这样做的好处是可以在独立线程中执行费时的处理任务，从而允许主线程（通常是UI线程）不会因此被阻塞/放慢。
const isWorker = typeof Uint8ClampedArray !== 'undefined' &&
  typeof importScripts !== 'undefined' &&
  typeof MessageChannel !== 'undefined';

// node
// function useNextTick() {
  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
  // see https://github.com/cujojs/when/issues/410 for details
  // return () => process.nextTick(flush);
// }

// vertx 是一个事件驱动的应用程序框架
// function useVertxTimer() {
//  if (typeof vertxNext !== 'undefined') {
//    return function() {
//      vertxNext(flush);
//    };
//  }

//  return useSetTimeout();
// }

function useMutationObserver() {
  let iterations = 0;
  // 返回一个mutationObserver的实例，如果dom树更改了执行回调函数flush
  const observer = new BrowserMutationObserver(flush);
  const node = document.createTextNode('');
  // 跟踪字符修改
  observer.observe(node, { characterData: true });
	// 当node.data变动时 调用 flush函数
  return () => {
    node.data = (iterations = ++iterations % 2);
  };
}

// web worker
// postmessage https://developer.mozilla.org/zh-CN/docs/Web/API/Window/postMessage
// channel_message_api https://developer.mozilla.org/zh-CN/docs/Web/API/Channel_Messaging_API
function useMessageChannel() {
	// 创建一个新的消息通道，并通过它的两个MessagePort 属性发送数据。
  const channel = new MessageChannel();
  channel.port1.onmessage = flush; //  port1 返回消息通道的第一个端口, 此端口连接到源上下文通道。 接收消息
  return () => channel.port2.postMessage(0); //  port2 是一个只读属性，返回消息通道的第二个端口，该端口连接到通道另一端的上下文，也就是发送消息时的目的地，有port1传给 port2 的值 
}

// settimeout
function useSetTimeout() {
  // Store setTimeout reference so es6-promise will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  const globalSetTimeout = setTimeout;
  return () => globalSetTimeout(flush, 1);
}
// 执行
const queue = new Array(1000);
function flush() {
  for (let i = 0; i < len; i+=2) {
    let callback = queue[i];
    let arg = queue[i+1];

    callback(arg);

    queue[i] = undefined;
    queue[i+1] = undefined;
  }
// 执行完毕的方法 参数 重置成undefined
  len = 0;
}

// function attemptVertx() {
//  try {
//    const vertx = Function('return this')().require('vertx');
//    vertxNext = vertx.runOnLoop || vertx.runOnContext;
//    return useVertxTimer();
//  } catch(e) {
//    return useSetTimeout();
//  }
// }

// 执行优先级
// node、mutationObserver、messageChannel、vertx、settimeout
let scheduleFlush;
// Decide what async method to use to triggering processing of queued callbacks:
if (isNode) {
  //scheduleFlush = useNextTick();
} else if (BrowserMutationObserver) {
  scheduleFlush = useMutationObserver();
} else if (isWorker) {
  scheduleFlush = useMessageChannel();
} else if (browserWindow === undefined && typeof require === 'function') {
  //scheduleFlush = attemptVertx();
} else {
  scheduleFlush = useSetTimeout();
}
