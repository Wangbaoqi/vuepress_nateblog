---
type: front-JavaScript
tag: JavaScript
excerpt: 'this 是在运行时绑定的，不是在编写时绑定的（词法作用域），上下文取决于调用的条件。创建的每一个函数都有一个prototype（原型）属性，它是一个指针，指向一个对象（包含了所有的实例共享的属性和方法）；字面意思来讲，prototype就是通过构造函数创建的对象实例的原型对象。'
---

# JS this以及原型、原型链

## this 全面解析

::: tip
this 是在运行时绑定的，不是在编写时绑定的（词法作用域），上下文取决于调用的条件
:::

### this的调用位置

调用位置是函数在代码中被调用的位置，不是声明是的位置。

其次就是函数调用栈。

```js
function baz() {
  bar(); // 调用位置
}

function bar () {
  foo(); // 调用位置
}

function foo() {
  // ...
}
baz()
```

### 绑定规则
函数的执行过程中调用位置如何决定this的绑定对象

#### 默认绑定

```js
function bar() {
  console.log(this.a)
}
var a = 2;
bar()
```

在此种情况下，foo()是直接使用不带任何修饰的函数引用进行调用的，只能使用默认绑定规则，但是这种是在非严格模式下。如果是在严格模式下，此时this是undefined

#### 隐式绑定
此种情况下看调用位置是否有上下文对象，或者说是否被某个对象拥有或者包含。

```js
function foo() {
  console.log(this.a)
}
var obj = {
  a: 3,
  foo: foo
}
obj.foo() // 3
```

**对象属性引用链中只有对顶层或者最后一层会影响调用位置**

```js
function foo() {
  console.log(this.a)
}
var obj = {
  a: 2
  foo: foo
}
var obj1 = {
  a: 43,
  obj: obj
}
obj1.obj.foo(); // 2
```

**隐式丢失**

```js
function foo() {
  console.log(this.a)
}
var obj = {
  a: '1',
  foo: foo
}
var a = 'global',
var bar = obj.foo; // 函数引用的副本
bar(); // global
```
在看个例子, 函数传参(回调函数)

```js
function foo() {
  console.log(this.a)
}
function doFun(fn) {
  fn()
}
var obj = {
  a: '2',
  foo: foo
}
doFun(obj.foo); // 参数也是foo引用的副本 global

// setTimeout
setTimeout(obj.foo, 1000); // global
```

#### 显示绑定
> call() apply() bind() 都可以改变当前调用函数的this指向

```js
function foo(s) {
  console.log(this.a, s)
}
var obj = {
  a: 3,
  foo: foo
}
foo.call(obj); // 3
foo.apply(obj); // 3

var bar = foo.bind(obj);
bar(); // 3
```

<font color=#ff502c bgcolor=#fff5f5 size=3 >**面试题 手写bind**</font>

```js
function foo() {
  console.log(this.a)
}
var obj1 = {
  a: 3
}

// 手写bind
function eBind(fn, obj) {
  return function() {
    return fn.apply(obj, arguments);
  }
}
// 原型bind
Function.prototype.eBind = function(ctx) {
  let self = this;
  return function() {
    self.apply(ctx, arguments)
  }
  // es6 写法
  return () => {
    this.apply(ctx, arguments)
  }
}

```

#### new绑定

::: tip
首先我们重新定义一下 JavaScript 中的“构造函数”。在 JavaScript 中，构造函数只是一些 使用 new 操作符时被调用的函数。它们并不会属于某个类，也不会实例化一个类。实际上， 它们甚至都不能说是一种特殊的函数类型，它们只是被 new 操作符调用的普通函数而已。
:::

使用 new 来调用函数或者说是构造函数调用时，会自动执行以下操作：

1. 创建一个全新的对象。
2. 这个新对象会被执行[[原型]]连接
3. 这个新对象会绑定到函数调用的this
4. 如果函数没有返回其他对象，那么new表达式中的函数调用会自动返回这个对象

```js
function Foo(a) {
  this.a = a
}

var bar = new Foo(2)
bar.a; // 2
```

### 绑定优先级

#### 隐式绑定 显示绑定

### 绑定例外


### this词法


```js
function foo() {

  setTimeout(function() {
    console.log(this.a)
  })
}

var obj = {
  a: 2,
  foo: foo
}
obj.foo()

```




## 面对对象 oo 

### 理解对象


首先使用new操作符创建一个简单的对象

```js{1}
let person = new Object()
person.name = 'nate'
person.age = 24

person.getName = function() {
  return this.name
}
```
这些属性（name、age、getName）在创建的时候都带有一些特定的类型

#### 属性类型

> ECMA-262 定义这些特性是为了实现 JavaScript 引擎用的，因此在 JavaScript 中不能直接访问它们。为了 表示特性是内部值，该规范把它们放在了两对儿方括号中，例如[[Enumerable]]


1. 数据属性

数据属性包含了一个数据值的位置，在这个位置可以读取可以写入，有四个可以描述其行为的特性:

* <font color=#7ec699 bgcolor=#7ec699 size=4 >[[Configurable]]</font> 表示能否通过 delete 删除属性从而重新定义属性，能否修改属性的特性，或者能否把属性修改为访问器属性, 默认值为true

* <font color=#7ec699 bgcolor=#7ec699 size=4 >[[Enumerable]]</font>  表示是否可以通过for-in循环返回属性，默认值为true

* <font color=#7ec699 bgcolor=#7ec699 size=4 >[[Writable]]</font>  表示是否可以修改属性的值，默认值为true

* <font color=#7ec699 bgcolor=#7ec699 size=4 >[[Value]]</font>  表示这个属性的值 


**如果要修改属性默认的值，必须通过object.defineProperty()**

```js 
var person = {}
// 参数 目标对象，对象属性，属性的描述符对象
object.defineProperty(person, 'name', {
  configurable: false, // 不能删除属性
  enumerable: true,
  writable: false, // 只读属性
  value: 'nate.wang'
})
person.name = 'newNate' 
```


2. 访问器属性

访问器属性不包含数据值，他们包含一对getter和setter函数 

* <font color=#7ec699 bgcolor=#7ec699 size=4 >[[Get]]</font>  表示读取属性调用 默认值 undefined
* <font color=#7ec699 bgcolor=#7ec699 size=4 >[[Set]]</font>  表示设置属性调用 默认值 undefined

```js

let person = {
  _name: '',
  age: 20
}

object.defineProperty(person, 'name', {
  set: function(val) {
    this._name = val;
    this.age = 24
  },
  get: function() {
    return this._name
  }
})
person.name = 'nate.wang'


// 定义多个属性
object.defineProperties(person, {
  _name: {
    value: 'nate'
  },
  age: {
    value: 20
  },
  name: {
    set: function(val) {
      this._name = val;
      this.age = 24
    },
    get: function() {
      return this._name
    }
  }
})
```

#### 读取属性的特性

> 使用 ECMAScript 5 的 Object.getOwnPropertyDescriptor()方法，可以取得给定属性的描述 符。这个方法接收两个参数:属性所在的对象和要读取其描述符的属性名称。返回值是一个对象，如果 是访问器属性，这个对象的属性有 configurable、enumerable、get 和 set;如果是数据属性，这 个对象的属性有 configurable、enumerable、writable 和 value。

```js 
let description = object.getOwnPropertyDesciptor(person, '_name')
// description.value
// description.configurable
// description.enumerable
// description.writable

// description.set
// description.get

```


### 创建对象

object构造函数或字面量形式都可以创建对象，但这些方式有个明显的缺点:使用同一个接口创建很多对象，会产生大量的重复代码。
因此出现了工厂模式和构造函数模式

1. 工厂模式
这里使用工厂模式 用特定的函数来封装创建对象的细节

```js
function createObject(name, age, job) {
  let obj = new Object()
  obj.name = name;
  obj.age = age;
  obj.job = job;

  return obj;
} 

```
**这种方式存在一个问题** 怎么样知道一个对象的类型, 这种方式继承应该如何实现？

2. 构造函数模式

类似于Object、Array这样的原生的构造函数，在运行的时候会自动出现在执行环境中。


```js
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.sayName = function() {
    return this.name
  }
  this.getName = getName
}

// new 操作符创建实例
let p1 = new Person('nate', 23)
let p2 = new Person('john', 25)
```

**new 操作符创建实例的过程**

* 创建一个新对象
* 构造函数的作用域赋给新对象 （this就指向了新对象）
* 执行构造函数中的代码
* 返回新对象 

**构造函数的问题**
使用构造函数的主要问题，每个方法都要在每个实例上重新创建一遍

```js
p1.sayName === p2.sayName //false

// 暂时解决方式
function getName() {
  return this.name
}
```
可以把函数定义转移到构造函数外面，这样可以共享同一个方法，但是如果存在多个方法，就要定义多个全局函数，于是我们这个自定义的引用类型就丝毫没有封装性可言了。因此，这些问题可以使用原型来解决


### 原型模式 

创建的每一个函数都有一个prototype（原型）属性，它是一个指针，指向一个对象（包含了所有的实例共享的属性和方法）；字面意思来讲，prototype就是通过构造函数创建的对象实例的原型对象。

使用原型对象可以让所有对象实例共享他的属性和方法

```js
function Person() {}

Person.prototype.name = 'nate'
Person.prototype.age = 20
Person.prototype.getName = function () {
  return this.name 
}

let person1 = new Person()

person1.name; // nate

```


#### 理解原型对象

创建一个函数，根据特定的规则会给函数创建一个prototype属性，这个属性指向了函数的原型的对象, 如下图：

![function-prototype](https://cdn.img.wenhairu.com/images/2019/11/13/Auaco.png)


可以看到指针指向了一个对象（原型对象），它包含了一个constructor属性，而这个属性指向创建的函数。初次之外，原型对象默认只会取得constructor属性，其他属性都是继承于Object的


接下来，通过构造函数创建一个对象实例，该对象实例也会包含一个指针（__proto__），该指针也指向了构造函数的原型对象。这个__proto__连接存在于实例于构造函数的原型对象之间。如下图：


![object-proto](https://cdn.img.wenhairu.com/images/2019/11/13/AuHI6.png)


**检测原型和实例的方法**

* isPrototypeOf(person1)
* Object.getPrototypeOf(person1)
* hasOwnProperty() 检测属性是否来自于实例中
* in 操作符 检测属性是否存在于原型中

**原型语法**

将以对象字面量的形式创建的对象给到原型，但是这样有个例外，constructor不会再指向Person了
```js
function Person() {}

Person.prototype = {
  constructor: Person,
  name: 'nate',
  age: 20,
  getName: function() {
    return this.name
  }
}

let p1 = new Person()
```
在这里特意加了contructor属性，并指定了其值是Person，但是这样一来，constructor就是原型上的属性了，通过Object.keys(Person.prototype)就可以枚举出来,默认情况下，原生constructor是不可枚举的。但是可以通过object.defineProperty()修改constructor的enumerable值.如下图：

![simple-proto](https://cdn.img.wenhairu.com/images/2019/11/14/A9CCP.png)

**原型的动态性**
先看一个🌰：
```js
function Person() {}

let p3 = new Person()

Person.prototype.sayHay = function() {
  console.log('say hello')
}
p3.sayHay() // say hello 
```
** 即使实例是在原型添加方法之前创建的，仍然可以访问到其添加的方法，可以归结为原型和实例之间的松散关系。实例和原型连接的是一个指针，并非副本，因此实例寻找sayHay方法在自身没有找到之后，在其原型上可以找到。

<font color=#7ec699 bgcolor=#7ec699 size=4 >例外情况</font>: 上述情况是没有重写原型对象的基础上，可以随时添加原型属性。但是一旦重写原型对象，情况就变了。

调用构造函数时会为实例添加一个指向最初原型的[[Prototype]]指针，如果重写原型，就是切断了实例跟最初原型的联系。下面的例子：


```js
function Person() {}

let p1 = new Person()

Person.prototype = {
  constructor: Person,
  name: 'nate',
  age: 20,
  getName: function() {
    return this.name
  }
}

p1.getName() // error
```
这个例子是首先创建了实例，之后再重写原型，其结果琢磨之后，会发现跟前者是不同的, 可以看下来自红皮书中的截图：

![custom-proto](https://cdn.img.wenhairu.com/images/2019/11/14/A9JkD.png)

**原型对象的问题**
原型对象省略了为构造函数初始化参数的过程，导致了所有的实例共享同一属性值，如果这种共享对于函数来讲，可能会有一定的方便性，如果对引用类型的值来讲，可能会存在一定的问题。看个例子：

```js
function Person() {}

Person.prototype = {
  constructor: Person,
  name: 'natewang',
  friends: ['john', 'wang'],
  sayFriend: function() {
    consoloe.log(this.friends)
  }
}

let p1 = new Person()
let p2 = new Person()

p1.friends.push('nate')
console.log(p1.friends) // ['john', 'wang', 'nate']
console.log(p2.friends) // ['john', 'wang', 'nate']
```

### 组合构造函数和原型模式

最常见的方式就是使用组合构造函数和原型模式，构造函数用于定义实例属性，原型模式用于定义方法和共享属性

```js
function Person(name, age) {
  this.name = name;
  this.age = age
  this.friends = ['john', 'wang']
}

Person.prototype = {
  constructor: Person,
  sayName: function() {
    console.log(this.name)
  }
}

let p1 = new Person('john', 20)
let p2 = new Person('nate', 23)

p1.friends.push('nate')

console.log(p1.friends);  // ['john', 'wang', 'nate']
console.log(p2.friends);  // ['john', 'wang']

console.log(p1.friends === p2.friends) // false
console.log(p1.sayName === p2.sayName) // true

```

### 动态原型模式

这种方式把所有的信息都封装到了构造函数中，通过构造函数来初始化原型

```js
function Person(name, age) {
  this.name = name;
  this.age = age;

  if(type of this.sayName !== 'function') {
    Person.prototype.sayName = function() {
      console.log(this.name)
    }
  }
}

let p1 = new Person('nate', 23)
console.log(p1.sayName()) // nate
```

### 寄生构造函数模式
这种模式基本思想是封装创建对象的代码，然后在返回创建的对象;

**注意** 这种模式实例跟构造函数或者构造函数的原型没有任何关系, 不建议使用这种模式

```js
function Person(name, age) {
  let o = new Object()
  o.name = name;
  o.age = age;
  o.sayName = function() {
    console.log(this.name)
  }
  return o
}

let p1 = new Person('name', 25) 
// 存在的问题 不能使用instanceof来判断类型
console.log(p1 instanceof Person) // false 
```

### 稳妥构造函数模式

先看个例子：

```js
function Person(name, age) {
  let o = new Object()

  o.sayName = function() {
    return name
  }
  return o
}
let p1 = Person('nate', 28)
console.log(p1.sayName)
```
可以看到，这种模式没有this，new，没有共享模式，想要访问某一个属性，必须通过某个特定的方法，因此这种方式提供了安全性。


## 继承

::: tip
许多语言都支持两种继承方式，接口继承和实现继承；接口继承只继承方法签名，实现继承则继承实际的方法，函数没有签名，JS只支持实现继承
:::

### 原型链

> 原型链是实现继承的主要方法，基本思想是利用原型让一个引用类型继承另一个引用类型的属性和方法

首先用文字描述的方式来阐述一下原型链：

回顾一下构造函数、实例和原型之间的关系，每个构造函数都有一个原型对象，原型对象包含了一个指向构造函数的指针，而实例包含了一个指向原型对象的内部指针[[Prototype]], 如果让原型对象等于另一个类型（构造函数）的实例，会有什么样的结果呢？结果就是这个原型对象也包含了另一个原型的指针，因此这个原型对象实例化的实例对象也就继承了另一个原型的属性和方法。

**实现原型链的基本模式**

```js
function Parent() {
  this.parent = 0
}

Parent.prototype.getVal = function() {
  return this.parent
}

function Child() {
  this.child = 0
}
// Parent 的实例赋给了Child的原型 
// 重写了Child的原型对象
Child.prototype = new Parent();

// 注意 新增的方法要在 14line 之后
Child.prototype.getVal = function() {
  return this.child
}


let child = new Child();

``` 
可以看下Parent和Child之间的关系：
构造函数Child的原型对象是没有constructor的，它的原型对象被重写了，直接被Parent的实例覆盖了，因此，child.constructor指向了Parent

![simple-extends](https://cdn.img.wenhairu.com/images/2019/11/20/A11QT.png)

这个例子通过原型链简单的实现了继承，下面引用一张红皮书(6.3.1)的原型链的图

![prototype-chain](https://cdn.img.wenhairu.com/images/2019/11/20/A10pq.png)


**确定原型和实例的关系**

1. instanceof 操作符
2. isPrototypeof(instance)

**原型链的问题**
主要的问题来自包含引用类型值的原型

先看个例子：
```js
function Person() {
  this.lists = ['1', '2', '3'];
}

Person.prototype.getList = function() {
  return this.lists
}

function Child() {}

Child.prototype = new Person()

let c1 = new Child()
c1.lists.push('4')
console.log(c1.lists) // ['1', '2', '3', '4']

let c2 = new Child()
console.log(c2.lists) // ['1', '2', '3', '4']
```
这种方式带来的问题就是原型值为引用类型造成的数据共享，为了解决这个问题，借用构造函数（伪造对象或者经典继承也算是一种解决方案


### 借用构造函数
> 这种技术是在子类型构造函数内部调用超类型构造函数，不过需要在特定环境执行函数，需要使用call或者apply来执行超类型构造函数


```js
function Person() {
  this.lists = ['1', '2', '3'];
}

function Child() {
  // 继承了Person 美实例化一个Child instance的时候，都会重新初始化一下Person中的值
  Person.call(this)
}

let c1 = new Child()
c1.lists.push('4'); // ['1', '2', '3', '4']
let c2 = new Child()
console.log(c2); // ['1', '2', '3']
```
这样一来，每个实例的lists都会是一个副本

**传递参数**

```js
function Person(name) {
  this.name = name;
}

function Child(name) {
  Person.call(this, name)
}

let c1 = new Child('nate')
c.name // nate
```

**借用构造函数的问题**
使用构造函数，也就是无法避免构造函数模式存在的问题--方法在构造函数中定义，因此就无法复用。还有就是在超类型原型中定义的方法，在子类型的实例中也是无法调用的（因为没有原型继承）


### 组合继承

组合继承伪经典模式，就是将借用构造函数和经典模式组合到一起。背后的原理是使用原型继承实现原型属性和方法的继承，而通过借用构造函数来实现实例属性的继承

```js
function Person(name) {
  this.name = name
}

Person.prototype.getName = function() {
  return this.name
}

function Child(name){
  // 继承了实例的属性
  Person.call(this, name)
}

// 继承了原型的属性和方法
Child.prototype = new Person();
Child.prototype.constructor = Child;
```

这种模式融合了原型链和借用构造函数的优点，成为常用的继承模式。

### 原型式继承
