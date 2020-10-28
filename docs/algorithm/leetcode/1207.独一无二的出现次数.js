/**
 * 如果子串能够形成回文子串，那么只有两种可能
 * @param {string} s
 * @return {number}
 */
var longestAwesome = function (s) {
  let table = Array.from({ length: s.length + 1 }).fill(0);
  let prefixSum = 0;
  let res = 0;
  for (let i = 0; i < s.length; i++) {
    prefixSum = prefixSum ^ (1 << s[i]);
    table[i + 1] = prefixSum;
  }
  console.log(table);
  for (let i = 0; i < s.length; i++) {
    for (let j = i; j < s.length; j++) {
      let flag = false;
      let term = table[i + 1] ^ table[j + 1];
      if (term === 0) {
        // 都是偶数
        flag = true;
        res = Math.max(res, j - i + 1);
      }
      for (let k = 0; k <= 9; k++) {
        if ((term ^ (1 << k)) === 0) {
          // 奇数情况
          flag = true;
          res = Math.max(res, j - i + 1);
        }
      }
    }
  }
  console.log({ res });
  return res;
};

longestAwesome('213123');
