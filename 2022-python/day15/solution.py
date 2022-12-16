
import re


def get_sensor_map(data):
    sensor_map = {}
    beacon_map = set()
    moves = list(map(lambda line: list(map(int, re.match(
        r'^Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)', line).groups())), data.split("\n")))
    for move in moves:
        sensor_map[(move[0], move[1])] = {"beacon": (move[2], move[3]), "md": abs(
            move[0] - move[2]) + abs(move[1] - move[3])}
        beacon_map.add((move[2], move[3]))
    return sensor_map, beacon_map


def part1(data, target_y):
    positions = set()
    sensor_map, beacons = get_sensor_map(data)
    for (x, y) in sensor_map.keys():
        if abs(y-target_y) <= sensor_map[(x, y)]["md"]:
            margin = sensor_map[(x, y)]["md"] - abs(y-target_y)
            positions.update(range(x - margin, x + margin + 1))
    for (x, y) in beacons:
        if y == target_y and x in positions:
            positions.remove(x)
    return len(positions)


def get_range(x1, x2, min, max):
    if x1 < min:
        start = min
    else:
        start = x1
    if x2 > max:
        end = max
    else:
        end = x2
    return start, end


def join_segments(segments):
    new_segments = []
    x1a, x2a = segments.pop(0)
    while len(segments) > 0:
        x1b, x2b = segments.pop(0)
        if x1b >= x1a and x2b <= x2a:
            # b  is contained in a
            continue
        if x1b <= x2a + 1:
            # b overlaps a
            x2a = x2b
        else:
            # new segment
            new_segments.append((x1a, x2a))
            x1a, x2a = x1b, x2b
    new_segments.append((x1a, x2a))
    # print("new segments", new_segments, "\n")
    return new_segments


def part2(data, max):
    sensor_map, _ = get_sensor_map(data)
    min = 0
    target_x = 0
    for target_y in range(0, max + 1):
        intersection_points = []
        for (x, y) in sensor_map.keys():
            if abs(y-target_y) <= sensor_map[(x, y)]["md"]:
                margin = sensor_map[(x, y)]["md"] - abs(y-target_y)
                x1 = x - margin
                x2 = x + margin
                if x2 < min or x1 > max:
                    # segment is entirely outside of valid range
                    continue
                if x1 <= min and x2 >= max:
                    # segment covers the whole line, doesn't matter what the others do
                    break
                if x1 >= min and x2 <= max:
                    # this segment is entirely within the valid range
                    intersection_points.append((x1, x2))
                else:
                    start, end = get_range(x1, x2, min, max)
                    intersection_points.append((start, end))
        if len(intersection_points) == 0:
            continue
        intersection_points.sort(key=lambda x: x[0])
        intersection_points = join_segments(intersection_points)
        if len(intersection_points) == 2:
            target_x = intersection_points[0][1] + 1
            break

    print("x", target_x, "y", target_y)
    return target_x * 4000000 + target_y
