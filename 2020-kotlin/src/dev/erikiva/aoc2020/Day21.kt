package dev.erikiva.aoc2020

import java.util.*

class Day21 {

    fun getSolution(input: List<String>): Int {
        var ingredientAllergenMap = mutableMapOf<String, MutableSet<String>>()
        var ingredients = mutableListOf<String>()
        for (line in input) {
            var currentIngredients = line.substringBefore(" (").split(" ")
            ingredients.addAll(currentIngredients)
            var allergens = line.substringAfter(" (contains ")
                .substringBefore(")").split(", ")
            for (allergen in allergens) {
                if (ingredientAllergenMap.contains(allergen)) {
                    ingredientAllergenMap[allergen]!!.retainAll(currentIngredients)
                } else {
                    ingredientAllergenMap[allergen] = currentIngredients.toMutableSet()
                }
            }
        }
        //println(ingredients)
        for (allergen in ingredientAllergenMap.values) {
            ingredients.removeAll(allergen)
        }
//        println(ingredients)
//        println(ingredientAllergenMap)
        return ingredients.size
    }

    fun getSolution2(input: List<String>): String {
        var ingredientAllergenMap = mutableMapOf<String, MutableSet<String>>()
        var ingredients = mutableListOf<String>()
        for (line in input) {
            var currentIngredients = line.substringBefore(" (").split(" ")
            ingredients.addAll(currentIngredients)
            var allergens = line.substringAfter(" (contains ")
                .substringBefore(")").split(", ")
            for (allergen in allergens) {
                if (ingredientAllergenMap.contains(allergen)) {
                    ingredientAllergenMap[allergen]!!.retainAll(currentIngredients)
                } else {
                    ingredientAllergenMap[allergen] = currentIngredients.toMutableSet()
                }
            }
        }

        var badIngredients = TreeMap<String, String>()
        while (ingredientAllergenMap.isNotEmpty()) {
            var ingEntry = ingredientAllergenMap.entries.find { it.value.size == 1 }
            if (ingEntry == null) {
                break
            }
            var ing = ingEntry.value
            badIngredients.put(ingEntry.key, ingEntry.value.first())
            ingredientAllergenMap.remove(ingEntry.key)
            for (allergen in ingredientAllergenMap.values) {
                allergen.removeAll(ing)
            }
            //            println(ing)
            //            println(ingredientAllergenMap)
        }

//        println(badIngredients.values)
//        println(ingredientAllergenMap)
        return badIngredients.values.joinToString(",")
    }

}