/*
 * @lc app=leetcode.cn id=39 lang=javascript
 *
 * [39] 组合总和
 */

// @lc code=start
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function (candidates, target) {
  const result = [];

  function dfs(target, cur, term) {
    if (cur >= candidates.length) {
      return;
    }

    if (target === 0) {
      result.push(term);
      return;
    }

    // 对当前数选或者是不选
    dfs(target, cur + 1, term);

    // 选择当前这个数
    if (target - candidates[cur] >= 0) {
      dfs(target - candidates[cur], cur, [...term, candidates[cur]]);
    }
  }

  dfs(target, 0, []);

  console.log(result);

  return result;
};

// @lc code=end

combinationSum([2, 3, 6, 7], 7);
