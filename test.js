/**
 * @param {number[][]} mat
 * @param {number} k
 * @return {number[]}
 */
var kWeakestRows = function (mat, k) {
  function find(nums) {
    let start = 0, end = nums.length - 1;

    while(start <= end) {
      let mid = Math.floor((start + end) / 2)
      if (nums[mid] === 1) {
        start = mid + 1
      } else {
        end = mid - 1
      }
    }

    return start
  }

  let arr = [];
  for (let col of mat) {
    let count = find(col)
    arr.push(count);
  }

  arr = arr.map((v, i) => ({v, i}));

  console.log(arr)

  return arr.sort((a, b) => a.v - b.v).map(item => item.i).slice(0, k)
};

console.log(kWeakestRows([[1,1,0,0,0],[1,1,1,1,0],[1,0,0,0,0],[1,1,0,0,0],[1,1,1,1,1]], 3))