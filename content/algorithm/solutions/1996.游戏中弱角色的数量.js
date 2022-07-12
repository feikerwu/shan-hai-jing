/*
 * @lc app=leetcode.cn id=1996 lang=javascript
 *
 * [1996] 游戏中弱角色的数量
 */

// @lc code=start
/**
 * @param {number[][]} properties
 * @return {number}
 */
var numberOfWeakCharacters = function (properties) {
  properties.sort((a, b) => {
    if (a[0] === b[0]) {
      return a[1] - b[1];
    }
    return b[0] - a[0];
  });

  let count = 0;
  let maxDef = properties[0][1];
  for (let i = 1; i < properties.length; i++) {
    if (properties[i][1] < maxDef) {
      count++;
    } else {
      maxDef = properties[i][1];
    }
  }

  return count;
};
// @lc code=end
