

def contains(set1, set2):
    result = set1.issubset(set2) or set2.issubset(set1)
    return result


def overlaps(set1, set2):
    overlap = set1 & set2
    return len(overlap) > 0


def get_sections(pair):
    elf1, elf2 = pair.split(",")
    section1 = list(map(int, elf1.split("-")))
    section2 = list(map(int, elf2.split("-")))
    return section1, section2


def part1(data):
    overlaps = 0
    for pair in data:
        section1, section2 = get_sections(pair)
        if contains(set(range(section1[0], section1[1] + 1)), set(range(section2[0], section2[1] + 1))):
            overlaps += 1
    return overlaps


def part2(data):
    num_overlaps = 0
    for pair in data:
        section1, section2 = get_sections(pair)
        if overlaps(set(range(section1[0], section1[1] + 1)), set(range(section2[0], section2[1] + 1))):
            num_overlaps += 1
    return num_overlaps
