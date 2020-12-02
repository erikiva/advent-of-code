package dev.erikiva.aoc2020

import org.junit.jupiter.api.Test

import org.junit.jupiter.api.Assertions.*
import java.nio.file.Files
import java.nio.file.Paths

internal class Day2Test {

    @Test
    fun getValidPasswords() {
        val input = listOf("1-3 a: abcde",
                "1-3 b: cdefg",
                "2-9 c: ccccccccc")
        val day2 = Day2();
        assertEquals(2, day2.getValidPasswords(input))
    }
    @Test
    fun finalGetValidPasswords(){
        val input = Files.readAllLines(Paths.get("tests/dev/erikiva/aoc2020/Day2Input.txt"))
        val day2 = Day2();
        assertEquals(0, day2.getValidPasswords(input))
    }
    @Test
    fun getValidPasswords2() {
        val input = listOf("1-3 a: abcde",
            "1-3 b: cdefg",
            "2-9 c: ccccccccc")
        val day2 = Day2();
        assertEquals(1, day2.getValidPasswordsFinal(input))
    }
    @Test
    fun finalGetValidPasswords2(){
        val input = Files.readAllLines(Paths.get("tests/dev/erikiva/aoc2020/Day2Input.txt"))
        val day2 = Day2();
        assertEquals(0, day2.getValidPasswordsFinal(input))
    }
}