/**
 * @param {string} s
 * @return {boolean}
 */
var checkRecord = function (s) {
  let count = 0;
  for (let char of s) {
    count += char === 'A';
  }
  return count < 2 && !s.includes('LLL');
};
