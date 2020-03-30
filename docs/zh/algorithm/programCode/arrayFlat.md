---
type: data-structure
tag: 编程题 
excerpt: '常见的数组处理算法以及收集面试题'
lang: zh
---
# 数组编程

::: tip
有关数组的所有算法操作以及收集关于数组的面试题
:::

## 将数组扁平化去重得到升序不重复数组

测试用例
```js
const arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [14]]], 10];
```

**使用flat、set、sort**
flat：数组扁平化
set：数组去重
sort： 数组排序
```js
// 兼容性不太好
[... new Set(arr.flat(Infinity))].sort((a, b) => a - b )
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14]
```

**使用reduce、concat代替flat**
reduce: 采用递归以及累加器
concat: 合并数组
```js
function flatDeep(arr) {
  return arr.reduce((acc, val => {
    return acc.concat(Array.isArray(val) ? flatDeep(val) : val)
  }), [])
}
Array.from(new Set(flatDeep(arr))).sort((a, b) => a - b)
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14]
```

**使用toString、split 代替flat**
toString: 转化为字符串
split: 转化为数组

```js
[... new Set(arr.toString().split(','))].sort((a, b) => a - b)
// ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "14"]
```
**使用迭代方式扁平化数组**

```js
function falttenDeep(arrs) {
  while(arrs.some(item => Array.isArray(item))) {
    console.log(...arrs)
    arrs = [].concat(...arrs)
  }
  return arrs
}
```

## [A1, A2, B1, B2]和[A, B]合并[A1, A2, A, B1, B2, B]

测试用例
```js
let arr1 = ['A1', 'A2', 'B1', 'B2'];
let arr2 = ['A', 'B'];
```
**使用charCodeAt**

```js
[...arr1, ...arr2].sort((a, b) => a.charCodeAt() - b.charCodeAt())
// ["A1", "A2", "A", "B1", "B2", "B"]
```

**使用sort**
```js
const arr3 = arr2.map(i => i + 3);
[...arr1, ...arr3].sort().map(e => {
  return e.includes('3') ? e.split('')[0] : e
})
// ["A1", "A2", "A", "B1", "B2", "B"]
```

   
