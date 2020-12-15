package dev.erikiva.aoc2020

import org.junit.jupiter.api.Test

import org.junit.jupiter.api.Assertions.*
import java.nio.file.Files
import java.nio.file.Paths

internal class Day15Test {
    @Test
    fun getSolutionTest() {
        val input = listOf(0,3,6)
        val day15 = Day15();
        assertEquals(436, day15.getSolution(input, 2020))
    }
    @Test
    fun getSolutionTest2() {
        val input = listOf(1,3,2)
        val day15 = Day15();
        assertEquals(1, day15.getSolution(input, 2020))
    }
    @Test
    fun getSolutionTest3() {
        val input = listOf(2,1,3)
        val day15 = Day15();
        assertEquals(10, day15.getSolution(input, 2020))
    }

    fun getSolutionTest4() {
        val input = listOf(1,2,3)
        val day15 = Day15();
        assertEquals(27, day15.getSolution(input, 2020))
    }

    @Test
    fun getSolution() {
        val input = listOf(18,8,0,5,4,1,20)
        val day15 = Day15();
        assertEquals(253, day15.getSolution(input, 2020))
    }

    @Test
    fun getSolutionTestSecond() {
        val input = listOf(0,3,6)
        val day15 = Day15();
        assertEquals(175594, day15.getSolution2(input, 30000000))
    }
    @Test
    fun getSolutionFinal() {
        val input = listOf(18,8,0,5,4,1,20)
        val day15 = Day15();
        assertEquals(13710, day15.getSolution2(input, 30000000))
    }

}