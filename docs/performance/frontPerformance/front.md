---
type: web-http
tag: http
lang: us
excerpt: '前端性能优化, 用户输入输入URL到页面渲染经历了什么？？'
---

#  前端性能优化


::: tip
用户输入输入URL到页面渲染经历了什么？？
:::

**潜在的性能优化点**

1. DNS是否可以通过缓存减少DNS查询时间
2. 网络请求是否可以走最近的网络环境
3. 相同的静态资源是否可以缓存
4. 是否可以减少HTTP请求大小
5. 减少HTTP请求
6. 服务端渲染



## 资源合并压缩

1. 减少HTTP请求数量
2. 减少请求资源的大小

### HTML压缩
压缩文本文件中有意义，在HTML中没有意义的文本，空格，回车等

**方式**

1. 在线网站压缩
2. node提供HTML-minifier 工具
3. 后端模板引擎渲染压缩

### CSS压缩

1. 无效代码删除
2. 相同代码合并
3. clear-css

### JS压缩 

1. 无效字符删除
2. 剔除注释
3. 代码语义的缩减和优化
4. 代码保护

### 文件合并


问题：
1. 首屏渲染的问题
2. 缓存失效

建议：
1. 公共库合并
2. 不同页面的合并
3. 见机行事

方式：

1. 在线网站
2. nodeJS


## 图片相关优化

1. 图片压缩
2. 雪碧图
3. font-icon
4. svg
5. webp 

## JPG 
jpg 图片格式适合色彩明显的banner图，背景图片，JPG是有损压缩、体积小、加载快、不支持透明

## PNG
png 图片格式很适合单一色彩的图片，雪碧图，logo等 PNG 无损压缩、质量高、体积大、支持透明

## SVG 
svg 文本文件、体积小、不失真、兼容性好



## 节流和防抖


### 节流 Throttle
::: tip
简而言之，节流就是隔一段时间处理一次
核心： 在某段时间内，不管你触发了多少次回调，我都只认第一次，并在计时结束时给予响应。
:::

```js
const throttle = (fn, wait) => {
  let lastTime = 0;
  return (...args) => {
    let now = +new Date();
    if(now - lastTime > wait) {
      lastTime = now;
      fn.apply(this, args)
    }
  }
}

setInterval(
  throttle(() => {
    console.log('handle something')
  }, 1000),
  1
)
```


### 防抖 Debounce

::: tip
防抖，简而言之，就是点击的时候隔多长时间触发一次

核心：我会等你到底。在某段时间内，不管你触发了多少次回调，我都只认最后一次
:::

```js
const debounce = (fn, wait) => {
  let timer = 0;

  return (...args) => {
    if(timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn,apply(this, args);
    }, wait)
  }
}

```

### 节流防抖综合版 

```js 
// debounce && throttle
const throttleStrong = (fn, wait) => {
  let last = 0, timer = null;

  return (...args) => {
    let now = +new Date();
    // debounce 执行最后一次
    if(now - last < wait) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        last = now;
        fn.apply(this, args)
      }, wait)
    }else {
      // throttle 只执行第一次
      last = now;
      fn.apply(this, args)
    }
  }
}

```

## 页面加载


### 预加载 
有些资源不需要马上用到，但是希望尽早获取，这时候就可以使用预加载。
```html
<link rel="preload" href="http://example.com">
```

### 预渲染
预渲染虽然可以提高页面的加载速度，但是要确保该页面大概率会被用户在之后打开，否则就是白白浪费资源去渲染
```html
<link rel="prerender" href="http://example.com"> 
```
### 懒执行
懒执行就是将某些逻辑延迟到使用时再计算。该技术可以用于首屏优化，对于某些耗时逻辑并不需要在首屏就使用的，就可以使用懒执行。懒执行需要唤醒，一般可以通过定时器或者事件的调用来唤醒。

### 懒加载
懒加载的原理就是只加载自定义区域（通常是可视区域，但也可以是即将进入可视区域）内需要加载的东西。对于图片来说，先设置图片标签的 src 属性为一张占位图，将真实的图片资源放入一个自定义属性中，当进入自定义区域时，就将自定义属性替换为 src 属性，这样图片就会去下载资源，实现了图片懒加载。

**实现一个简单的懒加载demo && 结合throttle和debounce**

简单的HTML页面img 
```html
<div class="container">
  <div class="img">
    <img data-src="./img/1.jpg" alt="">
  </div>
  <div class="img">
    <img data-src="./img/2.jpg" alt="加载中">
  </div><div class="img">
    <img data-src="./img/3.jpg" alt="加载中">
  </div><div class="img">
    <img data-src="./img/4.png" alt="加载中">
  </div><div class="img">
    <img data-src="./img/5.jpg" alt="加载中">
  </div><div class="img">
    <img data-src="./img/6.jpeg" alt="加载中">
  </div><div class="img">
    <img data-src="./img/7.jpg" alt="加载中">
  </div><div class="img">
    <img data-src="./img/8.jpg" alt="加载中">
  </div><div class="img">
    <img data-src="./img/9.jpeg" alt="加载中">
  </div><div class="img">
    <img data-src="./img/10.jpeg" alt="加载中">
  </div>
</div>
```
页面滚动的操作，此时要注意滚动的条件
```js 
var img = document.getElementsByTagName('img');

var viewHeight = window.innerHeight || document.documentElement.clientHeight

var num = 0;

function lazy() {
  console.log('load')
  for(var i = num; i < img.length; i++) {
    var distance = viewHeight - img[i].getBoundingClientRect().top;

    if(distance >= 0) {
      img[i].src = img[i].getAttribute('data-src');
      num ++
    }
  }
}
// throttleStrong 使用上述综合版
const lazyLoad = throttleStrong(lazy, 2000)

window.addEventListener('scroll', lazyLoad, false)

```




