package dev.erikiva.aoc2020

import org.junit.jupiter.api.Test

import org.junit.jupiter.api.Assertions.*
import java.nio.file.Files
import java.nio.file.Paths

internal class Day07Test {

    @Test
    fun getParentsTotalTest() {
        val input = Files.readAllLines(Paths.get("tests/dev/erikiva/aoc2020/Day07TestInput.txt"))
        val day7 = Day07();
        assertEquals(4, day7.findParentBags(input, "shiny gold"))
    }

    @Test
    fun getParentsTotal() {
        val input = Files.readAllLines(Paths.get("tests/dev/erikiva/aoc2020/Day07Input.txt"))
        val day7 = Day07();
        assertEquals(185, day7.findParentBags(input, "shiny gold"))
    }

    @Test
    fun getChildrenTotalTest() {
        val input = Files.readAllLines(Paths.get("tests/dev/erikiva/aoc2020/Day07TestInput.txt"))
        val day7 = Day07();
        assertEquals(32, day7.findChildrenBags(input, "shiny gold"))
    }

    @Test
    fun getChildrenTotalTest2() {
        val input = Files.readAllLines(Paths.get("tests/dev/erikiva/aoc2020/Day07TestInput2.txt"))
        val day7 = Day07();
        assertEquals(126, day7.findChildrenBags(input, "shiny gold"))
    }

    @Test
    fun getChildrenTotal() {
        val input = Files.readAllLines(Paths.get("tests/dev/erikiva/aoc2020/Day07Input.txt"))
        val day7 = Day07();
        assertEquals(89084, day7.findChildrenBags(input, "shiny gold"))
    }

}


