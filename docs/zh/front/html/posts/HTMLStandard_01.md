---
type: front-html
tag: HTML
lang: zh
excerpt: ''
---

# HTML Standard 系列 - 你不知道的HTML 

::: tip
HTML（Hyper Text Markup Language）简称超文本标记语言，是用于构造网页以及其内容的代码，但是它不是一门编程语言，是定义内容结构话的标记语言。
HTML包含了一系列的元素，这些元素可以包装不同类型的内容让其优雅的展示在网页中。
:::

关于[HTML的发展](/zh/front/#html-知识脑图)，可以了解一下。**WWW(World Wide Web)万维网**是一个信息资源的网络，而它需要依靠`URL`、`HTTP`和`HTML`三种机制才能将资源提供给使用者。


## HTML 语法



### 编写HTML Documents

*HTML 必须由下面几部分顺序组成*

1. 可选地，单个 `u + feff` 字节顺序标记(BOM)字符。
2. 注释和任意的`ASCII`空格
3. 一个 `DOCTYPE`
4. 注释和任意的`ASCII`空格
5. document 元素，以HTML元素的形式
6. 注释和任意的`ASCII`空格


**DOCTYPE 文档类型**

`doctype`由于遗留问题，必须要使用，否则浏览器解析可能不会遵循相关规范。

`doctype`由以下几部分顺序组成。

1. 一个字符串 `<!DOCTYPE`
2. 一个或多个`ASCII`空格
3. 一个字符串**html**
4. 可选的**DOCTYPE legacy string**
5. 0个或者多个`ASCII`空格
6. 一个字符**U+003E**(>)

**DOCTYPE legacy string** （遗留字符串），除非文档来自无法输出较短字符串的系统，否则不建议使用。

```html
<!DOCTYPE html> 
<!-- **DOCTYPE legacy string** -->
<!DOCTYPE html SYSTEM "about:legacy-compat">
<!DOCTYPE html SYSTEM 'about:legacy-compat'>
```



















## reference 

* *Hyper Text Markup Language version 2.0* [Hyper Text Markup Language version 2.0](https://www.ietf.org/rfc/rfc1866.txt)
* *Hyper Text Markup Language version 3.2* [Hyper Text Markup Language version 3.2](https://www.w3.org/MarkUp/Wilbur/)
* *Hyper Text Markup Language version 4.0* [Hyper Text Markup Language version 4.0](https://www.w3.org/TR/1998/REC-html40-19980424/)

* *HTML4 DTD* [HTML4 DTD](https://www.w3.org/TR/html4/strict.dtd)