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


def commonChars(str1, str2):
    return sum(str1[i] == str2[i] for i in range(len(str1)))


def getCommon(str1, str2):
    return ''.join(str1[i] for i in range(len(str1)) if str1[i] == str2[i])


def solve2(data):
    for code1 in data:
        for code2 in data:
            if code1 == code2:
                continue
            if commonChars(code1, code2) == len(code1) - 1:
                return getCommon(code1, code2)
