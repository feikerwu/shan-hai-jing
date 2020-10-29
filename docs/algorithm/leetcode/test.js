/**
 * @param {string} s
 * @return {number}
 */
var longestAwesome = function (s) {
  // 标兵
  s = `#${s}`;
  let table = Array.from(s).fill(0);
  let prefixSum = 0;
  let res = 1;
  for (let i = 1; i < s.length; i++) {
    prefixSum = prefixSum ^ (1 << s[i]);
    table[i] = prefixSum;
  }

  for (let i = 0; i < s.length; i++) {
    for (let j = i; j < s.length; j++) {
      // 偶数情况
      if ((table[i] ^ table[j]) === 0) {
        res = Math.max(res, j - i);
        // console.log({ i, j, ti: table[i], tj: table[j] });
      }

      for (let k = 0; k < 10; k++) {
        if ((table[i] ^ table[j] ^ (1 << k)) === 0) {
          res = Math.max(res, j - i);
          // console.log({ i, j, ti: table[i], tj: table[j] });
        }
      }
    }
  }

  return res;
};
