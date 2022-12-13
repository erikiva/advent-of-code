from collections import deque


def is_outside(heatmap, dest, width, height):
    if dest[0] < 0 or dest[0] >= height:
        return True
    if dest[1] < 0 or dest[1] >= width:
        return True
    return False


def is_move_allowed(heatmap, origin, dest, width, height):
    if is_outside(heatmap, dest, width, height):
        return False

    if heatmap[dest[0]][dest[1]] == "E":
        value = 'z'
    else:
        value = heatmap[dest[0]][dest[1]]
    if ord(value) - ord(heatmap[origin[0]][origin[1]]) > 1:
        return False
    return True


def is_found(heatmap, dest):
    if heatmap[dest[0]][dest[1]] == "E":
        return True
    return False


def get_initial_position(heatmap):
    for row in range(len(heatmap)):
        for col in range(len(heatmap[0])):
            if heatmap[row][col] == "S":
                return [row, col]


def get_as(heatmap):
    a_list = []
    for row in range(len(heatmap)):
        for col in range(len(heatmap[0])):
            if heatmap[row][col] == "a":
                a_list.append([row, col])
    return a_list


def part1(data):
    heatmap = [list(row) for row in data]
    width = len(heatmap[0])
    height = len(heatmap)
    directions = [[0, 1], [1, 0], [0, -1], [-1, 0]]
    queue = deque()
    visited = []
    current = get_initial_position(heatmap)
    visited.append(current)
    queue.append((current, 0))
    heatmap[current[0]][current[1]] = 'a'
    while len(queue) > 0:
        next = queue.popleft()
        if is_found(heatmap, next[0]):
            return next[1]
        else:
            for direction in directions:
                next_position = [next[0][0] + direction[0],
                                 next[0][1] + direction[1]]
                if is_move_allowed(heatmap, next[0], next_position, width, height) and next_position not in visited:
                    visited.append(next_position)
                    queue.append((next_position, next[1] + 1))

    return 0


def part2(data):
    heatmap = [list(row) for row in data]
    width = len(heatmap[0])
    height = len(heatmap)
    directions = [[0, 1], [1, 0], [0, -1], [-1, 0]]
    queue = deque()
    visited = []
    current = get_initial_position(heatmap)
    heatmap[current[0]][current[1]] = 'a'
    a_list = get_as(heatmap)
    for a in a_list:
        visited.append(a)
        queue.append((a, 0))
    while len(queue) > 0:
        next = queue.popleft()
        if is_found(heatmap, next[0]):
            return next[1]
        else:
            for direction in directions:
                next_position = [next[0][0] + direction[0],
                                 next[0][1] + direction[1]]
                if is_move_allowed(heatmap, next[0], next_position, width, height) and next_position not in visited:
                    visited.append(next_position)
                    queue.append((next_position, next[1] + 1))
    return 0
