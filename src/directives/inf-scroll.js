import Vue from 'vue';
import {throttle} from 'lodash-es';
const options = {
    distance: .618 * window.innerHeight, // 距离：浏览器窗口的视口（viewport）高度
    gapTime: 300, // 间隙时间
    visibleHeight: 0, // 可见高度
    firstCheck: false, // 第一次检测
    scrollTarget: null, // 获取具有滚动目标
    scrollListener: null,
    disable: false
}

const scrollT = (domEl) => {
    let el = domEl;
    while(el && 'HTML' !== el.tagName && 'BODY' !== el.tagName && 1 === el.nodeType){
        let n = document.defaultView.getComputedStyle(el).overflowY;
        if('scroll' === n || 'auto' === n){return el}
        el = el.parentNode;
    }
    return window;
}
/**
 *
 *
 * @param {*} e node节点
 * @returns
 * clientHeight 元素内部高度 包含padding，不包含border margin
 * innerHeight 浏览器窗口的视口高度，包括滚动条高度
 */
const DOMHeight = (e) => {
    return e === window ? e.innerHeight : e.clientHeight;
}

const c = (e) => {
    let t = e.el.getBoundingClientRect().bottom - options.visibleHeight;
    t < options.disable && !options.disable && e.vm[e.epr].call();
}

Vue.directive('inf-scroll', {
    bind: function(el, binding, vnode){
        // el 指令所绑定的元素，可以用来直接操作DOM
        // binding 一个对象，包含指令的很多信息
            // name 指令名称
            // value 传递给指令的值。例如v-my-directive="1 + 1"，值为2。
            // oldValue 指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用
            // expression  绑定表达式为字符串。例如v-my-directive="1 + 1"，表达式将是"1 + 1"
            // arg 传递给指令的参数，如果有的话。例如v-my-directive:foo，arg就是"foo"。
            // modifiers:包含修饰符的对象（如果有）。例如v-my-directive.foo.bar，修饰符对象就是{ foo: true, bar: true }。
            // rawName:指令名及参数，包括 v- 前缀和参数
        // vnode Vue编译生成的虚拟节点
        console.log(el, binding, vnode)
        let opt = {
            el: el,
            vm: vnode.context, // 获取当前实例
            epr: binding.expression
        }
        if(options.gatTime = el.getAttribute('gap-time') || options.gapTime,
            options.distance = el.getAttribute('distance') || options.distance,
            options.disabled = el.getAttribute('disabled') || options.disabled,
            options.firstCheck = el.getAttribute('first-check') || options.firstCheck,
            !opt.epr
            ){throw new Error('滚到底后要做什么呢？')}
        let u = false,
            d = function(){
                u = true,
                opt.vm.$nextTick(function(){
                    options.scrollTarget = scrollT(el), // 找到滚动的目标.如果没有overfow-y:auto scroll 就找根元素 window  body
                    options.visibleHeight = DOMHeight(options.scrollTarget) || options.visibleHeight, // 如果是window获取当前浏览器视口的高度，否则获取当前元素的高度
                    options.scrollListener = throttle(function(){
                        c(opt)
                    }, options.gapTime),
                    options.scrollTarget.addEventListener('scroll', options.scrollListener);
                })
            };
            opt.vm.$on('hook:mounted', function(){
                d()
            }),
            opt.vm.$on('hook:updated', function(){
                u || d()
            })
    },
    unbind:function(){
        options.scrollTarget.removeEventListener('scroll', options.scrollListener)
    }
})