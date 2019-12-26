module.exports = {
  test1: {
    instructions: `deal with increment 7
deal into new stack
deal into new stack`,
    result: [0, 3, 6, 9, 2, 5, 8, 1, 4, 7]
  },
  test2a: {
    instructions: `cut 6
deal into new stack`,
    result: [6, 7, 8, 9, 0, 1, 2, 3, 4, 5].reverse()
  },
  test2: {
    instructions: `cut 6
deal with increment 7
deal into new stack`,
    result: [3, 0, 7, 4, 1, 8, 5, 2, 9, 6]
  },
  test3: {
    instructions: `deal with increment 7
deal with increment 9
cut -2`,
    result: [6, 3, 0, 7, 4, 1, 8, 5, 2, 9]
  },
  test4: {
    instructions: `deal into new stack
cut -2
deal with increment 7
cut 8
cut -4
deal with increment 7
cut 3
deal with increment 9
deal with increment 3
cut -1`,
    result: [9, 2, 5, 8, 1, 4, 7, 0, 3, 6]
  }
};
