---
type: data-structure & algorithm
tag: Algorithm 
excerpt: '时钟类似算法归纳'
lang: us
---
# 时钟类似算法归纳


## 给定一天中两个时间点，计算时针，分针，秒针转过的角度

::: tip 
比如：
输入： 01:20:40和17:39:29 
输出：时针，分针，秒针转过的角度
:::

**手稿**


![](https://cdn.img.wenhairu.com/images/2019/09/05/85cqG.jpg)


通过上述，可以归纳出结论，也可以说是公式：

1. 首先计算出时间差， dh(小时差)，dm(分钟差)，ds(秒差)
2. 按照最小单位计算转的度数，1h(30), 1m(6), 1s(6)
3. 这样就可以计算出每个转过的度数了

**公式**

* 时针转过的度数: (dh + (dm/60) + (ds/3600)) * 30
* 分钟转过的度数: ((dh*60) + dm + (ds/60)) * 6
* 秒针转过的度数: ((dh*3600) + (60*dm) + ds) * 6

接下来使用代码实现:

```js
// 计算起抵时间的时间差
function getDiff(start, end) {
  let startArr = start.split(":");
  let endArr = end.split(":");
  return {
    hDiff: endArr[0] - startArr[0],
    mDiff: endArr[1] - startArr[1],
    sDiff: endArr[2] - startArr[2],
  }

}
/**
 * starttime 开始时间
 * endtime 结束时间
**/
function degrees(startTime, endTime) {
  // 计算小时，分钟，秒的时间差 
  const { hDiff, mDiff, sDiff } = getDiff(startTime, endTime);
  // 计算出分针，分针，秒针转过的角度
  const hDegree = (hDiff + mDiff/60 + sDiff/3600) * 30;
  const mDegree = (dDiff * 60 + mDiff + sDiff/60) * 6;
  const sDegree = (hDiff * 3600 + mDiff * 60 + sDiff) * 6;

  return {hDegree, mDegree, sDegree}
}

```