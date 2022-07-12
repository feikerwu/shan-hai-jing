/*
 * @lc app=leetcode.cn id=686 lang=javascript
 *
 * [686] 重复叠加字符串匹配
 */

// @lc code=start
/**
 * @param {string} a
 * @param {string} b
 * @return {number}
 */
var repeatedStringMatch = function (a, b) {
  if (b === '') {
    return 0;
  }
  let result = -1,
    count = 1,
    newStr = a;
  // 边界条件: b子串刚好出现在a的尾部位置
  while (newStr.length - a.length + 1 <= 2 * b.length || count <= 2) {
    // console.log({ newStr: newStr, count: count });
    if (newStr.includes(b)) {
      result = count;
      break;
    }
    newStr += a;
    count++;
  }

  return result;
};
// @lc code=end

repeatedStringMatch('abcd', 'cdabcdab');
