from string import ascii_lowercase


def part1(data):
    changed = True
    pattern = data
    prev_len = len(pattern)
    while changed:
        changed = False
        for c in ascii_lowercase:
            upper = c.upper()
            pattern = pattern.replace(upper + c, "")
            pattern = pattern.replace(c + upper, "")
        if len(pattern) != prev_len:
            changed = True
            prev_len = len(pattern)
    return len(pattern)


def part2(data):
    charmap = {}
    for c in ascii_lowercase:
        upper = c.upper()
        pattern = data.replace(upper, "").replace(c, "")
        result = part1(pattern)
        charmap[c] = result

    return min(charmap.values())
