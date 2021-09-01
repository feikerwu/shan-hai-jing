/**
 * @param {string} version1
 * @param {string} version2
 * @return {number}
 */
var compareVersion = function (version1, version2) {
  let flag = 0;

  let ver1 = version1.split('.');
  let ver2 = version2.split('.');

  for (let i = 0; i < Math.max(ver1.length, ver2.length); i++) {
    let cur1 = ver1[i] ?? 0,
      cur2 = ver2[i] ?? 0;

    cur1 = parseToNumber(cur1);
    cur2 = parseToNumber(cur2);

    if (cur1 !== cur2) {
      return cur1 > cur2 ? 1 : -1;
    }
  }

  return flag;
};

function parseToNumber(value) {
  if (typeof value === 'number') {
    return value;
  }

  value = value.replace(/^0+/, '');

  return Number(value);
}

console.log(compareVersion('1.01', '1.001'));
