import unittest
import solution

TEST_CASE = '''Sensor at x=2, y=18: closest beacon is at x=-2, y=15
Sensor at x=9, y=16: closest beacon is at x=10, y=16
Sensor at x=13, y=2: closest beacon is at x=15, y=3
Sensor at x=12, y=14: closest beacon is at x=10, y=16
Sensor at x=10, y=20: closest beacon is at x=10, y=16
Sensor at x=14, y=17: closest beacon is at x=10, y=16
Sensor at x=8, y=7: closest beacon is at x=2, y=10
Sensor at x=2, y=0: closest beacon is at x=2, y=10
Sensor at x=0, y=11: closest beacon is at x=2, y=10
Sensor at x=20, y=14: closest beacon is at x=25, y=17
Sensor at x=17, y=20: closest beacon is at x=21, y=22
Sensor at x=16, y=7: closest beacon is at x=15, y=3
Sensor at x=14, y=3: closest beacon is at x=15, y=3
Sensor at x=20, y=1: closest beacon is at x=15, y=3
'''


class TestBasic(unittest.TestCase):

    def test_basic_part1(self):
        data = TEST_CASE.strip()
        self.assertEqual(26, solution.part1(data, 10))

    def test_part1(self):
        with open("input.txt") as f:
            data = f.read().strip()
            answer = solution.part1(data, 2000000)
            self.assertEqual(4883971, answer)

    def test_join_segments(self):
        data = [(0, 8), (9, 9), (9, 11), (9, 19), (11, 13), (14, 20), (15, 20)]
        self.assertEqual([(0, 20)], solution.join_segments(data))

    def test_basic_part2(self):
        data = TEST_CASE.strip()
        self.assertEqual(56000011, solution.part2(data, 20))

    def test_part2(self):
        with open("input.txt") as f:
            data = f.read().strip()
            answer = solution.part2(data, 4000000)
            self.assertEqual(12691026767556, answer)


if __name__ == "__main__":
    unittest.main()
