package dev.erikiva.aoc2020

class Bag(color: String, contents: Map<String, Int>) {
    val contains: Map<String, Int>
    val isContainedIn = mutableListOf<String>()
    var color: String

    init {
        this.color = color
        this.contains = contents
    }
    override fun  toString(): String {
        return "Color: ${this.color}\n contains: ${this.contains} \n is contained in ${this.isContainedIn}\n"
    }

}

class Day07 {
    fun sortRules(rules: List<String>): MutableMap<String, Bag> {
        var sorted = mutableMapOf<String, Bag>()
        for (rule in rules) {
            val bagType = rule.substringBefore(" bags contain")
            val rest = rule.substringAfter("contain ")
            if (rest == "no other bags.") {
                sorted[bagType] = Bag(bagType, emptyMap())
            } else {
                val bags = getContents(rest)
                sorted[bagType] = Bag(bagType, bags)
            }

        }
        return sorted

    }

    fun getContents(bags: String): Map<String, Int> {
        val reg = Regex("""(\d) (\w+ \w+)""")

        //val myMap = myList.map { it.name to it.age }.toMap()

        val bagList = bags.split(", ").map{
            reg.find(it)!!.groups[2]!!.value  to reg.find(it)!!.groups[1]!!.value.toInt()
        }.toMap()
        return bagList
    }




    private fun findAllAncestors(sortedBags: MutableMap<String, Bag>, bag: String): Int {
        var visited = mutableSetOf<String>()
        var pending = mutableListOf<String>()
        pending.addAll(sortedBags.get(bag)!!.isContainedIn)
        visited.addAll(sortedBags.get(bag)!!.isContainedIn)
        while (!pending.isEmpty()) {
            val current = pending.removeAt(0)
            val parents = sortedBags.get(current)!!.isContainedIn
            for (parent in parents) {
                if (!visited.contains(parent)) {
                    visited.add(parent)
                    pending.add(parent)
                }
            }
        }
        return visited.size
    }

    private fun addParents(sortedBags: MutableMap<String, Bag>) {
        for (bag in sortedBags.values) {
            for (child in bag.contains){
                sortedBags.get(child.key)!!.isContainedIn.add(bag.color)
            }
        }
    }

    private fun findAllChildren(sortedBags: MutableMap<String, Bag>, bag: String): Int {
        val children = sortedBags.get(bag)!!.contains
        var total = 1
        if (children.isEmpty()) return 1
        for (child in children) {
            total += findAllChildren(sortedBags, child.key) * child.value
        }
        return total
    }

    fun findChildrenBags(input: List<String>, bag: String): Int {
        val sortedBags = sortRules(input)
        val res = findAllChildren(sortedBags, bag)
        return res -1
    }

    fun findParentBags(input: List<String>, bag: String): Int{
        val sortedBags = sortRules(input)
        addParents(sortedBags)
        val res = findAllAncestors(sortedBags, bag)
        return res
    }
}