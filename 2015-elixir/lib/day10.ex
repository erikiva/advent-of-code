defmodule Day10 do


  def parseNew(chars, new \\ "") do
    case chars do
      <<a, a, a>> <> rest -> parseNew(rest, new <> "3" <> <<a>>)
      <<a, a>> <> rest -> parseNew(rest, new <> "2" <> <<a>>)
      <<a>> <> rest -> parseNew(rest, new <> "1" <> <<a>>)
      "" -> new
    end
  end

  def part1(input) do
    Enum.reduce(1..40, input, fn i, acc ->
      parseNew(acc)
    end)
    |> String.length()
  end

  def part2(input) do
    Enum.reduce(1..50, input, fn i, acc ->
      parseNew(acc)
    end)
    |> String.length()
  end
end