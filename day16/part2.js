const data = require("./input");
// Test data para input as is and 100 rounds
const testInput = "12345678";
const test2 = "80871224585914546619083218645595"; //24176176 / 24176176
const test3 = "19617804207202209144916044189917"; //73745418 / 73745418
const test4 = "69317163492948606335995924319873"; //52432133 / 52432133

// test data for inout * 10000 and 100 rounds
const testInput2 = "03036732577212944063491565474664"; // becomes 84462026
const testInput3 = "02935109699940807407585447034323"; // becomes 78725270
const testInput4 = "03081770884921959731165446850517"; // becomes 53553731

function calculateFinalOutput(data, rounds, multiplier) {
  let subList = getSignal(data);
  let list = [];
  for (let i = 0; i < multiplier; i++) {
    list.push(...subList);
  }
  list.unshift(0);
  //log(Math.ceil(list.length / 2), " --- Input signal: ", list.join(","));

  let head;
  let tail;

  const breakPoint = Math.ceil(list.length / 2);

  for (let i = 1; i <= rounds; i++) {
    //log(`list before ${i} round: ${list.join(",")}`);
    head = getListHead(list, breakPoint, i);
    tail = getListTail(list, breakPoint, i);

    //log(head.join(","), "****", tail.join(","));
    list = [...head, ...tail];
  }
  list.shift();
  return list;
}

function getListHead(list, breakPoint) {
  let head = [0];
  for (let i = 1; i < breakPoint; i++) {
    head.push(1);
    //head.push(getLineResult(list.slice(i), i));
    //log(head.join(","));
  }
  return head;
}

function getListTail(list, breakPoint) {
  let tail = [];
  let previous = 0;

  for (let i = list.length - 1; i >= breakPoint; i--) {
    previous += list[i];
    //log(list[i], " Adding to list: ", previous, typeof previous);
    tail.push(previous % 10);
  }
  return tail.reverse();
}

// Test cases para 100 rounds and input as is
const rounds = 100;
// let multiplier = 1;
// test(test2, rounds, multiplier);
// test(test3, rounds, multiplier);
// test(test4, rounds, multiplier);

// Test cases para 100 rounds and input * 10000
multiplier = 10000;
test(data, rounds, multiplier);
// test(testInput3, rounds, multiplier);
// test(testInput4, rounds, multiplier);

function test(data, rounds, mult) {
  console.log(data);
  const offset = parseInt(data.substr(0, 7));

  const result = calculateFinalOutput(data, rounds, mult);
  console.log(`Offset is: ${offset}`);
  console.log(
    `The list after ${rounds} rounds is: ${result[offset]}${
      result[offset + 1]
    }${result[offset + 2]}${result[offset + 3]}${result[offset + 4]}${
      result[offset + 5]
    }${result[offset + 6]}${result[offset + 7]} - ${result
      .slice(offset, 8)
      .join("")}` //${result.slice(offset, 8).join("")}
  );
}

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
  let total = 0;
  let adjusted = [...list]; //.slice(pos);
  for (let i = 0; i < adjusted.length; i++) {
    const patternValue = pg.next().value;
    if (patternValue == 0) {
      continue;
    }
    //log(`total: ${total}, num: ${num}, incr: ${patternValue}`);
    total += adjusted[i] * patternValue;
  }
  return Math.abs(total % 10);
}

var debug = false;
function log(...args) {
  debug && log(...args);
}
