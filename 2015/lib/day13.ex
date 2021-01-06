defmodule Day13 do

  def buildGraph(elem, acc) do
    %{"x" => personA, "y" => personB, "amount" => amt, "change" => change} = elem
    amount = case change do
      "gain" -> +amt
      "lose" -> -amt
    end
    newEntry = %{personB => amount}
    Map.update(acc, personA, newEntry, &Map.merge(&1, newEntry))
  end

  def parseInput(input) do
    input
    |> String.split("\n", trim: true)
    # Alice would gain 54 happiness units by sitting next to Bob.
    |> Enum.map(fn line ->
        Regex.named_captures(~r/^(?<x>\w+) would (?<change>\w+) (?<amount>\d+) happiness units by sitting next to (?<y>\w+).$/,
         line)
        |> Map.update!("amount", &String.to_integer/1)
      end )
  end

  def generatePermutations0(map) do
    if map == %{} do
         [[]]
    else
      Enum.flat_map(Map.keys(map), fn k ->
        Map.delete(map, k)
        |> generatePermutations0()
        |> Enum.map(&[k | &1])
      end)
    end
  end

  def generatePermutations(map) do
    Map.delete(map, "Alice")
    |> generatePermutations0()
    |> Enum.map(&["Alice" | &1])
  end

  def computeHappiness(happinessMap, permutation) do
    Enum.zip(permutation, Stream.drop(Stream.cycle(permutation), 1))
    |> Enum.map(fn {a, b} -> happinessMap[a][b] + happinessMap[b][a] end)
    |> Enum.sum()
  end

  def part1(input) do
    happinessMap = parseInput(input)
    |> Enum.reduce(%{}, &buildGraph/2)

    generatePermutations(happinessMap)
    |> Enum.map(&computeHappiness(happinessMap, &1))
    |> Enum.max()
  end

  def includeMyself(map) do
    mapWithMyself = Map.put(map, "Natalia", Map.new(Map.keys(map), &{&1, 0}))
    Enum.reduce(Map.keys(map), mapWithMyself, fn personA, acc ->
      newEntry = %{"Natalia" => 0}
      Map.update(acc, personA, newEntry, &Map.merge(&1, newEntry))
    end)
  end

  def part2(input) do
    happinessMap = parseInput(input)
    |> Enum.reduce(%{}, &buildGraph/2)
    |> includeMyself()

    generatePermutations(happinessMap)
    |> Enum.map(&computeHappiness(happinessMap, &1))
    |> Enum.max()
  end
end