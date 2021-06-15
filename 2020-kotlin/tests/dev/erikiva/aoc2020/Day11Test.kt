package dev.erikiva.aoc2020

import org.junit.jupiter.api.Test

import org.junit.jupiter.api.Assertions.*
import java.nio.file.Files
import java.nio.file.Paths

internal class Day11Test {
    @Test
    fun getSolutionTest() {
        val input = Files.readAllLines(Paths.get("tests/dev/erikiva/aoc2020/Day11TestInput.txt"))
        val day11 = Day11();
        assertEquals(37, day11.getSolution(input))
    }

    @Test
    fun getSolution() {
        val input = Files.readAllLines(Paths.get("tests/dev/erikiva/aoc2020/Day11Input.txt"))
        val day11 = Day11();
        assertEquals(2418, day11.getSolution(input))
    }

    @Test
    fun getSolutionTestFinal() {
        val input = Files.readAllLines(Paths.get("tests/dev/erikiva/aoc2020/Day11TestInput.txt"))
        val day11 = Day11();
        assertEquals(26, day11.getSolution2(input))
    }

    @Test
    fun getSolutionFinal() {
        val input = Files.readAllLines(Paths.get("tests/dev/erikiva/aoc2020/Day11Input.txt"))
        val day11 = Day11();
        assertEquals(2144, day11.getSolution2(input))
    }

}