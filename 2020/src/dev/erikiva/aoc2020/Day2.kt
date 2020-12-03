package dev.erikiva.aoc2020

class Password(pass: String){
    val min: Int
    val max: Int
    var letter: Char
    var password: String

    init {
        val parts = pass.split(": ")
        password = parts[1]
        val rules = parts[0].split("-", " ")
        min = rules[0].toInt()
        max = rules[1].toInt()
        letter = rules[2][0]
    }
    fun isValid(): Boolean {
        val count = password.count { this.letter == it }
        return (count >= this.min) and (count <= this.max)
    }

    fun isValid2(): Boolean {
        val first = this.password[this.min-1] == this.letter
        val second = this.password[this.max - 1] == this.letter
        return  first xor second
    }
}

class Day2 (){
    fun getValidPasswords(passwrds: List<String>): Int{
        var passwrdObjects = passwrds.map {
            Password(it)
        }
        val validPass = passwrdObjects.filter {
            it.isValid()
        }
        return validPass.size
    }
    fun getValidPasswordsFinal(passwrds: List<String>): Int{
        var passwrdObjects = passwrds.map {
            Password(it)
        }
        val validPass = passwrdObjects.filter {
            it.isValid2()
        }
        return validPass.size
    }
}