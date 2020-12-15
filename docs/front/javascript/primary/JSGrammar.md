---
type: front-JavaScript
tag: JavaScript
subTag: JavaScript Specification
lang: zh
sort: 1
excerpt: 'JavaScript Grammar'
---
# ECMAScript Specification 系列 - 词汇语法

::: tip
JS 词汇语法在ECMAScript 规范中的定义: ECMAScript的模块或者脚本的源文本首先会被转换成一系列的`输入元素`，比如`tokens`、`line terminators`、`white space`和 `comment`，从左到右扫描源文本，反复的将最长的代码点序列作为下一个输入元素。
:::


根据JavaScript知识体系脑图中的`Lexical Grammar`分支

![lexical grammar](https://raw.githubusercontent.com/Wangbaoqi/blogImgs/master/nateImgs/JavaScript/grammar/grammar_1.png)


根据上图，输入元素基本有一下几种：
* whiteSpace
* lineTerminator 
* comment
* token

首先看下 ECMAScript中的源字符 SourceCharacter。

## SourceCharacter 

**SourceCharacter**在规范中的定义是 **any Unicode code point**（任何Unicode码点）。这里重新科普一下计算机中的字符编码（Character Encoding）。

>ECMAScript code is expressed using Unicode. ECMAScript source text is a sequence of code points. All Unicode code point values from U+0000 to U+10FFFF
在ECMAScript代码是使用Unicode来表示的，ECMAScript源文本是一系列的码点，所有的码点的值的范围是
U+0000 - U+10FFFF （16进制表示） 

**[Character Encoding](https://zh.wikipedia.org/zh/%E5%AD%97%E7%AC%A6%E7%BC%96%E7%A0%81)**: 字集碼是把字符集中的字符编码为指定集合中某一对象（例如：比特模式、自然数序列、8位元组或者电脉冲），以便文本在计算机中存储和通过通信网络的传递。常见的例子包括将拉丁字母表编码成摩斯电码和ASCII。其中，**ASCII将字母、数字和其它符号编号，并用7位元的二进制來表示这个整数**。通常会额外使用一个扩充的位元，以便于以1个字节的方式存储。

**[ASCII](https://zh.wikipedia.org/wiki/ASCII)**: 是基于拉丁字母的一套电脑编码系统。它主要用于显示现代英语，而其扩展版本延伸美国标准信息交换码则可以部分支持其他西欧语言，并等同于国际标准ISO/IEC 646。
ASCII码的表达方式：使用指定的7位或者8位二进制组合来表示128或者256中可能的字符（字符一般是字母、数字、符号的统称）。

在计算机中，所有信息都是一个```二进制值```, ```二进制位```组成了```二进制值```, 每个二进制位有两种状态，```0```和```1```, 而在ASCII码的表达方式中，由7位或者8位```二进制位```组合成字符，而字符的种类就有了2^7（128）或者2^8（256）种。而这个7位或者8位的二进制的组合被称之为```字节```, 因此一个字节有128种或者256种表示方式，比如：00000000 字节就表示空字符。而字符表示的范围是 00000000 - 11111111。

标准的ACSII码也是基础ACSII码（是由7位二进制组成，剩下的一位用0来补位），表示所有的的大写、小写字母、数字0-9、标点符号以及美式英语中的特殊字符。

**0-31**以及127（33个）是控制字符或通信专用字符（其余为可显示字符），如控制符：LF（换行）、CR（回车）、FF（换页）、DEL（删除）、BS（退格)、BEL（响铃）等；通信专用字符：SOH（文头）、EOT（文尾）、ACK（确认）等；ASCII值为8、9、10 和13 分别转换为退格、制表、换行和回车字符。它们并没有特定的图形显示，但会依不同的应用程序，而对文本显示有不同的影响

**32-126**(95个) 是字符，32是空格，**48-57**是十个阿拉伯数字，**65-90**为26个大写英文字母，**97-122**是26个小写英文字母。

**Basic ACSII Table**
![basic ascii](https://raw.githubusercontent.com/Wangbaoqi/blogImgs/master/nateImgs/JavaScript/grammar/grammar_2.gif)

**Extended ACSII Table**
![extended table](https://raw.githubusercontent.com/Wangbaoqi/blogImgs/master/nateImgs/JavaScript/grammar/grammar_3.gif)

ASCII的局限就是只能显示基本的26个英文字符、阿拉伯数字以及英式标点符号，为了解决这个问题，现在基本都使用Unicode编码。

**中文的编码方式**：是GB2312，使用两个字节代表一个汉字，那么最多就有 256*256 种字符。

**[Unicode](https://zh.wikipedia.org/wiki/Unicode)**: 是计算机科学领域里的一项业界标准。它对世界上大部分的文字系统进行了整理、编码，使得电脑可以用更为简单的方式来呈现和处理文字。
```Unicode```的实现方式称为 Unicode转换格式（Unicode Transformation Format，简称为 UTF），实现方式总共有UTF-8，UTF-16，UTF-32。

**常用的UTF-8**
UTF-8 最大的特点，它是一种变长的编码方式，可以使用1-4个字节来表示字符，根据不同的字符来减少字节长度。
UTF-8 的编码规则：
* 单字节的字符，首位设置为0，后面7位表示这个字符的Unicode吗。因此，对于英文字母，ACSII吗的表示和UTF-8的编码是相同的
* 多字节的字符```n```，第一个字节的前```n```位都是```1```，第```n+1```位都是0，后面字节前两位为```10```，剩下的都是Unicode码

| Unicode符号范围  16进制      | UTF-8编码方式  2进制                               
| -------------------------- |:------------------------------------------:  
| 0000 0000-0000 007F        | 0xxxxxxx                       
| 0000 0080-0000 07FF        | 110xxxxx 10xxxxxx            
| 0000 0800-0000 FFFF        | 1110xxxx 10xxxxxx 10xxxxxx               
| 0001 0080-0010 FFFF        | 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx           

**Encoding a character to UTF-8 proceeds as follows**:

1. 获取字符的Unicode code point，在上表第一列进行对比，寻找对应行数
2. 找到对应的第一列中Unicode符号范围，然后找到对应的UTF-8的二进制编码方式
3. 然后对```x```对应的位置进行补位

接下里有个🌰，**将一个字符编码成UTF-8编码格式**

```js
// 1 char byte: Unicode code point 0 - 127
// 2 char byte: Unicode code point 128 - 2047
// 3 char byte: Unicode code point 2048 - 0xFFFF
// 4 char byte: Unicode code point 65536 - 0x1FFFFF
// 5 char byte: Unicode code point 0x200000 - 0x3FFFFFF
// 6 char byte: Unicode code point 0x4000000 - 0x7FFFFFFF

const HEXRANGELIST = [
  {
    from: '0x00', // 0
    to: '0x7F' // 127
  },
  {
    from: '0x80', // 128
    to: '0x7FF' // 2047
  },
  {
    from: '0x800', // 2048
    to: '0xFFFF' // 65535
  },
  {
    from: '0x1000', // 65536
    to: '0x10FFFF' // 1114111
  }
]
// 
const BINARYRANGELIST = [
  '0xxxxxxx',
  '110xxxxx10xxxxxx',
  '1110xxxx10xxxxxx10xxxxxx',
  '11110xxx10xxxxxx10xxxxxx10xxxxxx',
]

/**
 * GetRangeUnicode 
 * @param {*} char 
 * @returns index
 */
function GetRangeUnicode(char) {
  char = parseInt(char, 16)
  return HEXRANGELIST.findIndex(e => e.from < char && e.to > char)
}

/**
 * UTF-8 Encoding
 * @param char any one char
 */
function UTF8Encoding(char) {
  if(!char) return;
  // get the char hex code point of the unicode
  const charHex = char.codePointAt().toString(16);
  // get the char binary code point of the unicode, and convert array. e.g '100111000100101'
  const charBinary = char.codePointAt().toString(2).split('');

  // get the range of the char that converted hex code point, and concert array. e.g '1110xxxx10xxxxxx10xxxxxx'
  let rangeBinary = BINARYRANGELIST[GetRangeUnicode(charHex)].split('');

  let cLen = charBinary.length - 1;
  let rLen = rangeBinary.length - 1;

  // fraom
  while(rLen >= 0) {
    if(rangeBinary[rLen] === 'x') {
      rangeBinary[rLen] = cLen < 0 ? '0' : charBinary[cLen];
      cLen--;
    }
    rLen--;
  }
  return {
    binary_utf_8: rangeBinary.join(''),
    hex_utf_8: parseInt(rangeBinary.join(''), 2).toString(16)
  }
}
UTF8Encoding('严')
// {binary_utf_8: "111001001011100010100101", hex_utf_8: "e4b8a5"}
```

**UTF16Encoding - 数字代码点值cp的UTF16Encoding如下确定：**
  1. Assert: 0 ≤ codePoint ≤ 0x10FFFF.
  2. If codePoint ≤ 0xFFFF, return codePoint.
  3. Let cu1 be floor((codePoint - 0x10000) / 0x400) + 0xD800.
  4. Let cu2 be ((codePoint - 0x10000) modulo 0x400) + 0xDC00.
  5. Return the code unit sequence consisting of cu1 followed by cu2.

**UTF16Decode - 通过执行以下操作将形成UTF-16代理对的两个代码单元（前导和尾随）转换为代码点：**
  1. Assert: lead is a leading surrogate and trail is a trailing surrogate. 
  2. Let cp be (lead - 0xD800) × 0x400 + (trail - 0xDC00) + 0x10000. 
  3. Return the code point cp.





## WhiteSpace 

根据规范定义，whitespace是被用来提升代码的可读性的，并且跟标识符是分隔开的。
空格代码点可能出现在任意两个标记之间以及输入的开始或结尾。 空格代码点可能出现在StringLiteral，egularExpressionLiteral，Template或TemplateSubstitutionTail中，在这些地方它们被视为构成文字值一部分的重要代码点。 它们也可能出现在注释中，但不能出现在任何其他种类的标记中。

在ECMAScript中```whitespace```种类一般有：


| Code Point  | Unicode Name                        | Abbreviation(缩写)                              
| ------------|:------------------------------------|:------------------:  
| U+0009      | CHARACTER TABULATION 水平制表符       | TAB or \t             
| U+000B      | LINE TABULATION 垂直制表符            | CR or \v 
| U+000C      | FORM FEED 分页符                     | FF or \f
| U+0020      | SPACE  空格                          | SP        
| U+00A0      | NO-BREAK SPACE                      | NBSP    
| U+0009      | ZERO WIDTH NO-BREAK SPACE           | ZWNBSP            



**备注**: 获取字符串的码点一般会使用```String.codePointAt()```


* ```<TAB>```Character Tabulation, 含义是水平制表符，转义字符```\t```, 在控制台打印出来相当于是键盘中的```Tab```键，它在Unicode中的```Code Point```是```U+0009```或者是9(十进制) 
* 跟水平制表符对应的还有```<VT>```Line Tabulation, 含义是垂直制表符，转义字符```\v```, 在实际中几乎没有使用到过，它在Unicode中的```Code Point```是```U+000B```或者是11(十进制)
* ```<FF>```Form Feed, 含义是分页符，转义字符是```\f```, 它在Unicode中的```Code Point```是```U+000C```或者是12(十进制)
* ```<SP>```Space, 含义是空格，原始字符是```\u0020```, 它在Unicode中的```Code Point```是```U+0020```或者是20(十进制)
* ```<NBSP>```No-BreakSpace, 含义是无间隙空格，展示字符是```&nbsp;```,原始字符是```\u00A0```, 它在Unicode中的```Code Point```是```U+00A0```或者是160(二进制)
* ```<ZWNBSP>```Zero Width No-Break Space, 含义是0宽无间隙空格，原始字符是```\uFEFF```, 它在Unicode中的```Code Point```是```U+FEFF```或者是65279(十进制)
* ```<USP>``` [Any other Unicode “Space_Separator” code point](https://www.fileformat.info/info/unicode/category/Zs/list.htm)


## LineTerminator

像whitespace和lineTerminator的```码点```都是为了提升代码可读性而存在的。lineTerminator将有效的tokens分开。跟whitespace不同的是，行终止符对语法有一定的影响，
一般来讲，行终止符可以出现在两个tokens中间，但是有一些地方是禁止的根据语法，行终止符也会影响```;```的自动插入，行终止符不能出现在```StringLiteral```,```Template```等。


**行终止符代码点列表**

| Code Point  | Unicode Name            | Abbreviation(缩写)                              
| ------------|:------------------------|:------------------:  
| U+000A      | LINE FEED (LF) 换行符    | LF or \n               
| U+000D      | CARRIAGE RETURN 回车符   | CR or \r 
| U+2028      | LINE SEPARATOR 分割符    | LS 
| U+2029      | PARAGRAPH SEPARATOR     | PS        


## Comment

注释可以是单行或多行。 多行注释不能嵌套。
因为单行注释可以包含LineTerminator代码点以外的任何Unicode代码点，并且由于通常的原则是令牌始终尽可能长，所以单行注释总是由 **//** 标记中的所有代码点组成到行尾。但是，行尾的LineTerminator不被视为单行注释的一部分； 它被词法语法单独识别，并成为句法语法的输入元素流的一部分。 这一点非常重要，因为这意味着单行注释的存在或不存在不会影响自动分号插入的过程。注释的行为类似于空白，并被丢弃，除了注释之外，如果MultiLineComment包含行终止符代码点，则出于语法语法分析的目的，整个注释将被视为LineTerminator。

```js
// 单行注释
/* 多行注释 */ 
/*
 * 多行注释
 */
```

## Tokens

Tokens 可以表示JavaScript中一切有效的东西。根据```ECAMScript```的标准语法定义，包含以下几种类型

```js
// BNF 产生式语法
tokens ::
  IdentifierName
  Punctuator
  NumericLiteral 
  StringLiteral 
  Template
```

### IdentifierName

> IdentifierName和ReservedWord是根据Unicode标准，标识符和模式语法中给出的默认标识符语法进行了一些小的修改的令牌。 ReservedWord是IdentifierName的枚举子集。 语法将标识符定义为不是保留字的IdentifierName。 Unicode标识符语法基于Unicode标准指定的字符属性。 所有符合标准的ECMAScript实现都必须将Unicode标准最新版本中指定类别中的Unicode代码点视为这些类别中的Unicode代码点。 ECMAScript实现可以识别在Unicode标准的更高版本中定义的标识符代码点。

**IndentifierName Syntax** Syntax from **ECMAScript**

IndentifierName的组成部分：

```js
// 伪代码
IndentifierName = IndentifierStart + IdentifierName
// 标识符只能以$或者_或者Unicode序列开头
IndentifierStart = $ or _ or \0233  
```



### Reserved Words 保留字

**一个保留字是标识符名称不能当做标识符使用**

ReservedWords Syntax：

ReservedWord:: 
  keyword
  FutureReservedWord
  NullLiteral
  BooleanLiteral

#### keyword 

下面的关键字不能被用作标识符

**await** **break** **case** catch class const continue debugger default delete do
else export extends finally for function if import in instanceof new return super switch this throw try typeof var void while with **yield**

#### FutureReverseWords

目前标准中还保留了一个保留字，可能以后的标准会将其纳入进规范

**enum**

#### Punctuators
目前 Punctuators 有以下几种:
**{** **(** **)** **[** **]** **.** **...** **;** **,** **<** **>** **<=** **>=** **==** **!=** **===** **!==** **+** **-** * **%** **++** **--** **<<** **>>** **>>>** **&** **|** **^** **!** **~** **&&** **||** **?:** **=+** **=-** =* **= **%=** **<<=** **>>=** **>>>=** **&=** **|=** **^=** **=>** **/** **/=** **}**

### Literals

**Literals** 字面量，这个想必已经很熟悉了，有以下几种形式:

### Null Literal

Null字面量只有一种值: **null**

### Boolean Literals

Boolean 字面量有两种值: **true** 和 **false**

### Numeric Literals

> ECMAScript 规范中对Number值得定义: primitive value corresponding to a double-precision 64-bit binary format IEEE 754-2008 value。A Number value is a member of the Number type and is a direct representation of a number.


Number字面量有一下四种形式: Syntax from **[ECMAScript 262](https://tc39.es/ecma262/#sec-literals-numeric-literals)**

* DecimalLiteral - 整数小数
* BinaryIntegerLiteral - 二进制整数字面量 表示方式 `0b0101`or`0B0101`
* OctalIntegerLiteral - 八进制整数字面量 表示方式 `0o1771`or`0O1771`
* HexIntegerLiteral - 十六进制整数字面量 表示方式 `0x200A`or`0X200A`
 

在JavaScript中，Number被定义是符合[64位双精度浮点类型 IEEE-754](https://zh.wikipedia.org/wiki/IEEE_754)的数字类型




**为了熟知NumricLieral的类型，练习一个例子来巩固一下，写一个正则来匹配所有的Number字面量**

根据规范中定义NumberLiterall类型:
```js
// 整数
var regInterg = /(\.\d+|(0|[0-9])\d*\.?\d*)([eE][-\+]?\d+)/
// 二进制
var regBinary = /0[bB]?[01]+/
// 八进制
var regOctal = /0[oO]?[0-7]+/
// 十六进制
var regHex = /0[xX]?[0-9a-fA-F]+/

// Number Literals
var number_reg = /(\.\d+|(0|[0-9])\d*\.?\d*)([eE][-\+]?\d+)|(0[bB]?[01]+)|(0[oO]?[0-7]+)|(0[xX]?[0-9a-fA-F]+)/

```

### StringLiterals 

> 字符串文字是用单引号或双引号引起来的零个或多个Unicode代码点。 Unicode代码点也可以由转义序列表示。 除了结束引号代码点U + 005C（REVERSE SOLIDUS），U + 000D（回车）和U + 000A（LINE FEED）外，所有代码点都可能以字符串文字形式出现。 任何代码点都可能以转义序列的形式出现。 字符串文字的计算结果为ECMAScript字符串值。 生成这些字符串值时，Unicode代码点按照UTF-16编码。 属于基本多语言平面的代码点被编码为字符串的单个代码单元元素。 所有其他代码点都被编码为字符串的两个代码单元元素。


String字面量有一下两种形式: Syntax from [ECMAScript 262](https://tc39.es/ecma262/#sec-literals-string-literals)

* " DoubleStringCharacters "
  * DoubleStringCharacter DoubleStringCharacter
* ' SingleStringCharacters '
  * SingleStringCharacter SingleStringCharacters

----------------------reference---------------------

* DoubleStringCharacter ::
  * **SourceCharacter** but not one of " or \ or LineTerminator( \n \r LS PS )
  * LS
  * PS
  * \ **EscapeSequence**
  * **LineContinuation**
* SingleStringCharacter ::
  * **SourceCharacter** but not one of ' or \ or LineTerminator( \n \r LS PS )
  * LS
  * PS
  * \ **EscapeSequence**
  * **LineContinuation**
* LineContinuation ::
  * \ LineTerminatorSequence (LF CR LS PS LF)
* EscapeSequence ::
  * CharacterEscapeSequence
  * 0 [lookahead ∉ DecimalDigit] 
  * **HexEscapeSequence** 
  * UnicodeEscapeSequence
* CharacterEscapeSequence ::
  * SingleEscapeCharater
  * NonEscapeCharater
* SingleEscapeCharater :: one of 
  * ' " \ b f n r t v
* NonEscapeCharater ::
  * SourceCharacter but not one of **EscapeCharacter** or LineTerminator
* EscapeCharacter ::
  * SingleEscapeCharacter
  * DecimalDigit
  * x 
  * u
* HexEscapeSequence ::
  * x HexDigit HexDigit
* UnicodeEscapeSequence :: 
  * u **Hex4Digits**
  * u{ CodePoint } 
* Hex4Digits ::
  * HexDigit HexDigit HexDigit HexDigit

**String Single Character Escape Sequences - 字符串单字符转义序列**

| Escape Point  | code Unit Value         | Unicode Character Name |  Symbol                         
| --------------|:------------------------|:-----------------------|:-----------
| \b            | 0x0008                  | BACKSPACE              |  BS
| \t            | 0x0009                  | CHARACTER TABULATION   |  HT
| \n            | 0x000A                  | LINE FEED (LF)         |  LF
| \v            | 0x000B                  | LINE TABULATION        |  VT
| \f            | 0x000C                  | FORM FEED (FF)         |  FF
| \r            | 0x000D                  | CARRIAGE RETURN (CR)   |  CR
| \"            | 0x0022                  | QUOTATION MARK         |  "
| \'            | 0x0027                  | APOSTROPHE             |  '
| \\            | 0x005C                  | REVERSE SOLIDUS        |  \

### Regular Expression Literals

> 正则表达式文字是一个输入元素，每次对文字进行求值时都会将其转换为RegExp对象。程序中的两个正则表达式文字求和为正则表达式对象，即使这两个文字的内容相同，它们也永远不会以===的形式进行比较。还可以在运行时通过以下方式创建RegExp对象：新的RegExp或将RegExp构造函数作为函数调用。下面的生成描述了正则表达式文字的语法，并且被输入元素扫描程序用来查找正则表达式文字的结尾。随后，使用更严格的ECMAScript正则表达式语法，再次解析包含RegularExpressionBody和RegularExpressionFlags的源文本。一个实现可以中定义的ECMAScript正则表达式语法，但不能扩展下面定义的RegularExpressionBody和RegularExpressionFlags生成或这些生成使用的生成。

String字面量的形式: Syntax Syntax from **ECMAScript**
* RegularExpressionLiteral ::
  * / **RegularExpressionBody** / **RegularExpressionFlags**

* RegularExpressionBody ::
  * **RegularExpressionFirstChar** **RegularExpressionChars**

* RegularExpressionFirstChar ::
  * RegularExpressionNonTerminator but not one of * or \ or / or [ 
  * **RegularExpressionBackslashSequence**
  * **RegularExpressionClass**
* RegularExpressionChars ::
  * RegularExpressionNonTerminator but not one of \ or / or [ 
  * **RegularExpressionBackslashSequence**
  * **RegularExpressionClass**
* RegularExpressionBackslashSequence
  * \ **RegularExpressionNonTerminator**
* RegularExpressionNonTerminator
  * SourceCharacter but not LineTerminator
* RegularExpressionClass ::
  * [ **RegularExpressionClassChars** ]
* RegularExpressionClassChars ::
  * [empty]
  * **RegularExpressionClassChars** **RegularExpressionClassChar**
* RegularExpressionClassChar ::
  * RegularExpressionNonTerminator but not one of ] or \ 
  * RegularExpressionBackslashSequence

* RegularExpressionFlags ::
  * [empty]
  * RegularExpressionFlags **IdentifierPart** 


### Template Literal Lexical Components

Template字面量的形式: Syntax from **ECMAScript**
* Template :: 
  * **NoSubstitutionTemplate**
  * **TemplateHead**
* NoSubstitutionTemplate ::
  * ` **TemplateCharacters** `
* TemplateHead ::
  * ` **TemplateCharacters** ${
* TemplateSubstitutionTail :: 
  * TemplateMiddle
  * TemplateTail
* TemplateMiddle ::
  * } TemplateCharacters ${
  * TemplateTail ::
    * } TemplateCharacters `

* TemplateCharacters ::
  * **TemplateCharacter** **TemplateCharacter**
* TemplateCharacter ::
  * $ [lookahead ≠ {] 
  * \ EscapeSequence
  * \ **NotEscapeSequence**
  * LineContinuation
  * LineTerminatorSequence
  * SourceCharacter but not one of ` or \ or $ or LineTerminator
* NotEscapeSequence :: 没有转移序列
  * 0 DecimalDigit
  * DecimalDigit but not 0
  * x [lookahead ∉ HexDigit]
  * x HexDigit [lookahead ∉ HexDigit]
  * u [lookahead ∉ HexDigit] [lookahead ≠ {]
  * u HexDigit [lookahead ∉ HexDigit]
  * u HexDigit HexDigit [lookahead ∉ HexDigit]
  * u HexDigit HexDigit HexDigit [lookahead ∉ HexDigit] u { [lookahead ∉ HexDigit]
  * u { NotCodePoint [lookahead ∉ HexDigit]
  * u { CodePoint [lookahead ∉ HexDigit] [lookahead ≠ }]


## 相关文章以及规范

* [FileFormat](https://www.fileformat.info/info/unicode/)
* [Unicode](http://www.unicode.org/)
* [UTF-8 a transformation format of ISO 10646](https://tools.ietf.org/html/rfc3629)
<!-- * [Unicode in Javascript](https://flaviocopes.com/javascript-unicode/) -->
* [阮一峰 ASCII，Unicode 和 UTF-8](http://www.ruanyifeng.com/blog/2007/10/ascii_unicode_and_utf-8.html)
* [阮一峰 Unicode与JavaScript详解](http://www.ruanyifeng.com/blog/2014/12/unicode.html)
* [JavaScript 浮点数陷阱及解法](https://github.com/camsong/blog/issues/9)
* [IEEE 754双精度浮点格式和JavaScript中的Number](https://github.com/xwcoder/xwcoder.github.com/issues/19)