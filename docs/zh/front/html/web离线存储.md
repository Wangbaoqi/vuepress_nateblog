---
type: front-html
tag: html
excerpt: '提供一种 应用程序缓存 机制，使得基于web的应用程序可以离线运行。开发者可以使用 Application Cache (AppCache) 接口设定浏览器应该缓存的资源并使得离线用户可用。 在处于离线状态时，即使用户点击刷新按钮，应用也能正常加载与工作'
---

# 离线存储和客户端存储

::: tip
提供一种 应用程序缓存 机制，使得基于web的应用程序可以离线运行。开发者可以使用 Application Cache (AppCache) 接口设定浏览器应该缓存的资源并使得离线用户可用。 在处于离线状态时，即使用户点击刷新按钮，应用也能正常加载与工作。
::: 


## 离线检测

要知道设备上是否有网络，HTML5定义了navigator.onLine属性，这个属性存在一定的兼容性，因此需要作出容错处理, 这种方式只能加载页面时检测网络情况，并不能实时的检测网络的情况

```js
if(navigator.onLine){
  // normal online
}else {
  // unnormal offline
}
```

想要实时的检测网络情况，HTML5又提供了两个事件：online和offline，在线=>离线或者离线=>在线会触发这两个事件

```js
EventUtil.addHandler(window, 'online', function() {})
EventUtil.addHandler(window, 'offline', function() {})
```

## 应用缓存

::: warning
MDN 该特性已从web标准中移除，建议使用servicework
:::
HTML5的应用缓存（简称 appcache）, APPchache是从浏览器缓存中分离出来的一块缓存区。在这个缓存中保存数据，可以使用一个描述文件（manifest file），列出缓存的资源
```manifest
CACHE MANIFEST

index.js
index.css
```
## 数据存储

基于在客户端存储用户信息的能力的要求，出现了几种数据存储的方式

### Cookie

后续更新。。。


### Web存储机制

Web Storage的两个目标
1. 提供一种在cookie之外的存储会话数据的方式
2. 提供一种在客户端存储大量的数据的方式

Web Storage规范包含了两种对象的定义：sessionStorage 和 globalStorage ，都是已window对象属性存在的。

**Storage类型**

提供了最大的的存储空间，以键值对的方式存在

其实例和其他存储对象类似 methods：clear、getItem、setItem、key、removeItem、


**sessionStorage**
sessionStorage 存储特定于某个会话的数据，也就是数据保持到浏览器关闭

**globalStorage**
目的是夸月会话存储，但是有一定的访问限制，需指定那些域可以访问
**localStorage**
HTML5规范中作为持久保存客户端数据

**storage事件**
```js
EventUtil.addhandle(document, 'storage', function(event) {
  // event 
  // domain key newvalue oldvalue
})
```

## service worker 

[service-worker实例](https://wangbaoqi.github.io/case/serviceWork/index.html)

