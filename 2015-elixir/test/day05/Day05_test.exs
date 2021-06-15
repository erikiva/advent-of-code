defmodule Day05Test do
  use ExUnit.Case
  doctest Day05

  test "Part 1 test case 01" do
    assert Day05.part1("ugknbfddgicrmopn") == 1
  end

  test "Part 1 test case 02" do
    assert Day05.part1("aaa") == 1
  end

  test "Part 1 test case 03" do
    assert Day05.part1("jchzalrnumimnmhp\nhaegwjzuvuyypxyu\ndvszwmarrgswjxmb") == 0
  end

  test "Part 1" do
    {:ok, body} = File.read("test/day05/input.txt")
    assert Day05.part1(body) == 258
  end

  test "Part 2 test case 01" do
    assert Day05.part2("qjhvhtzxzqqjkmpb") == 1
  end

  test "Part 2 test case 02" do
    assert Day05.part2("xxyxx") == 1
  end

  test "Part 2 test case 03" do
    assert Day05.part2("uurcxstgmygtbstg") == 0
  end

  test "Part 2 test case 04" do
    assert Day05.part2("ieodomkazucvgmuy") == 0
  end

  test "Part 2" do
    {:ok, body} = File.read("test/day05/input.txt")
    assert Day05.part2(body) == 53
  end
end

