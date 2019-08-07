# 数组


```js
let kk = '33'
console.log(kk)


// 生成新数组的迭代器的方法

// map
// filter




// 不生成新数组的迭代器方法

// forEach
// some
// every
// reduce


/**
 * 二维数组
 */
Array.matrix = function(numrows, numcols, initial) {
  var arr = [];
  for(let i = 0; i < numrows; i++) {
    var col = [];
    for(let j = 0; j < numcols; j++) {
      col[j] = initial;
    }
    arr[i] = col;
  }
  return arr
}
let twoMatrix = Array.matrix(5, 3, 1)
console.log(twoMatrix)

// 二维数组的访问 按行/按列

let dataList = [[12,22,11],[11,2,3],[55,21,11]];

// 按行
for(let r = 0; r < dataList.length; r++) {
  let row = 0;

  for(let c = 0; c < dataList[r].length; c++) {
    row += dataList[r][c]
  }
  console.log(`row${r+1}:${row}`)
}
// 按列 每一维数组数量相同
for(let r = 0; r < dataList.length; r++) {
  let col = 0;
  for(let c = 0; c < dataList[r].length; c++) {
    col += dataList[c][r]
  }
  console.log(`col${r+1}:${col}`)
}


```