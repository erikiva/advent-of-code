import unittest
import solution

TEST_CASE = '''.....
..##.
..#..
.....
..##.
.....
'''

TEST_CASE2 = '''..............
..............
.......#......
.....###.#....
...#...#.#....
....#...##....
...#.###......
...##.#.##....
....#..#......
..............
..............
..............
'''


class TestBasic(unittest.TestCase):

    def test_get_proposed_moves(self):
        elfs = solution.get_elf_positions(TEST_CASE.strip().split("\n"))
        order = [["N", "NE", "NW"], ["S", "SE", "SW"],
                 ["W", "NW", "SW"], ["E", "NE", "SE"]]
        self.assertEqual(solution.Point(2, 0),
                         solution.get_proposed_move(elfs, solution.Point(2, 1), order))
        self.assertEqual(solution.Point(2, 3),
                         solution.get_proposed_move(elfs, solution.Point(2, 2), order))

    def test_basic_part1(self):
        data = TEST_CASE.strip().split('\n')
        self.assertEqual(25, solution.part1(data))

    def test_basic2_part1(self):
        data = TEST_CASE2.strip().split('\n')
        self.assertEqual(110, solution.part1(data))

    def test_part1(self):
        with open("input.txt") as f:
            data = f.read().strip().split('\n')
            answer = solution.part1(data)
            self.assertEqual(0, answer)

    def test_overlaps(self):
        self.assertEqual(True, solution.overlaps(
            set((1, 2, 3, 4, 5, 6)), set((3, 4, 5))))
        self.assertEqual(True, solution.overlaps(
            set((1, 2, 3, 4)), set((3, 4, 5))))
        self.assertEqual(False, solution.overlaps(
            set((1, 2, 3, 4)), set((5, 6, 7))))

    def test_basic_part2(self):
        data = TEST_CASE2.strip().split('\n')
        self.assertEqual(20, solution.part2(data))

    def test_part2(self):
        with open("input.txt") as f:
            data = f.read().strip().split('\n')
            answer = solution.part2(data)
            self.assertEqual(999, answer)


if __name__ == "__main__":
    unittest.main()
