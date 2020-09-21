module.exports = {
  base: '/',
  title: '前端不好玩',
  description: '你写的每一行代码都是你的名片',
  dest: './dist',
  port: '8686',
  head: [
    ['link', { rel: 'icon', href: '/favion.png' }]
  ],
  markdown: {
    lineNumbers: true,
  },
  themeConfig: {
    author: 'nate.wang',

    sidebarDepth: 2,
    nav: require('./config/nav.js'),
    sidebar: require('./config/sidebar.js'),
    navTop: require('./config/navTop'),

    // locales: require('./config/locales'),
    logo: '/favion.png',
    lastUpdated: 'Last Updated',
    searchMaxSuggestoins: 10,
    serviceWorker: {
      updatePopup: {
        message: "New content is available.",
        buttonText: 'Refresh'
      }
    },
    sidebarDepth: 3,
    editLinks: true,
    editLinkText: '在 GitHub 上编辑此页 ！',
    gitalk: {
      // gitalk的主要参数
      clientID: `a23f205915aa92389c63`,
      clientSecret: `50c3b3127e01f7f17c582b38f64fd721faae1688`,
      repo: `vuepress_nateblog`,
      owner: "Wangbaoqi",
      admin: ["Wangbaoqi"],
      language: "en",
      labelRule: `(title,path)=> {
        let paths=path.split('/')
        if(paths.length>0){
          let res = paths.pop()
          if(res===''){
            res=paths.pop()
          }
          res = res.slice(-50)
          return res
        }else{
          return title
        }
      }`
    },
  },

  plugins: [
    [
      '@vuepress/google-analytics',
      {
        'ga': 'UA-164492424-1' // UA-00000000-0
      }
    ],
    ['@vuepress/back-to-top'],
    [
      'seo',
      {
        siteTitle: (_, $site) => $site.title,
        title: $page => $page.title,
        description: $page => $page.frontmatter.excerpt,
        author: (_, $site) => $site.themeConfig.author,
        tags: $page => $page.frontmatter.tag,
      }
    ]
  ]
  
}

