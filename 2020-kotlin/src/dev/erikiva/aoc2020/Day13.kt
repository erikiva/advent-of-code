package dev.erikiva.aoc2020

import java.math.BigInteger

class Day13 {

    fun calculateEarliest(bus: Int, timestamp: Int):Int {
        var earliest = (timestamp / bus + 1) *  bus
        return earliest - timestamp
    }

    fun getSolution(input: List<String>): Int {
        var time = input[0].toInt()
        var buses = input[1].split(",").filter { it != "x" }.map { it.toInt() }
        var bus = buses.minBy { calculateEarliest(it, time) }
       return calculateEarliest(bus!!, time) * bus
    }

    fun getSolution2(input: List<String>): Long {
        var buses = input[1].split(",")
        var indexedBuses = mutableMapOf<Int, Long>()
        for (i in buses.indices) {
            if (buses[i] != "x") {
                indexedBuses.put(i, buses[i].toLong())
            }
        }
        var mcm = 1L
        for (bus in indexedBuses.values) {
            mcm *= bus
        }

        // with help from this explanation
        // https://brilliant.org/wiki/chinese-remainder-theorem/
        var sum = 0L
        for (indexedBus in indexedBuses) {
            var y = mcm/indexedBus.value
            var z = BigInteger.valueOf(y)
                .modInverse(BigInteger.valueOf(indexedBus.value.toLong()))
                .multiply(BigInteger.valueOf(y))
                .multiply(BigInteger.valueOf(indexedBus.value - indexedBus.key))
                .mod(BigInteger.valueOf(mcm))
                .toLong()

            sum += z
        }

        return sum % mcm
    }
}