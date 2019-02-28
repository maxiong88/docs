---
title: 'js 防抖节流'
description: '防抖与节流函数是一种最常用的 高频触发优化方式，能对性能有较大的帮助。这里不在介绍使用场景，这里只是纯展示代码理解'
sidebar: 'auto'
time: '2017-01-01'
prev: './js-number-format'
next: './js-vue-observer-3'
---

::: tip 防抖和节流的作用都是防止函数多次调用。

区别在于，
假设一个用户一直触发这个函数，
且每次触发函数的间隔小于wait，
防抖的情况下不会触发并从新计算wait时间，直到空闲时间大于await，
节流函数上次执行时间 空闲大于await就会执行。

:::

## 开始实现 `debounce`

通过`inited`来控制是否需要在debounce之前执行一次`func`

每一次执行`debounce`的时候通过清除定时器

好比上电梯，只要外面源源不断的人进入电梯，电梯就不会关闭往上走，必须等人全部进入以后才会向上运行

``` js
// lodash 1.2.1
function debounce(func, wait, options){
    var args,
        result,
        thisArg,
        trailing = true,
        inited,
        timeId;
    function delayed(){
        inited = timeId = null;
        if(traling){
            result = func.apply(thisArg, args)
        }
    }
    if(Object.prototype.toString.call(options) === '[object Object]'){
        leading = options.leading : leading;
        trailing = options.trailing : trailing;
    }
    return function(){
        args = arguments;
        thisArg = this;
        clearTimeout(timeId);
        if (!inited && leading) {
            inited = true;
            result = func.apply(thisArg, args);
        } else {
            timeId = setTimeout(delayed, wait);
        }
        return result;
    }
}

```

## 开始实现 `throttle`

每隔一段时间必须执行一次

也比如上电梯，如果在某一个楼层等待超时以后，电梯就会发出报警信息提示必须关闭电梯门

``` js
// lodash 1.2.1
function throttle(func, wait, options){
    var args,
        result,
        thisArg,
        timeId,
        lastCalled = 0,
        leading = true,
        trailing = true;
    
    function trailingCall(){
        timeId = null;
        if(trailing){
            lastCalled = new Date;
            result = func.apply(thisArg, args);
        }
    }
    if(Object.prototype.toString.call(options) === '[object Object]'){
        leading = options.leading : leading;
        trailing = options.trailing : trailing;
    }
    return function(){
        var now = new Date;
        if(!timeId && !leading){
            lastCalled = now;
        }
        var remaining = wait - (now - lastCalled);
        args = arguments;
        thisArg = this;

        if (remaining <= 0) {
          clearTimeout(timeId);
          timeId = null;
          lastCalled = now;
          result = func.apply(thisArg, args);
        }else if (!timeId) {
          timeId = setTimeout(trailingCall, remaining);
        }
        return result;
    }

}
```

``` js
// lodash 4.11 书写还不完善
function debounce(func, wait, options) {
    let lastArgs, // 入参
        lastThis, // 作用域
        maxWait, // 最大等待时间
        result, // 返回值
        timerId, // 定时器对象
        lastCallTime // 上一次调用debounce函数时间

    let lastInvokeTime = 0 // 上一次执行func函数时间
    let leading = false // 是否立即出发func函数
    let maxing = false // 是否存在最大等待时间
    let trailing = true // 是否在等待周期结束以后执行func

    // Bypass `requestAnimationFrame` by explicitly setting `wait=0`.
    // const useRAF = (!wait && wait !== 0 && typeof root.requestAnimationFrame === 'function')

    if (typeof func !== 'function') {
        throw new TypeError('Expected a function')
    }
    wait = +wait || 0
    if (Object.prototype.toString.call(options) === '[object Object]') {
        leading = !!options.leading
        maxing = 'maxWait' in options
        maxWait = maxing ? Math.max(+options.maxWait || 0, wait) : maxWait
        trailing = 'trailing' in options ? !!options.trailing : trailing
    }

    function invokeFunc(time) {
        const args = lastArgs
        const thisArg = lastThis

        lastArgs = lastThis = undefined
        lastInvokeTime = time
        result = func.apply(thisArg, args)
        return result
    }

    function startTimer(pendingFunc, wait) {
        // if (useRAF) {
        // root.cancelAnimationFrame(timerId);
        // return root.requestAnimationFrame(pendingFunc)
        // }
        return setTimeout(pendingFunc, wait)
    }

    function cancelTimer(id) {
        // if (useRAF) {
        // return root.cancelAnimationFrame(id)
        // }
        clearTimeout(id)
    }

    function leadingEdge(time) {
        // Reset any `maxWait` timer.
        lastInvokeTime = time
        // Start the timer for the trailing edge.
        timerId = startTimer(timerExpired, wait)
        // Invoke the leading edge.
        return leading ? invokeFunc(time) : result
    }

    function remainingWait(time) {
        const timeSinceLastCall = time - lastCallTime
        const timeSinceLastInvoke = time - lastInvokeTime
        const timeWaiting = wait - timeSinceLastCall

        return maxing
        ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke)
        : timeWaiting
    }

    function shouldInvoke(time) {
        const timeSinceLastCall = time - lastCallTime
        const timeSinceLastInvoke = time - lastInvokeTime

        // Either this is the first call, activity has stopped and we're at the
        // trailing edge, the system time has gone backwards and we're treating
        // it as the trailing edge, or we've hit the `maxWait` limit.
        return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
        (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait))
    }

    function timerExpired() {
        const time = Date.now()
        if (shouldInvoke(time)) {
        return trailingEdge(time)
        }
        // Restart the timer.
        timerId = startTimer(timerExpired, remainingWait(time))
    }

    function trailingEdge(time) {
        timerId = undefined

        // Only invoke if we have `lastArgs` which means `func` has been
        // debounced at least once.
        if (trailing && lastArgs) {
        return invokeFunc(time)
        }
        lastArgs = lastThis = undefined
        return result
    }

    function cancel() {
        if (timerId !== undefined) {
        cancelTimer(timerId)
        }
        lastInvokeTime = 0
        lastArgs = lastCallTime = lastThis = timerId = undefined
    }

    function flush() {
        return timerId === undefined ? result : trailingEdge(Date.now())
    }

    function pending() {
        return timerId !== undefined
    }

    function debounced(...args) {
        const time = Date.now()
        const isInvoking = shouldInvoke(time)

        lastArgs = args
        lastThis = this
        lastCallTime = time

        if (isInvoking) {
        if (timerId === undefined) {
            return leadingEdge(lastCallTime)
        }
        if (maxing) {
            // Handle invocations in a tight loop.
            timerId = startTimer(timerExpired, wait)
            return invokeFunc(lastCallTime)
        }
        }
        if (timerId === undefined) {
        timerId = startTimer(timerExpired, wait)
        }
        return result
    }
    debounced.cancel = cancel
    debounced.flush = flush
    debounced.pending = pending
    return debounced
}


function debounce(func, wait, options) {
    let lastArgs, // 参数
        lastThis, // 作用域
        timerId, // 定时器对象
        lastCallTime // 触发事件时间戳

    let leading = false // 是否立即执行一次
    let trailing = true // 延迟时间到了以后是否执行一次

    if (typeof func !== 'function') {
        throw new TypeError('Expected a function')
    }
    wait = +wait || 0
    if (Object.prototype.toString.call(options) === '[object Object]') {
        leading = 'leading' in options ? !!options.leading : leading
        trailing = 'trailing' in options ? !!options.trailing : trailing
    }
    function invokeFunc() {
        // func函数执行 
        func.apply(lastThis, lastArgs)
    }

    function startTimer(pendingFunc, wait) {
        // 启动定时器
        return setTimeout(pendingFunc, wait)
    }

    function leadingEdge() {
        // 开启定时器
        timerId = startTimer(timerExpired, wait)
        // 是否是在函数调用之前启动一次
        return leading ? invokeFunc() : undefined
    }

    function remainingWait(time) { // 剩余等待时间
        // 定时器回调函数结束时间 - 上一次用户触发debounced事件的时间
        const timeSinceLastCall = time - lastCallTime
        // wait - 
        const timeWaiting = wait - timeSinceLastCall

        return timeWaiting
    }

    function shouldInvoke(time) {
        // 调用func函数的判定条件【开关】
        // time 定时器回掉函数执行开始时间 lastCallTime 上一次用户触发debounced时间
        const timeSinceLastCall = time - lastCallTime
        // 用户只触发一次debounced 返回 true lastCallTime === undefined
        // 用户停止触发debounced  返回 true timeSinceLastCall >= wait
        // 系统时间倒退了 返回 true timeSinceLastCall < 0
        return timeSinceLastCall >= wait
    }

    function timerExpired() {
        //  定时器的回调函数 ,用来判断触法事件的时间差
        const time = Date.now()
        if (shouldInvoke(time)) {
            return trailingEdge()
        }
        // Restart the timer.
        timerId = startTimer(timerExpired, remainingWait(time))
    }

    function trailingEdge() {
        timerId = undefined // 重置定时器对象
        // 只有当我们有`lastArgs`时才会调用，这意味着`func`至少已被去抖过一次。[执行过denounced函数]
        if (trailing && lastArgs) {
            return invokeFunc()
        }
    }


    function debounced(...args) {
        // 要返回的函数
        const time = Date.now() // 用户触发事件的时间

        lastArgs = args  // 入参
        lastThis = this // 作用域
        lastCallTime = time // 将用户触发事件的时间赋值给lastCalltime，即上一次调用debounced时间

        if (timerId === undefined) {
            return leadingEdge()
        }
    }
    return debounced
}

```

