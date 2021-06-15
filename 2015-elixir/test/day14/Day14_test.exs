defmodule Day14Test do
  use ExUnit.Case
  doctest Day14

  @testInput """
    Comet can fly 14 km/s for 10 seconds, but then must rest for 127 seconds.
    Dancer can fly 16 km/s for 11 seconds, but then must rest for 162 seconds.
    """

  test "Part 1 test case 01" do
    assert Day14.part1(@testInput, 1) == 16
  end

  test "Part 1 test case 02" do
    assert Day14.part1(@testInput, 10) == 160
  end

  test "Part 1 test case 03" do
    assert Day14.part1(@testInput, 11) == 176
  end

  test "Part 1 test case 04" do
    assert Day14.part1(@testInput, 12) == 176
  end

  test "Part 1 test case 05" do
    assert Day14.part1(@testInput, 1000) == 1120
  end

  # @tag :skip
  test "Part 1" do
    {:ok, body} = File.read("test/day14/input.txt")
    assert Day14.part1(body, 2503) == 2640
  end

  # @tag :skip
  test "Part 2 test case 01" do
    assert Day14.part2(@testInput, 1) == 1
  end

  # @tag :skip
  test "Part 2 test case 02" do
    assert Day14.part2(@testInput, 140) == 139
  end

  # @tag :skip
  test "Part 2 test case 03" do
    assert Day14.part2(@testInput, 1000) == 689
  end

  # @tag :skip
  test "Part 2" do
    {:ok, body} = File.read("test/day14/input.txt")
    assert Day14.part2(body, 2503) == 1102
  end

end