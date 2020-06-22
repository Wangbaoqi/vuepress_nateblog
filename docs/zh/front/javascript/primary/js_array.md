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

Array 构造函数，也就是数组初始化调用的函数
