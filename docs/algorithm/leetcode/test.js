function shortestToChar(S, C) {
  let res = Array.from(S).map(item => Infinity);
  let pre = -Infinity;
  for (let i = 0; i < S.length; i++) {
    if (S[i] === C) {
      pre = i;
      res[i] = 0;
    } else {
      res[i] = i - pre;
    }
  }
  pre = Infinity;
  for (let i = S.length - 1; i >= 0; i--) {
    if (S[i] === C) {
      pre = i;
    } else {
      res[i] = Math.min(res[i], pre - i);
    }
  }
  return res;
}