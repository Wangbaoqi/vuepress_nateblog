---
type: front-JavaScript
tag: JavaScript
excerpt: 'JS 内存机制'
---

# JS 内存机制

::: tip
对于前端开发来讲，内存机制并不是非常熟悉，因为JS有自动垃圾回收机制，但是这个并不能阻挡来学习JS内存机制，
熟悉内存机制之后，对于编码质量以及JS的执行层面会有一定的提升
::: 

## 栈空间堆空间

JS的数据类型有7种，null、undefined、number、string、boolean、object、symbol。
大致分为基本类型（原始类型）和引用类型。

接下来看下这两种类型在内存里是如何存储的。

**JavaScript的代码在内存中有三种存在空间的方式:**

1. 代码空间 - 可执行代码的存在空间
2. 栈空间 - 调用栈的存在空间
3. 堆空间 - 引用类型的存在空间

![内存模型](https://cdn.img.wenhairu.com/images/2019/12/16/A4fRd.png)

这是一段简单的code：
```js
function foo() {
  var a = 1;
  var b = '3';
  var c = {
    name: 'nate',
    age: 20
  }
  var d = c; // 两者引用堆空间的是同一地址
}
foo();
```
利用执行上下文分析foo函数中变量的存储方式

![调用栈和堆空间](https://cdn.img.wenhairu.com/images/2019/12/16/A4Jqq.png)

可以看到，基本类型（原始类型）的数据基本都存在栈空间里，而引用类型数据在栈中只是其堆空间的地址，数据其实在堆空间中。

### 闭包中的内存模型

看一段代码片段:

```js
function foo() {
  var name = 'nate.wang';
  var age = 18;
  var hobby = 'book';
  var updateName = {
    setName: function(newName) {
      name = newName
    },
    getName: function() {
      console.log(hobby)
      return name
    }
  }
  return updateName
}
var bar = foo()
bar.setName('wangbaoqi')
bar.getName() // 
```

这是一段存在闭包的代码，再次利用执行上下文来分析一下：


1. foo() 执行，产生foo函数执行上下文，变量name、age、hobby、updateName存在于变量环境对象中，updateName初始值为堆地址，其余初始值为undefined，在编译过程中，遇到setName函数，JS引擎对内部函数扫描一遍，进行了词法分析，发现内部函数引用了外部函数foo的变量name和hobby，因此引擎判断这是一个闭包，于是在堆空间了创建了闭包对象(Clourse(foo))
2. foo函数执行完成，foo函数执行上下文栈从调用栈的顶部弹出，此时按理说foo函数里所有变量都会销毁，但是由于产生了闭包，变量name和hobby存在引用，并没有被销毁掉。

**foo函数执行到return的时候，调用栈是如何执行的**

![闭包-执行栈](https://cdn.img.wenhairu.com/images/2019/12/16/A4Dv6.png)


**总而言之：产生闭包Clourse的核心两步**

1. 预扫描内部函数 - 在编一阶段，JS引擎扫描代码进行词法分析
2. 内部函数(setName)内部引用外部函数的变量(name, hobby)保存在了堆空间中 
