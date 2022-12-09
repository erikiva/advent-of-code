from recordclass import recordclass

Position = recordclass("Position", "x y")


def move_head(head, direction):
    if direction == 'U':
        return Position(head.x, head.y + 1)
    elif direction == 'D':
        return Position(head.x, head.y - 1)
    elif direction == 'L':
        return Position(head.x - 1, head.y)
    elif direction == 'R':
        return Position(head.x + 1, head.y)


def is_adjacent(a, b):
    return a == b or (abs(a.y - b.y) <= 1 and abs(a.x - b.x) <= 1)


def get_new_tail(head, tail):
    if is_adjacent(head, tail):
        return tail
    if head.x == tail.x:
        if head.y > tail.y:
            return Position(tail.x, tail.y + 1)
        else:
            return Position(tail.x, tail.y - 1)
    if head.y == tail.y:
        if head.x > tail.x:
            return Position(tail.x + 1, tail.y)
        else:
            return Position(tail.x - 1, tail.y)
    new_tail = Position(tail.x, tail.y)
    if head.x > tail.x:
        new_tail.x += 1
    else:
        new_tail.x -= 1
    if head.y > tail.y:
        new_tail.y += 1
    else:
        new_tail.y -= 1
    return new_tail


def part1(data):
    Head = Position(0, 0)
    Tail = Position(0, 0)
    visited_positions = set()
    visited_positions.add((Tail.x, Tail.y))
    for instruction in data:
        direction = instruction[0]
        distance = int(instruction[1:])
        for i in range(distance):
            Head = move_head(Head, direction)
            Tail = get_new_tail(Head, Tail)
            visited_positions.add((Tail.x, Tail.y))
    return len(visited_positions)


def part2(data):
    rope = [Position(0, 0) for _ in range(10)]
    visited_positions = set()
    visited_positions.add((rope[9].x, rope[9].y))
    for instruction in data:
        direction = instruction[0]
        distance = int(instruction[1:])
        for _ in range(distance):
            rope[0] = move_head(rope[0], direction)
            for node in range(len(rope) - 1):
                rope[node + 1] = get_new_tail(rope[node], rope[node + 1])
            visited_positions.add((rope[9].x, rope[9].y))
    return len(visited_positions)
