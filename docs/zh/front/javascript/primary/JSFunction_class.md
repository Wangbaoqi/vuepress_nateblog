---
type: front-JavaScript
tag: JavaScript
lang: zh
excerpt: 'JavaScript Function and Class'
---
# ECMAScript Specification 系列 - Function and Class

::: tip
function相当于一个'子程序'，由外部代码或者自身来调用。在JavaScript中，function是一流的对象，可以像对象那样具有属性和方法。
:::

## Function 函数

在JavaScript中，每个function都是一个`Function object`，都会继承其属性和方法。

```js
(function(){}).constructor === Function // true
```

调用`Function`构造函数，可以创建function函数，尽管这种创建跟`eval`类似，但是通过这种方式创建的是可以在全局范围里调用的。

*实例属性*

1. Function.arguments 
  与传递函数的参数对应的数组，可以在函数中调用`arguments`使用，不推荐将其作为参数传递。
2. Function.length
  指定函数期望的参数数目
3. Function.name
  函数的名称
  
*实例方法*
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
var foo = function () {}
// 命名函数表达式
var foos = function bar() {}
// arrow function
var fooa = () => {}
```

3. IIFE（立即执行函数表达式）

当函数只需要执行一次时，就可以使用IIFE了，也可以用来解决作用域问题。

```js
(function foo(){
  // statement
})()
```
除此之外，定义函数可以在运行时中字符串中定义，类似于`eval`

### Generator 函数

`function *` 定义了一个generator函数，返回一个`Generator`对象，`Generator`对象由`Generator`构造函数返回，符合*迭代协议*和*迭代器协议*，它是一个可以退出又重新进入的函数

*迭代协议（iterable protocol）*允许JS定制自身的迭代行为，可以通过`for of`来遍历，JS也有一些内置的具有迭代器的类型，比如`Array`和`Map`，要实现迭代，必须实现`@@iterator`方法，也就意外着该对象或者其原型上有`@iteraor`属性。
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
let str = 'hello';
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
function *generator () {
  let index = 0;
  while(true) {
    yield index ++
  }
}
let gen = generator()
gen.next(); // { value: 0, done: false }
gen.next(); // { value: 1, done: false }
gen.next(); // { value: 2, done: false }
// ...

// yield* 委托
function *anGenerator(i) {
  yield i + 1;
  yield i + 2;
  yield i + 3;
}

function *generators(i) {
  yield i;
  yield* anGenerator(i);
  yield i + 10;
}
let gen1 = generators(1)
gen1.next(); // { value: 1, done: false }
// excute anGenerator function 
gen1.next(); // { value: 2, done: false }
gen1.next(); // { value: 3, done: false }
gen1.next(); // { value: 4, done: false }
// go on excute genarators 
gen1.next(); // { value: 11, done: false }
gen1.next(); // { value: undefined, done: true }

// 传参数到generator function
function *generatorParam() {
  console.log(0)
  console.log(1, yield)
  console.log(2, yield)
  console.log(3, yield)
}
let parGen = generatorParam()
parGen.next();
parGen.next('nate'); // 1, nate { value: 'undefined', done: false }
parGen.next('nate wang'); // 2, nate wang { value: 'undefined', done: false }
parGen.next('nate wangbao'); // 3 nate wangbao { value: 'undefined', done: false }

// 函数体中使用return 语句
function *reGenetator() {
  yield 'baoqi';
  return 'nate';
  yield 'wang';
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
  return 1
}
foo(); // Promise{<resolved>: 2}

// 等同于
function bar() {
  return Promise.resolve(1)
}
bar(); //Promise{<resolved>: 2}
```

每个`await`表达式后面的代码可以认为存在于`.then`回调中，也就是说`await`表达式返回的是一个`promise`.

```js
async function foo() {
  const resNor = await 1;
  const resAwa = await new Promise((resolve, reject) => setTimeout(() => resolve('setTime')));
  console.log(resNor)
  console.log(resAwa)
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

*async function 执行顺序*


