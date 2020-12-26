defmodule Day03Test do
  use ExUnit.Case
  doctest Day03

  test "Part 1 test case 01" do
    assert Day03.part1(">") == 2
  end

  test "Part 1 test case 02" do
    assert Day03.part1("^>v<") == 4
  end

  test "Part 1 test case 03" do
    assert Day03.part1("^v^v^v^v^v") == 2
  end

  test "Part 1" do
    {:ok, body} = File.read("test/day03/input.txt")
    assert Day03.part1(body) == 2592
  end

  test "Part 2 test case 01" do
    assert Day03.part2("^v") == 3
  end

  test "Part 2 test case 02" do
    assert Day03.part2("^>v<") == 3
  end

  test "Part 2 test case 03" do
    assert Day03.part2("^v^v^v^v^v") == 11
  end

  test "Part 2" do
    {:ok, body} = File.read("test/day03/input.txt")
    assert Day03.part2(body) == 2360
  end
end

