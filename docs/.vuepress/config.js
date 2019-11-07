module.exports = module.exports = {
  base: '/dist/',
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
  themeConfig: {
    nav: require('./config/nav'),
    sidebar: require('./config/sidebar'),
    sidebarDepth: 2,
    lastUpdated: 'Last Updated',
    searchMaxSuggestoins: 10,
    serviceWorker: {
      updatePopup: {
        message: "New content is available.",
        buttonText: 'Refresh'
      }
    },
    editLinks: true,
    editLinkText: '在 GitHub 上编辑此页 ！'
  },
  // 插件
  plugins: [
    ['@vssue/vuepress-plugin-vssue', {
      platform: 'github',
      owner: 'Wangbaoqi',
      repo: 'vuepress_nateblog',
      clientId: 'a23f205915aa92389c63',
      clientSecret: '50c3b3127e01f7f17c582b38f64fd721faae1688',
    }],
  ],
}

