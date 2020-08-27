---
type: web-vue
tag: Vue
lang: zh
excerpt: "Vue 源码系列一之响应式原理"
---

# Vue 源码系列(一) - Vue 初始化挂载

::: tip
读过 Vue 源码可能对 Vue 的运行机制会理解的更加透彻，总结就是初始化挂载(\$mount)、编译(compile)、响应式原理、VDOM、更新视图(patch)几个模块，全流程如下图。
:::

首先看下面的流程图，包含了上述描述的几个模块，接下来的篇幅中会对每一个模块在源码层面进行剖析。

![Vue-run](https://cdn.img.wenhairu.com/images/2020/08/12/wGCd6.png)

这里看的[vue 源码](https://github.com/vuejs/vue)是*v2.6.11*

**源码文件目录**

```md
# folder structure

├── scripts ------------------------------- 包含与构建相关的脚本和配置文件
│ ├── alias.js -------------------------- 源码中使用到的模块导入别名
│ ├── config.js ------------------------- 项目的构建配置
├── build --------------------------------- 构建相关的文件，一般情况下我们不需要动
├── dist ---------------------------------- 构建后文件的输出目录
├── examples ------------------------------ 存放一些使用 Vue 开发的应用案例
├── flow ---------------------------------- JS 静态类型检查工具 [Flow](https://flowtype.org/) 的类型声明
├── package.json
├── test ---------------------------------- 测试文件
├── src ----------------------------------- 源码目录
│ ├── compiler -------------------------- 编译器代码，用来将 template 编译为 render 函数
│ │ ├── parser ------------------------ 存放将模板字符串转换成元素抽象语法树的代码
│ │ ├── codegen ----------------------- 存放从抽象语法树(AST)生成 render 函数的代码
│ │ ├── optimizer.js ------------------ 分析静态树，优化 vdom 渲染
│ ├── core ------------------------------ 存放通用的，平台无关的运行时代码
│ │ ├── observer ---------------------- 响应式实现，包含数据观测的核心代码
│ │ ├── vdom -------------------------- 虚拟 DOM 的 creation 和 patching 的代码
│ │ ├── instance ---------------------- Vue 构造函数与原型相关代码
│ │ ├── global-api -------------------- 给 Vue 构造函数挂载全局方法(静态方法)或属性的代码
│ │ ├── components -------------------- 包含抽象出来的通用组件，目前只有 keep-alive
│ ├── server ---------------------------- 服务端渲染(server-side rendering)的相关代码
│ ├── platforms ------------------------- 不同平台特有的相关代码
│ │ ├── weex -------------------------- weex 平台支持
│ │ ├── web --------------------------- web 平台支持
│ │ │ ├── entry-runtime.js ---------------- 运行时构建的入口
│ │ │ ├── entry-runtime-with-compiler.js -- 独立构建版本的入口
│ │ │ ├── entry-compiler.js --------------- vue-template-compiler 包的入口文件
│ │ │ ├── entry-server-renderer.js -------- vue-server-renderer 包的入口文件
│ ├── sfc ------------------------------- 包含单文件组件(.vue 文件)的解析逻辑，用于 vue-template-compiler 包
│ ├── shared ---------------------------- 整个代码库通用的代码
```

**本地运行以及调试**

源码文件中有作者的一些例子[examples]，本地运行命令*npm run dev* 或者 _yarn dev_，可以进行本地调试。

## 初始化挂载 - 从对象开始

在调用**new Vue()**的时候，会进行一系列的初始化操作(也可以是**mixin**混入)，主要是定义**Vue**的构造函数以及**mixin**，mixin 说白了，就是给**Vue**构造函数原型增加一些方法。

调用*\_init()*方法进行初始化之前，首先看下*Vue*构造函数

```js
// Vue constructor
function Vue(options) {
  if (process.env.NODE_ENV !== "production" && !(this instanceof Vue)) {
    warn("Vue is a constructor and should be called with the `new` keyword");
  }
  this._init(options);
}
```

可以看到，在实例化*Vue*，会调用*_init*方法进行一系列初始化操作（lifecycle、events、props、data、watch、computed）等，除此之外，进行数据双向绑定等。接下俩 *_init*的源码实现

*_init*主要实现了两个功能

1. 初始化
2. 挂载组件

```js
/**
 * _init 初始化
 * @param {*} options
 */
Vue.prototype._init = function(options?: Object) {
  const vm: Component = this;
  // a uid
  vm._uid = uid++;

  let startTag, endTag;
  /* istanbul ignore if */
  if (process.env.NODE_ENV !== "production" && config.performance && mark) {
    startTag = `vue-perf-start:${vm._uid}`;
    endTag = `vue-perf-end:${vm._uid}`;
    mark(startTag);
  }

  // a flag to avoid this being observed
  vm._isVue = true;
  // merge options
  if (options && options._isComponent) {
    // optimize internal component instantiation
    // since dynamic options merging is pretty slow, and none of the
    // internal component options needs special treatment.
    initInternalComponent(vm, options);
  } else {
    vm.$options = mergeOptions(
      resolveConstructorOptions(vm.constructor),
      options || {},
      vm
    );
  }
  /* istanbul ignore else */
  if (process.env.NODE_ENV !== "production") {
    initProxy(vm);
  } else {
    vm._renderProxy = vm;
  }
  // expose real self
  vm._self = vm;
  // 初始化生命周期
  initLifecycle(vm);
  // 初始化事件
  initEvents(vm);
  // 初始化render
  initRender(vm);
  // 调用 beforeCreate 钩子函数
  callHook(vm, "beforeCreate");
  initInjections(vm); // resolve injections before data/props
  // 初始化 props methods data computed watch
  initState(vm);
  initProvide(vm); // resolve provide after data/props
  // 调用 created 钩子函数
  callHook(vm, "created");

  /* istanbul ignore if */
  if (process.env.NODE_ENV !== "production" && config.performance && mark) {
    vm._name = formatComponentName(vm, false);
    mark(endTag);
    measure(`vue ${vm._name} init`, startTag, endTag);
  }

  if (vm.$options.el) {
    // 挂载组件
    vm.$mount(vm.$options.el);
  }
};
```
在初始化**state**的过程中，就是实现数据双向绑定的过程，也就是使用**Object.definedProperty**进行数据劫持

```js
function initState (vm: Component) {
  vm._watchers = []
  const opts = vm.$options
  if (opts.props) initProps(vm, opts.props)
  if (opts.methods) initMethods(vm, opts.methods)
  if (opts.data) {
    // 初始化data同时进行 数据劫持
    initData(vm)
  } else {
    observe(vm._data = {}, true /* asRootData */)
  }
  if (opts.computed) initComputed(vm, opts.computed)
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch)
  }
}
```