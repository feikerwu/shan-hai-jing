/*
 * @lc app=leetcode.cn id=563 lang=javascript
 *
 * [563] 二叉树的坡度
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var findTilt = function (root) {
  let result = 0;

  function help(cur) {
    if (cur === null) {
      return 0;
    }

    const leftSum = help(cur.left);
    const rightSum = help(cur.right);

    result += Math.abs(leftSum - rightSum);

    return leftSum + rightSum + cur.val;
  }

  help(root);

  return result;
};
// @lc code=end
