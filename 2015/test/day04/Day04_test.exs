defmodule Day04Test do
  use ExUnit.Case
  doctest Day04

  test "Part 1 test case 01" do
    assert Day04.part1("abcdef") == 609043
  end

  test "Part 1 test case 02" do
    assert Day04.part1("pqrstuv") == 1048970
  end


  test "Part 1" do
    assert Day04.part1("bgvyzdsv") == 254575
  end

  test "Part 2" do
    assert Day04.part2("bgvyzdsv") == 0
  end
end

