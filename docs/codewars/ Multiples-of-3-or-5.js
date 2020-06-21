/**
 * 给定number，返回所有小于number且是3和5的和
 * @param {} number
 */
function solution(number) {
  let res = new Set();
  let a = Math.ceil(number / 3);
  let b = Math.ceil(number / 5);
  // console.log({ a, b });
  for (let i = 0; i <= a; i++) {
    for (let j = 0; j <= b; j++) {
      let cur;
      if (i === 0 && j === 0) {
        continue;
      }
      if (i === 0) {
        cur = j * 5;
      } else if (j === 0) {
        cur = i * 3;
      } else {
        cur = i * 3 * j * 5;
      }
      if (cur < number) {
        res.add(cur);
      }
    }
  }
  res = [...res];
  return res.reduce((a, b) => a + b, 0);
}

console.log(solution(20));
// Math.pow(3, a) * Math.pow(5, b);
