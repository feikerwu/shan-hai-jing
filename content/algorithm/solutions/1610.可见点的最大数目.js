/*
 * @lc app=leetcode.cn id=1610 lang=javascript
 *
 * [1610] 可见点的最大数目
 */

// @lc code=start
/**
 * @param {number[][]} points
 * @param {number} angle
 * @param {number[]} location
 * @return {number}
 */
var visiblePoints = function (points, angle, location) {
  let newPoints = [],
    origin = 0;
  for (let [x, y] of points) {
    if (location[0] - x === 0 && location[1] - y === 0) {
      origin++;
    } else {
      newPoints.push(
        (Math.atan2(y - location[1], x - location[0]) / Math.PI) * 180
      );
    }
  }

  // newPoints.sort((a, b) => a - b);

  // angle = Math.PI * (angle / 360);

  // points = [...points, ...points.map(p => p + Math.PI * 2)];

  newPoints = [...newPoints, ...newPoints.map(p => p + 360)].sort(
    (a, b) => a - b
  );

  // console.log(newPoints);

  let left = 0,
    right = 0,
    result = 0;

  while (left <= right && right < newPoints.length) {
    while (
      newPoints[right] - newPoints[left] <= angle &&
      right < newPoints.length
    ) {
      right++;
    }

    console.log(right - left);

    result = Math.max(result, right - left);

    while (
      left < right &&
      right < newPoints.length &&
      newPoints[right] - newPoints[left] > angle
    ) {
      left++;
    }
  }

  console.log({ result });

  return result + origin;
};
// @lc code=end

visiblePoints(
  [
    [48, 29],
    [3, 47],
    [95, 65],
    [100, 23],
    [90, 5],
    [38, 79],
    [23, 76],
    [14, 53],
    [12, 78],
    [89, 5],
    [48, 72],
    [39, 42],
    [23, 78],
    [100, 93],
    [41, 72],
    [35, 34],
    [41, 91],
    [83, 93],
    [54, 95],
    [10, 33],
    [66, 74],
    [14, 61],
    [69, 98],
    [62, 72],
    [72, 68],
    [34, 59],
  ],
  31,
  [71, 95]
);
