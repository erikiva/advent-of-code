import unittest
import solution

TEST_CASE = ["mjqjpqmgbljsphdztnvjfqwrcgsmlb", "bvwbjplbgvbhsrlpgdmjqwftvncz",
             "nppdvjthqldpwncqszvftbrmjlhg", "nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg", "zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw"]


class TestBasic(unittest.TestCase):

    def test_basic_part1(self):
        length = 4
        self.assertEqual(7, solution.part_both(TEST_CASE[0], length))
        self.assertEqual(5, solution.part_both(TEST_CASE[1], length))
        self.assertEqual(6, solution.part_both(TEST_CASE[2], length))
        self.assertEqual(10, solution.part_both(TEST_CASE[3], length))
        self.assertEqual(11, solution.part_both(TEST_CASE[4], length))

    def test_part1(self):
        length = 4
        with open("input.txt") as f:
            data = f.read().strip()
            answer = solution.part_both(data, length)
            self.assertEqual(1175, answer)

    def test_basic_part2(self):
        length = 14
        self.assertEqual(19, solution.part_both(TEST_CASE[0], length))
        self.assertEqual(23, solution.part_both(TEST_CASE[1], length))
        self.assertEqual(23, solution.part_both(TEST_CASE[2], length))
        self.assertEqual(29, solution.part_both(TEST_CASE[3], length))
        self.assertEqual(26, solution.part_both(TEST_CASE[4], length))

    def test_part2(self):
        length = 14
        with open("input.txt") as f:
            data = f.read().strip()
            answer = solution.part_both(data, length)
            self.assertEqual(3217, answer)


if __name__ == "__main__":
    unittest.main()
