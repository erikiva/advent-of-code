package dev.erikiva.aoc2020

class Day10 {
    fun getSolution(input: List<String>): Int {
        val adaptersJoltages = input.map{ it.toInt() }
        val sorted = adaptersJoltages.sorted()
        var ones = 0
        var threes = 1
        var twos = 0
        var previous = 0
        for (elem in sorted) {
            val diff = elem - previous
            if (diff == 1) {
                ones++
            } else if (diff == 2) {
                twos++
            } else if (diff == 3) {
                threes++
            }
            previous = elem
        }
        return ones * threes
    }

    fun getSolution2(input: List<String>): Long {
        val adaptersJoltages = input.map{ it.toInt() }
        val sorted = adaptersJoltages.sorted().toMutableList()
        sorted.add(0, 0)
        var chunks = mutableListOf<MutableList<Int>>()
        var chunk = mutableListOf<Int>(0)
        for (index in 1 until sorted.size) {
            val diff = sorted[index] - sorted[index-1]
            if (diff == 3) {
                chunks.add(chunk)
                chunk = mutableListOf<Int>(sorted[index])
            } else {
                chunk.add(sorted[index])
            }

        }
        if (!chunk.isEmpty()) {
            chunks.add(chunk)
        }

        var total = 1L
        for (chunk in chunks) {
            if (chunk.size in 1..2){
                continue
            } else if (chunk.size == 3) {
                total *= 2
            } else if (chunk.size == 4) {
                total *= 4
            } else if (chunk.size == 5) {
                total *= 7
            }

        }
        return total
    }
}