package dev.erikiva.aoc2020

class Passport(passString: String) {
    var passportKeys: Set<String>
    var passports = mutableMapOf<String, String>()
    val fields = setOf<String>(
        "byr",
        "iyr",
        "eyr",
        "hgt",
        "hcl",
        "ecl",
        "pid"
        // "cid"
    )

    init {
        passString.split(" ").forEach {
            passports.put(it.split(":")[0], it.split(":")[1])
        }
        this.passportKeys = passports.keys
    }

    fun isValid(): Boolean {
        return this.passportKeys.containsAll(fields)

    }

    fun isValidFinal(): Boolean {
        if (!this.passports.keys.containsAll(fields)) return false;
        // byr (Birth Year) - four digits; at least 1920 and at most 2002.
        val byr = passports.get("byr")
        if (byr?.length != 4 || byr.toInt() < 1920 || byr.toInt() > 2002) return false
        // iyr (Issue Year) - four digits; at least 2010 and at most 2020.
        val iyr = passports.get("iyr")
        if (iyr?.length != 4 || iyr.toInt() < 2010 || iyr.toInt() > 2020) return false
        // eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
        val eyr = passports.get("eyr")
        if (eyr?.length != 4 || eyr.toInt() < 2020 || eyr.toInt() > 2030) return false
        // hgt (Height) - a number followed by either cm or in:
        // If cm, the number must be at least 150 and at most 193.
        // If in, the number must be at least 59 and at most 76.
        val hgt = passports.getOrDefault("hgt", "")
        if (hgt.endsWith("cm")) {
            val cms = hgt.substringBefore("cm").toInt()
            if (cms < 150 || cms > 193) {
                return false
            }
        } else if (hgt.endsWith("in")) {
            val cms = hgt.substringBefore("in").toInt()
            if (cms < 59 || cms > 76) {
                return false
            }
        } else {
            return false
        }
        // hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
        val hcl = passports.get("hcl")
        if (hcl != null) {
            if (!hcl.matches("#[\\da-f]{6}".toRegex())) return false
        }
        // ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
        val ecl = passports.get("ecl")
        if (ecl != null) {
            if (!ecl.matches("amb|blu|brn|gry|grn|hzl|oth".toRegex())) return false
        }
        // pid (Passport ID) - a nine-digit number, including leading zeroes.
        val pid = passports.getOrDefault("pid", "")
        if (!pid.matches("\\d{9}".toRegex())!!) return false
        // cid (Country ID) - ignored, missing or not.

        return true;
    }
}

class Day4 {
    fun validatePassports(input: List<String>): Int {
        val passports = convertInput(input)
        return passports.count { Passport(it).isValid() }
    }

    fun validatePassports2(input: List<String>): Int {
        val passports = convertInput(input)
        return passports.count { Passport(it).isValidFinal() }
    }

    fun convertInput(input: List<String>): List<String> {
        val passports = mutableListOf<String>()
        var current: String = ""
        for (line in input) {
            if (line.isEmpty()) {
                passports.add(current.trim())
                current = ""
            } else {
                current += " $line"
            }

        }
        return passports
    }
}