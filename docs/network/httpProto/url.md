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

URL用字符串标识互联网资源。也就是用某个协议表示的资源定位标识符，比如HTTP协议、FTP协议等。标准的[URL协议](https://www.iana.org/assignments/uri-schemes/uri-schemes.xhtml)有30多种。

常见的协议有以下几种:

```js
ftp://ftp.is.co.za/rfc/rfc1808.txt
http://www.ietf.org/rfc/rfc2396.txt
ldap://[2001:db8::7]/c=GB?objectClass?one
mailto:John.Doe@example.com
news:comp.infosystems.www.servers.unix
tel:+1-816-555-1212
telnet://192.0.2.16:80/
urn:oasis:names:specification:docbook:dtd:xml:4.1.2
```

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

通用URI语法由组件的层次结构序列组成，包括**scheme**，**authority**，**path**，**query**以及**fragment**。

![uri component](https://cdn.img.wenhairu.com/images/2020/05/28/Ysze0.png)

**URI格式语法组成**，是遵循`ABNF`产生式来定义的。

``` sh
URI = scheme ":" hier-part [ "?" query ] [ "#" fragment ]

hier-part = "//" authority path-abempty
          / path-absolute
          / path-rootless
          / path-empty
```


**Scheme**

每个URI均以Scheme名称开头，由一系列字符（`字母`，`数字`，`+`，`.`或者`-`）任意组成，规范格式为小写，接收与小写字母等效的大写字母(HTTP和http)，不过建议使用小写。

*scheme = ALPHA * (ALPHA / DIGIT / " +" / "-"/ ".")*

*例如* `http`、`ftp`、`telnet`、`https`、`file`或者`mailto`


**Authority**

授权验证前面有`//`，并且由下一个`/`、`?`或者数字符号`#`字符终止URI

*authority = [ userinfo "@" ] host [":" port]*

根据`ABNF`语法 *[ userinfo "@" ]和[":" port]*是可以忽略的，因此我们常见的URI为`google.com`

*userinfo = * user: password* 代表用访问host是需要验证信息

*port = * DIGIT* HTTP默认端口为`80`，HTTPS默认端口为`433`

**Path**

path一般包含通常以分层形式组织的数据以及非分层query数据，这些数据用于表示服务端中的资源。

``` sh
path =  path-abempty: 以"/" 或者 ""开始
        / path-absolute 以"/"开始 不能是"//"
        / path-rootless 
        / path-empty
```

path 由一系列的path段组成，这些段由`/`分隔。

**Query**

query包含了非分层数据，以及路径组件中的数据。由第一个问号`?`字符开始，并由数字符号`#`字符或者URI末尾终止。

*query = *(pchar /" /" /"? ")*

### URL

URL(Uniform Resource Locator) 











## Reference 

* [Uniform Resource Identifier 规范](https://tools.ietf.org/html/rfc3986)
* [Uniform Resource Locator 规范](https://tools.ietf.org/html/rfc1738) 
* [Uniform Resource Name 规范](https://tools.ietf.org/html/rfc2141)

