---
type: front-html
tag: html
lang: us
excerpt: WebSockets is an advanced technology. It can open an interactive communication session between the user's browser and the server. Using this API, you can send messages to the server and receive event-driven responses without having to poll the server for a response.
---

# Communication


## webSocket

::: tip
WebSockets is an advanced technology. It can open an interactive communication session between the user's browser and the server. Using this API, you can send messages to the server and receive event-driven responses without having to poll the server for a response.
::: 

### use websocket

Already have HTTP. Why use websocket? HTTP can only be initiated by the client. If you want to obtain the weather status in real time, the client must continuously request-Polling: Every once in a while, a request is made to ask the server status;
In this way, using HTTP will waste resources and require constant connections.

**Feature**

The server can send to the client, or the client can request from the server, which is a kind of server push


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

1. CONNECTING：value = 0, express is connecting
2. OPEN：value = 1, express connect access, can communicate
3. CLOSING：value = 2, express connect is closing
4. CLOSED：value = 3, express connection closed, or failed close connection


### server use websocket

three ways of common Node

1. WebSockets
2. Socket.IO
3. WebSocket-Node


### WebSocketd server


## WebRTC

::: tip
RTC in WebRTC is short for real-time communication, which is a technology that supports voice / video communication and data sharing between browser clients. WebRTC is a standard that allows all browsers to share application data and conduct conference calls point-to-point without installing plug-ins or third-party software.
::: 


