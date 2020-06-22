---
type: data-structure
tag: DataStructure 
lang: zh
excerpt: '数组结构以及数组的广泛使用，数据结构有线性结构和非线性结构，线性结构就包括了数组，除此之外，还有链表、栈、队列；非线性结构有图、树'
---

# 数据结构 - 数组

::: tip
数据结构有线性结构和非线性结构，线性结构就包括了数组，除此之外，还有链表、栈、队列；非线性结构有图、树
:::

## 为什么使用数组

数组是一种非常简单的存储数据的方式，是一种连续存储数据的形式，可以存储不同类型的值



## 数组的使用操作API

借用一张img 来掌握array的方法 
![array-methods](https://cdn.img.wenhairu.com/images/2020/01/17/ALxsd.png)


**常见的操作数组的API有** 

| method        | description                                  
| ------------- |:------------------------------------------:  
| push          | 在数组的尾部，新增一个元素，操作源数据源                       
| pop           | 在数组的尾部，删除最后一个元素，操作源数据源            
| shift         | 在数组的首部，删除第一个元素，操作源数据源              
| unshift       | 在数组的首部，新增一个元素，操作源数据源                    
| splice        | 在任意位置添加或者删除元素，改变了原数组                                     
| concat        | 合并数组，返回合并之后的数组，不会改变原数组              
| every         | 返回Boolean值，数组的每一个元素满足其条件，则返回true             
| filter        | 返回一个新数组，根据某一个条件，过滤出符合条件的数组，不会改变原数组              
| indexOf       | 返回index，查找出满足条件元素的index（索引），其值是大于等于0             
| map           | 返回一个新数组，返回每次函数调用的结果组成的数组              
| reverse       | 数组中元素的位置反转，改变了原数组              
| slice         | 返回一个新数组，根据传入的参数的index范围，不会改变原来的数组     
| some          | 返回Boolean值，数组的其中一个元素满足其条件，则返回true        
| sort          | 对数组中的元素进行排序，根据传入的指定的函数参数          
| forEach       | 遍历数组中每一个元素
| reduce        | 累加器       
| toString      | 将数组转为字符串进行返回             
| valueOf       | 跟toString类似            


**ES6、ES7中数组的新功能**

| method        | description                                  
| ------------- |:------------------------------------------:  
| @@iterator    | 返回一个包含数组键值对的迭代器对象，可以通过同步调用得到数组元素的键值对                       
| copyWithin    | 复制数组中的一系列元素到同一数组指定的起始位置           
| entries       | 反水包含数组所有键值对的@@iterator             
| includes      | 如果数组中存在某个元素则返回true                    
| find          | 根据回调函数给定的条件从数组中查找元素                                    
| findIndex     | 根据回调函数给定的条件从数组中查找元素的index（索引）              
| fill          | 用静态值填充数组            
| from          | 根据已有的数组创建一个新数组              
| keys          | 返回包含数组所有索引的@@iterator            
| of            | 根据传入的参数创建一个新数组          
| values        | 返回包含数组所有值得@@iterator               



## 数组常见API的原生实现


### Array.prototype.filter

```js
// this 是执行callback fn 中使用的this的值
Array.prototype.sfilter = function(fn, thisArg) {
  let self = thisArg || this;
  let arr = [];

  for(var i = 0; i < self.length; i++) {
    // callback 执行的结果
    /** param 
     * this[i] 当前的值
     * i 当前的位置索引
     * this 当前的引用的数组
     */
    fn(self[i], i, self) && arr.push(self[i])
  }
  return arr;
}

// test 1
let filterArr = arr.sfilter((item, index, arr) => {
  return item > 4
}, arr)

// test 2
let ffArr = Array.prototype.sfilter.call(arr, (item, index, arr) => {
  return item > 4
})
```
### Array.prototype.map

```js
/**
 * fn callback
 * thisArg 可选参数
 */ 
Array.prototype.smap = function(fn, thisArg) {
  let self = thisArg || this;
  let arr = [];
  for(let i = 0; i < self.length; i++) {
    // callback 执行的结果被添加到新数组中
    arr.push(fn(self[i], i, self))
  }
  return arr;
}

let newArr = arr.smap((item, index, arr) => {
  return `${item}nate`
})
```
### Array.prototype.reduce

```js
Array.prototype.sreduce = function(fn, initVal) {
  for(let i = 0; i < this.length; i++) {
    initVal = fn(initVal, this[i], i, this)
  }
  return initVal
}

```







## 数组的常见使用场景

在日常开发中以及业务场景中，使用数组数据结构的话，避免不了会对数据进行操作，也就避免不了在不同的场景下对数组的各种操作

### 数组的遍历

数组的遍历非常常见，以及使用频率很高，着这里个人总结遍历数组的方法以及各自的差异

**使用 <font color=#ff502c bgcolor=#fff5f5 size=4 >**for**</font> 语句**

```javascript
let arr = [0,1,3,4]
for(let i = 0, len = arr.length; i < len; i++){
  console.log(arr[i])
}
```

#### **使用 <font color=#ff502c bgcolor=#fff5f5 size=4 >**forEach**</font> 语句**

```javascript
let arr = [0,1,3,4]
arr.forEach(function(e) {
  console.log(e)
})
// es6
arr.forEach(e => {
  console.log(e)
})
```

**使用 <font color=#ff502c bgcolor=#fff5f5 size=4 >**for-in**</font> 语句**

一般会使用for-in来遍历对象的属性的,不过属性需要 enumerable,才能被读取到.
for-in 循环只遍历可枚举属性。一般常用来遍历对象，包括非整数类型的名称和继承的那些原型链上面的属性也能被遍历。像 Array和 Object使用内置构造函数所创建的对象都会继承自Object.prototype和String.prototype的不可枚举属性就不能遍历了.

注意: <font color=#ff502c bgcolor=#fff5f5 size=4 >**for in 会遍历其原型链上的方法**</font>

```javascript
let arr = [0,1,3,4]

let obj = {
  name: 'nate',
  age: 22,
  sex: 'man',
  height: 174
}

for(let key in obj) {
  console.log(obj[key])
}
```

**使用 <font color=#ff502c bgcolor=#fff5f5 size=3 >**for-of**</font> 语句**

for-of语句在可迭代对象（包括 Array，Map，Set，String，TypedArray，arguments 对象等等）上创建一个迭代循环，调用自定义迭代钩子，并为每个不同属性的值执行语句。只要是一个iterable的对象,就可以通过for-of来迭代.


```javascript
let arr = [0,{name: 'nate'}, '3',4]

for(let key of arr) {
  console.log(arr[key]) // 0 undefined undefined 4
}


```

**使用 <font color=#ff502c bgcolor=#fff5f5 size=3 >**map**</font> 语句**


```javascript
let arr = [{
  name: 'ruchal',
  age: 20
},{
  name: 'nate',
  age: 22
},{
  name: 'frank',
  age: 29
}]

arr.map(e => e.age) // [20, 22, 29]

```

**使用 <font color=#ff502c bgcolor=#fff5f5 size=3 >**filter**</font> 语句**

```javascript
let arr = [{
  name: 'ruchal',
  age: 20
},{
  name: 'nate',
  age: 22
},{
  name: 'frank',
  age: 29
}]

arr.filter(e => e.age > 20) // [{name: 'frank', age: 29}]

```

**使用 <font color=#ff502c bgcolor=#fff5f5 size=3 >**reduce**</font> 语句**

方法对累加器和数组中的每个元素（从左到右）应用一个函数，将其减少为单个值；除了回调参数之外，第二个参数作为第一次调用 callback函数时的第一个参数的值。 如果没有提供初始值，则将使用数组中的第一个元素。 在没有初始值的空数组上调用 reduce 将报错。

```javascript
// pre 累加结果，cur 当前值，curIndex 当前索引，arr 当前数组
[9,2,3,5].reduce((pre, cur, curIndex, arr) => {
  return pre + cur
}, []) // 19
```


**测试一下上述遍历方法的执行时间**

```javascript
let arr = [];
let aFor = 0;
let aForin = 0;
let aForof = 0;
let aForEach = 0;
let aMap = 0;

// setting dataSource
for(let i = 0; i < 1000000; i++) {
  arr.push(i)
}

// test for
console.time('for time');
for(let j = 0; j < arr.length; j++) {
  aFor += arr[j]
}
console.timeEnd('for time') // for time: 22.81298828125ms

// test for-in
console.time('forIn time');
for(let x in arr) {
  aForin += arr[x]
}
console.timeEnd('forIn time') // forIn time: 704.39013671875ms

// test for-of
console.time('forof time');
for(let x of arr) {
  aForof += arr[x]
}
console.timeEnd('forof time') // forof time: 32.671875ms

// test foreach
console.time('foreach time');
arr.forEach(e => {
  aForEach += e
})
console.timeEnd('foreach time') // foreach time: 32.298095703125ms

// test map
console.time('map time');
arr.map(e => {
  aMap += e
})
console.timeEnd('map time') // map time: 68.803955078125ms

```

这边测试遍历性能的话 需要大量的数据来支持，借鉴他人的数据测试，上述方法的性能大致有个优先级的排序：

> <font color=#ff502c bgcolor=#fff5f5 size=3 >**for**</font> > <font color=#ff502c bgcolor=#fff5f5 size=3 >**foreach**</font> > <font color=#ff502c bgcolor=#fff5f5 size=3 >**for-of**</font> > <font color=#ff502c bgcolor=#fff5f5 size=3 >**map**</font> > <font color=#ff502c bgcolor=#fff5f5 size=3 >**for-in**</font>



### 数组去重

在很多的业务场景下，数组都会需要去重，但是去重的场景也是不尽相同的，譬如：

1. 数组value是同一种类型
2. 数组value是不同的类型
3. 数组value是引用类型


**双层循环**

双层循环主要是定义一个要 return 的数组（已去重），遍历原数组以及新数组，如果两者的元素不等时，则此元素就不是重复元素

```js
var arr = [1, 2, '1', 3, 1];

var newArr = [];

for(var i = 0; i < arr.length; i++) {
  for(var j = 0; j < newArr.length; j++) {
    if(arr[i] === newArr[j]) {
      break;
    }
  }
  if(j === newArr.length) {
    newArr.push(arr[i])
  }
}
```

**indexOf - 01**

indexOf主要是遍历原数组，如果新数组中没有此元素，则添加到新数组中


```js
let arr = [1, 2, '1', 3, 1];

let newArr = [];

for(var i = 0; i < arr.length; i++) {
  if(newArr.indexOf(arr[i]) === -1) {
    newArr.push(arr[i])
  }
}

```

**indexOf - 02**

indexOf第二种方法判断重复元素第一次出现的位置和现在得位置是否相同


```js
function unique() {
  let arr = [1, 2, '1', 3, 1];
  return Array.prototype.filter.call(arr, (item, index) => {
    return arr.indexOf(item) === index
  })
}
```

**相邻元素**

相邻元素去重主要是先对数组进行排序，之后对相邻元素进行判断，如果不等，则添加

<font color=#ff502c bgcolor=#fff5f5 size=3 >**这个方法有局限性：**</font>数组元素的数据类型必须是同类型

```js
let arr = [1, 2, '1', 3, 1]; // print [1,'1',1, 2, 3]

let newArr = [];

let sarr = arr.sort()

for(let i = 0; i < sarr.length; i++) {
  if(sarr[i] !== sarr[i-1]) {
    newArr.push(sarr[i])
  }
}
```

**ES6语法基本类型**

```js
let arr = [1, 2, '1', 3, 1]; 
// 扩展运算符andset数据结构
let newArr = [...new Set(arr)];

// Array.from and set 数据结构
let newArr1 = Array.from(new Set(arr))
```


**E6语法引用类型**


```javascript
function removeDuplicates( arr, prop ) {
  let obj = {};
  return Object.keys(arr.reduce((prev, next) => {
    if(!obj[next[prop]]) obj[next[prop]] = next;
    return obj;
  }, obj)).map((i) => obj[i]);
}

function uniqueArray(a) {
  return [...new Set(a.map(o => JSON.stringify(o)))].map(s => JSON.parse(s))
}
```

## 二维数组多维数组

二维数组的访问以及二维数组的扁平化

### 二维数组的定义以及访问

```js

Array.matrix = function(numrows, numcols, initial) {
  var arr = [];
  for(let i = 0; i < numrows; i++) {
    var col = [];
    for(let j = 0; j < numcols; j++) {
      col[j] = initial;
    }
    arr[i] = col;
  }
  return arr
}
let twoMatrix = Array.matrix(5, 3, 1)
console.log(twoMatrix)

// 二维数组的访问 按行/按列

let dataList = [[12,22,11],[11,2,3],[55,21,11]];

// 按行
for(let r = 0; r < dataList.length; r++) {
  let row = 0;

  for(let c = 0; c < dataList[r].length; c++) {
    row += dataList[r][c]
  }
  console.log(`row${r+1}:${row}`)
}
// 按列 每一维数组数量相同
for(let r = 0; r < dataList.length; r++) {
  let col = 0;
  for(let c = 0; c < dataList[r].length; c++) {
    col += dataList[c][r]
  }
  console.log(`col${r+1}:${col}`)
}
```

### 多维数组的扁平化

<font color=#ff502c bgcolor=#fff5f5 size=3 >**面试题**</font>

```js
var arr = [1,2[3,4,[5,6,7],8,9],10]

// 嵌套数组的深度 默认是1
var depth = Infinity; 

// 使用 Array.prototype.flat IE不支持
var flatArr = arr.flat(depth)


// 使用reduce concat 
function flattenDeepd(arr) {
  return arr.reduce((acc, val) => { 
    return Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val)
  }, [])
}

// 使用map
function arrayDelayering(array) {
  var newArr = [];
  arr.map((item) => {
    if(Array.isArray(item)) {
      newArr.push.apply(newArr, this.arrayDelayering(item));
    }else {
      newArr.push(item);
    }
  })
  return newArr
}
```


## 数组的排序算法

数组的排序是日常业务跟需求中用到最广泛的，因此非常有必要掌握

**public method**
```js
// 交换相邻数据
let arr = [2,1,5,4,9,4,6];

function swap(arr, index, indexNext) {
  var cur = arr[index];
  arr[index] = arr[indexNext];
  arr[indexNext] = cur;
}
```
### 冒泡排序

冒泡排序是比较任何相邻的元素，比较两者大小，互相交换。这个也是性能最慢的一个，时间复杂度为O(n) = n * n

```js

// 冒泡排序
function bubble(arr) {
  let len = arr.length;
  for(let i = 0; i < len; i++) {
    for(let j = 0; j < len - 1; j++) {
      if(arr[j] > arr[j+1]) {
        swap(arr, j, j+1)
      }
    }
  }
}

// 改进点；循环之前已经排好序了 之后的几次循环也会执行的，因此在内循环的次数可以改成 len - 1 - i
for(let i = 0; i < len; i++) {
  for(let j = 0; j < len - 1 - i; j++) {
    if(arr[j] > arr[j+1]) {
      swap(arr, j, j+1)
    }
  }
}
```

### 选择排序

选择排序是一种原址排序算法，大致思路是找到最小的值并将其放置第一位，接着找到第二小的值将其放到第二位，以此类推。。

```js
function select(arr) {
  let len = arr.length,
      indexMin;
  for(let i = 0; i < len - 1; i++) {
    indexMin = i;
    for(let j = i; j < len; j++) {
      if(arr[indexMin] > arr[j]) {
        indexMin = j
      }
    }
    if(indexMin !== i) {
      swap(arr, i, indexMin)
    }
  }
}
```

### 插入排序

插入排序每次排一个数据项 在时间复杂度上要高于冒泡排序 

```js
function insertion(arr) {
  let len = arr.length,
      j, temp;
  for(var i = 1; i < len; i++) {
    j = i;
    temp = arr[i];
    while(j > 0 && arr[j-1] > temp) {
      arr[j] = arr[j-1]
      j--
    }
    arr[j] = temp
  }
}
```

### 归并排序
归并排序是第一个实际被使用的排序，上述三个性能都不好，归并排序的时间复杂度要稍微好一点O(n) = n*log^n
归并排序是一种分治算法。其思想是将原始数组切分成较小的数组，直到每个小数组只有一个位置，接着将小数组归并成较大的数组，直到最后只有一个排序完毕的大数组

```js
function mergeSort() {
  array = mergeSortFn(array);
}
// 递归函数
function mergeSortFn(arr) {
  let len = arr.length;
  if(len == 1) return arr;

  let mid = Math.floor(length / 2);
  let left = arr.slice(0, mid);
  let right = arr.slice(mid, len);

  return merge(mergeSortFn(left), mergeSortFn(right))
}
// 归并函数 比较两个元素的大小
function merge(left, right) {
  let result = [];
  let il = 0;
  let ir = 0;

  while(il < left.length && ir < right.length) {
    if(left[il] < right[ir]) {
      result.push(left[il++])
    }else {
      result.push(right[ir++])
    }
  }

  while(il < left.length) {
    result.push(left[il++])
  }

  while(ir < right.length) {
    result.push(left[ir++])
  }

  return result
}
```




