use std::collections::HashMap;

#[derive(Clone, Debug)]
pub struct Fold {
  direction: char,
  value: usize,
}

pub type Point = (usize, usize);
#[derive(Clone, Debug)]
pub struct Map {
  points: HashMap<Point, bool>,
  width: usize,
  height: usize,
}

#[aoc_generator(day13)]
pub fn input_generator(input: &str) -> (Map, Vec<Fold>) {
  let mut input = input.split("\n\n");
  let mut points_map: Map = Map {
    points: HashMap::new(),
    width: 0,
    height: 0,
  };

  let points = input.next().unwrap().lines();
  let mut height: usize = 0;
  let mut width: usize = 0;
  for p in points {
    let mut point = p.trim().split(",");
    let point = (
      point.next().unwrap().parse().unwrap(),
      point.next().unwrap().parse().unwrap(),
    );
    if point.0 > width {
      width = point.0;
    }
    if point.1 > height {
      height = point.1;
    }
    points_map.points.insert(point, true);
  }
  points_map.width = width;
  points_map.height = height;

  let folds: Vec<Fold> = input
    .next()
    .unwrap()
    .lines()
    .map(|fold| fold.trim().replace("fold along ", ""))
    .map(|fold| {
      let mut instruction = fold.split("=");
      Fold {
        direction: instruction.next().unwrap().chars().next().unwrap(),
        value: instruction.next().unwrap().parse().unwrap(),
      }
    })
    .collect();

  (points_map, folds)
}

pub fn print_map(map: &Map) {
  for r in 0..=map.height {
    for c in 0..=map.width {
      if let Some(_) = map.points.get(&(c, r)) {
        print!("#");
      } else {
        print!(".")
      }
    }
    println!("");
  }
  println!("\n\n");
}

#[aoc(day13, part1)]
pub fn solve_part1(input: &(Map, Vec<Fold>)) -> usize {
  let mut map = input.0.clone();
  let folds = input.1.clone();
  // print_map(&map);
  let fold = folds.first().unwrap();

  if fold.direction == 'x' {
    for r in 0..=map.height {
      for c in fold.value..=map.width {
        if let Some(_) = map.points.get(&(c, r)) {
          let new_x = 2 * fold.value - c;
          map.points.insert((new_x, r), true);
          map.points.remove(&(c, r));
        }
      }
    }
    map.width -= fold.value;
  }

  if fold.direction == 'y' {
    for r in fold.value..=map.height {
      for c in 0..=map.width {
        if let Some(_) = map.points.get(&(c, r)) {
          let new_y = 2 * fold.value - r;
          map.points.insert((c, new_y), true);
          map.points.remove(&(c, r));
        }
      }
    }
    map.height -= fold.value;
  }

  print_map(&map);

  map.points.len()
}

#[aoc(day13, part2)]
pub fn solve_part2(input: &(Map, Vec<Fold>)) -> usize {
  let mut map = input.0.clone();
  let folds = input.1.clone();
  // print_map(&map);

  for fold in folds {
    if fold.direction == 'x' {
      for r in 0..=map.height {
        for c in fold.value..=map.width {
          if let Some(_) = map.points.get(&(c, r)) {
            let new_x = 2 * fold.value - c;
            map.points.insert((new_x, r), true);
            map.points.remove(&(c, r));
          }
        }
      }
      map.width -= fold.value;
    }

    if fold.direction == 'y' {
      for r in fold.value..=map.height {
        for c in 0..=map.width {
          if let Some(_) = map.points.get(&(c, r)) {
            let new_y = 2 * fold.value - r;
            map.points.insert((c, new_y), true);
            map.points.remove(&(c, r));
          }
        }
      }
      map.height -= fold.value;
    }
  }
  print_map(&map);

  map.points.len()
}

#[cfg(test)]
mod tests {
  use super::*;

  const INPUT: &str = r#"6,10
  0,14
  9,10
  0,3
  10,4
  4,11
  6,0
  6,12
  4,1
  0,13
  10,12
  3,4
  3,0
  8,4
  1,10
  2,14
  8,10
  9,0

  fold along y=7
  fold along x=5"#;

  #[test]
  fn example1() {
    assert_eq!(solve_part1(&input_generator(INPUT)), 17);
  }

  #[test]
  fn example2() {
    assert_eq!(solve_part2(&input_generator(INPUT)), 0);
  }
}

// #....###..###....##.###....##.####.#..#.....
// #....#..#.#.......#.#..#....#.#....#..#.....
// #....#..#.###.....#.###.....#.###..####.....
// #....###..#.......#.#..#....#.#....#..#.....
// #....#.#..#....#..#.#..#.#..#.#....#..#.....
// ####.#..#.#.....##..###...##..####.#..#.....
// ............................................
// ............................................
// ............................................
// ............................................
