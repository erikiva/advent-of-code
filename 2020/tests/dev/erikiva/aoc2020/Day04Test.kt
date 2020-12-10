package dev.erikiva.aoc2020

import org.junit.jupiter.api.Test

import org.junit.jupiter.api.Assertions.*
import java.nio.file.Files
import java.nio.file.Paths

internal class Day04Test {

    @Test
    fun validateTestPassports() {
        val input = Files.readAllLines(Paths.get("tests/dev/erikiva/aoc2020/Day04TestInput.txt"))
        val day4 = Day04();
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
        val input = Files.readAllLines(Paths.get("tests/dev/erikiva/aoc2020/Day04Input.txt"))
        val day4 = Day04();
        assertEquals(233, day4.validatePassports(input))
    }

    @Test
    fun validatePassportsMixed() {
        val input = Files.readAllLines(Paths.get("tests/dev/erikiva/aoc2020/Day04TestInput2.txt"))
        val day4 = Day04();
        assertEquals(4, day4.validatePassports2(input))
    }

    @Test
    fun validatePassportsFinal() {
        val input = Files.readAllLines(Paths.get("tests/dev/erikiva/aoc2020/Day04Input.txt"))
        val day4 = Day04();
        assertEquals(111, day4.validatePassports2(input))
    }
}


