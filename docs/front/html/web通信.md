---
type: front-html
tag: html
excerpt: 'WebSockets 是一种先进的技术。它可以在用户的浏览器和服务器之间打开交互式通信会话。使用此API，您可以向服务器发送消息并接收事件驱动的响应，而无需通过轮询服务器的方式以获得响应'
---

# 通信


## webSocket

::: tip
WebSockets 是一种先进的技术。它可以在用户的浏览器和服务器之间打开交互式通信会话。使用此API，您可以向服务器发送消息并接收事件驱动的响应，而无需通过轮询服务器的方式以获得响应。
::: 

### 使用websocket

已经有了HTTP 为什么使用websocket? HTTP只能由客户端发起，如果要实时获取天气的状态的话，客户端要不断的发起请求 - 轮询：每隔一段时间，发起一个请求，询问服务器的状态；
这样使用HTTP就会浪费资源，需要不停的连接

**特点**
服务器可以向客户端发送，也可以客户端向服务端请求，属于服务器推送的一种


```js
const ws = new WebSocket('ws://localhost:8080')

ws.onopen = function(event) {
  console.log('connecting..')
  wx.send('hello websocket')
}

ws.onmessage = function(evt) {
  console.log('connecting close', evt.data)
  wx.close()
}

ws.onclose = function() {
  console.log('connecting close')
}

ws.onerror = function(event) {
  console.log('connecting error', event)
}

```

**readyState**

1. CONNECTING：值为0，表示正在连接。
2. OPEN：值为1，表示连接成功，可以通信了。
3. CLOSING：值为2，表示连接正在关闭。
4. CLOSED：值为3，表示连接已经关闭，或者打开连接失败


### 服务端使用websocket

常用的 Node 实现有以下三种。

1. WebSockets
2. Socket.IO
3. WebSocket-Node


### WebSocketd 服务器


## WebRTC

::: tip
WebRTC中的RTC是实时通信的简称，这是一种支持在浏览器客户端之间语音/视频交流和数据分享的技术。WebRTC作为一项标准,使得所有浏览器无需安装插件或第三方软件，就可以点对点地分享应用数据和进行电话会议。
::: 


