---
type: data-structure
tag: ProgramCode
excerpt: "常见的数组处理算法以及收集面试题"
lang: zh
---

# 数组算法系列（简单）

::: tip
有关数组的所有算法操作以及收集关于数组的面试题
:::

## 将数组扁平化去重得到升序不重复数组

测试用例

```js
const arr = [[1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [14]]], 10];
```

**使用 flat、set、sort**
flat：数组扁平化
set：数组去重
sort： 数组排序

```js
// 兼容性不太好
[...new Set(arr.flat(Infinity))].sort((a, b) => a - b);
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14]
```

**使用 reduce、concat 代替 flat**
reduce: 采用递归以及累加器
concat: 合并数组

```js
function flatDeep(arr) {
  return arr.reduce(
    (acc,
    (val) => {
      return acc.concat(Array.isArray(val) ? flatDeep(val) : val);
    }),
    []
  );
}
Array.from(new Set(flatDeep(arr))).sort((a, b) => a - b);
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14]
```

**使用 toString、split 代替 flat**
toString: 转化为字符串
split: 转化为数组

```js
[...new Set(arr.toString().split(","))].sort((a, b) => a - b);
// ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "14"]
```

**使用迭代方式扁平化数组**

```js
function falttenDeep(arrs) {
  while (arrs.some((item) => Array.isArray(item))) {
    console.log(...arrs);
    arrs = [].concat(...arrs);
  }
  return arrs;
}
```

## 数组合并

[A1, A2, B1, B2]和[A, B]合并[A1, A2, A, B1, B2, B]

测试用例

```js
let arr1 = ["A1", "A2", "B1", "B2"];
let arr2 = ["A", "B"];
```

**使用 charCodeAt**

```js
[...arr1, ...arr2].sort((a, b) => a.charCodeAt() - b.charCodeAt());
// ["A1", "A2", "A", "B1", "B2", "B"]
```

**使用 sort**

```js
const arr3 = arr2.map((i) => i + 3);
[...arr1, ...arr3].sort().map((e) => {
  return e.includes("3") ? e.split("")[0] : e;
});
// ["A1", "A2", "A", "B1", "B2", "B"]
```

## 两数之和

测试用例

```js
const nums = [2, 4, 8, 3];
const target = 5;
nums[0] + nums[3] = target;
return [0, 5];
```

**使用双重循环**

- 时间复杂度 O(n) = n^2
- 空间复杂度 O(n) = 1
- 执行时间: **188ms**
- 内存消耗: **34.9MB**

```js
var twoSum = function(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + num[j] === target) {
        return [i, j];
      }
    }
  }
};
```

**使用 HashMap ES6**

- 时间复杂度 O(n) = n
- 空间复杂度 O(n) = n hash 表存储的元素个数

- 执行时间: **72ms**
- 内存消耗: **35.3MB**

```js
// 利用差值以及Hash表
var twoSum = function(nums, target) {
  let hashMap = new Map();
  for (let i = 0; i < nums.length; i++) {
    const val = target - nums[i];
    if (hashMap.has(val)) {
      return [hashMap.get(val), i];
    }
    hashMap.set(num[i], i);
  }
};
```

## 两数之和 II

[算法描述](https://leetcode-cn.com/problems/two-sum-ii-input-array-is-sorted/)以及测试用例

```js
const nums = [2, 7, 11, 15];
const target = 9;
return [1, 2];
```

**双指针 嵌套循环**

- 时间复杂度 O(n) = n\*n
- 空间复杂度 O(n) = 1

- 执行时间: **344ms**
- 内存消耗: **34.7MB**

```js
var twoSum = function(numbers, target) {
  let p = 0;
  let q = 1;
  let len = numbers.length;

  while (p < len) {
    q = p + 1;
    while (q < len) {
      if (numbers[p] + numbers[q++] === target) return [p + 1, q];
    }
    p++;
  }
};

let numbers = [5, 25, 75],
  target = 100;
twoSumN(numbers, target);
```

**双指针 二分法**

- 时间复杂度 O(n) = n
- 空间复杂度 O(n) = 1

- 执行时间: **72ms**
- 内存消耗: **34.7MB**

```js
var twoSumN = function(numbers, target) {
  let len = numbers.length;
  let p = 0;
  let q = len - 1;
  while (p < q) {
    let sum = numbers[p] + numbers[q];
    if (sum === target) return [p + 1, q + 1];

    if (sum > target) {
      --q;
    } else {
      ++p;
    }
  }
};
```

## 判断字符是否唯一

测试用例

```js
let str = "nate";
isUnique(str); // true
let str = "nate wang";
isUnique(str); // false
```

**暴力法 双重循环**

- 时间复杂度 O(n) = n^2
- 空间复杂度 O(n) = 1

- 执行时间: **68ms**
- 内存消耗: **33.7MB**

```js
var isUnique = function(str) {
  for (let i = 0; i < str.length; i++) {
    for (let j = i + 1; j < str.length; j++) {
      if (str[i] == str[j]) return false;
    }
  }
  return true;
};
isUnique("nate"); // true
isUnique("nate wang"); // false
```

**数组暂存**

- 时间复杂度 O(n) = n
- 空间复杂度 O(n) = 1
- 执行时间: **64ms**
- 内存消耗: **33.8MB**

```js
var isUnique1 = function(str) {
  let arr = [];
  for (let i = 0; i < str.length; i++) {
    if (arr.indexOf(str[i]) > -1) return false;
    arr.push(str[i]);
  }
  return true;
};
isUnique1("nate"); // true
isUnique1("nate wang"); // false
```

**HashMap**

- 时间复杂度 O(n) = n
- 空间复杂度 O(n) = 1
- 执行时间: **60ms**
- 内存消耗: **33.8MB**

```js
var isUnique2 = function(str) {
  let hashMap = new Map();
  for (let i = 0; i < str.length; i++) {
    if (hashMap.has(str[i])) return false;
    hashMap.set(str[i]);
  }
  return true;
};
isUnique2("nate"); // true
isUnique2("nate wang"); // false
```

## 字符串是否互为重排

测试用例

```js
let s1 = "abc";
let s2 = "bcd";
let s3 = "bac";
CheckPermutation(s1, s2); // false
CheckPermutation(s1, s3); // true
```

**两者互相循环判断**

```js
var CheckPermutation = function(s1, s2) {
  return (
    [...s1].every((e) => {
      return s2.includes(e);
    }) &&
    [...s2].every((e) => {
      return s1.includes(e);
    })
  );
};
CheckPermutation("abc", "acb"); // true
CheckPermutation("abc", "acbd"); // false
CheckPermutation("abc", "acd"); // false
```

**合并循环判断**

```js
var CheckPermutation = function(s1, s2) {
  const allStr = [...s1, ...s2];
  return allStr.every((e) => {
    return s1.includes(e) && s2.includes(e);
  });
};
CheckPermutation("abc", "acb"); // true
CheckPermutation("abc", "acbd"); // false
CheckPermutation("abc", "acd"); // false
```

## 删除排序数组中的重复项

测试用例

```js
// 给定已经排好序数组
let arr = [0, 0, 1, 2, 3, 3];
// 返回长度[0,1,2,3] 4 原地修改原数组
removeDuplicates(arr);
```

**暴力破解法**

- 时间复杂度 O(n) = n^2
- 空间复杂度 O(n) = 1

```js
var removeDuplicates = function(nums) {
  if (!nums || !nums.length) return 0;

  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < num.length; j++) {
      if (nums[i] == nums[j]) {
        nums.splice(j, 1);
        j--;
      }
    }
  }
  return nums.length;
};
```

**双指针方法**

- 时间复杂度 O(n) = n
- 空间复杂度 O(n) = 1

```js
var removeDuplicates = function(nums) {
  if (!nums || !nums.length) return 0;
  let i = 0;

  for (let j = 1; j < nums.length; j++) {
    // 元素不一致 指针移动
    if (nums[i] !== nums[j]) {
      nums[i + 1] = nums[j];
      i++;
    }
  }

  return i;
};
```

## 根据目标值移除元素

测试用例

```js
let nums = [0, 1, 1, 2, 3, 1];
let target = 1;
// 返回 [0,2,3]的长度
removeElement(nums, target);
```

**利用 splice 方法**

- 时间复杂度 O(n) = n
- 空间复杂度 O(n) = 1

```js
var removeElement = function(nums, val) {
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === val) {
      nums.splice(i, 1);
      i--;
    }
  }
};
```

**双指针方法**

- 时间复杂度 O(n) = n
- 空间复杂度 O(n) = 1

```js
var removeElement = function(nums, val) {
  // 慢指针
  let i = 0;
  for (let j = 0; j < nums.length; j++) {
    if (nums[j] !== val) {
      num[i] = num[j];
      i++;
    }
  }
  return i;
};
```

## 合并两个有序数组

测试用例

```js
let nums1 = [1, 2, 3, 0, 0, 0];
let nums2 = [2, 5, 6];
// 返回 [1,2,2,3,5,6]的长度
merge(nums1, 3, nums2, 3);
```

**双指针 从前往后**

```js
var merge1 = function(nums1, m, nums2, n) {
  let num1_copy = [].concat(nums1);
  let p = 0; // new array
  let p1 = 0;
  let p2 = 0; // num1 and num2 index

  while (p1 < m && p2 < n) {
    num1_copy[p++] = nums1[p1] < nums2[p2] ? nums1[p1++] : nums2[p2++];
  }

  while (p1 < m) {
    num1_copy[p++] = nums1[p1++];
  }

  while (p2 < n) {
    num1_copy[p++] = nums2[p2++];
  }
  // while()
  return [].concat(num1_copy);
};
```

**双指针 从后往前**

```js
var merge1 = function(nums1, m, nums2, n) {
  let len = m + n - 1;
  while (n > 0) {
    if (m <= 0) {
      nums1[len--] = nums2[--n];
      continue;
    }
    nums1[len--] = nums1[m - 1] >= nums2[n - 1] ? nums1[--m] : nums2[--n];
  }
};
```

## 存在重复元素

测试用例以及[LeetCode](https://leetcode-cn.com/problems/contains-duplicate/)

```js
let nums = [1, 2, 3, 1];
// 存在两个及以上 return true 否则 return false
containsDuplicate(nums);
```

**双指针 双重循环**

- 时间复杂度 O(n) = n^2
- 空间复杂度 O(n) = 1

```js
var containsDuplicate = function(nums) {
  let p = 0,
    q = 1;
  let len = nums.length;
  while (p < len) {
    q = p + 1;
    while (q < len) {
      if (nums[p] === nums[q++]) return true;
    }
    p++;
  }
  return false;
};
```

**散列表 唯一**

- 时间复杂度 O(n) = n
- 空间复杂度 O(n) = n

```js
var containsDuplicate = function(nums) {
  let set = new Set();
  let p = 0;
  let len = nums.length;
  while (p < len) {
    if (set.has(nums[p])) return true;
    set.add(nums[p]);
    p++;
  }
  return false;
};
```

## 存在重复元素 II

测试用例以及[LeetCode](https://leetcode-cn.com/problems/contains-duplicate-ii/)

```js
let nums = [1, 2, 3, 1],
  k = 3;
containsNearbyDuplicate(nums, k);
```

**双指针 双重循环**

- 时间复杂度 O(n) = n^2
- 空间复杂度 O(n) = 1

```js
var containsNearbyDuplicate = function(nums, k) {
  let p = 0,
    q = 0;
  let len = nums.length;
  while (p < len) {
    q = p + 1;
    while (q < len) {
      if (nums[p] === nums[q] && Math.abs(p - q) <= k) {
        return true;
      }
      q++;
    }
    p++;
  }
  return false;
};
```

**Map**

- 时间复杂度 O(n) = n
- 空间复杂度 O(n) = n

```js
var containsNearbyDuplicate = function(nums, k) {
  let p = 0;
  let map = new Map();
  let len = nums.length;

  while (p < len) {
    const mapIndex =
      !isNaN(map.get(nums[p])) && Math.abs(map.get(nums[p]) - p) <= k;
    const isExist = map.has(nums[p]);
    if (mapIndex && isExist) return true;
    map.set(nums[p], p);
    p++;
  }
  return false;
};
```

## 买卖股票最佳时机

测试用例以及[LeetCode](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/)

```js
let nums = [1, 2, 3, 1];
maxProfit(nums); // return 2
```

**暴力解法 双循环**

- 时间复杂度 O(n) = n^2
- 空间复杂度 O(1) = 1

```js
var maxProfit = function(prices) {
  let p = 0;
  let q = 1;
  let len = prices.length;
  let price = 0;
  while (p < len) {
    q = p + 1;
    while (q < len) {
      // 保存当前
      const curPrice = prices[q++] - prices[p];
      price = curPrice > price ? curPrice : price;
    }
    p++;
  }
  return price;
};
```

**一次循环**

一次循环，记录价格最低的一天，如果每一天的价格比前一天的都低，则最好的利润是 0；
否则记录每天与最低价的一天的利润差，最终就会得到最好利润。

- 时间复杂度 O(n) = n
- 空间复杂度 O(1) = 1

```js
var maxProfit = function(prices) {
  let minPrice = Number.MAX_VALUE;
  let maxPrice = 0;
  let p = 0;
  let len = prices.length;
  while (p < len) {
    if (prices[p] < minPrice) {
      minPrice = prices[p];
    } else if (prices[p] - minPrice > maxPrice) {
      maxPrice = prices[p] - minPrice;
    }
  }
  return maxPrice;
};
```

## 买卖股票最佳时机 II

测试用例以及[LeetCode](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/)

```js
let nums = [7, 1, 5, 3, 6, 4];
maxProfit(nums); // 7
```

**暴力 递归法**

_此方法巨耗时_

- 时间复杂度 O(n) = n\*n
- 空间复杂度 O(n) = n

```js
var maxProfit = function(prices) {
  return caculate(prices, 0);
};

function caculate(prices, start = 0) {
  let len = prices.length;
  if (start >= len) return 0;
  let max = 0;
  while (start < len) {
    let index = start + 1;
    let maxPrice = 0;
    while (index < len) {
      let curProfit = prices[index] - prices[start];
      if (curProfit > 0) {
        let profit = caculate(prices, index + 1) + curProfit;
        if (profit > maxPrice) {
          maxPrice = profit;
        }
      }
      index++;
    }
    start++;
    if (maxPrice > max) {
      max = maxPrice;
    }
  }
  return max;
}
```

**峰谷法 一次循环**

- 时间复杂度 O(n) = n
- 空间复杂度 O(1) = 1

```js
var maxProfits = function(prices) {
  let p = 0;
  let low = prices[0];
  let high = prices[0];
  let len = prices.length - 1;
  let maxProfit = 0;

  while (p < len) {
    while (p < len && prices[p] >= prices[p + 1]) {
      p++;
    }
    low = prices[p];
    while (p < len && prices[p] <= prices[p + 1]) {
      p++;
    }
    high = prices[p];
    maxProfit += high - low;
  }
  return maxProfit;
};
```

## 多数元素

测试用例以及[LeetCode](https://leetcode-cn.com/problems/majority-element/)

```js
let nums = [3, 2, 3];
majorityElement1(nums); // 3
```

**哈希表**

- 时间复杂度 O(n) = n
- 空间复杂度 O(n - n/2) = n - n/2

```js
var majorityElement = function(nums) {
  let p = 0;
  let len = nums.length;
  let half = nums.length / 2;
  let map = new Map();
  while (p < len) {
    if (map.has(nums[p])) {
      map.set(nums[p], map.get(nums[p]) + 1);
    } else {
      map.set(nums[p], 1);
    }
    if (map.get(nums[p]) >= half) return nums[p];
    p++;
  }
};
```

**排序法**

- 时间复杂度 O(nlogn) = nlogn
- 空间复杂度 O(logn) = logn


```js
var majorityElement1 = function(nums) {
  nums.sort()
  return nums[parseInt(nums.length/2) ]
};

// 存在的问题
majorityElement1([3,2,3,2,2,3]) // 3
```

**Boyer-Moore 投票算法**

- 时间复杂度 O(n) = n
- 空间复杂度 O(1) = 1

```js
var majorityElement2 = function(nums) {
  let candidate = null;
  let count = 0;
  let len = nums.length;
  let p = 0;
  while(p < len) {
    if(count == 0) {
      candidate = nums[p]
    }
    count += (nums[p] == candidate) ? 1 : -1
    p++
  }
  return candidate
};
```

## 旋转数组

测试用例以及[LeetCode](https://leetcode-cn.com/problems/rotate-array/)

要求：在原数组上操作，也就是空间复杂度为O(1)

```js
let nums = [1,2,3,4,5,6,7], k = 3;
// 输入: [1,2,3,4,5,6,7] 和 k = 3
// 输出: [5,6,7,1,2,3,4]
// 解释:
// 向右旋转 1 步: [7,1,2,3,4,5,6]
// 向右旋转 2 步: [6,7,1,2,3,4,5]
// 向右旋转 3 步: [5,6,7,1,2,3,4]
rotate(nums); // [5,6,7,1,2,3,4]
```

**暴力循环法**

- 时间复杂度 O(n*k) = n * k
- 空间复杂度 O(1) = 1

```js
// 旋转数组 
// 关键 元素互换
var rotate = function(nums, k) {
  let len = nums.length;
  let p = 0, q = 0;

  while(p < k) {
    let pre = nums[len - 1];
    q = 0;
    while(q  < len) {
      let tmp = nums[q];
      nums[q] = pre;
      pre = tmp;
      q++
    }
    p++
  }
};
```

**旋转法 - 循环一次**

- 时间复杂度 O(n) = n 
- 空间复杂度 O(1) = 1

```js
// 整体旋转: [7,6,5,4,3,2,1]
// 前 k - 1 旋转: [5,6,7,4,3,2,1]
// k 到 nums.length 旋转: [5,6,7,1,2,3,4]
var rotates = function(nums, k) {
  k %= nums.length
  reverse(nums, 0, nums.length - 1);
  reverse(nums, 0, k - 1);
  reverse(nums, k, nums.length - 1)
}
// 数组旋转
function reverse(nums, start, end) {
  while(start < end) {
    let tmp = nums[start];
    nums[start] = nums[end];
    nums[end] = tmp;
    start++;
    end--;
  }
}
```