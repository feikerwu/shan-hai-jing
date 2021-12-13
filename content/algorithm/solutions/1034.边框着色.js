/*
 * @lc app=leetcode.cn id=1034 lang=javascript
 *
 * [1034] 边框着色
 */

// @lc code=start
/**
 * @param {number[][]} grid
 * @param {number} row
 * @param {number} col
 * @param {number} color
 * @return {number[][]}
 */
var colorBorder = function (grid, row, col, color) {
  const m = grid.length,
    n = grid[0].length;
  const before = grid[row][col];

  const visited = Array.from({ length: m }).map(_ =>
    Array.from({ length: n }).fill(0)
  );

  const neededToAddColor = [];

  dfs(row, col);

  for (let [x, y] of neededToAddColor) {
    grid[x][y] = color;
  }

  return grid;

  function dfs(x, y) {
    // 递归出口
    if (
      x < 0 ||
      y < 0 ||
      x >= m ||
      y >= n ||
      grid[x][y] !== before ||
      visited[x][y]
    ) {
      return;
    }

    // 标记为已经遍历
    visited[x][y] = 1;

    // 判断是否是边界节点
    if (isEdge(x, y)) {
      neededToAddColor.push([x, y]);
    }

    dfs(x - 1, y);
    dfs(x + 1, y);
    dfs(x, y - 1);
    dfs(x, y + 1);
  }

  function isEdge(x, y) {
    if (x - 1 < 0 || y - 1 < 0 || x + 1 >= m || y + 1 >= n) {
      return true;
    }

    if (
      grid[x - 1][y] !== before ||
      grid[x + 1][y] !== before ||
      grid[x][y - 1] !== before ||
      grid[x][y + 1] !== before
    ) {
      return true;
    }

    return false;
  }
};
// @lc code=end
