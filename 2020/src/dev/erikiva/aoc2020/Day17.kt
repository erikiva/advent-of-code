package dev.erikiva.aoc2020

class Day17 {

    fun getSolution(input: List<String>): Int {
        var nextSpace = mutableSetOf<List<Int>>()

        for (rowidx in input.indices) {
            for (colidx in input[rowidx].indices) {
                if (input[rowidx][colidx] == '#')
                    nextSpace.add(listOf(colidx, rowidx, 0))
            }
        }
        for (cycle in 1..6) {
            nextSpace = calculateNextState2(nextSpace)
        }
        return nextSpace.size

    }

    private fun calculateNextState2(state: MutableSet<List<Int>>): MutableSet<List<Int>> {
        val newState = mutableSetOf<List<Int>>()
        val inactiveNeighborCount = mutableMapOf<List<Int>, Int>()
        // Add active cells that remain active
        for (activeCell in state) {
            val count = countActiveNeighbours2(state, activeCell, inactiveNeighborCount)
            if (count == 2 || count == 3) {
                newState.add(activeCell)
            }
        }
        // Add inactive cells that become active
        for (entry in inactiveNeighborCount) {
            if (entry.value == 3) {
                newState.add(entry.key)
            }
        }

        return newState
    }

    private fun countActiveNeighbours2(
        state: Set<List<Int>>,
        activeCell: List<Int>,
        inactiveNeighborCount: MutableMap<List<Int>, Int>
    ): Any {
        var count = 0
        val x = activeCell[0]
        val y = activeCell[1]
        val z = activeCell[2]
        for (xn in x - 1..x + 1) {
            for (yn in y - 1..y + 1) {
                for (zn in z - 1..z + 1) {
                    if (xn != x || yn != y || zn != z) {
                        val neighbor = listOf(xn, yn, zn)
                        if (neighbor in state) {
                            count++
                        } else {
                            inactiveNeighborCount[neighbor] = 1 +
                                    inactiveNeighborCount.getOrDefault(neighbor, 0)
                        }
                    }
                }
            }
        }
        //println("row ${row} col ${col} count ${count}")
        return count
    }

    fun getSolution4D(input: List<String>): Int {
        var nextSpace = mutableSetOf<List<Int>>()

        for (rowidx in input.indices) {
            for (colidx in input[rowidx].indices) {
                if (input[rowidx][colidx] == '#')
                    nextSpace.add(listOf(colidx, rowidx, 0, 0))
            }
        }
        for (cycle in 1..6) {
            nextSpace = calculateNextState4D(nextSpace)
        }
        return nextSpace.size

    }

    private fun calculateNextState4D(state: MutableSet<List<Int>>): MutableSet<List<Int>> {
        val newState = mutableSetOf<List<Int>>()
        val inactiveNeighborCount = mutableMapOf<List<Int>, Int>()
        // Add active cells that remain active
        for (activeCell in state) {
            val count = countActiveNeighbours4D(state, activeCell, inactiveNeighborCount)
            if (count == 2 || count == 3) {
                newState.add(activeCell)
            }
        }
        // Add inactive cells that become active
        for (entry in inactiveNeighborCount) {
            if (entry.value == 3) {
                newState.add(entry.key)
            }
        }

        return newState
    }

    private fun countActiveNeighbours4D(
        state: Set<List<Int>>,
        activeCell: List<Int>,
        inactiveNeighborCount: MutableMap<List<Int>, Int>
    ): Any {
        var count = 0
        val x = activeCell[0]
        val y = activeCell[1]
        val z = activeCell[2]
        val w = activeCell[3]
        for (xn in x - 1..x + 1) {
            for (yn in y - 1..y + 1) {
                for (zn in z - 1..z + 1)
                for (wn in w - 1..w + 1) {
                    if (xn != x || yn != y || zn != z || wn != w) {
                        val neighbor = listOf(xn, yn, zn, wn)
                        if (neighbor in state) {
                            count++
                        } else {
                            inactiveNeighborCount[neighbor] = 1 +
                                    inactiveNeighborCount.getOrDefault(neighbor, 0)
                        }
                    }
                }
            }
        }
        //println("row ${row} col ${col} count ${count}")
        return count
    }

}