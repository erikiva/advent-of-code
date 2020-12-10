package dev.erikiva.aoc2020

import org.junit.jupiter.api.Test

import org.junit.jupiter.api.Assertions.*
import java.nio.file.Files
import java.nio.file.Paths

internal class Day10Test {

    @Test
    fun getSolutionTest() {
        val input = Files.readAllLines(Paths.get("tests/dev/erikiva/aoc2020/Day10TestInput.txt"))
        val day9 = Day10();
        assertEquals(35, day9.getSolution(input))
    }

    @Test
    fun getSolutionTest2() {
        val input = Files.readAllLines(Paths.get("tests/dev/erikiva/aoc2020/Day10TestInput2.txt"))
        val day9 = Day10();
        assertEquals(220, day9.getSolution(input))
    }

    @Test
    fun getSolution() {
        val input = Files.readAllLines(Paths.get("tests/dev/erikiva/aoc2020/Day10Input.txt"))
        val day9 = Day10();
        assertEquals(2312, day9.getSolution(input))
    }

    @Test
    fun getSolutionTestFinal() {
        val input = Files.readAllLines(Paths.get("tests/dev/erikiva/aoc2020/Day10TestInput.txt"))
        val day9 = Day10();
        assertEquals(8, day9.getSolution2(input))
    }

    @Test
    fun getSolutionTestFinal2() {
        val input = Files.readAllLines(Paths.get("tests/dev/erikiva/aoc2020/Day10TestInput2.txt"))
        val day9 = Day10();
        assertEquals(19208, day9.getSolution2(input))
    }

    @Test
    fun getSolutionFinal() {
        val input = Files.readAllLines(Paths.get("tests/dev/erikiva/aoc2020/Day10Input.txt"))
        val day9 = Day10();
        assertEquals(12089663946752, day9.getSolution2(input))
    }

}