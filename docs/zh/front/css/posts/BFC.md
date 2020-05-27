---
type: front-css
tag: Css
lang: zh
excerpt: 'float 的破坏性 —— float 破坏了父标签的原本结构，使得父标签出现了坍塌现象。导致这一现象的最根本原因在于：被设置了 float 的元素会脱离文档流。其根本原因在于 float 的设计初衷是解决文字环绕图片的问题'
---
# 浮动以及BFC的使用

> 引入 float 属性是为了能让 web 开发人员实现简单的布局，包括在一列文本中浮动的图像，文字环绕在它的左边或右边

## 浮动的特性

float 的破坏性 —— float 破坏了父标签的原本结构，使得父标签出现了坍塌现象。导致这一现象的最根本原因在于：被设置了 float 的元素会脱离文档流。其根本原因在于 float 的设计初衷是解决文字环绕图片的问题

1. 使父元素高度塌陷以及块状化

高度塌陷：float 属性会让当前设置浮动的元素的高度塌陷为0了，这样父元素在计算高度的时候，会认为子元素没有高度， 从而产生高度塌陷
块状化：如果一个元素设置了float,就会产生块状化（这里的块状化并不是块状元素），是这个元素可以设置高度和宽度
```css
.style {
  float: left;
  display: block:; // 多余
  vertical-align: middle; // 多余
}
    
```
2. 包裹性
3. 清空格
4. 没有任何的margin重叠

[JSRun 中查看](http://jsrun.pro/L6XKp)

## 清除浮动(clear hack)

举个🌰: 正常情况 容器中有图片跟文字，图片向左浮动，此时会有文字环绕效果，现在清除浮动效果，让下方的文字不会环绕图片，在图片下方呈现

```html
<div class='fa'>
  <img class="img" src="../assets/imgs/logo.png" alt="">
  <div class="clear"></div>
  <p class="fa-text clearfix"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla luctus aliquam dolor, eu lacinia lorem placerat vulputate. Duis felis orci, pulvinar id metus ut, rutrum Suspendisse ac imperdiet turpis. Aenean finibus sollicitudin eros pharetra congue. Duis ornare egestas augue ut luctus. Proin blandit quam nec lacus varius commodo et a urna. Ut id ornare felis, eget fermentum sapien.</p>
</div>
```

```css
.fa {
  border: 1px solid #333333;
}
.fa .img {
  float: left;
}
```
**清除方案**

1. 利用clear属性 both, left, right

```css
/* 保持上述的style */
.fa-text {
  clear: left;
}
```
2. 利用伪元素clearfix
```css
/* 保持上述的style */
/*  */
.fa .clearfix::before {
  content: '';
  display: block;
  height: 0;
  clear: left;
}
```
3. 利用新增块级元素，设置clear: both | right | left
```css
/* 保持上述的style */
.fa .clear {
  clear: left;
}
```

4. 利用BFC
      
```css
/* 保持上述的style */
/* 使用overflow 可以解决浮动高度塌陷的问题 */
.fa {
  overflow: hidden;
}
```
[JSRun 中查看](http://jsrun.pro/TTbKp)


## BFC
> 如果一个元素具有BFC，那么它的内部子元素再怎么翻江倒海，都不会影响外部的元素。因此，BFC元素是不可能发生margin重叠的，另外，BFC元素也可以用来清除浮动的影响。 

**BFC原理**

**触发BFC的属性**   
* html 根元素
* float 值不为none
* overflow 值为auto、scroll、hidden
* display 值为table-cell、table-caption、inline-blcok
* postion 不为relative、static 

**触发BFC后 就不需要用clear:both来清除浮动了**

**BFC的作用**
1. 清除margin重叠 + 栗子
2. 清除高度塌陷的问题
3. 阻止文本换行
4. 不与float 元素相重叠


