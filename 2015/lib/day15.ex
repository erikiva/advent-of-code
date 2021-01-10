defmodule Day15 do

  def plane(d, n) do
    if d == 1 do
      [[n]]
    else
      for x <- 0..n, xs <- plane(d - 1, n - x) do
        [x | xs]
      end
    end
  end

  def computeScore(amounts, matrix) do
    Enum.zip(amounts, matrix)
    |> Enum.map(fn {amt, row} -> Enum.map(row, &(amt * &1)) end)
    |> Enum.zip()
    |> Enum.map(fn xs -> max(0, Enum.sum(Tuple.to_list(xs))) end)
    # |> IO.inspect
    |> Enum.reduce(1, &Kernel.*/2)
  end

  def part1(input) do
    matrix = input
    |> String.split("\n", trim: true)
    |> Enum.map(&Regex.scan(~r/-?\d+/, &1)
      |> Enum.map(fn [s] -> String.to_integer(s) end)
      |> Enum.take(4)
    )

    plane(length(matrix), 100)
    |> Enum.map(&computeScore(&1, matrix))
    |> Enum.max()
  end

  def recipyProperties(amounts, matrix) do
    Enum.zip(amounts, matrix)
    |> Enum.map(fn {amt, row} -> Enum.map(row, &(amt * &1)) end)
    |> Enum.zip()
    |> Enum.map(fn xs -> max(0, Enum.sum(Tuple.to_list(xs))) end)
  end

  def computeScore(recipy) do
    recipy
    |> Enum.take(4)
    |> Enum.reduce(1, &Kernel.*/2)
  end

  def part2(input) do
    matrix = input
    |> String.split("\n", trim: true)
    |> Enum.map(&Regex.scan(~r/-?\d+/, &1)
      |> Enum.map(fn [s] -> String.to_integer(s) end)
    )

    plane(length(matrix), 100)
    |> Enum.map(&recipyProperties(&1, matrix))
    |> Enum.filter(fn xs -> List.last(xs) == 500 end)
    |> Enum.map(&computeScore/1)
    |> Enum.max()  end
end