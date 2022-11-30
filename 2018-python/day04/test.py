import unittest
import solution

TEST_CASE = '''
[1518-11-03 00:24] falls asleep
[1518-11-02 00:50] wakes up
[1518-11-01 00:25] wakes up
[1518-11-01 00:30] falls asleep
[1518-11-01 00:55] wakes up
[1518-11-01 23:58] Guard #99 begins shift
[1518-11-02 00:40] falls asleep
[1518-11-04 00:02] Guard #99 begins shift
[1518-11-03 00:05] Guard #10 begins shift
[1518-11-05 00:55] wakes up
[1518-11-01 00:05] falls asleep
[1518-11-03 00:29] wakes up
[1518-11-04 00:36] falls asleep
[1518-11-04 00:46] wakes up
[1518-11-05 00:03] Guard #99 begins shift
[1518-11-05 00:45] falls asleep
[1518-11-01 00:00] Guard #10 begins shift
'''


class TestBasic(unittest.TestCase):

    def test_basic_part1(self):
        data = TEST_CASE.strip().split('\n')
        self.assertEqual(240, solution.part1(data))

    def test_part1(self):
        with open("input.txt") as f:
            data = f.read().strip().split('\n')
            answer = solution.part1(data)
            self.assertEqual(73646, answer)

    def test_basic_part2(self):
        data = TEST_CASE.strip().split('\n')
        self.assertEqual(4455, solution.part2(data))

    def test_part2(self):
        with open("input.txt") as f:
            data = f.read().strip().split('\n')
            answer = solution.part2(data)
            self.assertEqual(0, answer)


if __name__ == "__main__":
    unittest.main()
