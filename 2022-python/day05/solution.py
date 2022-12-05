import re

# Move = namedtuple("Move", "crates from_stack to_stack")


def parse_data(data):
    stacks_str, moves_str = data.split("\n\n")
    moves_list = moves_str.split("\n")
    # stacks_list = stacks_str.split("\n")
    moves = list(map(lambda line: re.match(
        r'^move (\d+) from (\d+) to (\d+)', line).groups(), moves_list))
    # stacks = map(lambda line: re.match(
    #     r'^move (\d+) from (\d+) to (\d+)', line).groups(), stacks_list)
    # move 7 from 3 to 9
    # moves = map(lambda line: re.match(r'^[\[([A-Z])\]|\s{3}]', line).groups(), moves_list)

    # print(list(moves))
    # stacks = list()
    # # / skip first line
    # stacks.append(())
    # for row, i in enumerate(stacks_list):

    #     print(stack, len(stack))
    #     for col in range(1, len(stack), 4):
    #         print("*", stack[col], "*")
    #     print("\n*********\n")

    # stacks = {
    #     1: ['Z', "N"],
    #     2: ['M', "C", "D"],
    #     3: ['P'],
    # }
    # stacks = {
    #     1: ['S', 'M', "R", "N", "W", "J", "V", "T"],
    #     2: ["B", "W", "D", "J", "Q", "P", "C", "V"],
    #     3: ["B", "J", "F", "H", "D", "R", "P"],
    #     4: ["F", "R", "P", "B", "M", "N", "D"],
    #     5: ["H", "V", "R", "P", "T", "B"],
    #     6: ["C", "B", "P", "T"],
    #     7: ["B", "J", "R", "P", "L"],
    #     8: ["N", "C", "S", "L", "T", "Z", "B", "W"],
    #     9: ["L", "S", "G"],
    # }

    return moves


def part1(data, stacks):
    final_crates = ""
    moves = parse_data(data)
    print("stacks ", stacks, "\n*********\n", "moves ", list(moves))
    for move in moves:
        print("\n\nNew Move", move)
        for i in range(int(move[0])):
            thing_to_move = stacks[int(move[1])].pop()
            print("\nthing_to_move", thing_to_move)
            stacks[int(move[2])].append(thing_to_move)

    print("Final Stacks: ", stacks)
    final_crates = ""
    for i in range(1, len(stacks)+1):
        final_crates += stacks[i].pop()
    return final_crates


def part2(data, stacks):
    final_crates = ""
    moves = parse_data(data)
    print("stacks ", stacks, "\n*********\n", "moves ", list(moves))
    for move in moves:
        print("\n\nNew Move", move)
        to_move = []
        for i in range(int(move[0])):
            thing_to_move = stacks[int(move[1])].pop()
            print("\nthing_to_move", thing_to_move)
            to_move.append(thing_to_move)
        to_move.reverse()
        stacks[int(move[2])].extend(to_move)

    print("Final Stacks: ", stacks)
    final_crates = ""
    for i in range(1, len(stacks)+1):
        final_crates += stacks[i].pop()
    return final_crates
