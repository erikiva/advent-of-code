const { Computer } = require("./computer");
const data = require("./input");

const addToBoard = (x, y, piece, board) => {
  if (!board[y]) {
    board[y] = [];
  }
  let pieceRep = " ";
  switch (piece) {
    case 0:
      break;
    case 1:
      pieceRep = "\u2509";
      break;
    case 2:
      pieceRep = "\u2588";
      break;
    case 3:
      pieceRep = "\u2583";
      break;
    case 4:
      pieceRep = "\u257b";
      break;
  }
  board[y][x] = pieceRep;
};

const calculateNext = (x, y, previousBall, currentPad) => {
  if (x > currentPad[0]) {
    return 1;
  } else if (x < currentPad[0]) {
    return -1;
  }
  return 0;
};

const printBoard = board => {
  board.forEach(row => {
    console.log(row.join(""));
  });
};

function paintGame(initialInput) {
  // initialize everything
  let currentColor = initialInput ? initialInput : [];
  let inputs = [];
  const game = new Computer(data, inputs);
  let resume = true;
  let step = "getx";
  let blocks = {};
  let board = [];
  let uniqueBlocks = 0;
  let totalBlocks = 0;
  let x;
  let y;
  let piece;
  let coords;
  let previousBall = [];
  let currentPad = [];
  while (resume) {
    resume = game.calculateInstructions();
    if (step == "getx") {
      x = game.output;
      step = "gety";
    } else if (step == "gety") {
      y = game.output;
      step = "getpiece";
    } else if (step == "getpiece") {
      piece = game.output;
      coords = `${x}_${y}`;
      console.log("whole instruction read: ", coords, piece);
      addToBoard(x, y, piece, board);
      if (blocks[coords]) {
        blocks[coords].push(piece);
        if (piece == 2) {
          totalBlocks++;
        }
      } else {
        blocks[coords] = [piece];
        if (piece == 2) {
          totalBlocks++;
        }
      }
      if (piece == 4) {
        nextMove = calculateNext(x, y, previousBall, currentPad);
        inputs.push(nextMove);
        previousBall = [x, y];
      }
      if (piece == 3) {
        currentPad = [x, y];
      }

      step = "getx";
      printBoard(board);
    }
  }
  console.log(`Number of blocks painted: ${totalBlocks}`);
  //console.log(board);
  //panel.drawPanel();
  //console.log(`The panel dimensions are width: ${Math.abs(dim.maxX) + Math.abs(dim.minX)} height: ${Math.abs(dim.maxY) + Math.abs(dim.minY)}`)
  //console.log(dim);
}

// Part 1
paintGame();
