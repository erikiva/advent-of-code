package dev.erikiva.aoc2020

import org.junit.jupiter.api.Test

import org.junit.jupiter.api.Assertions.*
import java.nio.file.Files
import java.nio.file.Paths

internal class Day17_2Test {

    @Test
    fun getSolutionTest() {
        val input = Files.readAllLines(Paths.get("tests/dev/erikiva/aoc2020/Day17TestInput.txt"))
        val day17 = Day17_2();
        assertEquals(112, day17.getSolution(input))
    }

    @Test
    fun getSolution() {
        val input = Files.readAllLines(Paths.get("tests/dev/erikiva/aoc2020/Day17Input.txt"))
        val day17 = Day17_2();
        assertEquals(391, day17.getSolution(input))
    }

    @Test
    fun getSolutionTestFinal() {
        val input = Files.readAllLines(Paths.get("tests/dev/erikiva/aoc2020/Day17TestInput.txt"))
        val day17 = Day17_2();
        assertEquals(848, day17.getSolution4D(input))
    }

    @Test
    fun getSolutionFinal() {
        val input = Files.readAllLines(Paths.get("tests/dev/erikiva/aoc2020/Day17Input.txt"))
        val day17 = Day17_2();
        assertEquals(2264, day17.getSolution4D(input))
    }
}