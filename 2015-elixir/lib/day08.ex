defmodule Day08 do

  def parseChars(chars, res \\ 0) do
    case chars do
      "" -> res
      "\\\"" <> _ -> parseChars(String.slice(chars, 2, 999), res + 1)
      "\\\\" <> _ -> parseChars(String.slice(chars, 2, 999), res + 1)
      "\\x" <> _ -> parseChars(String.slice(chars, 4, 999), res + 1)
      _ -> parseChars(String.slice(chars, 1, 999), res + 1)
    end
  end

  def calculateSize(line) do
    len = String.length(line)
    len - parseChars(String.slice(line, 1..len-2))
  end

  def part1(input) do
    input
    |> String.split("\n", trim: true)
    |> Enum.map(&calculateSize/1)
    |> Enum.sum()
  end


  def parseEncoding(chars, res \\ 0) do
    case chars do
      "" -> res + 2
      "\"" <> _ -> parseEncoding(String.slice(chars,1, 999), res + 2)
      "\\" <> _ -> parseEncoding(String.slice(chars, 1, 999), res + 2)
      _ -> parseEncoding(String.slice(chars, 1, 999), res + 1)
    end
  end

  def calculateEncodedSize(line) do
    line
    |> parseEncoding()
    |> Kernel.-(String.length(line))
  end

  def part2(input) do
    input
    |> String.split("\n", trim: true)
    |> Enum.map(&calculateEncodedSize/1)
    |> Enum.sum()
  end
end