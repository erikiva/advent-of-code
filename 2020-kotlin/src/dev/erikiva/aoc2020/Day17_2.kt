package dev.erikiva.aoc2020

class Day17_2 {

    interface Cube<out T> {
        fun neighbors(): List<T>
    }

    data class Cube3D(val x: Int, val y: Int, val z: Int) : Cube<Cube3D> {
        override fun neighbors(): List<Cube3D> {
            val lst = mutableListOf<Cube3D>()
            for (xn in x - 1..x + 1) {
                for (yn in y - 1..y + 1) {
                    for (zn in z - 1..z + 1) {
                        if (xn != x || yn != y || zn != z) {
                            lst.add(Cube3D(xn, yn, zn))
                        }
                    }
                }
            }
            return lst;
        }
    }

    data class Cube4D(val x: Int, val y: Int, val z: Int, val w: Int) : Cube<Cube4D> {
        override fun neighbors(): List<Cube4D> {
            val lst = mutableListOf<Cube4D>()
            for (xn in x - 1..x + 1) {
                for (yn in y - 1..y + 1) {
                    for (zn in z - 1..z + 1) {
                        for (wn in w - 1..w + 1) {
                            if (xn != x || yn != y || zn != z || wn != w) {
                                lst.add(Cube4D(xn, yn, zn, wn))
                            }
                        }
                    }
                }
            }
            return lst;
        }
    }

    fun getSolution(input: List<String>): Int {
        var state = mutableSetOf<Cube3D>()
        for (rowidx in input.indices) {
            for (colidx in input[rowidx].indices) {
                if (input[rowidx][colidx] == '#')
                    state.add(Cube3D(colidx, rowidx, 0))
            }
        }

        for (cycle in 1..6) {
            state = calculateNextState(state)
        }

        return state.size
    }

    private fun <T: Cube<T>> calculateNextState(state: Set<T>): MutableSet<T> {
        val newState = mutableSetOf<T>()
        val neighborCount = countActiveNeighbours(state)
        for (entry in neighborCount) {
            val cube = entry.key
            if (state.contains(cube) && (entry.value == 2 || entry.value == 3)) {
                // Add active cells that remain active
                newState.add(cube)
            } else if (!state.contains(cube) && entry.value == 3) {
                // Add inactive cells that become active
                newState.add(cube)
            }
        }

        return newState
    }

    private fun <T: Cube<T>> countActiveNeighbours(state: Set<T>): Map<T, Int> {
        val neighborCount = mutableMapOf<T, Int>()
        for (cube in state) {
            for (neighbor in cube.neighbors()) {
                neighborCount[neighbor] = 1 + neighborCount.getOrDefault(neighbor, 0)
            }
        }
        return neighborCount;
    }

    fun getSolution4D(input: List<String>): Int {
        var state = mutableSetOf<Cube4D>()
        for (rowidx in input.indices) {
            for (colidx in input[rowidx].indices) {
                if (input[rowidx][colidx] == '#')
                    state.add(Cube4D(colidx, rowidx, 0, 0))
            }
        }

        for (cycle in 1..6) {
            state = calculateNextState(state)
        }

        return state.size
    }
}