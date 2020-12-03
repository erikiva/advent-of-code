package dev.erikiva.aoc2020

import org.junit.jupiter.api.Test

import org.junit.jupiter.api.Assertions.*
import java.nio.file.Files
import java.nio.file.Paths

internal class Day3Test {
    var slopes = listOf(arrayOf(1,1), arrayOf(3,1), arrayOf(5,1), arrayOf(7,1), arrayOf(1,2))
    @Test
    fun getTrees() {
        val input = listOf("..##.......",
                "#...#...#..",
                ".#....#..#.",
                "..#.#...#.#",
                ".#...##..#.",
                "..#.##.....",
                ".#.#.#....#",
                ".#........#",
                "#.##...#...",
                "#...##....#",
                ".#..#...#.#")
        val day3 = Day3();
        assertEquals(7, day3.findTrees(input))
    }
    @Test
    fun finalGetTrees(){
        val input = Files.readAllLines(Paths.get("tests/dev/erikiva/aoc2020/Day3Input.txt"))
        val day3 = Day3();
        assertEquals(0, day3.findTrees(input))
    }
    @Test
    fun getTrees2() {
        val input = listOf("..##.......",
            "#...#...#..",
            ".#....#..#.",
            "..#.#...#.#",
            ".#...##..#.",
            "..#.##.....",
            ".#.#.#....#",
            ".#........#",
            "#.##...#...",
            "#...##....#",
            ".#..#...#.#")
        val day3 = Day3();
        assertEquals(336, day3.findTrees2(input, slopes))
    }
    @Test
    fun finalGetTrees2(){
        val input = Files.readAllLines(Paths.get("tests/dev/erikiva/aoc2020/Day3Input.txt"))
        val day3 = Day3();
        assertEquals(0, day3.findTrees2(input, slopes))
    }
}