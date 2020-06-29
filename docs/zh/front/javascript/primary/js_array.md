---
type: front-JavaScript
tag: JavaScript
lang: zh
excerpt: 'ECMAScript Array 是对特定类别的属性值进行特殊处理的特殊对象，Array也是对象的一种。'
---
# ECMAScript Specification 系列 - Array

::: tip
ECMAScript Array 是对特定类别的属性值进行特殊处理的`exotic objects`(奇异对象)，Array也是对象的一种。
:::


规范中将Array定义为`exotic objects`, 那什么是奇异对象。根据规范定义，`exotic objects`是非普通对象(ordinary object)的对象。

而要是`ordinary object`就需要满足几个条件：

* 具有`[[GetPrototypeOf]]`、`[[SetPrototypeOf]]`、`[[IsExtensible]]`、`[[PreventExtensions]]`、`[[GetOwnProperty]]`、`[[DefineOwnProperty]]`、`[[HasProperty]]`、`[[Get]]`、`[[Set]]`、`[[Delete]]`和`[[OwnPropertyKeys]]`的内部方法的对象
* 具有`[[Call]]`内部方法的对象
* 具有`[[Construct]]`内部方法的对象

因此，Array是一个`exotic object`。


## 数组构造函数

Array 构造函数，也就是数组初始化调用的函数，这个也是创建数组的一种方式，另外一种是使用字面量创建。

`constructor`当作为函数而不是构造函数调用时，也创建和初始化一个新的 Array 对象。 因此，函数调用 Array (...)等价于具有相同参数的对象创建表达式 new Array (...)。


### 构造函数创建数组

采用构造函数创建数组有三种方式.

1. Array Constructor

当且仅当调用 Array 构造函数时没有参数的时候。

```js
// 创建数组
const arr = Array();
// 等价于
let arr = new Array();
```

2. Array(len)

当且仅当使用正好一个参数调用 Array 构造函数的时候，初始化一个带有长度且值都为`undefined`的数组。

```js
// 创建数组
let arr = Array(4); // [empty x 4] or []
let arr = Array('3'); // ['3']
```

3. Array(...item)

当且仅当使用至少两个参数调用 Array 构造函数时

```js
// 创建数组
let arr = Array(4, 2); // [4,2]
let arr = Array('1', undefined); // ['1', undefined]
let arr = Array(undefined, undefined); // [undefined, undefined]
```

### 字面量创建数组

创建数组也可以使用直接量的方式。

```js
// 创建数组
let arr = [];
let arr = [1, 2, 3];
let arr = [,,,,,,]; // [empty x 6] 等同于 Array(6)
```

## 数组构造函数属性

Array Constructor 有一个`[[prototype]]`的内部插槽，其值为`Array.prototype`。

数组构造函数的特性有以下几种属性:

可以通过下面的方式获取`Array`上的属性

```js
Object.getOwnPropertyNames(window['Array']); // ['length', 'name', 'prototype', 'isArray', 'isArray', 'of', 'from ']
```

### Array.from

Array.from 可以将两类对象转为真正的数组。

其语法格式是 `Array.from(arrayLike[, mapFn[, thisArg]])`

* arrayLike - 传入的类数组或者可遍历的对象
* mapFn - 回调函数，新数组中的每个元素都会执行
* thisArg - 回调函数中this的指向

1. 类数组-类似数组
   
类数组常见的主要有DOM返回的`NodeList`集合和函数内部的`arguments`

```js
// 类数组
let arrLike = {
  '0': '1',
  '1': '11',
  '2': '111',
  length: 3
}
// ES5
Array.prototype.slice.call(arrLike); // ['1','11','111']
// Es6
Array.from(arrLike); // ['1','11','111']
```


2. 可遍历Iterable的对象(包括Map和Set)

```js
// 判断对象是否可以遍历
const isIterator = (obj) => obj !== null && typeof obj[Symbol.iterator] === 'function';

// String
const str = 'natewang';
isIterator(str); // true
Array.from('nate'); // ['n', 'a', 't', 'e'];

// Set
const set = new Set(['a', 'b']);
isIterator(set); // true
Array.from(set); // ['a', 'b'];
```

### Array.isArray

`isArray`函数接受一个参数arg，判断是否是数组，判断数组的方式还有`instanceof`，如果要更加准确的判断，则使用`Object.prototype.toString.call()`方法

```js
Array.isArray([]); // true
Array.isArray({}); // false

// 检测iframe
var iframe = document.createElement('iframe');
document.body.appendChild(iframe);
xArray = window.frames[window.frames.length-1].Array;
var arr = new xArray(1,2,3); // [1,2,3]

// 正确判断
Array.isArray(arr);  // true
// instanceof 不能检测 iframe
arr instanceof Array; // false

// 准确判断
Object.prototype.toString.call(arr).slice(); // '[Object Array]'
```

### Array.of

`of`函数接收一组参数，转换成为数组，行为跟`Array`构造函数类似，是为了弥补`Array`方法的缺陷。可以使用`of`代替`Array()`或者`new Array()`。

```js
Array.of(); // []
Array.of(3); // [3]
Array.of(1,2,3); // [1,2,3]

// Array 同样的操作
Array(); // []
Array(3); // [,,]
Array(1,2,3); // [1,2,3]
```

### Array.prototype 

`Array.prototype `的值是 Array.prototype ，内在的 Array 原型对象。 此属性具有属性{[[可写]] : false，[[[枚举]] : false，[[可配置]] : false }


## 数组原型对象属性

数组`Array`构造函数有一个属性`prototype`代表着这个数组的原型对象，规范对其的定义：

* 是一个内部对象`Array.prototype`
* 是一个外来对象，内部有为其指定的方法
* 有一个`length`属性，初始值为*0*，属性有`[[Writable]]: true`, `[[Enumerable]]: false`, `[[Configurable]]: false `。
* 有一个`[[prototype]]`插槽，其值为`Object.prototype`

`Arry.prototype`对象中有以下内部实现的方法。

下面使用`G6 Antv`简单实现了关于`Array`中内置方法。

<Array />

下面就看下常用内置方法的用法以及骚操作。


### Array.prototype.concat

当使用零个或多个参数调用`concat`方法时，它将返回一个数组，其中包含对象的数组元素，后跟每个参数的数组元素。

其主要是用来合并数组的。*不会改变原来数组*，只会返回一个新数组。

```js
let arr = [1,2,3];
// 合并数组
arr.concat([8,7,6]); // [1,2,3,8,7,6]
// 合并值
arr.concat(9,8,7); // [1,2,3,9,8,7]
// 合并嵌套数组
arr.concat([5,[0,6,34]]) // [1,2,3,5,[0,6,34]]
```

### Array.prototype.find

`find`方法用于早出第一个符合条件的数组成员，参数是一个回调函数，所有成员依次会执行该回调函数，知道返回第一个满足条件的成员。否则返回`undefined`

其语法是`array.find(callback, thisArg)`，回调函数`callback`接收的参数为`value`（当前值）、`index`(当前位置)以及`array`（数组本身）。而`thisArg`是绑定回调函数中this的指向。

```js
let arr = [1,2,-4,3,77,34]
arr.find((v, i, arr) => v > 10); // 77
```

跟`find`类似的方法是`findIndex`，是找到符合条件的第一个元素的位置，都不满足的话，则返回`-1`。其接收的参数以及回调函数的参数都是一致的。

```js
let arr = [1,2,-4,3,77,34]
arr.findIndex((v, i, arr) => v > 10); // 4
```


### Array.prototype.indexOf

`indexOf`方法返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1。

其语法格式是`arr.indexOf(searchEl, fromIndex)`，`searchEl`是要搜索的元素，`fromIndex`是搜索开始的索引，默认值是`0`，是从左向右搜索。如果是`-1`，则从最后一个元素开始查，以此类推。

```js
let arr = [1,2,3,4,5,9]
arr.indexOf(3); // 2
arr.indexOf(4, -1); // -1
arr.indexOf(9, -1); // 5
arr.indexOf(5, -2); // 4
```

跟`indexOf`类似的是`includes`，这是*ES6*新增的一个方法，可以判断数组中是否存在传入的元素，返回`true`或者`false`。

其语法格式`arr.includes(searchEl, fromIndex)`，`fromIndex`也是搜索开始的索引。默认是0，如果是负数，则索引是按照`arr.length+fromIndex`来开始的；如果计算出来的值为`负数`，则整个数组都会被搜索

```js
let arr = [1,2,3,4,5,9];
arr.includes(3); // true
arr.includes(4, -1); // false
arr.includes(4, -100); // true
```




### Array.prototype.push



### Array.prototype.slice



### Array.prototype.splice


### Array.prototype.forEach


### Array.prototype.flat


### Array.prototype.reduce











## Reference

* [MDN Array](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from)