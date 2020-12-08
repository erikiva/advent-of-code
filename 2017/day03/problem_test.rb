require 'rspec'
require_relative './problem'

describe 'Day3 Part1' do
  it '#get test answer 1' do
    day3 = Day3.new.calculateDistance(347991)
    expect(day3).to eq(480)
  end
end

describe 'Day3 Part2' do
  it '#get test answer 1' do

  end
end

