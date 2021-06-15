defmodule Day01 do
  @moduledoc """
  Documentation for AOC2015.
  """

  @doc """
  Hello world.

  ## Examples

      iex> AOC2015.hello
      :world

  """
  def part1(input) do
    codepointList = String.codepoints(input)
    Enum.reduce(codepointList, 0, fn char, acc ->
        case char do
          "(" -> acc + 1
          ")" -> acc - 1
        end
      end
    )
  end

  def part2(input) do
    codepointList = String.codepoints(input)
    Enum.scan(codepointList, 0, fn char, acc ->
      case char do
        "(" -> acc + 1
        ")" -> acc - 1
      end
    end
  )
  |> Enum.find_index(fn floor -> floor == -1 end)
  |> Kernel.+(1)
  end
end
