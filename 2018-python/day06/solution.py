

# [1518-08-06 00:04]
# RE_PARSE = re.compile(r'#(\d+) @ (\d+),(\d+): (\d+)x(\d+)')
# claim, x0, y0, w, h = map(int, RE_PARSE.match(line).groups())


import string


def part1(data):
    locations = {}
    map = {}

    for c, line in zip(string.ascii_uppercase * 2, data):
        coordinates = line.split(', ')
        locations[(int(coordinates[0]), int(coordinates[1]))] = list()
        map[(int(coordinates[0]), int(coordinates[1]))] = c
    # print(locations)
    maxX = max([int(x) for (x, _) in locations.keys()])+1
    maxY = max([int(y) for (_, y) in locations.keys()])+1
    print("********** res", coordinates, maxX, maxY)
    c = 97
    for py in range(0, maxY + 1):
        for px in range(0, maxX + 1):
            distances = list()
            for [x, y] in locations:
                d = abs(px - x) + abs(py - y)
                distances.append((d, (x, y)))

            minPoint = min(distances)
            count = 0
            for distance in distances:
                if distance[0] == minPoint[0]:
                    count += 1
            if count == 1:
                print(map[minPoint[1]] if minPoint[0] ==
                      0 else map[minPoint[1]].lower(), end='')
                locations[minPoint[1]].append((px, py))
            else:
                print('.', end='')
        print()
    # print(locations)
    areas = list()
    for location in locations.keys():
        expands = locations[location]
        # print(location, " -- ", expands, len(expands))
        if any([x == 0 or y == 0 or x == maxX or y == maxY for (x, y) in expands]):
            continue
        areas.append(len(expands))
        # print(location, len(expands), map[location])
    # print(areas)
    # 6149
    return max(areas)


def part2(data, max_distance=10000):
    locations = {}

    for line in data:
        coordinates = line.split(', ')
        locations[(int(coordinates[0]), int(coordinates[1]))] = list()

    # print(locations)
    maxX = max([int(x) for (x, _) in locations.keys()])+1
    maxY = max([int(y) for (_, y) in locations.keys()])+1
    print("********** res", coordinates, maxX, maxY)

    valid_points = list()
    for py in range(0, maxY + 1):
        for px in range(0, maxX + 1):
            added_distances = 0
            for [x, y] in locations:
                d = abs(px - x) + abs(py - y)
                added_distances += d
                if added_distances >= max_distance:
                    break
            if added_distances < max_distance:
                valid_points.append((px, py))
    return len(valid_points)
