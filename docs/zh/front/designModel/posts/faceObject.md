---
type: front-JavaScript
tag: DesignModel
lang: zh
excerpt: '面向对象编程'
---

# 面对对象编程

::: tip
JavaScript没有提供传统面向对象的类式继承（ES6提供class语法糖），而是通过原型继承来实现对象之间的继承
:::

## 多态
**多态实际含义:** 同一操作作用到不同的对象上，产生不同的解释和不同的执行结果
利用对象的原型实现多态:

```js
function makeSound(obj) {
  obj.sound()
}

function People() {}
function Child() {}
Peopple.prototype.sound = function() {
  console.log('啦啦啦')
}
Child.prototype.sound = function() {
  console.log('哇哇哇')
}
makeSound(new People()) // 啦啦啦
makeSound(new Child()) // 哇哇哇
```
**类型检查和多态**

在JavaScript动态类型语言中，类型检查是没有必要的。但是在静态类型语言中，类型检查是必须的。

**多态在面向对象设计中的根本作用是**把过程化的条件语句转化成对象的多态，消除条件语句

```js
var googleMap = {
  show() {
    console.log('google')
  }
}
var baiduMap = {
  show() {
    console.log('baidu')
  }
}
// 使用条件语句来渲染地图页面
function render(type) {
  if(type === 'google') {
    googleMap.show()
  }else if(type === 'baidu') {
    baiduMap.show()
  }
}
// 如果新增多个地图类型 这样条件语句就会很多
// 利用多态性

function renderMap(map) {
  if(map.show instanceof Function) {
    map.show()
  }
}
renderMap(googleMap)
renderMap(baiduMap)
```

## 封装 

