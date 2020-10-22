---
type: front-JavaScript
tag: JavaScript
lang: zh
excerpt: 'ECMAScript Object'
---

# ECMAScript Specification 系列 - Object

对象是JavaScript中常用的一种类型，可以存储键值对或者复杂的实体数据。

除了自定义的一些对象之外，ECMAScript Specification 中还有`Build in`内置对象，包括`Global Object`（全局对象）和`Fundamental Object`（基本对象），下面列举一下这些内置对象以及全局对象。

<Object />

有关对象基本操作可以看[JS this以及原型、原型链](/front/javascript/primary/JSthis以及原型.html#理解对象)这篇文章。

上图基本上已经枚举了JavaScript中所有的内置对象，不过大部分在一般的开发中是用不到的，常用到子类型有以下几种:

* Object
* Array
* Function
* String
* Number
* Boolean
* Date
* Error
* RegExg

## object 内容

object的内容无非有属性（可计算属性）、方法、对象的复制、属性描述符（数据属性和访问属性）、对象遍历等

### 可计算属性名

可计算属性名是**es6**新增的特性

```js
let obj = {
    a: 1,s
    'b': 2,
    // 可计算属性名
    ['b'+'c']: 3,
    ['name']: 4,
    ['f'+'oo']() {
        console.log('foo')
    }
}

obj.bc; // 3
obj['bc'] // 3
obj.foo(); // foo
```

### 属性访问器




