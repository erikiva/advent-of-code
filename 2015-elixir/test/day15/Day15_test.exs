defmodule Day15Test do
  use ExUnit.Case
  doctest Day15

  @testInput """
    Butterscotch: capacity -1, durability -2, flavor 6, texture 3, calories 8
    Cinnamon: capacity 2, durability 3, flavor -2, texture -1, calories 3
    """

  test "Part 1 test case 01" do
    assert Day15.part1(@testInput) == 62842880
  end

  test "Part 1" do
    {:ok, body} = File.read("test/day15/input.txt")
    assert Day15.part1(body) == 18965440
  end

  test "Part 2 test case 01" do
    assert Day15.part2(@testInput) == 57600000
  end

  test "Part 2" do
    {:ok, body} = File.read("test/day15/input.txt")
    assert Day15.part2(body) == 15862900
  end

end