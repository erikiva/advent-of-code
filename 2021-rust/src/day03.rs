

#[aoc_generator(day3)]
pub fn input_generator(input: &str) -> Vec<Vec<i32>> {
  input.lines().map(|l| l.trim().chars().map(|c| c as i32 - 0x30).collect()).collect()
}

pub fn convert_to_dec(num: &Vec<i32>) -> i32 {
  num.iter().fold(0, |dec, next| {
    dec * 2 + next
  })
}

pub fn get_most_common_at_position(list: &Vec<Vec<i32>>, pos: usize) -> i32 {
    let mut totals: (i32,i32) = (0, 0);
    for n in  0..list.len(){
      match list[n][pos] {
        0 => totals.0 += 1,
        1 => totals.1 += 1,
        _ => ()
      }
    }
    return if totals.0 > totals.1 {0} else {1};
}


pub fn filter_list_by_most_common(list: &Vec<Vec<i32>>, pos: usize) -> Vec<Vec<i32>> {
  let kind = get_most_common_at_position(list, pos);
  list.iter().cloned().filter(|row| {
    row[pos] == kind
  }).collect()
}

pub fn filter_list_by_least_common(list: &Vec<Vec<i32>>, pos: usize) -> Vec<Vec<i32>> {
  let kind = if get_most_common_at_position(list, pos) == 0 {1} else {0};
  list.iter().cloned().filter(|row| {
    row[pos] == kind
  }).collect()
}


#[aoc(day3, part1)]
pub fn solve_part1(input: &Vec<Vec<i32>>) -> i32 {
  let mut gamma: Vec<i32> = vec![];
  let mut epsilon: Vec<i32> = vec![];

  for i in 0..input[0].len() {
    let most_common = get_most_common_at_position(input, i);
    let least_common = if most_common == 1 {0} else {1};
    gamma.push(most_common);
    epsilon.push(least_common);

  }
 return convert_to_dec(&gamma) * convert_to_dec(&epsilon);
}

#[aoc(day3, part2)]
pub fn solve_part2(input: &Vec<Vec<i32>>) -> i32 {
  let mut o2 = input.clone();
  let mut co2 = input.clone();
  let mut i:usize = 0;
  while o2.len() > 1 {
    o2 = filter_list_by_most_common(&o2, i);
    i += 1;
  }

  i = 0;
  while co2.len() > 1 {
    co2 = filter_list_by_least_common(&co2, i);
    i += 1;
  }

  return convert_to_dec(&o2[0]) * convert_to_dec(&co2[0]);
}

#[cfg(test)]
mod tests {
use super::*;

  #[test]
  fn convert() {
    assert_eq!(convert_to_dec(&vec![1,0,1,1,0]), 22);
  }

  #[test]
  fn example1() {
    assert_eq!(solve_part1(&input_generator("00100
    11110
    10110
    10111
    10101
    01111
    00111
    11100
    10000
    11001
    00010
    01010")), 198);
  }

  #[test]
  fn example2() {
    assert_eq!(solve_part2(&input_generator("00100
    11110
    10110
    10111
    10101
    01111
    00111
    11100
    10000
    11001
    00010
    01010")), 230);
  }

}

