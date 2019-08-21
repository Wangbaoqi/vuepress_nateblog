# web语义化

::: tip
HTML5 是定义 HTML 标准的最新的版本; 它是一个新版本的HTML语言，具有新的元素，属性和行为,它有更大的技术集，允许构建更多样化和更强大的网站和应用程序
:::

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

