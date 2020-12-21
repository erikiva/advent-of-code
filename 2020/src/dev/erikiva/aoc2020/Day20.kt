package dev.erikiva.aoc2020

import java.lang.RuntimeException

class Tile(id: Long, tile: List<String>) {
    var tile: List<CharArray>
    var id: Long
    val neighbors = mutableMapOf<String, Tile>()
    val indexedMonster: List<Pair<Int, Int>>

    init {
        this.id = id
        this.tile = tile.map {
            it.toCharArray()
        }
        val monster =
            "                  # \n" +
                    "#    ##    ##    ###\n" +
                    " #  #  #  #  #  #   "

        indexedMonster = monster.split("\n")
            .mapIndexed { lineidx, line ->
                line
                    .mapIndexed { charidx, c -> Pair(charidx, c) }
                    .filter { it.second == '#' }
                    .map { Pair(lineidx, it.first) }
            }
            .flatten()
    }

    fun getSides(): MutableSet<String> {
        var sides = mutableSetOf<String>()
        sides.add(String(tile[0]))
        sides.add(String(tile[0].reversed().toCharArray()))
        sides.add(String(tile[tile.size - 1]))
        sides.add(String(tile[tile.size - 1].reversed().toCharArray()))
        var str1 = ""
        var str2 = ""
        for (line in tile) {
            str1 += line[0]
            str2 += line[line.size - 1]
        }
        sides.add(str1)
        sides.add(str2)
        sides.add(str1.reversed())
        sides.add(str2.reversed())
        return sides
    }

    fun getOrderedSides(): List<String> {
        // T - R - B - L
        val sides = mutableListOf<String>()
        sides.add(String(tile[0])) // top
        var left = ""
        var right = ""
        for (line in tile) {
            left += line[0]
            right += line[line.size - 1]
        }
        sides.add(right) // right
        sides.add(String(tile[tile.size - 1])) // bottom
        sides.add(left) // left
        return sides
    }

    fun realignTopLeft(sides: List<Int>) {
        // rotate and flip so that sides[0] is top and sides[1] is left

        when (sides) {
            listOf(0, 1) -> flipAroundY()
            listOf(1, 2) -> {
                flipDiagonal()
                flipAroundY()
                flipAroundX()
            }
            listOf(2, 3) -> flipAroundX()
            listOf(3, 0) -> flipDiagonal()
            listOf(1, 0) -> {
                flipDiagonal()
                flipAroundX()
            }
            listOf(2, 1) -> {
                flipAroundX()
                flipAroundY()
            }
            listOf(3, 2) -> {
                flipDiagonal()
                flipAroundY()
            }
            listOf(0, 3) -> {
            }
            else -> throw RuntimeException("sides was $sides")
        }
//        val ops = mapOf(
        //"flip around y axis"
//            Pair(listOf(0,1), { () -> flipAroundY() })
//            Pair(listOf(1,2), "90ccw + flip around y axis"),
//            Pair(listOf(2,3), "flip around x axis"),
//            Pair(listOf(3,0), "diagonal flip"),
//            Pair(listOf(1,0), "90ccw"),
//            Pair(listOf(2,1), "180"),
//            Pair(listOf(3,2), "90cw"),
//            Pair(listOf(0,3), "no-op"
//            )
//        );

        // 90ccw is diagonal flip followed by flip around x
        // 90cw is diagonal flip followed by flip around y
    }

    fun realignFromTop(sides: Pair<Int, Boolean>) {
        realign(sides)
        flipDiagonal()
    }

    fun realign(sides: Pair<Int, Boolean>) {
        // rotate and flip so that sides[0] is top and sides[1] is left

        when (sides) {
            Pair(0, false) -> {
                flipDiagonal()
            }
            Pair(1, false) -> {
                flipAroundY()
            }
            Pair(2, false) -> {
                // 90 cw
                flipDiagonal()
                flipAroundY()
            }
            Pair(3, false) -> {
                //noop
            }
            Pair(0, true) -> {
                // 90ccw
                flipDiagonal()
                flipAroundX()
            }
            Pair(1, true) -> {
                flipAroundX()
                flipAroundY()
            }
            Pair(2, true) -> {
                // 90cw
                flipDiagonal()
                flipAroundY()
                flipAroundX()
            }
            Pair(3, true) -> {
                flipAroundX()
            }
            else -> throw RuntimeException("WTF")
        }
    }

    fun flipAroundY() {
        for (row in this.tile.indices) {
            this.tile[row].reverse()
        }
    }

    fun flipAroundX() {
        this.tile = this.tile.reversed()
    }

    fun flipDiagonal() {
        for (row in this.tile.indices) {
            for (col in this.tile[row].indices) {
                if (row > col) {
                    val tmp = tile[row][col]
                    tile[row][col] = tile[col][row]
                    tile[col][row] = tmp
                }
            }
        }
    }

    fun displayTile() {
        for (row in tile) {
            println(String(row))
        }
    }

    override fun toString(): String {
        return "$id - ${neighbors.values.map { it.id }}"
    }


    fun findMonsters(): Int {
        var monsters = 0
        for (rowidx in 0..tile.size - 4) {
            for (colidx in 0..tile[rowidx].size - 21) {
                if (isMonster(rowidx, colidx)) {
                    monsters++
                }
            }
        }
        //println("Monsters $monsters")
        return monsters

    }

    private fun isMonster(rowidx: Int, colidx: Int): Boolean {
        for (pixel in indexedMonster) {
            if (tile[rowidx + pixel.first][colidx + pixel.second] != '#') {
                return false
            }
        }
        return true
    }

    fun waterHardness(): Int {
        var monsters = 0
        val movements = listOf(
            Pair(2, false),
            Pair(2, false),
            Pair(2, false),
            Pair(2, false),
            Pair(0, false),
            Pair(2, false),
            Pair(2, false),
            Pair(2, false)
        )
        for (movement in movements) {
            monsters = findMonsters()
            if (monsters > 0) break
            realign(movement)
        }
        val monsterPix = monsters * indexedMonster.size
        return tile.sumBy { it.count { char -> char == '#' } } - monsterPix

    }
}

class Day20 {
    private fun getTiles(input: List<String>): List<Tile> {
        var tileNo = 0L
        var tile = mutableListOf<String>()
        var tiles = mutableMapOf<Long, Tile>()
        for (i in input.indices) {
            if (input[i].contains("Tile")) {
                tileNo = input[i].substring(5, 9).toLong()
            } else if (input[i].isNotEmpty()) {
                tile.add(input[i])
            } else {
                tiles[tileNo] = Tile(tileNo, tile)
                tile = mutableListOf()
            }
        }

        for (i in tiles.values) {
            var iSides = i.getSides()
            for (j in tiles.values) {
                val jSides = j.getSides()
                if (i.id == j.id) {
                    continue
                }
                var common = iSides intersect jSides

                if (common.isNotEmpty()) {
                    for (commonSide in common) {
                        i.neighbors.put(commonSide, j)
                    }
                }
            }
        }

        return tiles.values.toList()
    }

    fun getSolution(input: List<String>): Long {
        var tiles = getTiles(input)
        val corners = tiles.filter { it.neighbors.size == 4 }
        return corners[0].id * corners[1].id * corners[2].id * corners[3].id
    }


    fun countNonMonsterCells(input: List<String>): Int {

        val tileMatrix = mutableListOf<MutableList<Tile>>()

        tileMatrix.add(mutableListOf())

        var tiles = getTiles(input)
        val corner = tiles.filter { it.neighbors.size == 4 }.first()

        val sides = corner.getOrderedSides()
        val unconnectedSides = mutableListOf<Int>()
        for ((index, side) in sides.withIndex()) {
            if (corner.neighbors[side] == null) {
                unconnectedSides.add(index)
            }
        }

        corner.realignTopLeft(unconnectedSides)

//        println(corner.id)
//        corner.displayTile()
//        println()

        tileMatrix[0].add(corner)

        // rest of first row
        var nextTile: Tile? = corner;
        while (nextTile != null) {
            nextTile = connectAndReorientTileToRight(nextTile)
            if (nextTile != null) {
                tileMatrix[0].add(nextTile)
            }
        }

        var row = 1
        while (true) {

            // first of next row
            var col = 1
            nextTile = connectAndRealignTileBelow(tileMatrix[row - 1][0])
            if (nextTile == null) {
                break
            }
            tileMatrix.add(mutableListOf())

            tileMatrix[row].add(nextTile)
            while (nextTile != null) {
                nextTile = connectAndReorientTileToRight(nextTile)
                if (nextTile != null) tileMatrix[row].add(nextTile)
                col++
            }

            row++
        }

        //printMatrix(tileMatrix)
//
//        // third row
//        tileMatrix.add(mutableListOf())
//        col = 1
//        nextTile = connectAndRealignTileBelow(tileMatrix[1][0])
//        tileMatrix[2].add(nextTile!!)
//        while (nextTile != null) {
//            nextTile = connectAndReorientTileToRight(nextTile, tileMatrix[1].getOrNull(col))
//            if (nextTile != null) tileMatrix[2].add(nextTile)
//            col++
//        }
//
//

        val image = createImage(tileMatrix)
        val imageTile = Tile(0L, image)
        //imageTile.flipDiagonal()
        //imageTile.displayTile()
        return imageTile.waterHardness()
        //return 0
    }

    fun createImage(tileMatrix: List<List<Tile>>): MutableList<String> {
        var image = mutableListOf<String>()
        var currentLine = ""
        for (tileRow in tileMatrix) {
            for (rowIndex in 1..tileRow[0].tile.size - 2) {
                for (col in tileRow) {
                    currentLine += String(
                        col.tile[rowIndex],
                        1, col.tile[rowIndex].size - 2
                    )
                }
                image.add(currentLine)
                currentLine = ""
            }
        }
        //printImage(image)
        return image
    }

    fun printImage(image: MutableList<String>) {
        for (line in image) {
            println(line)
        }
        println()
    }

    fun printMatrix(tileMatrix: List<List<Tile>>) {
        for (tileRow in tileMatrix) {
            for (rowIndex in tileRow[0].tile.indices) {
                for (col in tileRow) {
                    print(col.tile[rowIndex])
                    print(" ")
                }
                println()
            }
            println()
        }
    }

    private fun connectAndReorientTileToRight(tileToLeft: Tile): Tile? {
        val (t, r, b, l) = tileToLeft.getOrderedSides()

        val tileToRight = tileToLeft.neighbors[r] ?: return null

        val sidesToConnect = findTopAndLeftFromLeft(tileToRight, r)

        tileToRight.realign(sidesToConnect)
        //println("${tileToRight.id} - $sidesToConnect")
//        tileToRight.displayTile()

        return tileToRight
    }

    private fun connectAndRealignTileBelow(tileAbove: Tile): Tile? {
        val (t, r, b, l) = tileAbove.getOrderedSides()

        val tileBelow = tileAbove.neighbors[b] ?: return null

        val sidesToConnect = findTopAndLeftFromTop(tileBelow, b)

        tileBelow.realignFromTop(sidesToConnect)

        // println("${tileBelow.id} - $sidesToConnect")
//        tileBelow.displayTile()

        return tileBelow
    }

    private fun findTopAndLeftFromLeft(
        currentTile: Tile,
        expectedLeftSide: String
    ): Pair<Int, Boolean> {
        var indexOfLeft = currentTile.getOrderedSides().indexOf(expectedLeftSide)
        if (indexOfLeft == -1) {
            indexOfLeft = currentTile.getOrderedSides().indexOf(expectedLeftSide.reversed())
            // println("left: $indexOfLeft reversed")
            return Pair(indexOfLeft, true)
        } else {
            // println("left: $indexOfLeft")
            return Pair(indexOfLeft, false)
        }
    }

    private fun findTopAndLeftFromTop(
        currentTile: Tile,
        expectedTopSide: String
    ): Pair<Int, Boolean> {
        var indexOfTop = currentTile.getOrderedSides().indexOf(expectedTopSide)
        if (indexOfTop == -1) {
            indexOfTop = currentTile.getOrderedSides().indexOf(expectedTopSide.reversed())
            return Pair(indexOfTop, true)
        } else {
            return Pair(indexOfTop, false)
        }
    }

    private fun findTopAndLeft(
        currentTile: Tile,
        tileToTop: Tile?,
        tileToLeft: Tile?
    ): MutableList<Int> {

        val orderedSides = currentTile.getOrderedSides()
        val sidesToConnect = mutableListOf<Int>()
        for ((index, orderedSide) in orderedSides.withIndex()) {
            if (currentTile.neighbors[orderedSide] == tileToTop) {
                // this "side" should be on top
                sidesToConnect.add(index)
            }
            if (currentTile.neighbors[orderedSide] == tileToLeft) {
                // this "side" should be on the left
                sidesToConnect.add(index)
            }
        }
        return sidesToConnect
    }

}