# 链表 



```js
// 列表

// what why 


// 实现列表类

function List() {
  this.listSize = 0;
  this.dataStore = [];
  this.remove = remove;
  this.append = append;
  this.toString = toString;
  this.length = length;
  this.find = find;
  this.insert = insert;
  this.clear = clear;
  this.contains = contains;
  this.front = front;
  this.end = end;
  this.pos = pos;
  this.prev = prev;
  this.next = next;
  this.curPos = curPos;
  this.moveTo = moveTo;
  this.getEle = getEle
}

function append(e) {
  this.dataStore[this.listSize++] = e;
}

function find(e) {
  console.log(this.dataStore)
  for(var i = 0; i < this.dataStore.length; i++) {
    if(this.dataStore[i] === e) {
      return i
    }
  }
  return -1
}

function remove(e) {
  const findAt = this.find(e);
  if(findAt > -1) {
    this.dataStore.splice(findAt, 1);
    --this.listSize;
    return true;
  }
  return false
}

function toString() {
  return this.dataStore;
}

function length() {
  return this.listSize
}

function insert(e, a) {
  const findAt = this.find(a);
  if(findAt > -1) {
    this.dataStore.splice(findAt+1, 0, e);
    ++this.listSize;
    return true;
  }
  return false;
}

function clear() {
  delete this.dataStore;
  this.dataStore = [];
  this.listSize = 0
}

function contains(e) {
  for(let i = 0; i < this.dataStore.length; i++) {
    if(this.dataStore[i] == e) {
      return true;
    }
  }
  return false
}

function front() {
  this.pos = 0
}

function end() {
  this.pos = this.listSize - 1;
}
 
function prev() {
  if(this.pos > 0) {
    --this.pos;
  }
}

function next() {
  if(this.pos < this.listSize -1) {
    ++this.pos;
  }
}

function curPos() {
  return this.pos;
}

function moveTo(p) {
  this.pos = p
}

function getEle() {
  return this.dataStore[this.pos]
}
// test

const list = new List()
list.append('1')
list.append('2')
list.append('3')

console.log(list.toString(), list.length())

list.remove('1')

console.log(list.toString(), list.length())

list.insert('4', '2')

console.log(list.toString(), list.length())

list.clear()
console.log(list.toString(), list.length())



```