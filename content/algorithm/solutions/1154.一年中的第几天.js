/*
 * @lc app=leetcode.cn id=1154 lang=javascript
 *
 * [1154] 一年中的第几天
 */

// @lc code=start
/**
 * @param {string} date
 * @return {number}
 */
var dayOfYear = function (date) {
  const [year, month, day] = date.split('-').map(v => +v);

  const monthDays =
    year % 4 === 0
      ? [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
      : [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  let result = 0;
  for (let i = 0; i < month - 1; i++) {
    result += monthDays[i];
  }

  return result + day;
};
// @lc code=end
