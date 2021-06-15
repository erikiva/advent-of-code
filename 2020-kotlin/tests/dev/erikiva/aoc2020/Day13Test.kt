package dev.erikiva.aoc2020

import org.junit.jupiter.api.Test

import org.junit.jupiter.api.Assertions.*
import java.nio.file.Files
import java.nio.file.Paths

internal class Day13Test {
    @Test
    fun getSolutionTest() {
        val input = Files.readAllLines(Paths.get("tests/dev/erikiva/aoc2020/Day13TestInput.txt"))
        val day13 = Day13();
        assertEquals(295, day13.getSolution(input))
    }

    @Test
    fun getSolution() {
        val input = Files.readAllLines(Paths.get("tests/dev/erikiva/aoc2020/Day13Input.txt"))
        val day13 = Day13();
        assertEquals(156, day13.getSolution(input))
    }

    @Test
    fun getSolutionTestFinal() {
        val input = Files.readAllLines(Paths.get("tests/dev/erikiva/aoc2020/Day13TestInput.txt"))
        val day13 = Day13();
        assertEquals(1068781, day13.getSolution2(input))
    }

    @Test
    fun getSolutionFinal() {
        val input = Files.readAllLines(Paths.get("tests/dev/erikiva/aoc2020/Day13Input.txt"))
        val day13 = Day13();
        assertEquals(404517869995362, day13.getSolution2(input))
    }

}