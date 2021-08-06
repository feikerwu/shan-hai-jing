/**
 * @param {number[][]} graph
 * @return {number}
 */
var shortestPathLength = function (graph) {
  const n = graph.length,
    queue = [];
  let visited = Array.from({ length: n }).map(_ => new Set());

  for (let i = 0; i < n; i++) {
    queue.push([i, 1 << i, 1]);
    visited[i].add(1 << i);
  }

  while (queue.length) {
    let [node, route, dist] = queue.shift();
    for (let next of graph[node]) {
      let nextRoute = route | (1 << next);

      if (nextRoute === (1 << n) - 1) {
        return dist;
      }

      if (!visited[next].has(nextRoute)) {
        queue.push([next, nextRoute, dist + 1]);
        visited[next].add(nextRoute);
      }
    }
  }

  return 0;
};

console.log(shortestPathLength([[1, 2, 3], [0], [0], [0]]));
