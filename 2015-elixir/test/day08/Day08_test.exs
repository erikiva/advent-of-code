defmodule Day08Test do
  use ExUnit.Case
  doctest Day08

@testInput """
  ""
  "abc"
  "aaa\\"aaa"
  "\\x27"
  """

  test "Part 1 test case 01" do
    assert Day08.part1(@testInput) == 12
  end

  test "Part 1" do
    {:ok, body} = File.read("test/day08/input.txt")
    assert Day08.part1(body) == 1371
  end

  test "Part 2 test case 01" do
    assert Day08.part2(@testInput) == 19
  end

  test "Part 2" do
    {:ok, body} = File.read("test/day08/input.txt")
    assert Day08.part2(body) == 2117
  end

end