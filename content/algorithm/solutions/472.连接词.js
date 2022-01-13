/*
 * @lc app=leetcode.cn id=472 lang=javascript
 *
 * [472] 连接词
 */

// @lc code=start
/**
 * @param {string[]} words
 * @return {string[]}
 */
var findAllConcatenatedWordsInADict = function (words) {
  const set = new Set(words);

  const result = [];

  for (let word of words) {
    if (isConcatenatedWord(word)) {
      result.push(word);
    }
  }

  function isConcatenatedWord(str) {
    const dp = Array.from({ length: str.length + 1 }).fill(-1);

    dp[0] = 0;

    for (let i = 0; i < dp.length; i++) {
      for (let j = i + 1; j < dp.length; j++) {
        if (dp[i] !== -1 && set.has(str.substring(i, j))) {
          dp[j] = Math.max(dp[j], dp[i] + 1);
        }
      }
    }
    return dp[str.length] >= 2;
  }

  return result;
};
// @lc code=end

findAllConcatenatedWordsInADict([
  'cat',
  'cats',
  'catsdogcats',
  'dog',
  'dogcatsdog',
  'hippopotamuses',
  'rat',
  'ratcatdogcat',
]);
