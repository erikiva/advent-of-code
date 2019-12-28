import unittest 
import frequencyCalibrator


class TestBasic(unittest.TestCase):

  def test_pass(self):
    with open("input.txt") as f:
      data = frequencyCalibrator.parse(f.readlines())
      answer = frequencyCalibrator.solve(data)
      self.assertEqual(0, answer)

  def test_pass_part_two(self):
    with open("input.txt") as f:
      data = frequencyCalibrator.parse(f.readlines())
    answer = frequencyCalibrator.repeat(data)
    self.assertEqual(0, answer)

  def test_basic_parse(self):
    data = frequencyCalibrator.parse('''+1
    +3
    +2'''.split())
    self.assertEqual([1,3,2], data)

  def test_basic_solve(self):
    data = [1,1,-2]
    self.assertEqual(0, frequencyCalibrator.solve(data))

  def test_basic_part_two(self):
    data = frequencyCalibrator.parse('''+1
    -2
    +3
    +1'''.split())
    self.assertEqual(2, frequencyCalibrator.repeat(data));

if __name__ == "__main__":
  unittest.main()
