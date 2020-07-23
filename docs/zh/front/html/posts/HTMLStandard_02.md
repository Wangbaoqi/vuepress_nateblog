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

DOM树的生成大概可以看下面的图。

**HTML parsing 不是等HTML文档加载完成之后再解析，而是边加载变解析。

首先网络进程接收到响应头中的`Content-type`，如果是`text/html`，就会判断是`html`文件，会选择创建一个渲染进程，*网络进程和渲染进程之间会有一个共享的管道*，网络进程获取到数据之后，会通过这管道传输到渲染进程，渲染进程拿到数据之后就会进行`解析`，也就是通过**HTML Parsing**，结束之后就会产生DOM对象。


![DOM-parsing](https://cdn.img.wenhairu.com/images/2020/07/16/frznG.png)



## 解析HTML文档

网络进程获取到HTML文档后，是怎么一步一步的将HTML文档解析成DOM树的。

**首先，通过分词器将字节流转换成Token**

解析的过程是按照HTML语法将字节流转换成不同类型的**token**，也类似于**state**，在*HTML Standard*中state大概有**80**种，这里我主要实现以下常见的state。

常见的state有:

* `Data state` - 主要接受下一个输入的字符
* `tagOpen state` - 开始标签，主要是`<`之后的字符
* `tagname state` - 标签名称
* `endTagOpen state` - 结束标签，主要`>`
* `beforeAtributeName state` - 处理属性名之前的操作
* `afterAttributeName state` - 处理属性名之后的操作状态





 








