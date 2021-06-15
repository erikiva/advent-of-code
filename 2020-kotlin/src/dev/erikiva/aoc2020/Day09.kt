package dev.erikiva.aoc2020

class Day09 {
    fun getSolution(input: List<String>, size: Int): Long {
        val numbers = input.map {it.toLong()}
        val window = numbers.subList(0,size).toMutableSet()
        for (i in size..numbers.size) {
            val n = numbers[i]
            if (isSumOf2(n, window)) {
                window.remove(numbers[i - size])
                window.add(n)
            } else {
                return n
            }
        }
        println(window)
        return 0
    }

    private fun isSumOf2(n: Long, window: MutableSet<Long>): Boolean {
        for (a in window) {
            if (a != n-a && n-a in window ){
                return true
            }
        }
        return false
    }

    // Brute force
    fun getSolution2(input: List<String>, total: Long): Long {
        val numbers = input.map {it.toLong()}
        for (i in 0 until numbers.size - 2) {
            for (j in i+2..numbers.size) {
                val subList = numbers.subList(i, j)
                val sum = subList.sum()
                if (sum == total) {
                    return subList.max()!! + subList.min()!!
                } else if (sum > total) {
                    break
                }
            }
        }
        return 0
    }

    // improved solution with sliding range
    fun getBetterSolution2(input: List<String>, total: Long): Long {
        val numbers = input.map {it.toLong()}
        var sum = numbers[0]
        var indexBefore = 0
        var indexAfter = 1
        while (indexAfter <= numbers.size) {
            if (sum == total) {
                val window = numbers.subList(indexBefore,indexAfter)
                return window.max()!! + window.min()!!
            }
            if (sum < total) {
                sum += numbers[indexAfter]
                indexAfter++
            } else {
                sum -= numbers[indexBefore]
                indexBefore++
            }
        }
        return 0
    }
}