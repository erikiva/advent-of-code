def parse(lines):
    ans = []
    for line in lines:
        ans.append(int(line))
    return ans


def part1(data):
    total = 0
    for num in data:
        total = total + num
    return total


def part2(data):
    freqs = {}
    total = 0
    while True:
        for num in data:
            total = total + num
            if total in freqs.keys():
                return total
            freqs[total] = True
