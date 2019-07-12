<template>
  <div id="app">
    <!-- <div>
        <ul>
          <li v-for="(item, index) in arrs" :key="item.id" @click.stop.prevent="function(event){thumbnails(event, index, item.url)}"><img :src="item.url" alt=""></li>
        </ul>
    </div>
    <top-bar
        >
       
        </top-bar>
        <CC></CC> -->
        <div style='height:100%;'>
          <div class='asdf' v-inf-scroll="next">
            <div v-for="(item, index) in arrs" :key="index">
              <img :src="item.url" alt="">
            </div>
          </div>
        </div>
        
        <!-- <CC v-inf-scroll="next"></CC> -->
  </div>
</template>

<style>
@import '~photoswipe/dist/photoswipe.css';
@import '~photoswipe/dist/default-skin/default-skin.css';
ul,li{
  list-style: none;
}
li{
  width: 50%;
  float: left;
}
img{
  width: 100%;
}
.asdf{
  background: #ddd;
}
</style>
<script>
import Vue from 'vue'
import topBar from './components/mv-pswp.vue'
import CC from './components/a1.vue'
import { setTimeout } from 'timers';
export default {
  // name: 'app',
  components:{
    topBar,
    CC
  },
  data(){
    return {
      arrs:[{
        id:1,
        url:'https://baidu-vr1.xin.com/car/tiles/82d254532489ac1542ac6dab4ed986e6/external/closed/cover_00.JPG'
      },{
        id:2,
        url:'https://baidu-vr1.xin.com/car/tiles/59ef4dfca315875f8cfa9cdf54faed64/external/closed/cover_00.JPG'
      },{
        id:21,
        url:'https://baidu-vr1.xin.com/car/tiles/59ef4dfca315875f8cfa9cdf54faed64/external/closed/cover_00.JPG'
      },{
        id:22,
        url:'https://baidu-vr1.xin.com/car/tiles/59ef4dfca315875f8cfa9cdf54faed64/external/closed/cover_00.JPG'
      },{
        id:23,
        url:'https://baidu-vr1.xin.com/car/tiles/59ef4dfca315875f8cfa9cdf54faed64/external/closed/cover_00.JPG'
      },{
        id:24,
        url:'https://baidu-vr1.xin.com/car/tiles/59ef4dfca315875f8cfa9cdf54faed64/external/closed/cover_00.JPG'
      },{
        id:25,
        url:'https://baidu-vr1.xin.com/car/tiles/59ef4dfca315875f8cfa9cdf54faed64/external/closed/cover_00.JPG'
      },{
        id:26,
        url:'https://baidu-vr1.xin.com/car/tiles/59ef4dfca315875f8cfa9cdf54faed64/external/closed/cover_00.JPG'
      },{
        id:27,
        url:'https://baidu-vr1.xin.com/car/tiles/59ef4dfca315875f8cfa9cdf54faed64/external/closed/cover_00.JPG'
      },{
        id:28,
        url:'https://baidu-vr1.xin.com/car/tiles/59ef4dfca315875f8cfa9cdf54faed64/external/closed/cover_00.JPG'
      }]
    }
  },
  // destroyed(){
  //   this.is_refresh = !1
  // },
  mounted(){
    // (new Vue()).$emit('dddd',1,2)
    //this.next()
  },
  methods:{
    // thumbnails: function(t, e, i) {
    //   var s = t.target || t.srcElement
    //     , o = this.formatThumbItem(s, i);
    //   this.$emit("mvGallery", e, o)
    // },
    next(){
      setTimeout(()=>{
        var d = [{
        id:1,
        url:'https://baidu-vr1.xin.com/car/tiles/82d254532489ac1542ac6dab4ed986e6/external/closed/cover_00.JPG'
      },{
        id:2,
        url:'https://baidu-vr1.xin.com/car/tiles/59ef4dfca315875f8cfa9cdf54faed64/external/closed/cover_00.JPG'
      },{
        id:21,
        url:'https://baidu-vr1.xin.com/car/tiles/59ef4dfca315875f8cfa9cdf54faed64/external/closed/cover_00.JPG'
      },{
        id:22,
        url:'https://baidu-vr1.xin.com/car/tiles/59ef4dfca315875f8cfa9cdf54faed64/external/closed/cover_00.JPG'
      },{
        id:23,
        url:'https://baidu-vr1.xin.com/car/tiles/59ef4dfca315875f8cfa9cdf54faed64/external/closed/cover_00.JPG'
      },{
        id:24,
        url:'https://baidu-vr1.xin.com/car/tiles/59ef4dfca315875f8cfa9cdf54faed64/external/closed/cover_00.JPG'
      },{
        id:25,
        url:'https://baidu-vr1.xin.com/car/tiles/59ef4dfca315875f8cfa9cdf54faed64/external/closed/cover_00.JPG'
      },{
        id:26,
        url:'https://baidu-vr1.xin.com/car/tiles/59ef4dfca315875f8cfa9cdf54faed64/external/closed/cover_00.JPG'
      },{
        id:27,
        url:'https://baidu-vr1.xin.com/car/tiles/59ef4dfca315875f8cfa9cdf54faed64/external/closed/cover_00.JPG'
      },{
        id:28,
        url:'https://baidu-vr1.xin.com/car/tiles/59ef4dfca315875f8cfa9cdf54faed64/external/closed/cover_00.JPG'
      }]
        this.arrs = this.arrs.concat(...d)
      }, 2000)
    },
    thumbnails(event, el, srchref){
      console.log(event, el, srchref)
      event.preventDefault();
      event.stopPropagation();
      var that = this;
      var imgAttribute = [{
        src: srchref,
        w:600,
        h:600,
        el: el
      }],
      imgObj = new Image(),
      imgBool = false;
      setTimeout(function(){
        imgBool || ( imgBool = true, that.$emit('mvGallery', 0, imgAttribute))
      }, 1000),
      imgObj.onload = function(){
        imgBool || ( imgBool = true, 
        imgAttribute[0].w = this.naturalWidth, 
        imgAttribute[0].h = this.naturalHeight, 
        console.log(imgAttribute),
        that.$emit('mvGallery', 0, imgAttribute)
        )
      },
      imgObj.src = srchref;
    }
  }
}
/*
$attrs 父组件通信子组件
子组件通过 $attrs 可以获取父组件不被子组件作为 props 特性绑定的传递过来的值
``` js
父组件
<A msg='1111' df='222'>
子组件
{
  props:['msg'],
  mounted(){
    console.log(this.$attrs) // 输出 {df:'222'}
  }
}
```
子组件可以通过 v-bind='$attrs' 显性的绑定 可手动绑定到子组件的其他位置

父组件通信子组件，如果子组件中没有通过props来接受父组件传递的值，那么将会在子组件根元素通过html属性的方式追加
``` js
父组件
<AB msg='1111' sd='2222'>
子组件
<div sd='2222'>{{msg}}</div>
{
  props:['msg']
}
```
我们可以通过 inheritAttrs : false 这些默认行为将会被去掉,但是我们还是可以通过$attr获取
``` js
父组件
<zi msg='sss' es='eee' />
子组件
<zi v-bind='$attr'>
孙组件
<sun>
{
  mounted(){
    console.log(this.$attr) // {msg:'sss', es:'eee'}
  }
}
```


*/
</script>
