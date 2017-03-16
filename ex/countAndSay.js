/*
The count-and-say sequence is the sequence of integers beginning as follows:
1, 11, 21, 1211, 111221, ...

1 is read off as "one 1" or 11.
11 is read off as "two 1s" or 21.
21 is read off as "one 2, then one 1" or 1211.
Given an integer n, generate the nth sequence.
*/

const countAndSay = (n) => {
  if (n === 0) return '';

  let say = '1';
  let count = 2;
  while (count <= n) {
    let newSay = '';
    for (let i = 0; i < say.length; i++) {
      const char = say.charAt(i);
      let charCnt = 1;
      i++;
      while (i < say.length && say.charAt(i) === char) {
        charCnt++;
        i++;
      }
      i--;
      newSay += charCnt + char;
    }
    say = newSay;
    count++;
  }

  return say;
};
