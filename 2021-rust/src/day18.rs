use std::collections::HashMap;

pub type Tree = HashMap<usize, i32>;

pub fn print_next(tree: &Tree, current: usize) {
  if let Some(node) = tree.get(&current) {
    if *node == -1 {
      print!("[");
      print_next(tree, current * 2);
      print!(",");
      print_next(tree, current * 2 + 1);
      print!("]");
    } else {
      print!("{}", node);
      // print!("{} ({}) ", node, current);
    }
  }
}
pub fn print_tree(tree: &Tree) {
  print_next(&tree, 1);
  println!("\n");
}

pub fn parse_chars(
  snailfish: &Vec<char>,
  tree: &mut Tree,
  global_pc: usize,
  parent: usize,
) -> usize {
  let mut pc = global_pc;
  let next = snailfish[pc + 1];
  tree.insert(parent, -1);

  match next {
    '[' => {
      pc = parse_chars(snailfish, tree, pc + 1, parent * 2);
    }
    n => {
      tree.insert(parent * 2, n as i32 - 0x30);
      pc += 1;
    }
  };

  if (snailfish[pc + 1]) != ',' {
    panic!("Something is wrong:  Expected comma at {:?}", pc + 1);
  }
  pc += 1;
  let next = snailfish[pc + 1];
  match next {
    '[' => {
      pc = parse_chars(snailfish, tree, pc + 1, parent * 2 + 1);
    }
    n => {
      tree.insert(parent * 2 + 1, n as i32 - 0x30);
      pc += 1
    }
  };
  if (snailfish[pc + 1]) != ']' {
    panic!("Something is wrong:  Expected ] at {:?}", pc + 1);
  }
  pc += 1;
  pc
}

pub fn process_snailfish(snailfish: &Vec<char>) -> Tree {
  let mut snailfish_tree: Tree = HashMap::new();
  parse_chars(&snailfish, &mut snailfish_tree, 0, 1);
  snailfish_tree
}

pub fn find_left(tree: &mut Tree, index: usize) -> usize {
  let mut lkey = index;
  while lkey % 2 == 0 {
    lkey /= 2;
  }
  if lkey == 1 {
    return 0;
  }
  let cousin = lkey - 1;
  if let Some(&lnode) = tree.get(&cousin) {
    if lnode != -1 {
      return cousin;
    } else {
      let mut go_right = cousin;
      loop {
        go_right = go_right * 2 + 1;
        if let Some(&node) = tree.get(&go_right) {
          if node == -1 {
            continue;
          } else {
            return go_right;
          }
        }
      }
    }
  }
  0
}

pub fn find_right(tree: &mut Tree, index: usize) -> usize {
  let mut rkey = index;
  while rkey % 2 != 0 {
    rkey /= 2;
  }
  if rkey == 0 {
    return 0;
  }
  let cousin = rkey + 1;
  if let Some(&rnode) = tree.get(&cousin) {
    if rnode != -1 {
      return cousin;
    } else {
      let mut go_left = cousin;
      loop {
        go_left = go_left * 2;
        if let Some(&node) = tree.get(&go_left) {
          if node == -1 {
            continue;
          } else {
            return go_left;
          }
        }
      }
    }
  }
  0
}

#[allow(dead_code)]
pub fn explode(tree: &mut Tree) -> bool {
  let mut exploded: bool = false;
  for l_index in 32..=64 {
    if let Some(&lnode) = tree.get(&l_index) {
      let left_cousin = find_left(tree, l_index);
      if left_cousin != 0 {
        let aux_tree = tree.clone();
        if let Some(&cousin) = aux_tree.get(&(left_cousin)) {
          tree.insert(left_cousin, cousin + lnode);
        }
      }

      let r_index = l_index + 1;

      if let Some(&rnode) = tree.get(&r_index) {
        let right_cousin = find_right(tree, r_index);
        if right_cousin != 0 {
          let aux_tree = tree.clone();
          if let Some(&cousin) = aux_tree.get(&(right_cousin)) {
            tree.insert(right_cousin, cousin + rnode);
          }
        }
      }

      tree.insert(l_index / 2, 0);
      tree.remove(&l_index);
      tree.remove(&r_index);
      exploded = true;
      break;
    } // end found exploding node
  }

  exploded
}

pub fn add_rec(main_tree: &mut Tree, tree: &Tree, index: usize, key: usize) {
  if let Some(&node) = tree.get(&key) {
    if node >= 0 {
      main_tree.insert(index, node);
    } else {
      main_tree.insert(index, -1);
      add_rec(main_tree, tree, index * 2, key * 2);
      add_rec(main_tree, tree, index * 2 + 1, key * 2 + 1);
    }
  }
}

#[allow(dead_code)]
pub fn add(tree1: &Tree, tree2: &Tree) -> Tree {
  let mut new_tree: Tree = HashMap::new();
  new_tree.insert(1, -1);
  add_rec(&mut new_tree, tree1, 2, 1);
  add_rec(&mut new_tree, tree2, 3, 1);
  new_tree
}

#[allow(dead_code)]
pub fn split(tree: &mut Tree, current: usize) -> bool {
  let mut splitted: bool = false;

  if let Some(&node) = tree.get(&current) {
    if node == -1 {
      splitted = split(tree, current * 2);
      if !splitted {
        splitted = split(tree, current * 2 + 1);
      }
    } else if node > 9 {
      tree.insert(current, -1);
      let left = node / 2;
      let right = node - left;
      tree.insert(current * 2, left);
      tree.insert(current * 2 + 1, right);
      splitted = true;
    }
  }

  splitted
}

pub fn process_tree(tree: &mut Tree) {
  let mut exploded: bool;
  let mut splitted: bool;
  loop {
    loop {
      exploded = explode(tree);
      if !exploded {
        break;
      }
    }
    splitted = split(tree, 1);
    if !splitted {
      break;
    }
  }
}

#[aoc_generator(day18)]
pub fn input_generator(input: &str) -> Vec<Tree> {
  let mut snailfish_trees: Vec<Tree> = vec![];
  let snailfish_list: Vec<Vec<char>> = input.lines().map(|l| l.trim().chars().collect()).collect();

  for snailfish in snailfish_list {
    let tree = process_snailfish(&snailfish);
    snailfish_trees.push(tree);
  }
  snailfish_trees
}

pub fn calculate_magnitude(tree: &Tree, index: usize) -> i32 {
  if let Some(&node) = tree.get(&index) {
    if node == -1 {
      return 3 * calculate_magnitude(tree, index * 2)
        + 2 * calculate_magnitude(tree, index * 2 + 1);
    } else {
      return node;
    }
  }
  panic!("What are you doing here??!!");
}

#[aoc(day18, part1)]
pub fn solve_part1(snailfish: &Vec<Tree>) -> i32 {
  let mut accumulator = snailfish[0].clone();

  for i in 1..snailfish.len() {
    accumulator = add(&accumulator, &snailfish[i]);
    process_tree(&mut accumulator);
  }
  let res = calculate_magnitude(&accumulator, 1);
  res
}

#[aoc(day18, part2)]
pub fn solve_part2(snailfish: &Vec<Tree>) -> i32 {
  let mut max_magnitude: i32 = 0;

  for i in 0..snailfish.len() {
    for j in i + 1..snailfish.len() {
      let mut sum = add(&snailfish[i], &snailfish[j]);
      process_tree(&mut sum);
      let mag = calculate_magnitude(&sum, 1);
      if mag > max_magnitude {
        max_magnitude = mag;
      }
      let mut sum = add(&snailfish[j], &snailfish[i]);
      process_tree(&mut sum);
      let mag = calculate_magnitude(&sum, 1);
      if mag > max_magnitude {
        max_magnitude = mag;
      }
    }
  }

  max_magnitude
}

#[cfg(test)]
mod tests {
  use super::*;

  #[test]
  fn example1a() {
    assert_eq!(
      solve_part1(&input_generator(
        "[[[[7,7],[7,7]],[[8,7],[8,7]]],[[[7,0],[7,7]],9]]
      [[[[4,2],2],6],[8,7]]"
      )),
      3488
    );
  }

  #[test]
  fn example1b() {
    assert_eq!(
      solve_part1(&input_generator(
        "[[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]]
        [[[5,[2,8]],4],[5,[[9,9],0]]]
        [6,[[[6,2],[5,6]],[[7,6],[4,7]]]]
        [[[6,[0,7]],[0,9]],[4,[9,[9,0]]]]
        [[[7,[6,4]],[3,[1,3]]],[[[5,5],1],9]]
        [[6,[[7,3],[3,2]]],[[[3,8],[5,7]],4]]
        [[[[5,4],[7,7]],8],[[8,3],8]]
        [[9,3],[[9,9],[6,[4,9]]]]
        [[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]]
        [[[[5,2],5],[8,[3,7]]],[[5,[7,5]],[4,4]]]"
      )),
      4140
    );
  }

  #[test]
  fn example1c() {
    assert_eq!(solve_part1(&input_generator("[[1,2],3]")), 0);
  }

  #[test]
  fn example1d() {
    assert_eq!(
      solve_part1(&input_generator(
        "[[[9,[3,8]],[[0,9],6]],[[[3,7],[4,9]],3]]"
      )),
      0
    );
  }

  #[test]
  fn example_explode() {
    println!("\n\n");
    let tree_list = input_generator("[[[[[4,3],4],4],[7,[[8,4],9]]],[1,1]]");
    let mut tree = tree_list[0].clone();
    assert_eq!(explode(&mut tree), true);
  }

  #[test]
  fn example_explode1() {
    println!("\n\n");
    let tree_list = input_generator("[[[[0,7],4],[7,[[8,4],9]]],[1,1]]");
    let mut tree = tree_list[0].clone();
    assert_eq!(explode(&mut tree), true);
  }

  #[test]
  fn example_explode2() {
    println!("\n\n");
    let tree_list = input_generator("[[[[[9,8],1],2],3],4]");
    let mut tree = tree_list[0].clone();
    assert_eq!(explode(&mut tree), true);
  }

  #[test]
  fn example_explode3() {
    println!("\n\n");
    let tree_list = input_generator("[7,[6,[5,[4,[3,2]]]]]");
    let mut tree = tree_list[0].clone();
    assert_eq!(explode(&mut tree), true);
  }

  #[test]
  fn example_explode3b() {
    println!("\n\n");
    let tree_list = input_generator("[[3,[2,[1,[7,3]]]],[6,[5,[4,[3,2]]]]]");
    let mut tree = tree_list[0].clone();
    assert_eq!(explode(&mut tree), true);
  }

  #[test]
  fn example_split1() {
    println!("\n\n");
    let tree_list = input_generator("[[[[0,7],4],[15,[0,13]]],[1,1]]");
    let mut tree = tree_list[0].clone();
    assert_eq!(split(&mut tree, 1), true);
  }

  #[test]
  fn example2() {
    assert_eq!(
      solve_part2(&input_generator(
        "[[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]]
    [[[5,[2,8]],4],[5,[[9,9],0]]]
    [6,[[[6,2],[5,6]],[[7,6],[4,7]]]]
    [[[6,[0,7]],[0,9]],[4,[9,[9,0]]]]
    [[[7,[6,4]],[3,[1,3]]],[[[5,5],1],9]]
    [[6,[[7,3],[3,2]]],[[[3,8],[5,7]],4]]
    [[[[5,4],[7,7]],8],[[8,3],8]]
    [[9,3],[[9,9],[6,[4,9]]]]
    [[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]]
    [[[[5,2],5],[8,[3,7]]],[[5,[7,5]],[4,4]]]"
      )),
      3993
    );
  }
}
