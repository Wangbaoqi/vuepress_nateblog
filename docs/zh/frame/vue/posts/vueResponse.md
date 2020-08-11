---
type: web-vue
tag: Vue
lang: zh
excerpt: 'Vue 源码系列一之响应式原理'
---

# Vue 源码系列(一) - Vue的运行机制

::: tip
读过Vue源码可能对Vue的运行机制会理解的更加透彻，总结就是初始化挂载($mount)、编译(compile)、响应式原理、VDOM、更新视图(patch)几个模块，全流程如下图。
:::

首先看下面的流程图，包含了上述描述的几个模块，接下来的篇幅中会对每一个模块在源码层面进行剖析。

![Vue-run](https://user-gold-cdn.xitu.io/2017/12/19/1606e7eaa2a664e8?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

这里看的[vue 源码](https://github.com/vuejs/vue)是*v2.6.11*

**源码文件目录**

```md
# folder structure

├── scripts ------------------------------- 包含与构建相关的脚本和配置文件
│   ├── alias.js -------------------------- 源码中使用到的模块导入别名
│   ├── config.js ------------------------- 项目的构建配置
├── build --------------------------------- 构建相关的文件，一般情况下我们不需要动
├── dist ---------------------------------- 构建后文件的输出目录
├── examples ------------------------------ 存放一些使用Vue开发的应用案例
├── flow ---------------------------------- JS静态类型检查工具 [Flow](https://flowtype.org/) 的类型声明
├── package.json
├── test ---------------------------------- 测试文件
├── src ----------------------------------- 源码目录
│   ├── compiler -------------------------- 编译器代码，用来将 template 编译为 render 函数
│   │   ├── parser ------------------------ 存放将模板字符串转换成元素抽象语法树的代码
│   │   ├── codegen ----------------------- 存放从抽象语法树(AST)生成render函数的代码
│   │   ├── optimizer.js ------------------ 分析静态树，优化vdom渲染
│   ├── core ------------------------------ 存放通用的，平台无关的运行时代码
│   │   ├── observer ---------------------- 响应式实现，包含数据观测的核心代码
│   │   ├── vdom -------------------------- 虚拟DOM的 creation 和 patching 的代码
│   │   ├── instance ---------------------- Vue构造函数与原型相关代码
│   │   ├── global-api -------------------- 给Vue构造函数挂载全局方法(静态方法)或属性的代码
│   │   ├── components -------------------- 包含抽象出来的通用组件，目前只有keep-alive
│   ├── server ---------------------------- 服务端渲染(server-side rendering)的相关代码
│   ├── platforms ------------------------- 不同平台特有的相关代码
│   │   ├── weex -------------------------- weex平台支持
│   │   ├── web --------------------------- web平台支持
│   │   │   ├── entry-runtime.js ---------------- 运行时构建的入口
│   │   │   ├── entry-runtime-with-compiler.js -- 独立构建版本的入口
│   │   │   ├── entry-compiler.js --------------- vue-template-compiler 包的入口文件
│   │   │   ├── entry-server-renderer.js -------- vue-server-renderer 包的入口文件
│   ├── sfc ------------------------------- 包含单文件组件(.vue文件)的解析逻辑，用于vue-template-compiler包
│   ├── shared ---------------------------- 整个代码库通用的代码
```

**本地运行以及调试**

源码文件中有作者的一些例子[examples]，本地运行命令*npm run dev* 或者 *yarn dev*，可以进行本地调试。

## 初始化挂载

在调用**new Vue()**之前，会进行一系列的初始化操作(也可以是**mixin**混入)，主要是定义**Vue**的构造函数以及**mixin**，mixin说白了，就是给**Vue**构造函数原型增加一些方法。

这些**mixin**混入主要有：

* *initMixin(Vue)* - 初始化 **Vue.prototype._init** 。
* *stateMixin(Vue)* - 初始化 **Vue.prototype.$watch**、**Vue.prototype.$set**等
* *eventMixin(Vue)* - 初始化 **Vue.prototype.$on**，**Vue.prototype.$once**，**Vue.prototype.$emit**等
* *lifecycleMixin(Vue)* - 初始化 **Vue.prototype._update**，**Vue.prototype.$forceUpdate**，**Vue.prototype.$destroy**等
* *renderMixin(Vue)* - 初始化 **Vue.prototype.$nextTick**，**Vue.prototype._render**等


