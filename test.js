/**
 * @param {string} s
 * @return {number}
 */
var balancedStringSplit = function (s) {
  let prefix = 0,
    count = 0;

  for (let char of s) {
    prefix += char === 'L' ? 1 : -1;
    count += prefix === 0;
  }

  return count;
};
