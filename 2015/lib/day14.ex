defmodule Day14 do

  def calculateRest(reindeer, seconds) do
    reindeer["speed"] * Enum.min([reindeer["flytime"], seconds])
  end

  def calculateDistance(reindeer, seconds) do
    cycles = div(seconds, (reindeer["flytime"] + reindeer["resttime"]))
    cycles * reindeer["speed"] * reindeer["flytime"] + calculateRest(reindeer, rem(seconds, (reindeer["flytime"] + reindeer["resttime"])))
  end

  def parseInput(input) do
    input
    |> String.split("\n", trim: true)
    |> Enum.map(fn line ->
        Regex.named_captures(~r/^(?<reindeer>\w+) can fly (?<speed>\d+) km\/s for (?<flytime>\d+) seconds, but then must rest for (?<resttime>\d+) seconds.$/,
         line)
         |> Map.update!("flytime", &String.to_integer/1)
         |> Map.update!("resttime", &String.to_integer/1)
         |> Map.update!("speed", &String.to_integer/1)
        end)
  end

  def part1(input, seconds) do
    parseInput(input)
    |> Enum.map(&calculateDistance(&1, seconds))
    |> Enum.max()
  end

  def part2(input, seconds) do
    reindeers = parseInput(input)
    points = Enum.map(reindeers, fn _ -> 0 end)
    for secs <- 1..seconds do
      kms = Enum.map(reindeers, &calculateDistance(&1, secs))
      best = Enum.max(kms)
      Enum.map(kms, fn elem ->
        if elem == best, do: 1, else: 0
      end)
    end
    |> Enum.reduce(points, fn pointList, acc ->
       Enum.zip(acc, pointList)
       |> Enum.map(fn {a, b} -> a + b end)
    end)
    |> Enum.max()
  end
end