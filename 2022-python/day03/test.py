import unittest
import solution

TEST_CASE = '''vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw
'''


class TestBasic(unittest.TestCase):

    def test_priority(self):
        self.assertEqual(16, solution.get_priority('p'))
        self.assertEqual(42, solution.get_priority('P'))

    def test_basic_part1(self):
        data = TEST_CASE.strip().split('\n')
        self.assertEqual(157, solution.part1(data))

    def test_part1(self):
        with open("input.txt") as f:
            data = f.read().strip().split('\n')
            answer = solution.part1(data)
            self.assertEqual(8493, answer)

    def test_basic_part2(self):
        data = TEST_CASE.strip().split('\n')
        self.assertEqual(70, solution.part2(data))

    def test_part2(self):
        with open("input.txt") as f:
            data = f.read().strip().split('\n')
            answer = solution.part2(data)
            self.assertEqual(0, answer)


if __name__ == "__main__":
    unittest.main()
