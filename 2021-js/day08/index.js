let checker = (arr, target) => {
  // console.log("arr", arr, "target", target);
  return arr.every((v) => target.includes(v));
};

function sort_signals(signals) {
  const sorted = {};
  sorted[signals.two] = "1";
  sorted[signals.three] = "7";
  sorted[signals.four] = "4";
  sorted[signals.seven] = "8";
  sorted[
    signals.five.find((signal) =>
      checker(signals.three.split(""), signal.split(""))
    )
  ] = "3";

  let six = "";

  signals.six.forEach((signal) => {
    if (
      !checker(signals.four.split(""), signal.split("")) &&
      checker(signals.three.split(""), signal.split(""))
    ) {
      sorted[signal] = "0";
    } else if (
      checker(signals.four.split(""), signal.split("")) &&
      checker(signals.three.split(""), signal.split(""))
    ) {
      sorted[signal] = "9";
    } else {
      sorted[signal] = "6";
      six = signal;
    }
  });

  signals.five.forEach((signal) => {
    if (checker(signals.three.split(""), signal.split(""))) {
      sorted[signal] = "3";
    } else if (checker(signal.split(""), six)) {
      sorted[signal] = "5";
    } else {
      sorted[signal] = "2";
    }
  });

  sorted[
    signals.six.find(
      (signal) =>
        checker(signals.four.split(""), signal.split("")) &&
        checker(signals.three.split(""), signal.split(""))
    )
  ] = "9";

  return sorted;
}

function get_digits(signals) {
  const sorted_signals = sort_signals(signals.signals);
  return signals.digits.map((digit) => sorted_signals[digit]).join("");
}

function solve_part1(signals) {
  const a = signals
    .split("\n")
    .map((l) => l.split(" | ")[1])
    .map((digits) => digits.split(" "))
    .flat()
    .filter((digit) => [2, 3, 4, 7].includes(digit.length));
  // console.log("a: ", a, a.length);
  return a.length;
}

function solve_part2(signals) {
  const a = signals.split("\n").map((l) => {
    const separate = l.split(" | ");
    return {
      signals: separate[0]
        .split(" ")
        .map((signal) => signal.split("").sort().join(""))
        .reduce(
          (acc, signal) => {
            switch (signal.length) {
              case 2:
                acc.two = signal;
                break;
              case 3:
                acc.three = signal;
                break;
              case 4:
                acc.four = signal;
                break;
              case 7:
                acc.seven = signal;
                break;
              case 5:
                acc.five.push(signal);
                break;
              case 6:
                acc.six.push(signal);
                break;
            }
            return acc;
          },
          {
            two: "",
            three: "",
            four: "",
            five: [],
            six: [],
            seven: ""
          }
        ),
      digits: separate[1]
        .split(" ")
        .map((signal) => signal.split("").sort().join(""))
    };
  });

  let b = a.map(get_digits).reduce((acc, num) => acc + parseInt(num), 0);
  return b;
}

module.exports = { get_digits, solve_part1, solve_part2 };
