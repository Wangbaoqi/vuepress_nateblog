---
type: front-css
tag: CSS
lang: zh
excerpt: ''
---

# CSS系列(一) - CSS语法机制


::: tip
CSS(Cascading Style Sheets) 允许创建漂亮的网站。它也是一门语言，所谓语言，也是具有语法特性的。
:::

首先看一下整理的CSS脑图

![css-mind](https://cdn.img.wenhairu.com/images/2020/06/12/f5GDG.png)


## CSS 语法描述

关于CSS的语法规范目前可以在[CSS2.1 specification](https://www.w3.org/TR/CSS21)和[CSS Syntax Module Level 3](https://www.w3.org/TR/css-syntax-3/)规范中查到。


### CSS Statement 

规则集是样式表的主要构建块，样式表通常只包含大量规则集。 但是 Web 作者还想在样式表中传达其他信息，比如字符集、要导入的其他外部样式表、字体正面或列表计数器描述等等。 它将使用其他和特定类型的语句来实现这一点。

语句是一个构建块，它以任何非空格字符开始，以第一个结束大括号或分号结束(在字符串之外，非转义，不包含在另一个{}、()或[]对中)。

**语句种类**

1. RulesSets(规则集)： 将一组CSS声明关联到由选择器描述的条件的规则集（或规则）。
2. At-Rules： @rules

### CSS Rule

CSS是一系列的`规则`(普通规则和@规则)组成。

* 普通规则 - 是对文档中元素应用限定规则。是一个选择器，指定声明应用到那些元素。每个声明都有一个名称，后面跟`:`和值。声明之间用`;`分隔
  
```css
p > div {
  color: '#333'
}
/* p > div 是选择器*/
/* color: '#333' 是声明 */
```
  
* @rule - 定义特殊的处理规则或值，类似于@media。他们都是不同的，但它们有一个共同的基本结构，都是以`@`开头，后面跟着对应的名称作为CSS关键字。
有些`@rule`是简单的语句，其名称后跟更富哦的CSS值来指定他们的行为，最后以分号结束。其他的是块，可以在名称后面有CSS值，他们以`{}-wrapped`块结束。

```css
/* 导入对应的样式表 */
@import "style.less";

/* 可选的页选择器 */4
@page :left {
  margin-left: 3px;
}
```


  
## CSS 总体结构

根据[CSS2.1规范](https://www.w3.org/TR/CSS21/grammar.html#q25.0)语法部分可以看到，CSS的整体结构大概为:

* `@charset`
* `@import`
* `rules`
  * `@media`
  * `@page`
  * `rule`


### At-Rules

一个`at-rule`是一个语句，以at符号开头, '@' (U+0040), 后跟一个标识符，并包括直到下一个分号的所有内容, ';' (U+003B SEMICOLON), 或下一个CSS块，以先到者为准。

从上述的脑图中可以看到`@rule`的种类。

**@charset**字符集 

`@charset` 是指定样式表中使用的字符编码。必须是样式表中的第一个元素，前面不得有任何字符。若有多个`@charset`被声明，只有第一个起作用。

* 当样式表嵌入到另一个文档(HTML中style元素或者style属性)中时，样式表中会共享整个文档中字符编码
* 当样式表驻留在单独的文件中，用户代理在确定样式表的字符编码时的优先级
  1. Content-Type: Http中header中的charset中属性给出的值
  2. CSS样式表中 @charset
  3. *<link>*元素中的`charset`属性，该方法在`HTML5`中已经废弃。或者`metadata`元数据的值
  4. 假设 UTF-8







## Reference

* [CSS2.1 Specification](https://www.w3.org/TR/CSS21/) 
* [CSS Syntax](https://www.w3.org/TR/css-syntax-3/)