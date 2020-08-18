---
type: data-structure & algorithm
tag: Algorithm
excerpt: "滑动窗口"
lang: zh
---

# 滑动窗口模式技巧

::: tip
采用双指针滑动窗口高级技巧可以解决一些很复杂的算法问题，可以用解决数组/字符串的子元素问题，将嵌套的循环问题转换为单循环的问题，类似于[最小覆盖字符串](https://leetcode-cn.com/problems/minimum-window-substring/)等
:::

这里通过一个简单的例子，熟悉一下什么是滑动窗口模式。

**示例**：给定一个整数数组，计算长度为**k**的连续子数组的最大总和?

题意很好理解，找出连续**K**个子数组，其值是最大值。

**先来看下暴力解法**

暴力解法就是采用双重循环，将每个连续 K 个数组的和比较，记录其中最大值。

```js
var arr = [100, 200, 150, 300, 250, 350],
  k = 3;

function maxArr(arr) {
  let len = arr.length - k + 1;
  let maxNum = Number.MAX_SAFE_INTEGER;
  let maxCount = 0;

  for (let i = 0; i < len; i++) {
    let curNum = 0;
    for (let j = 0; j < k; j++) {
      curNum += arr[i + j];
    }
    maxCount = Math.max(maxCount, curNum);
  }

  return maxCount;
}
```

暴力求解的时间复杂度`O(len*k)`

**滑动窗口解法**

滑动窗口将多重循环可以简化为单次循环，这里可以将连续的 K 个子数组当做一个窗口，首先获取第一个窗口的和值，下一个窗口的和值为上一个窗口的和值加当前值减掉`arr[n-k]`，对比前后窗口的值就可以了

```js
function maxSliderArr(arr, k) {
  let len = arr.length;
  if (len < k) {
    return -1;
  }

  let maxNum = 0;
  // 获取第一个窗口的和值
  for (let i = 0; i < k; i++) {
    maxNum += arr[i];
  }

  let curMax = maxNum;

  for (let j = n; j < len; j++) {
    curMax += arr[j] - arr[j - k];
    maxNum = Math.max(maxNum, curMax);
  }

  return maxNum;
}
```

接下来看下滑动窗口的算法思想:

## 算法思想

1. 在字符串或者数组中使用双指针（左右指针），_left=0_, _right=0_，初始化为 0，将左右指针的闭合区间称之为**窗口**
2. 开始遍历的时候，先不断增加**right**，左指针**left**此时仍为 0，知道当前窗口满足要寻找的所有字符
3. 此时停止增加**right**，转而增加**left**，不断的缩小窗口，知道窗口不满足要寻找的字符，每增加一次**left**，都要更新一轮结果
4. 重复 2，3 步骤

下图借用[leetCode](https://leetcode-cn.com/problems/minimum-window-substring/)的动图

![滑动窗口](https://assets.leetcode-cn.com/solution-static/76/76_fig1.gif)

根据这个动图，可以简单的概括滑动窗口的伪代码；

```js
function slideWindowCode(str, tar) {
  let left = 0,
    right = 0;
  let len = str.length;
  let map_window,
    res = str;

  while (right < len) {
    // 进入窗口
    map_window.add(str[right]);
    right++;
    // 整个tar都在窗口中时
    while (tar in map_window) {
      // 获取最小窗口
      res = minLen(res, map_window);
      map_window.remove(str[left]);
      left++;
    }
  }
  return res;
}
```

下面就**LeetCode**中有关所有的滑动窗口算法进行分析以及归纳

## 最小覆盖子串

[最小覆盖子串 - LeetCode](https://leetcode-cn.com/problems/minimum-window-substring/) 是属于**hard level**，不过使用滑动窗口技巧就不会那么困难了。

算法描述:

```md
# 给你一个字符串 S、一个字符串 T 。请你设计一种算法，可以在 O(n) 的时间复杂度内，从字符串 S 里面找出：包含 T 所有字符的最小子串。

# 示例

输入：S = "ADOBECODEBANC", T = "ABC"
输出："BANC"

# 解析

套用滑动窗口的框架 code，不难发现几个条件点

1. 字符何时进入窗口
   在 right 指针移动时，若当前字符在目标字符中，则该字符进入到窗口，记录窗口中的字符和目标字符中每个字符出现的次数。
2. 如何判断目标字符全部在窗口中
   如果窗口中的每个字符次数和目标窗口的对应字符的次数一致时，则 right 指针停止，计算当前窗口大小以及开始移动 left 指针
3. 如何获取最小窗口
   每移动一次 left 指针，就要更新一次窗口大小，如果当前 left 指针指向的字符在目标字符中，则当前窗口需要移除该字符
4. 何时 right 指针会移动  
   在 left 指针移动的过程中，窗口中字符出现的次数和目标字符次数不一致的时候。
```

下面看下完整的 code:

```js
function slideWindow(str, tar) {
  let left = 0,
    right = 0,
    len = str.length,
    matchs = 0;

  let minLen = Number.MAX_SAFE_INTEGER,
    start = 0;

  // 窗口字符 和 目标字符
  let map_need = {},
    map_window = {};

  // 将目标字符转化为字典模式 { 'a': 1, 'b': 1, 'c': 1 }
  for (let k of tar) {
    if (map_need[k]) {
      map_need[k]++;
    } else {
      map_need[k] = 1;
    }
  }

  while (right < len) {
    let charR = str[right];
    if (map_need[charR]) {
      map_window[charR] = (map_window[charR] || 0) + 1;
      if (map_window[charR] === map_need[charR]) {
        matchs++;
      }
    }
    right++;

    // 当前窗口的字符满足目标字符，则开始移动左指针
    while (matchs === Object.keys(map_need).length) {
      const charL = str[left];
      // 更新窗口大小
      if (right - left < minLen) {
        start = left;
        minLen = right - left;
      }

      // 移除窗口中的字符
      if (map_need[charL]) {
        map_window[charL]--;

        if (map_window[charL] < map_need[charL]) {
          matchs--;
        }
      }
      left++;
    }
  }
}
```

## 找到字符串中所有字母异位词

[找到字符串中所有字母异位词 - LeetCode](https://leetcode-cn.com/problems/find-all-anagrams-in-a-string/) 是属于**hard level**，不过使用滑动窗口技巧就不会那么困难了。

算法描述:

```md
# 给定一个字符串  s  和一个非空字符串  p，找到  s  中所有是  p  的字母异位词的子串，返回这些子串的起始索引。

# 字符串只包含小写英文字母，并且字符串  s  和 p  的长度都不超过 20100。

# 示例

输入：s: "cbaebabacd" p: "abc"
输出："[0, 6]"

# 解析
```

下面看下完整的 code:

```js
var findAnagrams = function(s, p) {
  let left = 0,
    right = 0;
  (len = s.length), (matchs = 0);
  let mp_need = {};
  let mp_window = {};
  let res = [];

  for (const k of p) {
    if (mp_need[k]) {
      mp_need[k]++;
    } else {
      mp_need[k] = 1;
    }
  }

  while (right < len) {
    let charR = s[right];

    if (mp_need[charR]) {
      mp_window[charR] = (mp_window[charR] || 0) + 1;
      if (mp_need[charR] === mp_window[charR]) {
        matchs++;
      }
    }
    right++;

    while (matchs === Object.keys(mp_need).length) {
      let charL = s[left];
      if (right - left === Object.keys(mp_need).length) {
        res.push(left);
      }
      if (mp_need[charL]) {
        mp_window[charL]--;

        if (mp_window[charL] < mp_need[charL]) {
          matchs--;
        }
      }
      left++;
    }
  }
  return res;
};
```
