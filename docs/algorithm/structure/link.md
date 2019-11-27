---
type: data-structure
tag: 数据结构 
excerpt: '链表结构以及链表的使用'
---

# 链表结构以及链表的使用

```js

// 链表
// 伪代码 结构
var linkList = {
  data: 'head',
  next: {
    data: 'first',
    next: {
      data: 'second',
      next: null
    }
  }
}

// 结点 - 内存块
function Node(element) {
  this.data = element;
  this.next = null;
}

function LinkList() {
  // 头结点
  this.head = new Node('head');

}

// 链表尾结点新增结点
LinkList.prototype.append = function (newElement) {
  var newNode = new Node(newElement);
  var curNode = this.head;
  while (curNode.next) {
    curNode = curNode.next;
  }
  curNode.next = newNode;
}


// 通过结点值查找结点
LinkList.prototype.findByValue = function (value) {
  // 遍历 从头结点

  var curNode = this.head.next;
  while (curNode != null && curNode.data != value) {
    curNode = curNode.next;
  }
  return curNode === null ? -1 : curNode;
}

// 通过index查找结点
LinkList.prototype.findByid = function (index) {
  var curNode = this.head.next;
  var pos = 0;
  while (curNode !== null && pos !== index) {
    curNode = curNode.next;
    pos++;
  }
  return curNode === null ? -1 : curNode;
}

// 查找指定结点的上一个结点
LinkList.prototype.findPrev = function (value) {
  var curNode = this.head;

  while (curNode.next !== null && curNode.next.data !== value) {
    curNode = curNode.next;
  }
  if (curNode.next === null) {
    return -1;
  }
  return curNode;
}

// 移除指定结点
LinkList.prototype.remove = function (value) {
  var prevNode = this.findPrev(value);
  if (prevNode == -1) {
    console.log('未找到结点');
    return
  }
  prevNode.next = prevNode.next.next;
}

// 遍历链表结构
LinkList.prototype.diaplay = function () {
  var curNode = this.head.next;
  while (curNode !== null) {
    console.log(curNode.data);
    curNode = curNode.next
  }
}


// 指定结点之后插入结点
LinkList.prototype.insert = function (newElement, element) {
  var curNode = this.findByValue(element);

  if (curNode == -1) {
    console.log('未找到结点');
    return;
  }
  var newNode = new Node(newElement);
  newNode.next = curNode.next;
  curNode.next = newNode;
}


var LLinkList = new LinkList();

console.log(LLinkList)

LLinkList.append('first');
LLinkList.append('second');
LLinkList.append('third');
LLinkList.append('five');


LLinkList.insert('four', 'third');
var findValue = LLinkList.findByValue('second');
console.log(findValue)

var findPrev = LLinkList.findPrev('four');
console.log(findPrev)

LLinkList.remove('first')

LLinkList.diaplay()



```