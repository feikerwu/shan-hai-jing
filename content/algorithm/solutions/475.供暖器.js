/*
 * @lc app=leetcode.cn id=475 lang=javascript
 *
 * [475] 供暖器
 */

// @lc code=start
/**
 * @param {number[]} houses
 * @param {number[]} heaters
 * @return {number}
 */
var findRadius = function (houses, heaters) {
  houses.sort((a, b) => a - b);
  heaters.sort((a, b) => a - b);

  let result = -Infinity;

  for (let house of houses) {
    let curMin = Infinity,
      left = 0,
      right = heaters.length - 1;

    // 找到第一个大与等于house的加热器
    while (left < right) {
      let mid = Math.floor((left + right) / 2);
      if (heaters[mid] < house) {
        left = mid + 1;
      } else if (heaters[mid] >= house) {
        right = mid;
      }
    }

    curMin = Math.min(
      Math.abs(heaters[left] - house),
      left === 0 ? curMin : Math.abs(heaters[left - 1] - house)
    );

    result = Math.max(result, curMin);
  }

  return result;
};
// @lc code=end

findRadius([1, 2, 3, 4], [1, 4]);
