/**
 * @param {number} n
 * @param {number[]} blacklist
 */
var Solution = function(n, blacklist) {
  const len = blacklist.length
  const limit = n - len
  const blackSet = new Set(blacklist)

  let term = []
  for (let i = limit; i < n; i++) {
    if (blackSet.has(i)) {
      blackSet.delete(i)
    } else {
      term.push(i)
    }
  }

  let m = {}, j = 0;

  for (let v of blackSet) {
    if (v < limit) {
      m[v] = term[j++]
    }
  }

  this.limit = limit
  this.map = m
  this.blackSet = blackSet
};

/**
 * @return {number}
 */
Solution.prototype.pick = function() {
  const { limit, map, blackSet } = this

  const randomValue = Math.floor(Math.random() * limit)

  return blackSet.has(randomValue) ? map[randomValue] : randomValue

};

/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(n, blacklist)
 * var param_1 = obj.pick()
 */