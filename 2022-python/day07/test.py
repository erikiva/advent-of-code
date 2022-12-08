import unittest
import solution

TEST_CASE = '''$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k
'''


class TestBasic(unittest.TestCase):

    def test_basic_part1(self):
        data = TEST_CASE.strip().split('\n')
        self.assertEqual(95437, solution.part1(data))

    def test_part1(self):
        with open("input.txt") as f:
            data = f.read().strip().split('\n')
            answer = solution.part1(data)
            self.assertEqual(1297159, answer)

    def test_basic_part2(self):
        data = TEST_CASE.strip().split('\n')
        self.assertEqual(24933642, solution.part2(data))

    def test_part2(self):
        with open("input.txt") as f:
            data = f.read().strip().split('\n')
            answer = solution.part2(data)
            self.assertEqual(0, answer)


if __name__ == "__main__":
    unittest.main()
