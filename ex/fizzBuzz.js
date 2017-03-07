/*
 */

const run = n => (
  Array.from(Array(n)).map((_, x) => {
    const i = x + 1;
    if (i % 15 === 0) return 'FizzBuzz';
    if (i % 3 === 0) return 'Fizz';
    if (i % 5 === 0) return 'Buzz';
    return i.toString();
  }));

[15].map(x => console.log(run(x)));

module.exports = run;
