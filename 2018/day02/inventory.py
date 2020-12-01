from collections import Counter


def parse(lines):
    ans = []
    for line in lines:
        ans.append(line)
    return ans


def solve(data):
    twice = 0
    thrice = 0
    for code in data:
        code_stats = Counter(code).values()
        if 2 in code_stats:
            twice += 1
        if 3 in code_stats:
            thrice += 1
    return twice * thrice
