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


## 实现二叉树、二叉搜索树 

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
function show() {
  return this.data
}
```
Node对象可以保存对象，其left和right可以保存左右节点的链接，*show*可以展示节点的值。

接下来**BST**二叉搜索树的实现，包括了根节点*root*，用来保存二叉树的节点，**insert**，用来为树添加节点，以及遍历二叉搜索树等。


```js
function BST() {
  this.root = null;
  // 插入数据
  this.insert = insert;
  // 先序遍历
  this.preOrder = preOrder;
  // 中序遍历
  this.inOrder = inOrder;
  // 后序遍历
  this.postOrder = postOrder;
} 
/**
 * 插入节点
 * @params data 
 **/
function insert(data) {
  let node = new Node(data, null, null);
  // 添加根节点
  if(!this.root) {
    this.root = node
  }else {
    // 添加子节点
    let curNode = this.root;
    let parent;
    while(true) {
      parent = curNode;
      if(data < curNode.data) {
        cueNode = curNode.left
        if(curNode === null) {
          parent.left = node;
          break;
        }
      }else {
        curNode = curNode.right;
        if(curNode === null) {
          parent.right = node;
          break;
        }
      }
    }
  }
}
```
*insert* 主要是给BST添加节点，BST特点是左节点分布是较小的值，而右节点分组是较大的值，这样的特性在遍历以及查找特定值的时候效率会很高。

## 遍历BST

目前基本的BST已经成型，可以简单的构造出一颗二叉树搜索树，不过也需要遍历，输出其每个节点上的值。

目前有三种方式可以遍历二叉树搜索树，**先序遍历**，**中序遍历**，**后序遍历**

### 先序遍历

先序遍历 - 先访问根节点，再访问左子树，最后访问右子树，如下图：

![preOrder](https://raw.githubusercontent.com/Wangbaoqi/blogImgs/master/nateImgs/structure/tree/BST_preOrder.png)

```js
/**
 * 先序遍历
 * @param node
 **/
function preOrder(node) {
  if(node !== null) {
    // 当前节点值
    console.log(node.data);
    preOrder(node.left);
    preOrder(node.right);
  }
}

// test 
let bst = new BST();

bst.insert(23);
bst.insert(45);
bst.insert(16);
bst.insert(37);
bst.insert(3);
bst.insert(99);
bst.insert(22);

bst.preOrder(bst.root); // 23 16 3 22 45 37 99
```

### 中序遍历

中序遍历 - BST 节点排序（小-大），按照节点上的键值，以升序访问BST上的所有节点，先访问左子树，在访问根节点，最后访问右子树。

![inOrder](https://raw.githubusercontent.com/Wangbaoqi/blogImgs/master/nateImgs/structure/tree/BST_inOrder.png)


```js
/**
 * 中序遍历
 * @param node
 **/
function inOrder(node) {
  if(node !== null) {
    inOrder(node.left);
    console.log(node.data);
    inOrder(node.right)
  }
}

// test
let bst = new BST();

bst.insert(23);
bst.insert(45);
bst.insert(16);
bst.insert(37);
bst.insert(3);
bst.insert(99);
bst.insert(22);

bst.inOrder(bst.root); // 3 16 22 23 37 45 99 
```

### 后序遍历

后序遍历 - 先访问叶子节点，从左子树到右子树，再到根节点

![postOrder](https://raw.githubusercontent.com/Wangbaoqi/blogImgs/master/nateImgs/structure/tree/BST_postOrder.png)

```js
/**
 * 后序遍历
 * @param node
 **/
function postOrder(node) {
  if(node !== null) {
    postOrder(node.left);
    postOrder(node.right);
    console.log(node.data);
  }
}

// test
let bst = new BST();

bst.insert(23);
bst.insert(45);
bst.insert(16);
bst.insert(37);
bst.insert(3);
bst.insert(99);
bst.insert(22);

bst.postOrder(bst.root); // 3 22 16 37 99 45 23
```

## 二叉搜索树查找

在二叉搜索树上查到节点的方式有三种：

* 查找最小值 - 左子树上搜索
* 查找最大值 - 右子树上搜索
* 查找特定值 - 左子树和右子树上节点对比


### 查找最小值 

根据二叉搜索树的特性（较小值分布在左子树），所以直接遍历左子树就可以查找到最小值

```js
/**
 * 查找最小值
 * @return minData
 **/
function getMin() {
  let curNode = this.root;
  while(curNode.left !== null) {
    curNode = curNode.left
  }
  return curNode.data
}
```


### 查找最大值

根据二叉搜索树的特性（较大值分布在右子树），所以直接遍历右子树就可以查找到最大值

```js
/**
 * 查找最大值 
 * @returns maxData
 */
function getMax() {
  let curRoot = this.root;
  while(curRoot.right !== null) {
    curRoot.right = curRoot
  }
  return curRoot.data
}
```

### 查找特定值

查找特定值，需要定位该值在二叉树的左子树还是右子树

```js
/**
 * 查找特定值
 * @returns findData
 */
function find(data) {
  let current = this.root;
  while(current != null) {
    if(current.data === data) {
      return current
    }else if(current.data < data) {
      current = current.right
    }else {
      current = current.left
    }
  }
}
```

## 二叉搜索树删除节点

删除节点主要有两种方式，一种是叶子节点（没有子节点的节点），另一种是有子节点的节点。

* 删除叶子节点 - 没有子节点，直接删除就可以
* 删除有子节点的节点 
  - 左节点存在，没有右子节点
  - 右节点存在，没有左子节点
  - 左右节点都存在 


这里整理出删除节点的一套框架，采用递归的方式。

```js
/**
 * 删除节点
 * @param node data
 * @return node
 */
function deleteNode(node, data) {
  if(node == null) return null;
  // 查找到待删除的节点
  if(node.data === data) {
    // 进行删除
  }else if(node.data < data){
    node.right = deleteNode(node.right, data)
  }else {
    node.left = deleteNode(node.left, data)
  }
  return node
}
```

1. 删除叶子节点（没有左右子节点的节点）

![leet-code_pic](https://raw.githubusercontent.com/Wangbaoqi/blogImgs/master/nateImgs/structure/tree/bst_deletion_case_1.png)

```js
// 删除没有子节点的节点
if(node.data === data) {
  if(!node.left && !node.right) return null
}
```

2. 删除只有一个子节点的节点

![leet-code_pic](https://raw.githubusercontent.com/Wangbaoqi/blogImgs/master/nateImgs/structure/tree/bst_deletion_case_2.png)
```js
// 删除只有一个子节点的节点
if(node.data === data) {
  if(node.left == null) return node.right;
  if(node.right == null) return node.left;
}
```

3. 删除左右子节点都存在的节点

![leet-code_pic](https://raw.githubusercontent.com/Wangbaoqi/blogImgs/master/nateImgs/structure/tree/bst_deletion_case_3.png)
```js
// 删除左右子节点都存在的节点
if(node.data === data) {
  // 获取右子树的最小的节点
  let tmpNode = getMinNode(node.right);
  node.data = tmpNode.data;
  node.right = deleteNode(node.right, tmpNode.data)
}
```

完整代码:

```js
/**
 * 删除节点
 * @param node data
 * @return node
 */
function deleteNode(node, data) {
  if(node == null) return null;
  // 查找到待删除的节点
  if(node.data === data) {
    // 进行删除
    if(!node.left && !node.right) return null;
    if(node.left == null) return node.right;
    if(node.right == null) return node.left;

    let tmpNode = getMinNode(node.right);
    node.data = tmpNode.data;
    node.right = deleteNode(node.right, tmpNode.data);
  }else if(node.data < data){
    node.right = deleteNode(node.right, data)
  }else {
    node.left = deleteNode(node.left, data)
  }
  return node
}

// test 
let bst = new BST();

bst.insert(23);
bst.insert(45);
bst.insert(16);
bst.insert(37);
bst.insert(3);
bst.insert(99);
bst.insert(22);

// inorder
bst.inOrder(bst.root); // 3 16 22 23 37 45 99

// remove 
bst.remove(16);
bst.inOrder(bst.root); // 3 22 23 37 45 99
```

## 二叉搜索树计数






