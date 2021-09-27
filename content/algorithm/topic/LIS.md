---
date: 2021-08-02
title: 最长递增子序列
tags: LIS
---

## 问题描述

给定一个字符串 text， 求text的一个子序列长度，使得这个子序列单调递增，且子序列的长度尽可能大。

### 思路

#### 最长公共子序列

求 text 的最长递增子序列，其实就是求 text 和 text_sorted 的最长公共子序列，其中 text_sorted 是 text 根据字典序排序后序列。求最长公共子序列可以参考 [最长公共子序列](./LCS.md)

##### 伪代码
```js
func lis(text):
  let text_sorted = sort(text)
  return lcs(text, text_sorted)

func lcs(text1, text2):
  m = text1.length, n = text2.length
  C = array(m, n)

  for i := 0..m
    C[i, 0] = 0

  for j := 0..n
    C[0, j] = 0

  for i := 0..m
    for j := 0..n
      if (text1[i] === text2[j])
        C[i, j] = C[i - 1, j - 1] + 1
      else
        C[i, j] = max(C[i - 1, j], C[i, j - 1])

  return C[m, n]
```

##### example

###### LC 300. longest-increasing-subsequence

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function(nums) {
  return LCS(nums.slice(), nums.sort((a, b) => a - b))
};

function LCS(text1, text2) {
  let [m, n] = [text1.length, text2.length];
  let dp = new DoubleArray(m + 1, n + 1);
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1
      } else {
        dp[i][j] = Math.max(dp[i][j - 1], dp[i - 1][j])
      }
    }
  }
  return dp[m][n]
}

class DoubleArray {
  constructor(m, n) {
    return Array.from({length: m}).map(_ => Array.from({length: n}).fill(0))
  }
}
```

+ 时间复杂度: $O(n * n)$
+ 空间复杂度: $O(n * n)$

PS: 上述代码在leetcode对应题上AC不了, case: [7, 7, 7, 7, 7], 这种非严格单调场景无法AC，需要做额外校验



