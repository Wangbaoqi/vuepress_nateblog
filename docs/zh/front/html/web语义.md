---
type: front-html
tag: html
excerpt: 'HTML5 是定义 HTML 标准的最新的版本; 它是一个新版本的HTML语言，具有新的元素，属性和行为,它有更大的技术集，允许构建更多样化和更强大的网站和应用程序'
---


# web语义化

::: tip
HTML5 是定义 HTML 标准的最新的版本; 它是一个新版本的HTML语言，具有新的元素，属性和行为,它有更大的技术集，允许构建更多样化和更强大的网站和应用程序
:::

## 理解语义化

1. 正确的标签做正确的事情
2. 页面内容结构化
3. 无CSS样子时也容易阅读，便于阅读维护和理解
4. 便于浏览器、搜索引擎解析。 利于爬虫标记、利于SEO

## 新增语义标签

**HTML5 中新的区块和段落元素一览**

```html
<section>,<article>,<nav>,<header>,<footer>,<aside>,<hgroup>,<mark>,
<figure>,<figcaption>,<data>,<time>,<output>,<progress>,<meter>,<main>
```


**使用 HTML5 的音频和视频**

audio 和 video 元素嵌入和允许操作新的多媒体内容。


**表单的改进**

web 表单的改进：强制校验API，一些新的属性，一些新的 input元素type 属性值，新的 output元素。

1. required - 需要校验 增加样式 类似边框 css valid and invalid
2. pattern - 正则校验
3. minlength maxlength - 长度校验 type = 'text'
4. min max - 长度校验 type = 'number'

[more-API-prefer-here](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Forms/Data_form_validation)


## 块级元素 行内元素 空元素

**块级元素**
```html
<!-- 块级元素 以下 以及设置display: block 的元素 -->
<p>
<div>
<header>
<article>
<aside>
<section>
<footer>
<ul>
```

**行内元素**

```html
<!-- 行内元素 以及设置display: inline 的元素 -->
<span>
<a>
<img>
<input>
```

**空元素**

```html
<br>
<hr>
```

## 优化HTML

1. 插入HTML。
   JavaScript中使用document.write生成页面内容会效率较低，可以找一个容器元素，比如指定一个div，并使用innerHTML来将HTML代码插入到页面中。
2. 避免空的src和href。
   当link标签的href属性为空、script标签的src属性为空的时候，浏览器渲染的时候会把当前页面的URL作为它们的属性值，从而把页面的内容加载进来作为它们的值。
3. 为文件头指定Expires。
   使内容具有缓存性，避免了接下来的页面访问中不必要的HTTP请求。
4. 利用LocalStorage合理缓存资源。
   尽量避免CSS表达式和滤镜。
5. 尝试使用defer方式加载Js脚本。
6. 为不同的Viewports设置不同大小的Content。
7. 缓存离线机制：Service Workers。
8. 资源优化Resource Hints(preconnect, preload, 和prerender)。

