defmodule Day16Test do
  use ExUnit.Case
  doctest Day16

  @testInput %{
    "children" => 3,
    "cats" => 7,
    "samoyeds" => 2,
    "pomeranians" => 3,
    "akitas" => 0,
    "vizslas" => 0,
    "goldfish" => 5,
    "trees" => 3,
    "cars" => 2,
    "perfumes" => 1
  }

  test "Part 1" do
    {:ok, body} = File.read("test/day16/input.txt")
    assert Day16.part1(@testInput, body) == 40
  end

  test "Part 2" do
    {:ok, body} = File.read("test/day16/input.txt")
    assert Day16.part2(@testInput, body) == 241
  end

end