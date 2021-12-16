use std::cmp::Ordering;
use std::collections::BinaryHeap;
use std::collections::HashMap;

#[derive(Copy, Clone, Eq, PartialEq, Debug)]
pub struct Risk {
  position: (usize, usize),
  value: u32,
}

// The priority queue depends on `Ord`.
// Explicitly implement the trait so the queue becomes a min-heap
// instead of a max-heap.
impl Ord for Risk {
  fn cmp(&self, other: &Self) -> Ordering {
    // Notice that the we flip the ordering on costs.
    // In case of a tie we compare positions - this step is necessary
    // to make implementations of `PartialEq` and `Ord` consistent.
    other
      .value
      .cmp(&self.value)
      .then_with(|| self.position.cmp(&other.position))
  }
}
// `PartialOrd` needs to be implemented as well.
impl PartialOrd for Risk {
  fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
    Some(self.cmp(other))
  }
}

#[aoc_generator(day15)]
pub fn input_generator(input: &str) -> Vec<Vec<u32>> {
  input
    .lines()
    .map(|l| l.trim().chars().map(|c| c as u32 - 0x30).collect())
    .collect()
}

pub fn is_valid(
  next: &(i32, i32),
  dimensions: &(usize, usize),
  visited: &HashMap<(usize, usize), bool>,
) -> bool {
  if next.0 < 0 || next.0 > dimensions.0 as i32 || next.1 < 0 || next.1 > dimensions.1 as i32 {
    return false;
  }
  let next_pos = (next.0 as usize, next.1 as usize);
  if let Some(_) = visited.get(&next_pos) {
    return false;
  }

  return true;
}

#[aoc(day15, part1)]
pub fn solve_part1(risk_map: &Vec<Vec<u32>>) -> u32 {
  let neighbours: [(i32, i32); 4] = [(0, 1), (-1, 0), (1, 0), (0, -1)];
  let mut visited: HashMap<(usize, usize), bool> = HashMap::new();
  let mut queue = BinaryHeap::new();

  let end = (risk_map.len() - 1, risk_map[0].len() - 1);

  // start 0,0 don't count value
  // end condition = height, width
  queue.push(Risk {
    position: (0, 0),
    value: 0,
  });

  while let Some(current) = queue.pop() {
    if (current.position.0 as usize, current.position.1 as usize) == end {
      return current.value;
    }
    if let Some(_) = visited.get(&current.position) {
      continue;
    }
    visited.insert(current.position, true);
    for neighbour in neighbours {
      let new_point: (i32, i32) = (
        current.position.0 as i32 + neighbour.0,
        current.position.1 as i32 + neighbour.1,
      );

      if is_valid(&new_point, &(end), &visited) {
        let np = (new_point.0 as usize, new_point.1 as usize);
        queue.push(Risk {
          position: np,
          value: current.value + risk_map[np.0][np.1],
        });
      }
    }
  }

  0
}

pub fn calculate_risk(risk_map: &Vec<Vec<u32>>, point: &(usize, usize)) -> u32 {
  let original_width = risk_map[0].len();
  let original_height = risk_map.len();
  let r_base_coord: usize = point.0 % original_height;
  let c_base_coord: usize = point.1 % original_width;
  let r_incr: usize = point.0 / original_height;
  let c_incr: usize = point.1 / original_width;

  let risk = risk_map[c_base_coord][r_base_coord] + c_incr as u32 + r_incr as u32;
  return if risk > 9 { risk - 9 } else { risk };
}

#[aoc(day15, part2)]
pub fn solve_part2(risk_map: &Vec<Vec<u32>>) -> u32 {
  let neighbours: [(i32, i32); 4] = [(0, 1), (-1, 0), (1, 0), (0, -1)];
  let mut visited: HashMap<(usize, usize), bool> = HashMap::new();
  let mut queue = BinaryHeap::new();

  let end = ((5 * risk_map.len()) - 1, (5 * risk_map[0].len()) - 1);

  // start 0,0 don't count value
  // end condition = height, width
  queue.push(Risk {
    position: (0, 0),
    value: 0,
  });

  while let Some(current) = queue.pop() {
    if (current.position.0 as usize, current.position.1 as usize) == end {
      return current.value;
    }
    if let Some(_) = visited.get(&current.position) {
      continue;
    }
    visited.insert(current.position, true);
    for neighbour in neighbours {
      let new_point: (i32, i32) = (
        current.position.0 as i32 + neighbour.0,
        current.position.1 as i32 + neighbour.1,
      );

      if is_valid(&new_point, &(end), &visited) {
        let np = (new_point.0 as usize, new_point.1 as usize);
        queue.push(Risk {
          position: np,
          value: current.value + calculate_risk(risk_map, &(np)),
        });
      }
    }
  }
  0
}

#[cfg(test)]
mod tests {
  use super::*;

  const INPUT: &str = r#"1163751742
  1381373672
  2136511328
  3694931569
  7463417111
  1319128137
  1359912421
  3125421639
  1293138521
  2311944581"#;

  #[test]
  fn example1() {
    assert_eq!(solve_part1(&input_generator(INPUT)), 40);
  }

  #[test]
  fn example2() {
    assert_eq!(solve_part2(&input_generator(INPUT)), 315);
  }
}
