require 'rspec'
require_relative './problem'

describe 'Day1 Part1' do
  it '#get test answer 1' do
    # 1122 produces a sum of 3 (1 + 2) because the first digit (1) matches the second digit and the third digit (2) matches the fourth digit.
    day1 = Day1.new().calculateCaptcha('1122')
    expect(day1).to eq(3)
  end

  it '#get test answer 1' do
    # 1111 produces 4 because each digit (all 1) matches the next.
    day1 = Day1.new().calculateCaptcha('1111')
    expect(day1).to eq(4)
  end

  it '#get test answer 1' do
    # 1234 produces 0 because no digit matches the next.
    day1 = Day1.new().calculateCaptcha('1234')
    expect(day1).to eq(0)
  end

  it '#get test answer 1' do
    # 91212129 produces 9 because the only digit that matches the next one is the last digit, 9.
    day1 = Day1.new().calculateCaptcha('91212129')
    expect(day1).to eq(9)
  end

  it 'get final answer' do
    file = File.open("input.txt")
    input = file.read
    day1 = Day1.new().calculateCaptcha(input)
    expect(day1).to eq(1136)
  end
end

describe 'Day1 Part2' do
  it '#get test answer 1' do
    # 1212 produces 6: the list contains 4 items, and all four digits match the digit 2 items ahead
    day1 = Day1.new().calculateCaptcha2('1212')
    expect(day1).to eq(6)
  end

  it '#get test answer 2' do
    # 1221 produces 0, because every comparison is between a 1 and a 2
    day1 = Day1.new().calculateCaptcha2('1221')
    expect(day1).to eq(0)
  end

  it '#get test answer 1' do
    # 123425 produces 4, because both 2s match each other, but no other digit has a match
    day1 = Day1.new().calculateCaptcha2('123425')
    expect(day1).to eq(4)
  end

  it '#get test answer 1' do
    # 123123 produces 12
    day1 = Day1.new().calculateCaptcha2('123123')
    expect(day1).to eq(12)
  end

  it '#get test answer 1' do
    # 12131415 produces 4
    day1 = Day1.new().calculateCaptcha2('12131415')
    expect(day1).to eq(4)
  end

  it 'get final answer' do
    file = File.open("input.txt")
    input = file.read
    day1 = Day1.new().calculateCaptcha2(input)
    expect(day1).to eq(1092)
  end
end