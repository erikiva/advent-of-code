

def part_both(data, length):
    for i in range(0, len(data)):
        if len(set(data[i:i+length])) == length:
            return i+length
    return 0
