---
type: project
subType: react
subTag: JavaScript相关
lang: zh
tag: 实战项目
---

# react 全家桶仿掘金

实战缘由：最近一直在学习react，想通过一个完整的实战项目逐步的来掌握react以及它的一些插件（react-router、react-redux）等。
为何仿掘金? 掘金的官方网站是Vue开发的，而且它是一个学习网站，自己也经常访问它，因此萌生了用react全家桶来开发一款仿掘金版。

## 项目搭建

项目搭建以及使用的一些插件

* **create-react-app** [官方脚手架CLI](https://create-react-app.dev/docs/getting-started)
* **yarn reject** [暴露项目配置](https://create-react-app.dev/docs/available-scripts/#npm-run-eject)
* **react-router-config** [路由静态配置](https://github.com/reacttraining/react-router/tree/master/packages/react-router-config)
* **react-router-dom** [路由管理](https://router.happyfe.com/web/guides/quick-start)
* **react-redux** [状态管理](https://react-redux.js.org/introduction/quick-start) [手写简单的react-redux](/frame/react/reactRedux.html)
* **classnames** [样式类处理](https://www.npmjs.com/package/classnames)
* **webpack** [打包工具](https://www.webpackjs.com/concepts/)







## 归纳问题

### 访问图片 403 forbidden

获取到掘金图片数据之后，渲染时发现图片请求是403 - forbidden，这个是设置了防盗链 

可以在页面中加入
```html
<meta name="referrer" content="no-referrer" />
```