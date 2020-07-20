---
type: front-JavaScript
tag: JavaScript
lang: zh
excerpt: "JavaScript Function and Class"
---

# ECMAScript Specification 系列 - Function and Class

::: tip
function 相当于一个'子程序'，由外部代码或者自身来调用。在 JavaScript 中，function 是一流的对象，可以像对象那样具有属性和方法。
:::

## Function 函数

在 JavaScript 中，每个 function 都是一个`Function object`，都会继承其属性和方法。

```js
(function() {}.constructor === Function); // true
```

调用`Function`构造函数，可以创建 function 函数，尽管这种创建跟`eval`类似，但是通过这种方式创建的是可以在全局范围里调用的。

_实例属性_

1. Function.arguments
   与传递函数的参数对应的数组，可以在函数中调用`arguments`使用，不推荐将其作为参数传递。
2. Function.length
   指定函数期望的参数数目
3. Function.name
   函数的名称

_实例方法_

1. Function.prototype.apply(thisArg, argArray)
2. Function.prototype.call(thisArg, ...arg)
3. Function.prototype.bind(thisArg, ...arg)
4. Function.prototype.toString()

`function`可以接受传入参数，也可以返回值。如果在函数体内更改非引用类型的值时，外部对应的值时不会改变的，如果是引用类型的值，则是改变的、

### 定义函数

函数的定义通常有以下几种方式

1. 函数声明

函数声明也是常用的一种定义函数的方法

```js
function foo(params) {
  // statement
}
```

2. 函数表达式

函数表达式类似于函数声明，函数表达式可以为函数定义名称，也可以是匿名的。使用函数表达式不能在其之前使用它，因为它不会被挂起在作用域的开头。
创建命名函数表达式的好处是在追踪报错时，可以在堆栈信息中查到函数名称。

```js
var foo = function() {};
// 命名函数表达式
var foos = function bar() {};
// arrow function
var fooa = () => {};
```

3. IIFE（立即执行函数表达式）

当函数只需要执行一次时，就可以使用 IIFE 了，也可以用来解决作用域问题。

```js
(function foo() {
  // statement
})();
```

除此之外，定义函数可以在运行时中字符串中定义，类似于`eval`

### Generator 函数

`function *` 定义了一个 generator 函数，返回一个`Generator`对象，`Generator`对象由`Generator`构造函数返回，符合*迭代协议*和*迭代器协议*，它是一个可以退出又重新进入的函数

*迭代协议（iterable protocol）*允许 JS 定制自身的迭代行为，可以通过`for of`来遍历，JS 也有一些内置的具有迭代器的类型，比如`Array`和`Map`，要实现迭代，必须实现`@@iterator`方法，也就意外着该对象或者其原型上有`@iteraor`属性。
该属性可以通过`[Symbol.iterator]`来获取.

```js
// 获取迭代器
let arr = [];
// 返回符合迭代器的对象的 0 参数函数
arr[Symbol.iterator]; // function() { Native Code }
arr[Symbol.iterator](); // Array Iterator {}
// Array Iterator {
  // next: {
    // done: false,
    // value: 2
  }
}
```

每当迭代一个对象时，就会调用`@@iterator`方法，不带任何参数，使用返回的迭代器获取迭代的值。

*迭代器协议（iterator protocol）*定义了产生一系列值，当所有值产生时，可能会产生一个返回值。当一个对象实现了具有`next`方法时，它就是一个迭代器。

```js
let str = "hello";
// generator 对象
let iterator = str[Symbol.iterator](); // String Iterator {}
typeof str[Symbol.iterator]; // function
iterator.next(); // { done: false, value: 'h'}
iterator.next(); // { done: false, value: 'e'}
iterator.next(); // { done: false, value: 'l'}
iterator.next(); // { done: false, value: 'l'}
iterator.next(); // { done: false, value: '0'}
iterator.next(); // { done: true, value: undefined }
```

调用`Generator`函数不会立即执行，而是会返回该函数的迭代器对象，当调用迭代器对象的`next()`方法，会执行生成器函数的函数体，直到`yield`表达式，该表达式指定从迭代器返回的值，或者`yield*`将值委托给另一个生成器函数。

```js
// 简单的生成器函数
function* generator() {
  let index = 0;
  while (true) {
    yield index++;
  }
}
let gen = generator();
gen.next(); // { value: 0, done: false }
gen.next(); // { value: 1, done: false }
gen.next(); // { value: 2, done: false }
// ...

// yield* 委托
function* anGenerator(i) {
  yield i + 1;
  yield i + 2;
  yield i + 3;
}

function* generators(i) {
  yield i;
  yield* anGenerator(i);
  yield i + 10;
}
let gen1 = generators(1);
gen1.next(); // { value: 1, done: false }
// excute anGenerator function
gen1.next(); // { value: 2, done: false }
gen1.next(); // { value: 3, done: false }
gen1.next(); // { value: 4, done: false }
// go on excute genarators
gen1.next(); // { value: 11, done: false }
gen1.next(); // { value: undefined, done: true }

// 传参数到generator function
function* generatorParam() {
  console.log(0);
  console.log(1, yield);
  console.log(2, yield);
  console.log(3, yield);
}
let parGen = generatorParam();
parGen.next();
parGen.next("nate"); // 1, nate { value: 'undefined', done: false }
parGen.next("nate wang"); // 2, nate wang { value: 'undefined', done: false }
parGen.next("nate wangbao"); // 3 nate wangbao { value: 'undefined', done: false }

// 函数体中使用return 语句
function* reGenetator() {
  yield "baoqi";
  return "nate";
  yield "wang";
}
let reGen = reGenetator();
reGen.next(); // { value: 'baoqi', done: false}
reGen.next(); // { value: 'nate', done: true}
reGen.next(); // { value: 'undefiend', done: true}
```

### Async 函数

async 函数是由构造函数`AsyncFunction`的实例，函数体内可以使用关键字`await`，返回一个`promise`，如果返回值不是显示的`promise`，则会返回一个隐式的`promise`。当函数体中有多个
`await`表达式时，整个进度会被暂时挂起，同步的执行`await`表达式，等待异步的执行结果，异步执行结束之后，进度会被恢复。

可以在异步函数周围使用`try catch`块，捕捉异常。

```js
// async Function
async function foo() {
  return 1;
}
foo(); // Promise{<resolved>: 2}

// 等同于
function bar() {
  return Promise.resolve(1);
}
bar(); //Promise{<resolved>: 2}
```

每个`await`表达式后面的代码可以认为存在于`.then`回调中，也就是说`await`表达式返回的是一个`promise`.

```js
async function foo() {
  const resNor = await 1;
  const resAwa = await new Promise((resolve, reject) =>
    setTimeout(() => resolve("setTime"))
  );
  console.log(resNor);
  console.log(resAwa);
}
foo(); // 1, 'setTime'
```

在执行`foo`异步函数时，会返回*Promise*，因此在遇到异常时，可以使用`catch`来捕捉错误。

```js
async function bar() {
  const p1 = new Promise((resolve, reject) => setTimeout(() => resolve('setTime1')));
  // 发生异常
  const p2 = new Promise((resolve, reject) => setTimeout(() => reject('setTime2')));
  const res = [await p1, await p2]
}
// 捕捉异常
bar().catch(res => console.log(res))；
```

**async function 执行顺序**

_await 和 parallelism(等待和并行)_

遇到`await`表达式，就意外着这个线程的控制会暂停，等待`await`后面的表达式执行，待执行完成，线程才会继续执行。

```js
// setTimeout slow
function resolveAfter2Seconds() {
  console.log("starting slow promise");
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("slow");
      console.log("slow promise is done");
    }, 2000);
  });
}
// setTimeout slow
function resolveAfter1Second() {
  console.log("starting fast promise");
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("fast");
      console.log("fast promise is done");
    }, 1000);
  });
}

async function sequentialStart() {
  console.log("==SEQUENTIAL START==");
  // 1. Execution gets here almost instantly
  const slow = await resolveAfter2Seconds();
  console.log(slow); // 2. this runs 2 seconds after 1.

  const fast = await resolveAfter1Second();
  console.log(fast); // 3. this runs 3 seconds after 1.
}

async function concurrentStart() {
  console.log("==CONCURRENT START with await==");
  const slow = resolveAfter2Seconds(); // starts timer immediately
  const fast = resolveAfter1Second(); // starts timer immediately

  // console.log(await slow) // 2. this runs 2 seconds after 1.
  // console.log(await fast) // 3. this runs 2 seconds after 1., immediately after 2., since fast is already resolved

  // once has more task need to parallelism, best way to use Promise.all
  const promise = Promise.all([slow, fast]);
  promise
    .then((res) => {
      console.log(res, "res");
    })
    .catch((err) => {
      console.log(err, "error");
    });
}
sequentialStart(); // function await
concurrentStart(); // function parallelism
```

上述*resolveAfter2Seconds*和*resolveAfter1Second*是返回 Promise 的具有定时器功能的方法。

`sequentialStart`异步方法则是采用`await`的方式依次的执行上述两个方法。

`concurrentStart`异步方法则是采用`Primise.all`并行执行的的方式执行上述两个方法。

**return await foo 和 return foo 的区别**

如果一个`async`函数没有显示的返回`return`，则会隐式的返回`Promise.resolved`，如果返回的结果有`value`，则会将这个`value`包装到 Promise 中，状态是`resolved`。

`return await foo`则会等待解析 foo，如果 foo 是**Promise**，有可能会**reject**，所以`await`后面会`throwError`，而`return foo`不会报错，而且是立即返回结果。所以在处理`return await foo`的时候，可以采用`try catch`的方式来捕捉错误。

```js
// return await and return
async function getProcess() {
  try {
    return await resolveAfter2Seconds();
  } catch (error) {
    return null;
  }
}
let pro = getProcess(); // Promise { [[PromiseStatus]]: "resolved", [[PromiseValue]]: "slow"}
```

## Class 类

**Class** 的出现会让 JS 的面向对象编程更像传统语言，是一种语法糖，让面向对象的实现更加清晰一点。

### constructor

**constructor**构造函数是类默认的方法，可以通过`new`命令生成实例时，自动调用此方法，如果没有显示定义该方法，空的**constructor**会被默认添加。

```js
class Foo {
  constructor() {}
}
let foo = new Foo();
Foo.prototype === foo.__proto__; //true
```

### 类的实例

类的实例通过调用`new`关键字产生的，实例上的属性除非是**显式**在构造函数中定义的，否则实例是获取不到的。只能从实例的原型中获取。

```js
class Foo {
  _bar = "bar"; // 实例属性新写法
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  toString() {
    return `x-${this.x},y-${this.y}`;
  }
  getValue() {
    return this.x;
  }
}
let foo = new Foo(3, 4);
foo.getValue(); // 3 调用原型中的方法
foo; // {x: 3, y: 4}
foo.__proto__; // { construtor: class Foo, toString: f, getValue: f}
foo.hasOwnProperty("x");
foo.hasOwnProperty("toString");
foo.hasOwnProperty("getValue");
```

### this 的指向

一般来讲，this 的指向是实例，但是有时结果就不一样了。

```js
class Foo {
  constructor() {
    // bind 方式绑定
    this.getBar = this.getBar.bind(this);
  }
  getBar() {
    return this.getRes();
  }

  getRes() {
    return "result";
  }
}
let foo = new Foo();
foo.getBar(); // 'result' 显式调用，this就是 当前实例 foo

const { getBar } = new Foo();
getBar(); // TypeError Cannot read property 'getRes' of undefined
```

后者显然是找不到当前的 this 了，因此可以在声明的时候，可以给对应的方法绑定**this**。React 中是不是也是这种方式呢？

```js
class Foo {
  constructor() {
    // bind 方式绑定
    this.getBar = this.getBar.bind(this);
  }
  getBar() {
    return this.getRes();
  }

  getRes() {
    return "result";
  }
}

// Arrow 函数 绑定this
class Foo {
  // class Field
  getBar = () => {
    return this.getRes();
  };
  getRes() {
    return "result";
  }
}

const { getBar } = new Foo();
getBar(); // result
```

### 静态方法

类的定义中，定义的方法都会被实例继承，而如果在方法前面加上`static`，则这个方法只有类本身可以访问。
静态方法中的**this**指向是当前类。静态方法可以通过**extends**来继承，静态方法也可以从**super**上调用的。

```js
class Foo {
  static bar() {
    return this.baz();
  }
  baz() {
    return "baz";
  }
  static baz() {
    return "static baz";
  }
}

class Bar extends Foo {
  constructor(props) {
    super(props);
    this.barProps = props;
  }
  static getBar() {
    return super.bar();
  }
}
Foo.bar(); //
let foo = new Foo();
let bar = new Bar();
```

### 静态属性

类的定义中，有了静态方法，那静态属性是怎么定义的，在**ES6**中明确确定，是没有静态属性的，不过在*提案*中，有了一种新方式，也是用`static`

```js
class Foo {
  fooName = "foo";
  // 新 静态属性
  static fooAge = 30;

  constructor() {
    this.bav = "bav";
  }
  bac() {}
  static bar() {
    return "bar";
  }
}

// 旧 静态属性
Foo.fooAge; // foo
```
