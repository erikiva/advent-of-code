#[derive(Clone)]
pub struct Board {
  rows: Vec<Vec<i32>>,
  rows_done: [i32; 5],
  cols_done: [i32; 5],
  winner: bool,
}

pub struct Bingo {
  moves: Vec<i32>,
  boards: Vec<Board>,
}

#[aoc_generator(day4)]
pub fn input_generator(input: &str) -> Bingo {
  let mut input = input.split("\n\n");
  let moves = input
    .next()
    .unwrap()
    .split(",")
    .map(|m| m.parse().unwrap())
    .collect();
  let boards: Vec<Board> = input
    .map(|b| Board {
      rows: b
        .lines()
        .map(|l| {
          l.trim()
            .split_whitespace()
            .map(|n| n.parse().unwrap())
            .collect()
        })
        .collect(),
      rows_done: [0; 5],
      cols_done: [0; 5],
      winner: false,
    })
    .collect();
  Bingo { moves, boards }
}

#[aoc(day4, part1)]
pub fn solve_part1(bingo: &Bingo) -> i32 {
  let moves = bingo.moves.clone();
  let mut boards = bingo.boards.clone();
  for n in 0..moves.len() {
    for b in 0..boards.len() {
      for r in 0..boards[b].rows.len() {
        for c in 0..boards[b].rows[0].len() {
          if boards[b].rows[r][c] == moves[n] {
            boards[b].rows[r][c] = -1;
            boards[b].rows_done[r] += 1;
            boards[b].cols_done[c] += 1;
          }
          if boards[b].rows_done[r] == 5 || boards[b].cols_done[c] == 5 {
            return moves[n]
              * boards[b]
                .rows
                .clone()
                .into_iter()
                .flatten()
                .filter(|c| *c != -1i32)
                .sum::<i32>();
          }
        }
      }
    }
  }

  return 0;
}

#[aoc(day4, part2)]
pub fn solve_part2(bingo: &Bingo) -> i32 {
  let moves = bingo.moves.clone();
  let mut boards = bingo.boards.clone();
  let mut score: i32 = 0;
  for n in 0..moves.len() {
    for b in 0..boards.len() {
      if boards[b].winner {
        continue;
      }
      for r in 0..boards[b].rows.len() {
        for c in 0..boards[b].rows[0].len() {
          if boards[b].rows[r][c] == moves[n] {
            boards[b].rows[r][c] = -1;
            boards[b].rows_done[r] += 1;
            boards[b].cols_done[c] += 1;
            if boards[b].rows_done[r] == 5 || boards[b].cols_done[c] == 5 {
              boards[b].winner = true;
              score = moves[n]
                * boards[b]
                  .rows
                  .clone()
                  .into_iter()
                  .flatten()
                  .filter(|c| *c != -1i32)
                  .sum::<i32>();
            }
          }
        }
      }
    }
  }

  return score;
}

#[cfg(test)]
mod tests {
  use super::*;

  const INPUT: &str = r#"7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7"#;

  #[test]
  fn example1() {
    assert_eq!(solve_part1(&input_generator(INPUT)), 4512);
  }

  #[test]
  fn example2() {
    assert_eq!(solve_part2(&input_generator(INPUT)), 1924);
  }
}
