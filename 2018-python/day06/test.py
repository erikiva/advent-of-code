import unittest
import solution

TEST_CASE = '''
1, 1
1, 6
8, 3
3, 4
5, 5
8, 9
'''


class TestBasic(unittest.TestCase):

    def test_basic_part1(self):
        data = TEST_CASE.strip().split('\n')
        self.assertEqual(17, solution.part1(data))

    def test_part1(self):
        with open("input.txt") as f:
            data = f.read().strip().split('\n')
            answer = solution.part1(data)
            self.assertEqual(3620, answer)

    def test_basic_part2(self):
        data = TEST_CASE.strip().split('\n')
        self.assertEqual(16, solution.part2(data, 32))

    def test_part2(self):
        with open("input.txt") as f:
            data = f.read().strip().split('\n')
            answer = solution.part2(data)
            self.assertEqual(0, answer)


if __name__ == "__main__":
    unittest.main()
