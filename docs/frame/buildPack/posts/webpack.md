---
type: webpack
subType: oneTopic
subTag: webpack
tag: 构建打包
lang: us
---

# Webpack 打包

::: tip
webpack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle
::: 

![webpack](https://raw.githubusercontent.com/Wangbaoqi/blogImgs/master/nateImgs/build/webpack.png)


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

### 模块热替换-HMR

1. 模块热替换（hot-module-replace）的出现，提高了在开发环境中的效率，也离不开WDS（webpack-dev-server）模块

webpack-dev-server 提供了简答的web-server, 其[WDS config](https://webpack.docschina.org/guides/development#%E4%BD%BF%E7%94%A8-webpack-dev-server)

HMR的配置：基于webpack.config.js 文件

```js
const path = reqiure('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const webpack = require('webpack')

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
    // 新增热更新插件
    new webpack.HotModuleReplacementPlugin(),
    // 把CSS提取成一个单独的文件
    new MiniCssExtractPlugin({filename: '[name]_[contenthash:9].css'})

  ],
  // 新增热更新配置 
  devServer: {
    contentBase: './dist',
    hot: true
  }
}
```
2. 采用node API 

```js
const webpack = require('webpack')
const webpackDevServer = require('webpack-dev-server')

// webpack 配置
const config = require('./webpack.config.js')

// dev-server 配置
const options = {
  contentBase: './dist',
  hot: true,
  host: 'localhost',
}

// 启动HRM 将dev-server 配置添加到 webpack config 中
webpackDevServer.addDevServerEntrypoints(config, options)

const compiler = webpack(config)
const server = new webpackDevServer(compiler, options)

server.listen(8088, 'localhost', () => {
  console.log('dev server listening on port 8080');
})
```

3. 采用 webpack-dev-middleware


4. 采用 webpack-hot-middleware 


### 代码压缩

1. HTML压缩
html-webpack-plugin

2. CSS压缩

optimizeCssAssetsPlugin

3. JS压缩

uglifyjs-webpack-plugin

4. 清理构建目录
* rm -rf ./dist && webpack 
* clean-webpack-plugin 

### CSS功能增强

1. CSS3的前缀问题

autoprefixer - 后置处理 
postcss-loader 

2. 移动端的设备分辨率

* px -> rem px2rem-loader 
* lib-flexible 动态计算根元素font-size 的大小

3. 资源内联 CSS or Js 
  作用：
  1. 代码层面: 
    * 页面框架的初始化脚本
    * 上报相关打点
  CSS内联避免页面闪动
  2. 请求层面
    * 减少HTTP网络请求数
    * 小图片和字体内联

4. HTML和JS内联 

* raw-loader 内联HTML和JS

5. CSS内联

* 借助style-loader 
* html-inline-css-webpack-plugin 


### 多页面APP打包

动态获取entry数量和设置html-webpack-plugin的数量 

利用 glob 插件 

```js
glob.sync(path.join(__dirname), './src/*/index.js')
```



### source map

source map 类型

![sourcemap](https://raw.githubusercontent.com/Wangbaoqi/blogImgs/master/nateImgs/build/sourcemap.png)


### 提取公共资源 

* 基础库分离 spliteChunkPlugin 代替了 commonsChunkPlugin(v3)

```js
optimization: {
  splitChunks: {
    chunks: 'async',
    minSize: 30000,
    maxSize: 0,
    minChunks: 1,
    maxAsyncRequests: 5,
    maxInitialRequests: 3,
    automaticNameDelimiter: '~',
    name: true,
    cacheGroups: {
      vendors: {
        test: /(react|react-dom)/,
        name: 'vendors',
        chunks: 'all'
      },
    }
  }
},

```

* 将react、react-dom 包通过CDN引入 - HtmlWebpackExternalsPlugin

```js
new HtmlWebpackExternalsPlugin({
  externals: [
    {
      module: 'react',
      entry: 'https://11.url.cn/now/lib/16.2.0/react.min.js',
      global: 'React'
    },
    {
      module: 'react-dom',
      entry: 'https://11.url.cn/now/lib/16.2.0/react-dom.min.js',
      global: 'ReactDOM'
    }
  ]
})
```


## 常用 plugins 


### HtmlWebpackPlugin


[HtmlWebpackPlugin](https://webpack.docschina.org/plugins/html-webpack-plugin/)简化了HTML的创建


### CleanWebpackPlugin



### MiniCssExtractPlugin


### OptimizeCssAssetsPlugin


### HtmlWebpackExternalsPlugin


### SplitChunksPlugin


### HotModuleReplacementPlugin



## tree shaking 

tree shaking 摇树优化  ES6 ， 静态的分析代码是不是有用到，没有用到的代码会删除掉 

* DCE 
代码不会被执行，不可执行
代码执行的结果不会被用到 



## scopehosting 

构建之后的代码会有大量的闭包代码 - 体积增大，内存开销

* 模块转化 


**scope hoisting原理**

将所有的模块的代码按照引用顺序放在一个函数作用域里，额庵后适当的重命名一些变量以防止变量名冲突 

对比通过scope hoisting 可以减少函数声明代码和内存开销  

**必须是ES6语法** mode - production 



## 代码分割 

* 抽离相同代码到共享快
* 懒加载脚本 初始代码大小更小

1. 懒加载脚本的方式
  commonJS require.ensure 
  ES6 动态 import - 需要babel转化 

2. 使用动态 import

* 安装babel插件 @babel/plugin-syntax-dynamic-import 

* ES6 动态import 

```js
{
  "plugins": [
    "@babel/plugin-syntax-dynamic-import"
  ]
}

```



