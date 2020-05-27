---
type: web-browser
tag: Browser
lang: zh
excerpt: '有限状态机将复杂对象状态进行建数学模型，以一种更加工程化的方式来处理状态'
---

# 有限状态机

::: tip
有限状态机（英语：finite-state machine，缩写：FSM）又称有限状态自动机（英语：finite-state automation，缩写：FSA），简称状态机，是表示有限个状态以及在这些状态之间的转移和动作等行为的数学计算模型。- [wiki 有限状态机](https://zh.wikipedia.org/wiki/%E6%9C%89%E9%99%90%E7%8A%B6%E6%80%81%E6%9C%BA)
:::

状态机的出现是为了将复杂对象的状态变化进行建模，采取工程化的方式来处理，方便理解与沟通.


## 有限状态机的特征

所谓`状态机`是一个数学模型，也是一个抽象概念，可以将每个`状态`理解成一个`机器`，每个机器具有不同的状态，在固定时间只能满足一个状态。

**每个状态都是一个机器**

* 每个机器中，可以做计算、存储、输出等
* 所有机器接受的输入是一致的
* 每个机器本身是没有状态的，如果用函数来表示机器的话，这个机器是一个纯函数，类似于redux中的`reducer`函数

**每个机器知道下一个状态**

* 每个机器都有确定的下一个状态 (Moore类型的状态机)
* 每个机器根据输入决定下一个状态 (Mealy类型的状态机)


## 有限状态机的


## JavaScript中的有限状态机(Mealy)

每个函数是一个状态，参数是输入值，在函数中就可以自由编码，处理每个状态的逻辑，返回值作为下一个状态

```js
function state(input) {
  // ...
  return next
}
// 调用
while(input) {
  // 状态机的反水值作为下一个状态
  state = state(input)
}
```


### 利用状态机处理字符串

首先看一个简单的例子，在字符串中寻找`a`

```js
function matchString(string) {
  for(let s of string) {
    if(s === 'a') {
      return true;
    }
  }
  return false;
}
```
是不是很简单，接下来再看一个例子，在字符串中寻找`ab`

```js
function matchString(string) {
  let fa = false;
  for(let s of string) {
    if(s === 'a') {
      fa = true;
    }else if(fa && s === 'b') {
      return true;
    }else {
      fa = false;
    }
  }
	return false;
}
matchString('abscs');
```
紧接着增加一点难度，在字符串中寻找`abcde`

```js
function matchString(string) {
  let fa = false;
  let fb = false;
  let fc = false;
  let fd = false;
  let fe = false;
  for(let s of string) {
    if(s === 'a') {
      fa = true;
    }else if(fa && s === 'b') {
      fb = true;
    }else if(fb && s === 'c') {
      fc = true;
    }else if(fc && s === 'd') {
      fd = true;
    }else if(fd && s === 'e') {
      return true;
    }else {
      fa = false;
      fb = false;
      fc = false;
      fd = false;
      fe = false;
    }
  }
	return false;
}
```

接下来看使用`Mealy 状态机`来完成上面的代码

```js
// 状态机入口
function match(string) {
  let state = start;
  for(let s of string) {
    state = state(s)
  }
  return state === end;
}
// 匹配第一个字符 a
function start(s) {
  if(s === 'a') {
    return foundA
  }else {
    return start
  }
}
// 结束状态 进了这个状态就不能再切换到其他状态了
function end() {
  return end
}
// 匹配第下一个字符 b
function foundA(s) {
  if(s === 'b') {
    return foundB
  }else {
    return start
    // return start(s)
  }
}
// 匹配第下一个字符 c
function foundB(s) {
  if(s === 'c') {
    return foundC
  }else {
    return start
    // return start(s)
  }
}
// 匹配第下一个字符 d
function foundC(s) {
  if(s === 'd') {
    return foundD
  }else {
    return start
    // return start(s)
  }
}
// 匹配最后一个字符 e
function foundD(s) {
  if(s === 'e') {
    return end
  }else {
    return start
    // return start(s)
  }
}
match('abcdefggb')  // true
match('abefggb')  // false
```
上面的代码还存在一个问题，如果Test字符串为`ababcdefgg`，会发现结果为`false`，这是因为到第二个`a`的时候，调用`foundB`，判断`a !== c`，调用`start`，此时`c`的值为第二个`b`，所以结果为`false`。

而解决方法是将当前状态的`s`代理到`start`中，具体实现`start(s)`, 这也算是状态机中一个小技巧，但是严格中的状态机是`不允许`这样做的。


接下来看一个比较复杂的例子，使用状态机处理类似`abcabx`字符串

这里还是要使用到上面的小技巧`start(s)`

```js
function match(string) {
  let state = start;
  for(let s of string) {
    state = state(s)
  }
  return state === end
}
function start(s) {
  if(s === 'a') {
    return foundA
  }else {
    return start
  }
}
function end() {
  return end
}
function foundA(s) {
  if(s === 'b') {
    return foundB
  }else {
    return start(s)
  }
}
function foundB(s) {
  if(s === 'c') {
    return foundA1
  }else {
    return start(s)
  }
}
function foundA1(s) {
  if(s === 'a') {
    return foundB1
  }else {
    return start(s)
  }
}
function foundB1(s) {
  if(s === 'b') {
    return foundC1
  }else {
    return start(s)
  }
}
function foundC1(s) {
  if(s === 'x') {
    return end
  }else {
    // 如果没有找到x 那就寻找的是c
    return foundB(s)
  }
}
match('abcabx') // true
match('abcabcabx') // true
```
跟这个类似，再练习一道状态机完成`abababx`，在寻找`b`之后的状态不是`a`状态就是`x`，是`x`就直接结束整个状态。是`a`状态的话，再次寻找下个状态`b`。

```js
function match(string) {
  let state = start;
  for(let s of string) {
    state = state(s)
  }
  return state === end
}
function start(s) {
  if(s === 'a') {
    return foundA
  }else {
    return start
  }
}
function end() {
  return end
}
function foundA(s) {
  if(s === 'b') {
    return foundX
  }else {
    return start(s)
  }
}
function foundX(s) {
  if(s === 'x') {
    return end
  }else {
    return start(s)
  }
}
```