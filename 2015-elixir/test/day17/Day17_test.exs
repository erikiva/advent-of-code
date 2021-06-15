defmodule Day17Test do
  use ExUnit.Case
  doctest Day17

  @testInput """
  20
  15
  10
  5
  5
  """

  test "Part 1 test case 01" do
    assert Day14.part1(@testInput, 25) == 4
  end
  @tag :skip
  test "Part 1" do
    {:ok, body} = File.read("test/day17/input.txt")
    assert Day17.part1(@testInput, 150) == 0
  end

  @tag :skip
  test "Part 2" do
    {:ok, body} = File.read("test/day17/input.txt")
    assert Day17.part2(@testInput, body) == 241
  end

end