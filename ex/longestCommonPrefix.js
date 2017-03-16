/*

['abc', 'abq', 'abq'] => 'ab'
['abc', 'abc', 'abc'] => 'abc'
['abc', 'b', 'c'] => ''

 */

const longestCommonPrefix = (strings) => {
  let prefix = '';
  let strIdx = 0;
  let charIdx = 0;
  let char = false;

  while (true) {
    const cur = strings[strIdx];
    if (charIdx >= cur.length) break;

    if (!char) char = cur.charAt(charIdx);
    else if (cur.charAt(charIdx) !== char) break;

    if (strIdx === strings.length - 1) {
      strIdx = 0;
      charIdx++;
      prefix += char;
      char = false;
    } else strIdx++;
  }

  return prefix;
};

[['abc', 'abq', 'abq'], ['abc', 'abc', 'abc'], ['abc', 'b', 'c']].map(x => console.log(longestCommonPrefix(x)));
