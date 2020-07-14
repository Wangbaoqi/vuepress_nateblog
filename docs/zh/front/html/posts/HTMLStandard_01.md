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

*HTML 必须由下面几部分顺序组成*

1. 可选地，单个 `u + feff` 字节顺序标记(BOM)字符。
2. 注释和任意的`ASCII`空格
3. 一个 `DOCTYPE`
4. 注释和任意的`ASCII`空格
5. document 元素，以HTML元素的形式
6. 注释和任意的`ASCII`空格

### DOCTYPE 文档类型

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

上述的`doctype`是基于**HTML5**的，而在**HTML5**之前的版本**HTML4**是怎们定义的呢？

在**HTML4**以及之前的版本，HTML是SGML的子应用，所以有些规范要遵从SGML。`DOCTYPE`的声明的用法是创建对文档类型定义**DTD**的引用，**DTD**是负责指定`SGML`的规则，可以使浏览器正确的处理内容。
但是**HTML5**中，则不用声明**DTD**，因为HTML5不是基于SGML的。


### Elements 元素

在HTML文档中，elements是重要的组成部分，主要有**6**种不同元素类型，`Void Elements`, `Template Elements`, `Raw Text Elements`, `Escapable Raw Text Elements`, `Foreign Elements`以及`Normal Elements`。

`Tag` 是用来分隔元素的开始和结束标记的。**Raw Text Elements**，**Escapable Raw Text Elements** 和 **Normal Elements** 都有一个起始标记和结束标记，比如是`<script></script>`、`<title></title>`和`<div></div>`等。某些**Normal Elements**可以省略结束标记。**Void Elements** 不能指定结束标记，只能出现起始标记。

`Content` 元素的内容必须是放在起始标记和结束标记之中的。不同类型的元素的允许的内容是不一致的，这个要符合其规范或者语义化。


**Void Elements**

*area*, *base*, *br*, *col*, *embed*, *hr*, *img*, *input*, *link*, *meta*, *param*, *source*, *track*, *wbr*

这种元素的`Tag`没有结束标记，比如`<br/>`, 元素之间不能出现内容

**Template Elements**

*template*

模板元素可以有模板内容，但是这样的模板内容不是模板元素本身的子元素。相反，它们存储在一个与另一个文档相关的 DocumentFragment 中，没有浏览上下文，以避免模板内容干扰主文档。模板元素的模板内容的标记放在模板元素的开始标记之后和模板元素的结束标记之前(与其他元素一样) ，可以包含任何文本、字符引用、元素和注释，但文本不能包含字符 u + 003 c LESS-THAN SIGN (<)或不明确的符号。

**Raw Text Elements**

*script*, *style*

原始文本元素可以有文本，但是它有描述的限制。

**Escapable Raw Text Elements**

*textarea*, *title*

可逃避的原始文本元素可以有文本和字符引用，但文本不能包含含义不明确的符号。还有的进一步限制。

**Foreign Elements**

*elements from MathML namespace and SVG namespace*

标记为自动关闭标记的外部元素不能有任何内容(因为同样没有结束标记，所以不能在开始标记和结束标记之间放置任何内容)。起始标记未标记为自关闭的外部元素可以包含文本、字符引用、 CDATA 节、其他元素和注释，但文本不能包含字符 u + 003 c LESS-THAN SIGN (<)或不明确的符号

**Normal Elements**

*html elements*

普通元素可以包含文本、字符引用、其他元素和注释，但文本不能包含字符 u + 003 c LESS-THAN SIGN (<)或含义不明确的符号。除了内容模型和本段中描述的限制之外，一些常规元素还对它们允许包含的内容有更多的限制。


**Start Tag 起始标签** 

开始标签遵循以下的格式：

1. 第一个字符必须是`U+003C` LESS-THAN SIGN 字符(<)
2. 紧接着就是`tagName`了
3. 如果接下来有`Attributes`，则之前要有一个或多个空格字符
4. 属性之后，如果该元素是**Void Elements** 或者 **Foreign Elements**，则可能存在单个字符`/`，该字符对**Void Element** 没有影响，对于**Foreign Element**，则是起到自闭合标签的作用
5. 最后，开始标签闭合通过使用字符`>`

**End Tag 结束标签** 

结束标签遵循以下的格式：

1. 第一个字符必须是字符`<`
2. 第二个字符必须是字符`/`
3. 接下来是标签名
4. 标签名之后，可能有一个或多个空格字符
5. 最后，结束标签通过字符`>`关闭

**Attributes 属性**

元素的属性在开始标签中表示。

属性是以`name-value`键值对的方式呈现的.

`name`必须由空格字符以外的一个或多个字符组成: u + 0000 NULL，u + 0022引号(”) ，u + 0027 APOSTROPHE (’) ，u + 003 e GREATER-THAN SIGN (>) ，u + 002 f SOLIDUS (/) ，u + 003 d EQUALS SIGN (=)字符，控制字符，以及 Unicode 未定义的任何字符。在 HTML 语法中，属性名称，即使是外部元素的属性名称，也可以使用任何大小写混合字母编写，这些字母是对属性名称的 ASCII 不区分大小写的匹配。

`value`是文本和字符引用的混合体，除了文本不能包含含义不明确的符号以外。

属性可以通过四种方式来指定






## reference 

* *Hyper Text Markup Language version 2.0* [Hyper Text Markup Language version 2.0](https://www.ietf.org/rfc/rfc1866.txt)
* *Hyper Text Markup Language version 3.2* [Hyper Text Markup Language version 3.2](https://www.w3.org/MarkUp/Wilbur/)
* *Hyper Text Markup Language version 4.0* [Hyper Text Markup Language version 4.0](https://www.w3.org/TR/1998/REC-html40-19980424/)
* *Hyper Text Markup Language version 5.0* [Hyper Text Markup Language version 5.0](https://www.w3.org/TR/html51/index.html#contents)

* *HTML4 DTD* [HTML4 DTD](https://www.w3.org/TR/html4/strict.dtd)