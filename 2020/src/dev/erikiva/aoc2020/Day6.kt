package dev.erikiva.aoc2020

class Day6 {
    fun getAnswersTotal(input: List<String>): Int {
        val answers  = convertInput(input)
        val sizes = answers.map { it.size }
        return sizes.sum()
    }

    fun convertInput(input: List<String>): List<Set<Char>>{
        val answers = mutableListOf<Set<Char>>()
        var current: String = ""
        for (line in input) {
            if (line.isEmpty()) {
                answers.add(current.trim().toSet())
                current = ""
            } else {
                current += line
            }
        }
        return answers
    }

    fun getAnswersTotal2(input: List<String>): Int {
        val answers  = convertInput2(input)
        val sizes = answers.map { it.size }
        return sizes.sum()
    }

    fun convertInput2(input: List<String>): List<Set<Char>>{
        val answers = mutableListOf<Set<Char>>()
        var current = mutableSetOf<Char>()
        var newGroup = true
        for (line in input) {
            if (line.isEmpty()) {
                answers.add(current)
                current = mutableSetOf<Char>()
                newGroup = true
            } else if (newGroup) {
                current = line.toSet().toMutableSet()
                newGroup = false
            } else {
                current.retainAll(line.toSet())
            }
        }
        return answers
    }
}