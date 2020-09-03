---
type: data-structure
tag: DataStructure 
lang: zh
excerpt: 'BST 二叉树、二叉搜索树 '
---

# BST 二叉搜索树


::: tip
树是一种常用到的数据结构，不是线性存储数据的结构，它的结构比较类似组织的架构图，是一种倒过来的“树”，叶子也就是其节点，树根就是跟节点，没有子节点的节点被称为叶子节点。
:::

二叉树是树中的一种特殊结构，它的叶子节点不超过两个，使得操作起来效率更加高效。


## 实现二叉树 

每个树都是由不同的叶子（节点）组成，Node的定义：

```js
// 节点类定义
function Node(data, left, right) {
  // 节点value
  this.data = data;
  // 节点的左节点
  this.left = left;
  // 节点的右节点
  this.right = right;
  this.show = show;
}


```
