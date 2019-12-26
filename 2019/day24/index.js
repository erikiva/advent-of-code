const data = require("./input");

function calculateBiodiversity(ecosystem) {
  let total = 0;
  for (let i = 0; i < ecosystem.length; i++) {
    for (let j = 0; j < ecosystem.length; j++) {
      if (ecosystem[i][j] == "#") {
        total += Math.pow(2, i * 5 + j);
      }
    }
  }
  return total;
}

function calculatePosition([x, y], ecosystem) {
  const adjacent = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0]
  ];
  let bugs = 0;
  for (let i = 0; i < adjacent.length; i++) {
    const neighbour = adjacent[i];
    if (neighbour[1] + y >= 0 && neighbour[1] + y < 5) {
      if (ecosystem[neighbour[1] + y][neighbour[0] + x] == "#") {
        bugs++;
      }
    }
  }
  if (
    (ecosystem[y][x] == "#" && bugs == 1) ||
    (ecosystem[y][x] == "." && (bugs == 1 || bugs == 2))
  ) {
    return "#";
  } else {
    return ".";
  }
}

function nextState(ecosystem) {
  let newState = [[], [], [], [], []];
  for (let y = 0; y < 5; y++) {
    for (let x = 0; x < 5; x++) {
      newState[y][x] = calculatePosition([x, y], ecosystem);
    }
  }
  return newState;
}

function gameOfLife(ecosystem) {
  let states = {};
  let currentEcosystem = ecosystem;
  let found = false;
  let biodiversity = 0;
  while (!found) {
    currentEcosystem = nextState(currentEcosystem);
    const bio = calculateBiodiversity(currentEcosystem);
    if (states[bio]) {
      biodiversity = bio;
      found = true;
    } else {
      states[bio] = true;
    }
  }
  return biodiversity;
}
// center is [2,2]
function getSameLevelBugs([x, y], ecosystem) {
  //console.log(ecosystem);
  const adjacent = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0]
  ];
  let bugs = 0;
  for (let i = 0; i < adjacent.length; i++) {
    const neighbour = adjacent[i];
    if (neighbour[1] + y >= 0 && neighbour[1] + y < 5) {
      //console.log({ y: neighbour[1] + y });
      if (ecosystem[neighbour[1] + y][neighbour[0] + x] == "#") {
        bugs++;
      }
    }
  }
  return bugs;
}

// Bugs from the external grid
function getLowerLevelBugs([x, y], lowerEco) {
  let bugs = 0;
  if (y == 0) {
    if (lowerEco[1][2] == "#") {
      bugs++;
    }
  }
  if (y == 4) {
    if (lowerEco[3][2] == "#") {
      bugs++;
    }
  }
  if (x == 0) {
    if (lowerEco[2][1] == "#") {
      bugs++;
    }
  }
  if (x == 4) {
    if (lowerEco[2][3] == "#") {
      bugs++;
    }
  }
  return bugs;
}

// Bugs from the internal grid
function getHigherLevelBugs([x, y], higherEco) {
  let bugs = 0;
  if (x == 2 && y == 1) {
    for (let hX = 0; hX < 5; hX++) {
      if (higherEco[0][hX] == "#") {
        bugs++;
      }
    }
  }
  if (x == 3 && y == 2) {
    for (let hY = 0; hY < 5; hY++) {
      if (higherEco[hY][4] == "#") {
        bugs++;
      }
    }
  }
  if (x == 2 && y == 3) {
    for (let hX = 0; hX < 5; hX++) {
      if (higherEco[4][hX] == "#") {
        bugs++;
      }
    }
  }
  if (x == 1 && y == 2) {
    for (let hY = 0; hY < 5; hY++) {
      if (higherEco[hY][0] == "#") {
        bugs++;
      }
    }
  }
  return bugs;
}

function getNewLevel() {
  const eco = Array(5)
    .fill([])
    .map(i => Array(5).fill("."));
  eco[2][2] = "?";
  return eco;
}

function getBugs3D(level, current, higher, lower) {
  let newEco = [[], [], [], [], []];
  let newEcoBugs = 0;
  for (let y = 0; y < 5; y++) {
    for (let x = 0; x < 5; x++) {
      if (x == 2 && y == 2) {
        newEco[y][x] = "?";
        continue;
      }
      // if (level == "0" && x == 4 && y == 1) {
      //   console.log({
      //     same: getSameLevelBugs([x, y], current),
      //     higher: getHigherLevelBugs([x, y], higher),
      //     lower: getLowerLevelBugs([x, y], lower)
      //   });
      //   console.log(lower);
      //   console.log("-------------");
      // }
      let bugs = 0;
      bugs += getSameLevelBugs([x, y], current);
      if (higher) {
        bugs += getHigherLevelBugs([x, y], higher);
      }
      if (lower) {
        bugs += getLowerLevelBugs([x, y], lower);
      }
      if (
        (current[y][x] == "#" && bugs == 1) ||
        (current[y][x] == "." && (bugs == 1 || bugs == 2))
      ) {
        newEco[y][x] = "#";
        newEcoBugs++;
      } else {
        newEco[y][x] = ".";
      }
    }
  }
  return [newEco, newEcoBugs];
}

function gameOfLife3D(ecosystem, rounds) {
  let maxLevel = 1;
  let minLevel = -1;
  let universe = {};
  ecosystem[2][2] = "?";
  universe[0] = { clean: false, bugMap: [...ecosystem] };
  universe[1] = { clean: true, bugMap: getNewLevel() };
  universe[-1] = { clean: true, bugMap: getNewLevel() };

  let higher;
  let lower;
  // for each level don't calculate [2,2]
  for (let minutes = 0; minutes < rounds; minutes++) {
    let currentUniverse = {};
    for (let level = minLevel; level <= maxLevel; level++) {
      current = universe[level].bugMap;
      if (
        universe[parseInt(level) - 1]
        //&& !universe[parseInt(level) - 1].clean
      ) {
        lower = universe[parseInt(level) - 1].bugMap;
      } else {
        lower = undefined;
      }
      if (
        universe[parseInt(level) + 1]
        //&& !universe[parseInt(level) + 1].clean
      ) {
        higher = universe[parseInt(level) + 1].bugMap;
      } else {
        higher = undefined;
      }
      //console.log({ level, current, higher, lower });
      const [newEco, newEcoBugs] = getBugs3D(level, current, higher, lower);
      currentUniverse[level] = {
        clean: false,
        bugMap: newEco,
        bugs: newEcoBugs
      };
      //for each existing ecosystem
      // get bugs in own level
      // get bugs in adjacent levels
      // if no adjacent level and it's needed
      // (we are on end level and near neighbours have bugs)
      // create adjacent level so it's processed too.
    }
    universe = currentUniverse;
    if (universe[minLevel].bugs > 0) {
      minLevel--;
      universe[minLevel] = { clean: true, bugMap: getNewLevel(), bugs: 0 };
    }
    if (universe[maxLevel].bugs > 0) {
      maxLevel++;
      universe[maxLevel] = { clean: true, bugMap: getNewLevel(), bugs: 0 };
    }
    showUniverse(minutes, currentUniverse);
  }

  let totalBugs = 0;
  Object.keys(universe).forEach(level => {
    console.log({ level, bugs: universe[level].bugs });
    totalBugs += universe[level].bugs;
  });
  return totalBugs;
}

function showUniverse(min, universe) {
  console.log(min);
  Object.keys(universe).forEach(key => {
    if (universe[key].bugs > 0) {
      console.log({ key, bugs: universe[key].bugs });
      universe[key].bugMap.forEach(row => {
        console.log(row.join(""));
      });
    }
  });
}

function createEcosystem(data) {
  return data.split("\n").map(row => row.split(""));
}

const expected = 99;
const rounds = 200;
const ecosystem = createEcosystem(`....#
#..#.
#.?##
..#..
#....`);
const eco = createEcosystem(data);
const bugs = gameOfLife3D(eco, rounds);
console.log({ bugs });

//const eco = createEcosystem(data);
//const bio = gameOfLife(eco);
//console.log({ bio });
//const rounds = 200;
//const bugs = gameOfLife3D(eco, rounds);
//console.log({ bugs });
module.exports = {
  createEcosystem,
  calculateBiodiversity,
  calculatePosition,
  nextState,
  gameOfLife3D
};
