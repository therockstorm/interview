/*
Given array of length N+1 that contains items between 1 and N,
there must be at least one duplicate value. Find one of them,
in linear time. If the array is sorted, do it in log(n) time.
*/

const runUnsorted = (input) => {
  const s = new Set();

  for (let i = 0; i < input.length; i++) {
    const val = input[i];
    if (s.has(val)) return val;
    s.add(val);
  }
  return -1;
};

const runRec = (a, low, high) => {
  const mid = Math.floor((low + high) / 2);
  if (a[mid] === a[mid + 1] || a[mid] === a[mid - 1]) return a[mid];

  return a[mid] >= mid + 1 ? runRec(a, mid + 1, high) : runRec(a, low, mid - 1);
};

const run = (input) => runRec(input, 0, input.length - 1);

// n=5, length=6
console.log(runUnsorted([1, 2, 3, 4, 1, 5]));

// n=5, length=6
console.log(run([1, 1, 2, 3, 4, 5]));
console.log(run([1, 2, 2, 3, 4, 5]));
console.log(run([1, 2, 3, 3, 4, 5]));
console.log(run([1, 2, 3, 4, 4, 5]));
console.log(run([1, 2, 3, 4, 5, 5]));
console.log(run([2, 3, 4, 5, 5, 5]));
