/**
 * @param {number} n
 * @return {number}
 */
var checkRecord = function (n) {
  const mod = 10 ** 9 + 7;
  let dp = Array.from({ length: n + 1 }).map((_) =>
    Array.from({ length: 2 }).map((_) => Array.from({ length: 3 }).fill(0))
  );

  dp[0][0][0] = 1;

  for (let i = 1; i <= n; i++) {
    // 前一个序列结尾补P
    for (let j = 0; j < 2; j++) {
      for (let k = 0; k < 3; k++) {
        dp[i][j][0] = (dp[i][j][0] + dp[i - 1][j][k]) % mod;
      }
    }

    // 前一个序列结尾补 A
    for (let k = 0; k < 3; k++) {
      dp[i][1][0] = (dp[i][1][0] + dp[i - 1][0][k]) % mod;
    }

    // 前一个序列结尾补 L
    for (let j = 0; j < 2; j++) {
      for (let k = 1; k < 3; k++) {
        dp[i][j][k] = (dp[i][j][k] + dp[i - 1][j][k - 1]) % mod;
      }
    }
  }

  // sum
  let sum = 0;
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 3; j++) {
      sum = (sum + dp[n][i][j]) % mod;
    }
  }

  console.log({ sum });
  return sum;
};

checkRecord(1);
checkRecord(2);
