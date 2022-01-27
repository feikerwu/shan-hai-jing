/*
 * @lc app=leetcode.cn id=2047 lang=javascript
 *
 * [2047] 句子中的有效单词数
 */

// @lc code=start

/**
 * 排除法
 * 1. 有数字的肯定不是
 * 2. 有超过两个连字符的肯定不是
 * 3. 有标点且标点不在末尾的肯定不是
 * 4. 如果有连字符，但是连字符两边不是小写字母的肯定不是
 */
/**
 * @param {string} sentence
 * @return {number}
 */
var countValidWords = function (sentence) {
  const words = sentence.split(/\s+/).filter(v => v !== '');

  let count = 0;

  console.log(words);

  for (let word of words) {
    let flag = true;

    if (/\d/.test(word)) {
      flag = false;
    }

    if (word.match(/-/g) && word.match(/-/g).length >= 2) {
      flag = false;
    }

    if (/-/g.test(word) && !/[a-z]-[a-z]/.test(word)) {
      flag = false;
    }

    const punctuation = /,|\!|\./g;
    if (word.match(punctuation) && word.match(punctuation).length >= 2) {
      flag = false;
    }

    if (
      punctuation.test(word) &&
      word.search(punctuation) !== word.length - 1
    ) {
      flag = false;
    }

    if (flag) {
      console.log(word);
    }
    count += Number(flag);
  }

  // console.log(count);
  return count;
};
// @lc code=end

countValidWords('!g 3 !sy ');

// const punctuation = /,|!|\./;
// let word = 'pencils,';
// console.log(punctuation.test(word));
// console.log(word.substring(word.length - 1));
// console.log(punctuation.test(word.substring(word.length - 1).toString()));

// console.log(punctuation.test(','));
