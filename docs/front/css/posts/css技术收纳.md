---
type: front-css
tag: CSS
lang: zh
excerpt: 'css 技术点归纳, 元素继承、CSS 特别样式、CSS的解析规则。。。'
---
# css 技术点归纳

## 元素继承

```css
/* 可以继承 */
font-size: 10px;
font-weight: 100;
line-height: 10px;
color: red;

/* 不可继承 可以改变盒子的大小 */
margin:1px;
padding: 1px;
display: flex;
border: 1px solid #eee;

```

## CSS 特别样式


### position: fixed 在什么情况下失效 

憋着急，先看个例子

```html
<div class="container"> 
  <div class="fixed"> </div>
</div>
```

```css
.container {
  width:400px;
  height: 400px;
  background: blue;
  margin: 40px;
  /* transform: translateX(10px) */
}

.fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(100, 100, 255, .8);
}
```

**此时，页面展示是正常**

<font color=#ff502c bgcolor=#fff5f5 size=3 >**以下情况出现失效的情况:**</font>

父元素class属性transform的值为非none的时候，子元素的定位就会失效。why?

::: tip
引入 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/position) 概括的话，当元素祖先的 transform 属性非 none 时，容器由视口改为该祖先。因而引出了Stacking Context -- 堆叠上下文 的概念
:::

**Stacking Context -- 堆叠上下文**

> 生成了 Stacking Context 的元素会影响该元素的层叠关系与定位关系


生成Stacking Context的方式可以参考 [MDN 堆叠上下文](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Understanding_z_index/The_stacking_context)


<font color=#ff502c bgcolor=#fff5f5 size=3 >**验证具有堆叠上下文的元素是否都会使子元素的定位失效**</font>

验证地址引用 [验证具有堆叠上下文的元素是否都会对其子元素的定位失效](https://codepen.io/Chokcoco/pen/wqXZXd) 

结果并不全是，但是其中有五种会对其产生影响：

1. 父元素transform的value为非none
2. 父元素filter的value为非none
3. 父元素will-change的value指定了任意CSS样式
4. 父元素设置了 transform-style: preserve-3d
5. 父元素perspective值不为“none”

### CSS的解析规则 



### CSS选择器优化 

1. * 避免使用通配符 - 会遍历所有的元素 
2. 通过可继承元素实现继承，避免重复定义
3. 尽量使用类选择器 少用标签选择器
4. 尽量减少层级，最多3层 - 减少性能损耗