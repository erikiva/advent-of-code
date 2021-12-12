use std::collections::HashMap;
use std::collections::VecDeque;

type Path = Vec<String>;

#[derive(Clone, Debug)]
pub struct PathWithRepeatSmall {
  path: Path,
  repeated_small: bool,
}

#[aoc_generator(day12)]
pub fn input_generator(input: &str) -> HashMap<String, Vec<String>> {
  let mut map: HashMap<String, Vec<String>> = HashMap::new();
  let pairs: Vec<(&str, &str)> = input
    .lines()
    .map(|l| {
      let mut line = l.trim().split("-");
      (line.next().unwrap(), line.next().unwrap())
    })
    .collect();
  for pair in pairs {
    if pair.0.ne(&"end".to_string()) && pair.1.ne(&"start".to_string()) {
      match map.get(pair.0) {
        Some(val) => {
          let mut next = val.clone();
          next.push(pair.1.to_string());
          map.insert(pair.0.to_string(), next);
        }
        None => {
          map.insert(pair.0.to_string(), vec![pair.1.to_string()]);
        }
      }
    };
    if pair.1.ne(&"end".to_string()) && pair.0.ne(&"start".to_string()) {
      match map.get(pair.1) {
        Some(val) => {
          let mut next = val.clone();
          next.push(pair.0.to_string());
          map.insert(pair.1.to_string(), next);
        }
        None => {
          map.insert(pair.1.to_string(), vec![pair.0.to_string()]);
        }
      }
    };
  }

  return map;
}

pub fn is_valid(path: &Path, next: &str) -> bool {
  // check if it's uppercase or not visited
  if next.to_uppercase() == next {
    return true;
  }
  if !path.contains(&next.to_string()) {
    return true;
  }
  return false;
}

pub fn is_valid_with_lowercase(path: &PathWithRepeatSmall, next: &str) -> bool {
  if next.to_uppercase() == next {
    return true;
  }
  // if lowercase, theres already a revisited lowercase and our next is already there
  if next.to_lowercase() == next && path.repeated_small && path.path.contains(&next.to_string()) {
    return false;
  }
  // check one lowercase
  return true;
}

#[aoc(day12, part1)]
pub fn solve_part1(map: &HashMap<String, Vec<String>>) -> usize {
  let mut queue: VecDeque<Path> = VecDeque::new();
  let mut paths: Vec<Path> = Vec::new();
  queue.push_back(vec!["start".to_string()]);
  while let Some(next) = queue.pop_front() {
    let next_tail = next.last().unwrap();
    if next_tail == &"end".to_string() {
      paths.push(next);
    } else {
      let conns: Vec<String> = map.get(next_tail).unwrap().to_vec();
      for conn in conns {
        if is_valid(&next, &conn) {
          let mut new_path = next.clone();
          new_path.push(conn);
          queue.push_back(new_path);
        }
      }
    }
  }
  return paths.len();
}

#[aoc(day12, part2)]
pub fn solve_part2(map: &HashMap<String, Vec<String>>) -> usize {
  let mut queue: VecDeque<PathWithRepeatSmall> = VecDeque::new();
  // Finished paths
  let mut paths: Vec<Path> = Vec::new();
  queue.push_back(PathWithRepeatSmall {
    path: vec!["start".to_string()],
    repeated_small: false,
  });

  while let Some(next) = queue.pop_front() {
    let next_tail = next.path.last().unwrap();
    if next_tail == &"end".to_string() {
      paths.push(next.path);
    } else {
      let conns: Vec<String> = map.get(next_tail).unwrap().to_vec();
      for conn in conns {
        if is_valid_with_lowercase(&next, &conn) {
          let mut new_path = next.clone();
          if conn.to_lowercase() == conn && new_path.path.contains(&conn) {
            new_path.repeated_small = true;
          }
          new_path.path.push(conn.clone());
          queue.push_back(new_path);
        }
      }
    }
  }
  return paths.len();
}

#[cfg(test)]
mod tests {
  use super::*;

  const INPUT: &str = r#"start-A
  start-b
  A-c
  A-b
  b-d
  A-end
  b-end"#;

  const INPUT2: &str = r#"dc-end
  HN-start
  start-kj
  dc-start
  dc-HN
  LN-dc
  HN-end
  kj-sa
  kj-HN
  kj-dc"#;

  const INPUT3: &str = r#"fs-end
  he-DX
  fs-he
  start-DX
  pj-DX
  end-zg
  zg-sl
  zg-pj
  pj-he
  RW-he
  fs-DX
  pj-RW
  zg-RW
  start-pj
  he-WI
  zg-he
  pj-fs
  start-RW"#;

  #[test]
  fn example1a() {
    assert_eq!(solve_part1(&input_generator(INPUT)), 10);
  }

  #[test]
  fn example1b() {
    assert_eq!(solve_part1(&input_generator(INPUT2)), 19);
  }

  #[test]
  fn example1c() {
    assert_eq!(solve_part1(&input_generator(INPUT3)), 226);
  }

  #[test]
  fn example2a() {
    assert_eq!(solve_part2(&input_generator(INPUT)), 36);
  }

  #[test]
  fn example2b() {
    assert_eq!(solve_part2(&input_generator(INPUT2)), 103);
  }

  #[test]
  fn example2c() {
    assert_eq!(solve_part2(&input_generator(INPUT3)), 3509);
  }
}
