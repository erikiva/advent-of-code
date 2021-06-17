package day04

import "fmt"

func hasConsecutiveDigits(password string) bool {
	previous := 'a'
	for _, c := range password {
		if c == previous {
			return true
		}
		previous = c
	}
	return false
}

func isNonDecreasing(password string) bool {
	high := '0'
	for _, c := range password {
		if c < high {
			return false
		}
		high = c
	}
	return true
}

func isValid(password string) bool {
	// It is a six-digit number.
	// The value is within the range given in your puzzle input.
	// Two adjacent digits are the same (like 22 in 122345).
	// Going from left to right, the digits never decrease; they only ever increase or stay the same (like 111123 or 135679).

	return hasConsecutiveDigits(password) && isNonDecreasing(password)
}

func Part1(low, high int) int {
	countValid := 0
	for i := low; i <= high; i++ {
		if isValid(fmt.Sprint(i)) {
			countValid++
		}
	}
	return countValid
}

func hasConsecutiveDigits2(password string) bool {
	chunkLen := 1
	for i := 1; i < len(password); i++ {
		if password[i] == password[i-1] {
			chunkLen++
		} else {
			if chunkLen == 2 {
				return true
			}
			chunkLen = 1
		}
	}
	return chunkLen == 2
}

func isValid2(password string) bool {
	// It is a six-digit number.
	// The value is within the range given in your puzzle input.
	// Two adjacent digits are the same (like 22 in 122345) -- but only two.
	// Going from left to right, the digits never decrease; they only ever increase or stay the same (like 111123 or 135679).

	return hasConsecutiveDigits2(password) && isNonDecreasing(password)
}

func Part2(low, high int) int {
	countValid := 0
	for i := low; i <= high; i++ {
		if isValid2(fmt.Sprint(i)) {
			countValid++
		}
	}
	return countValid
}
