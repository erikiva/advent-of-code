import unittest
import solution

TEST_CASE = '''
dabAcCaCBAcCcaDA
'''


class TestBasic(unittest.TestCase):

    def test_basic_part1(self):
        data = TEST_CASE.strip()
        self.assertEqual(10, solution.part1(data))

    def test_part1(self):
        with open("input.txt") as f:
            data = f.read().strip()
            answer = solution.part1(data)
            self.assertEqual(11252, answer)

    def test_basic_part2(self):
        data = TEST_CASE.strip()
        self.assertEqual(4, solution.part2(data))

    def test_part2(self):
        with open("input.txt") as f:
            data = f.read().strip()
            answer = solution.part2(data)
            self.assertEqual(6118, answer)


if __name__ == "__main__":
    unittest.main()
