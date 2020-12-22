package dev.erikiva.aoc2020

import org.junit.jupiter.api.Test

import org.junit.jupiter.api.Assertions.*
import java.nio.file.Files
import java.nio.file.Paths

internal class Day22Test {

    @Test
    fun getSolutionTest() {
        val input = Files.readAllLines(Paths.get("tests/dev/erikiva/aoc2020/Day22TestInput.txt"))
        val day22 = Day22();
        assertEquals(306, day22.getSolution(input))
    }

    @Test
    fun getSolution() {
        val input = Files.readAllLines(Paths.get("tests/dev/erikiva/aoc2020/Day22Input.txt"))
        val day22 = Day22();
        assertEquals(31269, day22.getSolution(input))
    }

    @Test
    fun getSolutionTestFinal() {
        val input = Files.readAllLines(Paths.get("tests/dev/erikiva/aoc2020/Day22TestInput.txt"))
        val day22 = Day22();
        assertEquals(291, day22.getSolution2(input))
    }

    @Test
    fun getSolutionTestFinal2() {
        val input = Files.readAllLines(Paths.get("tests/dev/erikiva/aoc2020/Day22TestInput2.txt"))
        val day22 = Day22();
        assertEquals(369, day22.getSolution2(input))
    }

    @Test
    fun getSolutionFinal() {
        val input = Files.readAllLines(Paths.get("tests/dev/erikiva/aoc2020/Day22Input.txt"))
        val day22 = Day22();
        assertEquals(31151, day22.getSolution2(input))
    }
}