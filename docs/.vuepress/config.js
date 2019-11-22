module.exports = {
  base: '/',
  title: 'Nate.wang',
  description: '你写的每一行代码都是你的名片',
  dest: './dist',
  port: '8686',
  head: [
    ['link', { rel: 'icon', href: '/favion.png' }]
  ],
  markdown: {
    lineNumbers: true
  },
  theme: 'reform',
  themeConfig: {
    nav: require('./config/nav'),
    sidebar: require('./config/sidebar'),
    sidebarDepth: 2,
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
  
}

