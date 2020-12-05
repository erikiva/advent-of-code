package dev.erikiva.aoc2020

import org.junit.jupiter.api.Test

import org.junit.jupiter.api.Assertions.*
import java.nio.file.Files
import java.nio.file.Paths

internal class Day4Test {
    var slopes = listOf(arrayOf(1, 1), arrayOf(3, 1), arrayOf(5, 1), arrayOf(7, 1), arrayOf(1, 2))

    @Test
    fun validateTestPassports() {
        val input = Files.readAllLines(Paths.get("tests/dev/erikiva/aoc2020/Day4TestInput.txt"))
        val day4 = Day4();
        assertEquals(2, day4.validatePassports(input))
    }

    @Test
    fun createPassport() {
        val txtPass = "ecl:gry pid:860033327 eyr:2020 hcl:#fffffd byr:1937 iyr:2017 cid:147 hgt:183cm"
        val pass = Passport(txtPass)
        assertTrue(pass.isValid())
    }

    @Test
    fun validatePassportFinal() {
        val txtPass = "eyr:1972 cid:100 hcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926"
        val pass = Passport(txtPass)
        assertFalse(pass.isValidFinal())
    }

    @Test
    fun validatePassports() {
        val input = Files.readAllLines(Paths.get("tests/dev/erikiva/aoc2020/Day4Input.txt"))
        val day4 = Day4();
        assertEquals(0, day4.validatePassports(input))
    }

    @Test
    fun validatePassportsMixed() {
        val input = Files.readAllLines(Paths.get("tests/dev/erikiva/aoc2020/Day4TestInput2.txt"))
        val day4 = Day4();
        assertEquals(4, day4.validatePassports2(input))
    }

    @Test
    fun validatePassportsFinal() {
        val input = Files.readAllLines(Paths.get("tests/dev/erikiva/aoc2020/Day4Input.txt"))
        val day4 = Day4();
        assertEquals(4, day4.validatePassports2(input))
    }
}


