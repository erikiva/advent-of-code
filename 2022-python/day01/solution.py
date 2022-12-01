def parse(lines):
    ans = []
    for line in lines:
        ans.append(int(line))
    return ans


def part1(data):
    max = 0
    calories = data.split("\n\n")
    for elf in calories:
        individual = sum(map(int, elf.split("\n")))
        if individual > max:
            max = individual
    return max


def part2(data):
    calories = data.split("\n\n")
    calories_by_elf = list(
        map(lambda elf: sum(map(int, elf.split("\n"))), calories))
    calories_by_elf.sort(reverse=True)

    return sum(calories_by_elf[0:3])
