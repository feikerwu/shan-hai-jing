/*
 * @lc app=leetcode.cn id=1220 lang=javascript
 *
 * [1220] 统计元音字母序列的数目
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
const mod = Math.pow(10, 9) + 7;

const map = [[1, 2, 4], [0, 2], [1, 3], [2], [2, 3]];

var countVowelPermutation = function (n) {
  let dp = Array.from({ length: n }).map(it =>
    Array.from({ length: 5 }).fill(0)
  );

  for (let i = 0; i < 5; i++) {
    dp[0][i] = 1;
  }

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < 5; j++) {
      for (let k = 0; k < map[j].length; k++) {
        dp[i][j] = (dp[i][j] + dp[i - 1][map[j][k]]) % mod;
      }
    }
  }

  return dp[n - 1].reduce((acc, cur) => (acc + cur) % mod, 0);
};

console.log(countVowelPermutation(5));
