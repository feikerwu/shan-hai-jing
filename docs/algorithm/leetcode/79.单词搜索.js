/*
 * @lc app=leetcode.cn id=79 lang=javascript
 *
 * [79] 单词搜索
 */

// @lc code=start
/**
 * 回溯解法
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function (board, word) {
  const dirs = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      if (board[i][j] === word[0]) {
        if (dfs(i, j, 0)) {
          return true;
        }
      }
    }
  }
  return false;

  function dfs(x, y, cur) {
    // console.log({ cur, len: word.length });
    if (cur >= word.length - 1) {
      // console.log('here');
      return true;
    }
    let flag = false;
    const curValue = board[x][y];
    board[x][y] = -1;
    for (let [dx, dy] of dirs) {
      const [nx, ny] = [x + dx, y + dy];
      if (
        nx >= 0 &&
        ny >= 0 &&
        nx < board.length &&
        ny < board[0].length &&
        board[nx][ny] === word[cur + 1]
      ) {
        flag = flag || dfs(nx, ny, cur + 1);
      }
    }
    board[x][y] = curValue;
    return flag;
  }
};
// @lc code=end

exist(
  [
    ['A', 'B', 'C', 'E'],
    ['S', 'F', 'C', 'S'],
    ['A', 'D', 'E', 'E'],
  ],
  'ABCCED'
);
