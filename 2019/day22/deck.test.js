const {
  shuffle,
  reverseShuffle,
  gcd,
  simpleReverseShuffle
} = require("./index");
const { test1, test2a, test2, test3, test4 } = require("./tests");

const length = 10;
const deck = new Array(length).fill().map((_, i) => i);

describe("Test individual shuffles", () => {
  test("deal into new stack", () => {
    const expected = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
    const result = shuffle([...deck], `deal into new stack`);
    expect(result).toEqual(expected);
  });
  test("cut N cards", () => {
    const expected = [3, 4, 5, 6, 7, 8, 9, 0, 1, 2];
    const result = shuffle([...deck], `cut 3`);
    // console.log({ expected, result });
    expect(result).toEqual(expected);
  });
  test("cut N cards with negative value", () => {
    const expected = [6, 7, 8, 9, 0, 1, 2, 3, 4, 5];
    const result = shuffle([...deck], `cut -4`);
    expect(result).toEqual(expected);
  });
  test("deal with increment N", () => {
    const expected = [0, 7, 4, 1, 8, 5, 2, 9, 6, 3];
    const result = shuffle([...deck], `deal with increment 3`);
    expect(result).toEqual(expected);
  });
  test("deal with increment N", () => {
    const expected = [0, 3, 6, 9, 2, 5, 8, 1, 4, 7];
    const result = shuffle([...deck], `deal with increment 7`);
    expect(result).toEqual(expected);
  });
  test("deal with increment N", () => {
    const length = 23;
    const deck = new Array(length).fill().map((_, i) => i);
    const expected = 19;
    const result = shuffle([...deck], `deal with increment 5`);
    expect(result[3]).toEqual(expected);
  });
});

describe("Test combinations ", () => {
  [test1, test2, test3, test4].forEach((newTest, i) => {
    test(`Test ${i + 1}`, () => {
      const result = shuffle([...deck], newTest.instructions);
      expect(result).toEqual(newTest.result);
    });
  });
});

describe.skip("Test reverse individual shuffles", () => {
  test("deal into new stack", () => {
    const expected = 6;
    const result = reverseShuffle(length, `deal into new stack`, 3);
    expect(result).toEqual(expected);
  });
  test("cut N cards", () => {
    const expected = 7;
    const result = reverseShuffle(length, `cut 3`, 4);
    // console.log({ expected, result });
    expect(result).toEqual(expected);
  });
  test("cut N cards", () => {
    const expected = 7;
    const result = reverseShuffle(length, `cut 3`, 4);
    // console.log({ expected, result });
    expect(result).toEqual(expected);
  });
  test("cut N cards with negative value", () => {
    const expected = 5;
    const result = reverseShuffle(length, `cut -3`, 8);
    expect(result).toEqual(expected);
  });
  test("deal with increment N", () => {
    const expected = 2;
    const result = reverseShuffle(length, `deal with increment 3`, 6);
    expect(result).toEqual(expected);
  });
  test("deal with increment N", () => {
    const expected = 1;
    const result = reverseShuffle(length, `deal with increment 3`, 3);
    expect(result).toEqual(expected);
  });
  test("deal with increment N", () => {
    const length = 23;
    const deck = new Array(length).fill().map((_, i) => i);
    const expected = 19;
    const result = reverseShuffle(length, `deal with increment 5`, 3);
    expect(result).toEqual(expected);
  });
});
describe.skip("Test combinations for reverse shuffling", () => {
  [test1, test2a, test2, test3, test4].forEach((newTest, i) => {
    test(`Test ${i + 1}`, () => {
      const result = reverseShuffle(10, newTest.instructions, 4);
      expect(result).toEqual(newTest.result[4]);
    });
  });
});

describe("Test combinations for simplified shuffling", () => {
  [test1, test2a, test2, test3, test4].forEach((newTest, i) => {
    test(`Test ${i + 1}`, () => {
      const deck = new Array(length).fill().map((_, i) => i);
      const result = deck.map(i =>
        simpleReverseShuffle(10, newTest.instructions, i)
      );
      expect(result).toEqual(newTest.result);
    });
  });
});

describe("Test shuffling twice", () => {
  [test1, test2, test3, test4].forEach((newTest, i) => {
    test(`Test ${i + 1}`, () => {
      const deck = new Array(length).fill().map((_, i) => i);
      const result = shuffle(
        shuffle([...deck], newTest.instructions),
        newTest.instructions
      );
      const result2 = deck.map(i =>
        simpleReverseShuffle(10, newTest.instructions, i, 2)
      );
      console.log(result, result2);
      expect(result).toEqual(result2);
    });
  });
});

describe("Test gcd function", () => {
  test("Test function returns correct values", () => {
    const result = [1, 1, -3];
    expect(result).toEqual(gcd(10, 3));
  });
  test("Test function returns correct values", () => {
    for (let i = 1; i < 100; i++) {
      const result = gcd(119315717514047, i);
      expect(result[0]).toEqual(1);
      expect(result[1] * 119315717514047 + result[2] * i).toEqual(1);
    }
  });
});
