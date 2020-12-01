package dev.erikiva.aoc2020

class Day1 (){
    fun getTwoNumbers(nums: List<Int>): Int{
        for (num1 in nums) {
            for(num2 in nums){
                if (num1 + num2 == 2020) {
                    return num1 * num2
                }
            }
        }
        return 0
    }
    fun getTreeNumbers(nums: List<Int>): Int{
        for (num1 in nums) {
            for(num2 in nums){
                for (num3 in nums) {
                    if (num1 + num2 + num3 == 2020) {
                        return num1 * num2 * num3
                    }
                }
            }
        }
        return 0
    }

}