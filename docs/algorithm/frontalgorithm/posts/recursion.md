---
type: data-structure & algorithm
tag: algorithm 
excerpt: '递归算法模式'
lang: us
---
# 递归算法模式

::: tip
递归是一种非常广泛的算法（或者是编程技巧）
:::

典型的递归场景：去关灯的电影院想要知道自己是第几排？

```js
f(n) = f(n-1) + 1 // 典型的递推公式
```

改成代码：
```js
function fn(n) {
  if(n == 1) return 1
  return fn(n - 1) + 1
}
```

## 递归满足的条件

* 一个问题可以分解成几个子问题的解
* 分解之后的子问题，除了数据规模不同，解决思路完全一样
* 存在递归终结条件

编写递归代码的思路：**写出递推公式**和**终止条件**

接下来看个🌰：走阶梯的问题：假如有n个阶梯，每次可以走1个台阶或者2个台阶，问n个台阶有多少种走法

如果有5个台阶，走法有很多，比如1，2，2；也比如2，1，2，等等。有很多种走法。。

而这个例子的递推公式是：

**f(n) = f(n-1) + f(n-2)**

转化为代码

```js
function f(n) {
  // 终止条件
  if(n === 1) return 1
  if(n === 2) return 2

  return f(n-1) + f(n-2)
}
```

**问题：** 递归的本质就是借用栈，来调用同一个函数，而栈的大小是有限制的，递归的层级越多就会出现爆栈的问题
**解决方案：**

1. 避免重复的调用，在上述例子中，在递归的过程中，存在重复的函数调用，此时可以用[散列表]()来保存已经调用的函数
2. 使用循环来解决

```js
// 1. 采用散列表 解决重复调用
function f(n) {
  // 终止条件
  if(n === 1) return 1
  if(n === 2) return 2

  let weakMap = new Map()

  if(weakMap.has(n)) return weakMap.get(n)

  const res = f(n-1) + f(n-2)
  weakMap.set(n, res)
  return res
}

// 2. 采用非递归的方式
function f(n) {
  if(n === 1) return 1
  if(n === 2) return 2

  let result = 0

  let pre = 1
  let next = 2

  // 从3开始 
  for(let i = 3; i <= n; i++) {
    result = pre + next

    pre = next

    next = result
  }

  return result
}
```





