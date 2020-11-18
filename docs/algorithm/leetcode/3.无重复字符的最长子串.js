/*
 * @lc app=leetcode.cn id=3 lang=javascript
 *
 * [3] 无重复字符的最长子串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  let start = -1;
  let res = 0;
  let map = {};
  for (let i = 0; i < s.length; i++) {
    if (map[s[i]] === undefined || map[s[i]] < start) {
      res = Math.max(res, i - start);
    } else {
      start = map[s[i]];
    }
    map[s[i]] = i;
  }
  return res;
};
// @lc code=end

console.log(lengthOfLongestSubstring('au'));
