/**
 * @param {number[][]} points
 * @return {number}
 */
var numberOfBoomerangs = function(points) {
  let mapArr = points.map(() => new Map())
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      let dd = getDistance(points[i], points[j])
      mapArr[i].set(dd, mapArr[i].get(dd) ? mapArr[i].get(dd) + 1 : 1)
      mapArr[j].set(dd, mapArr[j].get(dd) ? mapArr[j].get(dd) + 1 : 1)
    }
  }


  let res = 0
  for (let curMap of mapArr) {
    for (let [d, num] of curMap) {
      console.log({d, num})
      if (num >= 2) {
        res += num * (num - 1)
      }
    }
  }

  return res
};

// 因为拿distance只为比较, 并不需要真实计算，可以用 distance * distance 表示
function getDistance(p1, p2) {
  const [x1, y1] = p1
  const [x2, y2] = p2
  return (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)
}


console.log(numberOfBoomerangs([[0,0],[1,0],[2,0]]))