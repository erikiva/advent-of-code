defmodule Day11 do


  def rule1?(password) do
     Enum.any?(0..String.length(password), fn idx ->
      case String.slice(password, idx, 3) do
        <<a, b, c>> when (b == a + 1 and c == a + 2) -> true
        _ -> false
      end
    end)
  end

  def rule2?(password) do
    !String.contains?(password, ["i", "o", "l"])
  end

  def rule3?(password) do
    Regex.scan(~r/(\w)\1/, password)
    |> length()
    |> Kernel.>=( 2)
  end

  def isValidPassword?(password) do
    rule1?(password) && rule2?(password) && rule3?(password)
  end

  def nextPassword(password) do
    case password do
      "z" -> {"a", true}
      <<a>> -> {<<a + 1>>, false}
      "z" <> rest ->
        {restPass, roll} = nextPassword(rest)
        nextLetter = case roll do
          true -> "a"
          false -> "z"
        end
        {nextLetter <> restPass, roll}
      <<a>> <> rest when a in [?i, ?l, ?o] ->
          nextLetter = <<a + 1>>
          restPass = String.duplicate( "a", String.length(rest))
          {nextLetter <> restPass, false}
      <<a>> <> rest when a in [?h, ?k, ?n] ->
          {restPass, roll} = nextPassword(rest)
          nextLetter = <<case roll do
            true -> a + 2
            false -> a
          end>>
          {nextLetter <> restPass, false}
      <<a>> <> rest ->
        {restPass, roll} = nextPassword(rest)
        nextLetter = <<case roll do
          true -> a + 1
          false -> a
        end>>
        {nextLetter <> restPass, false}
    end
  end

  def next(password) do
    {next, _} = nextPassword(password)
    next
  end

  def part1(password) do
    Stream.unfold(password, fn pass ->
      nextPass = next(pass)
      {nextPass, nextPass}
    end)
    |> Enum.find(&isValidPassword?/1)
  end
end