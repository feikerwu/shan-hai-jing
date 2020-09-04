function largestRange(array) {
  let map = {}
  for (let num of array) {
    map[num] = 1
  }

  let [start, end] = [array[0], array[0]]
  for (let cur of array) {
    if (map[cur]) {
      let [newStart, newEnd] = [cur, cur]
      while (map[++newEnd]) {
        map[newEnd] = 0
      }
      while (map[--newStart]) {
        map[newStart] = 0
      }

      if (newEnd - newStart - 2 > end - start) {
        start = newStart + 1
        end = newEnd - 1
      }
    }
  }

  return [start, end]
}

// Do not edit the line below.
exports.largestRange = largestRange
