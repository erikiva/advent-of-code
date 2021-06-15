package dev.erikiva.aoc2020

import org.junit.jupiter.api.Test

import org.junit.jupiter.api.Assertions.*
import java.nio.file.Files
import java.nio.file.Paths

internal class Day23Test {

    @Test
    fun getSolutionTest() {
        val day23 = Day23();
        assertEquals("67384529", day23.getSolution("389125467"))
    }

    @Test
    fun getSolution() {
        val day23 = Day23();
        assertEquals("98752463", day23.getSolution("789465123"))
    }

    @Test
    fun getSolutionTestFinal() {
        val day23 = Day23();
        assertEquals(149245887792, day23.getSolution2("389125467"))
    }



    @Test
    fun getSolutionFinal() {
        val day23 = Day23();
        assertEquals(2000455861, day23.getSolution2("789465123"))
    }
}