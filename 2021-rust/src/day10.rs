use std::collections::HashMap;
use std::collections::VecDeque;

#[aoc_generator(day10)]
pub fn input_generator(input: &str) -> Vec<Vec<char>> {
  input.lines().map(|l| l.trim().chars().collect()).collect()
}

pub fn is_left(character: char) -> bool {
  match character {
    '(' | '[' | '{' | '<' => true,
    _ => false,
  }
}

pub fn is_right(character: char) -> bool {
  match character {
    ')' | ']' | '}' | '>' => true,
    _ => false,
  }
}

pub fn process_line(line: Vec<char>) -> i32 {
  let mapping = HashMap::from([('(', ')'), ('[', ']'), ('{', '}'), ('<', '>')]);

  let values = HashMap::from([(')', 3), (']', 57), ('}', 1197), ('>', 25137)]);

  let mut stack: VecDeque<char> = VecDeque::new();
  for c in line {
    if is_left(c) {
      stack.push_front(c);
    } else {
      if let Some(left) = stack.pop_front() {
        if !(mapping[&left] == c) {
          return values[&c];
        }
      }
    }
  }
  return 0;
}

#[aoc(day10, part1)]
pub fn solve_part1(input: &Vec<Vec<char>>) -> i32 {
  input.into_iter().fold(0, |acc, line| {
    let value = process_line(line.clone());
    return acc + value;
  })
}

pub fn calculate_score(closings: Vec<char>) -> u64 {
  let values = HashMap::from([(')', 1), (']', 2), ('}', 3), ('>', 4)]);

  closings.into_iter().fold(0, |acc, c| {
    let res = 5 * acc + values[&c];
    res
  })
}

pub fn find_missing(line: Vec<char>) -> Vec<char> {
  let mut missing: Vec<char> = Vec::new();
  let mapping = HashMap::from([('(', ')'), ('[', ']'), ('{', '}'), ('<', '>')]);
  let mut stack: VecDeque<char> = VecDeque::new();

  for c in line {
    if is_left(c) {
      stack.push_front(c);
    } else {
      stack.pop_front();
    }
  }
  while let Some(left) = stack.pop_front() {
    missing.push(mapping[&left]);
  }
  return missing;
}

#[aoc(day10, part2)]
pub fn solve_part2(input: &Vec<Vec<char>>) -> u64 {
  let incompletes: Vec<Vec<char>> = input
    .into_iter()
    .filter(|&line| {
      let value = process_line(line.clone());
      return value == 0;
    })
    .cloned()
    .collect::<Vec<Vec<char>>>();

  let mut vals: Vec<u64> = incompletes
    .into_iter()
    .map(find_missing)
    .map(calculate_score)
    .collect::<Vec<u64>>();
  vals.sort();
  let med = vals.len() / 2;
  return vals[med];
}

#[cfg(test)]
mod tests {
  use super::*;

  const INPUT: &str = r#"[({(<(())[]>[[{[]{<()<>>
  [(()[<>])]({[<{<<[]>>(
  {([(<{}[<>[]}>{[]{[(<()>
  (((({<>}<{<{<>}{[]{[]{}
  [[<[([]))<([[{}[[()]]]
  [{[{({}]{}}([{[{{{}}([]
  {<[[]]>}<{[{[{[]{()[[[]
  [<(<(<(<{}))><([]([]()
  <{([([[(<>()){}]>(<<{{
  <{([{{}}[<[[[<>{}]]]>[]]"#;

  #[test]
  fn example1() {
    assert_eq!(solve_part1(&input_generator(INPUT)), 26397);
  }

  #[test]
  fn example2() {
    assert_eq!(solve_part2(&input_generator(INPUT)), 288957);
  }

  #[test]
  fn example_score1() {
    assert_eq!(
      calculate_score(vec!['}', '}', ']', ']', ')', '}', ')', ']']),
      288957
    );
  }
}
