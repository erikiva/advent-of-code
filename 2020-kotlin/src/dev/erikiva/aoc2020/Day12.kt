package dev.erikiva.aoc2020

import kotlin.math.abs
import kotlin.math.cos
import kotlin.math.roundToInt
import kotlin.math.sin

class Day12 {

    fun getSolution(input: List<String>): Int {
        val instructions = input.map { Pair(it[0], it.substring(1).toInt()) }
        var position = mutableListOf<Int>(0, 0)
        var direction = 90
        for (instruction in instructions) {
            when (instruction.first) {
                'N' -> {
                    position[1] += instruction.second
                }
                'S' -> {
                    position[1] -= instruction.second
                }
                'E' -> {
                    position[0] += instruction.second
                }
                'W' -> {
                    position[0] -= instruction.second
                }
                'F' -> {
                    position[0] += instruction.second * sin(Math.toRadians(direction.toDouble())).roundToInt()
                    position[1] += instruction.second * cos(Math.toRadians(direction.toDouble())).roundToInt()
                }
                'R' -> {
                    direction += instruction.second
                }
                'L' -> {
                    direction -= instruction.second
                }
            }
        }
        return abs(position[0]) + abs(position[1])
    }

    fun getNewPosition(rotation: Int, position: List<Int>): MutableList<Int> {
        val angle = Math.toRadians(rotation.toDouble())
        val sinAngle = sin(angle)
        val cosAngle = cos(angle)
        return mutableListOf(
            (position[0] * cosAngle - position[1] * sinAngle).roundToInt(),
            (position[0] * sinAngle + position[1] * cosAngle).roundToInt()
        )
    }

    fun getSolution2(input: List<String>): Int {
        val instructions = input.map { Pair(it[0], it.substring(1).toInt()) }
        var boat = mutableListOf(0, 0)
        var waypoint = mutableListOf(10, 1)
        for (instruction in instructions) {
            when (instruction.first) {
                'N' -> {
                    waypoint[1] += instruction.second
                }
                'S' -> {
                    waypoint[1] -= instruction.second
                }
                'E' -> {
                    waypoint[0] += instruction.second
                }
                'W' -> {
                    waypoint[0] -= instruction.second
                }
                'F' -> {
                    boat[0] += instruction.second * waypoint[0]
                    boat[1] += instruction.second * waypoint[1]
                }
                'R' -> {
                    waypoint = getNewPosition(360 - instruction.second, waypoint)
                }
                'L' -> {
                    waypoint = getNewPosition(instruction.second, waypoint)
                }
            }
        }
        return abs(boat[0]) + abs(boat[1])
    }
}