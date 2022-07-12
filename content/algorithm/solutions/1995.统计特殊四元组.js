/*
 * @lc app=leetcode.cn id=1995 lang=javascript
 *
 * [1995] 统计特殊四元组
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var countQuadruplets = function (nums) {
  // 定义状态 dp[i][j][k] 为 可以在 nums[0...i] 之间通过k个数字相加得到j的个数
  const dp = Array.from({ length: nums.length + 1 }).map(i =>
    Array.from({ length: 101 }).map(i => Array.from({ length: 4 }).fill(0))
  );

  dp[0][0][0] = 1;

  for (let i = 1; i <= nums.length; i++) {
    for (let j = 0; j < 101; j++) {
      for (let k = 0; k < 4; k++) {
        dp[i][j][k] += dp[i - 1][j][k];

        if (j - nums[i - 1] >= 0 && k > 0) {
          dp[i][j][k] += dp[i - 1][j - nums[i - 1]][k - 1];
        }
      }
    }
  }

  // console.log(dp);
  let result = 0;

  for (let i = 3; i < nums.length; i++) {
    result += dp[i][nums[i]][3];
  }

  return result;
};
// @lc code=end
