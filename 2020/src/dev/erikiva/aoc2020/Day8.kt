package dev.erikiva.aoc2020


class Day8 {
    fun getSolution(input: List<String>): Int {
        var value = 0
        var pcount = 0
        var visited = mutableSetOf<Int>(pcount)
        var not_found = true
        while (not_found) {
            var instruction = input[pcount].split(" ")
            when(instruction[0]){
                "acc" -> {
                    value += instruction[1].toInt()
                    pcount ++
                }
                "nop" -> pcount++
                "jmp" -> pcount += instruction[1].toInt()
            }
            if (visited.contains(pcount)) not_found = false
            visited.add(pcount)
        }
        return value
    }

    fun getSolution2(input: List<String>): Int {

        var index = 0
        while (index < input.size) {
            var inst = input[index].split(" ")
            if (inst[0] == "acc") {
                index++
                continue
            }
            val change = if (inst[0] == "jmp") "nop" else "jmp"
            val newInst = "${change} ${inst[1]}"
            var instructions = input.mapIndexed { i, existing ->  if (i == index) newInst else existing }
            var value = 0
            var pcount = 0
            var visited = mutableSetOf<Int>(pcount)
            var not_found = true
            while (not_found && pcount < instructions.size) {
                var instruction = instructions[pcount].split(" ")
                when(instruction[0]){
                    "acc" -> {
                        value += instruction[1].toInt()
                        pcount ++
                    }
                    "nop" -> pcount++
                    "jmp" -> pcount += instruction[1].toInt()
                }
                if (visited.contains(pcount)) not_found = false
                visited.add(pcount)
            }
            if (not_found) return value
            index++
        }
        return 0
    }

}