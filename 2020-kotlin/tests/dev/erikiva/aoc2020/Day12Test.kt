package dev.erikiva.aoc2020

import org.junit.jupiter.api.Test

import org.junit.jupiter.api.Assertions.*
import java.nio.file.Files
import java.nio.file.Paths

internal class Day12Test {
    @Test
    fun getSolutionTest() {
        val input = Files.readAllLines(Paths.get("tests/dev/erikiva/aoc2020/Day12TestInput.txt"))
        val day12 = Day12();
        assertEquals(25, day12.getSolution(input))
    }

    @Test
    fun getSolution() {
        val input = Files.readAllLines(Paths.get("tests/dev/erikiva/aoc2020/Day12Input.txt"))
        val day12 = Day12();
        assertEquals(904, day12.getSolution(input))
    }

    @Test
    fun getRotationChange() {
        val position = listOf(10,4)
        val day12 = Day12();
        assertEquals(mutableListOf(4,-10), day12.getNewPosition(-90, position))
    }

    @Test
    fun getSolutionTestFinal() {
        val input = Files.readAllLines(Paths.get("tests/dev/erikiva/aoc2020/Day12TestInput.txt"))
        val day12 = Day12();
        assertEquals(286, day12.getSolution2(input))
    }

    @Test
    fun getSolutionFinal() {
        val input = Files.readAllLines(Paths.get("tests/dev/erikiva/aoc2020/Day12Input.txt"))
        val day12 = Day12();
        assertEquals(18747, day12.getSolution2(input))
    }

}