import re


# def parse_stacks(data):
#     lines = data.strip().split("\n")
#     print("\n\n LINES ", lines)
#     cols = list(map(int, lines.pop().strip().split("   ")))
#     print("\n LINES AFTER REMUVING NUMBERING", lines)
#     stacks = dict()
#     for row in lines:
#         print("ROW -", row, "-")
#         col = 1
#         stacks[] = []
#         for i in range(1, len(row), 4):
#             if row[i].isupper():
#                 stacks[col].append(row[i])
#                 print(row[i], col)
#         print(row[i], col)
#     return {}


def parse_moves(data):
    # move 5 from 1 to 3
    moves = list(map(lambda line: list(map(int, re.match(
        r'^move (\d+) from (\d+) to (\d+)', line).groups())), data.split("\n")))

    return moves


def parse_data(data):
    stacks_str, moves_str = data.split("\n\n")
    # _ = parse_stacks(stacks_str)
    moves = parse_moves(moves_str)
    return moves


def part1(data, stacks):
    final_crates = ""
    moves = parse_data(data)
    for move in moves:
        for i in range(move[0]):
            thing_to_move = stacks[move[1]].pop()
            stacks[move[2]].append(thing_to_move)

    final_crates = ""
    for i in range(1, len(stacks)+1):
        final_crates += stacks[i].pop()
    return final_crates


def part2(data, stacks):
    final_crates = ""
    moves = parse_data(data)
    for move in moves:
        to_move = []
        for i in range(move[0]):
            print(stacks, move[1])
            thing_to_move = stacks[move[1]].pop()
            to_move.append(thing_to_move)
        to_move.reverse()
        stacks[move[2]].extend(to_move)

    final_crates = ""
    for i in range(1, len(stacks)+1):
        final_crates += stacks[i].pop()
    return final_crates
