---
type: webpack
subType: oneTopic
subTag: webpack
tag: 构建打包
---

# Webpack 打包

::: tip
webpack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle
::: 

![webpack](https://cdn.img.wenhairu.com/images/2020/02/13/mATBP.png)

[[toc]]


## webpack 核心概念

* entry（入口）
* output（出口）
* loader
* plugin（插件）

### entry-入口

入口是指从哪个位置开始进行打包，一般是指项目的入口文件开始构建依赖图，最后输出到bundle（打包之后的文件）。

入口的配置: webpack.config.js

```js
module.exports = {
  // 单页面的入口配置
  entry: '../src/index.js',

  // 分离app和第三方库的打包方式
  entry: {
    index: '../src/index.js',
    vendors: '../src/vendors.js'
  }

  // 多页面的入口配置
  entry: {
    index: '../src/index.js',
    indexSecond: '../src/indexSecond.js',
    indexThird: '../src/indexThird.js',
  }
}
```

### output-出口
output属性告知我们打包的文件输出位置，以及文件的命名方式（chunk方式）

出口的配置: webpack.config.js

```js
const path = require('path')
module.exports = {
  // 单页面的入口配置
  entry: '../src/index.js',

  // 出口配置
  output: {
    // 打包之后的路径
    path: path.resolve(__dirname, 'dist'),
    // 打包之后的文件命名
    // [name] 原始文件name 占位符-确保每一个文件都有唯一性
    // [chunkhash:8] 文件指纹
    filename: '[name]_[chunkhash:8].js'
  }
}
```

### loader

loader处理非JavaScript的文件类型（webpack只理解JS），例如（样式，图片，字体，）等。

loader「Usage」: * test-需要处理的类型文件 * use-需要使用的loader; [更多的loader](https://www.webpackjs.com/loaders/)

loader的配置: webpack.config.js

```js
module.exports = {
  // 单页面的入口配置
  entry: '../src/index.js',

  // 出口配置
  output: {
    // 打包之后的路径
    path: path.resolve(__dirname, 'dist'),
    // 打包之后的文件命名
    // [name] 原始文件name 占位符-确保每一个文件都有唯一性
    // [chunkhash:8] 文件指纹
    filename: '[name]_[chunkhash:8].js'
  },
  // loader config
  module: {
    rules: [
      // 解析ES6
      {
        test: /.js$/,
        use: 'babel-loader'
      },
    ]
  }
}
```

### plugins-插件

> 从打包优化和压缩，一直到重新定义环境中的变量。插件接口功能极其强大，可以用来处理各种各样的任务

插件是解决loader无法解决的事。[插件列表](https://www.webpackjs.com/plugins/)

plugins的配置: webpack.config.js

```js
const path = reqiure('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  // 单页面的入口配置
  entry: '../src/index.js',

  // 出口配置
  output: {
    // 打包之后的路径
    path: path.resolve(__dirname, 'dist'),
    // 打包之后的文件命名
    // [name] 原始文件name 占位符-确保每一个文件都有唯一性
    // [chunkhash:8] 文件指纹
    filename: '[name]_[chunkhash:8].js'
  },
  // loader config
  module: {
    rules: [
      // 解析ES6
      {
        test: /.js$/,
        use: 'babel-loader'
      },
    ]
  },
  plugins: [
    // 把CSS提取成一个单独的文件
    new MiniCssExtractPlugin({filename: '[name]_[contenthash:9].css'})
  ]
}

```
