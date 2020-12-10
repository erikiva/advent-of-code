package dev.erikiva.aoc2020

import org.junit.jupiter.api.Test

import org.junit.jupiter.api.Assertions.*
import java.nio.file.Files
import java.nio.file.Paths

internal class Day01Test {

    @Test
    fun getTwoNumbers() {
        val input = listOf(1721, 979, 366, 299, 675, 1456)
        val day1 = Day01();
        assertEquals(514579, day1.getTwoNumbers(input))
    }
    @Test
    fun finalTwoNumbers(){
        println(Paths.get("tests/dev/erikiva/aoc2020/Day01Input.txt").toAbsolutePath())
        val input = Files.readAllLines(Paths.get("tests/dev/erikiva/aoc2020/Day01Input.txt"))
        println(input)
        val day1 = Day01();
        val nums = input.map { it.toInt() }
        assertEquals(1020036, day1.getTwoNumbers(nums))
    }
    @Test
    fun getTreeNumbers() {
        val input = listOf(1721, 979, 366, 299, 675, 1456)
        val day1 = Day01();
        assertEquals(241861950, day1.getTreeNumbers(input))
    }
    @Test
    fun finalTreeNumbers(){
        println(Paths.get("tests/dev/erikiva/aoc2020/Day01Input.txt").toAbsolutePath())
        val input = Files.readAllLines(Paths.get("tests/dev/erikiva/aoc2020/Day01Input.txt"))
        val day1 = Day01();
        val nums = input.map { it.toInt() }
        assertEquals(286977330, day1.getTreeNumbers(nums))
    }
}