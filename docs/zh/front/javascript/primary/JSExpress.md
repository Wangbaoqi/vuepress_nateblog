---
type: front-JavaScript
tag: JavaScript
lang: zh
excerpt: 'JavaScript Expressions and Statement'
---
# JS 表达式和语句


::: tip
一个表达式是对一个变量或值的引用，或者是一组值和变量与运算符的组合。
::: 

[[toc]]

## Expression

[Expression - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators)的定义是**Any unit of code that can be evaluated to a value is an expression.**

表达式主要有以下几种形式从ECMAScript的规范中:

* PrimaryExpression 主要的表达式
  * this
  * IdentifierReference
  * Literal 
  * ArrayLiteral 
  * ObjectLiteral
  * TemplateLiteral
  * FunctionExpression
  * ClassExpression
  * GeneratorExpression
  * AsyncFunctionExpression
  * AsyncGeneratorExpression
  * CoverParenthesizedExpressionAndArrowParameterList 
* ParenthesizedExpression 括号表达式
* Literal 
  * NullLiteral
  * BooleanLiteral
  * StringLiteral
  * NumericLiteral

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

**MultiplicativeExpression**: 乘法复合表达式, MultiplicativeExpression  MultiplicativeOperator (* / %)


### AdditiveExpression
**AdditiveExpression**:
  * AdditiveExpression **+** MultiplicativeExpression
  * AdditiveExpression **-** MultiplicativeExpression


### ShiftExpression
**ShiftExpression**:
  * ShiftExpression **<<** AdditiveExpression
  * ShiftExpression **<<** AdditiveExpression
  * ShiftExpression **>>>** AdditiveExpression

### RelationExpression
**RelationExpression**:
  * RelationExpression **<** RelationExpression
  * RelationExpression **>** RelationExpression
  * RelationExpression **<=** RelationExpression
  * RelationExpression **>=** RelationExpression
  * RelationExpression **instanceof** RelationExpression
  * RelationExpression **in** RelationExpression

### EqualityExpression 
  * EqualityExpression **==** RelationExpression
  * EqualityExpression **!=** RelationExpression
  * EqualityExpression **===** RelationExpression
  * EqualityExpression **!==** RelationExpression

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

