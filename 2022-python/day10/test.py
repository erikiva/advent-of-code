import unittest
import solution

TEST_CASE = '''addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop
'''

RESULT_PART2 = ["◼️◼️  ◼️◼️  ◼️◼️  ◼️◼️  ◼️◼️  ◼️◼️  ◼️◼️  ◼️◼️  ◼️◼️  ◼️◼️  ",
                "◼️◼️◼️   ◼️◼️◼️   ◼️◼️◼️   ◼️◼️◼️   ◼️◼️◼️   ◼️◼️◼️   ◼️◼️◼️ ",
                "◼️◼️◼️◼️    ◼️◼️◼️◼️    ◼️◼️◼️◼️    ◼️◼️◼️◼️    ◼️◼️◼️◼️    ",
                "◼️◼️◼️◼️◼️     ◼️◼️◼️◼️◼️     ◼️◼️◼️◼️◼️     ◼️◼️◼️◼️◼️     ",
                "◼️◼️◼️◼️◼️◼️      ◼️◼️◼️◼️◼️◼️      ◼️◼️◼️◼️◼️◼️      ◼️◼️◼️◼️",
                "◼️◼️◼️◼️◼️◼️◼️       ◼️◼️◼️◼️◼️◼️◼️       ◼️◼️◼️◼️◼️◼️◼️     "]


class TestBasic(unittest.TestCase):

    def test_in_sprite(self):
        self.assertEqual(True, solution.in_sprite(
            1, 0))
        self.assertEqual(True, solution.in_sprite(
            1, 2))
        self.assertEqual(False, solution.in_sprite(
            1, 4))

    def test_basic_part1(self):
        data = TEST_CASE.strip().split('\n')
        self.assertEqual(13140, solution.part1(data))

    def test_part1(self):
        with open("input.txt") as f:
            data = f.read().strip().split('\n')
            answer = solution.part1(data)
            self.assertEqual(16880, answer)

    def test_basic_part2(self):
        data = TEST_CASE.strip().split('\n')
        self.assertEqual(RESULT_PART2, solution.part2(data))

    def test_part2(self):
        SOL = ['◼️◼️◼️  ◼️  ◼️  ◼️◼️  ◼️◼️◼️◼️  ◼️◼️    ◼️◼️ ◼️◼️◼️  ◼️◼️◼️  ',
               '◼️  ◼️ ◼️ ◼️  ◼️  ◼️    ◼️ ◼️  ◼️    ◼️ ◼️  ◼️ ◼️  ◼️ ',
               '◼️  ◼️ ◼️◼️   ◼️  ◼️   ◼️  ◼️  ◼️    ◼️ ◼️◼️◼️  ◼️  ◼️ ',
               '◼️◼️◼️  ◼️ ◼️  ◼️◼️◼️◼️  ◼️   ◼️◼️◼️◼️    ◼️ ◼️  ◼️ ◼️◼️◼️  ',
               '◼️ ◼️  ◼️ ◼️  ◼️  ◼️ ◼️    ◼️  ◼️ ◼️  ◼️ ◼️  ◼️ ◼️ ◼️  ',
               '◼️  ◼️ ◼️  ◼️ ◼️  ◼️ ◼️◼️◼️◼️ ◼️  ◼️  ◼️◼️  ◼️◼️◼️  ◼️  ◼️ ']
        with open("input.txt") as f:
            data = f.read().strip().split('\n')
            answer = solution.part2(data)
            self.assertEqual(SOL, answer)


if __name__ == "__main__":
    unittest.main()
