/**
 * @param {number[][]} graph
 * @return {number[][]}
 */
var allPathsSourceTarget = function (graph) {
  const allPaths = [],
    curPath = [];

  dfs(0, curPath);

  return allPaths;

  function dfs(source, curPath) {
    curPath.push(source);

    if (source === graph.length - 1) {
      allPaths.push(curPath.slice());
    }

    for (let next of graph[source]) {
      dfs(next, curPath);
    }

    curPath.pop();
  }
};

console.log(allPathsSourceTarget([[1, 2], [3], [3], []]));
