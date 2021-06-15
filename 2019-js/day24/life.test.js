// const {
//   createEcosystem,
//   calculateBiodiversity,
//   calculatePosition,
//   nextState,
//   gameOfLife3D
// } = require("./index");

const test1 = `.....
.....
.....
.....
.....`;

describe.skip("Test calculate biodiversity returns correct value", () => {
  test("No bugs sould return 0", () => {
    const ecosystem = createEcosystem(`.....
.....
.....
.....
.....`);
    const result = 0;
    expect(calculateBiodiversity(ecosystem)).toEqual(result);
  });

  test("No bugs sould return 0", () => {
    const ecosystem = createEcosystem(`.....
.....
.....
#....
.#...`);
    const result = 2129920;
    expect(calculateBiodiversity(ecosystem)).toEqual(result);
  });
});

describe.skip("Test timelapse transition", () => {
  test("Return correct next step for ecosystem", () => {
    const ecosystem = createEcosystem(`....#
#..#.
#..##
..#..
#....`);
    const expected = createEcosystem(`#..#.
####.
###.#
##.##
.##..`);
    const next = nextState(ecosystem);
    expect(calculatePosition([2, 1], ecosystem)).toEqual(expected[1][2]);
    expect(next[4][3]).toEqual(expected[4][3]);
    expect(next[2][3]).toEqual(expected[2][3]);
    expect(next[2][2]).toEqual(expected[2][2]);
  });
});

describe.skip("", () => {
  test("Correct number of bugs after 10 rounds ", () => {
    const expected = 99;
    const rounds = 2;
    const ecosystem = createEcosystem(`....#
#..#.
#.?##
..#..
#....`);
    expect(gameOfLife3D(ecosystem, rounds)).toEqual(expected);
  });
});
