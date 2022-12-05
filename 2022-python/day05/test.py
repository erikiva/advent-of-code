import unittest
import solution

TEST_CASE = '''    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2
'''


class TestBasic(unittest.TestCase):

    # def test_contains(self):
    #     self.assertEqual(True, solution.contains(
    #         set((1, 2, 3, 4, 5, 6)), set((3, 4, 5))))
    #     self.assertEqual(False, solution.contains(
    #         set((1, 2, 3, 4)), set((3, 4, 5))))

    def test_basic_part1(self):
        data = TEST_CASE.strip()
        stacks = {1: ['Z', "N"],
                  2: ['M', "C", "D"],
                  3: ['P'], }
        self.assertEqual("CMZ", solution.part1(data, stacks))

    def test_part1(self):
        with open("input.txt") as f:
            data = f.read().strip()
            stacks = {
                1: ['S', 'M', "R", "N", "W", "J", "V", "T"],
                2: ["B", "W", "D", "J", "Q", "P", "C", "V"],
                3: ["B", "J", "F", "H", "D", "R", "P"],
                4: ["F", "R", "P", "B", "M", "N", "D"],
                5: ["H", "V", "R", "P", "T", "B"],
                6: ["C", "B", "P", "T"],
                7: ["B", "J", "R", "P", "L"],
                8: ["N", "C", "S", "L", "T", "Z", "B", "W"],
                9: ["L", "S", "G"],
            }
            answer = solution.part1(data, stacks)
            self.assertEqual("LJSVLTWQM", answer)

    def test_basic_part2(self):
        data = TEST_CASE.strip()
        stacks = {1: ['Z', "N"],
                  2: ['M', "C", "D"],
                  3: ['P'], }
        self.assertEqual("MCD", solution.part2(data, stacks))

    def test_pass_part2(self):
        with open("input.txt") as f:
            data = f.read().strip()
            stacks = {
                1: ['S', 'M', "R", "N", "W", "J", "V", "T"],
                2: ["B", "W", "D", "J", "Q", "P", "C", "V"],
                3: ["B", "J", "F", "H", "D", "R", "P"],
                4: ["F", "R", "P", "B", "M", "N", "D"],
                5: ["H", "V", "R", "P", "T", "B"],
                6: ["C", "B", "P", "T"],
                7: ["B", "J", "R", "P", "L"],
                8: ["N", "C", "S", "L", "T", "Z", "B", "W"],
                9: ["L", "S", "G"],
            }
            answer = solution.part2(data, stacks)
            self.assertEqual("BRQWDBBJM", answer)


if __name__ == "__main__":
    unittest.main()
