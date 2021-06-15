defmodule Day06 do

  def part1(input) do
    instructions = String.split(input, "\n", trim: true)
    |> Enum.map(&parseLine/1)
    for x <- 0..999, y <- 0..999 do
      Enum.reduce(instructions, 0, fn ins, acc -> isOn(x, y, ins, acc) end)
    end
    |> Enum.sum()
  end

  defp in_range(ins, x, y) do
    rectangle = elem(ins, 1)
    rectangle["startX"] <= x and x <= rectangle["endX"]
      and rectangle["startY"] <= y and y <= rectangle["endY"]
  end

  defp isOn(x, y, ins, currentState) do
    if in_range(ins, x, y) do
      case ins do
        {:turn_on, _ } -> 1
        {:turn_off, _ } -> 0
        {:toggle, _ } -> 1 - currentState
      end
    else
      currentState
    end
  end

  defp parseLine(line) do
    case line do
      "turn on " <> coords -> {:turn_on, parseCoords(coords)}
      "turn off " <> coords -> {:turn_off, parseCoords(coords)}
      "toggle " <> coords -> {:toggle, parseCoords(coords)}
    end
  end

  defp parseCoords(coordsStr) do
    Regex.named_captures(~r/(?<startX>\d*),(?<startY>\d*) through (?<endX>\d*),(?<endY>\d*)/, coordsStr)
    |> Map.update!("startX", &String.to_integer/1)
    |> Map.update!("startY", &String.to_integer/1)
    |> Map.update!("endX", &String.to_integer/1)
    |> Map.update!("endY", &String.to_integer/1)
  end


  def part2(input) do
    instructions = String.split(input, "\n", trim: true)
    |> Enum.map(&parseLine/1)
    for x <- 0..999, y <- 0..999 do
      Enum.reduce(instructions, 0, fn ins, acc -> adjustBrightness(x, y, ins, acc) end)
    end
    |> Enum.sum()
  end

  defp adjustBrightness(x, y, ins, currentState) do
    if in_range(ins, x, y) do
      case ins do
        {:turn_on, _ } -> currentState + 1
        {:turn_off, _ } -> max(currentState - 1, 0)
        {:toggle, _ } -> currentState + 2
      end
    else
      currentState
    end
  end
end
