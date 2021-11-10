/*
 * @lc app=leetcode.cn id=40 lang=javascript
 *
 * [40] 组合总和 II
 */

// @lc code=start
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function (candidates, target) {
  const result = [];

  candidates.sort((a, b) => a - b);

  const map = new Map();

  for (let item of candidates) {
    map.set(item, (map.get(item) || 0) + 1);
  }

  candidates = [...new Set(candidates)];

  // 深度优先搜索使用第cur个数能达成条件的情况
  function dfs(target, cur, combine) {
    if (target === 0) {
      result.push(combine);

      return;
    }

    if (cur >= candidates.length || target < 0) {
      return;
    }

    dfs(target, cur + 1, combine);

    for (let i = 1; i <= map.get(candidates[cur]); i++) {
      if (target - candidates[cur] * i >= 0) {
        combine = [...combine, candidates[cur]];
        dfs(target - candidates[cur] * i, cur + 1, [...combine]);
      }
    }
  }

  dfs(target, 0, []);
  // console.log(result);
  return result;
};

// @lc code=end

combinationSum2([10, 1, 2, 7, 6, 1, 5], 8);
