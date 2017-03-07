/*
 */

const run = x => {
  console.log(x);
  return true;
};

[''].map(x => console.log(run(x)));

module.exports = run;
