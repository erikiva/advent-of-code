def is_edge(row, col, width, height):
    if row == 0 or col == 0 or row == height - 1 or col == width - 1:
        return True
    return False


def is_outside(row, col, width, height):
    if row < 0 or col < 0 or row == height or col == width:
        return True
    return False


def part1(data):
    visible_trees = []
    width = len(data[0])
    height = len(data)
    directions = [[0, 1], [1, 0], [0, -1], [-1, 0]]
    for row in range(height):
        for col in range(width):
            if is_edge(row, col, width, height):
                visible_trees.append([row, col])
            else:
                for direction in directions:
                    new_row = row
                    new_col = col
                    while not is_edge(new_row, new_col, width, height):
                        new_row += direction[0]
                        new_col += direction[1]
                        # No need to keep looking, found bigger tree
                        if data[new_row][new_col] >= data[row][col]:
                            break
                    if is_edge(new_row, new_col, width, height):
                        if data[new_row][new_col] < data[row][col]:
                            visible_trees.append([row, col])
                            break
    return len(visible_trees)


def part2(data):
    visibility_scores = []
    width = len(data[0])
    height = len(data)
    directions = {"up": [1, 0], "down": [-1, 0],
                  "right": [0, 1], "left": [0, -1]}

    for row in range(height):
        for col in range(width):
            scores = {"up": 0, "down": 0, "right": 0, "left": 0}
            for key in directions:
                new_row = row
                new_col = col
                while not is_outside(new_row, new_col, width, height):
                    new_row += directions[key][0]
                    new_col += directions[key][1]

                    if not is_outside(new_row, new_col, width, height):
                        if data[new_row][new_col] < data[row][col]:
                            scores[key] += 1
                        elif data[new_row][new_col] >= data[row][col]:
                            scores[key] += 1
                            break
            visibility_scores.append(
                scores["up"] * scores["down"] * scores["right"] * scores["left"])

    return max(visibility_scores)
