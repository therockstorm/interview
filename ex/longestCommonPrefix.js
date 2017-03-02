/*

['abc', 'abq', 'abq'] => 'ab'
['abc', 'abc', 'abc'] => 'abc'
['abc', 'b', 'c'] => ''

 */

const longestCommonPrefix = (strings) => {
  let prefix = '';
  let i = 0;
  let j = 0;
  let char = false;

  while (true) {
    const cur = strings[i];
    if (j >= cur.length) break;

    if (!char) char = cur.charAt(j);
    else if (cur.charAt(j) !== char) break;

    if (i === strings.length - 1) {
      i = 0;
      j++;
      prefix += char;
      char = false;
    } else i++;
  }

  return prefix;
};

[['abc', 'abq', 'abq'], ['abc', 'abc', 'abc'], ['abc', 'b', 'c']].map(x => console.log(longestCommonPrefix(x)));
