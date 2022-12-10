
def get_insstruction(instruction):
    command = instruction.split(" ")
    if command[0] == "noop":
        amount = 0
    else:
        amount = int(command[1])
    return command[0], amount


BREAK_POINTS = [20, 60, 100, 140,  180, 220]


def part1(data):
    signal_strengths = 0
    cycle = 1
    cpu_X = 1
    for instruction in data:
        command, amount = get_insstruction(instruction)
        if command == "noop":
            if cycle in BREAK_POINTS:
                signal_strengths += cycle * cpu_X
            cycle += 1
        elif command == "addx":
            if cycle in BREAK_POINTS:
                signal_strengths += cycle * cpu_X
            cycle += 1
            if cycle in BREAK_POINTS:
                signal_strengths += cycle * cpu_X
            cycle += 1
            cpu_X += amount

    return signal_strengths


def in_sprite(cpu_X, position):
    return position in range(cpu_X - 1, cpu_X + 2)


def print_drawing(drawing):
    print("\n")
    for row in drawing:
        print("".join(row))


def part2(data):
    row = 0
    col = 0
    drawing = [[" " for _ in range(40)] for _ in range(6)]
    cycle = 1
    cpu_X = 1
    for instruction in data:
        command, amount = get_insstruction(instruction)
        if command == "noop":
            if col == 40:
                row += 1
                col = 0
            if in_sprite(cpu_X, col):
                drawing[row][col] = "◼️"
            cycle += 1
            col += 1
        elif command == "addx":
            if col == 40:
                row += 1
                col = 0
            if in_sprite(cpu_X, col):
                drawing[row][col] = "◼️"
            cycle += 1
            col += 1
            if col == 40:
                row += 1
                col = 0
            if in_sprite(cpu_X, col):
                drawing[row][col] = "◼️"
            cycle += 1
            col += 1
            cpu_X += amount
    print_drawing(drawing)

    return ["".join(line) for line in drawing]
