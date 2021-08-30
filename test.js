/**
 * @param {number[]} w
 */
var Solution = function (w) {
  let sum = 0,
    weights = [];

  for (let v of w) {
    sum += v;
    weights.push(sum);
  }

  this.weights = weights;
  this.sum = sum;
};

/**
 * @return {number}
 */
Solution.prototype.pickIndex = function () {
  const { sum, weights } = this;
  let randomNum = Math.floor(Math.random() * sum);
  for (let i = 0; i < weights.length; i++) {
    if (weights[i] > randomNum) {
      return i;
    }
  }
};

/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(w)
 * var param_1 = obj.pickIndex()
 */
