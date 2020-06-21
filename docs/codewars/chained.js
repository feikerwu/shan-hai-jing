/**
 * https://www.codewars.com/kata/54ca3e777120b56cb6000710/train/javascript
 */

function chained(functions) {
  return functions.reduce((acc, cur) => {
    return (...args) => cur(acc(...args));
  });
}
