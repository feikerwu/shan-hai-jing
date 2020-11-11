/*
 * @lc app=leetcode.cn id=514 lang=javascript
 *
 * [514] 自由之路
 */

// @lc code=start
/**
 * dp[i][j] = do[i-1][k] + Math.min(j - k, n - (j - k)), k 是上一个字符移动的位置
 * @param {string} ring
 * @param {string} key
 * @return {number}
 */
var findRotateSteps = function (ring, key) {
  // 建立辅助索引
  let idxs = ring.split('').reduce((acc, cur, index) => {
    if (!acc[cur]) {
      acc[cur] = [];
    }
    acc[cur].push(index);
    return acc;
  }, {});

  const dp = Array.from(key).map(_ => Array.from(ring).fill(Infinity));

  for (let idx of idxs[key[0]]) {
    dp[0][idx] = Math.min(idx, ring.length - idx);
  }

  for (let i = 1; i < key.length; i++) {
    for (let j = 0; j < idxs[key[i - 1]].length; j++) {
      for (let k = 0; k < idxs[key[i]].length; k++) {
        const preIdx = idxs[key[i - 1]][j];
        const curIdx = idxs[key[i]][k];
        dp[i][curIdx] = Math.min(
          dp[i][curIdx],
          dp[i - 1][preIdx] +
            Math.min(
              Math.abs(curIdx - preIdx),
              ring.length - Math.abs(curIdx - preIdx)
            )
        );
      }
    }
  }

  // console.log(dp);

  return (
    dp[key.length - 1].reduce((acc, cur) => Math.min(acc, cur), Infinity) +
    key.length
  );
};
// @lc code=end

console.log(findRotateSteps('godding', 'gd'));
