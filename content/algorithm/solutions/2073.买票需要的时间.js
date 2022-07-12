/*
 * @lc app=leetcode.cn id=2073 lang=javascript
 *
 * [2073] 买票需要的时间
 */

// @lc code=start
/**
 * @param {number[]} tickets
 * @param {number} k
 * @return {number}
 */
var timeRequiredToBuy = function (tickets, k) {
  const need = tickets[k];

  let res = 0;

  for (let i = 0; i < tickets.length; i++) {
    if (i <= k) {
      res += Math.min(tickets[i], need);
    } else {
      res += Math.min(tickets[i], need - 1);
    }
  }

  return res;
};
// @lc code=end

timeRequiredToBuy([5, 1, 1, 1], 0);
