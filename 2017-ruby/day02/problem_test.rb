require 'rspec'
require_relative './problem'

describe 'Day2 Part1' do
  it '#get test answer 1' do
    input = File.readlines("inputTest.txt")
    day2 = Day2.new
    row1 = day2.calculatePartialChecksum(input[0])
    row2 = day2.calculatePartialChecksum(input[1])
    day2 = Day2.new.calculateChecksum(input)
    expect(row1).to eq(8)
    expect(row2).to eq(4)
    expect(day2).to eq(18)
  end

  it 'get final answer' do
    input = File.readlines("input.txt")
    day2 = Day2.new.calculateChecksum(input)
    expect(day2).to eq(58975)
  end
end

describe 'Day2 Part2' do
  it '#get test answer 1' do
    input = File.readlines("inputTest2.txt")
    day2 = Day2.new
    row1 = day2.calculatePartialChecksum2(input[0])
    row2 = day2.calculatePartialChecksum2(input[1])
    day2 = Day2.new.calculateChecksum2(input)
    expect(row1).to eq(4)
    expect(row2).to eq(3)
    expect(day2).to eq(9)
  end

  it 'get final answer' do
    input = File.readlines("input.txt")
    day2 = Day2.new.calculateChecksum2(input)
    expect(day2).to eq(308)
  end
end

