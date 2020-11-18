/*
 * @lc app=leetcode.cn id=134 lang=javascript
 *
 * [134] 加油站
 */

// @lc code=start
/**
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
var canCompleteCircuit = function (gas, cost) {
  let gasSums = Array.from({ length: gas.length * 2 }).fill(0);
  let costSums = gasSums.slice();
  const len = gas.length;
  // console.log(gasSums);
  let gasSum = 0,
    costSum = 0;
  for (let i = 0; i < gasSums.length; i++) {
    gasSum = gasSum + gas[i % len];
    costSum = costSum + cost[i % len];
    gasSums[i] = gasSum;
    costSums[i] = costSum;
  }
  gasSums = [0, ...gasSums];
  costSums = [0, ...costSums];
  for (let i = 1; i <= len; i++) {
    let flag = true;
    for (let j = i; j < i + len; j++) {
      if (gasSums[j] - gasSums[i - 1] < costSums[j] - costSums[i - 1]) {
        flag = false;
      }
    }
    if (flag) {
      return i - 1;
    }
  }
  return -1;
};
// @lc code=end

console.log(canCompleteCircuit([3, 1, 1], [1, 2, 2]));
