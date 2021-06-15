package dev.erikiva.aoc2020

class Day25 {

    fun getSolution(cardKey: Int, doorKey: Int): Int {
        var i = 0
        var res = 1
        while (res != cardKey) {
            res *= 7
            res %= 20201227
            i++
        }

        var j = 0
        var res2 = 1
        while (res2 != doorKey) {
            res2 *= 7
            res2 %= 20201227
            j++
        }

        var res3 = 1L
        for (i in 1..j) {
            res3 *= cardKey
            res3 %= 20201227
        }
        return res3.toInt()
    }





    fun getSolution2(input: List<String>): Int {

        return 0
    }



}