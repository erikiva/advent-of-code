import unittest
import solution

TEST_CASE = '''
Step C must be finished before step A can begin.
Step C must be finished before step F can begin.
Step A must be finished before step B can begin.
Step A must be finished before step D can begin.
Step B must be finished before step E can begin.
Step D must be finished before step E can begin.
Step F must be finished before step E can begin.
'''


class TestBasic(unittest.TestCase):

    def test_basic_part1(self):
        data = TEST_CASE.strip().split('\n')
        self.assertEqual("CABDFE", solution.part1(data))

    # def test_part1(self):
    #     with open("input.txt") as f:
    #         data = f.read().strip().split('\n')
    #         answer = solution.part1(data)
    #         self.assertEqual("", answer)

    def test_basic_part2(self):
        data = TEST_CASE.strip().split('\n')
        self.assertEqual(16, solution.part2(data, 0, 2))

    # def test_part2(self):
    #     with open("input.txt") as f:
    #         data = f.read().strip().split('\n')
    #         answer = solution.part2(data)
    #         self.assertEqual(0, answer)


if __name__ == "__main__":
    unittest.main()
