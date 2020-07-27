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

解析的过程是按照HTML语法将字节流转换成不同类型的**token**，例如`startTag`, `endTag`，`Text`等。



**之后，就是将token解析成DOM节点，以及将DOM节点添加到DOM树中**


在分词阶段，HTML Parsing 会维护一个`Token栈`，之前生成token会按顺序进行入栈，入栈的过程中，会有以下的操作：

1. 如果判断当前**token**是`startTag`类型的话，解析器会创建一个DOM节点，添加到DOM树中，父节点就是相邻的节点
2. 如果解析的**token**是`Text`文本类型的话，解析器会创建一个文本节点，添加到栈中相邻的的DOM节点，也就是父节点
3. 如果解析的**token**是`endTag`类型的话，解析器就会查看栈顶的元素是不是对应的`startTag`，如果是，将`startTag`从栈中弹出，表明此节点解析完成

在解析的时候，解析器会默认的创建一个根为`Document`的DOM结构，同时将document`startTag`的token添加到栈中。

实现HTML Parsing大概有以下几个步骤:

1. 初始化FSM（状态机）
2. 解析标签（parseTag）
3. emitToken
4. attribute
5. 构造树
6. combineText
  

### 初始化FSM（状态机）

这里简单的描述了[状态机](zh/webApi/browser/posts/statusMachine.html)的实现方式。接下来用状态机简单实现ParseHTML。


在解析HTML中，常见的state有:

* `Data state` - 主要接受下一个输入的字符
* `tagOpen state` - 开始标签，主要是`<`之后的字符
* `tagname state` - 标签名称
* `endTagOpen state` - 结束标签，主要`>`
* `beforeAtributeName state` - 处理属性名之前的操作
* `afterAttributeName state` - 处理属性名之后的操作状态


输入字节流来自网络进程，例如我们编写的HTML 文档，以下面的HTML为输入流来进行解析。

```html
<html maaa=a >
  <head>
    <style>
      #container{
          width:500px;
          height:300px;
          display:flex;
          background-color:rgb(255,255,255);
      }
      #container #myid{
        width:200px;
        height:100px;
        background-color:rgb(255,0,0)
      }
      #container .c1{
        flex:1;
        background-color:rgb(0,255,0)
      }
    </style>
  </head>
  <body>
      <div id="container">
        <div id="myid"></div>
        <div class="c1"></div>
      </div>
  </body>
</html>
```


```js
// end of file
let EOF = Symbol('EOF');
// 状态机入口 
function dataState() {

}
// parseHtml.js
module.exports = function parseHtml(html) {
  // 状态机初始处理状态
  let state = dataState;
  // 循环处理每个字节流
  for(let c of html) {
    state = state(c)
  }
  // 结束状态机
  state = state(EOF)
}
```

这里初始化了标识`EOF`（其实是文件结束的token）、`dataState`（状态机入口），以及遍历字节流字符，处理每个不同的*token*会返回下一个处理对应类型的*token*，最后结束状态机。


#### 解析标签

在这一步，主要实现解析标签的状态机，比如`startTag`、 `endTag`、`tagName`、`selfCloseStartTag`以及`beforeAttributeName`等状态。

在这里先完善`dataState`入口状态机，如果接受到的字符是`<`，则就会被认为是一个**startTag**(开始标签)，之后就会进入到`tagOpenState`状态机，如果`c`是**EOF**，则就*emit*一个类型为**EOF**，表明是结束状态机。


```js
// end of file
let EOF = Symbol('EOF');
// 当前token
let currentToken = null;
// 当前token属性
let currentAttribute = null;
// 当前token文本节点
let currentTextNode = null;


/**
 * 初始状态
 * @params c 
 * @return state 
 **/ 
function dataState(c) {
  if(c == '<') {
    return tagOpenState
  }else if(c == 'EOF') {
    return emit({
      type: 'EOF'
    })
  }else {
    return emit({
      type: 'text',
      content: c
    })
  }
}
// parseHtml.js
module.exports = function parseHtml(html) {
  // 状态机初始处理状态
  let state = dataState;
  // 循环处理每个字节流
  for(let c of html) {
    state = state(c)
  }
  // 结束状态机
  state = state(EOF)
}
```
上述代码中，定义了状态机入口、token栈、以及记录当前节点的信息。接下来就实现不同类型的**state**，首先实现的`tagOpenState`，这个状态是实现**startTag**起始标签的。


```js
/**
 * 起始标签
 * @param c 
 * @return state
 **/ 
function tagOpenState(c) {
  if(c == '!') {
    // 处理doctype 
    return markUpOpenState
  }else if(c == '/') {
    // 结束标签打开状态
    return endTagOpenState
  }else if(c.match(/^[a-xA-Z]$/)) {
    // 处理标签名称, 将当前字节流代理到tagName
    currentToken = {
      type: 'startTag',
      tagName: ''  
    }
    return tagNameState(c)
  }else if(c == 'EOF') {
    emit({
      type: 'EOF'
    })
  }else {
    emit({
      type: 'text',
      content: c
    })
  }
}

function endTagOpenState() {
  
}
```



 








