/**
 * @param {string} s
 * @return {string}
 */
var reverseVowels = function (s) {
  s = s.split('');

  let vowels = new Set(['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']);

  let start = 0,
    end = s.length - 1;

  while (start < end) {
    while (start < end && !vowels.has(s[start])) {
      start++;
    }

    while (start < end && !vowels.has(s[end])) {
      end--;
    }

    swap(s, start++, end--);
  }

  return s.join('');
};

function swap(s, a, b) {
  let term = s[a];
  s[a] = s[b];
  s[b] = term;
}

console.log(reverseVowels('hello'));
