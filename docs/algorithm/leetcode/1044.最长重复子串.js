/*
 * @lc app=leetcode.cn id=1044 lang=javascript
 *
 * [1044] 最长重复子串
 */

// @lc code=start
/**
 * @param {string} S
 * @return {string}
 */
var longestDupSubstring = function (S) {
  const N = S.length;
  const set = new Set();
  let res = '';
  let start = 0,
    end = S.length - 1;
  let i = Math.floor((start + end) / 2);
  while (start <= end) {
    let pre = getInitValue(S.substring(0, i));
    // console.log(S.substring(0, i));
    set.add(pre);
    let term = '';
    for (let j = 1; j <= S.length - i; j++) {
      let next = getValue(code(S[j - 1]), pre, code(S[j + i - 1]), i);
      // console.log({ len: i, next, sub: S.substring(j, j + i) });
      if (set.has(next)) {
        // console.log(set);
        term = S.substring(j, j + i);
        res = res.length < term.length ? term : res;
      } else {
        set.add(next);
      }
      pre = next;
    }
    if (term) {
      start = i + 1;
    } else {
      end = i - 1;
    }
    i = Math.floor((start + end) / 2);
    set.clear();
  }
  return res;
};

const mod = Math.pow(2, 31);

const code = char => char.charCodeAt() - 'a'.charCodeAt() + 1;
const getValue = (preCode, value, nextCode, len) => {
  return ((value - preCode * AL(26, len - 1)) * 26 + nextCode) % mod;
};
const getInitValue = substr => {
  let init = 0;
  for (let i = 0; i < substr.length; i++) {
    init = ((init * 26) % mod) + code(substr[i]);
  }
  return init % mod;
};

const AL = (v, l) => {
  let init = 1;
  for (let i = 0; i < l; i++) {
    init = (init * v) % mod;
  }
  return init;
};
// @lc code=end

console.log(
  longestDupSubstring(
    'moplvidmaagmsiyyrkchbyhivlqwqsjcgtumqscmxrxrvwsnjjvygrelcbjgbpounhuyealllginkitfaiviraqcycjmskrozcdqylbuejrgfnquercvghppljmojfvylcxakyjxnampmakyjbqgwbyokaybcuklkaqzawageypfqhhasetugatdaxpvtevrigynxbqodiyioapgxqkndujeranxgebnpgsukybyowbxhgpkwjfdywfkpufcxzzqiuglkakibbkobonunnzwbjktykebfcbobxdflnyzngheatpcvnhdwkkhnlwnjdnrmjaevqopvinnzgacjkbhvsdsvuuwwhwesgtdzuctshytyfugdqswvxisyxcxoihfgzxnidnfadphwumtgdfmhjkaryjxvfquucltmuoosamjwqqzeleaiplwcbbxjxxvgsnonoivbnmiwbnijkzgoenohqncjqnckxbhpvreasdyvffrolobxzrmrbvwkpdbfvbwwyibydhndmpvqyfmqjwosclwxhgxmwjiksjvsnwupraojuatksjfqkvvfroqxsraskbdbgtppjrnzpfzabmcczlwynwomebvrihxugvjmtrkzdwuafozjcfqacenabmmxzcueyqwvbtslhjeiopgbrbvfbnpmvlnyexopoahgmwplwxnxqzhucdieyvbgtkfmdeocamzenecqlbhqmdfrvpsqyxvkkyfrbyolzvcpcbkdprttijkzcrgciidavsmrczbollxbkytqjwbiupvsorvkorfriajdtsowenhpmdtvamkoqacwwlkqfdzorjtepwlemunyrghwlvjgaxbzawmikfhtaniwviqiaeinbsqidetfsdbgsydkxgwoqyztaqmyeefaihmgrbxzyheoegawthcsyyrpyvnhysynoaikwtvmwathsomddhltxpeuxettpbeftmmyrqclnzwljlpxazrzzdosemwmthcvgwtxtinffopqxbufjwsvhqamxpydcnpekqhsovvqugqhbgweaiheeicmkdtxltkalexbeftuxvwnxmqqjeyourvbdfikqnzdipmmmiltjapovlhkpunxljeutwhenrxyfeufmzipqvergdkwptkilwzdxlydxbjoxjzxwcfmznfqgoaemrrxuwpfkftwejubxkgjlizljoynvidqwxnvhngqakmmehtvykbjwrrrjvwnrteeoxmtygiiygynedvfzwkvmffghuduspyyrnftyvsvjstfohwwyxhmlfmwguxxzgwdzwlnnltpjvnzswhmbzgdwzhvbgkiddhirgljbflgvyksxgnsvztcywpvutqryzdeerlildbzmtsgnebvsjetdnfgikrbsktbrdamfccvcptfaaklmcaqmglneebpdxkvcwwpndrjqnpqgbgihsfeotgggkdbvcdwfjanvafvxsvvhzyncwlmqqsmledzfnxxfyvcmhtjreykqlrfiqlsqzraqgtmocijejneeezqxbtomkwugapwesrinfiaxwxradnuvbyssqkznwwpsbgatlsxfhpcidfgzrc'
  )
);
