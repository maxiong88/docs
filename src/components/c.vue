<template>
    <div
        :style="{transform:translate, transitionDuration:transition, width:'100vw'}"
        @mousedown = "startDrag"
        @touchstart = "startDrag"
        @mousemove.stop = "function(event) {
            onDrag(event)
        }"
        @touchmove.stop = "function(event) {
            onDrag(event)
        }"
        @mouseup = "stopDrag"
        @touchend = "stopDrag"
        @mouseleave = "stopDrag"
        @transitionend = "transitionEnd"
        >
            <div class='m-tips m-tips-tp'>
                <div v-if='showArrow && requesting' class='m-loading m-loading-dark'>
                    <span></span><span></span><span></span><span></span><span></span><span></span>
                    <span></span><span></span><span></span><span></span><span></span><span></span>
                </div>
                <i v-else class='m-font m-font-down m-font-down-ani' :class="[{up:dragging && dY > topDistance}]"></i>
                <span v-if='showText'
                class='main-link'
                v-html='status'
                ></span>
            </div>
            <slot></slot>
            <div style="position:fixed"></div>
    </div>
</template>
<script>
import Vue from 'vue'
function r(e) {
    var t = e;
    while (t && "HTML" !== t.tagName && "BODY" !== t.tagName && 1 === t.nodeType) {
        var n = document.defaultView.getComputedStyle(t).overflowY;
        if ("scroll" === n || "auto" === n)
            return t;
        t = t.parentNode
    }
    return document.documentElement
}
export default {
    name: "loadmore",
    created: function() {
        var e = this;
        this.$nextTick(function() {
            e.topBarHeight = e.$el.children[0].clientHeight
        })
        // ,
        // a["a"].$on("mvLoadEnd", function() {
        //     e.loadEnd()
        // }),
        // a["a"].$on("mvLoadStart", function() {
        //     e.scrollTarget.scrollTop = 0,
        //     e.loadStart()
        // })
    },
    mounted: function() {
        this.scrollTarget = r(this.$el)
    },
    props: {
        topDistance: {
            type: Number,
            default: 100
        },
        topPullText: {
            type: String,
            default: "下拉刷新"
        },
        topDropText: {
            type: String,
            default: "加载中..."
        },
        topLoadingText: {
            type: String,
            default: "释放更新"
        },
        showText: {
            type: Boolean,
            default: !0
        },
        showArrow: {
            type: Boolean,
            default: !0
        },
        topMethod: {
            type: Function
        }
    },
    data(){
        return {
            scrollTarget: null,
            topBarHeight: 0,
            requesting: !1,
            dragging: !1,
            startY: 0,
            dY: 0,
            reset: !0
        }
    },
    created(){
        (new Vue()).$on('dddd',function(s,v){console.log(s,v)})
    },
    computed: {
        transition: function() {
            return this.dragging || 0 === this.dY && this.reset ? "0s" : "200ms"
        },
        translate: function() {
            var e = 80 * Math.atan(this.dY / 200) - this.topBarHeight;
            return "translateY(".concat(e, "px)")
        },
        status: function() {
            return this.dragging && this.dY > this.topDistance ? this.topLoadingText : this.requesting ? this.topDropText : this.topPullText
        }
    },
    watch: {
        requesting: function(e) {
            e || (this.dY = 0)
        }
    },
    methods: {
        loadStart: function() {
            this.requesting = !0,
            this.topMethod(),
            this.dY = this.topDistance
        },
        loadEnd: function() {
            this.requesting = !1
        },
        startDrag: function(e) {
            var t = e.changedTouches ? e.changedTouches[0] : e;
            this.scrollTarget.scrollTop <= 0 && (this.startY = t.pageY,
            this.dragging = !0,
            this.reset = !1)
        },
        onDrag: function(e) {
            var t = e.changedTouches ? e.changedTouches[0] : e;
            this.dragging && t.pageY - this.startY > 0 && window.scrollY <= 0 && (e.preventDefault(),
            this.dY = t.pageY - this.startY,
            this.requesting && (this.dY = this.dY + this.topDistance))
        },
        stopDrag: function() {
            this.dragging = !1,
            this.dY > this.topDistance && window.scrollY <= 0 ? this.loadStart() : this.dY = 0
        },
        transitionEnd: function() {
            this.dY !== this.topDistance || this.requesting || (this.dY = 0),
            0 === this.dY && (this.reset = !0)
        }
    }
}
</script>