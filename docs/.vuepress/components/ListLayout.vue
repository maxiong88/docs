<template>
    <div class="mx-blog-box">
        <div class="content">
            <ul v-if="urlList.length > 0" class="mx-blog-box-ul">
                <li v-for="item in urlList" >
                    <router-link
                    :to="item.path" 
                    >
                        <h3>{{item.title}}</h3>
                        <p>{{item.frontmatter.description}}</p>
                        <p>发布时间：{{item.frontmatter.time}}</p>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name: 'listlayout',
    data(){
        return {
            urlList: [],
        }
    },
    mounted(){
        const {pages} = this.$site;
        pages.forEach(element => {
            if(/^\/blog\/(\w+\-*\w+)*\.html$/gi.test(element.path)){
                this.urlList.push(element)
            }
        });
        this.urlList.sort(this.timeSort);
        console.log(this.urlList)
    },
    methods:{
        timeSort(a, b){
            let aTime = new Date(a.frontmatter.time);
            let bTime = new Date(b.frontmatter.time)
            return bTime.getTime() - aTime.getTime()
        }
    }
}
</script>
<style lang="stylus">
.mx-blog-box-ul{
    li{
        list-style none
        padding 15px 0
        &:hover{
            background-color #f8f8f8
            padding 15px
            margin 0 -15px  
        }
    }
    a{
        &:active, &:hover,&:link{
            text-decoration none!important
        }
        h3{
            margin 0
            display block
            color #333
            font-size 18px
            font-weight 100
        }
        p{
            color #666
            font-size 14px
        }
    }

}
</style>


