class Day2
  def calculateChecksum(input)
    res = 0
    input.each do |row|
      res += calculatePartialChecksum(row)
    end
    return res
  end

  def calculatePartialChecksum(row)
    values = row.split(" ").map { |digit| digit.to_i }
    return values.max - values.min
  end

  def calculateChecksum2(input)
    res = 0
    input.each do |row|
      res += calculatePartialChecksum2(row)
    end
    return res
  end

  def calculatePartialChecksum2(row)
    values = row.split(" ").map { |digit| digit.to_i }
    for i in (0...values.length)
      for j in (i+1...values.length)
        if values[i] > values[j]
          higher = values[i]
          lower = values[j]
        else
          higher = values[j]
          lower = values[i]
        end
        if higher%lower == 0
          return higher/lower
        end
      end
    end
  end
end