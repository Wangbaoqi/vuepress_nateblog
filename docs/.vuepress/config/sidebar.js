module.exports = {
  '/front/': [
    {
      title: 'HTML5新增功能组',
      collapsable: false,
      children: [
        '/front/html/web语义',
        '/front/html/web通信',
        '/front/html/web离线存储',
        '/front/html/web多媒体',
        '/front/html/web3D图像',
        '/front/html/web性能集成',
        '/front/html/web设备访问',
      ]
    },
    {
      title: 'CSS3新增特性组',
      collapsable: false,
      children: [
        '/front/css/',
        '/front/css/box',
        '/front/css/layout',
        '/front/css/centered',
        '/front/css/BFC',
        '/front/css/response',
        '/front/css/css技术收纳',
      ]
    },
    {
      title: 'JavaScript 忍者秘籍',
      collapsable: false,
      children: [
        '/front/javascript/primary/JS 数据类型',
        '/front/javascript/primary/JS 作用域以及闭包',
        '/front/javascript/primary/JS this以及原型',
        '/front/javascript/primary/JS eventLoop',
        '/front/javascript/primary/JS 异步',

      ]
    },
  ],
  '/algorithm/': [
    {
      title: '数据结构',
      collapsable: false,
      children: [
        '/algorithm/structure/array',
        '/algorithm/structure/link',
        '/algorithm/structure/stack',
      ]
    },
    {
      title: '前端算法',
      collapsable: false,
      children: [
        '/algorithm/frontalgorithm/search',
        '/algorithm/frontalgorithm/recursion',
        '/algorithm/frontalgorithm/dynamic',
        '/algorithm/frontalgorithm/greedy',
        '/algorithm/frontalgorithm/timer',

      ]
    },
  ],
  '/performance/': [
    '',
  ],
  '/frame/': [
    {
      title: '框架思想',
      collapsable: false,
      children: [
        '/frame/mind/mvvm',
      ]
    },
    {
      title: 'Vue 全家桶',
      collapsable: false,
      children: [
        '/frame/vue/component',
      ]
    },
    {
      title: 'React 全家桶',
      collapsable: false,
      children: [
        '/frame/react/component',
      ]
    },
  ],
}
