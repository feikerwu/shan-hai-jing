/**
 * @param {string} moves
 * @return {boolean}
 */
var judgeCircle = function(moves) {
  let m = {
    L: 0,
    R: 0,
    U: 0,
    D: 0,
  }

  for (let c of moves) {
    m[c]++
  }

  return m.L === m.R && m.U === m.D
}
