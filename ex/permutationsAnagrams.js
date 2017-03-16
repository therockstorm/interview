/*
Try each of the letters in turn as the first letter and then find all the permutations of the remaining letters using a recursive call.
*/

const permutations = (start, str) => {
  if (str.length === 1) return [start + str];

  const retResult = [];
  for (let i = 0; i < str.length; i++) {
    const result = permutations(str[i], str.substr(0, i) + str.substr(i + 1));
    for (let j = 0; j < result.length; j++) {
      retResult.push(start + result[j]);
    }
  }

  return retResult;
};

const permutations = str => permutations('', str);

console.log(permutations('dog'));

// ////////////////////////////////////
// Before implementing this, just toLowerCase().sort() and compare
// return s1.toLowerCase().split('').sort().join('') === s2.toLowerCase().split('').sort().join('');

// const normalize = str => str.replace(/[^A-Za-z]+/g, '').toLowerCase();

const isAna = (s1, s2) => {
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();
  const s1Len = s1.length;
  const s2Len = s2.length;
  if (s1Len !== s2Len) return false;

  const charCnt = Array.from(Array(26)).map(x => x = 0);
  for (let i = 0; i < s1Len; i++) charCnt[s1.charCodeAt(i) - 97]++;

  for (let j = 0; j < s2Len; j++) {
    const idx = s2.charCodeAt(j) - 97;
    if (!charCnt[idx]) return false;
    charCnt[idx]--;
  }

  return true;
}

console.log(isAna('the', 'het'));
console.log(isAna('dog', 'gog'));
