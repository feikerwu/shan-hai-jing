/*
 * @lc app=leetcode.cn id=1122 lang=javascript
 *
 * [1122] 数组的相对排序
 */

// @lc code=start
/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @return {number[]}
 */
var relativeSortArray = function (arr1, arr2) {
  const hashtable = {};
  for (let num of arr2) {
    hashtable[num] = [];
  }
  const rest = [],
    res = [];
  for (let num of arr1) {
    if (hashtable[num]) {
      hashtable[num].push(num);
    } else {
      rest.push(num);
    }
  }
  rest.sort((a, b) => a - b);
  for (let num of arr2) {
    res.push(...hashtable[num]);
  }
  for (let num of rest) {
    res.push(num);
  }
  return res;
};
// @lc code=end

relativeSortArray([28, 6, 22, 8, 44, 17], [22, 28, 8, 6]);
