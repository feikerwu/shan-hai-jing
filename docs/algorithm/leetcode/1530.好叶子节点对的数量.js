/*
 * @lc app=leetcode.cn id=1530 lang=javascript
 *
 * [1530] 好叶子节点对的数量
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
 * 通过后序遍历计算当前节点能够贡献多少对合法叶子节点，同时向上传递所有叶子节点的高度
 * 时间复杂度: O(N * log(N) * log(N))
 * 空间复杂度: O(N * log(N))
 * @param {TreeNode} root
 * @param {number} distance
 * @return {number}
 */
var countPairs = function (root, distance) {
  let res = 0;
  postOrder(root);
  return res;
  function postOrder(root) {
    if (!root) {
      return [];
    }
    if (!root.left && !root.right) {
      return [0];
    }
    const leaves = []; // 所有叶子节点距离当前的高度
    const leftDeepths = postOrder(root.left);
    const rightDeepths = postOrder(root.right);
    for (let leftDeepth of leftDeepths) {
      if (++leftDeepth <= distance) {
        leaves.push(leftDeepth);
      }
    }

    for (let rightDeepth of rightDeepths) {
      if (++rightDeepth <= distance) {
        leaves.push(rightDeepth);
      }
    }

    for (let leftDeepth of leftDeepths) {
      for (let rightDeepth of rightDeepths) {
        if (leftDeepth + rightDeepth + 2 <= distance) {
          res++;
        }
      }
    }

    return leaves;
  }
};
// @lc code=end
