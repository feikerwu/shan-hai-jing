/**
 * # 11. 盛最多水的容器
 * 双指针指向前后两个位置，不断收缩状态
 * 时间复杂度 $O(n)$, 空间复杂度 $O(1)$
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
  let res = -Infinity
  let i = 0,
    j = height.length - 1
  while (i <= j) {
    res = Math.max(res, (j - i) * Math.min(height[i], height[j]))
    height[i] > height[j] ? j-- : i++
  }

  return res
}

/**
 * # 42. 接雨水
 * 问题分解
 * 1. 类似11双指针指向前后, 按列去计算当前列的雨水量
 * 维护一个left，right，maxLeft，maxRight
 * 每次迭代可以保证的是 left < leftMax, right < rightMax
 * 当 leftMax < rightMax,我们可以保证left < rightMax, 直接用leftMax作为界定边界即可
 * 当 rightMax < leftMax, 我们可以保证right < rightMax < leftMax, 直接用rightMax作为界定边界
 */
var trap = function(height) {
  let left = 0,
    right = height.length - 1,
    res = 0,
    maxLeft = height[0],
    maxRight = height[right]

  while (left <= right) {
    if (maxLeft < maxRight) {
      res = res + (maxLeft - height[left] > 0 ? maxLeft - height[left] : 0)
      maxLeft = Math.max(maxLeft, height[left])
      left++
    } else {
      res = res + (maxRight - height[right] > 0 ? maxRight - height[right] : 0)
      maxRight = Math.max(maxRight, height[right])
      right--
    }
  }
  return res
}

trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])
