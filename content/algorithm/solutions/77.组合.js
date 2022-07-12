/*
 * @lc app=leetcode.cn id=77 lang=javascript
 *
 * [77] 组合
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function (n, k) {
  const result = [];

  function dfs(cur, comb) {
    if (comb.length > k || cur > n + 1) {
      return;
    }

    if (comb.length === k) {
      result.push(comb);
      return;
    }

    dfs(cur + 1, comb);
    dfs(cur + 1, [...comb, cur]);
  }

  dfs(1, []);

  return result;
};
// @lc code=end
