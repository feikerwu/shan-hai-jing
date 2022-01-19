/*
 * @lc app=leetcode.cn id=539 lang=javascript
 *
 * [539] 最小时间差
 */

// @lc code=start
/**
 * @param {string[]} timePoints
 * @return {number}
 */
var findMinDifference = function (timePoints) {
  timePoints = timePoints.map(str => getTimeByStr(str));
  timePoints.sort((a, b) => a - b);

  timePoints = timePoints.concat(timePoints.map(a => a + 24 * 60));

  let minimum = Infinity;
  for (let i = 1; i < timePoints.length; i++) {
    minimum = Math.min(minimum, timePoints[i] - timePoints[i - 1]);
  }

  return minimum;
};

function getTimeByStr(str) {
  let [hour, mins] = str.split(':');
  hour = parseInt(hour, 10) * 60;
  return hour + parseInt(mins, 10);
}

// @lc code=end
