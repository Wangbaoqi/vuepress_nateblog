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
## 栈的应用


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

### String 压缩 

::: tip
例如: 输入 absssffdvv 输出 abs3f2dv2
:::

```js
/**
 * 字符串压缩
 * @param {*} str 
 */
function strCombination(str) {
  // 校验英文字符以及长度
  if (!/^[A-Za-z]{1,100}$/.test(str)) {
    return '请输入由英文字符组成且不能超过100';
  }

  let newStr = '';
  const currentArr = str.split('');
  const stack = new Stack();

  // 字符串压缩
  const combin = (str) => {
    return str + stack.peek() + (stack.size() > 1 ? stack.size() : '');
  }

  for (let item of currentArr) {
    // 入栈元素跟栈顶元素不同 则压缩字符串并且清空栈
    if (item !== stack.peek() && stack.size()) {
      newStr = combin(newStr);
      stack.clear();
    }
    // 入栈
    stack.append(item);
  }
  return combin(newStr);
}

```


### 从十进制到二进制

::: tip
十进制转化成二进制（满二进一）
:::

```js
function divideBy2(decNumber) {
  let stack = new Stack();
  let binaryStr = '';

  while(decNumber > 0) {
    stack.append(Math.floor(decNumber%2))
    decNumber = Math.floor(decNumber/2)
  }

  while(stack.size()) {
    binaryStr += stack.peek().toString()
  }
  return binaryStr;
}

```
