import unittest
import solution

TEST_CASE = '''1=-0-2
12111
2=0=
21
2=01
111
20012
112
1=-1=
1-12
12
1=
122
'''


class TestBasic(unittest.TestCase):

    def test_basic_part1(self):
        data = TEST_CASE.strip().split('\n')
        self.assertEqual("2=-1=0", solution.part1(data))

    def test_part1(self):
        with open("input.txt") as f:
            data = f.read().strip().split('\n')
            answer = solution.part1(data)
            self.assertEqual("2-==10--=-0101==1201", answer)

    def test_convert_to_decimal(self):
        self.assertEqual(
            2022, solution.convert_to_decimal("1=11-2"))
        self.assertEqual(
            12345, solution.convert_to_decimal("1-0---0"))
        self.assertEqual(
            314159265, solution.convert_to_decimal("1121-1110-1=0"))

    def test_convert_to_SNAFU(self):
        self.assertEqual(
            "1=11-2", solution.convert_to_SNAFU(2022))
        self.assertEqual(
            "1-0---0", solution.convert_to_SNAFU(12345))
        self.assertEqual(
            "1121-1110-1=0", solution.convert_to_SNAFU(314159265))


if __name__ == "__main__":
    unittest.main()
