use std::collections::HashMap;

#[aoc_generator(day14)]
pub fn input_generator(input: &str) -> (Vec<char>, HashMap<(char, char), char>) {
  let mut input = input.split("\n\n");
  let template = input.next().unwrap().chars().collect();
  let mut rules: HashMap<(char, char), char> = HashMap::new();
  let rule_list = input.next().unwrap().lines();
  for rule in rule_list {
    let mut parts = rule.trim().split(" -> ");
    let mut base = parts.next().unwrap().chars();
    rules.insert(
      (base.next().unwrap(), base.next().unwrap()),
      parts.next().unwrap().chars().next().unwrap(),
    );
  }
  (template, rules)
}

#[aoc(day14, part1)]
pub fn solve_part1(input: &(Vec<char>, HashMap<(char, char), char>)) -> usize {
  // println!("input {:?}", input);
  let mut template = input.0.clone();
  let rules = input.1.clone();

  for _ in 0..10 {
    let mut next: Vec<char> = vec![];
    let mut last: char = '0';
    for window in template.windows(2) {
      if let Some(insert) = rules.get(&(window[0], window[1])) {
        next.push(window[0]);
        next.push(*insert);
        last = window[1];
      }
    }
    next.push(last);
    template = next;
  }
  // println!("Template after 10 {:?}", template);
  template.sort();
  // println!("Sorted {:?}", template);
  let mut least: usize = usize::MAX;
  let mut most: usize = 0;
  for c in 'A'..='Z' {
    let occurances = template.iter().filter(|&n| *n == c).count();
    if occurances != 0 && occurances < least {
      least = occurances;
    }
    if occurances > most {
      most = occurances;
    }
  }
  // println!("Least: {} - most {}", least, most);
  most - least
}

#[aoc(day14, part2)]
pub fn solve_part2(input: &(Vec<char>, HashMap<(char, char), char>)) -> u64 {
  let template = input.0.clone();
  let rules = input.1.clone();
  let mut letters: HashMap<char, u64> = HashMap::new();
  let mut pairs: HashMap<(char, char), u64> = HashMap::new();

  // initialize with initial template
  for c in template.clone() {
    match letters.clone().get(&c) {
      Some(count) => {
        letters.insert(c, count + 1);
      }
      None => {
        letters.insert(c, 1);
      }
    }
  }

  for window in template.clone().windows(2) {
    match pairs.clone().get(&(window[0], window[1])) {
      Some(count) => {
        pairs.insert((window[0], window[1]), count + 1);
      }
      None => {
        pairs.insert((window[0], window[1]), 1);
      }
    }
  }

  // println!("Pairs: {:?} \n\t\t Letters: {:?} \n", pairs, letters);

  for _ in 0..40 {
    let mut new: HashMap<(char, char), u64> = HashMap::new();

    for (pair, count) in pairs.clone() {
      let mapping = rules.get(&pair).unwrap();

      match new.clone().get(&(pair.0, *mapping)) {
        Some(pair_count) => {
          new.insert((pair.0, *mapping), pair_count + count);
        }
        None => {
          new.insert((pair.0, *mapping), count);
        }
      }

      match new.clone().get(&(*mapping, pair.1)) {
        Some(pair_count) => {
          new.insert((*mapping, pair.1), pair_count + count);
        }
        None => {
          new.insert((*mapping, pair.1), count);
        }
      }

      // new.insert((pair.0, *mapping), count);
      // new.insert((*mapping, pair.1), count);
      match letters.clone().get(mapping) {
        Some(lcount) => {
          letters.insert(*mapping, lcount + count);
        }
        None => {
          letters.insert(*mapping, count);
        }
      }
    }
    pairs = new;
    // println!(
    //   "{} ---- Pairs: {:?} \n\t\t Letters: {:?} \n",
    //   i, pairs, letters
    // );
    // println!(
    //   "{} ---- Pairs: {:?} \n\t\t Letters: {:?} \n",
    //   i,
    //   pairs.len(),
    //   letters
    // );
  }
  let mut least: u64 = u64::MAX;
  let mut most: u64 = 0;
  for (_, count) in letters {
    if count > most {
      most = count;
    }
    if count < least {
      least = count;
    }
  }
  most - least
}

#[cfg(test)]
mod tests {
  use super::*;

  const INPUT: &str = r#"NNCB

  CH -> B
  HH -> N
  CB -> H
  NH -> C
  HB -> C
  HC -> B
  HN -> C
  NN -> C
  BH -> H
  NC -> B
  NB -> B
  BN -> B
  BB -> N
  BC -> B
  CC -> N
  CN -> C"#;

  #[test]
  fn example1() {
    assert_eq!(solve_part1(&input_generator(INPUT)), 1588);
  }

  #[test]
  fn example2() {
    assert_eq!(solve_part2(&input_generator(INPUT)), 2188189693529);
  }
}
