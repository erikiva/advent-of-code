defmodule Day09Test do
  use ExUnit.Case
  doctest Day09

@testInput """
  London to Dublin = 464
  London to Belfast = 518
  Dublin to Belfast = 141
  """

  test "Part 1 test case 01" do
    assert Day09.part1(@testInput) == 605
  end

  # @tag :skip
  test "Part 1" do
    {:ok, body} = File.read("test/day09/input.txt")
    assert Day09.part1(body) == 207
  end

  test "Part 2 test case 01" do
    assert Day09.part2(@testInput) == 982
  end

  # @tag :skip
  test "Part 2" do
    {:ok, body} = File.read("test/day09/input.txt")
    assert Day09.part2(body) == 804
  end

end