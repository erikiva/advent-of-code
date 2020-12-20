package dev.erikiva.aoc2020


class Day19 {
    fun getSolution(input: List<String>): Int {
        var index = 0
        val pair = parseRule(input, index)
        var rules = pair.first
        index = pair.second
        index++
        //println(rules)
        var valid_messages = 0
        for (msgidx in index until input.size) {
            if (isValid(input[msgidx], rules)) {
                //println(input[msgidx])
                valid_messages++
            }
        }

        return valid_messages
    }

    private fun parseRule(
        input: List<String>,
        index: Int
    ): Pair<MutableMap<String, List<List<String>>>, Int> {
        var index1 = index
        var rules = mutableMapOf<String, List<List<String>>>()
        while (input[index1].isNotEmpty()) {
            val rule = input[index1].split(": ")
            rules[rule[0]] = rule[1].split(" | ").map { it.split(" ") }
            index1++
        }
        return Pair(rules, index1)
    }

    fun tryParseAlternatives(
        msg: String,
        rules: MutableMap<String, List<List<String>>>,
        current: List<List<String>>
    ): Pair<Boolean, String> {
        for (alt in current) {
            val tryRes = tryParse(msg, rules, alt)
            if (tryRes.first) {
                return tryRes
            }
        }
        return Pair(false, msg)
    }

    fun tryParse(
        msg: String,
        rules: MutableMap<String, List<List<String>>>,
        current: List<String>
    ): Pair<Boolean, String> {
        if (current.size == 1 && current[0].contains("\"")) {
            if (msg.length > 0) {
                return Pair(current[0].contains(msg[0]), msg.substring(1))
            } else {
                return Pair(false, msg)
            }
        }
        var tryRes = Pair(false, msg)
        for (subrule in current!!) {

            tryRes = tryParseAlternatives(tryRes.second, rules, rules[subrule]!!)
            if (!tryRes.first) {
                return tryRes
            }
//            if (subrule == "42") {
//                println("para 42 ${msg.substring(0, msg.length - tryRes.second.length)}")
//            }
//            if (subrule == "31") {
//                println("para 31 ${msg.substring(0, msg.length - tryRes.second.length)}")
//            }
        }
//        println("$msg match $current")
        return tryRes
    }

    fun isValid(
        msg: String,
        rules: MutableMap<String, List<List<String>>>
    ): Boolean {
        var ruleId = "0"
        var rule = rules[ruleId]
        val result = tryParseAlternatives(msg, rules, rule!!)
        if (result.second.isNotEmpty()) {
            return false
        }
        return result.first
    }

    fun isValid2(
        msg: String,
        rules: MutableMap<String, List<List<String>>>,
        ruleLength: Int
    ): Boolean {
        //println("The message is ${msg} ")
        val numberOfUnits = msg.length / ruleLength
        for (i in numberOfUnits / 2 + 1 until numberOfUnits) {
            //println("$numberOfUnits = $i + ${numberOfUnits - i}")

            var result = parseRepeated(rules, msg, "42", i)
            if (!result.first) {
                return false
            }

            result = parseRepeated(rules, result.second, "31", numberOfUnits-i)
            if (result.first) {
                return true
            }
        }

        return false
    }

    private fun parseRepeated(
        rules: MutableMap<String, List<List<String>>>,
        msg: String,
        ruleId: String,
        count: Int
    ): Pair<Boolean, String> {
        var rule42 = rules[ruleId]
        var tmp = msg
        for (i in 1..count) {
            var result = tryParseAlternatives(tmp, rules, rule42!!)
            //println("The result of parsing $tmp for $ruleId is ${result}")
//            println(tmp.length - result.second.length)
            tmp = result.second
            if (!result.first) {
                return Pair(false, msg)
            }
        }
        return Pair(true, tmp)
    }

    fun getSolution2(input: List<String>, ruleLength: Int): Int {

        val pair = parseRule(input, 0)
        var rules = pair.first
        var index = pair.second
        rules["8"] = listOf(listOf("42"), listOf("42", "8"))
        rules["11"] = listOf(listOf("42", "31"), listOf("42", "11", "31"))
        index++

        //println(rules)
        var valid_messages = 0
        for (msgidx in index until input.size) {
            if (isValid2(input[msgidx], rules, ruleLength)) {
//                println(input[msgidx])
                valid_messages++
            }
        }
        return valid_messages
    }

}