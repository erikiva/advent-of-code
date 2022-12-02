from collections import namedtuple

Round = namedtuple("Round", 'Elf Me')

Moves = {
    'R': 1,
    'P': 2,
    'S': 3,
}

Conversions = {
    'A': 'R',
    'B': 'P',
    'C': 'S',
    'X': 'R',
    'Y': 'P',
    'Z': 'S',
}


def score_for_round(round):
    score = 0
    if round.Me == round.Elf:
        score = 3 + Moves[round.Me]
    elif (round.Me == 'R' and round.Elf == 'S') or (round.Me == 'S' and round.Elf == 'P') or (round.Me == 'P' and round.Elf == 'R'):
        score = 6 + Moves[round.Me]
    else:
        score = Moves[round.Me]
    print("\nScoring ", round, " = ", score)
    return score


def convert_to_move(data):
    x, y = data.split(" ")
    return Round(Conversions[x], Conversions[y])


def part1(data):
    moves = list(map(convert_to_move, data))
    print(moves, "\n")
    total = 0
    for round in moves:
        print(round)
        total = total + score_for_round(round)
    return total


WinnerMoves = {
    'R': {'X': 'S', 'Y': 'R', 'Z': 'P'},
    'P': {'X': 'R', 'Y': 'P', 'Z': 'S'},
    'S': {'X': 'P', 'Y': 'S', 'Z': 'R'},
}


def convert_to_winning_moves(data):
    print(data)
    x, y = data.split(" ")
    elf = Conversions[x]
    return Round(elf, WinnerMoves[elf][y])


def part2(data):
    moves = list(map(convert_to_winning_moves, data))
    total = 0
    for round in moves:
        total = total + score_for_round(round)
    return total
