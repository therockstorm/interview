const romanToInt = (s) => {
  const numerals = new Map();
  numerals.set('I', 1);
  numerals.set('V', 5);
  numerals.set('X', 10);
  numerals.set('L', 50);
  numerals.set('C', 100);
  numerals.set('D', 500);
  numerals.set('M', 1000);

  let sum = numerals.get(s.charAt(s.length - 1));
  for (let i = s.length - 2; i >= 0; --i) {
    const n = numerals.get(s.charAt(i));
    if (n < numerals.get(s.charAt(i + 1))) sum -= n;
    else sum += n;
  }

  return sum;
};

console.log(romanToInt('I'));   // 1
console.log(romanToInt('III')); // 3
console.log(romanToInt('IV'));  // 4
console.log(romanToInt('VI'));  // 6
console.log(romanToInt('XL'));  // 40
console.log(romanToInt('XCI')); // 91