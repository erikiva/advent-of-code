from heapq import heapify, heappop, heappush
import re

# [1518-08-06 00:04]
# RE_PARSE = re.compile(r'#(\d+) @ (\d+),(\d+): (\d+)x(\d+)')
# claim, x0, y0, w, h = map(int, RE_PARSE.match(line).groups())
REGEX_PARSE = re.compile(
    r'Step (\w) must be finished before step (\w) can begin.')


def create_tasks_map(data):
    tasks = {}
    pending = []
    for line in data:
        prev, next = REGEX_PARSE.match(line).groups()
        # print(prev, next)
        if prev not in pending:
            pending.append(prev)
        if next not in pending:
            pending.append(next)
        if prev not in tasks:
            tasks[prev] = {"next": list(next), "prev": list()}
        else:
            tasks[prev]["next"].append(next)
        if next not in tasks:
            tasks[next] = {"prev": list(prev), "next": list()}
        else:
            tasks[next]["prev"].append(prev)
    print()
    print("Done reading data")
    return tasks, pending


def task_value(task, time_increment):
    return ord(task) - ord("A") + 1 + time_increment


def part1(data):
    tasks, _ = create_tasks_map(data)
    sequence = []

    available_tasks = [elem for elem in tasks if len(tasks[elem]["prev"]) == 0]
    heapify(available_tasks)
    print(available_tasks)

    while len(available_tasks) > 0:
        task = heappop(available_tasks)
        sequence.append(task)
        next_tasks = tasks[task]["next"]
        for next_task in next_tasks:
            tasks[next_task]["prev"].remove(task)
            if len(tasks[next_task]["prev"]) == 0:
                heappush(available_tasks, next_task)
        # print(available_tasks)
    # print(sequence)
    return "".join(sequence)


def part2(data, time_increment, workers):
    tasks, pending = create_tasks_map(data)
    ticks = 0
    sequence = []
    current_tasks = []
    print("tasks: ", tasks)
    print("pending: ", pending)
    available_tasks = [elem for elem in tasks if len(tasks[elem]["prev"]) == 0]
    heapify(available_tasks)

    while len(available_tasks) > 0 or len(current_tasks) > 0:
        print("available tasks", available_tasks,
              "current tasks ", current_tasks)
        if len(current_tasks) < workers and len(available_tasks) > 0:
            available_slots = workers - len(current_tasks)
            for _ in range(available_slots):
                task = heappop(available_tasks)
                current_tasks.append({task, task_value(task, time_increment)})

            for task in current_tasks:
                print("task", task)
                # get initial tasks
                # add them to freed tasks
                # if free workers and freed tasks
                # move freed_tasks to current_tasks with their value
                # increment ticks

    return ""
