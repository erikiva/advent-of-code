const data = require("./input");
const testInput = "12345678";
const testInput2 = "80871224585914546619083218645595"; //24176176 / 24176176
const testInput3 = "19617804207202209144916044189917"; //73745418 / 73745418
const testInput4 = "69317163492948606335995924319873"; //52432133 / 52432133

function calculateFinalOutput(data, rounds) {
  let list = getSignal(data);
  list.unshift(0);
  log("input is: ", list);
  let result = [0];
  for (let loops = 1; loops <= rounds; loops++) {
    log(`list before ${loops} round: ${list.join(",")}`);
    for (let i = 1; i < list.length; i++) {
      result.push(getLineResult(list, i));
      log(result.join(","));
    }
    list = [...result];
    result = [0];
  }
  list.shift();
  return list;
}

const rounds = 100;
const result = calculateFinalOutput(testInput4, rounds);
console.log(
  `The list after ${rounds} rounds is: ${result.slice(0, 8).join("")}`
);

function* patternGenerator(phase) {
  while (true) {
    for (let i = 1; i <= phase; i++) {
      yield 1;
    }
    for (let i = 1; i <= phase; i++) {
      yield 0;
    }
    for (let i = 1; i <= phase; i++) {
      yield -1;
    }
    for (let i = 1; i <= phase; i++) {
      yield 0;
    }
  }
}

function getSignal(data) {
  return data.split("").map(digit => parseInt(digit));
}

function getLineResult(list, pos) {
  log("Line result for: ", pos, " - ", list.join(","));
  const pg = patternGenerator(pos);

  const total = list.slice(pos).reduce((acc, num) => {
    const patternValue = pg.next().value;
    log(`acc: ${acc}, num: ${num}, incr: ${patternValue}`);
    return acc + num * patternValue;
  }, 0);
  return Math.abs(total % 10);
}
var debug = false;
function log(...args) {
  debug && log(...args);
}

let list = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2];
//log(getLineResult(list, 3));

const input = getSignal(data);
//    log(input.length, input.join(","));

//const pg = patternGenerator(3);
// log(pg.next().value);
// log(pg.next().value);
// log(pg.next().value);
// log(pg.next().value);
// log(pg.next().value);
// log(pg.next().value);
// log(pg.next().value);
// log(pg.next().value);
// log(pg.next().value);

// log(pg.next().value);
// log(pg.next().value);
// log(pg.next().value);
// log(pg.next().value);
// log(pg.next().value);
// log(pg.next().value);
