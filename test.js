/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function (board, word) {
  const m = board.length,
    n = board[0].length;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j] === word[0]) {
        let set = new Set();
        if (backtrack(board, i, j, word, 0, set)) {
          return true;
        }
      }
    }
  }
  return false;
};

function backtrack(board, x, y, target, index, visited) {
  // 递归出口
  if (index === target.length) {
    return true;
  }

  // 是否越界
  if (x < 0 || y < 0 || x >= board.length || y >= board[0].length) {
    return false;
  }

  // 是否相等
  if (board[x][y] !== target[index]) {
    return false;
  }

  // 判断是否已访问
  if (visited.has(`${x},${y}`)) {
    return false;
  }

  // 如果满足条件，将其加入到已遍历
  visited.add(`${x},${y}`);

  // 尝试往4个方向
  let flag =
    backtrack(board, x + 1, y, target, index + 1, visited) ||
    backtrack(board, x, y + 1, target, index + 1, visited) ||
    backtrack(board, x - 1, y, target, index + 1, visited) ||
    backtrack(board, x, y - 1, target, index + 1, visited);

  // 回溯
  visited.delete(`${x},${y}`);

  return flag;
}

console.log(
  exist(
    [
      ['A', 'B', 'C', 'E'],
      ['S', 'F', 'E', 'S'],
      ['A', 'D', 'E', 'E'],
    ],
    'ABCESEEEFS'
  )
);
