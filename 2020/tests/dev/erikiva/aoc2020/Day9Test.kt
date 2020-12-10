package dev.erikiva.aoc2020

import org.junit.jupiter.api.Test

import org.junit.jupiter.api.Assertions.*
import java.nio.file.Files
import java.nio.file.Paths

internal class Day9Test {

    @Test
    fun getSolutionTest() {
        val input = Files.readAllLines(Paths.get("tests/dev/erikiva/aoc2020/Day9TestInput.txt"))
        val day9 = Day9();
        assertEquals(127, day9.getSolution(input, 5))
    }

    @Test
    fun getSolution() {
        val input = Files.readAllLines(Paths.get("tests/dev/erikiva/aoc2020/Day9Input.txt"))
        val day9 = Day9();
        assertEquals(26796446, day9.getSolution(input, 25))
    }

    @Test
    fun getSolutionTest2() {
        val input = Files.readAllLines(Paths.get("tests/dev/erikiva/aoc2020/Day9TestInput.txt"))
        val day9 = Day9();
        assertEquals(62, day9.getSolution2(input, 127))
    }

    @Test
    fun getSolution2() {
        val input = Files.readAllLines(Paths.get("tests/dev/erikiva/aoc2020/Day9Input.txt"))
        val day9 = Day9();
        assertEquals(3353494, day9.getSolution2(input, 26796446))
    }

    @Test
    fun getBetterSolution2() {
        val input = Files.readAllLines(Paths.get("tests/dev/erikiva/aoc2020/Day9Input.txt"))
        val day9 = Day9();
        assertEquals(3353494, day9.getBetterSolution2(input, 26796446))
    }

}