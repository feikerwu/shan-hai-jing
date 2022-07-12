/**
 * https://binarysearch.com/problems/Minimum-Light-Radius
 */
class Solution {
  solve(nums: Array<number>): number {
    // edge-case 最多三个房子的场景下，3盏灯半径为0完全可以覆盖
    if (nums.length <= 3) {
      return 0;
    }

    nums = nums.sort((a, b) => a - b);
    let topBoundRadius = nums[nums.length - 1] - nums[0];

    // 都半径进行二分，不断逼近结果
    // 如果当前半径 r1 下，3盏灯能够覆盖所有房子，则当前半径满足，必有 r2 (r2 <= r1), 使得r2也满足，结果落在()
    // 否则, 对任意
  }
}
