---
type: web-topic
subType: oneTopic
subTag: React相关
tag: 壹题攻克
---

# React灵魂之问-react
::: tip
collect React interview soul questions
::: 

[[toc]]


## 什么是声明式编程

**声明式编程**强调的是要**做什么**，注重的是结果，具体怎么做是由机器去做

**命令式编程**强调的是**如何做**，注重的是过程，命令机器该如何的去执行code

```js
const list = [1,2,4,5,6]
// 声明式编程 - 要做什么 list每一项*2
const declara = list.map(i => i * 2)
// 命令式编程 - 如何做 获取list每一项 然后再*2 最后push
const order = []
for(let i = 0; i < list.length; i++) {
  order.push(list[i] * 2)
}
```

## 什么是函数式编程

**函数式编程是声明式编程的一部分**，它是模拟了人类的思维方式，关注结果，比如上个数组的例子，如果是命令式的方式，就需要处理每一步，关注过程，而函数式编程是声明式编程，关注结果。而处理的过程可以当做是一个通用的函数，可以复用。因此，[函数式编程](/front/javascript/intermediate/JS函数式编程.html)是React的精髓



## React设计思路




## 对react生命周期的理解


## React15/16.x的区别

## Props和State

## 如何更新状态和不更新状态

## 重新渲染Render会做些什么以及哪些方法会触发render

## React中setState后发生了什么

## setState为什么默认是异步


## setState什么时候是同步的


## react中应用样式表


## 什么是错误边界



## 遇到性能问题一般在哪个生命周期里解决













