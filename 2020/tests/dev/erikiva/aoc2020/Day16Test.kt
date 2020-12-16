package dev.erikiva.aoc2020

import org.junit.jupiter.api.Test

import org.junit.jupiter.api.Assertions.*
import java.nio.file.Files
import java.nio.file.Paths

internal class Day16Test {
    @Test
    fun getSolutionTest() {
        val input = Files.readAllLines(Paths.get("tests/dev/erikiva/aoc2020/Day16TestInput.txt"))
        val day16 = Day16();
        assertEquals(71, day16.getSolution(input))
    }

    @Test
    fun getSolution() {
        val input = Files.readAllLines(Paths.get("tests/dev/erikiva/aoc2020/Day16Input.txt"))
        val day16 = Day16();
        assertEquals(20091, day16.getSolution(input))
    }

    @Test
    fun getSolutionTestFinal() {
        val input = Files.readAllLines(Paths.get("tests/dev/erikiva/aoc2020/Day16TestInput2.txt"))
        val day16 = Day16();
        assertEquals(12, day16.getSolution2(input, "class"))
    }

    @Test
    fun getSolutionFinal() {
        val input = Files.readAllLines(Paths.get("tests/dev/erikiva/aoc2020/Day16Input.txt"))
        val day16 = Day16();
        assertEquals(2325343130651, day16.getSolution2(input, "departure"))
    }

}