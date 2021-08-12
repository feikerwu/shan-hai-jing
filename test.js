/**
 * @param {number[]} nums
 * @return {number}
 */
var numberOfArithmeticSlices = function (nums) {
  let { length: len } = nums;
  const mapArr = Array.from(nums);

  for (let i = 0; i < len; i++) {
    let curMap = new Map();
    for (let j = 0; j < i; j++) {
      let d = nums[i] - nums[j];
      const preMap = mapArr[j];
      let curCount = curMap.get(d) || 0;
      curCount = 1 + curCount + (preMap.get(d) || 0);
      curMap.set(d, curCount);
    }
    mapArr[i] = curMap;
  }

  let total = 0;
  for (let map of mapArr) {
    for (let [k, v] of map) {
      total += v;
    }
  }

  return total - (len * (len - 1)) / 2;
};

console.log(numberOfArithmeticSlices([2, 4, 6, 8, 10]));
