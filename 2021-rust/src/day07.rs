#[aoc_generator(day6)]
pub fn input_generator(input: &str) -> Vec<i32> {
  input.split(",").map(|n| n.parse().unwrap()).collect()
}


#[aoc(day6, part1)]
pub fn solve_part1(_: &Vec<i32>) -> usize {
  return 0;
}

#[aoc(day6, part2)]
pub fn solve_part2(_: &Vec<i32>) -> u64 {
  let mut list:[u64;9] = [0;9];

  return list.iter().sum();
}

#[cfg(test)]
mod tests {
use super::*;

const INPUT: &str = r#""#;

  #[test]
  fn example1() {
    assert_eq!(solve_part1(&input_generator(INPUT)), 0);
  }

  #[test]
  fn example2() {
    assert_eq!(solve_part2(&input_generator(INPUT)), 0);
  }

}

