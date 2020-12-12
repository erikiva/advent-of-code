package dev.erikiva.aoc2020

class Day11 {

    fun checkRowNeighbours(row_list: String, col: Int): Int {
        var occupied = 0
        if (col > 0) {
            if (row_list[col - 1] == '#') {
                occupied++
            }
        }
        if (col < row_list.length - 1) {
            if (row_list[col + 1] == '#') {
                occupied++
            }
        }
        if (row_list[col] == '#') {
            occupied++
        }
        return occupied
    }

    fun checkOccupiedNeighbours(seat_plan: List<String>, row: Int, col: Int): Int {
        var occupied = 0
        if (row > 0) {
            occupied += checkRowNeighbours(seat_plan[row - 1], col)
        }
        occupied += checkRowNeighbours(seat_plan[row], col)
        if (row < seat_plan.size - 1) {
            occupied += checkRowNeighbours(seat_plan[row + 1], col)
        }
        if (seat_plan[row][col] == '#') {
            occupied--
        }

        return occupied
    }

    fun getNewState(input: List<String>): List<String> {
        var newState = mutableListOf<String>()

        for (row_index in input.indices) {
            var newRow = ""
            for (col_index in input[row_index].indices) {
                var occupied = checkOccupiedNeighbours(input, row_index, col_index)
                if (input[row_index][col_index] == '#' && occupied >= 4) {
                    newRow += 'L'
                } else if (input[row_index][col_index] == 'L' && occupied == 0) {
                    newRow += '#'
                } else {
                    newRow += input[row_index][col_index]
                }
            }
            newState.add(newRow)
        }
        //print_seat_plan(newState)
        return newState
    }

    fun getSolution(input: List<String>): Int {
        var previous_state = input
        var current_state = getNewState(input)
        while (current_state != previous_state) {
            previous_state = current_state
            current_state = getNewState(previous_state)
        }

        return current_state.map { it.count { it == '#' } }.sum()
    }

    fun checkOccupiedDirection(seat_plan: List<String>, row: Int, col: Int, direction: List<Int>): Boolean {
        var new_row = row + direction[0]
        var new_col = col + direction[1]
        while (true) {
            if ((new_row < 0) || (new_row > seat_plan.size - 1)
                || (new_col < 0) || (new_col > seat_plan[row].length - 1)
                || seat_plan[new_row][new_col] == 'L'
            ) {
                return false
            }
            if (seat_plan[new_row][new_col] == '#') {
                return true
            }
            new_row += direction[0]
            new_col += direction[1]
        }
    }

    fun getNewState2(input: List<String>): List<String> {
        var newState = mutableListOf<String>()
        val directions = listOf(
            listOf(1, 0), listOf(1, 1), listOf(0, 1), listOf(-1, 1),
            listOf(-1, 0), listOf(-1, -1), listOf(0, -1), listOf(1, -1)
        )

        for (row_index in input.indices) {
            var newRow = ""
            for (col_index in input[row_index].indices) {
                var occupied = 0
                for (direction in directions) {
                    if (checkOccupiedDirection(input, row_index, col_index, direction)) {
                        occupied++
                    }
                }
                if (input[row_index][col_index] == '#' && occupied >= 5) {
                    newRow += 'L'
                } else if (input[row_index][col_index] == 'L' && occupied == 0) {
                    newRow += '#'
                } else {
                    newRow += input[row_index][col_index]
                }
            }
            newState.add(newRow)
        }
        //print_seat_plan(newState)
        return newState
    }

    fun getSolution2(input: List<String>): Int {
        var previous_state = input
        var current_state = getNewState2(input)
        while (current_state != previous_state) {
            previous_state = current_state
            current_state = getNewState2(previous_state)
        }
        return current_state.map { it.count { it == '#' } }.sum()
    }

    fun print_seat_plan(seat_plan: List<String>) {
        for (line in seat_plan) {
            println(line)
        }
        println()
    }
}