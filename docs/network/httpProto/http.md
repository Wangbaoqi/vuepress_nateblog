---
type: web-http
tag: http
lang: us
excerpt: 'Http'
---

# 简单的HTTP协议

::: tip
在学习HTTP之前，有一个老生常谈的话题，在浏览器输入URL之后，浏览器是怎么呈现页面的? 
:::

[[toc]]

随着对这个问题的探讨，逐步的走进HTTP的世界。

## 输入URL

在浏览器中输入地址，浏览器是如何把URL转换成页面的呢 

![url](https://cdn.img.wenhairu.com/images/2020/03/23/qMN8s.png)

比如输入**https://wangbaoqi.github.io**

* DNS解析 - 将域名解析成IP地址
* TCP握手 - 应用层下发数据给传输层
* TLS握手 - 数据进行加密
* 数据进入服务端之前，可能还会进过负责负载均衡的服务器，将请求合理的分发到多态服务器上
* 浏览器判断状态码 - 200 304 500 
* 浏览器会解析文件 - 如果是gzip格式会解压一下，通过文件的编码格式去解析文件
* 文件解码成功会正式开始渲染流程。

渲染流程会在性能文章中体现，此篇文章中会针对学习HTTP

接下来简单的了解一下网络五层网络模型
![model](https://cdn.img.wenhairu.com/images/2020/03/23/qMf4N.jpg)

## http协议

HTTP是一种能够获取HTML这样的网络资源的通讯协议。是web上进行数据交换的基础，是一种client-server协议。

HTTP是应用层的协议，通过TCP或者TLS(加密的TCP)连接来发送信息，不仅用来传输超文本文档，也可以传输图片、视频，也可以部分文档内容更新网页


**HTTP组件系统**

HTTP是client-server协议，请求通过一个实体（用户代理）发出，大部分这个实体是指浏览器。发送到服务器的请求，都会被服务器处理并且返回一个消息（response）。
请求和相应之间，会有很多的```proxies```(代理), 可能是网关，也可能是caches，也有可能还有路由器等。之间的传输层和网络层的细节被隐藏起来了，大部分跟HTTP描述不相干

1. user-agent 

user-agent是任何能够为用户发起行为的工具。这个角色一般由浏览器扮演

一般可以再一个请求头中看到
```sh
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36
```

2. proxies - 代理

浏览器和服务器中间，会有许多计算机和其他设备穿法了HTTP消息，大部分都会出现在传输层、网络层和物理层上，但是有部分还是出现在应用层上，这些被称为```proxies```代理。

代理主要有以下几种作用：
* 缓存 - 类似浏览器的缓存
* 过滤 - 像反病毒扫描
* 负载均衡  - 多个服务器服务不同的请求 
* 认证 - 不同的资源进行权限管理
* 日志记录 - 存储历史信息

3. web服务端

web server来提供客户端所请求的文档，server只是一个虚拟的机器，可以是负载均衡的一组服务器组成的计算机集群。sever也不一定是一台机器，但一个机器中可以有很多个server 

**HTTP的基本性质**

1. HTTP是简单的 - 报文能够读懂，允许简单测试
2. HTTP是可扩展的 - Header中可以新增达成一致的新属性 
3. HTTP是无状态、有会话的 - cookie会话的存在可以让每个请求共享相同的上下文信息，达成相同的状态
4. HTTP和连接 - client-server之间的通信连接是由传输层协议控制的，通常面向安全的协议是TCP协议，而在HTTP1.0版本中，每发送一个请求时，就会打开一个单独的TCP连接，而这种方式在同时有多个请求的时候，会比多个请求共享一个连接来的更低效。HTTP1.1 中引入了持久连接的概念，可以通过```connection```头部来控制。而HTTP2则是通过一个连接复用消息的方式来让这个连接时钟保持为暖连接


**HTTP控制什么**

* 缓存 - 文档如何缓存可以通过HTTP来控制。
* 开发同源策略 - 修改头部开发同源策略的限制 
* 认证 - 一些页面仅让特定的用户访问 可以通过HTTP来控制 
* 代理和隧道 - 对外隐藏内网中的IP地址
* 会话 - cookie允许用一个服务端的状态发起请求，这就创建了会话 

**HTTP流**

当客户端跟服务端进行信息交互时，主要有以下几个步骤:

1. 首先建立一个TCP连接: TCP连接用来发送一个或者多个请求，也可以打开多个TCP连接，或者一个TCP连接进行复用
2. 之后发送HTTP报文: 在HTTP/2之前是可读的，HTTP/2将报文封装在帧中，不能被直接读取，但是原理是一样的
请求报文
```sh
GET / HTTP/1.1
HOST: localhost:8080
Accept-Language: zh-CN
```
3. 读取服务端返回的报文信息
响应报文
```sh
HTTP/1.1 200 OK
Date: Thu, 26 Mar 2020 13:47:20 GMT
Content-Type: application/json; charset=utf-8
Server: Github.com
```
4. 关闭连接或者为后续的请求复用连接

**HTTP报文**
HTTP/1.1及以前的版本的报文是语义可读的，在HTTP/2.0中，报文的信息被放到了新的二进制结构中，也就是帧。
有两种的报文类型： 请求报文和相应报文

* 请求报文

![request](https://mdn.mozillademos.org/files/13687/HTTP_Request.png)

请求报文的组成部分:
1. method - 请求方法 一般有 GET POST PUT DELETE 
2. path - 获取资源的路径 没有协议http:// 只有域名 - domain 或者是端口号 
3. HTTP版本号
4. 请求头信息
5. 对于post请求，body就包含了发送的资源

* 响应报文

![request](https://mdn.mozillademos.org/files/13691/HTTP_Response.png)
响应报文的组成部分:
1. 协议的版本号
2. 状态码 200 304 等
3. 状态信息 可以自行定义
4. 响应头信息 
5. 响应体 

