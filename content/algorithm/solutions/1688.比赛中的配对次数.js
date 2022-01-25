/*
 * @lc app=leetcode.cn id=1688 lang=javascript
 *
 * [1688] 比赛中的配对次数
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var numberOfMatches = function (n) {
  let res = 0;

  while (n > 1) {
    res += Math.floor(n / 2);
    n = Math.ceil(n / 2);
  }

  return res;
};
// @lc code=end
