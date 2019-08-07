
# 数组结构以及数组使用

> 数据结构有线性结构和非线性结构，线性结构就包括了数组，除此之外，还有链表、栈、队列；非线性结构有图、树


## 为什么使用数组

数组是一种非常简单的存储数据的方式，是一种连续存储数据的形式，可以存储不同类型的值


## 数组的使用操作API

借用一张img 来掌握array的方法 
![array-methods](https://user-gold-cdn.xitu.io/2017/12/20/1607405dab59a110?imageslim)

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

**使用 <font color=#ff502c bgcolor=#fff5f5 size=4 >**forEach**</font> 语句**

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

方法对累加器和数组中的每个元素（从左到右）应用一个函数，将其减少为单个值。

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

// pre 累加结果，cur 当前值，curIndex 当前索引，arr 当前数组
[9,2,3,5].reduce((pre, cur, curIndex, arr) => {
  return pre + cur
}) // 19

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


### 数据的排序


```js
let kk = '33'
console.log(kk)


// 生成新数组的迭代器的方法

// map
// filter




// 不生成新数组的迭代器方法

// forEach
// some
// every
// reduce


/**
 * 二维数组
 */
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