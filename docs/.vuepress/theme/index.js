// import http from 'http'
module.exports = (site, Vue) => {
  return {
    extend: "@vuepress/theme-default",
    plugins: [
      ['gitalk'],
      // [
      //   (options,context)=>({
      //     name:'my-google-analytics',
      //     define() {
      //       const { siteConfig = {} } = context
      //       const ga = 'UA-164501792-1' || options.ga || siteConfig.ga
      //       const GA_ID = ga || false
      //       return { GA_ID }
      //     },
      //   })
      // ],
      // [
      //   '@vuepress/google-analytics',
      //   {
      //     'ga': 'UA-164481499-1' // UA-00000000-0
      //   }
      // ]
      // ['@vuepress/back-to-top']
    ]
  };
};
