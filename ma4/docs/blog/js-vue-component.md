---
title: 'Vue 动态组件 & 异步组件'
description: '在review代码的时候发现的问题。Vue2[版]'
sidebar: 'auto'
time: '2019-01-01'
prev: ''
next: ''
---


### 动态组件 & keep-alive

在不同组件之间进行动态切换是非常有用的，根据场景不同选择不同使用方式

使用方式一：

`<component :is="xxx"></component>`

使用方式二：

`<component :is="xxx" v-for="it in list" :key="it"></component>`

结合`keep-alive`可以缓存创建过的组件

+ 使用keep-alive出现传值的问题
    - 如果是基本数据类型，只会在初始创建的时候触API，反复点击不会触发任何API
    - 如果是Object（除去null），在初始创建的时候触API，反复点击会触发`watch` `computed`
+ 不使用keep-alive
    - 初始创建的时候是先销毁上一个在创建下一个
    - 如果点击创建好的会先执行新的`created`，再去执行旧的`beforeDestroy`


### 异步组件

在大型应用中，我们可能需要将应用分割成小一些的代码块，并且只在需要的时候才从服务器加载一个模块

`()=>import('@/components/xxx')`

### 精读keep-alive

``` js
/* @flow */
// 正则匹配、数组移除
import { isRegExp, remove } from 'shared/util'
// 获取第一个
import { getFirstComponentChild } from 'core/vdom/helpers/index'

type VNodeCache = { [key: string]: ?VNode };

function getComponentName (opts: ?VNodeComponentOptions): ?string {
    return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern: string | RegExp | Array<string>, name: string): boolean {
    if (Array.isArray(pattern)) {
        return pattern.indexOf(name) > -1
    } else if (typeof pattern === 'string') {
        return pattern.split(',').indexOf(name) > -1
    } else if (isRegExp(pattern)) {
        return pattern.test(name)
    }
    /* istanbul ignore next */
    return false
}

function pruneCache (keepAliveInstance: any, filter: Function) {
    const { cache, keys, _vnode } = keepAliveInstance
    for (const key in cache) {
        const cachedNode: ?VNode = cache[key]
        if (cachedNode) {
        const name: ?string = getComponentName(cachedNode.componentOptions)
        if (name && !filter(name)) {
            pruneCacheEntry(cache, key, keys, _vnode)
        }
        }
    }
}

function pruneCacheEntry (
    cache: VNodeCache,
    key: string,
    keys: Array<string>,
    current?: VNode
) {
    const cached = cache[key]
    if (cached && (!current || cached.tag !== current.tag)) {
        cached.componentInstance.$destroy()
    }
    cache[key] = null
    remove(keys, key)
}

const patternTypes: Array<Function> = [String, RegExp, Array]

export default {
    name: 'keep-alive',
    abstract: true,

    props: {
        include: patternTypes,
        exclude: patternTypes,
        max: [String, Number]
    },

    created () {
        this.cache = Object.create(null)
        this.keys = []
    },

    destroyed () {
        for (const key in this.cache) {
        pruneCacheEntry(this.cache, key, this.keys)
        }
    },

    mounted () {
        this.$watch('include', val => {
        pruneCache(this, name => matches(val, name))
        })
        this.$watch('exclude', val => {
        pruneCache(this, name => !matches(val, name))
        })
    },

    render () {
        //$slot: default property 包括了所有没有被包含在具名插槽中的节点，或 v-slot:default 的内容。
        const slot = this.$slots.default //数据结构 [vnode]
        // 返回 第一个slotVnode的
        const vnode: VNode = getFirstComponentChild(slot)
        // 获取  组件的componentOptions
        const componentOptions: ?VNodeComponentOptions = vnode && vnode.componentOptions
        if (componentOptions) {
        // check pattern
        // 获取组件名称，优先获取组件的name字段，否则是组件的tag
        const name: ?string = getComponentName(componentOptions)
        const { include, exclude } = this
        // name不在inlcude中或者在exlude中则直接返回vnode（没有取缓存） 
        if (
            // not included
            (include && (!name || !matches(include, name))) ||
            // excluded
            (exclude && name && matches(exclude, name))
        ) {
            return vnode
        }

        const { cache, keys } = this
        // 唯一键
        const key: ?string = vnode.key == null
            // same constructor may get registered as different local components
            // so cid alone is not enough (#3269)
            ? componentOptions.Ctor.cid + (componentOptions.tag ? `::${componentOptions.tag}` : '')
            : vnode.key
        if (cache[key]) {
            // 如果存在缓存中则读取缓存内的组件实例
            vnode.componentInstance = cache[key].componentInstance
            // make current key freshest
            // 读取最新的key
            remove(keys, key)
            keys.push(key)
        } else {
            // 不存在则插入VNode
            cache[key] = vnode
            keys.push(key)
            // prune oldest entry
            // 设置了最大数，就删除第一个
            if (this.max && keys.length > parseInt(this.max)) {
            pruneCacheEntry(cache, keys[0], keys, this._vnode)
            }
        }
        // 标记keepalive
        vnode.data.keepAlive = true
        }
        // 返回vnode或者slot第一个发槽内容
        return vnode || (slot && slot[0])
    }
}

```

[Vue动态组件](https://cn.vuejs.org/v2/guide/components.html#%E5%8A%A8%E6%80%81%E7%BB%84%E4%BB%B6)

