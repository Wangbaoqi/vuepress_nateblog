module.exports = {
  base: '/',
  title: 'Nate前端进阶',
  description: '你写的每一行代码都是你的名片',
  dest: './dist',
  port: '8686',
  head: [
    ['link', { rel: 'icon', href: '/favion.png' }]
  ],
  markdown: {
    lineNumbers: true,
  },
  locales: {
    // 键名是该语言所属的子路径
    // 作为特例，默认语言可以使用 '/' 作为其路径。
    '/': {
      lang: 'en-US', // 将会被设置为 <html> 的 lang 属性
      title: 'FrontEnd Advanced',
      description: 'The business card of code that you write'
    },
    '/zh/': {
      lang: 'zh-CN',
      title: '前端进阶',
      description: '你写的每一行代码都是你的名片'
    }
  },
  themeConfig: {
   
    locales: require('./config/locales'),
    logo: '/favion.png',
    lastUpdated: 'Last Updated',
    searchMaxSuggestoins: 10,
    serviceWorker: {
      updatePopup: {
        message: "New content is available.",
        buttonText: 'Refresh'
      }
    },
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
    ['@vuepress/back-to-top']
  ]
  
}

