defmodule Day07Test do
  use ExUnit.Case
  doctest Day07

@testInput """
  123 -> x
  456 -> y
  x AND y -> dc
  x OR y -> e
  x LSHIFT 2 -> fu
  y RSHIFT 2 -> g
  NOT x -> hw
  NOT y -> i
  """

  test "Part 1 test case 01" do
    assert Day07.part1(@testInput, "dc") == 72
  end
  @tag :skip
  test "Part 1 test case 02" do
    assert Day07.part1(@testInput, "e") == 507
  end
  @tag :skip
  test "Part 1 test case 03" do
    assert Day07.part1(@testInput, "fu") == 492
  end
  @tag :skip
  test "Part 1 test case 04" do
    assert Day07.part1(@testInput, "g") == 114
  end
  @tag :skip
  test "Part 1 test case 05" do
    assert Day07.part1(@testInput, "hw") == 65412
  end
  @tag :skip
  test "Part 1 test case 06" do
    assert Day07.part1(@testInput, "i") == 65079
  end

  test "Part 1" do
    {:ok, body} = File.read("test/day07/input.txt")
    assert Day07.part1(body, "a") == 3176
  end

  test "Part 2" do
    {:ok, body} = File.read("test/day07/input.txt")
    assert Day07.part2(body, "a") == 14710
  end

end