---
title: 最长上升子序列
date: 2020-05-06
description: 最长上升子序列leetcode类型题
---

| [300.最长上升子序列](https://leetcode-cn.com/problems/longest-increasing-subsequence/description/) |      |      |
| ------------------------------------------------------------ | ---- | ---- |
| [435.无重叠区间](https://leetcode-cn.com/problems/non-overlapping-intervals/description/) |      |      |
| [646.最长数对链](https://leetcode-cn.com/problems/maximum-length-of-pair-chain/description/) |      |      |
| [452.用最少数量的箭引爆气球](https://leetcode-cn.com/problems/minimum-number-of-arrows-to-burst-balloons/description/) |      |      |

## 300. 最长上升子序列

### 解法一

定义 dp[i] 为nums中以i结尾的最大子序列长度，那么对任意j($j > 0 & j < nums.length$), 有
$$
d[j] = max(dp[j], dp[i] + 1), i < j
$$

```javascript
var lengthOfLIS = function (nums) {
  const dp = Array.from(nums).fill(1);
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }
  return dp.reduce((a, b) => Math.max(a, b), 0);
};
```

空间复杂度 $O(n)$, 时间复杂度$O(n * n )$



### 解法二

定义 dp[i] 为子序列长度为i时，子序列的最后一位，遍历nums的过程中，借用贪心和二分更新最后一位为最小值

```js
function lengthOfLIS(nums) {
  let dp = [];
  for (let i = 0; i < nums.length; i++) {
    let cur = nums[i];
    let start = 0,
      end = dp.length;
    while (start < end) {
      let mid = Math.floor((start + end) / 2);
      if (dp[mid] < cur) {
        start = mid + 1;
      } else {
        end = mid;
      }
    }
    if (start === dp.length) {
      dp.push(cur);
    } else {
      dp[start] = cur;
    }
  }
  return dp.length;
}
```

时间复杂度 $O(n * logn)$, 空间复杂度$O(n)$



## 435.无重叠区间

根据start排序后，转化为计算区间的最大递增子序列问题

```js
/**
 * @param {number[][]} intervals
 * @return {number}
 */
var eraseOverlapIntervals = function (intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  let maxLength = 0;
  let dp = Array.from(intervals).fill(1);
  for (let i = 0; i < intervals.length; i++) {
    for (let j = 0; j < i; j++) {
      if (intervals[i][0] >= intervals[j][1]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }
  maxLength = dp.reduce((a, b) => Math.max(a, b), 0);
  return dp.length - maxLength;
};
```



## 646.最长数对链

同435解法

```js
/**
 * @param {number[][]} pairs
 * @return {number}
 */
var findLongestChain = function (pairs) {
  pairs.sort((a, b) => a[0] - b[0]);
  let dp = Array.from(pairs).fill(1);
  for (let i = 0; i < pairs.length; i++) {
    for (let j = 0; j < i; j++) {
      if (pairs[i][0] > pairs[j][1]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }
  return dp.reduce((a, b) => Math.max(a, b), 0);
};
```

