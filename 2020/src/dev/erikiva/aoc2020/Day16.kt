package dev.erikiva.aoc2020

class Rule(ruleStr: String) {

   var ranges: List<IntRange>
   var name: String

    init {
        this.name = ruleStr.substringBefore(": ")
        this.ranges = ruleStr.substringAfter(": ")
            .split(" or ")
            .map{ IntRange(it.substringBefore("-").toInt(), it.substringAfter("-").toInt() ) }
    }

    fun isValid(num: Int): Boolean {
        if (num in ranges[0] || num in ranges[1]) return true
        return false
    }
    override fun toString(): String {
        return "${this.name}  -  ${this.ranges}"
    }
}


class Day16 {

    fun getSolution(input: List<String>): Int {
        val rules = input.takeWhile { !it.isEmpty() }.map{ Rule(it)}
        println(rules)

        val our_ticket = input[rules.size + 2].split(",").map{ it.toInt()}
        println(our_ticket)

        val others = input.subList(rules.size + 5, input.size).map {
            it.split(",").map{ it.toInt()}
        }
        println(others)
        var sum = 0

        for (other in others) {
            for (value in other) {
                if (!rules.any{
                    it.isValid(value)
                }) sum += value
            }
        }
        return sum
    }

    fun getSolution2(input: List<String>, ruleName: String): Long {
        val rules = input.takeWhile { !it.isEmpty() }.map { Rule(it) }
        val our_ticket = input[rules.size + 2].split(",").map { it.toInt() }
        val others = input.subList(rules.size + 5, input.size).map {
            it.split(",").map { it.toInt() }
        }
        val valid_tickets = others.filter {
            it.all { field ->
                rules.any { rule ->
                    rule.isValid(field)
                }
            }
        }

        var matches = Array(rules.size) { BooleanArray(rules.size) }

        for (index in valid_tickets[0].indices) {
            for (rule_index in rules.indices) {
                if (valid_tickets.all {
                        rules[rule_index].isValid(it[index])
                    }) {
                    matches[index][rule_index] = true
                }
            }
        }
        printMatrix(matches)
        println("-------------")
        while (matches.any { row -> row.count { it } > 1 })
            for (r in matches.indices) {
                var rules_count = matches[r].count { it }
                if (rules_count == 1) {
                    val index = matches[r].indexOf(true)
                    for (x in matches.indices) {
                        matches[x][index] = false
                    }
                    matches[r][index] = true
                }
            }

        var res = 1L

        for (rowidx in matches.indices) {

            val index = matches[rowidx].indexOf(true)
            if (index < 6) {
                println(our_ticket[rowidx])
                res *= our_ticket[rowidx]
            }

        }

        printMatrix(matches)
        return res
    }

    private fun printMatrix(matches: Array<BooleanArray>) {
        for (row in matches) {
            for (col in row) {
                print(if (col) "X" else " ")
            }
            println()
        }
    }
}