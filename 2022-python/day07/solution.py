

from collections import namedtuple


def is_cd(line):
    return line[:5] == "$ cd "


def is_ls(line):
    return line[:4] == "$ ls"


def is_dir(line):
    return line[:4] == "dir "


Directoy = namedtuple("Directory", "sizes dirs files")


def build_directory_tree(data):
    directory_tree = {}
    path = []
    current_dir = ""
    reading_files = False
    for line in data:
        if is_cd(line):
            current_dir = line[5:]
            full_path = "/".join(path) + "/" + current_dir
            reading_files = False
            if current_dir == "..":
                # when going back the directory already exists
                current_dir = path.pop()
            elif not directory_tree.get(full_path):
                path.append(current_dir)
                directory_tree[full_path] = Directoy([], [], [])
        elif is_ls(line):
            reading_files = True
            continue
        elif reading_files:
            if is_dir(line):
                dir_name = line[4:]
                directory_tree[full_path].dirs.append(dir_name)
            else:
                # file
                size = int(line[:line.find(" ")])
                filename = line[line.find(" ")+1:]
                directory_tree[full_path].files.append(
                    {"name": filename, "size": size})
                for i in range(0, len(path)):
                    if path[i] == "/":
                        dir = "//"
                    else:
                        dir = "/".join(path[0:i+1])
                    directory_tree[dir].sizes.append(size)
    return directory_tree


def part1(data):
    directory_tree = build_directory_tree(data)
    total = 0
    for key in directory_tree:
        size = sum(directory_tree[key].sizes)
        if size <= 100000:
            total = total + size
    return total


TOTAL_DISK_SPACE = 70000000
UNUSED_NEEDED = 30000000


def part2(data):
    sizes = []
    directory_tree = build_directory_tree(data)
    total_size = sum(directory_tree["//"].sizes)
    unused = TOTAL_DISK_SPACE - total_size
    needed = UNUSED_NEEDED - unused
    for key in directory_tree:
        size = sum(directory_tree[key].sizes)
        if size > needed:
            sizes.append(size)

    return min(sizes)
