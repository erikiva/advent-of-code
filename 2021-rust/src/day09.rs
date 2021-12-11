use std::collections::HashMap;
use std::collections::VecDeque;

#[aoc_generator(day9)]
pub fn input_generator(input: &str) -> Vec<Vec<i32>> {
  input
    .lines()
    .map(|l| l.trim().chars().map(|c| c as i32 - 0x30).collect())
    .collect()
}

pub fn get_low_points(input: &Vec<Vec<i32>>) -> Vec<(usize, usize)> {
  let mut low_points: Vec<(usize, usize)> = vec![];

  let neighbours: [(i32, i32); 4] = [(0, 1), (-1, 0), (1, 0), (0, -1)];

  let rows = input.len();
  let cols = input[0].len();
  for r in 0..rows {
    for c in 0..cols {
      let mut higher = 0;
      for (n_r, n_c) in neighbours {
        let row = r as i32 + n_r;
        let col = c as i32 + n_c;
        // edge node
        if row < 0 || row > rows as i32 - 1 || col < 0 || col > cols as i32 - 1 {
          higher += 1;
        } else if input[r][c] < input[row as usize][col as usize] {
          higher += 1;
        } else {
          continue;
        }
      }
      if higher == 4 {
        low_points.push((r, c));
      }
    }
  }

  return low_points;
}

pub fn is_valid(
  cave_map: &Vec<Vec<i32>>,
  next: &(i32, i32),
  dimensions: &(usize, usize),
  visited: &HashMap<(usize, usize), bool>,
) -> bool {
  if next.0 < 0 || next.0 >= dimensions.0 as i32 || next.1 < 0 || next.1 >= dimensions.1 as i32 {
    return false;
  }
  let next_pos = (next.0 as usize, next.1 as usize);
  if let Some(_) = visited.get(&next_pos) {
    return false;
  }
  let next_value = cave_map[next.0 as usize][next.1 as usize];
  if next_value == 9 {
    return false;
  }
  return true;
}

pub fn get_basin(cave_map: Vec<Vec<i32>>, low_point: (usize, usize)) -> i32 {
  let neighbours: [(i32, i32); 4] = [(0, 1), (-1, 0), (1, 0), (0, -1)];
  let dimensions = (cave_map.len(), cave_map[0].len());
  let mut visited: HashMap<(usize, usize), bool> = HashMap::new();
  let mut queue: VecDeque<(usize, usize)> = VecDeque::new();
  let mut basin: Vec<(i32, i32)> = Vec::new();
  basin.push((low_point.0 as i32, low_point.1 as i32));
  visited.insert(low_point, true);
  queue.push_back(low_point);
  while !queue.is_empty() {
    if let Some(current) = queue.pop_front() {
      for neighbour in neighbours {
        let new_point: (i32, i32) = (
          current.0 as i32 + neighbour.0,
          current.1 as i32 + neighbour.1,
        );
        if is_valid(&cave_map.clone(), &new_point, &dimensions, &visited) {
          basin.push(new_point.clone());
          queue.push_back((new_point.0 as usize, new_point.1 as usize));
        }
        if new_point.0 >= 0 && new_point.1 >= 0 {
          visited.insert((new_point.0 as usize, new_point.1 as usize), true);
        }
      }
    }
  }
  return basin.len() as i32;
}

#[aoc(day9, part1)]
pub fn solve_part1(input: &Vec<Vec<i32>>) -> i32 {
  let low_points = get_low_points(input);

  low_points
    .iter()
    .map(|&(lp_r, lp_c)| input[lp_r][lp_c] + 1)
    .sum()
}

#[aoc(day9, part2)]
pub fn solve_part2(input: &Vec<Vec<i32>>) -> i32 {
  let low_points = get_low_points(input);

  let mut basins: Vec<i32> = Vec::new();
  for low_point in low_points {
    basins.push(get_basin(input.clone(), low_point.clone()));
  }
  let mut res = 1;

  basins.sort();

  for _ in 0..3 {
    if let Some(last) = basins.pop() {
      res *= last;
    }
  }

  return res;
}

#[cfg(test)]
mod tests {
  use super::*;

  const INPUT: &str = r#"2199943210
3987894921
9856789892
8767896789
9899965678"#;

  const INPUT2: &str = r#"9199943210
3987894921
9856789892
8767896789
9899965678"#;

  #[test]
  fn example1() {
    assert_eq!(solve_part1(&input_generator(INPUT)), 15);
  }

  #[test]
  fn example2() {
    assert_eq!(solve_part2(&input_generator(INPUT)), 1134);
  }
  #[test]
  fn example3() {
    assert_eq!(solve_part2(&input_generator(INPUT2)), 1134);
  }
}
