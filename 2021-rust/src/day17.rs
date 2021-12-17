#[derive(Copy, Clone, Debug)]
pub struct TargetArea {
  x_min: i32,
  x_max: i32,
  y_min: i32,
  y_max: i32,
}

#[aoc_generator(day17)]
pub fn input_generator(input: &str) -> TargetArea {
  let range = input
    .replace("target area: ", "")
    .replace("x=", "")
    .replace(" y=", "")
    .replace("..", ",");
  let mut dimensions = range.split(",");

  TargetArea {
    x_min: dimensions.next().unwrap().parse().unwrap(),
    x_max: dimensions.next().unwrap().parse().unwrap(),
    y_min: dimensions.next().unwrap().parse().unwrap(),
    y_max: dimensions.next().unwrap().parse().unwrap(),
  }
}

pub fn find_highest(area: &TargetArea, vel: (i32, i32)) -> i32 {
  let mut velocity = vel.clone();
  let mut highest = 0;
  let mut position = (0, 0);
  let mut hit_trench = false;

  while position.0 <= area.x_max && position.1 >= area.y_min && !hit_trench {
    if position.0 >= area.x_min
      && position.0 <= area.x_max
      && position.1 >= area.y_min
      && position.1 <= area.y_max
    {
      hit_trench = true;
      println!("Hit it! {:?}", position);
    }
    position.0 += velocity.0;
    position.1 += velocity.1;
    if position.1 > highest {
      highest = position.1;
    }
    if velocity.0 > 0 {
      velocity.0 -= 1;
    } else if velocity.0 < 0 {
      velocity.0 += 1;
    }
    velocity.1 -= 1;
  }

  if hit_trench {
    highest
  } else {
    0
  }
}

#[aoc(day17, part1)]
pub fn solve_part1(area: &TargetArea) -> i32 {
  let mut highest = 0;
  for x in 1..=area.x_min {
    for y in 0..=100 {
      let high = find_highest(&area, (x, y));
      if high > highest {
        highest = high;
      }
    }
  }
  highest
}

pub fn is_valid(area: &TargetArea, vel: (i32, i32)) -> bool {
  let mut velocity = vel.clone();
  let mut position = (0, 0);

  while position.0 <= area.x_max && position.1 >= area.y_min {
    if position.0 >= area.x_min
      && position.0 <= area.x_max
      && position.1 >= area.y_min
      && position.1 <= area.y_max
    {
      return true;
    }
    position.0 += velocity.0;
    position.1 += velocity.1;

    if velocity.0 > 0 {
      velocity.0 -= 1;
    } else if velocity.0 < 0 {
      velocity.0 += 1;
    }
    velocity.1 -= 1;
  }
  return false;
}

#[aoc(day17, part2)]
pub fn solve_part2(area: &TargetArea) -> u32 {
  let mut count = 0;
  for x in 1..=area.x_max {
    for y in area.y_min..=1000 {
      let hit = is_valid(&area, (x, y));
      if hit {
        count += 1;
      }
    }
  }
  count
}

#[cfg(test)]
mod tests {
  use super::*;

  const INPUT: &str = r#"target area: x=20..30, y=-10..-5"#;

  #[test]
  fn example1() {
    assert_eq!(solve_part1(&input_generator(INPUT)), 45);
  }

  #[test]
  fn example2() {
    assert_eq!(solve_part2(&input_generator(INPUT)), 112);
  }
}
