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



**OSI(Open System Interconnection Reference Model)** 是一个概念模型，是一种通用架构，分为七层，但是并没有完全实现。

![OSI](https://cdn.img.wenhairu.com/images/2020/05/11/YpQhd.png)

**应用层(Application)**

在应用层中，主要应用到的协议有DNS和HTTP协议

* DNS: 域名解析，将浏览器中输入的地址解析成IP地址
* HTTP: 从对应IP地址服务器获取资源
  
其他常用的协议:
* FTP: 文件传输协议，用来在客户机和FTP服务器之间传输文件
* DHCP: 动态主机配置协议，DHCP服务器为客户机动态分配IP地址
* POP3: 邮件接收协议，用于从POP3服务器接收邮件
* SMTP: 邮件发送协议，用户通过SMTP服务器发送邮件

**表示层(Presentation)**

表示层主要是数据的展示，以及主要功能是`转换`、`压缩`和`加密`

**会话层(Session)**
会话层主要是两个应用程序`进程`之间的逻辑连接，连接期间进行交换数据。主要作用就是为`创建`、`管理`和`终止会话`提供必要的方法。

**传输层(Transport)**
传输层主要提供数据的传输服务，实现端到端的传输或者主机对主机的传输，有可靠和不可靠传输。

主要应用在传输层的协议有`TCP`和`UDP`。

TCP(Transport Control Protocal) 传输控制协议：TCP在传输之前必须要建立一个连接，用来进行可靠数据传输。
UDP(User DataGram Protocal) 用户数据协议：UDP是一种简单的传输协议，不能提供可靠的传输协议。

**网络层(NetWork)**
网络层关心的是把一个数据从一个设备发送到另一个设备。这另外一个设备有可能是本地网络中或者很远的网络中。

网络层提供了`地址`、`路由`、`分段`和`重组`

网络层主要的协议有`IP`协议，主要就是为了这些功能设计的。目前`IP`有两个版本`IPv4`和`IPv6`。

IPv4: 使用`32`位二进制地址，表示方法一般是用`.`隔开的4个数字，每个数字的范围是0-255，类似这样表示`192.168.1.1`。
IPv6: 使用`128`位二进制地址，表示方法一般用冒号隔开的8个字，每个字都用十六进制表示，类似这样`2012:0000:4528:7D76:3C2B:05AD:3F57:1C98`



**物理层(Phyisical)**

物理层是OSI模型的底层，所有的数据都需要通过这层才能发送出去。简单理解就是将多台电脑连接起来的物理方式(光缆、电缆、双绞线等)

术语表达为能够传达比特流-电脉冲，有一定`电气`特性，作用负责传送`0`和`1`的电信号。


**数据链路层(DataLink)**

数据链路层规定了电信号`0`和`1`的分组方式，多少电信号可以归纳为一组，每个信号位有什么意义。
`Ethernet(以太网)`就定义了分组方式，一组电信号构成了一个`数据包`，也叫做`帧`。每一帧分成两部分，`标头`和`数据`。

标头中包含了数据包的`发送者`、`接收者`以及`数据类型`。固定长度是`18字节`。

数据则是数据包的具体数据，最短长度是`46字节`，最长是`1500字节`。整个`帧`最短长度是`64字节`，最长长度是`1518字节`，如果数据很长，就会分割帧进行发送。

`Ethernet(以太网)` 规定，所有接入网络的设备，都必须有`网卡`接口，`数据包`是从一网卡传输到另一网卡上的。网卡的地址，也就是
`MAC地址(物理地址)`，每块`网卡`出厂的时候，都有一个独一无二的`MAC地址(物理地址)`。`MAC地址`是一个48位二进制整数，通常表示方法是`-`隔开的12个十六进制整数，类似这样表示`14-FE-B5-B0-2B-7A`。前6位是厂商编号，后六位是厂商的网卡流水号。

了解了Mac地址，那怎么才能知道要发送目标网卡的Mac地址呢 - `ARP`协议

接下来知道目标网卡的MAC地址，怎么将数据表准确的发送到对应的设备，这里`Ethernet(以太网)`采取了一种原始的方式-`广播`。
发送者将这个数据包直接丢到`子网络`中的所有计算机，让每台计算机去计算是否是自己接受的数据包，判断方式是对比`数据包`标头的中的目标Mac地址和自己的网卡的Mac地址。

**TCP/IP**模型

<!-- ![model](https://cdn.img.wenhairu.com/images/2020/03/23/qMf4N.jpg) -->


![tcp/ip](https://cdn.img.wenhairu.com/images/2020/05/11/YpvRj.png)


![网络分层](https://cdn.img.wenhairu.com/images/2020/05/11/Ypxbg.png)







## Reference

* [HTTP 规范](https://tools.ietf.org/html/rfc7230)
* [ABNF 扩充巴克斯-诺尔范式](https://tools.ietf.org/html/rfc5234)