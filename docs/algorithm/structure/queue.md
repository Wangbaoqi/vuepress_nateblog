---
type: data-structure
tag: 数据结构 
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


