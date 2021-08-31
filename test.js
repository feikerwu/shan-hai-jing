/**
 * @param {number[][]} bookings
 * @param {number} n
 * @return {number[]}
 */
var corpFlightBookings = function (bookings, n) {
  let seats = Array.from({ length: n }).fill(0);

  // 计算每个航班新增的seat数 (ps: 可正可负)
  for (let [start, end, seat] of bookings) {
    seats[start - 1] += seat;
    if (end < n) {
      seats[end] -= seat;
    }
  }

  // 前缀和
  for (let i = 0; i < n - 1; i++) {
    seats[i + 1] += seats[i];
  }
  return seats;
};

corpFlightBookings(
  [
    [1, 2, 10],
    [2, 3, 20],
    [2, 5, 25],
  ],
  5
);
