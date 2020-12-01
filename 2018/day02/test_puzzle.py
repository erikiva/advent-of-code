import unittest
import inventory


class TestBasic(unittest.TestCase):

    def test_pass(self):
        with open("input.txt") as f:
            data = inventory.parse(f.readlines())
            answer = inventory.solve(data)
            self.assertEqual(0, answer)

    # def test_pass_part_two(self):
    #     with open("input.txt") as f:
    #         data = inventory.parse(f.readlines())
    #         answer = inventory.repeat(data)
    #         self.assertEqual(0, answer)

    def test_basic_parse(self):
        data = inventory.parse('''abcdef
          bababc
          abbcde
          abcccd
          aabcdd
          abcdee
          ababab'''.split())
        self.assertEqual(['abcdef',
                          'bababc',
                          'abbcde',
                          'abcccd',
                          'aabcdd',
                          'abcdee',
                          'ababab'], data)

    def test_basic_solve(self):
        data = ['abcdef',
                'bababc',
                'abbcde',
                'abcccd',
                'aabcdd',
                'abcdee',
                'ababab']
        self.assertEqual(12, inventory.solve(data))

    # def test_basic_part_two(self):
    #     data = inventory.parse('''+1
    # -2
    # +3
    # +1'''.split())
    #     self.assertEqual(2, inventory.repeat(data))


if __name__ == "__main__":
    unittest.main()
