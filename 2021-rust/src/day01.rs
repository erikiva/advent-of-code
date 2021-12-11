#[aoc_generator(day1)]
pub fn input_generator(input: &str) -> Vec<u32> {
  input.lines().map(|x| x.parse::<u32>().unwrap()).collect()
}

#[aoc(day1, part1)]
pub fn solve_part1(input: &[u32]) -> u32 {
  let mut increments = 0;

  for meassurement in 1..input.len() {
    if input[meassurement - 1] < input[meassurement] {
      increments += 1;
    }
  }
  return increments;
}

#[aoc(day1, part2)]
pub fn solve_part2(input: &[u32]) -> u32 {
  let mut increments = 0;
  for meassurement in 3..input.len() {
    if input[meassurement - 3] < input[meassurement] {
      increments += 1;
    }
  }
  return increments;
}

#[cfg(test)]
mod tests {
  use super::*;

  #[test]
  fn example1() {
    assert_eq!(
      solve_part1(&input_generator(
        "
    199
    200
    208
    210
    200
    207
    240
    269
    260
    263"
      )),
      7
    );
  }

  #[test]
  fn example2() {
    assert_eq!(
      solve_part2(&input_generator(
        "199
    200
    208
    210
    200
    207
    240
    269
    260
    263"
      )),
      5
    );
  }
}
