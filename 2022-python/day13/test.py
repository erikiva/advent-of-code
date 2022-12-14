import unittest
import solution

TEST_CASE = '''[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]
'''


class TestBasic(unittest.TestCase):

    def test_basic_part1(self):
        data = TEST_CASE.strip().split('\n\n')
        self.assertEqual(13, solution.part1(data))

    def test_part1(self):
        with open("input.txt") as f:
            data = f.read().strip().split('\n\n')
            answer = solution.part1(data)
            self.assertEqual(4821, answer)

    def test_basic_part2(self):
        data = TEST_CASE.strip().split('\n\n')
        self.assertEqual(140, solution.part2(data))

    def test_is_ordered(self):
        self.assertEqual(True, solution.is_ordered([[2]], [2, 5, 4, 1]) > 0)
        self.assertEqual(False, solution.is_ordered([2, 5, 4, 1], [[2]]) > 0)
        self.assertEqual(False, solution.is_ordered(
            [1, 2, 5, 4, 1], [[1]]) > 0)

    def test_part2(self):
        with open("input.txt") as f:
            data = f.read().strip().split('\n\n')
            answer = solution.part2(data)
            self.assertEqual(21890, answer)


if __name__ == "__main__":
    unittest.main()
