module.exports = {
    title: '马雄',
    description: '马雄马雄blog',
    plugins: ['@vuepress/medium-zoom'],
    themeConfig: {
        search: true,
        nav: [
            {text: 'Home', link: '/'},
            {text: '博客', link: '/blog/'},
            {
                text: '参考',
                items: [
                    {text: 'H5案例', link: 'https://www.h5anli.com/'}
                ]
            },
            {text: 'MEME', link: '/about/'},
        ]
    }
}