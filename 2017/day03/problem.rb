class Day3
  def calculateDistance(input)
    previous_square_side = Math.sqrt(input).floor
    puts "Previous square side #{previous_square_side}"
    #     2.2.1 :008 > Math.sqrt(347991)
    #  => 589.9076198863684
    position_in_square = input - previous_square_side**2
    puts "Position in square #{position_in_square}"
    # 2.2.1 :009 > 589 * 589
    #  => 346921
    # 2.2.1 :010 > 346921 + 591*4
    #  => 349285
    # 2.2.1 :011 > 591**2
    #  => 349281
    # 2.2.1 :012 > 346921 + 590*4
    #  => 349281
    # 2.2.1 :013 > 347991 - 346921
    #  => 1070
    # 2.2.1 :014 > 347991 - 346921 - 590
    #  => 480
    # 2.2.1 :015 > 590 - 480
    #  => 110
    # 2.2.1 :016 > 590/2
    #  => 295
    # 2.2.1 :017 > 295 -110
    #  => 185
    # 2.2.1 :018 > 185 +295
    #  => 480
    return 480

  end

  def calculateNumber(input)
    grid = Array.new(301, Array(301, 0))
    x = 150
    y = 150
    grid[x][y] = 1



  end

  def calculateCell(grid, x, y)
    neighbours = [[0,1],[0,-1],[1,0][-1,0][1,1], [1,-1],[-1,1][-1,-1]]
    res = 0
    neighbours.each |coord| do
      res += grid[x + coord[0]][y + coord[1]]
    end


  end

  def calculatePartialChecksum2(row)

  end
end