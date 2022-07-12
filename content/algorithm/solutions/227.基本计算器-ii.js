/*
 * @lc app=leetcode.cn id=227 lang=javascript
 *
 * [227] 基本计算器 II
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var calculate = function (s) {
  const stack = [];
  let i = 0;

  while (i < s.length) {
    if (s[i] === '*' || s[i] === '/') {
      const pre = stack.pop();
      const op = s[i++]
      let next = 0
      while (i < s.length && /\d/.test(s[i])) {
        next = next * 10 + parseInt(s[i++])
      }

      if (op === '*') {
        stack.push(pre * next)
      } else if (op === '/') {
        stack.push(pre / next)
      }
    } else if (s[i] === '+' || s[i] === '-' || s[i] === '*') {stack.push(s[i])}
  }

  function getNext(i)
};
// @lc code=end
