defmodule Day01Test do
  use ExUnit.Case
  doctest Day01

  test "Part 1 test case" do
    assert Day01.part1("))(((((") == 3
  end

  test "Part 1" do
    {:ok, body} = File.read("test/day01/input.txt")
    assert Day01.part1(body) == 74
  end

  test "Part 2 test case" do
    assert Day01.part2("()())") == 5
  end

  test "Part 2" do
    {:ok, body} = File.read("test/day01/input.txt")
    assert Day01.part2(body) == 1795
  end
end
