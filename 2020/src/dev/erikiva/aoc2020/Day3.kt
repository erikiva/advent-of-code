package dev.erikiva.aoc2020

class Day3 {

    fun findTrees(forest: List<String>): Int {
        return findTreesForSlope(forest, arrayOf(3, 1))
    }

    fun findTrees2(forest: List<String>, slopes: List<Array<Int>>): Long {
        var result = 1L
        for (slope in slopes) {
            result *= findTreesForSlope(forest, slope)
        }
        return result
    }

    private fun findTreesForSlope(forest: List<String>, slope: Array<Int>): Int {
        var trees = 0
        var pos = 0
        for (y in forest.indices step slope[1]) {
            if (forest[y][pos] == '#') {
                trees++
            }
            pos = getNextPos(pos, slope[0], forest[y].length)
        }
        println(trees)
        return trees
    }

    private fun getNextPos(x: Int, step: Int, rowSize: Int): Int {
        val next = x + step
        if (next >= rowSize) {
            return next - rowSize
        }
        return next
    }
}