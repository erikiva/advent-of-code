defmodule Day05 do

def hasVowels?(str) do
  String.codepoints(str)
  |> Enum.count(&(String.contains?("aeiou", &1) ))
  |> Kernel.>=( 3)
end

def hasRepeated?(str) do
  String.match?(str, ~r/(.)\1/)
end
def doesNotHave?(str) do
  !String.contains?(str, ["ab", "cd", "pq", "xy"])
end

def isValidString?(str) do
  hasVowels?(str) && hasRepeated?(str) && doesNotHave?(str)
end

  def part1(input) do
    String.split(input) |> Enum.count(&isValidString?/1)
  end

  def hasRepeatedWithOneBetween?(str) do
    String.match?(str, ~r/(.).\1/)
  end

  def hasRepeatedPair?(str) do
    String.match?(str, ~r/(..).*\1/)
  end

  def isValidString2?(str) do
    hasRepeatedPair?(str) && hasRepeatedWithOneBetween?(str)
  end

  def part2(input) do
    String.split(input) |> Enum.count(&isValidString2?/1)
  end
end
