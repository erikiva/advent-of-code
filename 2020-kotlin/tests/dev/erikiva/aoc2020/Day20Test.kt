package dev.erikiva.aoc2020

import org.junit.jupiter.api.Test

import org.junit.jupiter.api.Assertions.*
import java.nio.file.Files
import java.nio.file.Paths

internal class Day20Test {

    @Test
    fun getSolutionTest() {
        val input = Files.readAllLines(Paths.get("tests/dev/erikiva/aoc2020/Day20TestInput.txt"))
        val day20 = Day20();
        assertEquals(20899048083289, day20.getSolution(input))
    }

    @Test
    fun getSolution() {
        val input = Files.readAllLines(Paths.get("tests/dev/erikiva/aoc2020/Day20Input.txt"))
        val day20 = Day20();
        assertEquals(8272903687921, day20.getSolution(input))
    }

    @Test
    fun getSolutionTestFinal() {
        val input = Files.readAllLines(Paths.get("tests/dev/erikiva/aoc2020/Day20TestInput.txt"))
        val day20 = Day20();
        assertEquals(273, day20.countNonMonsterCells(input))
    }

    @Test
    fun getSolutionFinal() {
        val input = Files.readAllLines(Paths.get("tests/dev/erikiva/aoc2020/Day20Input.txt"))
        val day20 = Day20();
        assertEquals(2304, day20.countNonMonsterCells(input))
    }
}