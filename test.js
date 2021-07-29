/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function(text1, text2) {
  let dp = Array.from({length: text1.length + 1})
  .map(_ => Array.from({length: text2.length + 1}).fill(0))

  for (var i = 1; i <= text1.length; i++) {
    for (let j = 1; j <= text2.length; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
      }
    }
  }

  // console.log(dp)

  return dp[text1.length][text2.length]
};

// console.log(longestCommonSubsequence("abc",
// "def"))