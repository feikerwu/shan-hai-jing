/*
 * @lc app=leetcode.cn id=71 lang=javascript
 *
 * [71] 简化路径
 */

// @lc code=start
/**
 * @param {string} path
 * @return {string}
 */
var simplifyPath = function (path) {
  path = path.split('/').filter(char => char !== '');
  const stack = [];

  for (let dir of path) {
    if (dir !== '.' && dir !== '..') {
      stack.push(dir);
    } else if (dir === '..' && stack.length) {
      stack.pop();
    }
  }

  // stack.unshift('/');

  return '/' + stack.join('/');
};
// @lc code=end
