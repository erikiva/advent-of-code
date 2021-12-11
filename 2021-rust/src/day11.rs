use std::collections::HashMap;

const STEPS: i32 = 100;
const SIZE: i32 = 10;

#[aoc_generator(day11)]
pub fn input_generator(input: &str) -> HashMap<(usize, usize), i32> {
  let mut energies: HashMap<(usize, usize), i32> = HashMap::new();
  let values: Vec<Vec<i32>> = input
    .lines()
    .map(|l| l.trim().chars().map(|c| c as i32 - 0x30).collect())
    .collect();
  for r in 0..values[0].len() {
    for c in 0..values.len() {
      energies.insert((r, c), values[r][c]);
    }
  }
  return energies;
}

pub fn print_map(energies: &HashMap<(usize, usize), i32>) {
  for r in 0..10 {
    for c in 0..10 {
      print!("{}", energies[&(r, c)]);
    }
    println!();
  }
  println!();
  println!();
}

pub fn step(energies: HashMap<(usize, usize), i32>) -> (HashMap<(usize, usize), i32>, i32) {
  let mut current: HashMap<(usize, usize), i32> = energies.clone();
  let neighbours: [(i32, i32); 8] = [
    (0, 1),
    (-1, 0),
    (-1, -1),
    (1, 0),
    (1, 1),
    (1, -1),
    (-1, 1),
    (0, -1),
  ];
  let mut step_flashes: i32 = 0;
  for c in 0..10 {
    for r in 0..10 {
      current.insert((r, c), current[&(r, c)] + 1);
      if current[&(r, c)] == 10 {
        step_flashes += 1;
      }
    }
  }

  loop {
    let mut flashes: i32 = 0;
    for r in 0..10 {
      for c in 0..10 {
        if current[&(r, c)] == 10 {
          for (n_r, n_c) in neighbours {
            let new_row = r as i32 + n_r;
            let new_col = c as i32 + n_c;
            // edge node
            if new_row >= 0 && new_row < SIZE && new_col >= 0 && new_col < SIZE {
              let point = (new_row as usize, new_col as usize);
              if current[&point] < 10 && current[&point] != 0 {
                current.insert(point, current[&point] + 1);
                if (current[&point]) == 10 {
                  flashes += 1;
                }
              }
            }
          }
          current.insert((r, c), 0);
        }
      }
    }

    if flashes == 0 {
      break;
    }
    step_flashes += flashes;
  }
  for r in 0..10 {
    for c in 0..10 {
      if current[&(r, c)] == 10 {
        current.insert((r, c), 0);
      }
    }
  }

  return (current, step_flashes);
}

#[aoc(day11, part1)]
pub fn solve_part1(energies: &HashMap<(usize, usize), i32>) -> i32 {
  let mut current: HashMap<(usize, usize), i32> = energies.clone();

  let mut total_flashes: i32 = 0;
  for _ in 1..=STEPS {
    let next_result = step(current.clone());
    total_flashes += next_result.1;
    current = next_result.0;
    // println!("Step {}", s);
    // print_map(&current);
  }

  // println!("Flashes: {}", total_flashes);
  return total_flashes;
}

#[aoc(day11, part2)]
pub fn solve_part2(energies: &HashMap<(usize, usize), i32>) -> i32 {
  let mut current: HashMap<(usize, usize), i32> = energies.clone();

  let mut s: i32 = 1;
  loop {
    let next_result = step(current.clone());
    current = next_result.0;

    if next_result.1 == 100 {
      break;
    }
    s += 1;
    if s == 250 {
      break;
    }
  }

  return s;
}

#[cfg(test)]
mod tests {
  use super::*;

  const INPUT: &str = r#"5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526"#;

  // #[test]
  // // 10 vueltas
  // fn example1a() {
  //   assert_eq!(solve_part1(&input_generator(INPUT)), 204);
  // }

  #[test]
  // 100 vueltas
  fn example1b() {
    assert_eq!(solve_part1(&input_generator(INPUT)), 1656);
  }

  #[test]
  fn example2() {
    assert_eq!(solve_part2(&input_generator(INPUT)), 195);
  }
}
