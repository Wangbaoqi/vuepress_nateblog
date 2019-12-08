---
type: web-topic
subType: oneTopic
subTag: JavaScript相关
tag: 壹题攻克
---

# 谈谈数组去重

数组去重已经是一个老生常谈的话题了，这里再重新温习和稳固一下，之前在[数据结构-数组常见使用场景](/algorithm/structure/array.html#数组去重)中简单学习过，这次全面的攻克掉。

这里收集了不同的数组去重的方法，接下来逐一去攻克。。

## ES6 Set去重

想必ES6去重应该在开发中使用的是最多的（简便明了）👍

这里使用了[MDN - Array.from()方法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from), 以及利用[Set](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set)结构不能重复的特性来实现去重

```js
const arr = [1, 1, 2, 3, 5, 2, 9, 4, 8, 3, '1', '8', {}, {}];
// 方式 Array.from
Array.from(new Set(arr)) // [1, 2, 3, 5, 9, 4, 8, "1", "8", {}, {}]
// 方式 ... 扩展运算符
[...new Set(arr)] // [1, 2, 3, 5, 9, 4, 8, "1", "8", {}, {}]
```
可以看到，这种方式可以去重相同数据类型的值（基于基本类型），{} 对象也没有去重掉。况且兼容性也不太好。


## 双重循环去重