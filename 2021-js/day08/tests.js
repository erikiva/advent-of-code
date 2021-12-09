const all_signals = `be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`;

// 0- fdgacbe cefdb cefbgd gcbe: 8394
// 1 -fcgedb cgb dgebacf gc: 9781
// 2 -cg cg fdcagb cbg: 1197
// 3 -efabcd cedba gadfec cb: 9361
// 4 -gecf egdcabf bgf bfgea: 4873
// 5 -gebdcfa ecba ca fadegcb: 8418
// 6- cefg dcbef fcge gbcadfe: 4548
// 7- ed bcgafe cdgba cbgef: 1625
// 8 -gbdfcae bgc cg cgb: 8717
// 9 -fgae cfgab fg bagce: 4315

module.exports = {
  test1: {
    signals: all_signals,
    result: 26
  },
  test2a: {
    signals: `acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf`,
    result: 5353
  },
  test2_0: {
    signals: all_signals.split("\n")[0],
    result: 8394
  },
  test2_1: {
    signals: all_signals.split("\n")[1],
    result: 9781
  },
  test2_2: {
    signals: all_signals.split("\n")[2],
    result: 1197
  },
  test2_3: {
    signals: all_signals.split("\n")[3],
    result: 9361
  },
  test2_4: {
    signals: all_signals.split("\n")[4],
    result: 4873
  },
  test2_5: {
    signals: all_signals.split("\n")[5],
    result: 8418
  },
  test2_6: {
    signals: all_signals.split("\n")[6],
    result: 4548
  },
  test2_7: {
    signals: all_signals.split("\n")[7],
    result: 1625
  },
  test2_8: {
    signals: all_signals.split("\n")[8],
    result: 8717
  },
  test2_9: {
    signals: all_signals.split("\n")[9],
    result: 4315
  },
  test2all: {
    signals: all_signals,
    result: 61229
  }
};
