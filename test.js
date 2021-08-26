/**
 * @param {number[]} people
 * @param {number} limit
 * @return {number}
 */
var numRescueBoats = function (people, limit) {
  people.sort((a, b) => a - b);
  let totalCount = 0,
    start = 0,
    end = people.length - 1;

  while (start <= end) {
    if (people[start] + people[end] <= limit) {
      start++;
    }
    end--;
    totalCount++;
  }

  return totalCount;
};

numRescueBoats([3, 2, 2, 1], 3);
