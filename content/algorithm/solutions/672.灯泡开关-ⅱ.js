/*
 * @lc app=leetcode.cn id=672 lang=javascript
 *
 * [672] 灯泡开关 Ⅱ
 */

// @lc code=start
/**
 * 找规律, 由前3个灯泡唯一确定后续的状态
 * @param {number} n
 * @param {number} presses
 * @return {number}
 */
var flipLights = function (n, m) {
  if (n === 0) {
    return 0;
  }

  if (n === 1) {
    return m === 0 ? 1 : 2;
  }

  if (n === 2) {
    return Math.min(4, 1 + 2 * m);
  }

  if (n >= 3) {
    return Math.min(8, 1 + 3 * m);
  }
};
// @lc code=end
