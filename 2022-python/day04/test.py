import unittest
import solution

TEST_CASE = '''2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8
'''


class TestBasic(unittest.TestCase):

    def test_contains(self):
        self.assertEqual(True, solution.contains(
            set((1, 2, 3, 4, 5, 6)), set((3, 4, 5))))
        self.assertEqual(False, solution.contains(
            set((1, 2, 3, 4)), set((3, 4, 5))))

    def test_basic_part1(self):
        data = TEST_CASE.strip().split('\n')
        self.assertEqual(2, solution.part1(data))

    def test_part1(self):
        with open("input.txt") as f:
            data = f.read().strip().split('\n')
            answer = solution.part1(data)
            self.assertEqual(515, answer)

    def test_overlaps(self):
        self.assertEqual(True, solution.overlaps(
            set((1, 2, 3, 4, 5, 6)), set((3, 4, 5))))
        self.assertEqual(True, solution.overlaps(
            set((1, 2, 3, 4)), set((3, 4, 5))))
        self.assertEqual(False, solution.overlaps(
            set((1, 2, 3, 4)), set((5, 6, 7))))

    def test_basic_part2(self):
        data = TEST_CASE.strip().split('\n')
        self.assertEqual(4, solution.part2(data))

    def test_pass_part2(self):
        with open("input.txt") as f:
            data = f.read().strip().split('\n')
            answer = solution.part2(data)
            self.assertEqual(883, answer)


if __name__ == "__main__":
    unittest.main()
