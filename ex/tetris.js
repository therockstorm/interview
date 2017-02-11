/*
Build Tetris

 XX  XX   XXX  XXXX  XXX  XXX  XX
XX    XX   X         X      X  XX

x5x10 board, displayed
xMove 'I' down in loop, collision with bottom
xAccept user input
xMove piece left/right, collisions
xRotate piece clockwise, collisions
xStart new 'I' down
Collision with other pieces
Lose if pieces reach top
Clear lines
Remaining 6 pieces

Avoid draw errors by calculaing all renders in set interval and only then performing
Levels after ceratin lines cleared, speeds up, eventually win
Increase speed of decent while holding down
Diplay on-deck piece
Rotate counter-clockwise
Colors

*/

const readline = require('readline');

// const randomInt = max => Math.floor(Math.random() * max);

const INACTIVE = 0;
const ACTIVE = 1;
const TAKEN = 2;

class Piece {
  constructor(board) {
    this.x = 1;
    this.y = 0;
    this.width = 4;
    this.rotation = 0;
    this.board = board;
    this.maxY = this.board.length - 1;
    this.maxX = this.board[0].length - 1;
    this.active = true;
  }

  moveDown() {
    if (this.rotation === 0 && this.y + 1 > this.maxY) this.render(TAKEN);
    else if (this.rotation === 90 && this.y + this.width > this.maxY) this.render(TAKEN);
    else {
      if (this.y >= 0) this.render(INACTIVE);
      this.y += 1;
      this.render(ACTIVE);
    }
  }

  moveRight() {
    if (this.rotation === 0 && this.x + this.width > this.maxX) return;
    else if (this.rotation === 90 && this.x + 1 > this.maxX) return;
    this.render(INACTIVE);
    this.x += 1;
    this.render(ACTIVE);
  }

  moveLeft() {
    if (this.x - 1 < 0) return;
    this.render(INACTIVE);
    this.x -= 1;
    this.render(ACTIVE);
  }

  rotateCw() {
    if (this.y - 2 < 0) return;
    this.render(INACTIVE);
    if (this.rotation === 0) {
      this.y -= 2;
      this.rotation = 90;
    } else {
      this.y += 2;
      this.rotation = 0;
    }
    this.render(ACTIVE);
  }

  render(state) {
    if (this.rotation === 0) {
      for (let i = this.x; i < this.x + this.width; i++) {
        this.setState(this.board[this.y][i], state);
      }
    } else if (this.rotation === 90) {
      for (let i = this.y; i < this.y + this.width; i++) {
        this.setState(this.board[i][this.x], state);
      }
    }
  }

  setState(cell, state) {
    if (state === ACTIVE) cell.active = true;
    else if (state === INACTIVE) cell.active = false;
    else if (state === TAKEN) {
      cell.active = false;
      cell.taken = true;
      this.active = false;
    }
  }
}

class Tetris {
  constructor() {
    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);
    process.stdin.on('keypress', this.handleInput.bind(this));

    const height = 10;
    const width = 5;
    const defVal = { taken: false, active: false };
    this.board = new Array(height);
    for (let i = 0; i < height; i++) {
      this.board[i] = Array.from(Array(width)).map(() => Object.assign({}, defVal));
    }

    this.piece = new Piece(this.board);
  }

  play() {
    setInterval(() => {
      this.piece.moveDown();
      this.printBoard();
      if (!this.piece.active) this.piece = new Piece(this.board);
    }, 500);
  }

  printBoard() {
    for (let i = 0; i < this.board.length; i++) { // 10
      for (let j = 0; j < this.board[0].length; j++) { // 5
        const cell = this.board[i][j];
        process.stdout.write(cell.taken ? '▤ ' : (cell.active ? '● ' : '□ '));
      }
      process.stdout.write('\n');
    }
    process.stdout.write('\n');
  }

  handleInput(str, key) {
    if (key.sequence === '\u0003') process.exit();
    if (key.sequence === '\u001B\u005B\u0041') this.piece.rotateCw();
    if (key.sequence === '\u001B\u005B\u0043') this.piece.moveRight();
    if (key.sequence === '\u001B\u005B\u0044') this.piece.moveLeft();
  }
}

module.exports = Tetris;

new Tetris().play();
