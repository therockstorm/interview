/*
  const n = str.length;
  if (n === 1) console.log(start + str);

  for (let i = 0; i < n; i++) {
    anagrams(start + str.charAt(i), str.substring(0, i) + str.substring(i + 1, n));
  }
*/

const anagrams = (start, str) => {
  if (str.length === 1) return [start + str];

  const retResult = [];
  for (let i = 0; i < str.length; i++) {
    const result = anagrams(str[i], str.substr(0, i) + str.substr(i + 1));
    for (let j = 0; j < result.length; j++) {
      retResult.push(start + result[j]);
    }
  }

  return retResult;
};

const permutations = str => anagrams('', str);

console.log(permutations('dog'));

// ////////////////////////////////////

// first sort them
const normalize = str => str.replace(/[^A-Za-z]+/g, '').toLowerCase();

const isAnagram = (s1, s2) => {
  const normalS1 = normalize(s1);
  const normalS2 = normalize(s2);
  const s1Length = normalS1.length;
  const s2Length = normalS2.length;

  if (s1Length !== s2Length) return false;

  const counts = [];
  for (let i = 0; i < s1Length; i++) {
    const index = normalS1.charCodeAt(i) - 97;
    counts[index] = (counts[index] || 0) + 1;
  }

  for (let i = 0; i < s2Length; i++) {
    const index = normalS2.charCodeAt(i) - 97;
    if (!counts[index]) return false;
    counts[index]--;
  }

  return true;
};

console.log(isAnagram('th1e', 'he2t'));
console.log(isAnagram('dog', 'gog'));
