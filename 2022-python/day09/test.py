import unittest
import solution

TEST_CASE = '''R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2
'''

TEST_CASE2 = '''L 4
D 4
R 3
U 1
L 4
U 1
R 5
L 2
'''

TEST_CASE3 = '''R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20
'''


class TestBasic(unittest.TestCase):

    def test_is_adjacent(self):
        self.assertEqual(True, solution.is_adjacent(
            solution.Position(0, 0), solution.Position(1, 0)))
        self.assertEqual(True, solution.is_adjacent(
            solution.Position(0, 0), solution.Position(0, 0)))
        self.assertEqual(True, solution.is_adjacent(
            solution.Position(0, 0), solution.Position(1, 1)))
        self.assertEqual(False, solution.is_adjacent(
            solution.Position(0, 0), solution.Position(2, 0)))
        self.assertEqual(True, solution.is_adjacent(
            solution.Position(-1, -1), solution.Position(-2, 0)))

    def test_get_new_tail(self):
        self.assertEqual(solution.Position(-3, -1), solution.get_new_tail(
            solution.Position(-2, -1), solution.Position(-3, -1)))
        self.assertEqual(solution.Position(-1, 0), solution.get_new_tail(
            solution.Position(-2, -1), solution.Position(-1, 0)))

    def test_basic_part1(self):
        data = TEST_CASE.strip().split('\n')
        self.assertEqual(13, solution.part1(data))

    def test2_basic_part1(self):
        data = TEST_CASE2.strip().split('\n')
        self.assertEqual(13, solution.part1(data))

    def test_part1(self):
        with open("input.txt") as f:
            data = f.read().strip().split('\n')
            answer = solution.part1(data)
            self.assertEqual(6642, answer)

    def test_basic_part2(self):
        data = TEST_CASE3.strip().split('\n')
        self.assertEqual(36, solution.part2(data))

    def test_part2(self):
        with open("input.txt") as f:
            data = f.read().strip().split('\n')
            answer = solution.part2(data)
            self.assertEqual(2765, answer)


if __name__ == "__main__":
    unittest.main()
