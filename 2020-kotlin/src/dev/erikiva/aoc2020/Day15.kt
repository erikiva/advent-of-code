package dev.erikiva.aoc2020


class Day15 {

    fun getSolution(input: List<Int>, turn: Int): Int {
        var lastSeen = mutableMapOf<Int, Int>()
        for (num in input.indices) {
            lastSeen.put(input[num], num)
        }
        var current = input.last()
        lastSeen.remove(current)

        for (i in (input.size-1)..(turn - 2)) {
            val index = lastSeen.getOrDefault(current, -1)
            lastSeen.put(current, i)
            if (index == -1 ) {
                current = 0
            } else {
                current = i - index
            }
        }
        println(lastSeen.keys.size)
        return current
    }

}