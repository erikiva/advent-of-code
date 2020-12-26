defmodule Day02Test do
  use ExUnit.Case
  doctest Day02

  test "Part 1 test case" do
    assert Day02.part1("2x3x4\n1x1x10") == 58+43
  end

  test "Part 1" do
    {:ok, body} = File.read("test/day02/input.txt")
    assert Day02.part1(body) == 1598415
  end

  test "Part 2 test case" do
    assert Day02.part2("2x3x4\n1x1x10") == 48
  end

  test "Part 2" do
    {:ok, body} = File.read("test/day02/input.txt")
    assert Day02.part2(body) == 3812909
  end
end
