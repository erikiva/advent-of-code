defmodule Day09 do

  def buildGraph(elem, acc) do
    new_elem_orig = {elem["destination"], String.to_integer(elem["dist"])}
      new_elem_dest = {elem["origin"], String.to_integer(elem["dist"])}
      acc
        |> Map.update( elem["origin"], [new_elem_orig],
          fn val -> [new_elem_orig| val] end )
        |> Map.update( elem["destination"], [new_elem_dest],
          fn val -> [new_elem_dest| val] end )
  end

  def generatePaths(map) do
    if map == %{} do
      [{[], 0}]
    else
      Enum.flat_map(map, fn {k,v} ->
        {current, new_map} = Map.pop(map, k)
        gen = generatePaths(new_map)
        Enum.map(gen, fn {path, distance} ->
          new_distance = case path do
            [head | _] -> elem(Enum.find(current, 0, fn city -> head == elem(city, 0) end), 1)
            _ -> 0
          end
          {[k | path], distance + new_distance}
        end)
      end)
    end
  end

  def generateDistances(input) do
    input
    |> String.split("\n", trim: true)
    |> Enum.map(fn line -> Regex.named_captures(~r/(?<origin>\w+) to (?<destination>\w+) = (?<dist>\d+)/,
         line
        ) end )
    |> Enum.reduce(%{}, &buildGraph/2)
    |> generatePaths()
    |> Enum.map(fn e -> elem(e, 1) end)
  end

  def part1(input) do
    input
    |> generateDistances()
    |> Enum.min()
  end

  def part2(input) do
    input
    |> generateDistances()
    |> Enum.max()
  end
end