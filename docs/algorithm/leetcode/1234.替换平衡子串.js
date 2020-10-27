/**
 * @param {string} s
 * @return {number}
 */
var balancedString = function(s) {
  const map = {
    Q: 0,
    W: 0,
    E: 0,
    R: 0,
  }
  const newMap = {}

  const target = s.length / 4

  for (let char in map) {
    if (map[char] > 4) {
      newMap[char] = map[char] - 4
    }
  }

  let start = 0,
    end = 0,
    res = 1

  while (start < s.length && end < s.length) {
    const temp = judge(newMap)
    if (temp === 0) {
      res = Math.min(res, end - start)
      start+
    } else if (temp === 1) {
      end++
    } else {
      start++
    }
  }

  return res

  function judge(newMap) {
    let res = 0
    for (let char of newMap) {
      if (newMap[char] > 0) {
        res = 1
      } else if (newMap[char] < 0) {
        res = 2
      }
    }
    return res
  }
}
