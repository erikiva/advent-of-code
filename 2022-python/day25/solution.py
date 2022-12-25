
CONVERSIONS_TO_DEC = {
    "2": 2,
    "1": 1,
    "0": 0,
    "-": -1,
    "=": -2,
}

CONVERSIONS_TO_SNAFU = {
    2: "2",
    1: "1",
    0: "0",
    -1: "-",
    -2: "=",
}


def convert_to_decimal(number):
    mult = 1
    converted = 0
    for char in number[::-1]:
        converted += mult * CONVERSIONS_TO_DEC[char]
        mult *= 5
    return converted


def convert_to_SNAFU(number):
    converted = ""
    while number != 0:
        next = number % 5
        if next == 3:
            next = -2
        elif next == 4:
            next = -1
        converted += CONVERSIONS_TO_SNAFU[next]
        number = (number - next) // 5
    return converted[::-1]


def part1(data):
    nums = [convert_to_decimal(num) for num in data]
    return convert_to_SNAFU(sum(nums))
