---
type: front-JavaScript
tag: JavaScript
lang: zh
excerpt: 'JavaScript Function and Class'
---
# ECMAScript Specification 系列 - Function and Class

::: tip
function相当于一个'子程序'，由外部代码或者自身来调用。在JavaScript中，function是一流的对象，可以像对象那样具有属性和方法。
:::

## Function 

在JavaScript中，每个function都是一个`Function object`，都会继承其属性和方法。

`function`可以接受传入参数，也可以返回值。如果在函数体内更改非引用类型的值时，外部对应的值时不会改变的，如果是引用类型的值，则是改变的、

### 定义函数

函数的定义通常有以下几种方式


1. 函数声明

函数声明也是常用的一种定义函数的方法

```js
function foo(params) {
  // statement
}


```

2. 函数表达式

函数表达式类似于函数声明，函数表达式可以为函数定义名称，也可以是匿名的。使用函数表达式不能在其之前使用它，因为它不会被挂起在作用域的开头。
创建命名函数表达式的好处是在追踪报错时，可以在堆栈信息中查到函数名称。

```js
var foo = function () {}
// 命名函数表达式
var foos = function bar() {}
// arrow function
var fooa = () => {}
```

3. IIFE（立即执行函数表达式）

当函数只需要执行一次时，就可以使用IIFE了，也可以用来解决作用域问题。

```js
(function foo(){
  // statement
})()
```