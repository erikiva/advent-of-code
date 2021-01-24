defmodule Day16 do

  def matches(machineOutput, sue) do
    sue
    |> Enum.all?(fn {field, value} -> field == "Sue" || value == machineOutput[field] end)
  end

  def matchesRanges(machineOutput, sue) do
    sue
    |> Enum.all?(fn {field, value} ->
      case field do
        "Sue" -> true
        "cats"  -> value > machineOutput[field]
        "trees" -> value > machineOutput[field]
        "pomeranians" -> value < machineOutput[field]
        "goldfish" -> value < machineOutput[field]
        _ -> value == machineOutput[field]
      end
    end)
  end

  def part1(machineOutput, aunties) do
    sues = aunties
    |> String.split("\n", trim: true)
    |> Enum.map(&Regex.scan(~r/(\w+):? (\d+)/, &1)
      |> Enum.map(fn [_, name, number] -> {name, String.to_integer(number)} end)
      |> Map.new)
    |> Enum.filter(&matches(machineOutput, &1))
    case sues do
      [sue] -> sue["Sue"]
    end
  end

  def part2(machineOutput, aunties) do
    sues = aunties
    |> String.split("\n", trim: true)
    |> Enum.map(&Regex.scan(~r/(\w+):? (\d+)/, &1)
      |> Enum.map(fn [_, name, number] -> {name, String.to_integer(number)} end)
      |> Map.new)
    |> Enum.filter(&matchesRanges(machineOutput, &1))
    case sues do
      [sue] -> sue["Sue"]
    end
  end
end