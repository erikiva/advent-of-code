const final = require("./input");

const test1 = `#########
#b.A.@.a#
#########`;

const test2 = `########################
#f.D.E.e.C.b.A.@.a.B.c.#
######################.#
#d.....................#
########################`;

const test3 = `########################
#...............b.C.D.f#
#.######################
#.....@.a.B.c.d.A.e.F.g#
########################`;

const test4 = `#################
#i.G..c...e..H.p#
########.########
#j.A..b...f..D.o#
########@########
#k.E..a...g..B.n#
########.########
#l.F..d...h..C.m#
#################`;

const test5 = `########################
#@..............ac.GI.b#
###d#e#f################
###A#B#C################
###g#h#i################
########################`;

const test6 = `#############
#g#f.D#..h#l#
#F###e#E###.#
#dCba...BcIJ#
#####.@.#####
#nK.L...G...#
#M###N#H###.#
#o#m..#i#jk.#
#############`;

const test7 = `#############
#DcBa.#.GhKl#
#.###.#.#I###
#e#d##@##j#k#
###C#.#.###J#
#fEbA.#.FgHi#
#############`;

const key = arr => arr.join("_");
const key2 = arr => arr.map(key).join(":");

var mazeSummary = {};
var keySummary = {};
var droidPosition = [];

function isKey(char) {
  return char >= "a" && char <= "z";
}

function isDoor(char) {
  return char >= "A" && char <= "Z";
}

function elementiInMaze([x, y], maze) {
  return maze[y][x];
}

function getValidNeighbours([x, y], maze) {
  let neighbours = [];
  [
    [0, 1],
    [1, 0],
    [-1, 0],
    [0, -1]
  ].forEach(([x1, y1]) => {
    let newPos = [x + x1, y + y1];
    let element = elementiInMaze(newPos, maze);
    // if (element == "." || isKey(element)) {
    if (element != "#") {
      neighbours.push(newPos);
    }
  });
  return neighbours;
}

function nextPosition() {}

let keys = {};

function findAllKeys(maze) {
  Object.keys(keySummary).forEach(keyLetter => {
    let keypos = keySummary[keyLetter];
    keys[key(keypos)] = findKeys0(keypos, maze);
  });
}

function findKeys(kee, initialPosition, maze, usedKeys) {
  let accessibleKeys;

  if (keys[key(initialPosition)]) {
    accessibleKeys = keys[key(initialPosition)];
    // console.log("reused", initialPosition);
  } else {
    accessibleKeys = findKeys0(initialPosition, maze);
    // keys[key(initialPosition)] = accessibleKeys;
    console.log("computed", initialPosition, accessibleKeys);
  }

  return accessibleKeys.filter(key => {
    let doors = key[3];
    // check we have keys for all doors
    return (
      !usedKeys.includes(key[0]) &&
      doors.reduce((accum, door) => {
        return accum && usedKeys.includes(door.toLowerCase());
      }, true)
    );
  });
}

function findKeys0(initialPosition, maze) {
  console.log("looking for keys from", initialPosition);
  let foundKeys = [];
  let visited = {};
  let moveQueue = [];
  let stepCounts = {};
  let doors = {};

  stepCounts[key(initialPosition)] = 0;
  visited[key(initialPosition)] = true;
  doors[key(initialPosition)] = [];
  moveQueue.push(initialPosition);

  while (moveQueue.length > 0) {
    let position = moveQueue.shift();
    let element = elementiInMaze(position, maze);
    if (isDoor(element)) {
      doors[key(position)] = [...doors[key(position)], element];
    } else if (isKey(element)) {
      foundKeys.push([
        element,
        stepCounts[key(position)],
        position,
        doors[key(position)]
      ]);
    }
    let neighbours = getValidNeighbours(position, maze);
    //console.log(position, neighbours, elementiInMaze(position, maze));
    neighbours.forEach(neighbour => {
      if (!visited[key(neighbour)]) {
        visited[key(neighbour)] = true;
        doors[key(neighbour)] = doors[key(position)];
        stepCounts[key(neighbour)] = 1 + stepCounts[key(position)];
        moveQueue.push(neighbour);
      }
    });
  }
  console.log("found", foundKeys);
  return foundKeys;
}

function takeKey(key, keyPos, maze) {
  maze[keyPos[1]][keyPos[0]] = ".";
  const door = mazeSummary[key.toUpperCase()];
  if (door) {
    maze[door[1]][door[0]] = ".";
  }
}

function resetKey(key, keyPos, maze) {
  const door = mazeSummary[key.toUpperCase()];
  if (door) {
    maze[door[1]][door[0]] = key.toUpperCase();
  }
  maze[keyPos[1]][keyPos[0]] = key;
}

let budget = Infinity;

let solution_memo = {};

function solution(keyChar, initialPos, maze, usedKeys, steps) {
  const solkey = key(initialPos) + ":" + [...usedKeys].sort().join("");
  if (solution_memo[solkey]) {
    return solution_memo[solkey];
  }

  // displayMaze(maze);
  let keys = findKeys(keyChar, initialPos, maze, usedKeys);
  let minCount = Infinity;

  // console.log(usedKeys.join(""), steps, budget);
  if (keys.length == 0) {
    budget = steps < budget ? steps : budget;
    console.log(usedKeys.join(""), steps, budget);
    return [0, []];
  }
  let sol;
  // console.log(keys);
  keys.forEach(([key, count, pos, doors]) => {
    if (count + steps >= budget) {
      return;
    }

    // takeKey(key, pos, maze);
    usedKeys.push(key);
    let x = solution(key, pos, maze, usedKeys, steps + count);

    let [foundCount, foundSolution] = x;
    usedKeys.pop();
    // resetKey(key, pos, maze);
    if (count + foundCount < minCount) {
      minCount = count + foundCount;
      sol = [key, ...foundSolution];
    }
  });
  return (solution_memo[solkey] = [minCount, sol]);
}

function main(data) {
  const maze = createMaze(data);
  findInitial(maze);
  findAllKeys(maze);
  let initialPos = droidPosition;
  let usedKeys = [];
  let [count, sol] = solution(".", initialPos, maze, usedKeys, 0);
  console.log(count, sol.join(""));
}

function replaceCenterPattern(maze) {
  let centerPattern = [
    [".", "#", "."],
    ["#", "#", "#"],
    [".", "#", "."]
  ];
  for (let i = -1; i <= 1; i++)
    for (let j = -1; j <= 1; j++)
      maze[droidPosition[1] + i][droidPosition[0] + j] =
        centerPattern[i + 1][j + 1];
}

function solutionPart2(keyChar, droidPositions, maze, usedKeys, steps) {
  const solkey = key2(droidPositions) + ":" + [...usedKeys].sort().join("");
  if (solution_memo[solkey]) {
    return solution_memo[solkey];
  }

  // displayMaze(maze);
  let keys = droidPositions.map(initialPos =>
    findKeys(keyChar, initialPos, maze, usedKeys)
  );
  let minCount = Infinity;

  // console.log(usedKeys.join(""), steps, budget);
  if (keys.reduce((accum, current) => accum + current.length, 0) == 0) {
    budget = steps < budget ? steps : budget;
    console.log(usedKeys.join(""), steps, budget);
    return [0, []];
  }
  let sol;
  // console.log(keys);
  for (let droid = 0; droid < 4; droid++)
    keys[droid].forEach(([key, count, pos, doors]) => {
      if (count + steps >= budget) {
        return;
      }

      // takeKey(key, pos, maze);
      let newDroidPositions = [...droidPositions];
      newDroidPositions[droid] = pos;
      usedKeys.push(key);
      let x = solutionPart2(
        key,
        newDroidPositions,
        maze,
        usedKeys,
        steps + count
      );

      let [foundCount, foundSolution] = x;
      usedKeys.pop();
      // resetKey(key, pos, maze);
      if (count + foundCount < minCount) {
        minCount = count + foundCount;
        sol = [key, ...foundSolution];
      }
    });
  return (solution_memo[solkey] = [minCount, sol]);
}

function mainPart2(data) {
  const maze = createMaze(data);
  findInitial(maze);
  replaceCenterPattern(maze);
  findAllKeys(maze);
  // displayMaze(maze);
  let initialPos = [];
  for (let i = -1; i <= 1; i += 2)
    for (let j = -1; j <= 1; j += 2)
      initialPos.push([droidPosition[0] + i, droidPosition[1] + j]);
  // displayMaze(maze);
  // console.log(initialPos, key2(initialPos));
  let usedKeys = [];
  let [count, sol] = solutionPart2(".", initialPos, maze, usedKeys, 0);
  console.log(count, sol.join(""));
}

// main(final);
mainPart2(final);

function createMaze(data) {
  return data.split("\n").map(line => line.split(""));
}

function displayMaze(maze) {
  maze.forEach(row => {
    console.log(row.join(""));
  });
}

function findInitial(maze) {
  for (let i = 0; i < maze.length; i++) {
    for (let j = 0; j < maze[0].length; j++) {
      if (maze[i][j] == "@") {
        maze[i][j] = ".";
        droidPosition = [j, i];
      }
      if (isDoor(maze[i][j])) {
        mazeSummary[maze[i][j]] = [j, i];
      }
      if (isKey(maze[i][j])) {
        keySummary[maze[i][j]] = [j, i];
      }
    }
  }
}
