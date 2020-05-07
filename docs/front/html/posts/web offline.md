---
type: front-html
tag: html
lang: us
excerpt: Provides an application caching mechanism so that web-based applications can run offline. Developers can use the Application Cache (AppCache) interface to set resources that the browser should cache and make them available to offline users. When offline, the app can load and work normally even if the user clicks the refresh button.
---

# Offline Storage

::: tip
Provides an application caching mechanism so that web-based applications can run offline. Developers can use the Application Cache (AppCache) interface to set resources that the browser should cache and make them available to offline users. When offline, the app can load and work normally even if the user clicks the refresh button.
::: 


## offline check 

To know if there is a network on the device, HTML5 defines the navigator.onLine property. This property has certain compatibility, so it needs to be fault-tolerant. This method can only detect the network condition when the page is loaded, and it cannot detect the network condition in real time.

```js
if(navigator.onLine){
  // normal online
}else {
  // unnormal offline
}
```

to know real time network status html5 support two event: online and offline 

```js
EventUtil.addHandler(window, 'online', function() {})
EventUtil.addHandler(window, 'offline', function() {})
```

## app storage

::: warning
this feature had be deleted from MDN, suggest to use servicework
:::
HTML5 application cache (referred to as appcache), APPchache is a cache area separated from the browser cache. To save data in this cache, you can use a manifest file to list the cached resources

```manifest
CACHE MANIFEST

index.js
index.css
```
## data storage 

based on ask that storage user information in client, show a series of way

### Cookie


updating...


### Web storage 

two targets of Web Storage

  1. provide a way to store session data outside of cookie 
  2. provide a way to store more clinet data 

Web Storage specification includes the defien of two kinds of object: sessionStorage and globalStorage, is the feature of window object

**Storage type**

provide most large storage space, presence based on key-value


have a series of methods：clear、getItem、setItem、key、removeItem、


**sessionStorage**

sessionStorage based on keep browser closed 

**globalStorage**

have restriction of visit, need to specify which area

**localStorage**

based on  lasting to save to data in  HTML5 specification 

**storage event**
```js
EventUtil.addhandle(document, 'storage', function(event) {
  // event 
  // domain key newvalue oldvalue
})
```

## service worker 

[service-worker eg](https://wangbaoqi.github.io/case/serviceWork/index.html)

