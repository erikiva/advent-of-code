use std::collections::HashMap;

#[derive(Clone, Debug)]
pub struct Packet {
  version: u32,
  type_id: u32,
  sub_packets: Vec<usize>,
  length_type_id: u32,
  value: u64,
}

pub fn to_binary(c: char) -> Vec<u32> {
  let b = match c {
    '0' => "0000",
    '1' => "0001",
    '2' => "0010",
    '3' => "0011",
    '4' => "0100",
    '5' => "0101",
    '6' => "0110",
    '7' => "0111",
    '8' => "1000",
    '9' => "1001",
    'A' => "1010",
    'B' => "1011",
    'C' => "1100",
    'D' => "1101",
    'E' => "1110",
    'F' => "1111",
    _ => "",
  };

  b.chars().map(|c| c as u32 - 0x30).collect()
}

pub fn to_dec(num: &[u32]) -> u32 {
  num.iter().fold(0, |dec, next| dec * 2 + next)
}

pub fn to_big_dec(num: &[u32]) -> u64 {
  num.iter().fold(0, |dec, &next| dec * 2 + next as u64)
}

#[aoc_generator(day16)]
pub fn input_generator(input: &str) -> Vec<u32> {
  let hex: Vec<char> = input.chars().collect();
  let mut code: Vec<u32> = vec![];

  for c in hex {
    let cbin = to_binary(c);
    code.extend(cbin);
  }
  println!("Code is : {:?}", code);
  return code;
}

pub fn process_packet(
  code: &[u32],
  global_pc: usize,
  instructions: &mut HashMap<usize, Packet>,
) -> usize {
  let mut pc = 0;
  let mut length_type_id: u32 = 0;
  let mut value: u64 = 0;
  let mut sub_packets: Vec<usize> = vec![];

  let version = to_dec(&code[pc..pc + 3]);
  pc += 3;
  let type_id = to_dec(&code[pc..pc + 3]);
  pc += 3;
  if type_id == 4 {
    let mut literal: Vec<u32> = vec![];
    loop {
      let lead = code[pc];
      let val = &code[pc + 1..pc + 5];
      literal = [literal, val.to_vec()].concat();
      pc += 5;
      if lead == 0 {
        break;
      }
    }
    value = to_big_dec(&literal);
  } else {
    length_type_id = code[pc];

    pc += 1;
    if length_type_id == 0 {
      let mut sub_packet_value = to_dec(&code[pc..pc + 15]) as usize;
      pc += 15;
      while sub_packet_value > 0 {
        sub_packets.push(global_pc + pc);
        let read = process_packet(&code[pc..], global_pc + pc, instructions);
        pc += read;
        sub_packet_value -= read;
      }
    } else {
      let sub_packet_value = to_dec(&code[pc..pc + 11]) as usize;
      pc += 11;
      for _ in 0..sub_packet_value {
        sub_packets.push(global_pc + pc);
        let read = process_packet(&code[pc..], global_pc + pc, instructions);
        pc += read;
      }
    }
  }

  let packet = Packet {
    version,
    type_id,
    sub_packets,
    value,
    length_type_id,
  };

  instructions.insert(global_pc, packet);

  pc
}

pub fn add_versions(instructions: &HashMap<usize, Packet>, packet_key: usize) -> u32 {
  if let Some(packet) = instructions.get(&packet_key) {
    if packet.sub_packets.len() == 0 {
      return packet.version;
    } else {
      let mut subversion = 0;
      for sub in &packet.sub_packets {
        subversion += add_versions(instructions, *sub as usize);
      }
      return packet.version + subversion;
    }
  }
  0
}

#[aoc(day16, part1)]
pub fn solve_part1(code: &Vec<u32>) -> u32 {
  let mut instructions: HashMap<usize, Packet> = HashMap::new();
  process_packet(&code[..], 0, &mut instructions);

  add_versions(&instructions, 0)
}

pub fn process_instructions(instructions: &HashMap<usize, Packet>, packet_key: usize) -> u128 {
  if let Some(packet) = instructions.get(&packet_key) {
    match packet.type_id {
      0 => {
        let mut sum = 0;
        for sub in &packet.sub_packets {
          sum += process_instructions(instructions, *sub as usize);
        }
        return sum;
      }
      1 => {
        let mut prod = 1;
        for sub in &packet.sub_packets {
          prod *= process_instructions(instructions, *sub as usize);
        }
        return prod;
      }
      2 => {
        let mut min = u128::MAX;
        for sub in &packet.sub_packets {
          let new_val = process_instructions(instructions, *sub as usize);
          if new_val < min {
            min = new_val;
          }
        }
        return min;
      }
      3 => {
        let mut max = 0;
        for sub in &packet.sub_packets {
          let new_val = process_instructions(instructions, *sub as usize);
          if new_val > max {
            max = new_val;
          }
        }
        return max;
      }
      4 => {
        return packet.value as u128;
      }
      5 => {
        let val1 = process_instructions(instructions, packet.sub_packets[0]);
        let val2 = process_instructions(instructions, packet.sub_packets[1]);
        return if val1 > val2 { 1 } else { 0 };
      }
      6 => {
        let val1 = process_instructions(instructions, packet.sub_packets[0]);
        let val2 = process_instructions(instructions, packet.sub_packets[1]);
        return if val1 < val2 { 1 } else { 0 };
      }
      7 => {
        let val1 = process_instructions(instructions, packet.sub_packets[0]);
        let val2 = process_instructions(instructions, packet.sub_packets[1]);
        return if val1 == val2 { 1 } else { 0 };
      }
      n => {
        panic!("You should not be here {}.", n);
      }
    }
  }
  panic!("You should not be here");
}

#[aoc(day16, part2)]
pub fn solve_part2(code: &Vec<u32>) -> u128 {
  let mut instructions: HashMap<usize, Packet> = HashMap::new();
  process_packet(&code[..], 0, &mut instructions);
  process_instructions(&instructions, 0)
}

#[cfg(test)]
mod tests {
  use super::*;

  // #[test]
  // fn example1() {
  //   assert_eq!(solve_part1(&input_generator("D2FE28")), 6);
  // }

  // #[test]
  // fn example1a() {
  //   assert_eq!(solve_part1(&input_generator("38006F45291200")), 0);
  // }

  // #[test]
  // fn example1b() {
  //   assert_eq!(solve_part1(&input_generator("EE00D40C823060")), 0);
  // }

  #[test]
  fn example1c() {
    assert_eq!(solve_part1(&input_generator("8A004A801A8002F478")), 16);
  }

  #[test]
  fn example1d() {
    assert_eq!(
      solve_part1(&input_generator("620080001611562C8802118E34")),
      12
    );
  }

  #[test]
  fn example1e() {
    assert_eq!(
      solve_part1(&input_generator("C0015000016115A2E0802F182340")),
      23
    );
  }

  //   #[test]
  //   fn example1f() {
  //     assert_eq!(
  //       solve_part1(&input_generator("A0016C880162017C3686B18A3D4780")),
  //       31
  //     );
  //   }

  #[test]
  fn example2() {
    assert_eq!(solve_part2(&input_generator("C200B40A82")), 3);
  }

  #[test]
  fn example2b() {
    assert_eq!(
      solve_part2(&input_generator("9C0141080250320F1802104A08")),
      1
    );
  }

  #[test]
  fn example2_max() {
    assert_eq!(solve_part2(&input_generator("CE00C43D881120")), 9);
  }

  #[test]
  fn example2_min() {
    assert_eq!(solve_part2(&input_generator("880086C3E88112")), 7);
  }

  #[test]
  fn example2_less_than() {
    assert_eq!(solve_part2(&input_generator("D8005AC2A8F0")), 1);
  }

  #[test]
  fn example2_product() {
    assert_eq!(solve_part2(&input_generator("04005AC33890")), 54);
  }

  #[test]
  fn example2_greater_than() {
    assert_eq!(solve_part2(&input_generator("F600BC2D8F")), 0);
  }

  #[test]
  fn example2_equal() {
    assert_eq!(solve_part2(&input_generator("9C005AC2F8F0")), 0);
  }
}
