---
type: data-structure
tag: ProgramCode 
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

## 数组合并

[A1, A2, B1, B2]和[A, B]合并[A1, A2, A, B1, B2, B]

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

   
## 两数之和

测试用例
```js
const nums = [2, 4, 8, 3]
const target = 5
nums[0] + nums[3] = target
return [0, 5]
```

**使用双重循环**
* 时间复杂度O(n) = n^2
* 空间复杂度O(n) = 1
* 执行时间: **188ms**
* 内存消耗: **34.9MB**

```js
var twoSum = function(nums, target) {
  for(let i = 0; i < nums.length; i++) {
    for(let j = i + 1; j < nums.length; j++) {
      if(nums[i] + num[j] === target) {
        return [i, j]
      }
    }
  }
}
```
**使用HashMap ES6**
* 时间复杂度O(n) = n
* 空间复杂度O(n) = n hash表存储的元素个数

* 执行时间: **72ms**
* 内存消耗: **35.3MB**

```js
// 利用差值以及Hash表
var twoSum = function(nums, target) {
  let hashMap = new Map()
  for(let i = 0; i < nums.length; i++) {
    const val = target - nums[i]
    if(hashMap.has(val)) {
      return [hashMap.get(val), i]
    }
    hashMap.set(num[i], i)
  }
}
```

## 判断字符是否唯一
测试用例
```js
let str = 'nate'
isUnique(str) // true
let str = 'nate wang'
isUnique(str) // false
```

**暴力法 双重循环**

* 时间复杂度O(n) = n^2
* 空间复杂度O(n) = 1

* 执行时间: **68ms**
* 内存消耗: **33.7MB**
```js
var isUnique = function(str) {
  for(let i = 0; i < str.length; i++) {
    for(let j = i + 1; j < str.length; j++) {
      if(str[i] == str[j]) return false
    }
  }
  return true
}
isUnique('nate') // true
isUnique('nate wang') // false
```

**数组暂存**

* 时间复杂度O(n) = n
* 空间复杂度O(n) = 1
* 执行时间: **64ms**
* 内存消耗: **33.8MB**

```js
var isUnique1 = function(str) {
  let arr = []
  for(let i = 0; i < str.length; i++) {
    if(arr.indexOf(str[i]) > -1) return false;
    arr.push(str[i])
  }
  return true
}
isUnique1('nate') // true
isUnique1('nate wang') // false
```
**HashMap**
* 时间复杂度O(n) = n
* 空间复杂度O(n) = 1
* 执行时间: **60ms**
* 内存消耗: **33.8MB**

```js
var isUnique2 = function(str) {
  let hashMap = new Map()
  for(let i = 0; i < str.length; i++) {
    if(hashMap.has(str[i])) return false;
    hashMap.set(str[i])
  }
  return true
}
isUnique2('nate') // true
isUnique2('nate wang') // false
```
## 字符串是否互为重排

测试用例
```js
let s1 = 'abc'
let s2 = 'bcd'
let s3 = 'bac'
CheckPermutation(s1, s2) // false
CheckPermutation(s1, s3) // true
```

**两者互相循环判断**

```js
var CheckPermutation = function(s1, s2) {
  return [...s1].every(e => {
    return s2.includes(e)
  }) && [...s2].every(e => {
    return s1.includes(e)
  })
};
CheckPermutation('abc', 'acb') // true
CheckPermutation('abc', 'acbd') // false
CheckPermutation('abc', 'acd') // false
```

**合并循环判断**

```js
var CheckPermutation = function(s1, s2) {
  const allStr = [...s1, ...s2]
  return allStr.every(e => {
    return s1.includes(e) && s2.includes(e)
  })
};
CheckPermutation('abc', 'acb') // true
CheckPermutation('abc', 'acbd') // false
CheckPermutation('abc', 'acd') // false
```

## 删除排序数组中的重复项

测试用例
```js
// 给定已经排好序数组
let arr = [0,0,1,2,3,3]
// 返回长度[0,1,2,3] 4 原地修改原数组
removeDuplicates(arr) 
```

**暴力破解法**
* 时间复杂度O(n) = n^2
* 空间复杂度O(n) = 1

```js
var removeDuplicates = function(nums) {
  if(!nums || !nums.length) return 0

  for(let i = 0; i < nums.length; i++) {
    for(let j = i + 1; j < num.length; j++) {
      if(nums[i] == nums[j]) {
        nums.splice(j, 1)
        j--;
      }
    }
  }
  return nums.length
};
```

**双指针方法**
* 时间复杂度O(n) = n
* 空间复杂度O(n) = 1

```js
var removeDuplicates = function(nums) {
  if(!nums || !nums.length) return 0
  let i = 0;

  for(let j = 1; j < nums.length; j++) {
    // 元素不一致 指针移动
    if(nums[i] !== nums[j]) {
      nums[i + 1] = nums[j]
      i++
    }
  }
  
  return i 
};
```
## 根据目标值移除元素

测试用例
```js
let nums = [0,1,1,2,3,1]
let target = 1
// 返回 [0,2,3]的长度
removeElement(nums, target)
```

**利用splice方法**
* 时间复杂度O(n) = n
* 空间复杂度O(n) = 1
```js
var removeElement = function(nums, val) {
  for(let i = 0; i < nums.length; i++){
    if(nums[i] === val) {
      nums.splice(i, 1)
      i--
    }
  }
};
```

**双指针方法**

* 时间复杂度O(n) = n
* 空间复杂度O(n) = 1
```js
var removeElement = function(nums, val) {
  // 慢指针
  let i = 0;
  for(let j = 0; j < nums.length; j++){
    if(nums[j] !== val) {
      num[i] = num[j]
      i++
    }
  }
  return i
};
```

## 合并两个有序数组

测试用例
```js
let nums1 = [1,2,3,0,0,0]
let nums2 = [2,5,6]
// 返回 [1,2,2,3,5,6]的长度
merge(nums1, 3, nums2, 3)
```

**双指针 从前往后**

```js
var merge1 = function(nums1, m, nums2, n) {
  let num1_copy = [].concat(nums1)
  let p = 0; // new array
  let p1 = 0;
  let p2 = 0; // num1 and num2 index

  while(p1 < m && p2 < n) {
    num1_copy[p++] = nums1[p1] < nums2[p2] ? nums1[p1++] : nums2[p2++];
  }

  while(p1 < m) {
    num1_copy[p++] = nums1[p1++]
  }

  while(p2 < n) {
    num1_copy[p++] = nums2[p2++]
  }
  // while()
  return  [].concat(num1_copy)
};
```

**双指针 从后往前**

```js
var merge1 = function(nums1, m, nums2, n) {
  let len = m + n - 1;
  while(n > 0) {
    if(m <= 0) {
      nums1[len--] = nums2[--n];
      continue
    }
    nums1[len--] = nums1[m - 1] >= nums2[n - 1] ? nums1[--m] : nums2[--n]
  }
};
```
