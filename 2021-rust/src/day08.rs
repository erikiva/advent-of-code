#[derive(Clone, Debug)]
pub struct Signal {
  signal_pattern: Vec<String>,
  digits: Vec<String>,
}

#[aoc_generator(day8)]
pub fn input_generator(input: &str) -> Vec<Signal> {
  input
    .lines()
    .map(|l| {
      let mut line = l.split(" | ");
      Signal {
        signal_pattern: line
          .next()
          .unwrap()
          .split(" ")
          .map(|s| s.to_string())
          .collect(),
        digits: line
          .next()
          .unwrap()
          .split(" ")
          .map(|d| d.to_string())
          .collect(),
      }
    })
    .collect()
}

#[aoc(day8, part1)]
pub fn solve_part1(input: &Vec<Signal>) -> usize {
  let mut count: usize = 0;
  for i in 0..input.len() {
    count += input[i]
      .digits
      .clone()
      .into_iter()
      .filter(|d| d.len() == 2 || d.len() == 4 || d.len() == 3 || d.len() == 7)
      .collect::<Vec<String>>()
      .len();
  }

  return count;
}

#[aoc(day8, part2)]
pub fn solve_part2(_input: &Vec<Signal>) -> i32 {
  let count: i32 = 0;
  // let mut digits: Vec<i32> = vec![];
  // let digit_list = input.iter().map();

  return count;
}

#[cfg(test)]
mod tests {
  use super::*;

  const INPUT: &str = r#"be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce"#;

  #[test]
  fn example1() {
    assert_eq!(solve_part1(&input_generator(INPUT)), 26);
  }

  #[test]
  fn example2() {
    assert_eq!(solve_part2(&input_generator(INPUT)), 61229);
  }
}
