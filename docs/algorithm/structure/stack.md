# 栈结构以及栈的使用

::: tip
stack 的特点是先进后出
:::

## 栈的实现


```js
// push methods
function append(e) {
  this.stackList.push(e)
}

// pop methods
function pop() {
  this.stackList.pop()
}

// peek methods
function peek() {
  return this.stackList[this.size() - 1]
}

// isEmpty methods
function isEmpty() {
  return !this.stackList.length
}

// clear methods
function clear() {
  this.stackList = []
}

// size methods
function size() {
  return this.stackList.length;
}

// Stack structure
function Stack() {
  this.stackList = [];
  this.append = append;
  this.pop = pop;
  this.peek = peek;
  this.isEmpty = isEmpty;
  this.clear = clear;
  this.size = size;
}

let stack = new Stack()

stack.append('1')
stack.append('2')
stack.append('2')

```
## 面试题


### String 中，大，中，小括号是否合法

::: tip
例如: "([]){}" 合法 "(([])"  不合法
:::


```js
let str = "[({})]"

const isValid = (arr) => {
  // 字典
  const rule_map = { '}': '{', ']': '[', ')': '(' }
  const newStack = new Stack();

  for(let i of arr) {
    // 如果不存在话 就是左括号 
    if(!(i in rule_map)) {
      newStack.append(i)
    }else if(!newStack.size() || rule_map[i] !== newStack.pop()){
      return false
    }
  }
  return !newStack.size()
}



```