---
type: front-JavaScript
tag: JavaScript
lang: zh
excerpt: 'JS EventLoop 机制'
---

# JS EventLoop 机制

## 前言
::: tip
事件循环是什么？为什么会有事件循环机制？
JS是单线程的语言，如果在执行过程中遇到异步的代码，不可能一直等待（浪费资源。。。）, 至此，事件循环机制就运用而生了。
:::

[[toc]]

在了解EventLoop之前，首先再稳固一下JavaScript代码的执行机制

## JavaScript 执行顺序

在遇到一段JS代码时，它的执行顺序表面看是按照顺序执行，但是内部其实不然。
**一段JS在执行之前，首先会被编译器进行编译，之后会在JS引擎的控制下执行代码**

![JS执行顺序](https://cdn.img.wenhairu.com/images/2019/12/11/AcypI.png)

**执行上下文**

![执行上下文](https://cdn.img.wenhairu.com/images/2019/12/16/A48lg.png)

### 编译阶段

在一段代码编译之后，会生成两部分内容：

1. 执行上下文 - 当前JS代码执行的运行环境
2. 可执行代码 

**执行上下文**

执行上下文中又包含了变量环境对象（variable environment）和词法环境

变量环境对象中包含了这段代码中所有的声明。

```js
foo();
console.log(bar);
var bar = 3;
function foo() {
  console.log('excute fo');
}
```

分析上面的🌰:

```js
// 环境变量 对象
variable environment {
  bar -> undefined
  foo -> function() { ... }
}
```

在执行阶段，JS引擎会按照顺序执行可执行代码。

### 执行上下文

执行上下文是在编译阶段产生的，在什么情况下会创建执行上下文呢？
1. 全局执行上下文 - 执行全局代码
2. 函数执行上下文 - 执行函数代码
3. eval执行上下文 - 执行eval函数

### 调用栈 

调用栈又称为执行上下文栈 - 管理执行上下文的栈

下面通过简单的例子来说明调用栈

```js
var a = 2;
function addAll(b) {
  return add(x, y)
}
function add(a, b) {
  return a + b
}
addAll(5)
```
首先编译全局代码产生全局执行上下文，全局执行上下文入栈，其变量环境对象为:

```js
variable environment {
  a -> undefined
  addAll -> function() { add(x, y) }
  add -> function() { return a + b }
}
```
接着执行全局可执行代码：a = 2, addAll();

在执行addAll函数时，编译产生了addAll执行上下文栈，入栈，其变量环境对象为:

```js
variable environment {
  ... // 为空
}
```
下一步执行addAll中可执行代码 add函数，进行编译之后产生了add执行上下文栈，入栈，变量环境对象依然为空。执行add中的可执行代码。

执行完毕之后，调用栈弹出add执行上下文，紧接着又弹出addAll执行上下文，最终调用栈中只有全局执行上下文


**调用栈可以查看代码的执行顺序，以及代码之间的调用关系，排查bug是非常便捷的**

**栈溢出**

调用栈也是有大小的，栈溢出这种问题在开发中出现的概率也不小，（PS：toMe）。如果函数递归调用并且没有结束条件的时候，通常会产生栈溢出


## 初探事件循环、消息队列

**缘由: 渲染进程都会有一个主线程，而这个主线程会处理不同的任务，DOM渲染，计算样式，脚本执行，用户输入，异步任务等**


1. 在单线程中处理已安排好的任务 

```js
function MainThread() {
  const a = 1 + 1;
  const b = 2/1;
  const c = 4*3;
  console.log(a,b,c)
}
```

2. 在单线程中处理新加入的任务 

**要在线程运行的过程中处理新加入的任务，就需要采用事件循环机制了**

![循环机制](https://cdn.img.wenhairu.com/images/2020/03/04/mou70.png)
新加入的任务是线程内部的，无法处理其他线程的任务
```js
function getInput(val) {
  return val
}
// 主线程 等待用户的输入
function MainThread() {
  for(;;) {
    let firstNum = getInput(3)
    let secondNum = getInput(4)
    console.log(firstNum + secondNum)
  }
}
```

3. 在单线程中处理其他线程发送的任务

**用第二版线程是无法处理其他线程发送的任务的，因此，消息队列就产生了**


<font color=#ff502c bgcolor=#fff5f5 size=4 >**消息队列**</font> 

![消息队列](https://cdn.img.wenhairu.com/images/2020/03/04/moEjG.png)
消息队列中有很多的任务类型（输入事件-鼠标滚动、点击、移动，微任务，文件读写、websocket、定时器等）, 每当有新的线程的任务来的时候，就会进入到消息队列中，等待主线程中的任务执行完成之后再执行。


![eventLoop](https://cdn.img.wenhairu.com/images/2020/03/04/moaKv.png)
**页面使用单线程的缺点**

1. 处理优先级高的任务 

比较典型的场景就是监控DOM节点变化的情况，通用的做法是利用JavaScript设计一套监听系统，当数据变化时，渲染引擎同步调用接口，也就是典型的观察者模式

* 当DOM频繁的调用时，直接调用渲染的接口**主线程执行**，会导致任务执行时间的拉长，从而导致执行效率的下降 

* 如果把DOM变化成异步操作加入到队列里，又失去了监控的时效性

基于上述两点，**微任务**出现了 

通常将消息队列中的任务称为**宏任务**，每个宏任务中包含一个微任务队列，在执行宏任务的过程中，如果有DOM有变化，会将这些操作DOM的操作保存在微任务中，这样就解决了实时性问题

2. 如何解决单个任务执行时间过长问题

因为所有任务都是在单线程中执行的，如果某个任务执行的时间过长，则会影响用户的体验。

所以浏览器采用了**回调**的方式来规避这种问题


## 事件循环setTimeout

从上述知道了浏览器页面是由事件循环和消息队列来驱动。

在这部分主要学习事件循环的应用，典型的有setTimeout和XMLHttpRequest 这两个webAPI 

**setTimeout**定时器 

会返回一个整数（定时器的编号），可以通过这个编号来取消定时器 

浏览器实现定时器

在事件循环系统中，所有运行在主线程（渲染线程）中的任务都需要需要先添加到消息队列中，然后再根据顺序依次执行队列中的任务。

典型的事件:

* 接收HTML文档，渲染引擎就会将“解析DOM”事件添加到队列中
* 改变web页面的窗口大小，当做“重新布局”事件添加到队列中
* 触发垃圾回收机制，当做“垃圾回收”任务添加队列中
* 执行一段异步代码，也是将执行任务添加到消息队列中

也就是说执行一段异步代码，首先会将任务添加到消息队列中。而通过定时器设置的回调函数，是通过一段时间间隔来执行的。为了确保在正确的时间内执行回调函数，不能将回调函数添加到消息队列中。

因此，出现了**异步队列**(真正是一个hashmap)，这个队列中维护了需要延迟执行的任务。所以，当调用setTimeout时，渲染进程会将该定时器的回调任务添加到异步队列中（记录当前时间戳、延迟时间以及回调函数），等到当前执行的任务执行结束之后，就会执行该异步队列中的任务（根据当前的时间计算出到期的任务，一次执行任务），执行结束，就会到下一个循环过程(消息队列获取任务，重新开始)

**使用setTimeout注意事项**

1. 如果当前任务执行时间过久，会影响定时器任务的执行

```js
function foo() {
  setTimeout(() => {
    console.log('setTimeout')
  }, 0)
  // 当前任务循环5000 执行时间可能过长
  for(let i = 0; i < 5000; i++) {
    console.log(i)
  }
}
```

2. 如果setTimeout存在嵌套调用，系统会设置最短时间间隔为4毫秒

```js
function cb() { setTimeout(cb, 0)}
setTimeout(cb, 0)
```
如果嵌套调用5次以上，之后每次调用的最小时间间隔为4毫秒（设置4毫秒以下），系统会判定该函数阻塞了

3. 未激活的页面，setTimeout执行最小间隔为1000毫秒

如果未激活的页面或者处于后台的页面使用setTimeout时，最小间隔的时间为1s,目的是降低耗电量以及优化后台页面加载损耗

4. 延迟执行的最大时间间隔

那就是 ```Chrome```、```Safari```、```Firefox``` 都是以 32 个 ```bit``` 来存储延时值的，32bit 最大只能存放的数字是 2147483647 毫秒，这就意味着，如果 setTimeout 设置的延迟值大于 ```2147483647``` 毫秒（大约 24.8 天）时就会溢出，那么相当于延时值被设置为 0,这导致定时器会被立即执行

5. 回调函数中this

```js
var obj = {
  a: 2,
  foo: function() {
    console.log('foo', this.a)
  }
}
setTimeout(obj.foo, 0) // foo undefined

// 改进方式 1. bind
setTimeout(obj.foo.bind(obj), 0) // bind 
// 改进方式 2. => 
setTimeout(() => {
  obj.foo()
}, 0)
```

关于[requestAnimationFrame](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame)


## 事件循环XMLHttpRequest


```XMLHttpRequest```是前后端分离的最开始的实践，在这之前，如果服务端数据更新了，浏览器需要整体刷新页面，才能渲染最新的数据。但是```XMLHttpRequest```的出现，可以更新页面的局部数据，这样对用户的使用就比较友好了，而且提高了效率

