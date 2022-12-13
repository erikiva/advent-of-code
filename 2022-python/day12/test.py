import unittest
import solution

TEST_CASE = '''Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi
'''


class TestBasic(unittest.TestCase):

    def test_get_initial(self):
        data = TEST_CASE.strip().split('\n')
        self.assertEqual([0, 0], solution.get_initial_position(data))

    def test_is_found(self):
        data = TEST_CASE.strip().split('\n')
        self.assertEqual(True, solution.is_found(data, [2, 5]))
        self.assertEqual(False, solution.is_found(data, [0, 0]))

    def test_basic_part1(self):
        data = TEST_CASE.strip().split('\n')
        self.assertEqual(31, solution.part1(data))

    def test_part1(self):
        with open("input.txt") as f:
            data = f.read().strip().split('\n')
            answer = solution.part1(data)
            self.assertEqual(0, answer)

    def test_basic_part2(self):
        data = TEST_CASE.strip().split('\n')
        self.assertEqual(29, solution.part2(data))

    def test_part2(self):
        with open("input.txt") as f:
            data = f.read().strip().split('\n')
            answer = solution.part2(data)
            self.assertEqual(245, answer)


if __name__ == "__main__":
    unittest.main()
