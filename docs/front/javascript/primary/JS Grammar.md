---
type: front-JavaScript
tag: JavaScript
lang: zh
excerpt: 'JavaScript Grammar'
---
# JS 词汇语法

::: tip
JS 词汇语法在ECMAScript 规范中定义了以下几种: 
SourceCharacter: 源字符; 
InputElementDiv: 输入元素; 
InputElementRegExp: 输入正则元素; 
InputElementRegExpOrTemplateTail: 输入正则模板字符串; 
InputElementTemplateTail: 输入元素模板字符串;
:::


## SourceCharacter 

**SourceCharacter**在规范中的定义是 **any Unicode code point**（任何Unicode码点）。这里重新科普一下计算机中的字符编码（Character Encoding）。

**[Character Encoding](https://zh.wikipedia.org/zh/%E5%AD%97%E7%AC%A6%E7%BC%96%E7%A0%81)**: 字集碼是把字符集中的字符编码为指定集合中某一对象（例如：比特模式、自然数序列、8位元组或者电脉冲），以便文本在计算机中存储和通过通信网络的传递。常见的例子包括将拉丁字母表编码成摩斯电码和ASCII。其中，**ASCII将字母、数字和其它符号編號，並用7位元的二进制來表示这个整数**。通常會額外使用一个扩充的位元，以便于以1个字节的方式存储。

**[ASCII](https://zh.wikipedia.org/wiki/ASCII)**: 是基于拉丁字母的一套电脑编码系统。它主要用于显示现代英语，而其扩展版本延伸美国标准信息交换码则可以部分支持其他西欧语言，并等同于国际标准ISO/IEC 646。
ASCII码的表达方式：使用指定的7位或者8位二进制组合来表示128或者256中可能的字符（字符一般是字母、数字、符号的统称）。

在计算机中，所有信息都是一个```二进制值```, ```二进制位```组成了```二进制值```, 每个二进制位有两种状态，```0```和```1```, 而在ASCII码的表达方式中，由7位或者8位```二进制位```组合成字符，而字符的种类就有了2^7（128）或者2^8（256）种。而这个7位或者8位的二进制的组合被称之为```字节```, 因此一个字节有128种或者256种表示方式，比如：00000000 字节就表示空字符。而字符表示的范围是 00000000 - 11111111。

标准的ACSII码也是基础ACSII码（是由7位二进制组成，剩下的一位用0来补位），表示所有的的大写、小写字母、数字0-9、标点符号以及美式英语中的特殊字符。

**0-31**以及127（33个）是控制字符或通信专用字符（其余为可显示字符），如控制符：LF（换行）、CR（回车）、FF（换页）、DEL（删除）、BS（退格)、BEL（响铃）等；通信专用字符：SOH（文头）、EOT（文尾）、ACK（确认）等；ASCII值为8、9、10 和13 分别转换为退格、制表、换行和回车字符。它们并没有特定的图形显示，但会依不同的应用程序，而对文本显示有不同的影响

**32-126**(95个) 是字符，32是空格，**48-57**是十个阿拉伯数字，**65-90**为26个大写英文字母，**97-122**是26个小写英文字母。

**Basic ACSII Table**
![basic ascii](http://www.asciitable.com/index/asciifull.gif)

**Extended ACSII Table**
![extended table](http://www.asciitable.com/index/extend.gif)


ASCII的局限就是只能显示基本的26个英文字符、阿拉伯数字以及英式标点符号，为了解决这个问题，现在基本都使用Unicode编码

**[Unicode](https://zh.wikipedia.org/wiki/Unicode)**: 

### 