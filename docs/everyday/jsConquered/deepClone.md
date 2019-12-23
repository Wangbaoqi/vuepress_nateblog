---
type: web-topic
subType: oneTopic
subTag: JavaScript相关
tag: 壹题攻克
---


# 谈谈深浅拷贝

**拷贝是日常开发常用的方式，也是面试高频的问题**

## 浅拷贝 

> 浅拷贝: 对基本类型来讲，就是值得拷贝，对于引用类型来讲，就是引用的拷贝，但是只会拷贝一层

**浅拷贝的方式**

1. Object.assign 

[MDN - Object.assign](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign):是将所有可枚举属性的值从一个或者多个源对象复制到目标对象，将返回这个目标对象。

```js
var obj = {
  name: 'nate.wang',
  friends: {
    name: 'baoqiwang',
    age: 20
  }
}
var newObj = Object.assign({}, obj)
console.log(newObj)

newObj.name = 'baoqi.wang'
newObj.friends.name = 'baoqi'

console.log(obj)
```

可以看到obj和newObj的friends的值都变了，因此，Object.assign只能拷贝引用类型的一层

2. Array.prototype.slice 

[MDN - Array.prototype.slice](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice):返回一个新的数组对象。新的数组对象由（begin和end - 不包含）决定的原数组的浅拷贝。原数组的值不会改变。

```js 
var arr = [
  1,
  '2',
  {
    name: 'nate'
  }
]
var newArr = arr.slice(1) // ['2', {name: 'nate'}]
arr[2].name = 'baoqi'
console.log(arr) // [1, '2', {name: 'nate'}]
console.log(newArr) // ['2', {name: 'baoqi'}]
```

3. 手动实现浅拷贝

实现浅拷贝的原理是遍历一层就可以
```js
function copy(obj) {
  if(typeof obj !== 'object' || obj === null) return 

  let newObj = Array.isArray(obj) ? [] : {}

  for(let i in obj) {
    if(obj.hasOwnProperty(i)) {
      newObj[i] = obj[i]
    }
  }
  return newObj
}
let newObj = copy(obj)
```

## 深拷贝