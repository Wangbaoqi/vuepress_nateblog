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


## CSS 语法

CSS是一系列的`规则`(普通规则和@规则)组成。

* 普通规则 - 是对文档中元素应用限定规则。是一个选择器，指定声明应用到那些元素。
* @rule - 定义特殊的处理规则或值，类似于@media。


  
根据[CSS2.1规范](https://www.w3.org/TR/CSS21/grammar.html#q25.0)语法部分可以看到，CSS的整体结构大概为:

* `@charset`
* `@import`
* `rules`
  * `@media`
  * `@page`
  * `rule`










## Reference

* [CSS2.1 Specification](https://www.w3.org/TR/CSS21/) 
* [CSS Syntax](https://www.w3.org/TR/css-syntax-3/)