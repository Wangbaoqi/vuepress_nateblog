---
type: front-JavaScript
tag: JavaScript
lang: zh
excerpt: 'ECMAScript 6.0 '
---
# JS ES6 知识手册


::: tip
学习JavaScript新标准的语法
:::

## let 和 const

```let```跟```var```类似，但是跟**var**又有区别，例如变量提升，暂时性死区等等，下面就比较两者的不同之处。

**1.块级作用域**
在没有es6之前，是没有块级作用域的，用过var声明的变量，都会存在**变量提升**，这也在很多的业务逻辑的地方导致了很多问题，得不到正确变量的值，比如```for```循环中的应用中.

使用let是不存在**变量提升**

```js
for(var i = 0; i < 5; i++) {
  //...
}
console.log(i) // 5

for(let i = 0; i < 5; i++) {
  // ...
}
console.log(i) // referenceError i not defined
// 不能重复声明
let a = 1
let a = 2 // Uncatch syntaxError 
// 不绑定全局作用域
let b = 'b'
console.log(window.b) // undefined
```

**2.暂时性死区**
在代码块中，使用let命令声明变量之前，是不能使用该变量的，语法上称之为```暂时性死区```。
JS引擎在编译阶段，会把let和const声明的变量放到```暂时性死区```中，只要执行了声明代码之后，才会从暂时性死区移除
```js
if(true) {
  console.log(foo) // ReferenceError
  typeof foo // ReferenceError
  let foo = 'foo'
  // bar 没有声明
  typeof bar // undefiend 
}
```
可以先看两段代码：

```js
for(let i = 0; i < 3; i++) {
  let i = 'pp'
  console.log(i) // pp pp pp
}

for(var i = 0; i < 3; i++) {
  var i = 'pop'
  console.log(i) // pop
}
```
两段代码打印的结果不同？使用let重复声明了三次，结果没有报错，反而正确执行了，而使用var时，则打印了一次

这是因为```for(let i = 0; i < 3; i++)```括号中建立了隐层的作用域，其作用类似于闭包的做法

```js
// babel 编译只有的代码
for (var _i = 0; _i < 3; _i++) {
  var _i2 = 'pp';
  console.log(_i2); // pp pp pp
}
```
