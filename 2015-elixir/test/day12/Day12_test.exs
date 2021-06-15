defmodule Day12Test do
  use ExUnit.Case
  doctest Day12

  test "Part 1 test case 01" do
    assert Day12.part1(~s([1,2,3])) == 6
    assert Day12.part1(~s({"a":2,"b":4})) == 6
    assert Day12.part1(~s([[[3]]])) == 3
    assert Day12.part1(~s({"a":{"b":4},"c":-1})) == 3
    assert Day12.part1(~s([])) == 0
    assert Day12.part1(~s({})) == 0
  end


  # @tag :skip
  test "Part 1" do
    {:ok, body} = File.read("test/day12/input.txt")
    assert Day12.part1(body) == 119433
  end

  # @tag :skip
  test "Part 2 test case 01" do
    assert Day12.part2(~s([1,2,3])) == 6
    assert Day12.part2(~s([1,{"c":"red","b":2},3])) == 4
    assert Day12.part2(~s({"d":"red","e":[1,2,3,4],"f":5})) == 0
    assert Day12.part2(~s([1,"red",5])) == 6
    assert Day12.part2(~s([{"d":"red","e":[1,2,3,4],"f":5, "g": {"d":"blue","e":[1,2,3,4]}}, {"d":"blue","e":[1,2,3,4]}])) == 10
  end

  # @tag :skip
  test "Part 2" do
    {:ok, body} = File.read("test/day12/input.txt")
    assert Day12.part2(body) == 68466
  end

end