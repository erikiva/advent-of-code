package dev.erikiva.aoc2020

class Node(value: Int) {
    var value: Int
    var next: Node?
    init {
        this.value = value
        this.next = null
    }

    override fun toString(): String {
        return value.toString()
    }
}

class Day23 {

    fun getSolution(input: String): String {
        var nums = input.toCharArray().map{ Character.getNumericValue(it) }.toMutableList()
        for (i in 1..100) {
            var current = nums[0]
            var picks = nums.subList(1, 4)
            var rest = nums.subList(4, nums.size)
            var dest = rest.filter { it < current }.max()
            if (dest == null) {
                dest = rest.max()
            }
            var desIdx = rest.indexOf(dest)
            rest.addAll(desIdx + 1, picks)
            nums = mutableListOf()
            nums.addAll(rest)
            nums.add(current)
            // println(nums)
        }
        var one = nums.indexOf(1)
        var after = nums.subList(one + 1, nums.size).joinToString("")
        var before = nums.subList(0, one).joinToString("")
        return after + before
    }


    fun getSolution2(input: String): Long {
        var size = 1000000
        var nums = input.toCharArray().map{ Character.getNumericValue(it) }.toMutableList()
        var cups = mutableListOf<Node>(Node(-1))
        for (i in 1..size) {
            cups.add(Node(i))
        }
        for (numIdx in 0..nums.size -2) {
            cups[nums[numIdx]].next = cups[nums[numIdx+1]]
        }
        //println(cups)
        if (size > nums.size) {
            //println("aqui NO")
            cups[nums.last()].next = cups[nums.size + 1]
            for (cupIdx in nums.size + 1..size - 1) {
                cups[cupIdx].next = cups[cupIdx + 1]
            }
            cups[size].next = cups[nums[0]]
        } else {
            cups[nums.last()].next = cups[nums[0]]
        }


        // this will go on a loop
        var current = cups[nums[0]]
        //printList(current, cups)
        for (i in 1..10000000) {
            var picks = listOf(current.next!!.value,
                                current.next!!.next!!.value,
                                current.next!!.next!!.next!!.value)
            //println(picks)
            var dest = current.value - 1
            while (picks.contains(dest)){
                dest--
            }
            if (dest < 1) {
                dest = size
                while (picks.contains(dest)){
                    dest--
                }
            }

            var tmp = cups[dest].next
            cups[dest].next = cups[picks[0]]
            current.next = cups[picks[2]].next
            current = current.next!!
            //println("cups[picks[2]].next ${cups[picks[2]].next}")
            cups[picks[2]].next = tmp
            // println("Current is $current")
            // printList(current, cups)
        }
        //printList(current, cups)
        val firstCup = cups[1].next!!.value.toLong()
        val secondCup = cups[1].next!!.next!!.value.toLong()
        return firstCup * secondCup
    }

    private fun printList(
        current: Node,
        cups: MutableList<Node>
    ) {
        var node = current
        for (i in 1..20) {
            print(" $node")
            node = node.next!!
        }
        println()
    }


}