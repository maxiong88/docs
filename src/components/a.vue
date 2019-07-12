<template>
    <div v-show="requesting"  class='m-tips m-tips-tp'>
        <div class='m-loading m-loading-dark'>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>
</template>
<script>
import ABC from './b.vue'
export default {
    name: "nextpage",
    props: {
        requesting: {
            type: Boolean,
            default: !1
        }
    }
    // props:['msg'],
    // inheritAttrs:false,
    // components:{
    //     ABC
    // },
    // mounted() {
    //     console.log(this.$listeners,'aaaa')
    // },
    // methods: {
    //     asd(){
    //          this.$emit('update:curGroup','eeee1111111111111111')
    //     }
    // },
}
</script>