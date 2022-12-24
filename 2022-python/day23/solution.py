
from collections import namedtuple


Point = namedtuple("Point", "x y")
directions = {
    "N": Point(0, -1),
    "S": Point(0, 1),
    "E": Point(1, 0),
    "W": Point(-1, 0),
    "NE": Point(1, -1),
    "NW": Point(-1, -1),
    "SE": Point(1, 1),
    "SW": Point(-1, 1),
}


def draw_elfs(elfs):
    min_x = min(elfs.keys(), key=lambda x: x.x).x
    max_x = max(elfs.keys(), key=lambda x: x.x).x
    min_y = min(elfs.keys(), key=lambda x: x.y).y
    max_y = max(elfs.keys(), key=lambda x: x.y).y
    for y in range(min_y, max_y + 1):
        for x in range(min_x, max_x + 1):
            print("#" if elfs.get(Point(x, y), False) else ".", end="")
        print()


def count_free_tiles(elfs):
    tiles = 0
    min_x = min(elfs.keys(), key=lambda x: x.x).x
    max_x = max(elfs.keys(), key=lambda x: x.x).x
    min_y = min(elfs.keys(), key=lambda x: x.y).y
    max_y = max(elfs.keys(), key=lambda x: x.y).y
    for y in range(min_y, max_y + 1):
        for x in range(min_x, max_x + 1):
            if not elfs.get(Point(x, y), False):
                tiles += 1
    return tiles


def is_isolated(elfs, elf):
    if any([elfs.get((elf[0] + direction.x, elf[1] + direction.y), False)
            for direction in directions.values()]):
        return False
    return True


def get_elf_positions(data):
    elfs = {}
    elf_layout = [list(y) for y in data]
    for y in range(len(elf_layout)):
        for x in range(len(elf_layout[y])):
            if elf_layout[y][x] == "#":
                elfs[Point(x, y)] = True
    return elfs


def get_proposed_move(elfs, elf, order):
    for direction in order:
        if all(Point(elf.x + directions[d].x, elf.y + directions[d].y) not in elfs.keys() for d in direction):
            return Point(elf.x + directions[direction[0]].x, elf.y + directions[direction[0]].y)
    return None


def part1(data):
    rounds = 0
    order = [["N", "NE", "NW"], ["S", "SE", "SW"],
             ["W", "NW", "SW"], ["E", "NE", "SE"]]
    elfs = get_elf_positions(data)
    elfs_moved = True
    draw_elfs(elfs)
    while elfs_moved and rounds < 10:
        elfs_moved = False
        proposed_moves = {}
        for elf in list(elfs.keys()):
            if is_isolated(elfs, elf):
                continue
            proposed_move = get_proposed_move(elfs, elf, order)
            if proposed_move is not None:
                if proposed_move not in proposed_moves.keys():
                    proposed_moves[proposed_move] = [elf]
                else:
                    proposed_moves[proposed_move].append(elf)
        for move in proposed_moves.keys():
            if len(proposed_moves[move]) > 1:
                continue
            else:
                elfs[move] = True
                elfs.pop(proposed_moves[move][0])
                if elfs_moved == False:
                    elfs_moved = True
        draw_elfs(elfs)
        dir = order.pop(0)
        order.append(dir)
        rounds += 1
    count = count_free_tiles(elfs)
    return count


def part2(data):
    rounds = 0
    order = [["N", "NE", "NW"], ["S", "SE", "SW"],
             ["W", "NW", "SW"], ["E", "NE", "SE"]]
    elfs = get_elf_positions(data)
    elfs_moved = True
    while elfs_moved:
        elfs_moved = False
        proposed_moves = {}
        for elf in list(elfs.keys()):
            if is_isolated(elfs, elf):
                continue
            proposed_move = get_proposed_move(elfs, elf, order)
            if proposed_move is not None:
                if proposed_move not in proposed_moves.keys():
                    proposed_moves[proposed_move] = [elf]
                else:
                    proposed_moves[proposed_move].append(elf)
        for move in proposed_moves.keys():
            if len(proposed_moves[move]) > 1:
                continue
            else:
                elfs[move] = True
                elfs.pop(proposed_moves[move][0])
                if elfs_moved == False:
                    elfs_moved = True
        dir = order.pop(0)
        order.append(dir)
        rounds += 1
    return rounds
