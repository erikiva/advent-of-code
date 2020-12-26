defmodule Day02 do
  @moduledoc """
  Documentation for AOC2015.
  """



  defp calculatePaper(dimensions) do
    [l,w,h] = dimensions
    extra =  l * w * h / Enum.max(dimensions)
    2 * l * w + 2 * w * h + 2 * h * l + extra
  end

  defp calculateRibbon(dimensions) do
    [l,w,h] = dimensions
    extra =  2*l + 2*w + 2*h -  2* Enum.max(dimensions)
    l * w * h + extra
  end
  @doc """
  Hello world.

  ## Examples

      iex> AOC2015.hello
      :world

  """
  def convertInput(input) do
    String.split(input)
    |> Enum.map(fn elem -> String.split(elem, "x")
              |> Enum.map(&String.to_integer/1)
        end )
  end

  def part1(input) do
    convertInput(input)
    |> Enum.map(&calculatePaper/1)
    |> Enum.sum()

  end

  def part2(input) do
    convertInput(input)
    |> Enum.map(&calculateRibbon/1)
    |> Enum.sum()
  end
end
