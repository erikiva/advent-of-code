import json
from functools import cmp_to_key


def get_pair(data):
    first, second = data.split("\n")
    first = json.loads(first)
    second = json.loads(second)
    return [first, second]


def is_ordered(left, right):
    if isinstance(left, int) and isinstance(right, int):
        return right - left
    elif isinstance(left, list) and isinstance(right, list):
        for pair in zip(left, right):
            # if pair[0] == pair[1]:
            #     continue
            ord = is_ordered(*pair)
            if ord != 0:
                return ord
        return len(right) - len(left)
    elif isinstance(left, list) and isinstance(right, int):
        return is_ordered(left, [right])
    elif isinstance(left, int) and isinstance(right, list):
        return is_ordered([left], right)


def part1(data):
    ordered = []
    signal_pairs = map(get_pair, data)
    for i, [left, right] in enumerate(signal_pairs, 1):
        if is_ordered(left, right) > 0:
            ordered.append(i)
    # print(ordered)
    return sum(ordered)


def get_packets(data):
    packets = []
    for line in data:
        first, second = line.split("\n")
        first = json.loads(first)
        second = json.loads(second)
        packets.extend([first, second])
    packets.append([[2]])
    packets.append([[6]])
    return packets


def print_packets(packets):
    for i, packet in enumerate(packets, 1):
        print(i, packet)


def part2(data):
    packets = get_packets(data)
    ordered = sorted(packets, key=cmp_to_key(is_ordered), reverse=True)
    # print_packets(ordered)
    sep1 = ordered.index([[2]]) + 1
    sep2 = ordered.index([[6]]) + 1
    return sep1 * sep2
