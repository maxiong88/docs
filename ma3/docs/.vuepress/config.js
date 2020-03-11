module.exports = {
    title: '熊大的理想家',
    description: '熊大的日志生活',
    head: [
        ['link', { rel: 'icon', href: '/icons/favicon.ico' }]
    ],
    plugins: [
        [
            '@vuepress/medium-zoom',
            {
                selector: '.content img'
            }
        ],
        // '@vuepress/blog'
        // [
        //     '@vuepress/pagination',
        //     {
        //         firstPagePath: 'blog',
        //         postsFilter:({ type }) => type === 'post',
        //         postsSorter: (prev, next) => {
        //             console.log(prev, next, '===1')
        //             const prevTime = new Date(prev.frontmatter.date).getTime()
        //             const nextTime = new Date(next.frontmatter.date).getTime()
        //             return prevTime - nextTime > 0 ? -1 : 1
        //         }
        //     }
        // ]
		
	],
    themeConfig: {
        search: true,
        nav: [
            {text: 'Home', link: '/'},
            {
                text: '博客', 
                items: [
                    {text:'blog', link:'/blog/'},
                    {text:'javascript', link:'/javascript/'},
                    {text:'vue',link:'/vue/'},
                    {text:'html',link:'/html/'},
                ]
            },
            {
                text: '参考',
                items: [
                    {text: 'H5案例', link: 'https://www.h5anli.com/'},
					// {text: '仿微博m站部分组件', link: './blog/weibo'},
                    {text: 'vue-weibo', link: ''},
                    {text: 'vue-cms', link: ''},
<<<<<<< HEAD:ma/docs/.vuepress/config.js
                    {text: 'koa-email', link: 'https://github.com/maxiong88/email-koa-webpack-phantom'}
=======
                    {text: '优质站点', link: './site/q-site'}
>>>>>>> 9233654255e1326d263b7008035b8eab0d47d8d4:ma3/docs/.vuepress/config.js
                ]
            },
            {text: 'MEME', link: '/about/'},
        ]
    },
    markdown: {
        // markdown-it-anchor 的选项
        // anchor: { permalink: false },
        // markdown-it-toc 的选项
        // toc: { includeLevel: [1, 2] },
        extendMarkdown: md => {
          // 使用更多的 markdown-it 插件!
          md.use(require('markdown-it-ins'))
        }
      }
}