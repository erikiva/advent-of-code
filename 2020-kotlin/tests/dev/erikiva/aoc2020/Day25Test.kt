package dev.erikiva.aoc2020

import org.junit.jupiter.api.Test

import org.junit.jupiter.api.Assertions.*
import java.nio.file.Files
import java.nio.file.Paths

internal class Day25Test {

    @Test
    fun getSolutionTest() {
        val day25 = Day25();
        assertEquals(14897079, day25.getSolution(5764801, 17807724))
    }

    @Test
    fun getSolution() {
        val day25 = Day25();
        assertEquals(7032853, day25.getSolution(7573546, 17786549))
    }

}