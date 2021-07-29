---
date: 2021-07-29
title: 最长公共子序列
tags: algorithm/lcs
---

### 问题描述

给定两个字符串 S1, S2, 求S1, S2 最长公共子序列长度

### 解决思路

设 S1 长度为 L1, S2 长度为 L2, dp[i][j] 为 L1{0...i} 和 L2{0...j} 的最长公共子序列长度

如果 L1[i] === L2[j], 则 dp[i][j] = dp[i-1][j-1] + 1
否则, dp[i][j] = max(dp[i][j - 1], dp[i-1][j])

+ 时间复杂度: $O(n * n)$
+ 空间复杂度: $O(n * n)$

#### Example

##### LC: 1143. 最长公共子序列

###### 题目描述

```
给定两个字符串 text1 和 text2，返回这两个字符串的最长 公共子序列 的长度。如果不存在 公共子序列 ，返回 0 。

一个字符串的 子序列 是指这样一个新的字符串：它是由原字符串在不改变字符的相对顺序的情况下删除某些字符（也可以不删除任何字符）后组成的新字符串。

例如，"ace" 是 "abcde" 的子序列，但 "aec" 不是 "abcde" 的子序列。
两个字符串的 公共子序列 是这两个字符串所共同拥有的子序列。

 

示例 1：

输入：text1 = "abcde", text2 = "ace"
输出：3
解释：最长公共子序列是 "ace" ，它的长度为 3 。
示例 2：

输入：text1 = "abc", text2 = "abc"
输出：3
解释：最长公共子序列是 "abc" ，它的长度为 3 。
示例 3：

输入：text1 = "abc", text2 = "def"
输出：0
解释：两个字符串没有公共子序列，返回 0 。
 

提示：

1 <= text1.length, text2.length <= 1000
text1 和 text2 仅由小写英文字符组成。


来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/longest-common-subsequence
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
```

##### 代码描述

```js
var longestCommonSubsequence = function(text1, text2) {
  let dp = Array.from({length: text1.length + 1})
  .map(_ => Array.from({length: text2.length + 1}).fill(0))

  for (var i = 1; i <= text1.length; i++) {
    for (let j = 1; j <= text2.length; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
      }
    }
  }

  return dp[text1.length][text2.length]
};
```

