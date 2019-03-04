<template>
    <div class="mx-blog-box">
        <div class="content">
            <ul v-if="urlSizeList.length > 0" class="mx-blog-box-ul">
                <li v-for="item in urlSizeList" >
                    <router-link
                    :to="item.path" 
                    >
                        <h3>{{item.title}}</h3>
                        <p>{{item.frontmatter.description}}</p>
                        <p>发布时间：{{item.frontmatter.time}}</p>
                    </router-link>
                </li>
            </ul>
            <div class="block" v-if="urlSizeList.length > 0">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="page.currentPage"
                    :page-sizes="page.pageSizes"
                    :page-size="page.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="page.totalPage">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'listlayout',
    data(){
        return {
            urlList: [],
            urlSizeList: [],
            page: {
                currentPage: 1,
                totalPage: 0,
                pageSize: 20,
                pageSizes: [10, 20, 30, 40]
            }
        }
    },
    mounted(){
        const {pages} = this.$site;
        let {
            pageSize
        } = this.page;
        pages.forEach(element => {
            if(/^\/blog\/(\w+\-*\w+)*\.html$/gi.test(element.path)){
                this.urlList.push(element)
            }
        });
        this.urlList.sort(this.timeSort);
        this.page.totalPage = this.urlList.length || 0;
        this.urlSizeList = this.urlList.slice(0, pageSize);
        console.log(this.urlList, this.urlSizeList)
    },
    methods:{
        handleSizeChange(n){
            let {
                currentPage
            } = this.page;
            this.page.pageSize = n;
            this.urlSizeList = this.urlList.slice(
                n*(currentPage - 1), n*currentPage
            )
        },
        handleCurrentChange(n){
            let {
                pageSize
            } = this.page;
            this.page.currentPage = n;
            this.urlSizeList = this.urlList.slice(
                pageSize*(n - 1), pageSize*n
            )
        },
        timeSort(a, b){
            let aTime = new Date(a.frontmatter.time);
            let bTime = new Date(b.frontmatter.time)
            return bTime.getTime() - aTime.getTime()
        }
    }
}
</script>
<style lang="stylus">
.mx-blog-box{
    margin-top : 0!important;
    .content{
        padding: 0!important;
    }
}
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