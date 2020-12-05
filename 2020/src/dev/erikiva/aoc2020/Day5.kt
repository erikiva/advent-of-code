package dev.erikiva.aoc2020

class Seat(seatString: String) {
    val row: Int
    val column: Int
    val id: Int

    init {
        this.row = calculateRow(seatString.take(7))
        this.column = calculateColumn(seatString.substring(7, 10))
        this.id = calculateId()
    }

    fun calculateRow(rowStr: String): Int {
        val rowBin = rowStr.replace('F', '0').replace('B', '1')
        return Integer.parseInt(rowBin, 2)
    }

    fun calculateColumn(colStr: String): Int {
        val colBin = colStr.replace('L', '0').replace('R', '1')
        return Integer.parseInt(colBin, 2)
    }
    fun calculateId() :Int{
        return this.row * 8 + this.column
    }
}

class Day5 {
    fun getSortedSeats(input: List<String>): List<Seat> {
        val seats = input.map {Seat(it)}
        return seats.sortedBy { it.id }
    }
    fun getHighestId(input: List<String>): Int {
        val sortedSeats = getSortedSeats(input)
        return sortedSeats.last().id
    }
    fun findSeatId(input: List<String>): Int{
        val sortedSeats = getSortedSeats(input)
        for (seatId in sortedSeats.first().id..sortedSeats.last().id) {
            if (sortedSeats.find { it.id == seatId} == null ) return seatId
        }
        return 0
    }
    fun improvedFindSeatId(input: List<String>): Int{
        val sortedSeats = getSortedSeats(input)
        for (seat in sortedSeats.indices) {
            if (sortedSeats[seat + 1].id - sortedSeats[seat].id != 1) return sortedSeats[seat].id + 1
        }
        return 0
    }
}