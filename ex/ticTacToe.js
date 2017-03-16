/*
Build tic-tac-toe

xCreate board
xDisplay board
xAlternate accepting user input from 'x' and 'o', don't overwrite spot
x3 in a row wins for player and clears board
xFull board clears board

*/
const readline = require('readline');

const X = 'X ';
const O = 'O ';
const CAT = 'CAT';

class TicTacToe {
  constructor() {
    this.rl = readline.createInterface({ input: process.stdin, output: process.stdout });

    const dim = 3;
    this.board = new Array(dim); // y
    for (let i = 0; i < dim; i++) {
      this.board[i] = new Array(dim); // x
    }
    this.resetAndPrint();
  }

  promptUser() {
    this.rl.question(`Player ${this.isXTurn ? 'X' : 'O'}, make a selection: `, (ans) => {
      this.handleInput(ans);
    });
  }

  resetAndPrint() {
    this.isXTurn = true;
    this.spacesPlayed = 0;
    let cnt = 1;
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board.length; j++) {
        this.board[i][j] = `${cnt} `;
        cnt++;
      }
    }
    this.printBoard();
  }

  printBoard() {
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board.length; j++) {
        this.rl.write(this.board[i][j]);
      }
      this.rl.write('\n');
    }
    this.rl.write('\n');
  }

  handleInput(input) {
    if (input) {
      const choice = parseInt(input, 10);
      if (!isNaN(choice) && choice > 0 && choice < 10) {
        const x = Math.floor((choice - 1) / 3);
        const y = (choice - 1) % 3;
        if (this.board[x][y] !== X && this.board[x][y] !== O) {
          this.board[x][y] = this.isXTurn ? X : O;
          this.isXTurn = !this.isXTurn;
          this.spacesPlayed++;

          this.printBoard();
          const result = this.gameOver();
          if (result) {
            if (result === CAT) this.rl.write('Cats game! Next round:\n');
            else if (result === X) this.rl.write('X wins! Next round:\n');
            else if (result === O) this.rl.write('O wins! Next round:\n');
            this.resetAndPrint();
          }
          this.promptUser();
          return;
        }
      }
    }
    this.rl.write('Invalid input. Please try again.\n');
    this.promptUser();
  }

  gameOver() {
    if (this.spacesPlayed < 5) return false;
    const r = this.checkRows();
    if (r) return r;
    const c = this.checkColumns();
    if (c) return c;
    const d = this.checkDiagonals();
    if (d) return d;
    if (this.spacesPlayed === 9) return CAT;
    return false;
  }

  checkRows() {
    for (let i = 0; i < this.board.length; i++) {
      if (this.checkRow(i, X)) return X;
      if (this.checkRow(i, O)) return O;
    }
    return false;
  }

  checkColumns() {
    for (let i = 0; i < this.board.length; i++) {
      if (this.checkColumn(i, X)) return X;
      if (this.checkColumn(i, O)) return O;
    }
    return false;
  }

  checkDiagonals() {
    if (this.checkDiagonalsFor(X)) return X;
    if (this.checkDiagonalsFor(O)) return O;
    return false;
  }

  checkRow(x, val) {
    return this.match(x, 0, val) && this.match(x, 1, val) && this.match(x, 2, val);
  }

  checkColumn(y, val) {
    return this.match(0, y, val) && this.match(1, y, val) && this.match(2, y, val);
  }

  checkDiagonalsFor(val) {
    if (!this.match(1, 1, val)) return false;
    return (this.match(0, 0, val) && this.match(2, 2, val)) ||
      (this.match(0, 2, val) && this.match(2, 0, val));
  }

  match(x, y, val) {
    return this.board[x][y] === val;
  }
}

module.exports = TicTacToe;
new TicTacToe().promptUser();
