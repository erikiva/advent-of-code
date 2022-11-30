from collections import defaultdict
import re


def parse(lines):
    ans = []
    for line in lines:
        ans.append(int(line))
    return ans


def part1(data):
    cuts = {}
    cuts = defaultdict(int)
    for line in data:
        print(line)
        # #3 @ 5,5: 2x2
        id, padding_left, padding_top, width, height = re.match(
            r'^#(\d+) @ (\d+),(\d+): (\d+)x(\d+)', line).groups()
        print(id, padding_left, padding_top, width, height)
        for x in range(int(padding_left), int(padding_left) + int(width)):
            for y in range(int(padding_top), int(padding_top) + int(height)):
                position = f'{x}-{y}'
                # cuts[position] = cuts.get(position, 0) + 1
                cuts[position] += 1
                # sum(x*x*x for x in range(1, 11) if x % 2 == 1)
    return sum(1 for x in cuts.values() if x > 1)


def part2(data):
    overlaps = {}
    cuts = {}
    for line in data:
        print(line)
        # #3 @ 5,5: 2x2
        id, padding_left, padding_top, width, height = re.match(
            r'^#(\d+) @ (\d+),(\d+): (\d+)x(\d+)', line).groups()
        cuts[int(id)] = {"pl": int(padding_left), "pt": int(
            padding_top), "w": int(width), "h": int(height)}
        print(id, padding_left, padding_top, width, height)
        elem = cuts[int(id)]
        for x in range(elem["pl"], elem["pl"] + elem["w"]):
            for y in range(elem["pt"], elem["pt"] + elem["h"]):
                position = f'{x}-{y}'
                overlaps[position] = overlaps.get(position, 0) + 1
    for id, value in cuts.items():
        found = True
        for x in range(value["pl"], value["pl"] + value["w"]):
            for y in range(value["pt"], value["pt"] + value["h"]):
                position = f'{x}-{y}'
                if overlaps[position] > 1:
                    found = False
                    break
                continue
        if found:
            return id
