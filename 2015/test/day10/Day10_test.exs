defmodule Day10Test do
  use ExUnit.Case
  doctest Day10

  # @tag :skip
  test "Part 1 test case 01" do
    assert Day10.part1("1") == 82350
  end

  @tag :skip
  test "Part 1" do
    assert Day10.part1("1113222113") == 252594
  end

  @tag :skip
  test "Part 2 test case 01" do
    assert Day10.part2("1") == 982
  end

  # @tag :skip
  test "Part 2" do
    assert Day10.part2("1113222113") == 3579328
  end

end