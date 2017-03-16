/*
Create 2-dim array, each cell is either (bomb/number/empty) and (revealed/not)
On board generation, randomly select numMines spots and update surrounding cell numbers

Accept user input for x,y loc, mark revealed, end game if bomb
Display user output of board, 'Bomb hit' (lose), 'Big winner' if only bombs left (win)

Flag/protect cells
*/

const readline = require('readline');

const getRandomInt = max => Math.floor(Math.random() * max);
const getRandomIntPair = max => [getRandomInt(max), getRandomInt(max)];
const write = msg => process.stdout.write(msg);
const writeNewline = msg => (msg ? write(`${msg}\n`) : write('\n'));

const create2dArray = (x, y, value) => {
  const board = new Array(x);
  for (let i = 0; i < y; i++) {
    board[i] = Array.from(new Array(y), () => Object.assign({}, value));
  }
  return board;
};

class Minesweeper {
  constructor() {
    const boardDim = 3;
    const numMines = 1;

    this.prompt = true;
    this.gameOver = false;
    this.visibleCells = 0;
    this.winningCells = (boardDim * boardDim) - numMines;
    this.generateBoard(boardDim, numMines);
    this.rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  }

  play() {
    writeNewline('Welcome to Minesweeper!');
    this.printBoard();

    setInterval(() => {
      if (this.gameOver) {
        this.rl.close();
        process.exit();
      } else if (this.prompt) this.prompUser();
    }, 500);
  }

  generateBoard(boardDim, numMines) {
    this.board = create2dArray(boardDim, boardDim, {
      bomb: false,
      num: 0,
      visible: false
    });
    const mines = [];

    while (numMines > 0) {
      const pair = getRandomIntPair(boardDim);
      if (!mines.find(m => m[0] === pair[0] && m[1] === pair[1])) {
        mines.push(pair);
        numMines--;
      }
    }

    for (let row = 0; row < boardDim; row++) {
      for (let col = 0; col < boardDim; col++) {
        if (mines.find(loc => loc[0] === row && loc[1] === col)) {
          this.board[row][col].bomb = true;
          this.updateNeighbors(row, col);
        }
      }
    }
  }

  updateNeighbors(row, col) {
    this.updateIfExists(row - 1, col);
    this.updateIfExists(row - 1, col - 1);
    this.updateIfExists(row - 1, col + 1);
    this.updateIfExists(row + 1, col);
    this.updateIfExists(row + 1, col + 1);
    this.updateIfExists(row + 1, col - 1);
    this.updateIfExists(row, col - 1);
    this.updateIfExists(row, col + 1);
  }

  updateIfExists(row, col) {
    if (this.board[row]) {
      const cell = this.board[row][col];
      if (cell && !cell.bomb) cell.num += 1;
    }
  }

  printBoard() {
    const boardDim = this.board.length;
    writeNewline();

    for (let row = 0; row < boardDim; row++) {
      for (let col = 0; col < boardDim; col++) {
        const cell = this.board[row][col];
        const display = cell.bomb ? 'X' : cell.num.toString();
        write(cell.visible || this.gameOver ? `${display} ` : '□ ');
      }
      writeNewline();
    }

    writeNewline();
  }

  prompUser() {
    this.prompt = false;
    this.rl.question('Which cell (as space separated row/column pair)? ', (cell) => {
      this.playCell(cell);
      this.printBoard();
      this.prompt = true;
    });
  }

  playCell(playerCell) {
    const nums = (playerCell || '').split(' ').map(x => parseInt(x, 10));
    if (nums.length === 2 && this.isValid(nums[0]) && this.isValid(nums[1])) {
      const cell = this.board[nums[0]][nums[1]];
      cell.visible = true;
      this.visibleCells++;
      if (cell.bomb) {
        writeNewline('Bomb hit!');
        this.gameOver = true;
      } else if (this.visibleCells === this.winningCells) {
        writeNewline('Big winner!');
        this.gameOver = true;
      }
      return;
    }
    writeNewline('Invalid cell');
  }

  isValid(num) {
    const max = this.board.length;
    return !isNaN(num) && num >= 0 && num < max;
  }
}

module.exports = Minesweeper;
new Minesweeper().play();
