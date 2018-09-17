module.exports = {
  dest: 'dist',
  title: '马雄blog',
  head: [
    ['link', { rel: 'icon', href: `/icons/favicon.ico` }],
    // ['link', { rel: 'manifest', href: '/manifest.json' }],
    // ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    // ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    // ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'apple-touch-icon', href: `/icons/favicon.ico` }],
    ['link', { rel: 'mask-icon', href: '/icons/favicon.ico', color: '#3eaf7c' }],
    // ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
    // ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
  ],
  serviceWorker: true,
  markdown: {
    lineNumbers: true
  },
//   theme: 'vue',
  themeConfig: {
    repo: 'maxiong88',
    editLinks: false,
    // docsDir: 'docs',
    search: true,
    searchMaxSuggestions: 10,
    lastUpdated: 'Last Updated', 
    nav: [
      {
        text: 'Home', link: '/'},
        {text: '博客', link: '/blog/'},
        // {text: '关于', link: '/about/'},
    ],
  }
}

