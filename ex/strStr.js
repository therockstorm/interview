/*
Implement strStr().

Returns the index of the first occurrence of needle in haystack,
or -1 if needle is not part of haystack.

*/

const strStr = (haystack, needle) => {
  for (let i = 0; ; i++) {
    for (let j = 0; ; j++) {
      if (j === needle.length) return i;
      if (i + j === haystack.length) return -1;
      if (needle.charAt(j) !== haystack.charAt(i + j)) break;
    }
  }
};

console.log(strStr('aaa', ''));
