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

def simplifyLoop(input) do
  Stream.unfold(input, fn str ->
    if String.contains?(str, ":\"red") do
      simplified = simplify(str)
      # |> IO.inspect(label: "Stream")
      {simplified,simplified }
    else
      nil
    end
  end)
  |> Enum.to_list()
  # |> IO.inspect(label: "After Stream")
  |> List.last()
end

  def part2(input) do
    # IO.inspect(input, label: "case")
    if String.contains?(input, ":\"red") do
      simplifyLoop(input)
    else
      input
    end
    |> calculate()
    # |> IO.inspect(label: "Final")
  end
end