class Day1
  def calculateCaptcha(input)
    captcha = 0
    for index in (0...input.size)
      if index == (input.size - 1)
        nexti = 0
      else
        nexti = index + 1
      end
      if input[index] == input[nexti]
        captcha += input[index].to_i
      end
    end
    return captcha
  end

  def calculateCaptcha2(input)
    captcha = 0
    for index in (0...input.size)
      nexti = calculateNext(index, input.size)
      if input[index] == input[nexti]
        captcha += input[index].to_i
      end
    end
    return captcha
  end

  def calculateNext(index, length)
    res = index + length/2
    if res >= length
      res = res - length
    end
    res
  end
end