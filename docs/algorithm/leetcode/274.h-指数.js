/*
 * @lc app=leetcode.cn id=274 lang=javascript
 *
 * [274] H 指数
 */

// @lc code=start
/**
 * @param {number[]} citations
 * @return {number}
 */
var hIndex = function (citations) {
  citations.sort((a, b) => a - b);
  let res = 0;
  for (let i = 0; i < citations.length; i++) {
    let curH = citations.length - i;
    if (citations[i] >= curH) {
      res = Math.max(res, curH);
    }
  }
  return res;
};

// console.log(hIndex([3, 0, 6, 1, 5]));
// @lc code=end
