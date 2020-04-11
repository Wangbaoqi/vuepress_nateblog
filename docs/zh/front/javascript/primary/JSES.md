---
type: front-JavaScript
tag: JavaScript
lang: zh
excerpt: 'ECMAScript 6.0 '
---
# JS ES6 知识手册


::: tip
学习JavaScript新标准的语法
:::
[[toc]]

## let 和 const

```let```跟```var```类似，但是跟**var**又有区别，例如变量提升，暂时性死区等等，下面就比较两者的不同之处。

**1.块级作用域**
在没有es6之前，是没有块级作用域的，用过var声明的变量，都会存在**变量提升**，这也在很多的业务逻辑的地方导致了很多问题，得不到正确变量的值，比如```for```循环中的应用中.

使用let是不存在**变量提升**

```js
for(var i = 0; i < 5; i++) {
  //...
}
console.log(i) // 5

for(let i = 0; i < 5; i++) {
  // ...
}
console.log(i) // referenceError i not defined
// 不能重复声明
let a = 1
let a = 2 // Uncatch syntaxError 
// 不绑定全局作用域
let b = 'b'
console.log(window.b) // undefined
```

**2.暂时性死区**
在代码块中，使用let命令声明变量之前，是不能使用该变量的，语法上称之为```暂时性死区```。
JS引擎在编译阶段，会把let和const声明的变量放到```暂时性死区```中，只要执行了声明代码之后，才会从暂时性死区移除
```js
if(true) {
  console.log(foo) // ReferenceError
  typeof foo // ReferenceError
  let foo = 'foo'
  // bar 没有声明
  typeof bar // undefiend 
}
```
可以先看两段代码：

```js
for(let i = 0; i < 3; i++) {
  let i = 'pp'
  console.log(i) // pp pp pp
}

for(var i = 0; i < 3; i++) {
  var i = 'pop'
  console.log(i) // pop
}
```
两段代码打印的结果不同？使用let重复声明了三次，结果没有报错，反而正确执行了，而使用var时，则打印了一次

这是因为```for(let i = 0; i < 3; i++)```括号中建立了隐层的作用域，其作用类似于闭包的做法

```js
// babel 编译只有的代码
for (var _i = 0; _i < 3; _i++) {
  var _i2 = 'pp';
  console.log(_i2); // pp pp pp
}
```
## 扩展方法

ES6新增了字符串、数组、对象、函数的扩展方法

**字符串的扩展方法**

* String.raw()
返回一个斜杠都被转义（斜杠前面再加一个斜杠）的字符串, 通常用于模板字符串处理

* codePointAt()
能够处理4个字节储存的字符，返回一个字符的码点

* includes() startsWith() endsWith()
上述三者可以代替indexOf()

* repeat()
返回一个新的字符串，表示字符串重复N次
```js
'x'.repeat(3) // xxx
```
* padStart() padEnd()
ES 2017 中增加了字符串补全长度的功能
```js
'x'.padStart(4, 'aa') // "aaax"
'x'.padEnd(4, 'bb') // "xbbb"
```

**数值的扩展方法**

* Number.isFinite() Number.isNaN()

isFinite() 检查一个数值是否是有限的
isNaN() 检查一个数值是都是NaN

* Number.parseInt(), Number.parseFloat()

* Number.isInteger() 
判断是否是整数

* Number.EPSILON 
表示1与大于1的最小浮点数之间的差，误差小于这个值，可以认为没有意义了，不存在误差了

**函数的扩展**

* 函数参数的默认值 配合解构赋值
```js
function foo(x = 0, y = 2) {}
function bar({x, y}) {}
```
* 函数length属性

```js
(function foo() {}).length // 1
(function bar(x = 1) {}).length // 0
(function bar1(x = 1, y, z) {}).length // 2
(function bar({x, y}) {}).length // 1
```

* 箭头函数
**这里赘述下箭头函数和普通函数区别**

1. this的指向
箭头函数的this指向是动态的 根据最外层的this来定
普通函数的this指向是静态的 根据当前调用者来定

2. 没有arguments, 可以访问最外层函数的arguments, 自身的参数可以使用```...rest```

3. 不能使用```new```关键字

4. 没有原型prototype和super

**数组的扩展方法**

1. 扩展运算符...

```...```扩展运算符不能将类数组转为真正的数组，能将实现实现```Symbol.iterator```的数组转换为真正的数组

* 复制数组、合并数组
```js
var arr = [1,2,3]
var newArr = [...arr] // [1,2,3]
// 合并数组
var arr1 = [4,5,6]
var newArr1 = [...arr, ...arr1]
// 解构赋值结合
var [a, ...rest] = [1,2,3,4]
// 字符串
[...'hello'] // ['h', 'e', 'l', 'l','o']
```
2. Array.from()
将**类数组**和**可遍历对象**转为真正的数组

```js
let likeArr = {
  0: '1',
  1: '2',
  2: '3',
  length: 3
}
Array.from(likeArr)

Array.from([1,2,3], (x) => x * x)
```

3. Array.of()
将一组值转换为数组

```js
Array.of(1,2,3) // [1,2,3]
Array.of() // []
Array.of(1) // [1]
```

4. find() 和 findIndex()

**find()** 接收一个回调函数, 返回```第一个```满足条件的值
**findIndex()** 接收一个回调函数, 返回```第一个```满足条件的值的索引

```js
[1,2,3,4,5,6].find(x => x > 3) // 4
[1,2,3,4,5,6].findIndex(x => x > 3) // 3
```

5. entries()、keys()、values() 遍历数组
**entries**、**keys**、**values**用来遍历数组，返回遍历器对象，可以用```for of```循环遍历
区别是 ```keys```是键名的遍历，```values```是键值的遍历，```entries```是键值对的遍历

```js
for(e of [2,4].keys()){
  console.log(e) // 0,1
}
for(e of [2,4].values()){
  console.log(e) // 2,4
}
for(e of [2,4].entries()){
  console.log(e) // 0 2, 1 4
}
```

6. includes()
```includes```是ES7引进的方法，跟```indexOf```功能类似, 但是有不同的地方, 跟字符串的```includes```方法类似

```js
[1, 2, 3].includes(2) // true
// 第二个参数代表了寻找的值的索引
[1, 2, 3].includes(2, 2) // false
// indexOf 使用 === 严格判断
[NaN].indexOf(NaN) // -1
[NaN].includes(NaN) // true
```

7. flat()、flatMap() 
**flat()** 方法用来数组的扁平化，返回一个新数组
**flatMap()** 方法对每项执行一个函数，返回一个新数组，类似于```map```方法, **只能展开一层数组**
```js
[1,2,[3,4,[5,6,7], 8], 9].flat() // [1,2,3,4,[5,6,7], 8,9,]
[1,2,[3,4,[5,6,7], 8], 9].flat(2)  // [1,2,3,4,5,6,7,8,9]
[1,2,[3,4,[5,6,7], 8], 9].flat(Infinity) // [1,2,3,4,5,6,7,8,9]

[1,2,3,4].flatMap(x => x * 2) // [2,3,6,8]
// flatMap 只能展开一层数组
[1,2,[3,4]].flatMap((x) => x * 2) // [2,4,NaN]
```

**对象的扩展方法**

* Object 新增的方法 

1. Object.is()
对比两个值是否**严格 ===**相等

```js
Object.is('a', 'a')  // true
Object.is({}, {}) // false

// 特殊
-0 === +0 // true
NaN === NaN // false
Object.is(-0, +0) // false
Object.is(NaN, NaN) // true
```