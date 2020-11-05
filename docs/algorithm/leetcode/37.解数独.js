/*
 * @lc app=leetcode.cn id=37 lang=javascript
 *
 * [37] 解数独
 */

// @lc code=start
/**
 * 1. 根据给定数组生成3个hashtable
 * 2. 通过回溯枚举所有可能序列
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solveSudoku = function (board) {
  const cols = [];
  const rows = [];
  const boxes = [];
  for (let i = 0; i < 9; i++) {
    const term = Array.from({ length: 10 }).fill(0);
    cols.push(term.slice());
    rows.push(term.slice());
    boxes.push(term.slice());
  }

  // 生成3个hashMap
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const boxIndex = Math.floor(i / 3) * 3 + Math.floor(j / 3);
      const value = board[i][j];
      if (value !== '.') {
        cols[i][value] = rows[j][value] = boxes[boxIndex][value] = 1;
      }
    }
  }

  // console.log({ cols, rows, boxes });

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === '.') {
        backtrack(i, j);
        return board;
      }
    }
  }

  // 考虑坐标(x, y)
  function backtrack(x, y) {
    if (x >= 9 || y >= 9) {
      return true;
    }

    const boxIndex = Math.floor(x / 3) * 3 + Math.floor(y / 3);
    for (let i = 1; i <= 9; i++) {
      if (cols[x][i] === 0 && rows[y][i] === 0 && boxes[boxIndex][i] === 0) {
        cols[x][i] = rows[y][i] = boxes[boxIndex][i] = 1;
        board[x][y] = `${i}`;
        const [nx, ny] = genNextPos(x, y);
        if (backtrack(nx, ny)) {
          return true;
        } else {
          board[x][y] = '.';
          cols[x][i] = rows[y][i] = boxes[boxIndex][i] = 0;
        }
      }
    }
  }

  function genNextPos(x, y) {
    const next = x * 9 + y + 1;
    const nx = Math.floor(next / 9);
    const ny = next % 9;
    return nx >= 9 || board[nx][ny] === '.' ? [nx, ny] : genNextPos(nx, ny);
  }
};
// @lc code=end

solveSudoku([
  ['5', '3', '.', '.', '7', '.', '.', '.', '.'],
  ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
  ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
  ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
  ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
  ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
  ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
  ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
  ['.', '.', '.', '.', '8', '.', '.', '7', '9'],
]);

function clone(arrs) {
  let str = '';
  for (let i = 0; i < arrs.length; i++) {
    for (let j = 0; j < arrs[i].length; j++) {
      str += arrs[i][j];
    }
    str += '\n';
  }
  return str;
}
