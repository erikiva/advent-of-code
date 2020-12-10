package dev.erikiva.aoc2020

import org.junit.jupiter.api.Test

import org.junit.jupiter.api.Assertions.*
import java.nio.file.Files
import java.nio.file.Paths

internal class Day08Test {

    @Test
    fun getSolutionTest() {
        val input = Files.readAllLines(Paths.get("tests/dev/erikiva/aoc2020/Day08TestInput.txt"))
        val day8 = Day08();
        assertEquals(5, day8.getSolution(input))
    }

    @Test
    fun getSolution() {
        val input = Files.readAllLines(Paths.get("tests/dev/erikiva/aoc2020/Day08Input.txt"))
        val day8 = Day08();
        assertEquals(1684, day8.getSolution(input))
    }

    @Test
    fun getSolutionTest2() {
        val input = Files.readAllLines(Paths.get("tests/dev/erikiva/aoc2020/Day08TestInput.txt"))
        val day8 = Day08();
        assertEquals(8, day8.getSolution2(input))
    }

    @Test
    fun getSolution2() {
        val input = Files.readAllLines(Paths.get("tests/dev/erikiva/aoc2020/Day08Input.txt"))
        val day8 = Day08();
        assertEquals(2188, day8.getSolution2(input))
    }

}


