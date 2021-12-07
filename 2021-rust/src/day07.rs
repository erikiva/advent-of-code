

#[aoc_generator(day7)]
pub fn input_generator(input: &str) -> Vec<i32> {
  input.split(",").map(|n| n.parse().unwrap()).collect()
}


#[aoc(day7, part1)]
pub fn solve_part1(crab_positions: &Vec<i32>) -> i32 {

  let mut min:i32 = i32::MAX;
  let &highest = crab_positions.iter().max().unwrap();

  for position in 0..=highest {
    let mut cost: i32 = 0;
    for &other in crab_positions {
      cost += (other - position).abs();
    }
    if cost < min {
      min = cost;
    }
  }
  return min;
}

#[aoc(day7, part2)]
pub fn solve_part2(crab_positions: &Vec<i32>) -> i32 {
  let mut min:i32 = i32::MAX;
  let &highest = crab_positions.iter().max().unwrap();
  for position in 0..=highest {
    let mut cost: i32 = 0;
    for &other in crab_positions {
      let n = (other - position).abs();
      cost +=  n * (n + 1) / 2;
    }
    if cost < min {
      min = cost;
    }
  }
  return min;
}

#[cfg(test)]
mod tests {
use super::*;

const INPUT: &str = r#"16,1,2,0,4,2,7,1,2,14"#;

  #[test]
  fn example1() {
    assert_eq!(solve_part1(&input_generator(INPUT)), 37);
  }

  #[test]
  fn example2() {
    assert_eq!(solve_part2(&input_generator(INPUT)), 168);
  }

}

