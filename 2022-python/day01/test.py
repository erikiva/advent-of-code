import unittest
import solution

TEST_CASE = '''1000
2000
3000

4000

5000
6000

7000
8000
9000

10000'''


class TestBasic(unittest.TestCase):

    def test_basic_part1(self):
        data = solution.part1(TEST_CASE.strip())
        self.assertEqual(24000, data)

    def test_part1(self):
        with open("input.txt") as f:
            data = f.read().strip()
            answer = solution.part1(data)
            self.assertEqual(71924, answer)

    def test_basic_part2(self):
        data = solution.part2(TEST_CASE.strip())
        self.assertEqual(45000, data)

    def test_pass_part2(self):
        with open("input.txt") as f:
            data = f.read().strip()
            answer = solution.part2(data)
            self.assertEqual(210406, answer)


if __name__ == "__main__":
    unittest.main()
