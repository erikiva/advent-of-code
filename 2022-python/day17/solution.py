
ROCKS = [[(0, 0), (1, 0), (2, 0), (3, 0)],
         [(1, 0), (0, 1), (1, 1), (2, 1), (1, 2)],
         [(0, 0), (1, 0), (2, 0), (2, 1), (2, 2)],
         [(0, 0), (0, 1), (0, 2), (0, 3)],
         [(0, 0), (1, 0), (0, 1), (1, 1)]]

moves = {"down": (0, -1), "<": (-1, 0), ">": (1, 0)}


def get_initial_coords(height, rock):
    corner = (2, height+3)
    return [(corner[0] + coord[0], corner[1] + coord[1]) for coord in rock]


def get_next_pos(cave, rock, move):
    new_rock_coords = list(map(lambda point: (
        point[0] + move[0], point[1] + move[1]), rock))
    if any(coord[0] < 0 or coord[0] == 7 or coord[1] < 0 or cave.get((coord), ".") == "#" for coord in rock for coord in new_rock_coords):
        return rock
    else:
        return new_rock_coords


def is_at_bottom(cave, rock):
    return any(coord[1] < 0 or cave.get((coord), ".") == "#" for coord in rock)


DEBUG = False


def draw_cave(cave, rock):
    if not DEBUG:
        return
    for y in reversed(range(20)):
        print("|", end="")
        for x in range(0, 7):
            if (x, y) in rock:
                print("@", end="")
            else:
                print(cave.get((x, y), "."), end="")
        print("|")
    print("+-------+\n")


def part1(gas, total_rocks=2022):
    cave = {}
    height = 0
    jets = 0
    print(len(gas))
    for next in range(total_rocks):
        rock = get_initial_coords(height, ROCKS[next % 5])
        done = False
        while not done:
            draw_cave(cave, rock)
            move = moves[gas[jets % len(gas)]]
            # print("Moving ", gas[jets], move)
            jets += 1
            direction = move
            rock = get_next_pos(cave, rock, direction)
            direction = moves["down"]
            new_rock_coords = get_next_pos(cave, rock, direction)
            if rock == new_rock_coords:
                # print("Hit bottom")
                done = True
                height = max(height, max(coord[1]
                             for coord in rock) + 1)
                for coord in rock:
                    cave[coord] = "#"
                # print("new height: ", height)
                draw_cave(cave, [])
            else:
                rock = new_rock_coords

    return height


def get_row(cave, y):
    return "".join(cave.get((x, y), ".") for x in range(0, 6))


def part2(gas, total_rocks=10000000):
    cave = {}
    height = 0
    jets = 0
    print(len(gas))
    for next in range(total_rocks):
        last_row = get_row(cave, height - 1)
        first_row = get_row(cave, 0)
        if last_row == first_row and jets > 100:
            print("matching_row", jets, jets % len(gas))
            break
        rock = get_initial_coords(height, ROCKS[next % 5])
        done = False
        while not done:
            draw_cave(cave, rock)
            move = moves[gas[jets % len(gas)]]
            # print("Moving ", gas[jets], move)
            jets += 1
            direction = move
            rock = get_next_pos(cave, rock, direction)
            direction = moves["down"]
            new_rock_coords = get_next_pos(cave, rock, direction)
            if rock == new_rock_coords:
                # print("Hit bottom")
                done = True
                height = max(height, max(coord[1]
                             for coord in rock) + 1)
                for coord in rock:
                    cave[coord] = "#"
                # print("new height: ", height)
                draw_cave(cave, [])
            else:
                rock = new_rock_coords

    return height
