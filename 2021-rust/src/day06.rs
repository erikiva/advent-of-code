#[aoc_generator(day6)]
pub fn input_generator(input: &str) -> Vec<i32> {
  input.split(",").map(|n| n.parse().unwrap()).collect()
}

pub fn apply_day(fish_list: &Vec<i32>) -> Vec<i32> {
    let mut updated: Vec<i32> = vec![];
    for &fish in  fish_list{
      if fish == 0i32 {
        updated.push(6);
        updated.push(8);
      } else {
        updated.push(fish - 1)
      }
    }
    return updated;
}

#[aoc(day6, part1)]
pub fn solve_part1(fish: &Vec<i32>) -> usize {
  println!("{:?}", fish);
  let mut fish_list = fish.clone();

  for _ in 0..80 {
    fish_list = apply_day(&fish_list);
  }
  return fish_list.len();
}

#[aoc(day6, part2)]
pub fn solve_part2(fish_list: &Vec<i32>) -> u64 {
  let mut list:[u64;9] = [0;9];
  for &fish  in fish_list {
    list[fish as usize] = list[fish as usize] + 1;
  }
  for _ in  0..256 {
    let mut zeroes = list[0];
    list[0] = list[1];
    list[1] = list[2];
    list[2] = list[3];
    list[3] = list[4];
    list[4] = list[5];
    list[5] = list[6];
    list[6] = list[7] + zeroes;
    list[7] = list[8];
    list[8] = zeroes;
  }
  return list.iter().sum();
}

#[cfg(test)]
mod tests {
use super::*;

const INPUT: &str = r#"3,4,3,1,2"#;

  #[test]
  fn example1() {
    assert_eq!(solve_part1(&input_generator(INPUT)), 5934);
  }

  #[test]
  fn example2() {
    assert_eq!(solve_part2(&input_generator(INPUT)), 26984457539u64);
  }

}

