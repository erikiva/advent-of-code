defmodule Day07 do
  use Bitwise

  def parseInstruction(line) do
    Regex.named_captures(~r/(((?<left>\w*) )?(?<operator>AND|OR|LSHIFT|RSHIFT|NOT) )?(?<right>\w+) -> (?<result>.*)/, line)
  end

  def evaluateRule(instructions, target, memo) do
    {oper, left, right} = instructions[target]
    case oper do
      "" -> findResult(instructions, right, memo)
      "AND" -> myand(instructions, left, right, memo)
      "OR" -> myor(instructions, left, right, memo)
      "LSHIFT" -> lshift(instructions, left, memo, String.to_integer(right))
      "RSHIFT" -> rshift(instructions, left, memo, String.to_integer(right))
      "NOT" -> mynot(instructions, right, memo)
    end
  end

  def binary_op(operator, instructions, left, right, memo) do
    {leftRes, leftMemo} = findResult(instructions, left, memo)
    {rightRes, rightMemo} = findResult(instructions, right, leftMemo)
    {operator.(leftRes, rightRes), rightMemo}
  end

  def unary_op(operator, instructions, left, memo) do
    {leftRes, leftMemo} = findResult(instructions, left, memo)
    {operator.(leftRes), leftMemo}
  end

  def myand(instructions, left, right, memo) do
    binary_op(&band/2, instructions, left, right, memo)
  end

  def myor(instructions, left, right, memo) do
    binary_op(&bor/2, instructions, left, right, memo)
  end

  def lshift(instructions, left, memo, right) do
    unary_op(fn x -> x <<< right end, instructions, left, memo)
  end

  def rshift(instructions, left, memo, right) do
    unary_op(fn x -> x >>> right end, instructions, left, memo)
  end

  def mynot(instructions, left, memo) do
    unary_op(fn x -> ~~~x &&& 0xffff end, instructions, left, memo)
  end

  def findResult(instructions, target, memo) do
    # get target in instrutions
    # if it is termination return result
    # else call again with new target(s)
    if Map.has_key?(memo, target) do
      res = Map.get(memo, target)
      {res, memo}
    else
      {res, new_memo} = case Integer.parse(target) do
        {num, ""} -> {num, memo}
        :error -> evaluateRule(instructions, target, memo)
      end
      # IO.inspect(target, label: "target")
      # IO.inspect(res, label: "res")
      # Map.put(memo, target, res)
      {res, Map.put(new_memo, target, res)}
    end
  end

  def part1(input, target) do
    input
    |> String.split("\n", trim: true)
    |> Enum.map(&parseInstruction/1)
    |> Map.new(fn elem ->
      {elem["result"], {elem["operator"], elem["left"], elem["right"]}}
    end)
    |> findResult(target, %{})
    |> elem(0)
  end

  def part2(input, target) do
    input
    |> String.split("\n", trim: true)
    |> Enum.map(&parseInstruction/1)
    |> Map.new(fn elem ->
      {elem["result"], {elem["operator"], elem["left"], elem["right"]}}
    end)
    |> Map.put("b", {"", "", "3176"})
    |> findResult(target, %{})
    |> elem(0)
  end
end