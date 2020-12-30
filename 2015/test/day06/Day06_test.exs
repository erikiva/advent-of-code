defmodule Day06Test do
  use ExUnit.Case
  doctest Day06

  test "Part 1 test case" do
    assert Day06.part1("""
      turn on 0,0 through 999,999
      toggle 0,0 through 999,0
      turn off 499,499 through 500,500
      """) == 1000000-1000-4
  end

  test "Part 1" do
    {:ok, body} = File.read("test/day06/input.txt")
    assert Day06.part1(body) == 569999
  end

  test "Part 2 test case" do
    assert Day06.part2("""
              turn on 0,0 through 0,0
              toggle 0,0 through 999,999
              """) == 2000000+1
  end

  test "Part 2" do
    {:ok, body} = File.read("test/day06/input.txt")
    assert Day06.part2(body) == 17836115
  end
end
