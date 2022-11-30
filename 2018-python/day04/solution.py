

from collections import Counter


def parse(lines):
    ans = []
    for line in lines:
        ans.append(int(line))
    return ans

# [1518-08-06 00:04]
# RE_PARSE = re.compile(r'#(\d+) @ (\d+),(\d+): (\d+)x(\d+)')
# claim, x0, y0, w, h = map(int, RE_PARSE.match(line).groups())


def part1(data):
    data.sort()
    guards = dict()
    day = 0
    minutes = []
    guard = None
    for line in data:
        # print(line)
        time, action = line.split('] ')
        # day, hour = time.split(' ')[0].split('-')
        # print(day, hour)
        if action == 'wakes up':
            end_time = int(time.split(' ')[1].split(':')[1])
            # print("------ Adding minutes ", guards,
            #       guard, start_time, end_time)
            guards[guard]["minutes"].extend(range(start_time, end_time))
            continue
        elif action == 'falls asleep':
            start_time = int(time.split(' ')[1].split(':')[1])
            # print(guard, start_time)
            continue
        else:
            guard = int(action.split(' ')[1][1:])
            existing_guard = guards.get(guard, None)
            if existing_guard is None:
                # print(" **************************** new guard")
                guards[guard] = {"days": 1, "minutes": list()}
            else:
                existing_guard["days"] += 1
                # existing_guard["minutes"].extend(
                #     range(start_time, end_time))
            # initialize days and minutes
            # print(guard, guards[guard])

    most_sleepy_guard = None
    for guard in guards.keys():
        if most_sleepy_guard is None:
            most_sleepy_guard = guard
        elif len(guards[guard]["minutes"]) > len(guards[most_sleepy_guard]["minutes"]):
            most_sleepy_guard = guard

    most_likely_minute = Counter(
        guards[most_sleepy_guard]["minutes"]).most_common(1)[0][0]
    # return most_sleepy_guard * most_likely_minute
    # print("Most sleepy", most_sleepy_guard, most_likely_minute)
    # print(guards)
    return most_sleepy_guard * most_likely_minute


def part2(data):
    data.sort()
    guards = dict()
    day = 0
    minutes = []
    guard = None
    for line in data:
        # print(line)
        time, action = line.split('] ')
        # day, hour = time.split(' ')[0].split('-')
        # print(day, hour)
        if action == 'wakes up':
            end_time = int(time.split(' ')[1].split(':')[1])
            # print("------ Adding minutes ", guards,
            #   guard, start_time, end_time)
            guards[guard]["minutes"].extend(range(start_time, end_time))
            continue
        elif action == 'falls asleep':
            start_time = int(time.split(' ')[1].split(':')[1])
            # print(guard, start_time)
            continue
        else:
            guard = int(action.split(' ')[1][1:])
            existing_guard = guards.get(guard, None)
            if existing_guard is None:
                # print(" **************************** new guard")
                guards[guard] = {"days": 1, "minutes": list()}
            else:
                existing_guard["days"] += 1
                # existing_guard["minutes"].extend(
                #     range(start_time, end_time))
            # initialize days and minutes
            # print(guard, guards[guard])

    selected_guard = None
    most_frequent_minute = 0
    highest_frequency = 0
    for guard in guards.keys():
        print("..... processing guard", guard, guards[guard])
        if selected_guard is None:
            selected_guard = guard
        else:
            print(guards[guard]["minutes"])
            if len(guards[guard]["minutes"]):
                highest = Counter(
                    guards[guard]["minutes"]).most_common(1)[0]
                print("highest", highest)
                if highest[1] > highest_frequency:
                    most_frequent_minute = highest[0]
                    highest_frequency = highest[1]
                    selected_guard = guard

    # return most_sleepy_guard * most_likely_minute
    print("Most sleepy", selected_guard, most_frequent_minute)
    # print(guards)
    return selected_guard * most_frequent_minute
