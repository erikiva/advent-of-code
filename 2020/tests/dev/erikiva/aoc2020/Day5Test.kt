package dev.erikiva.aoc2020

import org.junit.jupiter.api.Test

import org.junit.jupiter.api.Assertions.*
import java.nio.file.Files
import java.nio.file.Paths

internal class Day5Test {

    @Test
    fun validateSeat() {
        val seatStr = "FBFBBFFRLR"
        val seat = Seat(seatStr);
        assertEquals(44, seat.row)
        assertEquals(5, seat.column)
        assertEquals(357, seat.id)
    }

    @Test
    fun getTestHighestId(){
//        BFFFBBFRRR: row 70, column 7, seat ID 567.
//        FFFBBBFRRR: row 14, column 7, seat ID 119.
//        BBFFBBFRLL: row 102, column 4, seat ID 820.

        val input = listOf<String>("BFFFBBFRRR", "FFFBBBFRRR", "BBFFBBFRLL")
        val day5 = Day5();
        assertEquals(820, day5.getHighestId(input))
    }

    @Test
    fun getHighestId() {
        val input = Files.readAllLines(Paths.get("tests/dev/erikiva/aoc2020/Day5Input.txt"))
        val day5 = Day5();
        assertEquals(0, day5.getHighestId(input))
    }
    @Test
    fun getSeatId(){
        val input = Files.readAllLines(Paths.get("tests/dev/erikiva/aoc2020/Day5Input.txt"))
        val day5 = Day5();
        assertEquals(0, day5.findSeatId(input))
    }



}


