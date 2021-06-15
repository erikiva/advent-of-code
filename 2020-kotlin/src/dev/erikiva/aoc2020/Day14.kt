package dev.erikiva.aoc2020

import java.lang.Math.pow

//mask = 0110111X1110001X1X10XX1101010011X000
//mem[41405] = 37218266
//mem[26084] = 35933
//mem[56863] = 117475013
//mem[62063] = 3066


class Day14 {

    fun calculateValue(mask: String, value: Long) : Long {
        val mask0 = mask.replace('X', '0').toLong(2)
        val mask1 = mask.replace('X', '1').toLong(2)

        return value.and(mask1).or(mask0)
    }

    fun getSolution(input: List<String>): Long {
        var addresses = mutableMapOf<Long, Long>()
        var current_mask = ""
        for (line in input) {
            if (line.startsWith("mask")) {
                current_mask = line.substringAfter("= ")
            } else {
                val memory = line.substringBefore("]").substringAfter("[").toLong()
                val value = line.substringAfter("= ").toLong()
                addresses.put(memory, calculateValue(current_mask, value))
            }
        }
        return addresses.values.sum()
    }


    private fun calculateAddresses(mask: String, memory: Long): List<Long> {
        val mask1 = mask.replace('X', '0').toLong(2)
        val maskx = mask.replace('0', '1').replace('X', '0').toLong(2)
        val masked1 = memory.or(mask1)
        var baseline = masked1.and(maskx)
        val addresses = mutableListOf<Long>(baseline)
        for (i in mask.indices) {
            var bit = 35 - i
            if (mask[i] == 'X') {
                for (j in addresses.indices) {
                    addresses.add(addresses[j] + (pow(2.0, bit.toDouble()).toLong()))
                }
            }
        }
        return addresses
    }

    fun getSolution2(input: List<String>): Long {

        var addresses = mutableMapOf<Long, Long>()
        var current_mask = ""
        for (line in input) {
            if (line.startsWith("mask")) {
                current_mask = line.substringAfter("= ")
            } else {
                val memory = line.substringBefore("]").substringAfter("[").toLong()
                val value = line.substringAfter("= ").toLong()
                val current_addresses = calculateAddresses(current_mask, memory)
                for (address in current_addresses) {
                    addresses.put(address, value)
                }
            }
        }
        return addresses.values.sum()
    }

}