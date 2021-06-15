package dev.erikiva.aoc2020

import org.junit.jupiter.api.Test

import org.junit.jupiter.api.Assertions.*
import java.nio.file.Files
import java.nio.file.Paths

internal class Day14Test {
    @Test
    fun getSolutionTest() {
        val input = Files.readAllLines(Paths.get("tests/dev/erikiva/aoc2020/Day14TestInput.txt"))
        val day14 = Day14();
        assertEquals(165, day14.getSolution(input))
    }

    @Test
    fun getSolution() {
        val input = Files.readAllLines(Paths.get("tests/dev/erikiva/aoc2020/Day14Input.txt"))
        val day14 = Day14();
        assertEquals(8332632930672, day14.getSolution(input))
    }

    @Test
    fun getSolutionTestFinal() {
        val input = Files.readAllLines(Paths.get("tests/dev/erikiva/aoc2020/Day14TestInput2.txt"))
        val day14 = Day14();
        assertEquals(208, day14.getSolution2(input))
    }

    @Test
    fun getSolutionFinal() {
        val input = Files.readAllLines(Paths.get("tests/dev/erikiva/aoc2020/Day14Input.txt"))
        val day14 = Day14();
        assertEquals(4753238784664, day14.getSolution2(input))
    }

}