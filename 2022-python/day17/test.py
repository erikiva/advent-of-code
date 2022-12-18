import unittest
import solution

TEST_CASE = '''>>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>
'''


class TestBasic(unittest.TestCase):

    def test_get_initial_coords(self):
        self.assertEqual([(2, 3), (3, 3), (4, 3), (5, 3)], solution.get_initial_coords(
            0, [(0, 0), (1, 0), (2, 0), (3, 0)]))

    def test_basic_part1(self):
        data = TEST_CASE.strip()
        self.assertEqual(3068, solution.part1(data, 2022))

    def test_part1(self):
        with open("input.txt") as f:
            data = f.read().strip()
            answer = solution.part1(data)
            self.assertEqual(3130, answer)

    def test_basic_part2(self):
        data = TEST_CASE.strip()
        self.assertEqual(1514285714288, solution.part2(data))

    def test_part2(self):
        with open("input.txt") as f:
            data = f.read().strip()
            answer = solution.part2(data)
            self.assertEqual(883, answer)


if __name__ == "__main__":
    unittest.main()
