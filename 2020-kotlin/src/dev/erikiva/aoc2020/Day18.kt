package dev.erikiva.aoc2020

class Day18 {
    fun getSolution(input: List<String>): Long {
        var sum = 0L
        for (line in input) {
            sum += calculateLine(line)
        }
        return sum
    }

    private fun calculateLine(line: String): Long {
        return calculateLine0(line).first
    }

    private fun calculateLine0(line: String): Pair<Long, Int> {
        //println("calcLine ${line}")
        var result = 0L
        var oper = '+'
        var index = 0
        while (index < line.length) {
            var char = line[index]
            //println("saliendo char ${char} res ${result} index ${index}")
            if (char.isDigit()) {
                if (oper == '+') {
                    result += Character.getNumericValue(char)
                } else {
                    result *= Character.getNumericValue(char)
                }
            } else if (char == '+' || char == '*') {
                oper = char
            } else if (char == '(') {
                val tmp = calculateLine0(line.substring(index + 1))
                if (oper == '+') {
                    result += tmp.first
                } else {
                    result *= tmp.first
                }
                index += tmp.second
            } else if (char == ')') (
                    return Pair(result, index + 1)
                    )
            index++
        }
        //println("saliendo res ${result} index ${index}")
        // 1 + 2 * 3 + 4 * 5 + 6
        return Pair(result, index)
    }

    fun getSolution2(input: List<String>): Long {
        var sum = 0L
        for (line in input) {
            sum += calculateLine2(line)
        }
        return sum
    }

    private fun calculateLine2(line: String): Long {
        return calculateLine_("", line).first
    }

    private fun calculateLine_(prefix: String, line: String): Pair<Long, Int> {
//        println("${prefix} calcLine ${line}")
        var result = 0L
        var oper = '+'
        var index = 0
        while (index < line.length) {
            var char = line[index]
//            println("$prefix char ${char} res ${result} index ${index}")
            if (char.isDigit()) {
                if (oper == '+') {
                    result += Character.getNumericValue(char)
                } else {
                    result *= Character.getNumericValue(char)
                }
            } else if (char == '+') {
                oper = char
            } else if (char == '*') {
                val tmp = calculateLine_("$prefix*", line.substring(index + 1))
                result *= tmp.first
                index += tmp.second
            } else if (char == '(') {
                val tmp = calculateLine_("$prefix(", line.substring(index + 1))
                if (oper == '+') {
                    result += tmp.first
                } else {
                    result *= tmp.first
                }
                index += tmp.second
            } else if (char == ')') {
                if (prefix.last() == '(')
                    return Pair(result, index + 1)
                else
                    return Pair(result, index)
            }
            index++
        }
//        println("$prefix saliendo res ${result} index ${index}")
        // 1 + 2 * 3 + 4 * 5 + 6
        return Pair(result, index)
    }
}