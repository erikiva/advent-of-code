const { Computer } = require("./computer");
const data = require("./input");

// 35 means #
// 46 means .
// 10 starts a new line of output below the current one

const calculateNextPosition = (position, direction) => {
  const moves = {
    ">": [1, 0],
    "<": [-1, 0],
    v: [0, 1],
    "^": [0, -1]
  };
  return [position[0] + moves[direction][0], position[1] + moves[direction][1]];
};

const UP = "^";
const DOWN = "v";
const RIGHT = ">";
const LEFT = "<";

function turnLeft(droiddir) {
  switch (droiddir) {
    case "^":
      return "<";
    case ">":
      return "^";
    case "v":
      return ">";
    case "<":
      return "v";
  }
}
function turnRight(droiddir) {
  switch (droiddir) {
    case "^":
      return ">";
    case ">":
      return "v";
    case "v":
      return "<";
    case "<":
      return "^";
  }
}

function reverseInput(direction) {
  switch (direction) {
    case N:
      return S;
    case S:
      return N;
    case E:
      return W;
    case W:
      return E;
  }
}

const key = ([x, y]) => `${x}_${y}`;

function getMap(data) {
  let map = [[]];
  // initialize everything
  let row = 0;
  let col = 0;
  let inputs = [];
  const droid = new Computer(data, inputs);
  let resume;
  while ((resume = droid.calculateInstructions())) {
    let output = String.fromCharCode(droid.getOutput());
    if (output == "\n") {
      row++;
      col = 0;
      map[row] = [];
    } else {
      map[row][col] = output;
      col++;
    }
  }

  return map;
}

function getScaffold(map) {
  let scafold = [];
  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[row].length; col++) {
      if (map[row][col] != ".") {
        scafold.push([col, row]);
      }
    }
  }
  return scafold;
}

const map = getMap([...data]);

let scafold = getScaffold(map);

// part1(scafold);
part2([...data], scafold);

function displayMap(map) {
  map.forEach((row, rowIndex) => {
    console.log("" + rowIndex, row.join(""));
  });
}

function part1(scafold) {
  const alignmentValue = scafold.reduce((total, point) => {
    const isInt = isIntersection(point, map);
    if (isInt) {
      total = total + point[0] * point[1];
    }
    return total;
  }, 0);

  console.log(alignmentValue);
}

function part2(data, scafold) {
  data[0] = 2;
  let inputForDroid = getInputForDroid(scafold);
  console.log(inputForDroid);
  const droid = new Computer(data, inputForDroid);
  let resume;
  while ((resume = droid.calculateInstructions())) {
    process.stdout.write(String.fromCharCode(droid.getOutput()));
  }
  console.log("Last output:", droid.getOutput());
}

function stringToAscii(str) {
  return str.split("").map(char => char.charCodeAt(0));
}

function getInputForDroid() {
  return stringToAscii(`A,B,A,C,B,C,A,C,B,C
L,8,R,10,L,10
R,10,L,8,L,8,L,10
L,4,L,6,L,8,L,8
n\n`);
}

function scaffoldToInstructions(scafold, droidpos, droiddir) {
  let scaffold = scafold.reduce((accum, elem) => {
    accum[key(elem)] = 1;
    return accum;
  }, {});

  let instructions = [];

  let droid = { pos: droidpos, dir: droiddir };

  let steps;
  do {
    steps = countStepsWithDirection(scaffold, droid, droid.dir);
    if (steps != 0) {
      instructions.push(steps);
      continue;
    }

    let left = turnLeft(droid.dir);
    steps = countStepsWithDirection(scaffold, droid, left);
    if (steps != 0) {
      droid.dir = left;
      instructions.push("L");
      instructions.push(steps);
      continue;
    }

    let right = turnRight(droid.dir);
    steps = countStepsWithDirection(scaffold, droid, right);
    if (steps != 0) {
      droid.dir = right;
      instructions.push("R");
      instructions.push(steps);
    }
  } while (steps > 0);

  return instructions;
}

function countStepsWithDirection(scaffold, droid, droiddir) {
  let count = 0;
  let droidpos = droid.pos;
  while (scaffold[key(droidpos)]) {
    droid.pos = droidpos;
    droidpos = calculateNextPosition(droidpos, droiddir);
    count++;
  }
  return count - 1;
}

// console.log(scaffoldToInstructions(scafold, [26, 40], UP).join(","));

// console.log(isIntersection([26, 4], map));
// console.log(map[4][25], map[4][27], map[3][26], map[5][26]);

function isIntersection([x, y], map) {
  if (x == 0 || y == 0 || x == map[0].length - 1 || y == map.length - 1) {
    return false;
  }
  if (
    map[y + 1][x] == "#" &&
    map[y - 1][x] == "#" &&
    map[y][x + 1] == "#" &&
    map[y][x - 1] == "#"
  ) {
    return true;
  }
  return false;
}

// find shortest path
//console.log(findShortest([0, 0], map, pos => map[key(pos)] == FOUND));
// find number of seconds to fill entire space with oxygen
//console.log(findShortest([16, -12], map, pos => false));

//console.log(board);
//panel.drawPanel();
//console.log(`The panel dimensions are width: ${Math.abs(dim.maxX) + Math.abs(dim.minX)} height: ${Math.abs(dim.maxY) + Math.abs(dim.minY)}`)
//console.log(dim);
