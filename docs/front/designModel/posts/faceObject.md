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

封装的目的是为了隐藏信息，封装一般有**封装数据**、**封装实现**、**封装类型**和**封装变化**。一般常用的是前两种方式。

在传统的面向对象语言中，封装一般是由**语法**来解析的，比如*protected*、*private*he*public*关键字提供不同的访问权限，而对于JavaScript这种动态类型的语言，在运行时的时候才能确定其类型，并没有上述关键字来支持，所以JavaScript为了实现封装，采用了其自身作用域的特性，且只能模拟*public*和*private*。

在ES6出现之前，封装数据一般采用函数(一般是闭包)的形式，这样数据的访问权限就在函数作用域中。在ES6中，可以使用**let**关键字（暂时性死区，无法进行变量提升）

```js
// 函数实现数据封装
let object = (function() {
  var _name = 'nate';
  return {
    getName() {
      return _name
    }
  }
})()
object.getName(); // nate
object._name; // undefined
```

## 继承

继承也是面向对象编程中重要的一环，使用继承可以让子类可以拥有多种行为，是一种常见的编程规范，也是减少代码的一种方式。

关于JavaScript的继承方式可以看这篇文章[JS this以及原型、原型链](/front/javascript/primary/JSthis以及原型.html#继承)

ES6中提出了**Class**概念，使面向对象编程更加像传统的形式，也是JavaScript中面向对象编程的语法糖。