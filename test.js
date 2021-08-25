/**
 * @param {string} S
 * @return {string}
 */
var compressString = function (S) {
  let newStr = '';
  for (let i = 0; i < S.length; i++) {
    let preChar = S[i],
      count = 1;
    while (S[i + 1] === preChar && i < S.length) {
      count++;
      i++;
    }
    newStr += `${preChar}${count}`;
  }
  return newStr.length >= S.length ? S : newStr;
};

console.log(compressString('aabcccccaaa'));
