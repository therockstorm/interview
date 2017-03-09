/*
Given string, determin if it contains an palindrome

abracecarde
edracecarba

...
On^3
*/

/*
const extend = (s, left, right) => {
  while (left >= 0 && right < s.length && s.charAt(left) === s.charAt(right)) {
    left--;
    right++;
  }
  return right - left - 1;
};

const longestPalindrome = (s) => {
  let start = 0;
  let end = 0;
  for (let i = 0; i < s.length; i++) {
    const len = Math.max(extend(s, i, i), extend(s, i, i + 1));
    if (len > end - start) {
      start = i - Math.floor((len - 1) / 2);
      end = i + (len / 2);
    }
  }
  return s.substring(start, end + 1);
};
*/

const reverse = s => s.split('').reverse().join('');
const strIfPalidrome = s => (s === reverse(s) ? s : '');

const longestPalindrome = (s) => {
  let max = strIfPalidrome(s);
  for (let i = 0; i < s.length; i++) {
    for (let j = i; j < s.length; j++) {
      const p = strIfPalidrome(s.substr(i, j));
      if (p.length > max.length) max = p;
    }
  }
  return max;
};

console.log(longestPalindrome('babaddtattarrattatddetartrateedredividerb')); // ddtattarrattatdd
console.log(longestPalindrome('racecar')); // racecar
console.log(longestPalindrome('xxracecar')); // racecar
console.log(longestPalindrome('racecarxx')); // racecar
console.log(longestPalindrome('yracecarxx')); // racecar
console.log(longestPalindrome('rxacecar')); // aceca
