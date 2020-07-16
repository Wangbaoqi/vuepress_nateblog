---
type: front-html
tag: HTML
lang: zh
excerpt: 'HTML语法系列之解析HTML文档'
---

# HTML Standard 系列 - HTML语法-解析HTML文档

::: tip
HTML 解析过程的输入由一系列代码点组成，这些代码点通过一个标记化阶段，然后是树构造阶段。输出是一个 Document 对象。
:::

## 解析模型概述

解析HTML也是浏览器页面渲染的一部分，而这个过程是怎么解析的呢？又是怎么产生最终的**Document**对象的呢？

在浏览器工作原理中，浏览器通过网络请求获取HTML资源（文件字节流）是没有办法让渲染引擎理解的，因此要将它转换为渲染引擎能够理解的结构，而这个结构就是**DOM**

**DOM 层面的作用**

1. 页面视角，DOM是生成页面的基本数据结构
2. 脚本视角，DOM提供给JS操作DOM的接口，从而可以对节点进行处理
3. 安全视角，一段不安全的DOM在解析的时候就会被拦截

**DOM 树的生成**

![DOM-parsing](https://cdn.img.wenhairu.com/images/2020/07/16/frznG.png)