

from collections import namedtuple


def is_cd(line):
    return line[:5] == "$ cd "


def is_ls(line):
    return line[:4] == "$ ls"


def is_dir(line):
    return line[:4] == "dir "


Directoy = namedtuple("Directory", "sizes dirs files")


# def calculate_size(directory_tree, current_dir):
#     total = 0
#     for file in directory_tree[current_dir].files:
#         total = total + file["size"]
#     for dir in directory_tree[current_dir].dirs:
#         total = total + calculate_size(directory_tree, dir)
#     return total

def build_directory_tree(data):
    directory_tree = {}
    path = []
    current_dir = ""
    reading_files = False
    # count = 0
    for line in data:
        # if count == 50:
        #     break
        # count = count + 1
        # 1 loop until nexy cd
        print("\n\n", line,
              "\ncurrent_dir", current_dir, "reading_files", reading_files)

        if is_cd(line):
            print("cd: ", line)
            current_dir = line[5:]
            full_path = "/".join(path) + "/" + current_dir
            reading_files = False
            if current_dir == "..":
                # when going back the directory already exists
                current_dir = path.pop()
            elif not directory_tree.get(full_path):
                path.append(current_dir)
                directory_tree[full_path] = Directoy([], [], [])

            print("command", line, "current_dir", current_dir)
        elif is_ls(line):
            print("ls: ", line)
            reading_files = True
            continue
        elif reading_files:
            print("Reading files", line)
            if is_dir(line):
                dir_name = line[4:]
                directory_tree[full_path].dirs.append(dir_name)
            else:
                # file
                size = int(line[:line.find(" ")])
                filename = line[line.find(" ")+1:]
                print("file - ", filename, " size - ",
                      size, " current_dir - ", current_dir)
                directory_tree[full_path].files.append(
                    {"name": filename, "size": size})
                for i in range(0, len(path)):
                    if path[i] == "/":
                        dir = "//"
                    else:
                        dir = "/".join(path[0:i+1])
                    print("dir", dir, directory_tree)
                    directory_tree[dir].sizes.append(size)
        print("\npath: ", path)
    return directory_tree


def part1(data):
    directory_tree = build_directory_tree(data)

    total = 0
    for key in directory_tree:
        print(key, "total before", total)
        size = sum(directory_tree[key].sizes)
        if size <= 100000:
            total = total + size
        print(key,
              directory_tree[key].sizes, "size: ", size, "total", total, "\n\n ")

    # print(directory_tree)
    # sizes =

    return total


TOTAL_DISK_SPACE = 70000000
UNUSED_NEEDED = 30000000


def part2(data):
    sizes = []
    directory_tree = build_directory_tree(data)
    total_size = sum(directory_tree["//"].sizes)
    print("total_size", total_size)
    unused = TOTAL_DISK_SPACE - total_size
    print("unused", unused)
    needed = UNUSED_NEEDED - unused
    print("needed", needed)
    for key in directory_tree:
        size = sum(directory_tree[key].sizes)
        if size > needed:
            sizes.append(size)

    return min(sizes)
