const { Computer } = require("./computer");
const data = require("./input");

function stringToAscii(str) {
  return str.split("").map(char => char.charCodeAt(0));
}

function getInputForDroid() {
  // return stringToAscii(`OR D J\nWALK\n`);
  // (!A | !B | !C) & D
  // !(A & B & C) & D & (E & !h)
  // jump if: (any of (A, B, C) has hole and D is ground)
  // and not (if E is hole and H and is hole)

  // "if X then Y" = "X or not Y"
  // "not (if X then Y)" = !X and Y
  // X = E is hole = not E
  // Y = H is hole = not H
  // !X and Y = E and not H

  // H is land or (e is land and I is land)
  // E is land or H is land

  return stringToAscii(
    `OR A J
AND B J
AND C J
NOT J J
AND D J
OR E T
OR H T
AND T J
RUN\n`
  );

  // !(X & Y) = !X | !Y

  //   NOT A T
  //   OR B T
  //   OR C T
  //   AND D T
  //   AND T J
}

function findDamage(data) {
  const input = getInputForDroid();
  const computer = new Computer(data, input);
  let resume;
  while ((resume = computer.calculateInstructions())) {
    process.stdout.write(String.fromCharCode(computer.getOutput()));
  }
  console.log(computer.getOutput());
}

// const beamReach = getBeamReach(data);

findDamage(data);

// beamReach.forEach(row => {
//   console.log(row.slice(60).join(""));
// });

// const droid = new Computer(data, [3, 4]);
// droid.calculateInstructions();
// let output = droid.getOutput();
// console.log(output);
