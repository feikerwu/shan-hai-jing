/*
 * @lc app=leetcode.cn id=747 lang=javascript
 *
 * [747] 至少是其他数字两倍的最大数
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var dominantIndex = function (nums) {
  let m1 = 0,
    m2 = 0;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > nums[m1]) {
      m1 = i;
      m2 = m1;
    }
  }

  return m1 > m2 * 2 ? m1 : -1;
};
// @lc code=end
