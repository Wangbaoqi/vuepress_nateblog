---
type: web-http
tag: http
lang: zh
excerpt: '浏览器中输入地址后，发生了什么。。。'
---

# HTTP系列(一) - 浏览器发起HTTP请求 

::: tip
在学习HTTP之前，有一个老生常谈的话题，在浏览器输入URL之后，浏览器是怎么呈现页面的? 
:::

[[toc]]

随着对这个问题的探讨，逐步的走进HTTP的世界。

## 输入URL

在浏览器中输入地址，浏览器是如何把URL转换成页面的呢 

![url](https://cdn.img.wenhairu.com/images/2020/05/11/YpkEH.png)

比如输入**https://wangbaoqi.github.io**

* DNS解析 - 将域名解析成IP地址
* TCP握手 - 应用层下发数据给传输层
* TLS握手 - 数据进行加密
* 数据进入服务端之前，可能还会进过负责负载均衡的服务器，将请求合理的分发到多态服务器上
* 浏览器判断状态码 - 200 304 500 
* 浏览器会解析文件 - 如果是gzip格式会解压一下，通过文件的编码格式去解析文件
* 文件解码成功会正式开始渲染流程。



## HTTP协议

HTTP(HyperText Transfer Protocol) is a **stateless(无状态)** application-level **request/response** protocol that uses **extensible semantics(可扩展语义)** and **self-descriptive(自描述)** message payloads for flexible interaction with network-based **hypertext information** systems. - from **RTC7230**。

HTTP是一种能够获取HTML这样的网络资源的通讯协议。是web上进行数据交换的基础，是一种client-server协议。

HTTP是应用层的协议，通过TCP或者TLS(加密的TCP)连接来发送信息，不仅用来传输超文本文档，也可以传输图片、视频，也可以部分文档内容更新网页。



### HTTP消息格式

HTTP的协议格式应该很熟悉了。

**请求协议**
![request](https://mdn.mozillademos.org/files/13687/HTTP_Request.png)

**响应协议**
![request](https://mdn.mozillademos.org/files/13691/HTTP_Response.png)

而HTTP的这种固定的格式是怎么产生的，都知道，每一门语言都有它的**产生式**，比如说JavaScript语言的产生式是**巴克斯-诺尔范式(BNF)**，它是一门元语言，可以用来定义其他的语言。而HTTP消息格式是通过**扩充的巴克斯-诺尔范式(ABNF) 产生的。

**基于ABNF描述的HTTP消息格式**

```sh
GET /repos/Wangbaoqi/vuepress_nateblog/issues/5/comments?client_id=a23f205915aa92389c63&client_secret=50c3b3127e01f7f17c582b38f64fd721faae1688&per_page=10&page=1 HTTP/1.1 # start-line
# header-field
Host: api.github.com
Connection: keep-alive
Origin: https://wangbaoqi.github.io
Referer: https://wangbaoqi.github.io/nate.wang/front/
Accept-Encoding: gzip, deflate, br
Accept-Language: en,zh-CN;q=0.9,zh;q=0.8,zh-TW;q=0.7

HTTP/1.1 200 OK # start-line
# header-field
Server: GitHub.com
Date: Mon, 11 May 2020 14:00:23 GMT
Content-Type: application/json; charset=utf-8
Transfer-Encoding: chunked
Status: 200 OK
Cache-Control: public, max-age=60, s-maxage=60
Access-Control-Allow-Origin: *
Content-Encoding: gzip

# message-body
{
  "created_at": "2019-11-18T02:03:26Z",
  "updated_at": "2019-11-18T02:03:26Z",
  "author_association": "OWNER",
  "body_html": "<p>测试 gitalk</p>",
  "body_text": "测试 gitalk",
  "body": "测试 gitalk "
}
```
通过**wireshark**抓包工具也可以看到HTTP消息的格式

![wireshark](https://cdn.img.wenhairu.com/images/2020/05/11/Y58qK.png)


### 网络分层

**OSI(Open System Interconnection Reference Model)** 是一个概念模型，并没有完全实现。

![OSI](https://cdn.img.wenhairu.com/images/2020/05/11/YpQhd.png)



接下来简单的了解一下网络五层网络模型
![model](https://cdn.img.wenhairu.com/images/2020/03/23/qMf4N.jpg)


![tcp/ip](https://cdn.img.wenhairu.com/images/2020/05/11/YpvRj.png)


![网络分层](https://cdn.img.wenhairu.com/images/2020/05/11/Ypxbg.png)

## Reference

* [HTTP 规范](https://tools.ietf.org/html/rfc7230)
* [ABNF 扩充巴克斯-诺尔范式](https://tools.ietf.org/html/rfc5234)