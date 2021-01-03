defmodule Day12 do

  def calculate(str) do
    Regex.scan(~r/-?\d+/, str)
    |> Enum.map(fn [x] -> String.to_integer(x) end)
    |> Enum.sum()
  end

  def part1(input) do
    calculate(input)
  end

  def simplify(str) do
    Regex.replace(~r/{[^{}}]*}/, str, fn match ->
      if String.contains?(match, ":\"red") do
        "0"
      else
        Integer.to_string(calculate(match))
      end
    end)
  end

  def simplifyLoop(str) do
    if  String.contains?(str, ":\"red") do
      simplified = simplify(str)
      simplifyLoop(simplified)
    else
      str
    end
  end

  def part2(input) do
    simplifyLoop(input)
    |> calculate()
    # |> IO.inspect(label: "Final")
  end
end