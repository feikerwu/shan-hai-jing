/*
 * @lc app=leetcode.cn id=48 lang=javascript
 *
 * [48] 旋转图像
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function (matrix) {
  const len = matrix.length;
  for (let i = 0; i < Math.floor(len / 2); i++) {
    for (let j = 0; j < len; j++) {
      const term = matrix[i][j];
      matrix[i][j] = matrix[len - 1 - i][j];
      matrix[len - 1 - i][j] = term;
    }
  }

  for (let i = 0; i < len; i++) {
    for (let j = 0; j < i; j++) {
      const term = matrix[i][j];
      matrix[i][j] = matrix[j][i];
      matrix[j][i] = term;
    }
  }
};
// @lc code=end
