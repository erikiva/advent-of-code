const { Computer } = require("./computer");
const data = require("./input");

// 0: Hit a wall. Its position has not changed.
// 1: Moved one step in the requested direction.
// 2: Moved one step in the requested direction;
//    its new position is the location of the oxygen system.
const WALL = 0;
const MOVED = 1;
const FOUND = 2;
// north (1), south (2), west (3), and east (4)
const N = 1;
const S = 2;
const W = 3;
const E = 4;
// options
// calculate different paths and find shortest
// find the point and calculate the shortest path to initial position
// from each position 2/3/4

const calculateNextPosition = (position, direction) => {
  const moves = {
    1: [0, 1],
    2: [0, -1],
    4: [1, 0],
    3: [-1, 0]
  };
  return [position[0] + moves[direction][0], position[1] + moves[direction][1]];
};

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

function findVent() {
  // initialize everything
  let inputs = [];
  const droid = new Computer(data, inputs);
  let resume = true;
  let status;
  let map = { "0_0": 1 };

  const visited = position => typeof map[key(position)] == "number";

  const explore = currentPos => {
    for (let nextInput = 1; nextInput <= 4; nextInput++) {
      let nextPosition = calculateNextPosition(currentPos, nextInput);
      if (!visited(nextPosition)) {
        droid.addInput(nextInput);
        resume = droid.calculateInstructions();
        status = droid.getOutput();
        map[key(nextPosition)] = status;
        if (status != 0) {
          explore(nextPosition);
          droid.addInput(reverseInput(nextInput));
          droid.calculateInstructions();
          status = droid.getOutput();
        }
      }
    }
  };

  explore([0, 0]);

  // console.log(map);
  //printBoard(board);
  //}

  return map;
}

const findShortest = (currentPos, map, predicate) => {
  const queue = [currentPos];

  const visited = {};
  let found = false;
  visited[key(currentPos)] = true;
  let pathLength = {};
  pathLength[key(currentPos)] = 0;
  let current;

  while (queue.length > 0 && !found) {
    current = queue.shift();

    if (predicate(current)) {
      found = true;
    }

    const neighbors = [1, 2, 3, 4].map(direction =>
      calculateNextPosition(current, direction)
    );

    neighbors.forEach(nextPosition => {
      if (visited[key(nextPosition)]) {
      } else if (map[key(nextPosition)] == WALL) {
      } else {
        visited[key(nextPosition)] = true;
        pathLength[key(nextPosition)] = 1 + pathLength[key(current)];
        queue.push(nextPosition);
      }
    });

    console.log(
      "current",
      current,
      "pathLen",
      pathLength[key(current)],
      "queue",
      queue
    );
  }

  return pathLength[key(current)];
};

const map = findVent();
// find shortest path
console.log(findShortest([0, 0], map, pos => map[key(pos)] == FOUND));
// find number of seconds to fill entire space with oxygen
console.log(findShortest([16, -12], map, pos => false));

//console.log(board);
//panel.drawPanel();
//console.log(`The panel dimensions are width: ${Math.abs(dim.maxX) + Math.abs(dim.minX)} height: ${Math.abs(dim.maxY) + Math.abs(dim.minY)}`)
//console.log(dim);
