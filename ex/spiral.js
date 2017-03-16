/*
 1

 1 2
 4 3

 7 8 9
 6 1 2
 5 4 3

  7  8  9 10
  6  1  2 11
  5  4  3 12
 16 15 14 13
*/

const origin = (size) => {
  const adj = size % 2 === 0 ? 1 : 0;
  return [Math.floor((size / 2) - adj), Math.floor((size / 2) - adj)];
};

const right = p => [p[0], p[1] + 1];
const left = p => [p[0], p[1] - 1];
const up = p => [p[0] - 1, p[1]];
const down = p => [p[0] + 1, p[1]];

const print = (spiral) => {
  const dim = spiral.length;
  for (let row = 0; row < dim; row++) {
    for (let col = 0; col < dim; col++) {
      const val = (spiral[row][col] || '').toString();
      process.stdout.write(` ${val} `.slice(-3));
    }
    process.stdout.write('\n');
  }
};

const run = (size) => {
  const dim = Math.ceil(Math.sqrt(size));
  const spiral = new Array(dim);
  for (let i = 0; i < dim; i++) {
    spiral[i] = new Array(dim);
  }

  let curr = origin(dim);
  let steps = 0;
  spiral[curr[0]][curr[1]] = 1;

  for (let x = 2; x <= size; x++) {
    steps++;
    if (x % 2 === 0) {
      curr = right(curr);
      spiral[curr[0]][curr[1]] = x;
      for (let y = 0; y < steps; y++) {
        if (x + 1 <= size) {
          x++;
          curr = down(curr);
          spiral[curr[0]][curr[1]] = x;
        }
      }
      for (let y = 0; y < steps; y++) {
        if (x + 1 <= size) {
          x++;
          curr = left(curr);
          spiral[curr[0]][curr[1]] = x;
        }
      }
    } else {
      curr = left(curr);
      spiral[curr[0]][curr[1]] = x;
      for (let y = 0; y < steps; y++) {
        if (x + 1 <= size) {
          x++;
          curr = up(curr);
          spiral[curr[0]][curr[1]] = x;
        }
      }
      for (let y = 0; y < steps; y++) {
        if (x + 1 <= size) {
          x++;
          curr = right(curr);
          spiral[curr[0]][curr[1]] = x;
        }
      }
    }
  }

  print(spiral);
  return spiral;
};

module.exports = run;
run(78);
