/*
 * @lc app=leetcode.cn id=318 lang=javascript
 *
 * [318] 最大单词长度乘积
 */

// @lc code=start
/**
 * @param {string[]} words
 * @return {number}
 */
var maxProduct = function (words) {
  let compress = Array.from(words).fill(0);

  for (let i = 0; i < words.length; i++) {
    for (let j = 0; j < words[i].length; j++) {
      compress[i] =
        compress[i] | (1 << (words[i][j].charCodeAt() - 'a'.charCodeAt() + 1));
    }
  }

  let result = 0;

  for (let i = 0; i < words.length; i++) {
    for (let j = i + 1; j < words.length; j++) {
      if ((compress[i] & compress[j]) === 0) {
        result = Math.max(result, words[i].length * words[j].length);
      }
    }
  }

  return result;
};
// @lc code=end
maxProduct(['abcw', 'baz', 'foo', 'bar', 'xtfn', 'abcdef']);
