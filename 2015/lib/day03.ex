defmodule Day03 do
  def part1(input) do
    last = {0,0}
    houses = MapSet.new([last])
    route = String.codepoints(input)
    {_, visited} = Enum.reduce(route, {last, houses}, fn next, {{x, y}, houses} ->
      case next do
        "^" -> new = {x+1, y}
                {new, MapSet.put(houses, new)}
        ">" -> new = {x, y+1}
                {new, MapSet.put(houses, new)}
        "v" -> new = {x-1, y}
                {new, MapSet.put(houses, new)}
        "<" -> new = {x, y-1}
                {new, MapSet.put(houses, new)}
      end
    end)
    MapSet.size(visited)

  end

  def calculateNewPositions(next, x, y) do
    case next do
      "^" -> {x+1, y}
      ">" -> {x, y+1}
      "v" -> {x-1, y}
      "<" -> {x, y-1}
    end

  end
  def part2(input) do
    start = {0,0}
    houses = MapSet.new([start])
    String.codepoints(input)
      |> Enum.chunk_every(2)
      |> Enum.reduce({start, start, houses},
          fn next, {{santax, santay}, {robox, roboy}, houses} ->
            [santa, robo] = next
            newSanta = calculateNewPositions(santa, santax, santay)
            newRobo = calculateNewPositions(robo, robox, roboy)
            {newSanta, newRobo, MapSet.put(houses, newSanta) |> MapSet.put(newRobo)}
      end)
      |> elem(2)
      |> MapSet.size()
  end
end
