/*
 * @lc app=leetcode.cn id=697 lang=javascript
 *
 * [697] 数组的度
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var findShortestSubArray = function (nums) {
  const m = new Map();
  let degree = 0;
  let res = 0;
  for (let i = 0; i < nums.length; i++) {
    if (!m.has(nums[i])) {
      m.set(nums[i], {});
    }
    let cur = m.get(nums[i]);
    if (cur.start === undefined) {
      cur.start = i;
      cur.end = i;
    } else {
      cur.end = i;
    }
    cur.count = cur.count ? ++cur.count : 1;
  }

  // console.log(m.values());
  for (let { start, end, count } of m.values()) {
    if (count > degree) {
      res = end - start + 1;
      degree = count;
    } else if (count === degree) {
      res = Math.min(res, end - start + 1);
    }
  }
  // console.log({ res });

  return res;
};
// @lc code=end
findShortestSubArray([1, 2, 2, 3, 1, 4, 2]);
