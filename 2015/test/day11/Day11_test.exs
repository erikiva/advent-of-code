defmodule Day11Test do
  use ExUnit.Case
  doctest Day11
  @tag :skip
  test "Part 1 validate rule 01" do
    assert Day11.rule1?("hzabcmmn") == true
  end
  @tag :skip
  test "Part 1 validate rule 02" do
    assert Day11.rule2?("hajkfmmn") == true
  end
  @tag :skip
  test "Part 1 validate rule 03" do
    assert Day11.rule3?("hhjklmmn") == true
  end
  @tag :skip
  test "Part 1 validate rule 01 false" do
    assert Day11.rule1?("hzjxlmmn") == false
  end
  @tag :skip
  test "Part 1 validate rule 02 false" do
    assert Day11.rule2?("hijklmmn") == false
  end
  @tag :skip
  test "Part 1 validate rule 03 false" do
    assert Day11.rule3?("hhjklxmn") == false
  end

  @tag :skip
  test "Part 1 validate password 01" do
    assert Day11.isValidPassword?("hijklmmn") == false
  end
  @tag :skip
  test "Part 1 validate password 02" do
    assert Day11.isValidPassword?("abbceffg") == false
  end
  @tag :skip
  test "Part 1 validate password 03" do
    assert Day11.isValidPassword?("abbcegjk") == false
  end

  @tag :skip
  test "Part 1 validate password 04" do
    assert Day11.isValidPassword?("abcdffaa") == true
  end
  @tag :skip
  test "Part 1 create next 01" do
    assert Day11.next("aa") == "ab"
    assert Day11.next("az") == "ba"
    assert Day11.next("azz") == "baa"
  end

  @tag :skip
  test "Part 1 test case 01" do
    assert Day11.part1("abcdefgh") == "abcdffaa"
  end

  @tag :skip
  test "Part 1 test case 02" do
    assert Day11.part1("ghijklmn") == "ghjaabcc"
  end

  @tag :skip
  test "Part 1" do
    assert Day11.part1("hxbxwxba") == "hxbxxyzz"
  end


  # @tag :skip
  test "Part 2" do
    assert Day11.part1("hxbxxyzz") == "hxcaabcc"
  end

end