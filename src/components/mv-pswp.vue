<template>
    <div
        class='pswp'
        tabindex = -1
        role = 'dialog'
        aria-hidden = true
        >
        <div ref='pswp_bg' class='pswp_bg'></div>
        <div v-if='liveLoading' class='m-loading m-loading-dark'>
            <span></span><span></span><span></span><span></span><span></span>
            <span></span><span></span><span></span><span></span><span></span>
        </div>
        <div class='pswp__scroll-wrap'>
            <div class='pswp__ui pswp__ui--hidden'>
                <div :class="[isInApp && listLen > 1 ? 'pswp-hide' : '']" class='pswp__top-bar'></div>
                <div class='pswp__counter'>
                    <div v-if='currentVideoSrc' :class='["m-guide", "m-guide-live", currentVideoSrc ? "fade" : ""]'>
                        点击可播放
                        <span class='m-arr-top'></span>
                    </div>
                    <button class='pswp__button pswp__button--close' title='Close (Esc)'></button>
                    <div v-if='isIos' class='m-guide' :class='[isGuideShow ? "" : "m-guide-hide"]'>
                        长按保存哦！
                        <span class='m-arr-top'></span>
                    </div>
                    <a
                        v-if='isIos'
                        target='_blank'
                        title='Toggle fullscreen'
                        href=""
                        class='pswp__button pswp__button--fs button-save'
                        @click.stop = 'function(t){touchStartSave(t)}'
                        @touchstart.stop = 'function(t){touchStartSave(t)}'
                        >
                            <i class='m-font m-font-download'></i>
                            <img class='save-img' :src="currentImage" alt="">
                        </a>
                    <button class='pswp__button pswp__button--zoom' title='Zoom in/out'></button>
                    <button class='pswp__button pswp__button--arrow--left' title='Previous (arrow left)'></button>
                    <button class='pswp__button pswp__button--arrow--right' title='Next (arrow right)'></button>
                    <a
                        @click.stop.prevent = 'function(t){handleLive(t)}'
                        @touchstart.stop.prevent = 'function(t){handleLive(t)}'
                        v-if='currentVideoSrc'
                        class='live-icon'></a>
                    <div v-if='currentVideoSrc' class='["live-warp", e.isLiveShow ? "" : "hidden"]'
                        @click='function(t) {resetLive(t)}'
                        @touchstar.stop.prevent='function(t) {resetLive(t)}'
                    >
                        <video
                            :width='liveSizeWidth'
                            :height='liveSizeHeight'
                            autoplay=''
                            :poster='currentImage'
                            x5-video-player-type='h5'
                            webkit-playsinline='true'
                            playsinline='true'
                            ref = 'liveVideo'
                            style='object-fit: fill'
                            playing='playLive'
                            @ended='resetLive'
                            @abort='errorLive'
                            @error='errorLive'>
                            <source v-if='isLiveSourceShow' :src='currentVideoSrc' type='video/quicktime' />
                        </video>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {assignIn} from 'lodash-es'
import PhotoSwipe from 'photoswipe'
import PhotoSwipeUI_Default from  './a.js'
export default {
    name: "pswp",
    created: function() {
        var e = this;
        e.$on("mvGallery", function(t, n) {
            console.log(t,n)
            e.isInApp = !!window.WeiboJSBridge,
            e.listLen = n.length,
            e.list = n,
            e.openPhotoSwipe(t, n),
            e.currentImage = e.list[t].src,
            e.currentIndex = t,
            e.currentVideoSrc = e.list[t].videoSrc
        })
    },
    data: function() {
        return {
            isInApp: !1,
            listLen: 1,
            list: [],
            isIos: true,
            currentImage: null,
            showTip: !1,
            isGuideShow: !1,
            currentVideoSrc: "",
            isLiveUsed: !1,
            currentIndex: null,
            isLiveLoaded: !1,
            liveLoading: !1,
            isLiveShow: !1,
            liveSizeHeight: 0,
            liveSizeWidth: 0,
            isLiveSourceShow: !1,
            loadingTimer: null
        }
    },
    methods: {
        getCurrentImageSize: function() {
            var that = this
                , t = document.querySelectorAll(".pswp__img");
            c()(t).forEach(function(itEl) {
                "block" === itEl.style.display && (that.liveSizeWidth = +itEl.style.width.replace("px", ""),
                that.liveSizeHeight = +itEl.style.height.replace("px", ""))
            })
        },
        resetLive: function() {
            this.isLiveSourceShow = !1,
            this.liveLoading = !1,
            this.isLiveShow = !1,
            this.isLiveLoaded = !1
        },
        handleLive: function() {
            var that = this;
            if (that.isLiveShow)
                that.resetLive();
            else {
                if (!that.isLiveUsed) {
                    that.isLiveUsed = !0;
                    window.addEventListener("resize", that.onResize),
                    window.Raven && window.Raven.captureMessage("LIVE PHOTOS 使用率", {
                        level: "warning",
                        tags: {
                            errorType: ""
                        },
                        extra: {
                            info: ""
                        }
                    })
                }
                if (that.isLiveShow = !0, that.liveLoading = !0, !that.$refs.liveVideo.canPlayType("video/quicktime")){
                    that.isLiveShow = !1;
                    that.liveLoading = !1;

                    return Vue.$emit("mvToast", {
                        type: "error",
                        text: "该浏览器不支持"
                    })
                }
                that.loadingTimer = setTimeout(function() {
                    that.liveLoading && (that.liveLoading = !1,
                    that.resetLive(),
                    Vue.$emit("mvToast", {
                        type: "error",
                        text: "暂时无法播放"
                    }))
                }, 3e4),
                this.isLiveSourceShow = !0,
                this.getCurrentImageSize();
                let videoEl = this.$refs.liveVideo;
                videoEl.onloadstart = this.loadstartLive(),
                videoEl.play()
            }
        },
        playLive: function() {
            this.isLiveLoaded = !1,
            this.liveLoading = !1
        },
        loadstartLive: function() {
            this.liveLoading = !0
        },
        errorLive: function() {
            this.isLiveShow && (this.resetLive(),
            Vue.$emit("mvToast", {
                type: "error",
                text: "暂时无法播放"
            }))
        },
        onResize: function() {
            this.getCurrentImageSize()
        },
        touchStartSave: function() {
            let that = this;
            if (!that.isGuideShow) {
                that.isGuideShow = !0;
                setTimeout(function() {
                    that.isGuideShow = !1
                }, 2e3)
            }
        },
        openPhotoSwipe: function(index, items) {
            let that = this
                ,options = {
                    showHideOpacity: true,
                    loop: false,
                    getThumbBoundsFn: function(index) {
                            // get window scroll Y
                        let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
                            // get position of element relative to viewport
                            ,rect = t[index].el.getBoundingClientRect();
                        return {
                            x: rect.left,
                            y: rect.top + pageYScroll,
                            w: rect.width
                        }
                    },
                    index: index,
                    fullscreenEl: false,
                    closeEl: true
                }
                ,ooptions = {
                    isClickableElement: function() {
                        return true;
                    }
                };
                // 如果是ios 全部dom可以点击 ios需要手动下载东西
            this.isIos || (options = assignIn(options, ooptions));
            let gallery = new PhotoSwipe(this.$el,PhotoSwipeUI_Default,items,options);
            gallery.init(),
            gallery.listen("beforeChange", function() {
                let e = gallery.getCurrentIndex();
                that.isLiveUsed && (that.resetLive(),
                that.loadingTimer && clearTimeout(that.loadingTimer)),
                that.currentImage = that.list[e].src,
                that.currentIndex = e,
                that.currentVideoSrc = that.list[e].videoSrc
            }),
            gallery.listen("close", function() {
                if (that.currentImage = null,
                that.list = [],
                that.isLiveUsed) {
                    that.resetLive(),
                    that.liveSizeHeight = 0,
                    that.liveSizeWidth = 0,
                    that.isLiveUsed = !1;
                    window.removeEventListener("resize", that.onResize),
                    that.loadingTimer && clearTimeout(that.loadingTimer)
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>

</style>
