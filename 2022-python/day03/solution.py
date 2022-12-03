
def get_priority(item):
    if item.islower():
        return ord(item) - 96
    else:
        return ord(item) - 38


def part1(data):
    priorities = 0
    for rucksack in data:
        size = len(rucksack)
        first = rucksack[0:size//2]
        second = rucksack[size//2:]
        common = set(first).intersection(set(second))
        priorities = priorities + get_priority(common.pop())
    return priorities


def part2(data):
    priorities = 0
    for i in range(0, len(data), 3):
        first = data[i]
        second = data[i+1]
        third = data[i+2]
        common = set(first) & set(second) & set(third)
        priorities = priorities + get_priority(common.pop())

    return priorities
