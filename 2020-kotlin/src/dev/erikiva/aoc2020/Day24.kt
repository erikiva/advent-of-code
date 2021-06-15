package dev.erikiva.aoc2020

class Day24 {

    fun getSolution(input: List<String>): Int {
        val blacks = getInitialState(input)
        return blacks.size
    }

    private fun getInitialState(input: List<String>): Set<Pair<Int, Int>> {
        val blacks = mutableSetOf<Pair<Int, Int>>()
        for (line in input) {
            val path = readPath(line)
            var pos = Pair(0, 0)
            for (step in path) {
                when (step) {
                    "ne" -> pos = Pair(pos.first, pos.second + 1)
                    "e" -> pos = Pair(pos.first + 1, pos.second)
                    "se" -> pos = Pair(pos.first + 1, pos.second - 1)
                    "sw" -> pos = Pair(pos.first, pos.second - 1)
                    "w" -> pos = Pair(pos.first - 1, pos.second)
                    "nw" -> pos = Pair(pos.first - 1, pos.second + 1)
                }
            }
            if (blacks.contains(pos)) {
                blacks.remove(pos)
            } else {
                blacks.add(pos)
            }

        }
        return blacks
    }

    private fun readPath(line: String): MutableList<String> {
        val path = mutableListOf<String>()
        val directions = "ns"
        var i = 0
        do {
            if (directions.contains(line[i]) ) {
                path.add(line[i].toString()+line[i+1].toString())
                i += 2
            } else {
                path.add(line[i].toString())
                i++
            }

        } while (i < line.length)
        return path
    }

    private fun getNextState(blacks: Set<Pair<Int, Int>>): Set<Pair<Int, Int>> {
        val newState = mutableSetOf<Pair<Int, Int>>()
        val visited = mutableMapOf<Pair<Int, Int>, Int>()
        for (black in blacks) {
            for (neighbor in neighboursOf(black))   {
                visited[neighbor] = 1 + visited.getOrDefault(neighbor, 0)
            }
        }
        for (tile in visited) {
            if (tile.key in blacks && tile.value in 1..2) {
                newState.add(tile.key)
            } else if (!blacks.contains(tile.key) && tile.value == 2 ) {
                newState.add(tile.key)
            }
        }
        return newState
    }

    private fun neighboursOf(pos: Pair<Int, Int>): Set<Pair<Int, Int>> {
        return setOf(
            Pair(pos.first, pos.second + 1),
            Pair(pos.first + 1, pos.second),
            Pair(pos.first + 1, pos.second - 1),
            Pair(pos.first, pos.second - 1),
            Pair(pos.first - 1, pos.second),
            Pair(pos.first - 1, pos.second + 1)
        )
    }

    fun getSolution2(input: List<String>): Int {
        var blacks = getInitialState(input)
        for (i in 1..100) {
            blacks = getNextState(blacks)
        }
        return blacks.size
    }



}