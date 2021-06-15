package dev.erikiva.aoc2020

class Player() {
    var cards: MutableList<Int>

    init {
        this.cards = mutableListOf()
    }

    fun getCopy(): Player {
        var p = Player()
        p.cards.addAll(cards)
        return p
    }

    fun getCopy(size: Int): Player {
        var p = Player()
        p.cards.addAll(cards.subList(0, size))
        return p
    }

    override fun toString(): String {
        return cards.toString()
    }
}

class Day22 {

    fun playTurn(p1: Player, p2: Player) {
        val p1Card = p1.cards.removeAt(0)
        val p2Card = p2.cards.removeAt(0)
        if (p1Card > p2Card) {
            p1.cards.add(p1Card)
            p1.cards.add(p2Card)
        } else {
            p2.cards.add(p2Card)
            p2.cards.add(p1Card)
        }

    }


    fun getSolution(input: List<String>): Int {
        var players = mutableListOf<Player>()
        for (line in input) {
            if (line.contains("Player")) {
                players.add(Player())
            } else if (line.isEmpty()) {
                continue
            } else {
                players.last().cards.add(line.toInt())
            }
        }
        do {
            playTurn(players[0], players[1])
        } while (players[0].cards.isNotEmpty() && players[1].cards.isNotEmpty())

        var winnerDeck = mutableListOf<Int>()
        winnerDeck.addAll(players[0].cards)
        winnerDeck.addAll(players[1].cards)
        var total = 0
        winnerDeck.reverse()

        for (i in 0 until winnerDeck.size) {
            total += winnerDeck[i] * (i + 1)
        }
//        println(players)
        return total
    }


    fun playRecursiveTurn(p1: Player, p2: Player) {
        val p1Card = p1.cards.removeAt(0)
        val p2Card = p2.cards.removeAt(0)
        var winner = 0
        if (p1Card <= p1.cards.size && p2Card <= p2.cards.size) {
            winner = playRecursiveGame(p1.getCopy(p1Card), p2.getCopy(p2Card))
            if (winner == 1) {
                p1.cards.add(p1Card)
                p1.cards.add(p2Card)
            } else {
                p2.cards.add(p2Card)
                p2.cards.add(p1Card)
            }
        } else {
            if (p1Card > p2Card) {
                p1.cards.add(p1Card)
                p1.cards.add(p2Card)
            } else {
                p2.cards.add(p2Card)
                p2.cards.add(p1Card)
            }
        }
    }

    val outcome = mutableMapOf<Pair<List<Int>, List<Int>>, Int>()

    private fun playRecursiveGame(p1: Player, p2: Player): Int {

//        println("$p1 $p2")
        val original = Pair(p1.getCopy().cards, p2.getCopy().cards)

        if (outcome.containsKey(original)) {
            return outcome[original]!!
        }

        val game = mutableSetOf<Pair<List<Int>, List<Int>>>()
        do {
            if (game.contains(Pair(p1.cards, p2.cards))) {
                return 1
            }

            game.add((Pair(p1.getCopy().cards, p2.getCopy().cards)))
            playRecursiveTurn(p1, p2)

        } while (p1.cards.isNotEmpty() && p2.cards.isNotEmpty())
        val winner = if (p1.cards.isEmpty()) 2 else 1
        outcome[original] = winner
        return winner
    }

    fun getSolution2(input: List<String>): Int {

        var players = mutableListOf<Player>()
        for (line in input) {
            if (line.contains("Player")) {
                players.add(Player())
            } else if (line.isEmpty()) {
                continue
            } else {
                players.last().cards.add(line.toInt())
            }
        }
        playRecursiveGame(players[0], players[1])

        var winnerDeck = mutableListOf<Int>()
        winnerDeck.addAll(players[0].cards)
        winnerDeck.addAll(players[1].cards)
        var total = 0
        winnerDeck.reverse()

        for (i in 0 until winnerDeck.size) {
            total += winnerDeck[i] * (i + 1)
        }

        return total
    }

}