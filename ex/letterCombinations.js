/*
Given a digit string, return all possible letter combinations that the number could represent.
 */

const MAPPING = ['0', '1', 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz'];

const phoneMapping = digits => {
  if (!digits || !digits.length) return [];
  let res = [];
  res.push('');

  for (let i = 0; i < digits.length; i++) {
    const tempRes = [];
    const chars = MAPPING[parseInt(digits.charAt(i), 10)].split('');
    chars.forEach(c => res.forEach(r => tempRes.push(r + c)));
    res = tempRes;
  }

  return res;
};

['23'].map(x => console.log(phoneMapping(x)));
