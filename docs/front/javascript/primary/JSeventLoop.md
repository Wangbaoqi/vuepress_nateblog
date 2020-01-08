---
type: front-JavaScript
tag: JavaScript
excerpt: 'JS EventLoop 机制'
---

# JS EventLoop 机制

## 前言
::: tip
事件循环是什么？为什么会有事件循环机制？
JS是单线程的语言，如果在执行过程中遇到异步的代码，不可能一直等待（浪费资源。。。）, 至此，事件循环机制就运用而生了。
:::

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


2. 在单线程中处理新加入的任务 


3. 在单线程中处理其他线程发送的任务


