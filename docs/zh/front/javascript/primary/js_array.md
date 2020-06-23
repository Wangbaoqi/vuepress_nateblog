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


## Array Constructor

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

## Properties of the Array Constructor

Array Constructor 有一个`[[prototype]]`的内部插槽，其值为`Array.prototype`。

数组构造函数的特性有以下几种特性:

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
