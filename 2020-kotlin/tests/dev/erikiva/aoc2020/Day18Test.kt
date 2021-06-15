package dev.erikiva.aoc2020

import org.junit.jupiter.api.Test

import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Disabled
import java.nio.file.Files
import java.nio.file.Paths

internal class Day18Test {
//    2 * 3 + (4 * 5) becomes 26.
//    5 + (8 * 3 + 9 + 3 * 4 * 3) becomes 437.
//    5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4)) becomes 12240.
//    ((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2 becomes 13632

    @Test
    fun getSolutionTest01() {
        val day18 = Day18();
        assertEquals(71, day18.getSolution(listOf("1 + 2 * 3 + 4 * 5 + 6")))
    }

    @Test
    fun getSolutionTest02() {
        val day18 = Day18();
        assertEquals(26, day18.getSolution(listOf("2 * 3 + (4 * 5)")))
    }

    @Test
    fun getSolutionTest03() {
        val day18 = Day18();
        assertEquals(437, day18.getSolution(listOf("5 + (8 * 3 + 9 + 3 * 4 * 3)")))
    }

    @Test
    fun getSolutionTest04() {
        val day18 = Day18();
        assertEquals(12240, day18.getSolution(listOf("5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))")))
    }

    @Test
    fun getSolutionTest05() {
        val day18 = Day18();
        assertEquals(13632, day18.getSolution(listOf("((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2")))
    }

    @Test
    fun getSolutionTest() {
        val input = Files.readAllLines(Paths.get("tests/dev/erikiva/aoc2020/Day18TestInput.txt"))
        val day18 = Day18();
        assertEquals(26+437+12240+13632, day18.getSolution(input))
    }

    @Test
    fun getSolution() {
        val input = Files.readAllLines(Paths.get("tests/dev/erikiva/aoc2020/Day18Input.txt"))
        val day18 = Day18();
        assertEquals(1408133923393, day18.getSolution(input))
    }

    @Test
    fun getSolutionTest01Part2() {
        val day18 = Day18();
        assertEquals(231, day18.getSolution2(listOf("1 + 2 * 3 + 4 * 5 + 6")))
    }

    @Test
    fun getSolutionTest02Part2() {
        val day18 = Day18();
        assertEquals(23340, day18.getSolution2(listOf("((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2")))
    }

    @Test @Disabled
    fun getSolutionTestFinal() {
        val input = Files.readAllLines(Paths.get("tests/dev/erikiva/aoc2020/Day18TestInput.txt"))
        val day18 = Day18();
        assertEquals(848, day18.getSolution2(input))
    }

    @Test
    fun getSolutionFinal() {
        val input = Files.readAllLines(Paths.get("tests/dev/erikiva/aoc2020/Day18Input.txt"))
        val day18 = Day18();
        assertEquals(314455761823725, day18.getSolution2(input))
    }
}