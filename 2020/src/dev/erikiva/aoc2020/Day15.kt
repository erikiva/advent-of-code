package dev.erikiva.aoc2020


class Day15 {

    fun getSolution(input: List<Int>, turn: Int): Int {
        var list = mutableListOf<Int>()
        list.addAll(input)
        for (i in (list.size-1)..(turn - 2)) {
            var current = list.last()
            var index = list.subList(0,i).lastIndexOf(current)
            if (index == -1 ) {
                list.add(0)
            } else {
                list.add(i - index )
            }
        }
        return list[turn -1]
    }


    fun getSolution2(input: List<Int>, turn: Int): Int {
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
        return current
    }


}