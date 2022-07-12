/*
 * @lc app=leetcode.cn id=1705 lang=javascript
 *
 * [1705] 吃苹果的最大数目
 */

// @lc code=start
/**
 * @param {number[]} apples
 * @param {number[]} days
 * @return {number}
 */
var eatenApples = function (apples, days) {
  let result = 0,
    canEat = -Infinity;

  for (let i = 0; i < days.length; ) {
    canEat = Math.max(canEat, Math.min(apples[i], days[i]));
    result += canEat;

    let newCanEat = -Infinity;
    for (let j = i + 1; j < i + canEat && j < days.length; j++) {
      newCanEat = Math.max(
        newCanEat,
        Math.min(apples[j], days[j]) - (i + canEat - 1)
      );
    }

    i += Math.max(1, canEat);

    canEat = newCanEat;
  }

  console.log(result);

  return result;
};
// @lc code=end

eatenApples([3, 1, 1, 0, 0, 2], [3, 1, 1, 0, 0, 2]);
