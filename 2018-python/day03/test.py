import unittest
import solution

TEST_CASE = '''
#1 @ 1,3: 4x4
#2 @ 3,1: 4x4
#3 @ 5,5: 2x2
'''


class TestBasic(unittest.TestCase):

    def test_basic_part1(self):
        data = TEST_CASE.strip().split('\n')
        self.assertEqual(4, solution.part1(data))

    def test_part1(self):
        with open("input.txt") as f:
            data = f.read().strip().split('\n')
            answer = solution.part1(data)
            self.assertEqual(108961, answer)

    def test_basic_part1(self):
        data = TEST_CASE.strip().split('\n')
        self.assertEqual(3, solution.part2(data))

    def test_part2(self):
        with open("input.txt") as f:
            data = f.read().strip().split('\n')
            answer = solution.part2(data)
            self.assertEqual(0, answer)


if __name__ == "__main__":
    unittest.main()
