/**
 * @param {number[]} chalk
 * @param {number} k
 * @return {number}
 */
var chalkReplacer = function(chalk, k) {
  let preSum = 0
  for (let i = 0; i < chalk.length; i++) {
    preSum += chalk[i]
    chalk[i] = preSum
  }

  k = k % preSum

  for (let i = 0; i < chalk.length; i++) {
    if (chalk[i] >= k) {
      return i
    }
  }
};