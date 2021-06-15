defmodule Day04 do
  def part1(input) do
    Enum.find(1..10000000, fn elem ->
      test = :crypto.hash(:md5 , input <> to_string(elem)) |> Base.encode16()
      case test do
        "00000" <> _ -> true
        _  -> false
      end
    end)
  end


  def part2(input) do
    Enum.find(1..100000000, fn elem ->
      test = :crypto.hash(:md5 , input <> to_string(elem))
      case test do
        <<0,0,0>> <> _ -> true
        _  -> false
      end
    end)
  end
end
