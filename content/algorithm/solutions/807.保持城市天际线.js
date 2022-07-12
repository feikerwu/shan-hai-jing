/*
 * @lc app=leetcode.cn id=807 lang=javascript
 *
 * [807] 保持城市天际线
 */

// @lc code=start
/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxIncreaseKeepingSkyline = function (grid) {
  const colMaxValues = [];
  const rowMaxValues = [];

  for (let i = 0; i < grid.length; i++) {
    let maxVal = -Infinity;
    for (let j = 0; j < grid[i].length; j++) {
      maxVal = Math.max(maxVal, grid[i][j]);
    }
    colMaxValues.push(maxVal);
  }

  for (let j = 0; j < grid[0].length; j++) {
    let maxVal = -Infinity;
    for (let i = 0; i < grid.length; i++) {
      maxVal = Math.max(maxVal, grid[i][j]);
    }
    rowMaxValues.push(maxVal);
  }

  let result = 0;

  console.log(colMaxValues, rowMaxValues);

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      result += Math.min(colMaxValues[i], rowMaxValues[j]) - grid[i][j];
    }
  }
  console.log(result);

  return result;
};
// @lc code=end

maxIncreaseKeepingSkyline([
  [3, 0, 8, 4],
  [2, 4, 5, 7],
  [9, 2, 6, 3],
  [0, 3, 1, 0],
]);
