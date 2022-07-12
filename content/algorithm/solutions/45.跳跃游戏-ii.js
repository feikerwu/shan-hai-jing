/*
 * @lc app=leetcode.cn id=45 lang=javascript
 *
 * [45] 跳跃游戏 II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function (nums) {
  let end = 0,
    maxPos = 0,
    step = 0;

  for (let i = 0; i < nums.length - 1; i++) {
    // 计算下一步能到达的最右边界
    maxPos = Math.max(maxPos, nums[i] + i);

    // 如果到达当前边界
    if (i === end) {
      // 更新边界，步数 + 1
      end = maxPos;
      step++;
    }
  }

  return step;
};

// @lc code=end
