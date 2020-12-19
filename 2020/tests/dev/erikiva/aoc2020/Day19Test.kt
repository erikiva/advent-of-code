package dev.erikiva.aoc2020

import org.junit.jupiter.api.Test

import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Disabled
import java.nio.file.Files
import java.nio.file.Paths

internal class Day19Test {

    @Test
    fun getSolutionTest() {
        val input = Files.readAllLines(Paths.get("tests/dev/erikiva/aoc2020/Day19TestInput.txt"))
        val day19 = Day19();
        assertEquals(2, day19.getSolution(input))
    }

    @Test
    fun getSolution() {
        val input = Files.readAllLines(Paths.get("tests/dev/erikiva/aoc2020/Day19Input.txt"))
        val day19 = Day19();
        assertEquals(0, day19.getSolution(input))
    }



    @Test
    fun getSolutionTestFinal() {
        val input = Files.readAllLines(Paths.get("tests/dev/erikiva/aoc2020/Day19TestInput2.txt"))
        val day19 = Day19();
        assertEquals(12, day19.getSolution2(input))
    }

    @Test
    fun getSolutionFinal() {
        val input = Files.readAllLines(Paths.get("tests/dev/erikiva/aoc2020/Day19Input.txt"))
        val day19 = Day19();
        assertEquals(0, day19.getSolution2(input))
    }
}