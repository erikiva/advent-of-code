const signals = require("./input");
const { get_digits, solve_part1, solve_part2 } = require("./index");
const {
  test1,
  test2a,
  test2_0,
  test2_1,
  test2_2,
  test2_3,
  test2_4,
  test2_5,
  test2_6,
  test2_7,
  test2_8,
  test2_9,
  test2all
} = require("./tests");

describe("Test inputs ", () => {
  [
    test2a,
    test2_0,
    test2_1,
    test2_2,
    test2_3,
    test2_4,
    test2_5,
    test2_6,
    test2_7,
    test2_8,
    test2_9,
    test2all
  ].forEach((newTest, i) => {
    test(`Test ${i + 1}`, () => {
      const result = solve_part2(newTest.signals);
      expect(result).toEqual(newTest.result);
    });
  });
});

describe("Test final results", () => {
  test("sample part 1", () => {
    const expected = test1.result;
    const result = solve_part1(test1.signals);
    expect(result).toEqual(expected);
  });

  test("solve part 1", () => {
    const expected = 479;
    const result = solve_part1(signals);
    expect(result).toEqual(expected);
  });

  test("sample part 2", () => {
    const expected = test2a.result;
    const result = solve_part2(test2a.signals);
    expect(result).toEqual(expected);
  });
  test("solve part 2", () => {
    const expected = 1041746;
    const result = solve_part2(signals);
    expect(result).toEqual(expected);
  });
});
