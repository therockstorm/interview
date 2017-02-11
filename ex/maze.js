const fs = require('fs');
/*
Accept maze from file and solve

Do I know start? End? When do I konw I'm done?
No diagonal?
Square?

Graph. Each node full/empty, empty has list of empty neighbors, set to checked if all visited, dfs
Store list of steps taken and print on win
Print 'unsolvable' on lose

*/

let maze;

const isEmpty = (pair) => {
  if (!maze[pair[0]]) return false;

  const cell = maze[pair[0]][pair[1]];
  return cell && cell.isEmpty;
};

const addIfEmpty = (mazePair, neighborPair) => {
  if (isEmpty(neighborPair)) {
    maze[mazePair[0]][mazePair[1]].emptyNeighbors.push(neighborPair);
  }
};

const findEmptyNeighbors = (pair) => {
  maze[pair[0]][pair[1]].emptyNeighbors = [];
  if (!maze[pair[0]][pair[1]].isEmpty) return;
  addIfEmpty(pair, [pair[0], pair[1] - 1]);
  addIfEmpty(pair, [pair[0], pair[1] + 1]);
  addIfEmpty(pair, [pair[0] - 1, pair[1]]);
  addIfEmpty(pair, [pair[0] + 1, pair[1]]);
};

const dfs = (pair) => {
  const node = maze[pair[0]][pair[1]];
  if (!node || !node.isEmpty) return;
  console.log(pair);
  node.visted = true;

  node.emptyNeighbors.forEach((x) => {
    const neighbor = maze[x[0]][x[1]];
    if (!neighbor.visted) dfs(x);
  });
};

const run = (input) => {
  const lines = input.split('\n');
  const dim = lines[0].length;
  maze = new Array(dim);
  const defVal = {
    isEmpty: false,
    visted: false
  };
  for (let i = 0; i < dim; i++) {
    maze[i] = Array.from(new Array(dim)).map(() => Object.assign({}, defVal));
  }

  lines.forEach((row, i) => {
    for (let j = 0; j < dim; j++) {
      if (row.charAt(j) !== '#') maze[i][j].isEmpty = true;
    }
  });

  for (let i = 0; i < dim; i++) {
    for (let j = 0; j < dim; j++) {
      findEmptyNeighbors([i, j]);
    }
  }

  dfs([1, 0]);
};

module.exports = run;
run(fs.readFileSync('./maze.txt').toString());
