

DOWN = [0, 1]
DOWN_LEFT = [-1, 1]
DOWN_RIGHT = [1, 1]


def nums_to_coords(nums):
    x, y = nums.split(",")
    return (int(x), int(y))


def draw_map(terrain_map, min_point, max_point):
    for y in range(min_point[1], max_point[1] + 1):
        for x in range(min_point[0], max_point[0] + 1):

            print(terrain_map.get((x, y), "."), end="")
        print()
    print("\n")


def get_map(data):
    terrain_map = {}
    xs = set()
    ys = set()
    xs.add(500)
    ys.add(0)
    for path in data:
        path = list(map(nums_to_coords, path.split(" -> ")))
        for index in range(len(path) - 1):
            x0, y0 = path[index]
            x1, y1 = path[index + 1]
            xs.add(x0)
            xs.add(x1)
            ys.add(y0)
            ys.add(y1)

            if y0 == y1:
                if x0 < x1:
                    xrange = range(x0, x1 + 1)
                else:
                    xrange = range(x1, x0 + 1)
                for x in xrange:
                    terrain_map[(x, y0)] = '#'
            elif path[index][0] == path[index + 1][0]:
                if y0 < y1:
                    yrange = range(y0, y1 + 1)
                else:
                    yrange = range(y1, y0 + 1)
                for y in yrange:
                    terrain_map[(x0, y)] = '#'
        min_point = (min(xs), min(ys))
        max_point = (max(xs), max(ys))
    return terrain_map, min_point, max_point


def add_sand_grain(terrain_map, max_point):
    sand_start_pos = (500, 0)
    directions = [DOWN, DOWN_LEFT, DOWN_RIGHT]
    sand_pos = sand_start_pos
    moved = True
    while moved:
        moved = False
        for direction in directions:
            new_pos = (sand_pos[0] + direction[0], sand_pos[1] + direction[1])
            if new_pos[1] > max_point[1]:
                return None
            if terrain_map.get(new_pos, ".") == ".":
                sand_pos = new_pos
                moved = True
                break
        if not moved:
            return sand_pos


def part1(data):
    terrain_map, min_point, max_point = get_map(data)
    draw_map(terrain_map, min_point, max_point)
    sand_grains_dropped = 0
    while True:
        sand_post = add_sand_grain(
            terrain_map, max_point)
        if sand_post is None:
            break
        else:
            sand_grains_dropped += 1
            terrain_map[sand_post] = "0"
        # draw_map(terrain_map, min_point, max_point)
    return sand_grains_dropped


def part2(data):
    terrain_map, min_point, max_point = get_map(data)
    width = max_point[0] - min_point[0]
    # Adding floor with some trial and error for the values
    min_point = (min_point[0] - 3 * width, min_point[1])
    max_point = (max_point[0] + 3 * width, max_point[1] + 2)
    for x in range(min_point[0], max_point[0] + 1):
        new_maxy = max_point[1]
        terrain_map[(x, new_maxy)] = "#"
    sand_grains_dropped = 0
    while True:
        sand_post = add_sand_grain(
            terrain_map, max_point)
        sand_grains_dropped += 1
        terrain_map[sand_post] = "0"
        if sand_post == (500, 0):
            break
    # draw_map(terrain_map, min_point, max_point)
    return sand_grains_dropped
