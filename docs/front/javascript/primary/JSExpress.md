---
type: front-JavaScript
tag: JavaScript
subTag: JavaScript Specification
lang: zh
sort: 2
excerpt: 'JavaScript Expressions and Statement'
---
# ECMAScript Specification 系列 - 表达式和语句


::: tip
一个表达式是对一个变量或值的引用，或者是一组值和变量与运算符的组合。
::: 


## Expression

[Expression - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators)的定义是**Any unit of code that can be evaluated to a value is an expression.**

表达式可以参考[ECMAScript的规范](https://tc39.es/ecma262/#sec-ecmascript-language-expressions)

### MemberExpression

**MemberExpression**: 成员访问表达式, 返回的是Reference Type对象

主要有以下种几种方式:

| Type                          | description                                |   example                            
| ------------------------------|:-------------------------------------------|:----------------------------------------------------------:  
| PrimaryExpression            | 主要的表达式                                 |  上述列表         
| MemberExp [Expression]       | [] 访问符                                   |  a['b']
| MemberExp . Identifier       | . 访问符                                    |  a.b
| MemberExp TemplateLiteral    | 模板字符串                                   |  foo\`string\`        
| SuperPropery                 | 访问和调用父对象上的函数                       | super.functionOnParent([arguments]) or super([arguments])
| MetaProperty                 | 访问new目标的对象 判断对象是否是通过new实现的    | new.target    
| New MemberExp                | new 关键字                                  | new Foo()


### CallExpression

**CallExpression**: 函数调用表达式

主要有以下种几种方式:

| Type                          | description                                |   example                            
| ------------------------------|:-------------------------------------------|:----------------------------------------------------------:  
| CallExp Arguments            | 函数调用                                     |  foo()         
| SuperCall                    | 函数super调用                                |  super()         
| CallExp [ Expression ]       | 函数调用+成员访问[]                           |  foo()['b']
| CallExp . Identifier         | 函数调用+成员访问.                            |  foo().b
| CallExp TemplateLiteral      | 函数调用+模板字符串                           |  foo()\`string\`        




### UpdateExpression 

**UpdateExpression**: 更新表达式, 

主要有以下种几种方式:

| Type                          | description          |   example                            
| -----------------------------------------------------|:-----------------------------|:--------------------------------------:  
| LeftHandSideExpression [no LineTerminal here] ++     | 自增，后自增                   |  a++       
| LeftHandSideExpression [no LineTerminal here] --     | 自减，后自减                   |  a--         
| ++ UnrayExpression                                   | 自增，先自增                   |  ++a         
| -- UnrayExpression                                   | 自减，先自减                   |  --a         


### UnrayExpression 

**UnrayExpression**: 单目表达式, 

主要有以下种几种方式:

| Type                                                 | description          |   example                            
| -----------------------------------------------------|:-----------------------------|:--------------------------------------:  
| **delete** UnrayExpression                           | 删除属性                      |   delete a.b
| **void** UnrayExpression                             | 返回undefined                 |  void foo()  
| **typeof** UnrayExpression                           | 判断类型                      |  typeof a      
| **+** UnrayExpression                                | 加法运算                       | + a
| **-** UnrayExpression                                | 减法运算                       | - a
| **~** UnrayExpression                                |                              | 
| **!** UnrayExpression                                | 取反                          | !a
| **AwaitExpression**                                  |                              | 


### ExponentiationExpression 

**ExponentiationExpression**: 指数表达式, 

主要有以下方式:

| Type                                                 | description          |   example                            
| -----------------------------------------------------|:-----------------------------|:--------------------------------------:  
| UpdateExpression ** ExponentiationExpression         | 指数运算                      |   2**2
 


### MultiplicativeExpression 

**MultiplicativeExpression**: 乘法复合表达式, 

主要有以下方式:

| Type                              | description          |   example                            
| ----------------------------------|:---------------------|:--------------------------------------:  
| MultiplicativeExpression *        | 乘法运算              |   2*2
| MultiplicativeExpression /        | 除法运算              |   2/2
| MultiplicativeExpression %        | 除余运算              |   2%2
 



### AdditiveExpression
**AdditiveExpression**: 加减表达式

主要有以下方式:

| Type                        | description          |   example                            
| ----------------------------|:---------------------|:--------------------------------------:  
| AdditiveExpression+         | 加法运算              |   2+2
| AdditiveExpression-         | 减法运算              |   2-2
 


### ShiftExpression
**ShiftExpression**: 位运算表达式

主要有以下方式:

| Type                        | description          |   example                            
| ----------------------------|:---------------------|:--------------------------------------:  
| ShiftExpression             | 左移运算              |   x << 
| ShiftExpression             | 右移运算              |   x >>
| ShiftExpression             | 无符号右移运算         |   x >>>
 


### RelationExpression
**RelationExpression**: 关系表达式

主要有以下方式:

| Type                        | description          |   example                            
| ----------------------------|:---------------------|:--------------------------------------:  
| RelationExpression **<**    | 小于运算              |   x < y
| RelationExpression **>**    | 大于运算              |   x > y
| RelationExpression **<=**   | 小于==运算            |   x <= y
| RelationExpression **>=**   | 大于==运算            |   x >= y
| RelationExpression **in**   | 包含运算              |   x in y
| RelationExpression **instanceof**    | 类型运算     |   x instanceof y
 

### EqualityExpression 

**RelationExpression**: 关系表达式

主要有以下方式:

| Type                        | description          |   example                            
| ----------------------------|:---------------------|:--------------------------------------:  
| EqualityExpression **==**    | 相等运算              |   x == y
| EqualityExpression **!=**    | 不等运算              |   x != y
| EqualityExpression **===**   | 严格==运算            |   x === y
| EqualityExpression **!==**   | 严格!==运算           |   x !== y
 

### BiteWisexpression 
  * &
  * ^
  * |
### LogicalExpression
  * && 
  * ||
### ConditionalExpression
  * **? :**

### LeftHandSideExpression

Member、New、Call 是属于LeftHideSide, 相当于是 = 的左边，左边要求是Reference的类型

### RightHandSideExpression




## Type Convertion

> ECMAScript语言根据需要隐式执行自动类型转换。 为了阐明某些构造的语义，定义一组转换抽象操作很有用。 转换抽象操作是多态的。 他们可以接受任何ECMAScript语言类型的值。 但是，这些操作没有使用其他规范类型。
BigInt类型在ECMAScript语言中没有隐式转换。 程序员必须显式调用BigInt才能转换其他类型的值。

### 转原始类型

引用类型转原始类型会调用内置的函数[[ToPrimitive]],会经历一下过程：

* 已经是原始类型的话，不需要转
* 转换成字符串的话，调用toString,不是字符串就会调用valueOf，不是的话继续调用toString
* 没有原始类型的值，就会抛错


```js
// ger value type 
function Type(key) {
  if(key === null) return 'null';
  return typeof key 
}

// ToObject from other type value
function ToObject(value){
  let type = Type(value)
  if(type === 'undefined' || type === 'null') throw('TypeError exception');
  if(type === 'boolean') return new Boolean(value);
  if(type === 'number') return new Number(value);
  if(type === 'string') return new String(value);
  if(type === 'symbol') return Symbol(value);
  if(type === 'bigint') return BigInt(value);
  if(type === 'object') return value;
}

function IsPropertyKey(propertyKey){
  let res = Type(propertyKey)
  if(res === 'string' || res === 'symbol') return true
  return false
}

function Get(obj, p) { 
  // return obj[p]
  if(Type(obj) === 'object' && IsPropertyKey(p)) return obj.[[Get]](p, obj);
}

function GetV(v, p) {
  let obj;
  if(IsPropertyKey(p)) {
    obj = ToObject(v)
    return obj.[[Get]](p,v)
  }
}

// 
function IsCallable(arg) {
  if(Type(arg) !== 'object') return false;
  // Faker code 判断arg中是否有 [[Call]]
  if(arg.[[Call]]) return true;
  return false;
}

function Call(f, value, args){
  if(!args) args = [];
  if(!IsCallable(f)) throw('TypeError eception')
  // Faker code 
  retun f.[[Call]](value, args)
}


/**
 * get value of a specific property of [null undefined boolean string number string object symbol]
 **/
function GetMethod(value, propertyKey) {
  let func;
  if(IsPropertyKey(propertyKey)) {
    func = GetV(value, propertyKey)
    if(func === undefined || func === null) return undefined;
    if(!IsCallable(func)) throw('TypeError exception');
    return func
  }
}


function OrdinaryToPrimitive(input, hint) {
  let methods = []
  if(Type(input) === 'object' && Type(hint) === 'string') {
    if(hint === 'string') {
      methods = ['toString', 'valueOf']
    }else {
      methods = ['valueOf', 'toString']
    }
    for(let i in methods) {
      let method = Get(input, methods[i]);
      if(IsCallable(method)) {
        let res = Call(method, input);
        if(Type(res) !== 'object') return res;
      }
    }
  }
  throw('TypeError execption')
}


function ToPrimitive(input, preferredType) {
  // 
  if(Type(input) === 'object') {
    let hint = '';
    if(!preferredType){
      hint = 'default'
    }else if(typeof preferredType === 'string'){
      hint = 'string'
    }else {
      if(typeof preferredType === 'number'){
        hint = 'number'
      }
    }
    let exoticToPrim = GetMethod(input, @@toPrimitive);
    if(exoticToPrim) {
      let result = Call(exoticToPrim, input, [hint]);
      if(!Type(result) === 'object') return result;
      throw('TypeError eception')
    }
    if(hint === 'default') hint = 'number';
    return OrdinaryToPrimitive(input, hint)
  }
  return input;
}
```



**类型转换表格**

|                          | Number      | String        |  Undefined  |  Null      |  Boolean  |  Symbol   |  Object
| -------------            |:----------: |:--------------|:------------|:-----------|:----------|:----------|:--------
| Number                   | -           |               | x           | x          | 0 false   |  x        | Boxing
| String                   |             |  -            | x           | x          | "" false  |  x        | Boxing
| Undefined                | 0           | 'undefined'   | -           | x          | false     |  x        | x
| Null                     | boolean     | 'null'        | x           | -          | false     |  x        | x
| Boolean                  | +0 1        | 'true' 'false'| x           | x          | -         |  x        | Boxing
| Symbol                   | x           | x             | x           | x          | x         |  -        | Boxing
| Object                   | valueOf     | toString      | x           | x          | true      |  x        | -

   
接下来就是`Number`和`String`之间的相互转化了

1. 首先看 StringToNumber

```js
function convertStringToNumber(string, hex = 10) {

  const number_reg = /(\.\d+|(0|[0-9])\d*\.?\d*)([eE][-\+]?\d+)|(0[bB]?[01]+)|(0[oO]?[0-7]+)|(0[xX]?[0-9a-fA-F]+)/

  if(typeof string !== 'string') {
    throw 'param must is string type'
  }

  if(!number_reg.test(string)) {
    throw 'number is illegal'
  }
  // 整数
  let isInterger = /(\.\d+|(0|[0-9])\d*\.?\d*)([eE][-\+]?\d+)/.test(string);
  // 二进制
  let isBinary = /0[bB]?[01]+/.test(string);
  // 八进制
  let isOctal = /0[oO]?[0-7]+/.test(string);
  // 十六进制
  let isHex = /0[xX]?[0-9a-fA-F]+/.test(string);


  if(isInterger) hex = 10;
  if(isBinary) hex = 2;
  if(isOctal) hex = 8;
  if(isHex) hex = 16;

  if(isBinary || isOctal || isHex) {
    // 去掉 0b || 0o || ox
    string = string.slice(2);
  }

  let i = 0;
  let number = 0;

  if(!isHex) {
    // expoent
    let isExponent = /[eE][-\+]?/.test(string);
    if(!isExponent) { 
      let char = string.split('');


      while (i < char.length && char[i] != '.') {
        number *= hex;
        number += char[i].codePointAt(0) - '0'.codePointAt(0);
        i++
      }

      if (char[i] == '.') {
        i++
      }
      let fraction = 1;
      while (i < char.length) {
        fraction /=  hex;
        number += (char[i].codePointAt(0) - '0'.codePointAt(0)) * fraction;
        i++;
      }
      return number;
    }else {
      // TODO 
      
    }
    
  }else {
    // convert 2F like this
    let char = string.toUpperCase().split(''); 
    let hexEunm = ['A', 'B', 'C', 'D', 'E', 'F'];

    while(i < char.length) {
      number *= hex;
      if(hexEunm.includes(char[i])) {
        number += char[i].codePointAt(0) - '0'.codePointAt(0) - 7;
      }else {
        number += char[i].codePointAt(0) - '0'.codePointAt(0);
      }
      i++;
    }
    return number;
  }
}

```



