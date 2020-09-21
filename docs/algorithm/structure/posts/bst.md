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
  // 展示节点val
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
  // 获取BST最小值
  this.getMin = getMin;
  // 获取BST最大值
  this.getMax = getMax;
  // 寻找节点
  this.find = find;
  // 寻找节点的次数
  this.findCount = findCount;
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

树的遍历一般分为`DFS`(深度优先遍历)，`BFS`（广度优先遍历）

目前基本的BST已经成型，可以简单的构造出一颗二叉树搜索树，不过也需要遍历，输出其每个节点上的值。

目前`DFS`有三种方式可以遍历二叉树搜索树，**先序遍历**，**中序遍历**，**后序遍历**

`BFS`一般是层序遍历

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

/**
 * 查找特定值 递归写法 也是LeetCode-700的解法
 * @returns findData
 */
function searchBst(root, data) {
  if(root == null) return null;

  if(root.data == data) {
    return root;
  }else if(root.data < data) {
    return searchBst(root.right, data)
  }else {
    return searchBst(root.left, data)
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

计数需要在节点新增一个属性*count*，遍历一组数据时，可以判断该值是否存在树中，存在的话，其*count*加`1`，否则，将该值插入到树中。

```js
/**
 * 节点类定义
 * @param node data
 * @param node left
 * @param node right
 */
function Node(data, left, right) {
  // 节点value
  this.data = data;
  // 节点的左节点
  this.left = left;
  // 节点的右节点
  this.right = right;
  // 展示节点val
  this.show = show;
  // 节点数量
  this.count = 1;
}

// 寻找节点次数 BST 方法 
function findCount(data) {
  return this.find(data).count || 0
}


// test case
let arr = [20, 19, 30, 22, 4, 20, 18, 22]
let bst = new BST();

for (const key of arr) {
  if(!bst.find(key)) {
    bst.insert(key)
  }else {
    let curNode = bst.find(key)
    curNode.count++;
  }
}
```

## 相同的树

如果对比两颗二叉搜索树完全相同，就要递归遍历两棵树的每个节点都要相同。

```js
/**
 * 相同的树
 * @param node root1
 * @param node root2
 */
function sameBST(root1, root2) {
  // 两个为空
  if(root1 == null && root2 == null) return true;
  // 一个为空 一个非空
  if(root1 == null || root2 == null) return false;
  // 后判断节点的值是否相等
  if(root1.data != root2.data) return false;
  
  return sameBST(root1.left, root2.left) && sameBST(root1.right, root2.right)
}

// test
let bst1 = new BST()
bst1.insert(23);
bst1.insert(45);
bst1.insert(16);
bst1.insert(37);
bst1.insert(3);
bst1.insert(99);
bst1.insert(22);

let bst2 = new BST();
bst2.insert(23);
bst2.insert(45);
bst2.insert(16);
bst2.insert(37);
bst2.insert(3);
bst2.insert(99);
bst2.insert(22);

sameBST(bst1.root, bst2.root)
```

## 验证BST的合法性

如何验证一个BST的合法性，跟前面如何实现一个BST还是有关联的，在实现一个BST的时候，只要新加入一个节点就会跟左子树（或者右子树）上的所有节点值相比较。

而验证一个BST，跟实现BST的思路类似，比如判断一根节点的左子树，必须判断左子树中所有的节点都要比根节点小，除此之外，就是每个节点跟其左右子节点之间的比较。

**1. 循环递归的方式**

```js
/**
 * 验证树的合法性
 * @param node root
 */
function isValidBST(root) {

  if(root == null) return true;

  if(root.left) {
    let nodeLeft = root.left;

    while(nodeLeft.right) {
      nodeLeft = nodeLeft.right
    }
    if(nodeLeft.data <= root.data) return false;
  }

  if(root.right) {
    let nodeLeft = root.right;

    while(nodeLeft.left) {
      nodeLeft = nodeLeft.left
    }
    if(nodeLeft.data >= root.data) return false;
  }

  return isValidBST(root.left) && isValidBST(root.right)
}
```

**2. 纯递归的方式**

```js
function validBST(root) {
  return isValidBST(root, null, null);
}

function isValidBST(root, min, max) {

  if(root == null) return true;

  if(min !== null && min.data >= root.data) return false;

  if(max !== null && max.data <= root.data) return false;


  return isValidBST(root.left, min, root) && isValidBST(root.right, root, max)
}
```

## 二叉搜索树的镜像

二叉树的镜像定义(也是二叉树的交换)：交换节点的左右子节点，如下图：*来自LeetCode*

![bst_mirror](https://raw.githubusercontent.com/Wangbaoqi/blogImgs/master/nateImgs/structure/tree/BST_mirror.png)

[LeetCode - 二叉树交换](https://leetcode-cn.com/problems/invert-binary-tree/),
[LeetCode - 剑指 Offer 27. 二叉树的镜像](https://leetcode-cn.com/problems/er-cha-shu-de-jing-xiang-lcof/)这两道题是一个意思

如果采用递归的方式：

* 结束条件；当节点指向`null`，返回`null`.
* 递推公式（交换节点）；
  * 暂存左节点
  * 当前右节点赋值到左节点
  * 将暂存的左节点赋值到右节点
  * 返回当前节点

下面看代码：

```js
/**
 * 树的镜像
 * @param node root
 */
function mirrorBST(root) {

  // 结束条件
  if(root == null) return null;

  // 递推公式
  let tmp = root.left;
  root.left = mirrorBST(root.right);
  root.right = mirrorBST(tmp);
  return root;
}
```

## 二叉搜索树的第K大节点

题目来自*LeetCode*，[剑指 Offer 54. 二叉搜索树的第k大节点](https://leetcode-cn.com/problems/er-cha-sou-suo-shu-de-di-kda-jie-dian-lcof/)。

要获取二叉搜索树中第K大的节点，可以间接的获取中序遍历后反转的第*k-1*的值

![k-node](https://raw.githubusercontent.com/Wangbaoqi/blogImgs/master/nateImgs/structure/tree/BST_KNode.png)

下面看代码：

```js
/**
 * 二叉搜索树的第K大节点
 * @param node root
 * @param int k
 */
function kthLargest(root, k) {
  let result = [];
  // 中序遍历
  function inOrder(root) {
    if(root !== null) {
      inOrder(root.left);
      result.push(root.data);
      inOrder(root.right);
    }
  }
  inOrder(root)
  return result.reverse()[k-1];
}
```

## 二叉树的深度

计算二叉树的深度，可以采用前面讲的树的遍历方式。

* DFS(深度优先遍历): 后序遍历
* BFS(广度优先遍历): 层序遍历

**DFS 后序遍历**

看下图示（来自LeetCode）

![DFS - depth](https://raw.githubusercontent.com/Wangbaoqi/blogImgs/master/nateImgs/structure/tree/BST_depth.png)

递归方式：

* 递归结束条件 - 节点指向`null`，则深度为**0**
* 递归公式
  * 计算左子树的深度
  * 计算右子树的深度
  * 返回树的深度

```js
/**
 * 二叉树的深度 DFS
 * @param node root
 */
function depthBST(root) {
  // 结束条件
  if(root == null) return 0;
  // 递推公式
  return Math.max(depthBST(root.left), depthBST(root.right)) + 1
}
```

**BFS 层序遍历**

层序遍历也是广度优先遍历，树的层序遍历的过程：

需要栈来暂存每一层节点，每次循环将左右子树压入栈中，树的深度递加一次，直到栈为空

* 根节点为`null`，返回`0`
* 首次将`root`压入`stack`栈，进入遍历栈的过程
  * 将该节点的左子树和右子树压入临时栈`tmpStack`
  * 树深度自增
  * 将临时栈`tmpStack`赋值给`stack`中

看下面图示: 来自*LeetCode*

![bfs1](https://raw.githubusercontent.com/Wangbaoqi/blogImgs/master/nateImgs/structure/tree/BST_BFS.png)

初始化，将整个树压入栈，初始化深度计数器

![bfs2](https://raw.githubusercontent.com/Wangbaoqi/blogImgs/master/nateImgs/structure/tree/BST_BFS1.png)

遍历栈，此时栈中只有树一个节点，将左右子树压入临时栈中

![bfs3](https://raw.githubusercontent.com/Wangbaoqi/blogImgs/master/nateImgs/structure/tree/BST_BFS2.png)

将临时栈赋值到stack中，计数器自增

![bfs4](https://raw.githubusercontent.com/Wangbaoqi/blogImgs/master/nateImgs/structure/tree/BST_BFS3.png)

此时临时栈中压入子树的子节点，重复图三，知道节点为`null`，遍历结束。

下面看代码:

```js
/**
 * 二叉树的深度 BFS
 * @param node root
 */
function maxDepth_BFS(root) {
  let stack = [root], depth = 0;
  while(stack.length) {
    let tmp = [];

    for(let node of stack) {
      if(node.left !=  null) tmp.push(node.left)
      if(node.right != null) tmp.push(node.right)
    }
    stack = tmp;
    depth++;
  }
  return depth
}

```

## LeetCode 算法题

学完有关二叉搜索树的概念以及操作，就可以去**LeetCode**上刷题了，下面是有关二叉搜索树的所有题目

* [701. 二叉搜索树中的插入操作](https://leetcode-cn.com/problems/insert-into-a-binary-search-tree/)
* [450. 删除二叉搜索树中的节点](https://leetcode-cn.com/problems/delete-node-in-a-bst/)
* [700. 二叉搜索树中的搜索](https://leetcode-cn.com/problems/search-in-a-binary-search-tree/)
* [100. 相同的树](https://leetcode-cn.com/problems/same-tree/)
* [98. 验证二叉搜索树](https://leetcode-cn.com/problems/validate-binary-search-tree/)
* [剑指 Offer 27. 二叉树的镜像](https://leetcode-cn.com/problems/er-cha-shu-de-jing-xiang-lcof/)
* [226. 翻转二叉树](https://leetcode-cn.com/problems/invert-binary-tree/)
* [剑指 Offer 55 - I. 二叉树的深度](https://leetcode-cn.com/problems/er-cha-shu-de-shen-du-lcof/)
* [1038. 从二叉搜索树到更大和树](https://leetcode-cn.com/problems/binary-search-tree-to-greater-sum-tree/)
