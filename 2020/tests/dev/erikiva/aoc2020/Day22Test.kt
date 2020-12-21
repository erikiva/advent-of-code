package dev.erikiva.aoc2020

import org.junit.jupiter.api.Test

import org.junit.jupiter.api.Assertions.*
import java.nio.file.Files
import java.nio.file.Paths

internal class Day21Test {

    @Test
    fun getSolutionTest() {
        val input = Files.readAllLines(Paths.get("tests/dev/erikiva/aoc2020/Day21TestInput.txt"))
        val day21 = Day21();
        assertEquals(5, day21.getSolution(input))
    }

    @Test
    fun getSolution() {
        val input = Files.readAllLines(Paths.get("tests/dev/erikiva/aoc2020/Day21Input.txt"))
        val day21 = Day21();
        assertEquals(2542, day21.getSolution(input))
    }

    @Test
    fun getSolutionTestFinal() {
        val input = Files.readAllLines(Paths.get("tests/dev/erikiva/aoc2020/Day21TestInput.txt"))
        val day21 = Day21();
        assertEquals("mxmxvkd,sqjhc,fvjkl", day21.getSolution2(input))
    }

    @Test
    fun getSolutionFinal() {
        val input = Files.readAllLines(Paths.get("tests/dev/erikiva/aoc2020/Day21Input.txt"))
        val day21 = Day21();
        assertEquals("hkflr,ctmcqjf,bfrq,srxphcm,snmxl,zvx,bd,mqvk", day21.getSolution2(input))
    }
}