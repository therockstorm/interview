const max = 2147483647;
const min = -2147483648;
const zero = '0'.charCodeAt(0);
const nine = '9'.charCodeAt(0);

const isDigit = (s, i) => s.charCodeAt(i) >= zero && s.charCodeAt(i) <= nine;

const parse = (s) => {
  let idx = 0;

  if (s.length === 0) return 0;
  while (s.charAt(idx) === ' ' && idx < s.length) idx++;

  const maybeSign = s.charAt(idx);
  let sign = 1;
  if (maybeSign === '+' || maybeSign === '-') {
    if (maybeSign === '-') sign = -1;
    idx++;
  }

  let int = 0;
  while (idx < s.length) {
    if (!isDigit(s, idx)) break;
    int = (10 * int) + parseInt(s.charAt(idx), 10);
    idx++;
  }

  return int * sign;
};

const run = (s) => {
  const int = parse(s);
  if (isNaN(int)) return 0;
  if (int > max) return max;
  if (int < min) return min;
  return int;
};

[' ', '-11', ' 11', '  +11', '11abc', '11abc20', 'abc11', '2147483648', '-2147483649']
  .map(x => console.log(run(x)));

/*
const myAtoi = (s) => {
  const int = parseInt(s, 10);
  if (isNaN(int)) return 0;
  if (int > max) return max;
  if (int < min) return min;
  return int;
};
*/
