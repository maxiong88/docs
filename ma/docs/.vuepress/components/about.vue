<template>
    <div>
        <div class="about-tit">
            <a href="/">返回首页</a>
        </div>
        <div class="about-box">
            <h3>主公Vue、React</h3>
            <h4>QQ：646512616@qq.com</h4>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="stylus">
.theme-container.md-ma-about{
    background #ddd;
    .page{
        padding: 0;}
    .page-edit{
        display none;}
    .content{
        height: 100vh;
        padding:0;
        display flex;
        & > *:first-child {
            margin-top: 0;
        }
    }
    .about-tit{
        height 50px;
        line-height 50px;
        }
    .about-box{
        
    }
}
</style>
