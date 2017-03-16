const EMPTY = '-';
const X = 'X';
const O = 'O';

class AI {
  findMove(board) {
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board.length; j++) {
        if (board[i][j] === EMPTY) return [i, j];
      }
    }
    return false;
  }
}

class TicTacToe {
  constructor() {
    const dim = 3;
    this.ai = new AI();

    this.board = new Array(dim);
    for (let i = 0; i < dim; i++) {
      this.board[i] = Array.from(Array(dim)).map(() => EMPTY);
    }
  }

  play() {
    this.placePiece(0, 0, X);
    this.placePiece(1, 2, O);
    this.printBoard();
    // console.log(this.isBoardFull());
  }

  placePiece(x, y, piece) {
    if (this.board[x][y] === EMPTY) {
      this.board[x][y] = piece;
    }
  }

  printBoard() {
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board.length; j++) {
        process.stdout.write(this.board[i][j]);
        process.stdout.write((j + 1) % 3 !== 0 ? '|' : '');
      }
      process.stdout.write('\n');
    }
    process.stdout.write('\n');
  }

  isBoardFull() {
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board.length; j++) {
        if (this.board[i][j] === EMPTY) return false;
      }
    }
    return true;
  }
}

new TicTacToe().play();
