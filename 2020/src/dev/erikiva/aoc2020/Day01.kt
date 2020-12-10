package dev.erikiva.aoc2020

class Day01 (){
    fun getTwoNumbers(nums: List<Int>): Int{
        for (num1 in nums.indices) {
            for(num2 in num1 + 1 until nums.size){
                if (nums[num1] + nums[num2]  == 2020) {
                    return nums[num1] * nums[num2]
                }
            }
        }
        return 0
    }
    fun getTreeNumbers(nums: List<Int>): Int{
        for (num1 in nums.indices) {
            for(num2 in num1 + 1 until nums.size){
                for (num3 in num2 + 1 until nums.size) {
                    if (nums[num1] + nums[num2] + nums[num3] == 2020) {
                        return nums[num1] * nums[num2] * nums[num3]
                    }
                }
            }
        }
        return 0
    }

}