import unittest
import inventory


class TestBasic(unittest.TestCase):

    def test_pass(self):
        with open("input.txt") as f:
            data = inventory.parse(f.readlines())
            answer = inventory.solve(data)
            self.assertEqual(4940, answer)

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

    def test_basic_solve2(self):
        data = ['abcde',
                'fghij',
                'klmno',
                'pqrst',
                'fguij',
                'axcye',
                'wvxyz']
        self.assertEqual('fgij', inventory.solve2(data))

    def test_pass_part_two(self):
        with open("input.txt") as f:
            data = inventory.parse(list(line.rstrip() for line in f))
            answer = inventory.solve2(data)
            self.assertEqual('wrziyfdmlumeqvaatbiosngkc', answer)


if __name__ == "__main__":
    unittest.main()
