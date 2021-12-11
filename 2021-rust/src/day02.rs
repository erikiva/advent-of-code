type Move = (char, i32);
type Position = (i32, i32);

#[aoc_generator(day2)]
pub fn input_generator(input: &str) -> Vec<Move> {
  println!("Starting");
  input
    .lines()
    .map(|l| {
      let mut instruction = l.trim().split(' ');
      (
        instruction.next().unwrap().chars().next().unwrap(),
        instruction.next().unwrap().parse().unwrap(),
      )
    })
    .collect()
}

#[aoc(day2, part1)]
pub fn solve_part1(input: &[Move]) -> i32 {
  let pos = input.iter().fold((0, 0), |mut position, instr| {
    match instr {
      ('f', n) => position.1 += n,
      ('u', n) => position.0 -= n,
      ('d', n) => position.0 += n,
      _ => (),
    }
    position
  });

  return pos.0 * pos.1;
}

#[aoc(day2, part2)]
pub fn solve_part2(input: &[Move]) -> i32 {
  let mut position: Position = (0, 0);
  let mut aim: i32 = 0;
  for instr in input {
    match instr {
      ('f', n) => {
        position.0 += n;
        position.1 += aim * instr.1
      }
      ('u', n) => aim -= n,
      ('d', n) => aim += n,
      _ => (),
    }
  }
  return position.0 * position.1;
}

#[cfg(test)]
mod tests {
  use super::*;

  #[test]
  fn example1() {
    println!("WTF");
    assert_eq!(
      solve_part1(&input_generator(
        "forward 5
    down 5
    forward 8
    up 3
    down 8
    forward 2"
      )),
      150
    );
  }

  #[test]
  fn example2() {
    assert_eq!(
      solve_part2(&input_generator(
        "forward 5
    down 5
    forward 8
    up 3
    down 8
    forward 2"
      )),
      900
    );
  }
}
