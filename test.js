/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function(nums) {
  return LCS(nums.slice(), nums.sort((a, b) => a - b))
};

function LCS(text1, text2) {
  let [m, n] = [text1.length, text2.length];
  let dp = new DoubleArray(m + 1, n + 1);
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1
      } else {
        dp[i][j] = Math.max(dp[i][j - 1], dp[i - 1][j])
      }
    }

    return start
  }

  let arr = [];
  for (let col of mat) {
    let count = find(col)
    arr.push(count);
  }
  return dp[m][n]
}

class DoubleArray {
  constructor(m, n) {
    return Array.from({length: m}).map(_ => Array.from({length: n}).fill(0))
  }
}

console.log(lengthOfLIS([10,9,2,5,3,7,101,18]))
