// import http from 'http'



module.exports = (site, Vue) => {
  return {
    extend: "@vuepress/theme-default",
    plugins: [
      ['gitalk'],
      [
        '@vuepress/last-updated',
        {
          transformer: (timestamp, lang) => {
            // 不要忘了安装 moment
            const moment = require('moment')
            moment.locale(lang)
            return moment(timestamp)
          }
        }
      ]
    ]
  };
};
