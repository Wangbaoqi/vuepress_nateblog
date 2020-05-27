---
type: data-structure
tag: DataStructure 
lang: zh
excerpt: '队列结构以及队列的使用'
---
# 队列结构以及队列的使用

::: tip
队列遵循的是FIFO - 先进先出的规则
:::

## 队列的实现

队列的操作是队尾插入元素，队首删除元素

1. ES5 的方式实现

```js
// 入队操作
function enqueue(ele) {
  this.dataSource.push(ele)
}
// 出队操作
function dequeue() {
  this.dataSource.shift()
}
// 返回队列第一个元素
function front() {
  return this.dataSource[0]
}
// 队列是否为空
function isEmpty() {
  return !!this.dataSource.length
}
// 队列的大小
function size() {
  return this.dataSource.length
}
// 队列结构
function Queue() {
  // 队列数据源
  this.dataSource = []
  // 入队操作
  this.enqueue = enqueue
  // 出队操作
  this.dequeue = dequeue
  // 返回队列中的第一个元素
  this.front = front
  // 队列是否为空
  this.isEmpty = isEmpty
  // 队列的大小
  this.size = size
}
let queue = new Queue()
queue.enqueue('baoqi')
queue.enqueue('wang')
console.log(queue.isEmpty()) // false
console.log(queue.size()) // 2
console.log(queue.front()) // baoqi
console.log(queue.dataSource) // ['baoqi', 'wang']
queue.dequeue()
console.log(queue.dataSource) // ['wang']
```

2. ES6 实现队列结构

```js
class Queue {
  constructor() {
    this.dataSource = []
  }
  enqueue(ele) {
    this.dataSource.push(ele)
  }
  dequeue() {
    this.dataSource.shift()
  }
  front() {
    return this.dataSource[0]
  }
  isEmpty() {
    return !this.dataSource.length
  }
  size() {
    return this.dataSource.length
  }
}
// 测试跟上述结果一致
```

## 优先队列 

**顾名思义，优先队列不会遵循常规队列的规则，FIFO（先进先出），而是根据不同的优先级来出队列的**


```js
// ele 元素
// code 优先级
function QueueElement(ele, code) {
  this.ele = ele
  this.code = code
}
// 优先队列
class PriorityQueue {
  constructor() {
    this.dataSource = []
  }
  enqueue(val) {
    const current = this.dataSource;
    let add = false
    for(let i = 0; i < current.length; i++) {
      if(val.code < current[i].code) {
        this.dataSource.splice(i, 0, val)
        add = true
        break
      }
    }
    if(!add) {
      this.dataSource.push(val)
    }
  }
  dequeue() {
    return this.dataSource[0]
  }
  front() {
    return this.dataSource[0]
  }
  isEmpty() {
    return !this.dataSource.length
  }
  size() {
    return this.dataSource.length
  }
  print() {
    const el = this.dataSource
    for(let i = 0; i < el.length; i++) {
      console.log(`name:${el.name}, code${el.code};`)
    }
  }
}
let pqueue = new PriorityQueue()
pqueue.enqueue(new QueueElement('baoqi', 4))
pqueue.enqueue(new QueueElement('wang', 3))
pqueue.enqueue(new QueueElement('nate', 5))
pqueue.enqueue(new QueueElement('natebaoqi', 2))
pqueue.enqueue(new QueueElement('john', 2))
```

## 队列的使用 

**队列的使用其实很广泛，例如消息队列、上述讲的优先队列（可用于急诊优先级等）**

* 消息队列 - 事件循环
* 击鼓传花 - 循环队列
