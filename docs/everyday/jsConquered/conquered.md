---
type: web-topic
subType: oneTopic
subTag: JavaScript相关
tag: 壹题攻克
---

# 谈谈提升

变量提升应该是一个在interview中出现频率很好的问题，me也不例外，但是怎么样才能完美的解释这个问题呢？

## 先有鸡还是先有蛋

我们直觉上JavaScript代码是按顺序执行的，但是这个不完全正确，特殊情况（var）。。

看个例子
```js
a = 3;
var a;

console.log(a); // ?
```
这个很有可能会认为是undefined，a 的声明是在a = 3之后，以为被重新赋值了，其实不然，真正输出的是 3 

再看个例子

```js
console.log(b) // ?

var b = 2
```
这个例子的结果也很有可能会被认为抛出异常-renferenceError,但是结果并不是这样，真正输出 undefined。

刚开始学习JS的时候看到这个的时候可能会有很大的困惑。。。

但是掌握的JavaScript的执行顺序「会有单独的章节解释」的时候，这个问题可能会迎刃而解

接下来就从**编译器**的角度剖析这个提升这个问题

JavaScript引擎在执行（解释）一段代码之前，都会对其进行编译（编译器的工作），在编译阶段会找到所有的声明，并跟相关的作用域关联起来 - 这个也是词法作用域的关键

正确的思路是：在所有的声明包括变量和函数，在执行之前都会被优先处理。

可以看到上述的例子，执行的结果跟认为的大不相同，这个也就是**提升**的作用

注意：<font color=#ff502c bgcolor=#fff5f5 size=4 >提升的只是声明，并不会改变代码的执行顺序</font>

因此，先有蛋(声明)，后有🐔(赋值)

## 函数提升
除了变量提升之外，函数也是可以提升的，但是这里函数提升，只是函数声明会被提升，函数表达式并不会提升

```js
foo()
// 函数声明
function foo(){
  console.log(a) // undefined

  var a = 0;
}


bar() // TypeError
doo() // ReferencError
// 函数表达式(含有具名)
var bar = function doo() {
  console.log(4)
}
```
上述两个例子，可以看一下提升之后代码


```js
function foo() {
  var a 
  console.log(a)
  a = 0
}
foo();


var bar;
bar(); // TypeError
doo(); // RefenceError

bar = function() {
  var doo = ..self..
}
```

## 函数优先
如果有重复声明的代码中，函数的优先级要高于变量

```js
foo(); // 3

var foo;

function foo() {
  console.log(3)
}

foo = function() {
  console.log(2)
}
```

