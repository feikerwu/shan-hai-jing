/**
 * 分类讨论两种情况
 * case1: 存在出度为2的节点
 * case2: 有向图存在边, 并查集找到环边
 * @param {number[][]} edges
 * @return {number[]}
 */
var findRedundantDirectedConnection = function(edges) {
  let degrees = Array.from(edges).fill(0)
  // 找到入度为2的
  for (let [u, v] of edges) {
    degrees[v - 1]++
  }

  let node,
    father,
    maybe = []
  for (let i = 0; i < degrees.length; i++) {
    if (degrees[i] === 2) {
      node = i + 1
    }
  }
  for (let i = edges.length - 1; i >= 0; i--) {
    let [u, v] = edges[i]
    if (v === node) {
      maybe.push([u, v])
    }
  }

  if (node) {
    let [e1, e2] = maybe

    return judge(e1) ? e1 : e2
  }

  father = init()
  for (let [u, v] of edges) {
    if (find(u) === find(v)) {
      return [u, v]
    }
    union(find(u), find(v))
  }

  return [-1, -1]

  function init() {
    let father = Array.from({ length: edges.length + 1 }).map((v, i) => i)
    return father
  }

  // 并查集
  function find(x) {
    if (father[x] !== x) {
      father[x] = find(father[x])
    }
    return father[x]
  }

  function union(x, y) {
    if (find(x) !== find(y)) {
      father[find(x)] = find(y)
    }
  }

  function judge(e) {
    father = init()
    for (let i = 0; i < edges.length; i++) {
      let [u, v] = edges[i]
      if (u === e[0] && v === e[1]) {
        continue
      }
      if (find(u) === find(v)) {
        // console.log('hell', [u, v], find(u), find(v))
        return false
      }
      union(u, v)
    }
    return true
  }
}

console.log(
  findRedundantDirectedConnection([
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 1],
    [1, 5],
  ])
)
