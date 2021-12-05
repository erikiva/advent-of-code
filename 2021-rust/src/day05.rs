use std::collections::HashMap;

#[derive(Debug, Clone,PartialEq, Eq, Hash)]
pub struct Point {
  x: i32,
  y: i32
}

pub struct Line {
  start: Point,
  end: Point
}

impl Line {
  fn is_horizontal(&self) -> bool {
      self.start.y == self.end.y
  }
  fn is_vertical(&self) -> bool {
    self.start.x == self.end.x
  }
  fn is_diagonal(&self) -> bool {
    self.start.x - self.end.x == self.start.y - self.end.y
  }
  fn is_anti_diagonal(&self) -> bool {
    self.start.x - self.end.x == -(self.start.y - self.end.y)
  }
}

#[aoc_generator(day5)]
pub fn input_generator(input: &str) -> Vec<Line> {
  input.lines().map(|l| {
    let mut line = l.split(" -> ");
    let start = line.next().unwrap();
    let end = line.next().unwrap();
    (start, end)
  }).map(|(s, e)| {
    let mut start = s.split(",");
    let mut end = e.split(",");
    Line {
      start: Point{
        x: start.next().unwrap().parse().unwrap(),
        y: start.next().unwrap().parse().unwrap()
      },
      end: Point{
        x: end.next().unwrap().parse().unwrap(),
        y: end.next().unwrap().parse().unwrap()
      }
    }
  }).collect()

}

#[aoc(day5, part1)]
pub fn solve_part1(vent_lines: &Vec<Line>) -> i32 {
  println!("Lines: {}", vent_lines.len());
  let mut high_crossings = 0i32;
  let mut crosings: HashMap<Point, i32> = HashMap::new();
  for line in vent_lines {
    if line.is_horizontal() {
      let range = if line.start.x > line.end.x {(line.end.x..=line.start.x)} else {(line.start.x..=line.end.x)};
      for i in range {
        let point = Point{x:i, y: line.start.y};
        if let Some(&cross_point) = crosings.get(&point) {
          crosings.insert(point, cross_point + 1);
          if cross_point == 1i32 {
            high_crossings += 1;
          }
        } else {
          crosings.insert(point, 1);
        }

      }
    }
    if line.is_vertical() {
      let range = if line.start.y > line.end.y {(line.end.y..=line.start.y)}
          else {(line.start.y..=line.end.y)};
      for i in range {
        let point = Point{y:i, x: line.start.x};
        if let Some(&cross_point) = crosings.get(&point) {
          crosings.insert(point, cross_point + 1);
          if cross_point == 1i32 {
            high_crossings += 1;
          }
        } else {
          crosings.insert(point, 1);
        }

      }
    }
  }
  return high_crossings;
}

#[aoc(day5, part2)]
pub fn solve_part2(vent_lines: &Vec<Line>) -> i32 {
  println!("Lines: {}", vent_lines.len());
  let mut high_crossings = 0i32;
  let mut crosings: HashMap<Point, i32> = HashMap::new();
  for line in vent_lines {
    if line.is_horizontal() {
      let range = if line.start.x > line.end.x { (line.end.x..=line.start.x) }
              else { (line.start.x..=line.end.x) };
      println!("Horizontal {:?} - {:?}", line.start, line.end);
      for i in range {
        let point = Point{x:i, y: line.start.y};
        if let Some(&cross_point) = crosings.get(&point) {
          crosings.insert(point, cross_point + 1);
          if cross_point == 1i32 {
            high_crossings += 1;
          }
        } else {
          crosings.insert(point, 1);
        }

      }
    }
    if line.is_vertical() {
      let range = if line.start.y > line.end.y {(line.end.y..=line.start.y)}
          else {(line.start.y..=line.end.y)};
          println!("Vertical {:?} - {:?}", line.start, line.end);
      for i in range {
        let point = Point{y:i, x: line.start.x};
        if let Some(&cross_point) = crosings.get(&point) {
          crosings.insert(point, cross_point + 1);
          if cross_point == 1i32 {
            high_crossings += 1;
          }
        } else {
          crosings.insert(point, 1);
        }

      }
    }
    if line.is_diagonal() {
      let (start, end) = if line.start.x > line.end.x {(line.end.clone(), line.start.clone())}
        else {(line.start.clone(), line.end.clone())};
        println!("Diagonal {:?} - {:?}", start, end);
      for i in 0..=end.x-start.x {
        let point = Point{ x:start.x + i, y: start.y + i };
        if let Some(&cross_point) = crosings.get(&point) {
          crosings.insert(point, cross_point + 1);
          if cross_point == 1i32 {
            high_crossings += 1;
          }
        } else {
          crosings.insert(point, 1);
        }

      }
    }
    else if line.is_anti_diagonal() {
      let (start, end) = if line.start.x > line.end.x {(line.end.clone(), line.start.clone())}
        else {(line.start.clone(), line.end.clone())};
        println!("Antidiagonal {:?} - {:?}", start, end);
      for i in 0..=end.x-start.x {
        let point = Point{ x:start.x+i, y: start.y - i };
        println!("{:?}", point);
        if let Some(&cross_point) = crosings.get(&point) {
          crosings.insert(point, cross_point + 1);
          if cross_point == 1i32 {
            high_crossings += 1;
          }
        } else {
          crosings.insert(point, 1);
        }

      }
    }
  }
  return high_crossings;
}

#[cfg(test)]
mod tests {
use super::*;

const INPUT: &str = r#"0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2"#;


  #[test]
  fn example1() {
    assert_eq!(solve_part1(&input_generator(INPUT)), 5);
  }

  #[test]
  fn example2() {
    assert_eq!(solve_part2(&input_generator(INPUT)), 12);
  }

}

