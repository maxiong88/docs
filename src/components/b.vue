<template>
    <div class='main-wrap'>
        <CX
            v-if="list_cur && list_cur.length > 0"
            ref='loadmore'
            :top-method='pull_refresh'>
            <div ref='cont'
            class='pannelwrap'
            :style="{'padding-top': to_rem(padding_top),'padding-bottom': to_rem(padding_bottom)}">
                <div
                    v-for="(item, index) in list_cur"
                    class="wb-item-wrap"
                    :key="item.id || (item.mblog ? item.mblog.id : index) || item.itemid"
                >
                                ddddd
                </div>
            </div>
            <div 
                v-if="re_do" 
                class='m-tips m-tips-tp cursor'
                @click="function(i){return load_more(nextPageApi)}">
                网络异常，请稍后点击重试~
            </div>
            <CP :requesting='is_request'></CP>
            <div class='temporary' ref='ref'></div>
        </CX>
    </div>
</template>
<script>
import CX from './c.vue'
import CP from './a.vue'
export default {
    name:'abc',
    data(){
        return {
            timer: null,
            is_upglide: !1,
            is_refresh: !1,
            lastHeight: 0,
            first_scroll: 0,
            is_scrolling: !1,
            is_loading: !1,
            is_request: !1,
            list_all: [],
            list_cur: [{}],
            since: "",
            max: "",
            padding_top: 0,
            padding_bottom: 0,
            page: "",
            since_id: "",
            max_id: "",
            count: 20,
            last_scrolltop: 0,
            diff_items: [],
            feed_id: 5e3,
            show_triangle: !0,
            no_data: {
                flag: !1,
                msg: "暂无数据"
            },
            net_error: {
                flag: !1,
                msg: "网络异常，请稍后刷新重试~"
            },
            re_do: !1,
            cur_group: null,
            showAppTips: !1,
            pageLoaded: !1
        }
    },
    // inheritAttrs:false,
    mounted(){
        console.log(this.$listeners,'bbbb')
    },
    methods: {
        asd1(){
             this.$emit('update:curGroup','66666666666666666')
        },
        pull_refresh(){},
         to_rem: function(t) {
            return "".concat(Math.ceil(t), "px")
        }
    },
    components:{
        CX,
        CP
    }
}
</script>