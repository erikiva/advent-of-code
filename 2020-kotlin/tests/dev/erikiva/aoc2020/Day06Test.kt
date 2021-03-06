package dev.erikiva.aoc2020

import org.junit.jupiter.api.Test

import org.junit.jupiter.api.Assertions.*
import java.nio.file.Files
import java.nio.file.Paths

internal class Day06Test {

    @Test
    fun getAnswersTotalTest() {
        val input = Files.readAllLines(Paths.get("tests/dev/erikiva/aoc2020/Day06TestInput.txt"))
        val day6 = Day06();
        assertEquals(11, day6.getAnswersTotal(input))
    }
    @Test
    fun getAnswersTotal(){
        val input = Files.readAllLines(Paths.get("tests/dev/erikiva/aoc2020/Day06Input.txt"))
        val day6 = Day06();
        assertEquals(6443, day6.getAnswersTotal(input))
    }

    @Test
    fun getAnswersTotalTest2() {
        val input = Files.readAllLines(Paths.get("tests/dev/erikiva/aoc2020/Day06TestInput.txt"))
        val day6 = Day06();
        assertEquals(6, day6.getAnswersTotal2(input))
    }
    @Test
    fun getAnswersTotal2(){
        val input = Files.readAllLines(Paths.get("tests/dev/erikiva/aoc2020/Day06Input.txt"))
        val day6 = Day06();
        assertEquals(3232, day6.getAnswersTotal2(input))
    }
}


