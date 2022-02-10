/*
 * @lc app=leetcode.cn id=1447 lang=javascript
 *
 * [1447] 最简分数
 */

// @lc code=start

function gcb(a, b) {
  let term = a % b;

  if (term === 0) {
    return b;
  }

  return gcb(b, a % b);
}

/**
 * @param {number} n
 * @return {string[]}
 */
var simplifiedFractions = function (n) {
  let res = [];

  for (let i = 2; i <= n; i++) {
    for (let j = 1; j < i; j++) {
      if (gcb(i, j) === 1) {
        res.push(`${j}/${i}`);
      }
    }
  }
  return res;
};
// @lc code=end
