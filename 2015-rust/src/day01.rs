
#[aoc(day1, part1)]
pub fn solve_part1(input: &str) -> u32 {
  let mut count = 0;
  for char in input.chars() {
    match char {
      '(' => count += 1,
      ')' => count -= 1,
      _ => println!("Wrong char {}", char)
    }
  }
  return count;
}

#[aoc(day1, part2)]
pub fn solve_part2(input: &str) -> u32 {
  let mut floor = 0;
  for (i, char) in input.chars().enumerate() {
    match char {
      '(' => floor += 1,
      ')' => floor -= 1,
      _ => println!("Wrong char {}", char)
    }
    if floor == -1{
      return i as u32 + 1;
    }
  }
  unreachable!();
}

#[cfg(test)]
mod tests {
use super::*;

  #[test]
  fn example1() {
    assert_eq!(solve_part1("(())"), 0);
  }

  #[test]
  fn example2() {
    assert_eq!(solve_part1("((("), 3);
  }

  #[test]
  fn example3() {
    assert_eq!(solve_part2(")"), 1);
  }

  #[test]
  fn example4() {
    assert_eq!(solve_part2("()())"), 5);
  }
}