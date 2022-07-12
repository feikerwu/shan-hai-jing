/*
 * @lc app=leetcode.cn id=1036 lang=javascript
 *
 * [1036] 逃离大迷宫
 */

// @lc code=start
/**
 * @param {number[][]} blocked
 * @param {number[]} source
 * @param {number[]} target
 * @return {boolean}
 */
// 顺时针方向
const directions = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

const max = Math.pow(10, 6);

var isEscapePossible = function (blocked, source, target) {
  const visited = new Set();

  blocked = new Set(blocked.map(([x, y]) => `${x}-${y}`));

  let queue = [source];
  visited.add(`${source[0]}-${source[1]}`);

  while (queue.length) {
    let [x, y] = queue.pop();

    for (let [dx, dy] of directions) {
      // 下一个可能的坐标
      let [nx, ny] = [x + dx, y + dy];

      if (nx === target[0] && ny === target[1]) {
        return true;
      }

      if (
        nx >= 0 &&
        nx < max &&
        ny >= 0 &&
        ny < max &&
        !blocked.has(`${nx}-${ny}`) &&
        !visited.has(`${nx}-${ny}`)
      ) {
        queue.push([nx, ny]);
        visited.add(`${nx}-${ny}`);
      }
    }
  }

  return false;
};
// @lc code=end

console.log(isEscapePossible([], [0, 0], [999999, 999999]));
