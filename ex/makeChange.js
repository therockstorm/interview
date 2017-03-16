/*
Given decimal amount, make change in US currency using fewest amount of bills/coins

$37.61
20,10,5,1,1,.25,.25,.1,.01

Array of bills and coins, starting with 100. Loop through, if >= val, push to array, else inc i
*/

const run = (amount) => {
  const currency = [10000, 5000, 2000, 1000, 500, 100, 25, 10, 5, 1];
  const change = [];

  let i = 0;
  while (i < currency.length && amount !== 0) {
    const c = currency[i];
    if (amount >= c) {
      change.push(c);
      amount -= c;
    } else i++;
  }

  console.log(change.map(x => x / 100).toString());
};

module.exports = run;
run(3761);
