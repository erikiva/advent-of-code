const { Computer } = require("./computer");
const data = require("./input");

const key = ([x, y]) => `${x}_${y}`;

function getBeamReach(data) {
  const size = 150;
  let map = [...Array(size + 1)].map(item => Array(size + 1).fill("."));
  // initialize everything
  let beam = 0;
  let inputs = [1, 2];

  const droid = new Computer(data, inputs);
  let resume;
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const droid = new Computer(data, [col, row]);
      droid.calculateInstructions();
      let output = droid.getOutput();
      if (output == 1) {
        beam++;
        map[row][col] = "#";
      }
      //console.log(`[x, y]: [${j}, $[i]] output: ${output}`);
    }
  }
  console.log("Beam : ", beam);
  return map;
}

function testRow(col, row) {
  const droid = new Computer(data, [col + 99, row]);
  droid.calculateInstructions();
  let output = droid.getOutput();
  //console.log(`testing line ${output}`);
  return output == 1 ? true : false;
}

function testPosition(col, row) {
  //console.log(`testting position: [x,y]: [${col}, ${row}]`);
  let found = true;
  [
    [col + 99, row],
    [col + 99, row + 99],
    [col, row + 99]
  ].forEach(([col, row]) => {
    const droid = new Computer(data, [col, row]);
    droid.calculateInstructions();
    let output = droid.getOutput();
    //console.log(`testting position: [x,y]: [${col}, ${row}] ${output}`);
    if (output == 0) {
      found = false;
    }
  });
  return found;
}

function findPosition() {
  const initial = [520, 650];
  let startCol = initial[0];
  let row = initial[1];
  let found = false;
  while (!found) {
    row++;
    let col = startCol;
    const droid = new Computer(data, [col, row]);
    droid.calculateInstructions();
    let output = droid.getOutput();

    //console.log(`------[col, row]: [${col}, ${row}] output: ${output}`);
    while (output != 1) {
      col++;
      const droid = new Computer(data, [col, row]);
      droid.calculateInstructions();
      output = droid.getOutput();
      // console.log(
      //   `in second loop [col, row]: [${col}, ${row}] output: ${output}`
      // );
    }
    if (!testRow(col, row)) {
      startCol = col;
      continue;
    }
    startCol = col;
    while (output == 1) {
      let found = testPosition(col, row);
      if (found) {
        return [col, row];
      }
      const droid = new Computer(data, [col, row]);
      droid.calculateInstructions();
      output = droid.getOutput();
      col++;
      // console.log(
      //   `in second loop after first # [col, row]: [${col}, ${row}] output: ${output}`
      // );
    }
  }
}

// const beamReach = getBeamReach(data);

const position = findPosition(data);
console.log(position);

// beamReach.forEach(row => {
//   console.log(row.slice(60).join(""));
// });

// const droid = new Computer(data, [3, 4]);
// droid.calculateInstructions();
// let output = droid.getOutput();
// console.log(output);
