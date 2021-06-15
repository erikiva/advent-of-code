const instructions = require("./input");
//const { test1, test2, test3, test4 } = require("./tests");

const gcd = (length, n) => {
  if (n == 0) return [length, 1n, 0n];
  // if (n > 50) console.log(n);
  const rest = length % n;
  const div = length / n;
  const [next, p, q] = gcd(n, rest);
  return [next, q, p - div * q];
};

function reverseDealNewStack(length, pos) {
  return length - 1 - pos;
}
function reverseCutN(length, n, pos) {
  const shift = (pos + n) % length;
  if (shift < 0) {
    return length + shift;
  }
  return shift;
}

function calculateMagicNumber(length, n) {
  const [gcdiv, lengthCoef, nCoef] = gcd(length, n);
  if (nCoef < 0) {
    return length + nCoef;
  }
  return nCoef;
}

function reverseDealIncrementN(length, n, pos) {
  let magicNumber = calculateMagicNumber(length, n);
  return (pos * magicNumber) % length;
}

function dealNewStack(deck) {
  return deck.reverse();
}
function cutN(deck, n) {
  let head;
  let tail;
  if (n > 0) {
    tail = deck.slice(0, n);
    head = deck.slice(n);
  } else {
    head = deck.slice(n);
    tail = deck.slice(0, deck.length + n);
  }
  return [...head, ...tail];
}

function calculateNextPosition(position, deckLength, n) {
  let newPos = position + n;
  if (newPos > deckLength - 1) {
    newPos = newPos - deckLength;
  }
  return newPos;
}
function dealIncrementN(deck, n) {
  let position = 0;
  let newDeck = [];
  for (let i = 0; i < deck.length; i++) {
    newDeck[position] = deck[i];
    position = calculateNextPosition(position, deck.length, n);
  }
  return newDeck;
}

function processReverseInstruction(instruction, length, pos) {
  const words = instruction.split(" ");
  if (words[3] == "stack") {
    return reverseDealNewStack(length, pos);
  }
  if (words[0] == "cut") {
    const n = parseInt(words[1]);
    return reverseCutN(length, n, pos);
  }
  if (words[2] == "increment") {
    const n = parseInt(words[3]);
    return reverseDealIncrementN(length, n, pos);
  }
}

function processInstruction(deck, instruction) {
  const words = instruction.split(" ");
  if (words[3] == "stack") {
    return dealNewStack(deck);
  }
  if (words[0] == "cut") {
    const n = parseInt(words[1]);
    return cutN(deck, n);
  }
  if (words[2] == "increment") {
    const n = parseInt(words[3]);
    return dealIncrementN(deck, n);
  }
}

function shuffle(deck, instructions) {
  const steps = instructions.split("\n");
  let newDeck = [...deck];
  steps.forEach(step => {
    newDeck = processInstruction([...newDeck], step);
  });
  return newDeck;
}

function processSimpleReverseInstructions(length, instructions) {
  let a = 1n;
  let b = 0n;
  instructions
    .split("\n")
    .reverse()
    .forEach(instruction => {
      const words = instruction.split(" ");
      if (words[3] == "stack") {
        a = -a;
        b = length - 1n - b;
      }
      if (words[0] == "cut") {
        const n = BigInt(words[1]);
        b += n;
      }
      if (words[2] == "increment") {
        const n = calculateMagicNumber(length, BigInt(words[3]));
        // console.log(n);
        a *= n;
        b *= n;
      }

      a = (a + length) % length;
      b = (b + length) % length;
      // console.log(instruction, a, b);
    });

  return [a, b];
}

function simpleReverseShuffle(length, instructions, pos, loops = 1) {
  let [a0, b0] = processSimpleReverseInstructions(length, instructions);
  let [a, b] = [1, 0];
  for (let loop = 0; loop < loops; loop++) {
    a = (a * a0) % length;
    b = (b0 + a0 * b) % length;
  }
  return (((a * pos + b) % length) + length) % length;
}

function reverseShuffle(length, instructions, pos, loops) {
  const steps = instructions.split("\n").reverse();
  let position = pos;
  for (let loop = 0; loop < loops; loop++) {
    steps.forEach(step => {
      position = processReverseInstruction(step, length, position);
    });
    if (loop % 1000000 == 0) console.log(loop);
  }
  return position;
}

const length = 119315717514047n;

const rules = instructions;
// const loops = 1;
const loops = 101741582076661;

let [a, b] = processSimpleReverseInstructions(length, instructions);
console.log(a, b, "inverse of a:", gcd(length, a - 1n));

// from python:
// (b * (pow(a, N, length) - 1)*11808660479695 + 2020*pow(a, N, length)) % length
// 49283089762689L

let pos = 2020;

// console.log(calculateMagicNumber(length, a - 1));
// for (let loop = 0; loop < loops; loop++) {
//   pos = (((a * pos + b) % length) + length) % length;
//   if (loop % 10000000 == 0) console.log(loop, pos);
// }
// console.log(pos);
// const loops = 101741582076661;
// const finalPos = reverseShuffle(length, instructions, 2020, loops);
// console.log(finalPos);
// var deck = new Array(length).fill().map((_, i) => i);
// const newDeck = shuffle([...deck], rules);
// console.log(newDeck);
// console.log(newDeck.indexOf(2019));

module.exports = { shuffle, reverseShuffle, gcd, simpleReverseShuffle };

//console.log(cutN([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 3));
