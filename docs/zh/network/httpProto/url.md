---
type: web-http
tag: NetWork
lang: zh
excerpt: ' '
---

# HTTP系列(二) - Uniform Resource Identifier

::: tip
URI 统一资源标识符是紧凑的字符序列，提供了一种简单可扩展的方式来表示抽象或者物资源。比如每一台web服务器中资源名称也被称为URI。
:::

相比URI，我们更加熟悉`URL`，除此之外，还有类似的`URN`，而URI是其他两者的超集。接下来先看下URI。

## URI

在URI规范`RFC3986`中分别对`Uniform`、`Resource`和`Identifier`进行了定义。主要有以下三个特性：


**Uniform**

* 规定统一的格式（语法）处理不同类型的资源标识符。eg. 在HTML中图片请求和脚本的请求类型就完全不一致
* 允许引入新类型的资源标识符，不会干扰现有的资源类型。eg. video 和 audio
* 允许标识符在不同的上下文中重用

**Resource**

* 可以是图片、文档、温度等，也可以是抽象的概念，数字、类型等
* 一个资源可以有多个URI
  
**Identifier**

* 当前资源与其他资源区分开的名称


### URI组成部分




### URL

URL(Uniform Resource Locator) 











## Reference 

* [Uniform Resource Identifier 规范](https://tools.ietf.org/html/rfc3986)
* [Uniform Resource Locator 规范](https://tools.ietf.org/html/rfc1738) 
* [Uniform Resource Name 规范](https://tools.ietf.org/html/rfc2141)

