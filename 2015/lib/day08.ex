defmodule Day08 do

  def parseChars(chars) do
    case chars do
      "" -> 0
      "\\\"" <> _ -> 1 + parseChars(String.slice(chars, 2, 999))
      "\\\\" <> _ -> 1 + parseChars(String.slice(chars, 2, 999))
      "\\x" <> _ -> 1 + parseChars(String.slice(chars, 4, 999))
      _ -> 1 + parseChars(String.slice(chars, 1, 999))
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


  def parseEncoding(chars) do
    case chars do
      "" -> 2
      "\"" <> _ -> 2 + parseEncoding(String.slice(chars,1, 999))
      "\\" <> _ -> 2 + parseEncoding(String.slice(chars, 1, 999))
      _ -> 1 + parseEncoding(String.slice(chars, 1, 999))
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